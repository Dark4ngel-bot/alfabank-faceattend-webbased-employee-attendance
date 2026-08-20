import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { verifyPassword } from "@/lib/auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import {
  IDENTITY_VALIDATION,
  validateDigitRange,
} from "@/lib/identity-validation";
import { normalizeBankCode } from "@/lib/bank-options";

export const runtime = "nodejs";

type JsonBody = Record<string, unknown>;

function normalizeKey(key: string) {
  return key.replace(/[_\-\s]/g, "").toLowerCase();
}

function findText(body: unknown, keys: string[]) {
  const targets = new Set(keys.map(normalizeKey));

  function walk(value: unknown): string {
    if (!value || typeof value !== "object") return "";

    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      if (targets.has(normalizeKey(key))) {
        if (typeof item === "string") return item.trim();
        if (typeof item === "number") return String(item);
      }

      if (item && typeof item === "object") {
        const nested = walk(item);
        if (nested) return nested;
      }
    }

    return "";
  }

  return walk(body);
}

function findOptionalText(body: unknown, keys: string[]) {
  const targets = new Set(keys.map(normalizeKey));
  let found = false;

  function walk(value: unknown): string | undefined {
    if (!value || typeof value !== "object") return undefined;

    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      if (targets.has(normalizeKey(key))) {
        found = true;

        if (item === null || item === undefined) return "";
        if (typeof item === "string") return item.trim();
        if (typeof item === "number") return String(item);

        return "";
      }

      if (item && typeof item === "object") {
        const nested = walk(item);
        if (nested !== undefined) return nested;
      }
    }

    return undefined;
  }

  const result = walk(body);

  if (!found) return undefined;

  return result ?? "";
}

function hasAnyKey(body: unknown, keys: string[]) {
  const targets = new Set(keys.map(normalizeKey));

  function walk(value: unknown): boolean {
    if (!value || typeof value !== "object") return false;

    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      if (targets.has(normalizeKey(key))) return true;

      if (item && typeof item === "object" && walk(item)) {
        return true;
      }
    }

    return false;
  }

  return walk(body);
}

async function getUserTableColumns() {
  const columns = await prisma.$queryRaw<Array<{ COLUMN_NAME: string }>>`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'users'
  `;

  return new Set(columns.map((item) => item.COLUMN_NAME));
}

async function getSafeUser(userId: string) {
  const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(
    "SELECT * FROM users WHERE id = ? LIMIT 1",
    userId
  );

  const user = rows[0];

  if (!user) return null;

  delete user.password_hash;
  delete user.password;

  return user;
}

function getJakartaMonthRange(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value || 0);
  const year = getPart("year");
  const month = getPart("month");

  return {
    start: new Date(Date.UTC(year, month - 1, 1)),
    end: new Date(Date.UTC(year, month, 1)),
  };
}

async function getWfhQuotaUsage(userId: string, quotaValue: unknown) {
  const { start, end } = getJakartaMonthRange();
  const quota = Math.max(0, Number(quotaValue || 0));
  const used = await prisma.attendance.count({
    where: {
      user_id: userId,
      attendance_date: {
        gte: start,
        lt: end,
      },
      work_mode: "wfh",
      check_out_work_mode: "wfh",
      check_in_time: {
        not: null,
      },
      check_out_time: {
        not: null,
      },
    },
  });

  return {
    quota,
    used,
    remaining: Math.max(0, quota - used),
  };
}

async function withWfhQuotaUsage(
  userId: string,
  user: Record<string, unknown> | null,
) {
  if (!user) return user;

  const wfhQuota = await getWfhQuotaUsage(userId, user.wfh_quota_monthly);

  return {
    ...user,
    wfh_quota_monthly: wfhQuota.quota,
    wfh_quota_used_monthly: wfhQuota.used,
    wfh_quota_remaining_monthly: wfhQuota.remaining,
  };
}

async function handleChangePassword(userId: string, body: JsonBody) {
  const oldPassword = findText(body, [
    "oldPassword",
    "old_password",
    "currentPassword",
    "current_password",
    "passwordLama",
    "password_lama",
    "kataSandiLama",
    "kata_sandi_lama",
    "old",
    "current",
  ]);

  const newPassword = findText(body, [
    "newPassword",
    "new_password",
    "passwordBaru",
    "password_baru",
    "kataSandiBaru",
    "kata_sandi_baru",
    "new",
  ]);

  const confirmPassword = findText(body, [
    "confirmPassword",
    "confirm_password",
    "confirmNewPassword",
    "confirm_new_password",
    "konfirmasiPassword",
    "konfirmasi_password",
    "konfirmasiKataSandi",
    "konfirmasi_kata_sandi",
    "passwordConfirmation",
    "password_confirmation",
    "confirm",
    "confirmation",
  ]);

  if (!oldPassword || !newPassword || !confirmPassword) {
    console.log("CHANGE_PASSWORD_EMPTY_BODY:", body);

    return NextResponse.json(
      {
        success: false,
        message:
          "Kata sandi lama, kata sandi baru, dan konfirmasi wajib diisi.",
      },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      {
        success: false,
        message: "Kata sandi baru minimal 8 karakter.",
      },
      { status: 400 }
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      {
        success: false,
        message: "Konfirmasi kata sandi baru tidak sama.",
      },
      { status: 400 }
    );
  }

  if (oldPassword === newPassword) {
    return NextResponse.json(
      {
        success: false,
        message: "Kata sandi baru tidak boleh sama dengan kata sandi lama.",
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      password_hash: true,
      status: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Data user tidak ditemukan.",
      },
      { status: 404 }
    );
  }

  if (user.status !== "active") {
    return NextResponse.json(
      {
        success: false,
        message: "Akun kamu sedang tidak aktif.",
      },
      { status: 403 }
    );
  }

  const isOldPasswordValid = await verifyPassword(
    oldPassword,
    user.password_hash
  );

  if (!isOldPasswordValid) {
    return NextResponse.json(
      {
        success: false,
        message: "Kata sandi lama salah.",
      },
      { status: 401 }
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password_hash: hashedPassword,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Kata sandi berhasil diubah.",
  });
}

async function handleUpdateProfile(userId: string, body: JsonBody) {
  const columns = await getUserTableColumns();
  const updates: Array<[string, string | null]> = [];

  function nullableText(value: string | undefined) {
    if (value === undefined) return undefined;
    return value.trim() ? value.trim() : null;
  }

  function addUpdate(column: string, value: string | null | undefined) {
    if (value === undefined) return;
    if (!columns.has(column)) return;

    updates.push([column, value]);
  }

  const name = findOptionalText(body, ["name", "fullName", "full_name", "nama"]);
  const email = findOptionalText(body, ["email"]);
  const phone = findOptionalText(body, [
    "phone",
    "phoneNumber",
    "phone_number",
    "noHp",
    "no_hp",
    "nomorHp",
    "nomor_hp",
  ]);
  const address = findOptionalText(body, ["address", "alamat"]);
  const gender = findOptionalText(body, ["gender", "jenisKelamin", "jenis_kelamin"]);
  const birthDate = findOptionalText(body, [
    "birthDate",
    "birth_date",
    "dateOfBirth",
    "date_of_birth",
    "tanggalLahir",
    "tanggal_lahir",
  ]);
  const birthPlace = findOptionalText(body, [
    "birthPlace",
    "birth_place",
    "tempatLahir",
    "tempat_lahir",
  ]);
  const bankAccountNumber = findOptionalText(body, [
    "bankAccountNumber",
    "bank_account_number",
    "noRekening",
    "no_rekening",
    "rekening",
  ]);
  const bankCode = normalizeBankCode(body.bank_code || body.bankCode);
  const nik = findOptionalText(body, ["nik"]);

  if (name !== undefined && !name) {
    return NextResponse.json(
      {
        success: false,
        message: "Nama tidak boleh kosong.",
      },
      { status: 400 }
    );
  }

  if (email !== undefined && !email) {
    return NextResponse.json(
      {
        success: false,
        message: "Email tidak boleh kosong.",
      },
      { status: 400 }
    );
  }

  if (email !== undefined) {
    return NextResponse.json(
      {
        success: false,
        message: "Email terdaftar hanya dapat diubah oleh admin.",
      },
      { status: 403 }
    );
  }

  const phoneError = validateDigitRange(phone, IDENTITY_VALIDATION.phone);

  if (phoneError) {
    return NextResponse.json(
      {
        success: false,
        message: phoneError,
      },
      { status: 400 }
    );
  }

  const bankAccountError = validateDigitRange(
    bankAccountNumber,
    IDENTITY_VALIDATION.bankAccount
  );

  if (bankAccountError) {
    return NextResponse.json(
      {
        success: false,
        message: bankAccountError,
      },
      { status: 400 }
    );
  }

  const nikError = validateDigitRange(nik, IDENTITY_VALIDATION.nik);

  if (nikError) {
    return NextResponse.json(
      {
        success: false,
        message: nikError,
      },
      { status: 400 }
    );
  }

  addUpdate("name", name);

  addUpdate("phone", nullableText(phone));
  addUpdate("phone_number", nullableText(phone));

  addUpdate("address", nullableText(address));
  addUpdate("alamat", nullableText(address));

  addUpdate("gender", nullableText(gender));
  addUpdate("jenis_kelamin", nullableText(gender));

  addUpdate("birth_date", nullableText(birthDate));
  addUpdate("date_of_birth", nullableText(birthDate));
  addUpdate("tanggal_lahir", nullableText(birthDate));

  addUpdate("birth_place", nullableText(birthPlace));
  addUpdate("tempat_lahir", nullableText(birthPlace));

  addUpdate("bank_account_number", nullableText(bankAccountNumber));
  addUpdate("no_rekening", nullableText(bankAccountNumber));
  addUpdate("bank_code", nullableText(bankCode ?? undefined));

  addUpdate("nik", nullableText(nik));

  if (columns.has("updated_at")) {
    updates.push(["updated_at", "NOW()"]);
  }

  if (updates.length === 0) {
    const user = await getSafeUser(userId);

    return NextResponse.json({
      success: true,
      message: "Tidak ada data profil yang diubah.",
      user: await withWfhQuotaUsage(userId, user),
    });
  }

  const setClauses: string[] = [];
  const values: string[] = [];

  for (const [column, value] of updates) {
    if (column === "updated_at" && value === "NOW()") {
      setClauses.push("`updated_at` = NOW()");
      continue;
    }

    if (value === null) {
      setClauses.push(`\`${column}\` = NULL`);
      continue;
    }

    setClauses.push(`\`${column}\` = ?`);
    values.push(value);
  }

  await prisma.$executeRawUnsafe(
    `UPDATE users SET ${setClauses.join(", ")} WHERE id = ?`,
    ...values,
    userId
  );

  const user = await getSafeUser(userId);

  return NextResponse.json({
    success: true,
    message: "Profil berhasil diperbarui.",
    user: await withWfhQuotaUsage(userId, user),
  });
}

export async function GET(req: NextRequest) {
  try {
    const { id: userId } = await requireAuth(req);
    const user = await getSafeUser(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Data user tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: await withWfhQuotaUsage(userId, user),
    });
  } catch (error) {
    console.error("GET_PROFILE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: getApiErrorMessage(error, "Gagal mengambil profil."),
      },
      { status: getApiErrorStatus(error) }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id: userId } = await requireAuth(req);
    const body = (await req.json()) as JsonBody;

    const isPasswordRequest = hasAnyKey(body, [
      "oldPassword",
      "old_password",
      "currentPassword",
      "current_password",
      "passwordLama",
      "password_lama",
      "kataSandiLama",
      "kata_sandi_lama",
      "newPassword",
      "new_password",
      "passwordBaru",
      "password_baru",
      "kataSandiBaru",
      "kata_sandi_baru",
      "confirmPassword",
      "confirm_password",
      "confirmNewPassword",
      "confirm_new_password",
      "konfirmasiPassword",
      "konfirmasi_password",
      "passwordConfirmation",
      "password_confirmation",
    ]);

    if (isPasswordRequest) {
      return handleChangePassword(userId, body);
    }

    return handleUpdateProfile(userId, body);
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: getApiErrorMessage(error, "Gagal memperbarui profil."),
      },
      { status: getApiErrorStatus(error) }
    );
  }
}

export async function POST(req: NextRequest) {
  return PATCH(req);
}

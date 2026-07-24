import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type AllowedRole = "owner" | "admin";

const VIEW_ROLES: AllowedRole[] = ["owner", "admin"];
const MANAGE_ROLES: AllowedRole[] = ["owner", "admin"];

const DEFAULT_EMPLOYMENT_STATUSES = [
  { name: "Tetap", code: "tetap", status: "active" },
  { name: "Magang", code: "magang", status: "active" },
  { name: "Kontrak", code: "kontrak", status: "active" },
  { name: "Freelance", code: "freelance", status: "active" },
  { name: "Utama", code: "utama", status: "active" },
];

const employmentStatusSelect = {
  id: true,
  name: true,
  code: true,
  status: true,
  created_at: true,
  updated_at: true,
} as const;

async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("faceattend_token")?.value;

  if (!token) throw new Error("Token login tidak ditemukan.");
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET belum ada di file .env");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  const userId =
    (payload.id as string | undefined) ||
    (payload.userId as string | undefined) ||
    (payload.sub as string | undefined);

  if (!userId) throw new Error("User ID tidak ditemukan di token.");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, status: true },
  });

  if (!user) throw new Error("User tidak ditemukan.");

  return user;
}

function canAccess(role: string, roles: AllowedRole[]) {
  return roles.includes(role.toLowerCase() as AllowedRole);
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

function getPrismaCode(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    return (error as { code?: string }).code;
  }

  return undefined;
}

function isPrismaUniqueError(error: unknown) {
  return getPrismaCode(error) === "P2002";
}

function toCode(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureDefaultEmploymentStatuses() {
  await prisma.employmentStatus.createMany({
    data: DEFAULT_EMPLOYMENT_STATUSES,
    skipDuplicates: true,
  });
}

async function countEmployeesByEmploymentStatus(item: {
  id: string;
  code: string;
}) {
  const rows = await prisma.$queryRaw<Array<{ total: bigint | number }>>`
    SELECT COUNT(*) AS total
    FROM users
    WHERE role = 'employee'
      AND (
        employment_status_id = ${item.id}
        OR (employment_status_id IS NULL AND employee_type = ${item.code})
      )
  `;

  return Number(rows[0]?.total || 0);
}

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, VIEW_ROLES)
    ) {
      return jsonError("Akses ditolak.", 403);
    }

    await ensureDefaultEmploymentStatuses();

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const employmentStatuses = await prisma.employmentStatus.findMany({
      where: {
        AND: [
          search ? { name: { contains: search } } : {},
          status !== "all" ? { status } : {},
        ],
      },
      select: employmentStatusSelect,
      orderBy: { name: "asc" },
    });

    const statusesWithCount = await Promise.all(
      employmentStatuses.map(async (item) => ({
        ...item,
        _count: {
          users: await countEmployeesByEmploymentStatus(item),
        },
      })),
    );

    return NextResponse.json({
      success: true,
      employmentStatuses: statusesWithCount,
      data: statusesWithCount,
    });
  } catch (error) {
    console.error("GET /api/admin/employment-statuses error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil status kepegawaian.",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, MANAGE_ROLES)
    ) {
      return jsonError(
        "Akses ditolak. Hanya admin yang dapat menambah status kepegawaian.",
        403,
      );
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim();
    const code = toCode(String(body.code || name));

    if (!name) return jsonError("Nama status kepegawaian wajib diisi.");
    if (!code) return jsonError("Kode status kepegawaian tidak valid.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status tidak valid.");
    }

    const employmentStatus = await prisma.employmentStatus.create({
      data: { name, code, status },
      select: employmentStatusSelect,
    });

    return NextResponse.json({
      success: true,
      message: "Status kepegawaian berhasil dibuat.",
      employmentStatus,
    });
  } catch (error) {
    console.error("POST /api/admin/employment-statuses error:", error);

    if (isPrismaUniqueError(error)) {
      return jsonError("Nama atau kode status kepegawaian sudah digunakan.", 409);
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal menambahkan status kepegawaian.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, MANAGE_ROLES)
    ) {
      return jsonError(
        "Akses ditolak. Hanya admin yang dapat mengubah status kepegawaian.",
        403,
      );
    }

    const body = await req.json();
    const id = String(body.id || "").trim();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim();
    const code = toCode(String(body.code || name));

    if (!id) return jsonError("ID status kepegawaian wajib dikirim.");
    if (!name) return jsonError("Nama status kepegawaian wajib diisi.");
    if (!code) return jsonError("Kode status kepegawaian tidak valid.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status tidak valid.");
    }

    const existingStatus = await prisma.employmentStatus.findUnique({
      where: { id },
      select: { id: true, code: true },
    });

    if (!existingStatus) {
      return jsonError("Status kepegawaian tidak ditemukan.", 404);
    }

    const usedByEmployees =
      await countEmployeesByEmploymentStatus(existingStatus);

    if (usedByEmployees > 0 && code !== existingStatus.code) {
      return jsonError(
        "Kode status tidak bisa diubah karena sudah digunakan karyawan. Ubah nama/status saja.",
      );
    }

    const employmentStatus = await prisma.employmentStatus.update({
      where: { id },
      data: { name, code, status },
      select: employmentStatusSelect,
    });

    return NextResponse.json({
      success: true,
      message: "Status kepegawaian berhasil diperbarui.",
      employmentStatus,
    });
  } catch (error) {
    console.error("PATCH /api/admin/employment-statuses error:", error);

    if (isPrismaUniqueError(error)) {
      return jsonError("Nama atau kode status kepegawaian sudah digunakan.", 409);
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal memperbarui status kepegawaian.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, MANAGE_ROLES)
    ) {
      return jsonError(
        "Akses ditolak. Hanya admin yang dapat menghapus status kepegawaian.",
        403,
      );
    }

    const id = req.nextUrl.searchParams.get("id") || "";

    if (!id) return jsonError("ID status kepegawaian wajib dikirim.");

    const employmentStatus = await prisma.employmentStatus.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
      },
    });

    if (!employmentStatus) {
      return jsonError("Status kepegawaian tidak ditemukan.", 404);
    }

    const usedByEmployees =
      await countEmployeesByEmploymentStatus(employmentStatus);

    if (usedByEmployees > 0) {
      return jsonError(
        "Status kepegawaian ini masih digunakan karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
      );
    }

    await prisma.employmentStatus.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Status kepegawaian berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/employment-statuses error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal menghapus status kepegawaian.",
      },
      { status: 500 },
    );
  }
}

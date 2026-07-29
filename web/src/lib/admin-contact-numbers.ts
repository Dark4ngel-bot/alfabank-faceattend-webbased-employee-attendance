import { randomUUID } from "crypto";

import { prisma } from "@/lib/prisma";

export type AdminContactNumberRecord = {
  id: string;
  label: string;
  phone_number: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

type RawAdminContactNumber = Omit<
  AdminContactNumberRecord,
  "is_active"
> & {
  is_active: boolean | number;
};

type QueryExecutor = {
  $executeRawUnsafe(query: string, ...values: unknown[]): Promise<number>;
  $queryRawUnsafe<T = unknown>(query: string, ...values: unknown[]): Promise<T>;
};

function normalizeAdminContactNumber(
  row: RawAdminContactNumber,
): AdminContactNumberRecord {
  return {
    ...row,
    is_active: Boolean(row.is_active),
  };
}

async function ensureAdminContactNumbersTable(db: QueryExecutor = prisma) {
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS \`admin_contact_numbers\` (
      \`id\` CHAR(36) NOT NULL,
      \`label\` VARCHAR(100) NOT NULL,
      \`phone_number\` VARCHAR(25) NOT NULL,
      \`is_active\` BOOLEAN NOT NULL DEFAULT false,
      \`created_at\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      \`updated_at\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`admin_contact_numbers_phone_number_key\` (\`phone_number\`),
      INDEX \`admin_contact_numbers_is_active_idx\` (\`is_active\`)
    )
  `);
}

export async function listAdminContactNumbers(db: QueryExecutor = prisma) {
  await ensureAdminContactNumbersTable(db);

  const rows = await db.$queryRawUnsafe<RawAdminContactNumber[]>(`
    SELECT id, label, phone_number, is_active, created_at, updated_at
    FROM \`admin_contact_numbers\`
    ORDER BY is_active DESC, created_at DESC
  `);

  return rows.map(normalizeAdminContactNumber);
}

export async function getActiveAdminContactNumber(
  db: QueryExecutor = prisma,
) {
  await ensureAdminContactNumbersTable(db);

  const rows = await db.$queryRawUnsafe<RawAdminContactNumber[]>(`
    SELECT id, label, phone_number, is_active, created_at, updated_at
    FROM \`admin_contact_numbers\`
    WHERE is_active = true
    ORDER BY updated_at DESC
    LIMIT 1
  `);

  return rows[0] ? normalizeAdminContactNumber(rows[0]) : null;
}

export async function createAdminContactNumber(
  data: {
    label: string;
    phoneNumber: string;
    isActive: boolean;
  },
  db: QueryExecutor = prisma,
) {
  await ensureAdminContactNumbersTable(db);

  const id = randomUUID();
  const existingCountRows = await db.$queryRawUnsafe<{ total: bigint | number }[]>(
    "SELECT COUNT(*) AS total FROM `admin_contact_numbers`",
  );
  const existingCount = Number(existingCountRows[0]?.total || 0);
  const shouldActivate = data.isActive || existingCount === 0;

  if (shouldActivate) {
    await db.$executeRawUnsafe(
      "UPDATE `admin_contact_numbers` SET is_active = false",
    );
  }

  await db.$executeRawUnsafe(
    "INSERT INTO `admin_contact_numbers` (id, label, phone_number, is_active) VALUES (?, ?, ?, ?)",
    id,
    data.label,
    data.phoneNumber,
    shouldActivate,
  );

  const rows = await db.$queryRawUnsafe<RawAdminContactNumber[]>(
    "SELECT id, label, phone_number, is_active, created_at, updated_at FROM `admin_contact_numbers` WHERE id = ? LIMIT 1",
    id,
  );

  return normalizeAdminContactNumber(rows[0]);
}

export async function updateAdminContactNumber(
  id: string,
  data: {
    label?: string;
    phoneNumber?: string;
    isActive?: boolean;
  },
  db: QueryExecutor = prisma,
) {
  await ensureAdminContactNumbersTable(db);

  const existingRows = await db.$queryRawUnsafe<RawAdminContactNumber[]>(
    "SELECT id, label, phone_number, is_active, created_at, updated_at FROM `admin_contact_numbers` WHERE id = ? LIMIT 1",
    id,
  );

  if (!existingRows[0]) {
    throw new Error("Nomor admin tidak ditemukan.");
  }

  if (data.isActive) {
    await db.$executeRawUnsafe(
      "UPDATE `admin_contact_numbers` SET is_active = false WHERE id <> ?",
      id,
    );
  }

  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.label) {
    fields.push("label = ?");
    values.push(data.label);
  }

  if (data.phoneNumber !== undefined) {
    fields.push("phone_number = ?");
    values.push(data.phoneNumber);
  }

  if (data.isActive !== undefined) {
    fields.push("is_active = ?");
    values.push(data.isActive);
  }

  if (fields.length > 0) {
    await db.$executeRawUnsafe(
      `UPDATE \`admin_contact_numbers\` SET ${fields.join(", ")} WHERE id = ?`,
      ...values,
      id,
    );
  }

  const rows = await db.$queryRawUnsafe<RawAdminContactNumber[]>(
    "SELECT id, label, phone_number, is_active, created_at, updated_at FROM `admin_contact_numbers` WHERE id = ? LIMIT 1",
    id,
  );

  return normalizeAdminContactNumber(rows[0]);
}

export async function deleteAdminContactNumber(
  id: string,
  db: QueryExecutor = prisma,
) {
  await ensureAdminContactNumbersTable(db);

  await db.$executeRawUnsafe(
    "DELETE FROM `admin_contact_numbers` WHERE id = ?",
    id,
  );

  const activeCountRows = await db.$queryRawUnsafe<{ total: bigint | number }[]>(
    "SELECT COUNT(*) AS total FROM `admin_contact_numbers` WHERE is_active = true",
  );
  const activeCount = Number(activeCountRows[0]?.total || 0);

  if (activeCount === 0) {
    const newestRows = await db.$queryRawUnsafe<{ id: string }[]>(
      "SELECT id FROM `admin_contact_numbers` ORDER BY created_at DESC LIMIT 1",
    );
    const newestId = newestRows[0]?.id;

    if (newestId) {
      await db.$executeRawUnsafe(
        "UPDATE `admin_contact_numbers` SET is_active = true WHERE id = ?",
        newestId,
      );
    }
  }
}

export function isDuplicateContactNumberError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    (("code" in error &&
      ((error as { code?: string | number }).code === "P2002" ||
        (error as { code?: string | number }).code === "1062")) ||
      ("errno" in error && (error as { errno?: number }).errno === 1062))
  );
}

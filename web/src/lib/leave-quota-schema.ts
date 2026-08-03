import { prisma } from "@/lib/prisma";

let ensureLeaveQuotaColumnPromise: Promise<boolean> | null = null;

function getErrorText(error: unknown) {
  if (error instanceof Error) return error.message;

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function isDuplicateColumnError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const text = getErrorText(error);

  return (
    text.includes("Duplicate column") ||
    text.includes("ER_DUP_FIELDNAME") ||
    text.includes("1060")
  );
}

export function isMissingLeaveQuotaColumnError(error: unknown) {
  const text = getErrorText(error).toLowerCase();

  return (
    text.includes("leave_quota_yearly") &&
    (text.includes("unknown column") ||
      text.includes("columnnotfound") ||
      text.includes("1054"))
  );
}

async function hasLeaveQuotaColumn() {
  const rows = await prisma.$queryRaw<Array<{ COLUMN_NAME: string }>>`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'users'
      AND COLUMN_NAME = 'leave_quota_yearly'
    LIMIT 1
  `;

  return rows.length > 0;
}

async function createLeaveQuotaColumn() {
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `users` ADD COLUMN `leave_quota_yearly` INTEGER NOT NULL DEFAULT 12",
  );
}

export async function ensureLeaveQuotaColumn() {
  ensureLeaveQuotaColumnPromise ??= (async () => {
    if (await hasLeaveQuotaColumn()) return true;

    try {
      await createLeaveQuotaColumn();
      return hasLeaveQuotaColumn();
    } catch (error) {
      if (isDuplicateColumnError(error)) return true;

      console.error("ENSURE_LEAVE_QUOTA_COLUMN_ERROR:", error);
      return false;
    }
  })();

  const ensured = await ensureLeaveQuotaColumnPromise;

  if (!ensured) {
    ensureLeaveQuotaColumnPromise = null;
  }

  return ensured;
}

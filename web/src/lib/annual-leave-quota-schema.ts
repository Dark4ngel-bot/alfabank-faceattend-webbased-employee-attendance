import { prisma } from "@/lib/prisma";

let ensureAnnualLeaveQuotaColumnPromise: Promise<boolean> | null = null;

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

export function isMissingAnnualLeaveQuotaColumnError(error: unknown) {
  const text = getErrorText(error).toLowerCase();

  return (
    text.includes("annual_leave_quota") &&
    (text.includes("unknown column") ||
      text.includes("columnnotfound") ||
      text.includes("1054"))
  );
}

async function hasAnnualLeaveQuotaColumn() {
  const rows = await prisma.$queryRaw<Array<{ COLUMN_NAME: string }>>`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'users'
      AND COLUMN_NAME = 'annual_leave_quota'
    LIMIT 1
  `;

  return rows.length > 0;
}

async function createAnnualLeaveQuotaColumn() {
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `users` ADD COLUMN `annual_leave_quota` INTEGER NOT NULL DEFAULT 12",
  );
}

export async function ensureAnnualLeaveQuotaColumn() {
  ensureAnnualLeaveQuotaColumnPromise ??= (async () => {
    if (await hasAnnualLeaveQuotaColumn()) return true;

    try {
      await createAnnualLeaveQuotaColumn();
      return hasAnnualLeaveQuotaColumn();
    } catch (error) {
      if (isDuplicateColumnError(error)) return true;

      console.error("ENSURE_ANNUAL_LEAVE_QUOTA_COLUMN_ERROR:", error);
      return false;
    }
  })();

  const ensured = await ensureAnnualLeaveQuotaColumnPromise;

  if (!ensured) {
    ensureAnnualLeaveQuotaColumnPromise = null;
  }

  return ensured;
}

import { prisma } from "@/lib/prisma";

let ensureWfhQuotaColumnPromise: Promise<boolean> | null = null;

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

export function isMissingWfhQuotaColumnError(error: unknown) {
  const text = getErrorText(error).toLowerCase();

  return (
    text.includes("wfh_quota_monthly") &&
    (text.includes("unknown column") ||
      text.includes("columnnotfound") ||
      text.includes("1054"))
  );
}

async function hasWfhQuotaColumn() {
  const rows = await prisma.$queryRaw<Array<{ COLUMN_NAME: string }>>`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'users'
      AND COLUMN_NAME = 'wfh_quota_monthly'
    LIMIT 1
  `;

  return rows.length > 0;
}

async function createWfhQuotaColumn() {
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `users` ADD COLUMN `wfh_quota_monthly` INTEGER NOT NULL DEFAULT 0",
  );
}

export async function ensureWfhQuotaColumn() {
  ensureWfhQuotaColumnPromise ??= (async () => {
    if (await hasWfhQuotaColumn()) return true;

    try {
      await createWfhQuotaColumn();
      return hasWfhQuotaColumn();
    } catch (error) {
      if (isDuplicateColumnError(error)) return true;

      console.error("ENSURE_WFH_QUOTA_COLUMN_ERROR:", error);
      return false;
    }
  })();

  const ensured = await ensureWfhQuotaColumnPromise;

  if (!ensured) {
    ensureWfhQuotaColumnPromise = null;
  }

  return ensured;
}

import { prisma } from "@/lib/prisma";

let ensureEmployeeVisiblePasswordColumnPromise: Promise<boolean> | null = null;

function getErrorText(error: unknown) {
  if (error instanceof Error) return error.message;

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function isDuplicateColumnError(error: unknown) {
  const text = getErrorText(error);

  return (
    text.includes("Duplicate column") ||
    text.includes("ER_DUP_FIELDNAME") ||
    text.includes("1060")
  );
}

export function isMissingEmployeeVisiblePasswordColumnError(error: unknown) {
  const text = getErrorText(error).toLowerCase();

  return (
    text.includes("visible_password") &&
    (text.includes("unknown column") ||
      text.includes("columnnotfound") ||
      text.includes("1054"))
  );
}

async function hasEmployeeVisiblePasswordColumn() {
  const rows = await prisma.$queryRaw<Array<{ COLUMN_NAME: string }>>`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'users'
      AND COLUMN_NAME = 'visible_password'
    LIMIT 1
  `;

  return rows.length > 0;
}

async function createEmployeeVisiblePasswordColumn() {
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `users` ADD COLUMN `visible_password` VARCHAR(255) NULL",
  );
}

export async function ensureEmployeeVisiblePasswordColumn() {
  ensureEmployeeVisiblePasswordColumnPromise ??= (async () => {
    if (await hasEmployeeVisiblePasswordColumn()) return true;

    try {
      await createEmployeeVisiblePasswordColumn();
      return hasEmployeeVisiblePasswordColumn();
    } catch (error) {
      if (isDuplicateColumnError(error)) return true;

      console.error("ENSURE_EMPLOYEE_VISIBLE_PASSWORD_COLUMN_ERROR:", error);
      return false;
    }
  })();

  const ensured = await ensureEmployeeVisiblePasswordColumnPromise;

  if (!ensured) {
    ensureEmployeeVisiblePasswordColumnPromise = null;
  }

  return ensured;
}

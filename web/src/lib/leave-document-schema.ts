import { prisma } from "@/lib/prisma";

let ensureLeaveDocumentColumnsPromise: Promise<boolean> | null = null;

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

export function isMissingLeaveDocumentColumnError(error: unknown) {
  const text = getErrorText(error).toLowerCase();

  return (
    (text.includes("document_url") ||
      text.includes("document_public_id") ||
      text.includes("document_name")) &&
    (text.includes("unknown column") ||
      text.includes("columnnotfound") ||
      text.includes("1054"))
  );
}

async function hasLeaveDocumentColumns() {
  const rows = await prisma.$queryRaw<Array<{ COLUMN_NAME: string }>>`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'leave_requests'
      AND COLUMN_NAME = 'document_url'
    LIMIT 1
  `;

  return rows.length > 0;
}

async function createLeaveDocumentColumns() {
  try {
    await prisma.$executeRawUnsafe(
      "ALTER TABLE `leave_requests` ADD COLUMN `document_url` TEXT NULL",
    );
  } catch (err) {
    if (!isDuplicateColumnError(err)) console.error(err);
  }
  try {
    await prisma.$executeRawUnsafe(
      "ALTER TABLE `leave_requests` ADD COLUMN `document_public_id` VARCHAR(255) NULL",
    );
  } catch (err) {
    if (!isDuplicateColumnError(err)) console.error(err);
  }
  try {
    await prisma.$executeRawUnsafe(
      "ALTER TABLE `leave_requests` ADD COLUMN `document_name` VARCHAR(255) NULL",
    );
  } catch (err) {
    if (!isDuplicateColumnError(err)) console.error(err);
  }
}

export async function ensureLeaveDocumentColumns() {
  ensureLeaveDocumentColumnsPromise ??= (async () => {
    if (await hasLeaveDocumentColumns()) return true;

    try {
      await createLeaveDocumentColumns();
      return hasLeaveDocumentColumns();
    } catch (error) {
      if (isDuplicateColumnError(error)) return true;

      console.error("ENSURE_LEAVE_DOCUMENT_COLUMNS_ERROR:", error);
      return false;
    }
  })();

  const ensured = await ensureLeaveDocumentColumnsPromise;

  if (!ensured) {
    ensureLeaveDocumentColumnsPromise = null;
  }

  return ensured;
}

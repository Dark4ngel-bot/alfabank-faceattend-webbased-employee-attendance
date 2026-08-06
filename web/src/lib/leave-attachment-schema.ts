import { prisma } from "@/lib/prisma";

let ensureLeaveAttachmentColumnsPromise: Promise<boolean> | null = null;

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

export function isMissingLeaveAttachmentColumnError(error: unknown) {
  const text = getErrorText(error).toLowerCase();

  return (
    text.includes("attachment_") &&
    (text.includes("unknown column") ||
      text.includes("columnnotfound") ||
      text.includes("1054"))
  );
}

async function hasAttachmentColumns() {
  const rows = await prisma.$queryRaw<Array<{ COLUMN_NAME: string }>>`
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'leave_requests'
      AND COLUMN_NAME = 'attachment_file'
    LIMIT 1
  `;

  return rows.length > 0;
}

async function createAttachmentColumns() {
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `leave_requests` ADD COLUMN `attachment_file` LONGBLOB NULL, ADD COLUMN `attachment_name` VARCHAR(255) NULL, ADD COLUMN `attachment_mime` VARCHAR(100) NULL",
  );
}

export async function ensureLeaveAttachmentColumns() {
  ensureLeaveAttachmentColumnsPromise ??= (async () => {
    if (await hasAttachmentColumns()) return true;

    try {
      await createAttachmentColumns();
      return hasAttachmentColumns();
    } catch (error) {
      if (isDuplicateColumnError(error)) return true;

      console.error("ENSURE_LEAVE_ATTACHMENT_COLUMNS_ERROR:", error);
      return false;
    }
  })();

  const ensured = await ensureLeaveAttachmentColumnsPromise;

  if (!ensured) {
    ensureLeaveAttachmentColumnsPromise = null;
  }

  return ensured;
}

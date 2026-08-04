import { prisma } from "@/lib/prisma";

export async function ensureShiftSwapTable() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS shift_swap_requests (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        requester_id VARCHAR(36) NOT NULL,
        target_user_id VARCHAR(36) NOT NULL,
        swap_date DATE NOT NULL,
        requester_shift_name VARCHAR(100) NOT NULL,
        target_shift_name VARCHAR(100) NOT NULL,
        reason TEXT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        INDEX idx_swap_date (swap_date),
        INDEX idx_swap_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  } catch (error) {
    console.warn("ENSURE_SHIFT_SWAP_TABLE_WARNING:", error);
  }
}

export async function getEffectiveShiftNameForDate(
  userId: string,
  date: Date,
  defaultShiftName?: string | null,
) {
  try {
    const swap = await prisma.shiftSwapRequest.findFirst({
      where: {
        status: "approved",
        swap_date: date,
        OR: [{ requester_id: userId }, { target_user_id: userId }],
      },
    });

    if (!swap) return defaultShiftName || "";

    if (swap.requester_id === userId) {
      return swap.target_shift_name;
    } else {
      return swap.requester_shift_name;
    }
  } catch {
    return defaultShiftName || "";
  }
}

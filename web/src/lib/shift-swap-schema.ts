import { prisma } from "@/lib/prisma";

type ShiftWithSchedules = {
  name: string;
  start_time?: string | null;
  end_time?: string | null;
  work_schedules?: Array<{
    day_of_week: string;
    is_work_day: boolean;
    check_in_time?: string | null;
    check_out_time?: string | null;
  }>;
};

export function toShiftSwapDate(dateStr: string) {
  const clean = dateStr.split("T")[0].trim();

  return new Date(`${clean}T00:00:00.000Z`);
}

export function formatShiftSwapDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateOnlyRange(date: Date) {
  const start = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return { start, end };
}

function getDayOfWeekKey(date: Date) {
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return days[date.getUTCDay()];
}

function normalizeTime(value?: string | null) {
  if (!value) return null;

  const match = value.trim().match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function timeToMinutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);

  return hour * 60 + minute;
}

export function getShiftWindowForSwapDate(shift: ShiftWithSchedules, date: Date) {
  const dayKey = getDayOfWeekKey(date);
  const schedule = shift.work_schedules?.find(
    (item) => String(item.day_of_week).toUpperCase() === dayKey,
  );

  if (schedule && schedule.is_work_day === false) return null;

  const startTime =
    normalizeTime(schedule?.check_in_time) || normalizeTime(shift.start_time);
  const endTime =
    normalizeTime(schedule?.check_out_time) || normalizeTime(shift.end_time);

  if (!startTime || !endTime) return null;

  const startMinutes = timeToMinutes(startTime);
  let endMinutes = timeToMinutes(endTime);

  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }

  return {
    shiftName: shift.name,
    startTime,
    endTime,
    startMinutes,
    endMinutes,
  };
}

export function shiftWindowsOverlap(
  first: { startMinutes: number; endMinutes: number },
  second: { startMinutes: number; endMinutes: number },
) {
  return first.startMinutes < second.endMinutes && second.startMinutes < first.endMinutes;
}

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
    const { start, end } = getDateOnlyRange(date);
    const swap = await prisma.shiftSwapRequest.findFirst({
      where: {
        status: "approved",
        swap_date: {
          gte: start,
          lt: end,
        },
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

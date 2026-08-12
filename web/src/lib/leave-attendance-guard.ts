import { prisma } from "@/lib/prisma";

export function getJakartaDateOnly(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value || 0);

  return new Date(
    Date.UTC(getPart("year"), getPart("month") - 1, getPart("day")),
  );
}

export async function findAttendanceInDateRange(params: {
  userId: string;
  startDate: Date;
  endDate: Date;
}) {
  const startUtc = getJakartaDateOnly(params.startDate);
  const endUtc = getJakartaDateOnly(params.endDate);

  return prisma.attendance.findFirst({
    where: {
      user_id: params.userId,
      attendance_date: {
        gte: startUtc,
        lte: endUtc,
      },
      check_in_time: {
        not: null,
      },
    },
    orderBy: {
      attendance_date: "asc",
    },
    select: {
      attendance_date: true,
      check_in_time: true,
      work_mode: true,
      status: true,
    },
  });
}

export async function findActiveLeaveForDate(params: {
  userId: string;
  date: Date;
}) {
  const targetDate = getJakartaDateOnly(params.date);

  return prisma.leaveRequest.findFirst({
    where: {
      user_id: params.userId,
      status: {
        in: ["pending", "approved"],
      },
      leave_type: {
        notIn: ["overtime", "lembur"],
      },
      start_date: {
        lte: targetDate,
      },
      end_date: {
        gte: targetDate,
      },
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      leave_type: true,
      start_date: true,
      end_date: true,
      status: true,
    },
  });
}

export function getLeaveTypeLabel(type: string) {
  if (type === "annual" || type === "annual_leave") return "cuti";
  if (type === "permission") return "izin";
  if (type === "sick") return "sakit";
  if (type === "overtime" || type === "lembur") return "lembur";

  return "pengajuan";
}

export function formatJakartaDate(value: Date | string | null | undefined) {
  if (!value) return "-";

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

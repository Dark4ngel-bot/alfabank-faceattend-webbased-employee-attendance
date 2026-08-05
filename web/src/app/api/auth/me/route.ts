import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import { prisma } from "@/lib/prisma";
import {
  ensureWfhQuotaColumn,
  isMissingWfhQuotaColumnError,
} from "@/lib/wfh-quota-schema";
import {
  ensureLeaveQuotaColumn,
  isMissingLeaveQuotaColumnError,
} from "@/lib/leave-quota-schema";

function serializeOffice(
  office:
    | {
        id: string;
        name: string;
        address: string | null;
        latitude: unknown;
        longitude: unknown;
        radius_meters: number;
      }
    | null
    | undefined
) {
  if (!office) return null;

  return {
    id: office.id,
    name: office.name,
    address: office.address,
    latitude: Number(office.latitude),
    longitude: Number(office.longitude),
    radius_meters: Number(office.radius_meters),
  };
}

function getJakartaMonthRange(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value || 0);
  const year = getPart("year");
  const month = getPart("month");

  return {
    start: new Date(Date.UTC(year, month - 1, 1)),
    end: new Date(Date.UTC(year, month, 1)),
  };
}

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);

    const user = await prisma.user.findUnique({
      where: {
        id: authUser.id,
      },
      select: {
        id: true,
        employee_code: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        status: true,
        employment_status: true,
        employment_start_date: true,
        employment_end_date: true,
        birth_place: true,
        birth_date: true,
        bank_code: true,
        bank_account_number: true,
        nik: true,
        profile_photo: true,

        jabatan: {
          select: {
            id: true,
            name: true,
          },
        },

        department: {
          select: {
            id: true,
            name: true,
          },
        },

        position: {
          select: {
            id: true,
            name: true,
          },
        },

        shift: {
          select: {
            id: true,
            name: true,
            tolerance_minutes: true,
            start_time: true,
            end_time: true,
            check_in_open: true,
            check_out_open: true,
            work_schedules: {
              select: {
                day_of_week: true,
                is_work_day: true,
                check_in_time: true,
                check_out_time: true,
              },
            },
          },
        },

        registered_office: {
          select: {
            id: true,
            name: true,
            address: true,
            latitude: true,
            longitude: true,
            radius_meters: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User tidak ditemukan.",
          error: "User tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    const { start, end } = getJakartaMonthRange();
    const hasWfhQuotaColumn = await ensureWfhQuotaColumn();
    let quotaRows: Array<{ wfh_quota_monthly: number | null }> = [];

    if (hasWfhQuotaColumn) {
      try {
        quotaRows = await prisma.$queryRawUnsafe<
          Array<{ wfh_quota_monthly: number | null }>
        >(
          "SELECT COALESCE(wfh_quota_monthly, 0) AS wfh_quota_monthly FROM users WHERE id = ? LIMIT 1",
          user.id,
        );
      } catch (error) {
        if (!isMissingWfhQuotaColumnError(error)) throw error;
      }
    }
    const usedWfhThisMonth = await prisma.attendance.count({
      where: {
        user_id: user.id,
        attendance_date: {
          gte: start,
          lt: end,
        },
        work_mode: "wfh",
        check_out_work_mode: "wfh",
        check_in_time: {
          not: null,
        },
        check_out_time: {
          not: null,
        },
      },
    });
    const wfhQuotaMonthly = Math.max(
      0,
      Number(quotaRows[0]?.wfh_quota_monthly || 0),
    );

    const hasLeaveQuotaColumn = await ensureLeaveQuotaColumn();
    let leaveQuotaRows: Array<{ leave_quota_yearly: number | null }> = [];
    if (hasLeaveQuotaColumn) {
      try {
        leaveQuotaRows = await prisma.$queryRawUnsafe<
          Array<{ leave_quota_yearly: number | null }>
        >(
          "SELECT COALESCE(leave_quota_yearly, 12) AS leave_quota_yearly FROM users WHERE id = ? LIMIT 1",
          user.id,
        );
      } catch (error) {
        if (!isMissingLeaveQuotaColumnError(error)) throw error;
      }
    }
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(Date.UTC(currentYear, 0, 1));
    const endOfYear = new Date(Date.UTC(currentYear, 11, 31, 23, 59, 59));

    const usedAnnualLeaves = await prisma.leaveRequest.aggregate({
      where: {
        user_id: user.id,
        leave_type: "annual",
        status: { in: ["pending", "approved"] },
        start_date: { gte: startOfYear, lte: endOfYear },
      },
      _sum: { total_days: true },
    });

    const leaveQuotaYearly = Math.max(0, Number(leaveQuotaRows[0]?.leave_quota_yearly ?? 12));
    const leaveQuotaUsedYearly = usedAnnualLeaves._sum.total_days || 0;
    const leaveQuotaRemainingYearly = Math.max(0, leaveQuotaYearly - leaveQuotaUsedYearly);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        employee_code: user.employee_code,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
        employment_status: user.employment_status,
        employment_start_date: user.employment_start_date,
        employment_end_date: user.employment_end_date,
        birth_place: user.birth_place,
        birth_date: user.birth_date,
        bank_code: user.bank_code,
        bank_name: user.bank_code,
        bank_account_number: user.bank_account_number,
        nik: user.nik,
        profile_photo: user.profile_photo,
        wfh_quota_monthly: wfhQuotaMonthly,
        wfh_quota_used_monthly: usedWfhThisMonth,
        wfh_quota_remaining_monthly: Math.max(
          0,
          wfhQuotaMonthly - usedWfhThisMonth,
        ),
        leave_quota_yearly: leaveQuotaYearly,
        leave_quota_used_yearly: leaveQuotaUsedYearly,
        leave_quota_remaining_yearly: leaveQuotaRemainingYearly,

        jabatan: user.jabatan,
        department: user.department,
        position: user.position,
        shift: user.shift,

        registered_office: serializeOffice(user.registered_office),
      },
    });
  } catch (error) {
    console.error("AUTH_ME_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: getApiErrorMessage(error, "Gagal mengambil data user."),
        error: getApiErrorMessage(error, "Gagal mengambil data user."),
      },
      {
        status: getApiErrorStatus(error),
      }
    );
  }
}

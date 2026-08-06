import { NextRequest, NextResponse } from "next/server";
import { requireOwner } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import { getJakartaDateOnly } from "@/lib/leave-attendance-guard";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
function toIsoDate(value: Date | string | null | undefined) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString();
}

function calculateWorkMinutes(
  workMinutes: number | null | undefined,
  checkInTime: Date | null | undefined,
  checkOutTime: Date | null | undefined,
) {
  const savedWorkMinutes = Number(workMinutes || 0);

  if (savedWorkMinutes > 0) {
    return savedWorkMinutes;
  }

  if (!checkInTime || !checkOutTime) {
    return 0;
  }

  const diffMs = checkOutTime.getTime() - checkInTime.getTime();

  if (diffMs <= 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(diffMs / 60000));
}

function isLateStatus(status?: string | null) {
  if (!status) return false;

  const normalizedStatus = status.toLowerCase();

  return normalizedStatus === "late" || normalizedStatus === "terlambat";
}

function getActivityTime(attendance: {
  attendance_date: Date;
  check_in_time: Date | null;
  check_out_time: Date | null;
}) {
  return (
    attendance.check_out_time?.getTime() ||
    attendance.check_in_time?.getTime() ||
    attendance.attendance_date.getTime()
  );
}

export async function GET(req: NextRequest) {
  try {
    await requireOwner(req);

    const today = getJakartaDateOnly();

    const employees = await prisma.user.findMany({
      where: {
        role: {
          in: ["employee", "EMPLOYEE"],
        },
        status: {
          in: ["active", "ACTIVE"],
        },
      },
      select: {
        id: true,
        employee_code: true,
        name: true,
        profile_photo: true,
        department: {
          select: {
            name: true,
          },
        },
        position: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const todayAttendances = await prisma.attendance.findMany({
      where: {
        attendance_date: today,
      },
      select: {
        id: true,
        user_id: true,
        attendance_date: true,
        check_in_time: true,
        check_out_time: true,
        status: true,
        late_minutes: true,
        work_minutes: true,
      },
      orderBy: [
        {
          attendance_date: "desc",
        },
        {
          check_in_time: "asc",
        },
      ],
    });

    const attendanceByUserId = new Map<
      string,
      (typeof todayAttendances)[number]
    >();

    for (const attendance of todayAttendances) {
      const existingAttendance = attendanceByUserId.get(attendance.user_id);

      if (!existingAttendance) {
        attendanceByUserId.set(attendance.user_id, attendance);
        continue;
      }

      if (getActivityTime(attendance) > getActivityTime(existingAttendance)) {
        attendanceByUserId.set(attendance.user_id, attendance);
      }
    }

    const recentAttendance = employees.map((employee) => {
      const attendance = attendanceByUserId.get(employee.id);
      const profilePhoto = employee.profile_photo
        ? `/api/profil/photo?userId=${encodeURIComponent(employee.id)}&raw=1`
        : null;

      const workMinutes = calculateWorkMinutes(
        Number(attendance?.work_minutes || 0),
        attendance?.check_in_time || null,
        attendance?.check_out_time || null,
      );

      return {
        id: employee.id,
        attendanceId: attendance?.id || "",
        name: employee.name,
        employeeCode: employee.employee_code,
        profilePhoto,
        profile_photo: profilePhoto,
        profile_photo_url: profilePhoto,
        photo_url: profilePhoto,
        avatar_url: profilePhoto,
        position: employee.position?.name || null,
        department: employee.department?.name || null,
        checkInTime: toIsoDate(attendance?.check_in_time),
        checkOutTime: toIsoDate(attendance?.check_out_time),
        status: attendance?.check_in_time ? (attendance?.status || "PRESENT") : "ABSENT",
        lateMinutes: Number(attendance?.late_minutes || 0),
        workMinutes,
      };
    }).sort((first, second) => {
      if (!first.checkInTime && !second.checkInTime) {
        return first.name.localeCompare(second.name);
      }

      if (!first.checkInTime) return 1;
      if (!second.checkInTime) return -1;

      return (
        new Date(first.checkInTime).getTime() -
        new Date(second.checkInTime).getTime()
      );
    });

    const sortedRecentAttendance = recentAttendance.sort((a, b) => {
      // 1. Yang sudah check-in diutamakan di atas daripada yang belum check-in
      if (a.checkInTime && !b.checkInTime) return -1;
      if (!a.checkInTime && b.checkInTime) return 1;

      // 2. Jika keduanya sudah check-in, urutkan dari waktu terawal/tercepat (ASC: 07.00 dulu baru 08.00)
      if (a.checkInTime && b.checkInTime) {
        return (
          new Date(a.checkInTime).getTime() - new Date(b.checkInTime).getTime()
        );
      }

      // 3. Jika keduanya belum check-in, urutkan alfabetis berdasarkan nama
      return a.name.localeCompare(b.name);
    });

    const checkInToday = sortedRecentAttendance.filter(
      (attendance) => attendance.checkInTime,
    ).length;

    const checkOutToday = sortedRecentAttendance.filter(
      (attendance) => attendance.checkOutTime,
    ).length;

    const lateToday = sortedRecentAttendance.filter((attendance) => {
      return attendance.lateMinutes > 0 || isLateStatus(attendance.status);
    }).length;

    const absentToday = sortedRecentAttendance.filter(
      (attendance) => !attendance.checkInTime,
    ).length;

    return NextResponse.json({
      stats: {
        totalEmployees: employees.length,
        checkInToday,
        checkOutToday,
        lateToday,
        absentToday,
      },
      recentAttendance: sortedRecentAttendance,
    });
  } catch (error) {
    console.error("ADMIN_DASHBOARD_ERROR:", error);

    return NextResponse.json(
      {
        message: getApiErrorMessage(
          error,
          "Gagal mengambil data dashboard admin.",
        ),
      },
      {
        status: getApiErrorStatus(error),
      },
    );
  }
}

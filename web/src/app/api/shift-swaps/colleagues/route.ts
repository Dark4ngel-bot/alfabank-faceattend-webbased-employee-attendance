import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);

    const currentUser = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        shift: { select: { name: true } },
      },
    });

    const userShiftName = String(currentUser?.shift?.name || "Shift Utama").toUpperCase();

    const isShiftPagi = userShiftName.includes("PAGI");
    const isShiftSiang = userShiftName.includes("SIANG");

    let allowedKeywords: string[] = [];

    if (isShiftPagi) {
      allowedKeywords = ["SIANG"];
    } else if (isShiftSiang) {
      allowedKeywords = ["PAGI"];
    } else {
      // Shift Utama can swap with Shift Pagi or Shift Siang
      allowedKeywords = ["PAGI", "SIANG"];
    }

    const colleagues = await prisma.user.findMany({
      where: {
        id: { not: authUser.id },
        role: { in: ["employee", "EMPLOYEE"] },
        status: { in: ["active", "ACTIVE"] },
      },
      select: {
        id: true,
        name: true,
        employee_code: true,
        profile_photo: true,
        shift: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const filtered = colleagues.filter((col) => {
      const shiftName = String(col.shift?.name || "").toUpperCase();
      if (shiftName.includes("MAGANG")) return false;

      return allowedKeywords.some((kw) => shiftName.includes(kw));
    });

    const activeShifts = await prisma.shift.findMany({
      where: {
        status: { in: ["active", "ACTIVE"] },
      },
      select: {
        id: true,
        name: true,
        start_time: true,
        end_time: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // Make sure Shift Siang is always available as a fallback option if not present in DB
    let shiftOptions = activeShifts.map((s) => ({
      id: s.id,
      name: s.name,
      startTime: s.start_time,
      endTime: s.end_time,
    }));

    const currentShift = currentUser?.shift?.name || "Shift Utama";

    if (!shiftOptions.some((s) => s.name.toLowerCase().includes("siang"))) {
      shiftOptions.push({
        id: "shift-siang-default",
        name: "Shift Siang",
        startTime: "12:00",
        endTime: "21:00",
      });
    }

    // Filter out current user shift from options
    shiftOptions = shiftOptions.filter(
      (s) => s.name.toUpperCase() !== userShiftName,
    );

    return NextResponse.json({
      success: true,
      currentShiftName: currentShift,
      colleagues: filtered.map((col) => ({
        id: col.id,
        name: col.name,
        employeeCode: col.employee_code,
        profilePhoto: col.profile_photo,
        shiftName: col.shift?.name || "Shift Utama",
      })),
      availableShifts: shiftOptions,
    });
  } catch (error) {
    console.error("GET_SHIFT_SWAP_COLLEAGUES_ERROR:", error);
    return NextResponse.json(
      { error: getApiErrorMessage(error, "Gagal mengambil daftar rekan kerja.") },
      { status: getApiErrorStatus(error) },
    );
  }
}

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

    const rawShiftName = currentUser?.shift?.name || "UTAMA";
    const userShiftUpper = rawShiftName.toUpperCase().trim();

    const isShiftSiang = userShiftUpper.includes("SIANG");

    // Allowed colleague shift keywords for "Tukar Rekan"
    let allowedColleagueKeywords: string[] = [];
    if (isShiftSiang) {
      allowedColleagueKeywords = ["UTAMA", "PAGI"];
    } else {
      allowedColleagueKeywords = ["SIANG"];
    }

    // Fetch active employees (excluding self and excluding MAGANG)
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

    const filteredColleagues = colleagues.filter((col) => {
      const shiftName = String(col.shift?.name || "").toUpperCase();
      if (shiftName.includes("MAGANG")) return false;

      return allowedColleagueKeywords.some((kw) => shiftName.includes(kw));
    });

    // Fetch active shifts from DB (excluding MAGANG)
    const activeShifts = await prisma.shift.findMany({
      where: {
        status: { in: ["active", "ACTIVE"] },
        NOT: {
          name: {
            contains: "MAGANG",
          },
        },
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

    // Clean, normalize to CAPS LOCK, and deduplicate shift options
    type AvailableShiftItem = {
      id: string;
      name: string;
      startTime?: string | null;
      endTime?: string | null;
    };

    const shiftMap = new Map<string, AvailableShiftItem>();

    for (const s of activeShifts) {
      const upperName = s.name.toUpperCase().trim();
      if (upperName.includes("MAGANG")) continue;

      if (!shiftMap.has(upperName)) {
        shiftMap.set(upperName, {
          id: s.id,
          name: upperName,
          startTime: s.start_time,
          endTime: s.end_time,
        });
      }
    }

    // Ensure default fallback shifts exist if not present in DB
    if (!shiftMap.has("SHIFT SIANG")) {
      shiftMap.set("SHIFT SIANG", {
        id: "shift-siang-default",
        name: "SHIFT SIANG",
        startTime: "13:00",
        endTime: "21:00",
      });
    }

    if (!shiftMap.has("UTAMA")) {
      shiftMap.set("UTAMA", {
        id: "shift-utama-default",
        name: "UTAMA",
        startTime: "08:00",
        endTime: "17:00",
      });
    }

    const allShiftOptions = Array.from(shiftMap.values());

    // Target shift options for "Geser Shift Mandiri":
    // Strictly for moving to SHIFT SIANG!
    const availableShifts: AvailableShiftItem[] = allShiftOptions.filter(
      (s) => s.name.includes("SIANG"),
    );

    return NextResponse.json({
      success: true,
      currentShiftName: userShiftUpper,
      colleagues: filteredColleagues.map((col) => ({
        id: col.id,
        name: col.name,
        employeeCode: col.employee_code,
        profilePhoto: col.profile_photo,
        shiftName: String(col.shift?.name || "UTAMA").toUpperCase(),
      })),
      availableShifts,
    });
  } catch (error) {
    console.error("GET_SHIFT_SWAP_COLLEAGUES_ERROR:", error);
    return NextResponse.json(
      { error: getApiErrorMessage(error, "Gagal mengambil daftar rekan kerja.") },
      { status: getApiErrorStatus(error) },
    );
  }
}

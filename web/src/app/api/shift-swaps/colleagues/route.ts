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

    const userShiftName = currentUser?.shift?.name || "Shift Utama";

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

    return NextResponse.json({
      success: true,
      currentShiftName: userShiftName,
      colleagues: colleagues.map((col) => ({
        id: col.id,
        name: col.name,
        employeeCode: col.employee_code,
        profilePhoto: col.profile_photo,
        shiftName: col.shift?.name || "Shift Utama",
      })),
    });
  } catch (error) {
    console.error("GET_SHIFT_SWAP_COLLEAGUES_ERROR:", error);
    return NextResponse.json(
      { error: getApiErrorMessage(error, "Gagal mengambil daftar rekan kerja.") },
      { status: getApiErrorStatus(error) },
    );
  }
}

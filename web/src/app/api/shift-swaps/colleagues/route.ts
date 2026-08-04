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

    const userShiftName = String(currentUser?.shift?.name || "").toUpperCase();

    const isShiftPagi = userShiftName.includes("PAGI");
    const isShiftSiang = userShiftName.includes("SIANG");

    if (!isShiftPagi && !isShiftSiang) {
      return NextResponse.json({
        success: true,
        oppositeShiftName: "",
        colleagues: [],
      });
    }

    const oppositeSearch = isShiftPagi ? "SIANG" : "PAGI";
    const oppositeShiftName = isShiftPagi ? "Shift Siang" : "Shift Pagi";

    const colleagues = await prisma.user.findMany({
      where: {
        id: { not: authUser.id },
        role: { in: ["employee", "EMPLOYEE"] },
        status: { in: ["active", "ACTIVE"] },
        shift: {
          name: { contains: oppositeSearch },
        },
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
      currentShiftName: isShiftPagi ? "Shift Pagi" : "Shift Siang",
      oppositeShiftName,
      colleagues: colleagues.map((col) => ({
        id: col.id,
        name: col.name,
        employeeCode: col.employee_code,
        profilePhoto: col.profile_photo,
        shiftName: col.shift?.name || oppositeShiftName,
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

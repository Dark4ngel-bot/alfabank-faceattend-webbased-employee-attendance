import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import { prisma } from "@/lib/prisma";
import { ensureShiftSwapTable } from "@/lib/shift-swap-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toIsoDateOnly(dateStr: string) {
  const clean = dateStr.split("T")[0].trim();
  return new Date(`${clean}T00:00:00.000Z`);
}

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);
    await ensureShiftSwapTable();

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        shift: { select: { name: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    const userShiftName = String(user.shift?.name || "").toUpperCase();
    const isEligible = userShiftName.includes("PAGI") || userShiftName.includes("SIANG");

    const sentRequests = await prisma.shiftSwapRequest.findMany({
      where: { requester_id: user.id },
      include: {
        target_user: {
          select: {
            id: true,
            name: true,
            employee_code: true,
            profile_photo: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const incomingRequests = await prisma.shiftSwapRequest.findMany({
      where: { target_user_id: user.id },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            employee_code: true,
            profile_photo: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({
      success: true,
      isEligible,
      currentShiftName: user.shift?.name || "Tanpa Shift",
      sentRequests: sentRequests.map((item) => ({
        id: item.id,
        targetUser: {
          id: item.target_user.id,
          name: item.target_user.name,
          employeeCode: item.target_user.employee_code,
          profilePhoto: item.target_user.profile_photo,
        },
        swapDate: item.swap_date.toISOString().slice(0, 10),
        requesterShiftName: item.requester_shift_name,
        targetShiftName: item.target_shift_name,
        reason: item.reason,
        status: item.status,
        createdAt: item.created_at.toISOString(),
      })),
      incomingRequests: incomingRequests.map((item) => ({
        id: item.id,
        requester: {
          id: item.requester.id,
          name: item.requester.name,
          employeeCode: item.requester.employee_code,
          profilePhoto: item.requester.profile_photo,
        },
        swapDate: item.swap_date.toISOString().slice(0, 10),
        requesterShiftName: item.requester_shift_name,
        targetShiftName: item.target_shift_name,
        reason: item.reason,
        status: item.status,
        createdAt: item.created_at.toISOString(),
      })),
    });
  } catch (error) {
    console.error("GET_SHIFT_SWAPS_ERROR:", error);
    return NextResponse.json(
      { error: getApiErrorMessage(error, "Gagal mengambil pengajuan tukar shift.") },
      { status: getApiErrorStatus(error) },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);
    await ensureShiftSwapTable();

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        shift: { select: { name: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    const userShiftName = String(user.shift?.name || "").toUpperCase();
    const isShiftPagi = userShiftName.includes("PAGI");
    const isShiftSiang = userShiftName.includes("SIANG");

    if (!isShiftPagi && !isShiftSiang) {
      return NextResponse.json(
        { error: "Fitur tukar shift hanya dapat digunakan oleh karyawan Shift Pagi dan Shift Siang." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const targetUserId = String(body.targetUserId || "").trim();
    const swapDateStr = String(body.swapDate || "").trim();
    const reason = String(body.reason || "").trim();

    if (!targetUserId || !swapDateStr) {
      return NextResponse.json(
        { error: "Rekan kerja tujuan dan tanggal tukar shift wajib diisi." },
        { status: 400 },
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        name: true,
        shift: { select: { name: true } },
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Rekan kerja tujuan tidak ditemukan." },
        { status: 404 },
      );
    }

    const targetShiftName = String(targetUser.shift?.name || "").toUpperCase();
    const isTargetOpposite = isShiftPagi
      ? targetShiftName.includes("SIANG")
      : targetShiftName.includes("PAGI");

    if (!isTargetOpposite) {
      return NextResponse.json(
        {
          error: isShiftPagi
            ? "Tukar shift hanya bisa dilakukan dengan karyawan Shift Siang."
            : "Tukar shift hanya bisa dilakukan dengan karyawan Shift Pagi.",
        },
        { status: 400 },
      );
    }

    const swapDate = toIsoDateOnly(swapDateStr);

    const existingPending = await prisma.shiftSwapRequest.findFirst({
      where: {
        requester_id: user.id,
        target_user_id: targetUserId,
        swap_date: swapDate,
        status: "pending",
      },
    });

    if (existingPending) {
      return NextResponse.json(
        { error: "Kamu sudah mengirim pengajuan tukar shift ke karyawan ini untuk tanggal tersebut." },
        { status: 400 },
      );
    }

    const createdSwap = await prisma.shiftSwapRequest.create({
      data: {
        requester_id: user.id,
        target_user_id: targetUserId,
        swap_date: swapDate,
        requester_shift_name: isShiftPagi ? "Shift Pagi" : "Shift Siang",
        target_shift_name: isShiftPagi ? "Shift Siang" : "Shift Pagi",
        reason: reason || null,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Pengajuan tukar shift ke ${targetUser.name} berhasil dikirim dan menunggu konfirmasi.`,
      request: createdSwap,
    });
  } catch (error) {
    console.error("POST_SHIFT_SWAP_ERROR:", error);
    return NextResponse.json(
      { error: getApiErrorMessage(error, "Gagal membuat pengajuan tukar shift.") },
      { status: getApiErrorStatus(error) },
    );
  }
}

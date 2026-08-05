import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import { prisma } from "@/lib/prisma";
import { ensureShiftSwapTable } from "@/lib/shift-swap-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth(req);
    await ensureShiftSwapTable();

    const resolvedParams = await params;
    const swapId = resolvedParams.id;
    const body = await req.json();
    const action = String(body.action || "").toLowerCase().trim();

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json(
        { error: "Aksi tidak valid. Pilih setuju (approve) atau tolak (reject)." },
        { status: 400 },
      );
    }

    const swapRequest = await prisma.shiftSwapRequest.findUnique({
      where: { id: swapId },
      include: {
        requester: { select: { id: true, name: true } },
        target_user: { select: { id: true, name: true } },
      },
    });

    if (!swapRequest) {
      return NextResponse.json(
        { error: "Pengajuan tukar shift tidak ditemukan." },
        { status: 404 },
      );
    }

    if (swapRequest.target_user_id !== user.id) {
      return NextResponse.json(
        { error: "Kamu tidak memiliki akses untuk menanggapi pengajuan tukar shift ini." },
        { status: 403 },
      );
    }

    if (swapRequest.status !== "pending") {
      return NextResponse.json(
        { error: `Pengajuan ini sudah ${swapRequest.status === "approved" ? "disetujui" : "ditolak"}.` },
        { status: 400 },
      );
    }

    const newStatus = action === "approve" ? "approved" : "rejected";

    const updatedSwap = await prisma.shiftSwapRequest.update({
      where: { id: swapId },
      data: { status: newStatus },
    });

    return NextResponse.json({
      success: true,
      message:
        action === "approve"
          ? `Permintaan tukar shift dari ${swapRequest.requester.name} telah kamu setujui. Jadwal shift pada tanggal yang dipilih otomatis disesuaikan.`
          : `Permintaan tukar shift dari ${swapRequest.requester.name} telah kamu tolak.`,
      request: updatedSwap,
    });
  } catch (error) {
    console.error("PATCH_SHIFT_SWAP_ERROR:", error);
    return NextResponse.json(
      { error: getApiErrorMessage(error, "Gagal memproses pengajuan tukar shift.") },
      { status: getApiErrorStatus(error) },
    );
  }
}

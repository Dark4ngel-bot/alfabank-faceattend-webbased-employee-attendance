import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import { prisma } from "@/lib/prisma";
import { ensureLeaveAttachmentColumns } from "@/lib/leave-attachment-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function canManageLeave(role: string) {
  return ["admin", "owner"].includes(role.toLowerCase());
}

function safeFileName(value: string | null | undefined) {
  const fileName = String(value || "lampiran-cuti").replace(/["\r\n]/g, "");

  return fileName || "lampiran-cuti";
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const currentUser = await requireAuth(req);
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID pengajuan wajib dikirim." },
        { status: 400 },
      );
    }

    await ensureLeaveAttachmentColumns();

    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: {
        id,
      },
      select: {
        user_id: true,
        attachment_url: true,
        attachment_name: true,
        attachment_mime: true,
      },
    });

    if (!leaveRequest?.attachment_url) {
      return NextResponse.json(
        { success: false, message: "Lampiran tidak ditemukan." },
        { status: 404 },
      );
    }

    if (
      leaveRequest.user_id !== currentUser.id &&
      !canManageLeave(currentUser.role)
    ) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak." },
        { status: 403 },
      );
    }

    if (
      leaveRequest.attachment_url.startsWith("http://") ||
      leaveRequest.attachment_url.startsWith("https://")
    ) {
      return NextResponse.redirect(leaveRequest.attachment_url);
    }

    if (leaveRequest.attachment_url.startsWith("/")) {
      return NextResponse.redirect(new URL(leaveRequest.attachment_url, req.url));
    }

    return NextResponse.json(
      { success: false, message: "Lokasi lampiran tidak valid." },
      { status: 404 },
    );
  } catch (error) {
    console.error("GET_LEAVE_ATTACHMENT_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: getApiErrorMessage(error, "Gagal mengambil lampiran."),
      },
      { status: getApiErrorStatus(error) },
    );
  }
}

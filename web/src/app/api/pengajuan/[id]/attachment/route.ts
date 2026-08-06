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
        attachment_file: true,
        attachment_name: true,
        attachment_mime: true,
      },
    });

    if (!leaveRequest?.attachment_file) {
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

    const mime = leaveRequest.attachment_mime || "application/octet-stream";
    const fileName = safeFileName(leaveRequest.attachment_name);

    return new NextResponse(new Uint8Array(leaveRequest.attachment_file), {
      headers: {
        "Content-Type": mime,
        "Content-Disposition": `inline; filename="${fileName}"`,
        "Cache-Control": "private, max-age=300",
      },
    });
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

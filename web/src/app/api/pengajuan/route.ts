import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import {
  findAttendanceInDateRange,
  formatJakartaDate,
} from "@/lib/leave-attendance-guard";
import { ensureLeaveAttachmentColumns } from "@/lib/leave-attachment-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeaveType = "annual" | "permission" | "sick" | "overtime" | "other";
type LeaveStatus = "pending" | "approved" | "rejected";

const allowedLeaveTypes: LeaveType[] = [
  "annual",
  "permission",
  "sick",
  "overtime",
  "other",
];

const allowedStatuses: LeaveStatus[] = ["pending", "approved", "rejected"];
const allowedAttachmentTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const maxAttachmentSize = 5 * 1024 * 1024;

function getCurrentUser(req: NextRequest) {
  return requireAuth(req);
}

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
      error: message,
      requests: [],
      leaveRequests: [],
      stats: {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      },
    },
    { status }
  );
}

function canManageLeave(role: string) {
  return ["admin", "owner"].includes(role.toLowerCase());
}

function normalizeDateOnly(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) return null;

  const isoMatch = trimmedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const indonesiaMatch = trimmedValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  const parts = isoMatch
    ? {
        year: Number(isoMatch[1]),
        month: Number(isoMatch[2]),
        day: Number(isoMatch[3]),
      }
    : indonesiaMatch
      ? {
          year: Number(indonesiaMatch[3]),
          month: Number(indonesiaMatch[2]),
          day: Number(indonesiaMatch[1]),
        }
      : null;

  if (!parts || parts.month < 1 || parts.month > 12 || parts.day < 1) {
    return null;
  }

  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));

  if (Number.isNaN(date.getTime())) return null;

  if (
    date.getUTCFullYear() !== parts.year ||
    date.getUTCMonth() !== parts.month - 1 ||
    date.getUTCDate() !== parts.day
  ) {
    return null;
  }

  return date;
}

function calculateTotalDays(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffMs = end.getTime() - start.getTime();

  if (diffMs < 0) return 0;

  return Math.floor(diffMs / 86400000) + 1;
}

function toIsoDate(value: Date | string | null | undefined) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString();
}

function formatDateDisplay(value: Date | string | null | undefined) {
  if (!value) return "-";

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getLeaveTypeLabel(type: string) {
  if (type === "annual") return "Cuti Tahunan";
  if (type === "permission") return "Izin";
  if (type === "sick") return "Sakit";
  if (type === "overtime" || type === "lembur") return "Lembur";

  return "Lainnya";
}

function getStatusLabel(status: string) {
  if (status === "pending") return "Pending";
  if (status === "approved") return "Disetujui";
  if (status === "rejected") return "Ditolak";

  return status || "-";
}

function getAttachmentUrl(item: { id: string; attachment_name?: string | null }) {
  return item.attachment_name
    ? `/api/pengajuan/${encodeURIComponent(item.id)}/attachment`
    : null;
}

function mapLeaveRequest(item: {
  id: string;
  user_id: string;
  leave_type: string;
  start_date: Date;
  end_date: Date;
  total_days: number;
  reason: string;
  status: string;
  admin_note: string | null;
  attachment_name?: string | null;
  attachment_mime?: string | null;
  created_at: Date;
  updated_at: Date;
  user?: {
    name: string;
    email: string;
    position: {
      name: string;
    } | null;
    department: {
      name: string;
    } | null;
  } | null;
}) {
  return {
    id: item.id,
    userId: item.user_id,

    employeeName: item.user?.name || "-",
    employeeEmail: item.user?.email || "-",
    employeePosition: item.user?.position?.name || "-",
    employeeDepartment: item.user?.department?.name || "-",

    leaveType: item.leave_type,
    leaveTypeLabel: getLeaveTypeLabel(item.leave_type),

    startDate: formatDateDisplay(item.start_date),
    endDate: formatDateDisplay(item.end_date),

    startDateRaw: toIsoDate(item.start_date),
    endDateRaw: toIsoDate(item.end_date),
    startDateIso: toIsoDate(item.start_date),
    endDateIso: toIsoDate(item.end_date),

    totalDays: item.total_days,
    reason: item.reason,

    status: item.status,
    statusLabel: getStatusLabel(item.status),

    adminNote: item.admin_note,
    attachmentUrl: getAttachmentUrl(item),
    attachmentName: item.attachment_name || null,
    attachmentMime: item.attachment_mime || null,
    createdAt: toIsoDate(item.created_at),
    updatedAt: toIsoDate(item.updated_at),
  };
}

async function createAdminNotification(params: {
  userId: string;
  userName: string;
  leaveType: LeaveType;
  totalDays: number;
  reason: string;
}) {
  try {
    const label = getLeaveTypeLabel(params.leaveType);

    await prisma.adminNotification.create({
      data: {
        user_id: params.userId,
        type: params.leaveType,
        title: `Pengajuan ${label}`,
        message: `${params.userName} mengajukan ${label.toLowerCase()} selama ${params.totalDays} hari. Alasan: ${params.reason}`,
        status: "unread",
        is_read: false,
      },
    });
  } catch (error) {
    console.error("CREATE_LEAVE_NOTIFICATION_ERROR:", error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (currentUser.status !== "active") {
      return jsonError("Akun tidak aktif.", 403);
    }

    const isAdmin = canManageLeave(currentUser.role);

    await ensureLeaveAttachmentColumns();

    const leaveRequests = await prisma.leaveRequest.findMany({
      where: isAdmin
        ? {}
        : {
            user_id: currentUser.id,
          },
      select: {
        id: true,
        user_id: true,
        leave_type: true,
        start_date: true,
        end_date: true,
        total_days: true,
        reason: true,
        status: true,
        admin_note: true,
        attachment_name: true,
        attachment_mime: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            name: true,
            email: true,
            position: {
              select: {
                name: true,
              },
            },
            department: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const mappedRequests = leaveRequests.map(mapLeaveRequest);

    const stats = {
      total: mappedRequests.length,
      pending: mappedRequests.filter((item) => item.status === "pending")
        .length,
      approved: mappedRequests.filter((item) => item.status === "approved")
        .length,
      rejected: mappedRequests.filter((item) => item.status === "rejected")
        .length,
    };

    return NextResponse.json({
      success: true,
      message: "Riwayat pengajuan berhasil diambil.",
      stats,
      requests: mappedRequests,
      leaveRequests: mappedRequests,
    });
  } catch (error) {
    console.error("GET /api/pengajuan error:", error);

    return jsonError(
      getApiErrorMessage(error, "Gagal mengambil data pengajuan."),
      getApiErrorStatus(error)
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (currentUser.status !== "active") {
      return jsonError("Akun tidak aktif.", 403);
    }

    let leaveTypeText = "";
    let startDateText = "";
    let endDateText = "";
    let reason = "";
    let attachmentFile: Uint8Array<ArrayBuffer> | null = null;
    let attachmentName: string | null = null;
    let attachmentMime: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      leaveTypeText = String(
        formData.get("leaveType") || formData.get("leave_type") || "",
      ).trim();
      startDateText = String(
        formData.get("startDate") || formData.get("start_date") || "",
      ).trim();
      endDateText = String(
        formData.get("endDate") || formData.get("end_date") || "",
      ).trim();
      reason = String(formData.get("reason") || "").trim();

      const attachment =
        formData.get("attachment") ||
        formData.get("file") ||
        formData.get("suratDokter") ||
        formData.get("surat_dokter");

      if (attachment instanceof File && attachment.size > 0) {
        if (attachment.size > maxAttachmentSize) {
          return jsonError("Ukuran file lampiran maksimal 5MB.");
        }

        const mime = attachment.type || "application/octet-stream";

        if (!allowedAttachmentTypes.has(mime)) {
          return jsonError("Lampiran hanya boleh JPG, PNG, WEBP, atau PDF.");
        }

        const attachmentArrayBuffer: ArrayBuffer = await attachment.arrayBuffer();
        attachmentFile = new Uint8Array(attachmentArrayBuffer);
        attachmentName = attachment.name || "lampiran";
        attachmentMime = mime;
      }
    } else {
      let body: {
        leaveType?: string;
        leave_type?: string;
        startDate?: string;
        start_date?: string;
        endDate?: string;
        end_date?: string;
        reason?: string;
      };

      try {
        body = await req.json();
      } catch {
        return jsonError("Body request tidak valid.");
      }

      leaveTypeText = String(
        body.leaveType || body.leave_type || "",
      ).trim();
      startDateText = String(
        body.startDate || body.start_date || "",
      ).trim();
      endDateText = String(body.endDate || body.end_date || "").trim();
      reason = String(body.reason || "").trim();
    }

    const leaveType = leaveTypeText as LeaveType;

    if (!leaveType || !allowedLeaveTypes.includes(leaveType)) {
      return jsonError("Jenis pengajuan tidak valid.");
    }

    if (!startDateText) {
      return jsonError("Tanggal mulai wajib diisi.");
    }

    if (leaveType === "overtime" && !endDateText) {
      endDateText = startDateText;
    }

    if (!endDateText) {
      return jsonError("Tanggal selesai wajib diisi.");
    }

    if (!reason) {
      return jsonError("Alasan pengajuan wajib diisi.");
    }

    const startDate = normalizeDateOnly(startDateText);
    const endDate = normalizeDateOnly(endDateText);

    if (!startDate || !endDate) {
      return jsonError("Format tanggal tidak valid.");
    }

    if (leaveType === "overtime" && endDate.getTime() !== startDate.getTime()) {
      return jsonError("Pengajuan lembur hanya boleh untuk satu tanggal.");
    }

    if (endDate.getTime() < startDate.getTime()) {
      return jsonError(
        "Tanggal selesai tidak boleh lebih awal dari tanggal mulai."
      );
    }

    const totalDays = calculateTotalDays(startDate, endDate);

    if (totalDays <= 0) {
      return jsonError("Total hari pengajuan tidak valid.");
    }

    if (leaveType !== "overtime") {
      const attendanceConflict = await findAttendanceInDateRange({
        userId: currentUser.id,
        startDate,
        endDate,
      });

      if (attendanceConflict) {
        return jsonError(
          `Kamu sudah absen di kantor pada ${formatJakartaDate(
            attendanceConflict.attendance_date,
          )}, tidak dapat mengajukan cuti/sakit/izin pada tanggal tersebut.`,
        );
      }
    }

    await ensureLeaveAttachmentColumns();

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        user_id: currentUser.id,
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        total_days: totalDays,
        reason,
        status: "pending",
        attachment_url: attachmentName ? "uploaded" : null,
        attachment_name: attachmentName,
        attachment_mime: attachmentMime,
      },
      select: {
        id: true,
        user_id: true,
        leave_type: true,
        start_date: true,
        end_date: true,
        total_days: true,
        reason: true,
        status: true,
        admin_note: true,
        attachment_name: true,
        attachment_mime: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            name: true,
            email: true,
            position: {
              select: {
                name: true,
              },
            },
            department: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    await createAdminNotification({
      userId: currentUser.id,
      userName: currentUser.name,
      leaveType,
      totalDays,
      reason,
    });

    const mappedRequest = mapLeaveRequest(leaveRequest);

    return NextResponse.json({
      success: true,
      message: "Pengajuan berhasil dikirim dan menunggu persetujuan admin.",
      request: mappedRequest,
      leaveRequest: mappedRequest,
    });
  } catch (error) {
    console.error("POST /api/pengajuan error:", error);

    return jsonError(
      getApiErrorMessage(error, "Gagal mengirim pengajuan."),
      getApiErrorStatus(error)
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (currentUser.status !== "active" || !canManageLeave(currentUser.role)) {
      return jsonError("Akses ditolak.", 403);
    }

    const body = await req.json();

    const id = String(body.id || "").trim();
    const status = String(body.status || "").trim() as LeaveStatus;
    const adminNote = String(body.adminNote || body.admin_note || "").trim();

    if (!id) {
      return jsonError("ID pengajuan wajib dikirim.");
    }

    if (!status || !allowedStatuses.includes(status)) {
      return jsonError("Status pengajuan tidak valid.");
    }

    await ensureLeaveAttachmentColumns();

    if (status === "approved") {
      const existingRequest = await prisma.leaveRequest.findUnique({
        where: {
          id,
        },
        select: {
          leave_type: true,
          user_id: true,
          start_date: true,
          end_date: true,
        },
      });

      if (!existingRequest) {
        return jsonError("Data pengajuan tidak ditemukan.", 404);
      }

      if (!["overtime", "lembur"].includes(existingRequest.leave_type)) {
        const attendanceConflict = await findAttendanceInDateRange({
          userId: existingRequest.user_id,
          startDate: existingRequest.start_date,
          endDate: existingRequest.end_date,
        });

        if (attendanceConflict) {
          return jsonError(
            `Pengajuan tidak bisa disetujui karena karyawan sudah absen di kantor pada ${formatJakartaDate(
              attendanceConflict.attendance_date,
            )}.`,
          );
        }
      }
    }

    const leaveRequest = await prisma.leaveRequest.update({
      where: {
        id,
      },
      data: {
        status,
        admin_note:
          adminNote ||
          (status === "approved"
            ? "Pengajuan disetujui oleh admin."
            : status === "rejected"
              ? "Pengajuan ditolak oleh admin."
              : null),
      },
      select: {
        id: true,
        user_id: true,
        leave_type: true,
        start_date: true,
        end_date: true,
        total_days: true,
        reason: true,
        status: true,
        admin_note: true,
        attachment_name: true,
        attachment_mime: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            name: true,
            email: true,
            position: {
              select: {
                name: true,
              },
            },
            department: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const mappedRequest = mapLeaveRequest(leaveRequest);

    return NextResponse.json({
      success: true,
      message: "Status pengajuan berhasil diperbarui.",
      request: mappedRequest,
      leaveRequest: mappedRequest,
    });
  } catch (error) {
    console.error("PATCH /api/pengajuan error:", error);

    return jsonError(
      getApiErrorMessage(error, "Gagal memperbarui pengajuan."),
      getApiErrorStatus(error)
    );
  }
}

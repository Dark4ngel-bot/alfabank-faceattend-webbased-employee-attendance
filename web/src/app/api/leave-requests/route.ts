import fs from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import { getCloudinary } from "@/lib/cloudinary";
import {
  findAttendanceInDateRange,
  formatJakartaDate,
} from "@/lib/leave-attendance-guard";
import {
  ensureLeaveQuotaColumn,
  isMissingLeaveQuotaColumnError,
} from "@/lib/leave-quota-schema";
import { ensureLeaveDocumentColumns } from "@/lib/leave-document-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeaveType =
  | "annual"
  | "permission"
  | "sick"
  | "other"
  | "overtime"
  | "lembur";
type LeaveStatus = "pending" | "approved" | "rejected";

const allowedLeaveTypes: LeaveType[] = [
  "annual",
  "permission",
  "sick",
  "other",
  "overtime",
  "lembur",
];

const allowedStatuses: LeaveStatus[] = ["pending", "approved", "rejected"];

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
  if (!value) return null;

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) return null;

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

  return "Lainnya";
}

function getStatusLabel(status: string) {
  if (status === "pending") return "Pending";
  if (status === "approved") return "Disetujui";
  if (status === "rejected") return "Ditolak";

  return status || "-";
}

function saveLocalLeaveDocument(file: File, buffer: Buffer, requestId: string) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "leave-documents");
  fs.mkdirSync(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || ".pdf";
  const fileName = `leave-${requestId}-${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return {
    url: `/uploads/leave-documents/${fileName}`,
    publicId: null,
  };
}

async function uploadLeaveDocument(
  file: File,
  requestId: string,
): Promise<{ secure_url: string; public_id: string | null }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const hasCloudinary = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );

  if (hasCloudinary) {
    try {
      const cloudinary = getCloudinary();
      const isPdf = file.type.includes("pdf");

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "presensi/leave-documents",
            public_id: `leave-${requestId}-${Date.now()}`,
            resource_type: isPdf ? "raw" : "image",
            overwrite: false,
            use_filename: true,
          },
          (error, res) => {
            if (error) {
              reject(error);
              return;
            }

            if (!res) {
              reject(new Error("Cloudinary tidak mengembalikan hasil upload."));
              return;
            }

            resolve(res);
          },
        );

        uploadStream.end(buffer);
      });

      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (cloudinaryError) {
      console.warn("Cloudinary upload failed, falling back to local storage:", cloudinaryError);
      const localResult = saveLocalLeaveDocument(file, buffer, requestId);
      return {
        secure_url: localResult.url,
        public_id: localResult.publicId,
      };
    }
  }

  const localResult = saveLocalLeaveDocument(file, buffer, requestId);
  return {
    secure_url: localResult.url,
    public_id: localResult.publicId,
  };
}

function mapLeaveRequest(item: {
  id: string;
  user_id: string;
  leave_type: string;
  start_date: Date;
  end_date: Date;
  total_days: number;
  reason: string;
  document_url?: string | null;
  document_public_id?: string | null;
  document_name?: string | null;
  status: string;
  admin_note: string | null;
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

    documentUrl: item.document_url || null,
    document_url: item.document_url || null,
    documentName: item.document_name || null,
    document_name: item.document_name || null,

    status: item.status,
    statusLabel: getStatusLabel(item.status),

    adminNote: item.admin_note,
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
      pending: mappedRequests.filter((item: any) => item.status === "pending")
        .length,
      approved: mappedRequests.filter((item: any) => item.status === "approved")
        .length,
      rejected: mappedRequests.filter((item: any) => item.status === "rejected")
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
    console.error("GET /api/leave-requests error:", error);

    return jsonError(
      getApiErrorMessage(error, "Gagal mengambil data pengajuan cuti."),
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

    let leaveType = "";
    let startDateText = "";
    let endDateText = "";
    let reason = "";
    let fileToUpload: File | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      leaveType = String(
        formData.get("leaveType") || formData.get("leave_type") || ""
      ).trim();
      startDateText = String(
        formData.get("startDate") || formData.get("start_date") || ""
      ).trim();
      endDateText = String(
        formData.get("endDate") || formData.get("end_date") || ""
      ).trim();
      reason = String(formData.get("reason") || "").trim();

      const documentFile = formData.get("document") || formData.get("file");
      if (documentFile && documentFile instanceof File && documentFile.size > 0) {
        fileToUpload = documentFile;
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

      leaveType = String(
        body.leaveType || body.leave_type || ""
      ).trim();
      startDateText = String(
        body.startDate || body.start_date || ""
      ).trim();
      endDateText = String(body.endDate || body.end_date || "").trim();
      reason = String(body.reason || "").trim();
    }

    if (!leaveType || !allowedLeaveTypes.includes(leaveType as LeaveType)) {
      return jsonError("Jenis pengajuan tidak valid.");
    }

    if (!startDateText) {
      return jsonError("Tanggal mulai wajib diisi.");
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

    if (endDate.getTime() < startDate.getTime()) {
      return jsonError(
        "Tanggal selesai tidak boleh lebih awal dari tanggal mulai."
      );
    }

    const totalDays = calculateTotalDays(startDate, endDate);

    if (totalDays <= 0) {
      return jsonError("Total hari pengajuan tidak valid.");
    }

    if (leaveType === "annual") {
      await ensureLeaveQuotaColumn();

      let quotaRows: Array<{ leave_quota_yearly: number | null }> = [];
      try {
        quotaRows = await prisma.$queryRawUnsafe<
          Array<{ leave_quota_yearly: number | null }>
        >(
          "SELECT COALESCE(leave_quota_yearly, 12) AS leave_quota_yearly FROM users WHERE id = ? LIMIT 1",
          currentUser.id
        );
      } catch (error) {
        if (!isMissingLeaveQuotaColumnError(error)) throw error;
      }

      const yearlyQuota = Math.max(0, Number(quotaRows[0]?.leave_quota_yearly ?? 12));

      const startOfYear = new Date(Date.UTC(startDate.getUTCFullYear(), 0, 1));
      const endOfYear = new Date(Date.UTC(startDate.getUTCFullYear(), 11, 31, 23, 59, 59));

      const existingAnnualLeaves = await prisma.leaveRequest.aggregate({
        where: {
          user_id: currentUser.id,
          leave_type: "annual",
          status: { in: ["pending", "approved"] },
          start_date: { gte: startOfYear, lte: endOfYear },
        },
        _sum: { total_days: true },
      });

      const usedAnnualDays = existingAnnualLeaves._sum.total_days || 0;
      const remainingQuota = Math.max(0, yearlyQuota - usedAnnualDays);

      if (totalDays > remainingQuota) {
        return jsonError(
          `Sisa kuota cuti tahunan kamu tidak mencukupi (Kuota tahunan: ${yearlyQuota} hari, Terpakai/Pending: ${usedAnnualDays} hari, Sisa: ${remainingQuota} hari, Pengajuan: ${totalDays} hari).`
        );
      }
    }

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

    await ensureLeaveDocumentColumns();

    let documentUrl: string | null = null;
    let documentPublicId: string | null = null;
    let documentName: string | null = null;

    if (fileToUpload) {
      const tempId = `doc-${Date.now()}`;
      const uploadResult = await uploadLeaveDocument(fileToUpload, tempId);
      documentUrl = uploadResult.secure_url;
      documentPublicId = uploadResult.public_id;
      documentName = fileToUpload.name;
    }

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        user_id: currentUser.id,
        leave_type: leaveType as LeaveType,
        start_date: startDate,
        end_date: endDate,
        total_days: totalDays,
        reason,
        document_url: documentUrl,
        document_public_id: documentPublicId,
        document_name: documentName,
        status: "pending",
      },
      select: {
        id: true,
        user_id: true,
        leave_type: true,
        start_date: true,
        end_date: true,
        total_days: true,
        reason: true,
        document_url: true,
        document_public_id: true,
        document_name: true,
        status: true,
        admin_note: true,
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
      leaveType: leaveType as LeaveType,
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
    console.error("POST /api/leave-requests error:", error);

    return jsonError(
      getApiErrorMessage(error, "Gagal mengirim pengajuan cuti."),
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

    if (status === "approved") {
      const existingRequest = await prisma.leaveRequest.findUnique({
        where: {
          id,
        },
        select: {
          user_id: true,
          start_date: true,
          end_date: true,
        },
      });

      if (!existingRequest) {
        return jsonError("Data pengajuan tidak ditemukan.", 404);
      }

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
    console.error("PATCH /api/leave-requests error:", error);

    return jsonError(
      getApiErrorMessage(error, "Gagal memperbarui pengajuan cuti."),
      getApiErrorStatus(error)
    );
  }
}

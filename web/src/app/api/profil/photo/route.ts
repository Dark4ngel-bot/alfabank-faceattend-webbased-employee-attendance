import { Buffer } from "node:buffer";

import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

type ParsedPhotoBody = {
  buffer: Buffer | null;
  mime: string;
};

class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function getUserIdFromRequest(req: NextRequest) {
  try {
    const { id } = await requireAuth(req);
    return id;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const message = error instanceof Error ? error.message.toLowerCase() : "";

    if (message.includes("aktif") || message.includes("akses")) {
      throw new ApiError(403, "Akun kamu sedang tidak aktif.");
    }

    throw new ApiError(401, "Sesi login tidak valid atau sudah kedaluwarsa.");
  }
}

function dataUrlToBuffer(dataUrl: string): ParsedPhotoBody {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);

  if (!match) {
    return {
      buffer: Buffer.from(dataUrl, "base64"),
      mime: "image/jpeg",
    };
  }

  return {
    buffer: Buffer.from(match[2], "base64"),
    mime: match[1].toLowerCase(),
  };
}

async function fileToBuffer(file: File): Promise<ParsedPhotoBody> {
  const arrayBuffer = await file.arrayBuffer();

  return {
    buffer: Buffer.from(arrayBuffer),
    mime: (file.type || "image/jpeg").toLowerCase(),
  };
}

async function parsePhotoBody(req: NextRequest): Promise<ParsedPhotoBody> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();

    const photo =
      formData.get("photo") ||
      formData.get("profilePhoto") ||
      formData.get("profile_photo") ||
      formData.get("avatar") ||
      formData.get("image");

    if (photo instanceof File) {
      return fileToBuffer(photo);
    }

    if (typeof photo === "string" && photo.trim()) {
      return dataUrlToBuffer(photo.trim());
    }

    return {
      buffer: null,
      mime: "image/jpeg",
    };
  }

  if (!contentType.includes("application/json")) {
    throw new ApiError(
      400,
      "Content-Type harus multipart/form-data atau application/json.",
    );
  }

  let body: Record<string, unknown>;

  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    throw new ApiError(400, "Data JSON foto tidak valid.");
  }

  const photoDataUrl =
    typeof body.photo === "string"
      ? body.photo
      : typeof body.profilePhoto === "string"
        ? body.profilePhoto
        : typeof body.profile_photo === "string"
          ? body.profile_photo
          : typeof body.avatar === "string"
            ? body.avatar
            : typeof body.image === "string"
              ? body.image
              : null;

  if (!photoDataUrl?.trim()) {
    return {
      buffer: null,
      mime: "image/jpeg",
    };
  }

  return dataUrlToBuffer(photoDataUrl.trim());
}

async function getSafeUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      employee_code: true,
      name: true,
      email: true,
      role: true,
      employee_type: true,
      phone: true,
      status: true,
      profile_photo: true,
      profile_photo_public_id: true,
      jabatan_id: true,
      department_id: true,
      position_id: true,
      shift_id: true,
      registered_office_id: true,
      npwp_number: true,
      ptkp_status: true,
      base_salary: true,
      created_at: true,
      updated_at: true,
    },
  });
}

function errorResponse(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.status,
      },
    );
  }

  console.error(fallbackMessage, error);

  return NextResponse.json(
    {
      success: false,
      message: "Terjadi kesalahan pada server.",
    },
    {
      status: 500,
    },
  );
}

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);
    const { searchParams } = new URL(req.url);
    const requestedUserId = searchParams.get("userId") || authUser.id;
    const wantsRawPhoto =
      searchParams.get("raw") === "1" || searchParams.has("userId");

    if (
      requestedUserId !== authUser.id &&
      !["admin", "owner"].includes(String(authUser.role || "").toLowerCase())
    ) {
      throw new ApiError(403, "Akses ditolak.");
    }

    if (wantsRawPhoto) {
      const photoUser = await prisma.user.findUnique({
        where: {
          id: requestedUserId,
        },
        select: {
          profile_photo_data: true,
          profile_photo_mime: true,
          profile_photo: true,
        },
      });

      if (!photoUser) {
        throw new ApiError(404, "Data user tidak ditemukan.");
      }

      if (photoUser.profile_photo_data) {
        return new NextResponse(new Uint8Array(photoUser.profile_photo_data), {
          headers: {
            "Content-Type": photoUser.profile_photo_mime || "image/jpeg",
            "Cache-Control": "private, no-store",
          },
        });
      }

      throw new ApiError(404, "Foto profil belum tersedia.");
    }

    const userId = authUser.id;
    const user = await getSafeUser(userId);

    if (!user) {
      throw new ApiError(404, "Data user tidak ditemukan.");
    }

    return NextResponse.json({
      success: true,
      photoUrl: user.profile_photo,
      profilePhoto: user.profile_photo,
      photo: user.profile_photo,
      user,
    });
  } catch (error) {
    return errorResponse(error, "GET_PROFILE_PHOTO_ERROR:");
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        status: true,
        profile_photo_public_id: true,
      },
    });

    if (!currentUser) {
      throw new ApiError(404, "Data user tidak ditemukan.");
    }

    if (currentUser.status !== "active") {
      throw new ApiError(403, "Akun kamu sedang tidak aktif.");
    }

    const { buffer, mime } = await parsePhotoBody(req);

    if (!buffer || buffer.length === 0) {
      throw new ApiError(400, "Foto profil wajib dikirim.");
    }

    if (!ALLOWED_MIME_TYPES.has(mime)) {
      throw new ApiError(400, "Format foto harus JPG, PNG, atau WEBP.");
    }

    if (buffer.length > MAX_PHOTO_SIZE) {
      throw new ApiError(400, "Ukuran foto maksimal 5MB.");
    }

    const photoUrl = `/api/profil/photo?userId=${encodeURIComponent(
      userId,
    )}&raw=1`;
    const photoPublicId = null;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_photo: photoUrl,
        profile_photo_public_id: photoPublicId,
        profile_photo_data: Uint8Array.from(buffer),
        profile_photo_mime: mime,
      },
      select: {
        id: true,
        employee_code: true,
        name: true,
        email: true,
        role: true,
        employee_type: true,
        phone: true,
        status: true,
        profile_photo: true,
        profile_photo_public_id: true,
        jabatan_id: true,
        department_id: true,
        position_id: true,
        shift_id: true,
        registered_office_id: true,
        npwp_number: true,
        ptkp_status: true,
        base_salary: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Foto profil berhasil diperbarui.",
      photoUrl,
      profilePhoto: photoUrl,
      photo: photoUrl,
      publicId: photoPublicId,
      user: updatedUser,
    });
  } catch (error) {
    return errorResponse(error, "UPDATE_PROFILE_PHOTO_ERROR:");
  }
}

export async function POST(req: NextRequest) {
  return PATCH(req);
}

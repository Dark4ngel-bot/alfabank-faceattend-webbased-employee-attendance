import type { UploadApiResponse } from "cloudinary";

import { NextRequest, NextResponse } from "next/server";

import { requireOwnerUser } from "@/lib/api-auth";
import { getCloudinary } from "@/lib/cloudinary";
import { DEFAULT_SITE_LOGO_SRC } from "@/lib/site-logo-defaults";
import {
  getSiteLogoSettings,
  updateSiteLogoSrc,
} from "@/lib/site-logo";

export const runtime = "nodejs";

const allowedMimeTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
]);

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status,
    },
  );
}

async function uploadSiteLogo(buffer: Buffer): Promise<UploadApiResponse> {
  const cloudinary = getCloudinary();

  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "presensi/settings",
        public_id: "site-logo",
        resource_type: "image",
        overwrite: true,
        invalidate: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary tidak mengembalikan hasil upload."));
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}

export async function GET(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const logo = await getSiteLogoSettings();

    return NextResponse.json({
      success: true,
      logo,
    });
  } catch (error) {
    console.error("GET /api/admin/site-logo error:", error);

    return jsonError("Gagal mengambil logo aplikasi.", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const formData = await req.formData();
    const file = formData.get("logo");

    if (!(file instanceof File)) {
      return jsonError("File logo wajib dipilih.", 400);
    }

    if (!allowedMimeTypes.has(file.type)) {
      return jsonError("Format logo harus PNG, JPG, WEBP, atau SVG.", 400);
    }

    if (file.size > 2 * 1024 * 1024) {
      return jsonError("Ukuran logo maksimal 2MB.", 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadSiteLogo(buffer);

    const logoSrc = await updateSiteLogoSrc(uploadResult.secure_url);

    return NextResponse.json({
      success: true,
      message: "Logo aplikasi berhasil diperbarui.",
      logo: {
        logoSrc,
        fallbackLogoSrc: DEFAULT_SITE_LOGO_SRC,
      },
    });
  } catch (error) {
    console.error("POST /api/admin/site-logo error:", error);

    return jsonError("Gagal memperbarui logo aplikasi.", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const logoSrc = await updateSiteLogoSrc(DEFAULT_SITE_LOGO_SRC);

    return NextResponse.json({
      success: true,
      message: "Logo aplikasi berhasil dikembalikan ke default.",
      logo: {
        logoSrc,
        fallbackLogoSrc: DEFAULT_SITE_LOGO_SRC,
      },
    });
  } catch (error) {
    console.error("DELETE /api/admin/site-logo error:", error);

    return jsonError("Gagal mengembalikan logo aplikasi.", 500);
  }
}

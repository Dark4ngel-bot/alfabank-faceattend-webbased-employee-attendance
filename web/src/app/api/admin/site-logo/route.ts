import type { UploadApiResponse } from "cloudinary";

import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

import { requireOwnerUser } from "@/lib/api-auth";
import { getCloudinary } from "@/lib/cloudinary";
import {
  DEFAULT_SITE_LOGO_SRC,
  DEFAULT_SITE_TITLE,
} from "@/lib/site-logo-defaults";
import {
  getSiteLogoSettings,
  updateSiteLogoSrc,
  updateSiteTitle,
} from "@/lib/site-logo";

export const runtime = "nodejs";

const allowedMimeTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/x-png",
  "image/webp",
  "image/svg+xml",
]);

const allowedExtensions = new Set(["png", "jpg", "jpeg", "webp", "svg"]);

function isAllowedFile(file: File): boolean {
  if (file.type && allowedMimeTypes.has(file.type.toLowerCase())) {
    return true;
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  return allowedExtensions.has(ext);
}

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

async function uploadSiteLogoCloudinary(buffer: Buffer): Promise<UploadApiResponse> {
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

async function processLogoUpload(buffer: Buffer, file: File): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    try {
      const uploadResult = await uploadSiteLogoCloudinary(buffer);
      if (uploadResult?.secure_url) {
        return uploadResult.secure_url;
      }
    } catch (err) {
      console.warn("Cloudinary upload failed, falling back to local file storage:", err);
    }
  }

  // Local storage fallback for environment without Cloudinary keys
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const filename = `site-logo-${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.writeFile(filePath, buffer);
    return `/uploads/${filename}`;
  } catch (err) {
    console.warn("Local file storage failed, falling back to data URI:", err);
    const mimeType = file.type || "image/png";
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  }
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

    const message =
      error instanceof Error && error.message
        ? error.message
        : "Gagal mengambil logo aplikasi.";

    return jsonError(message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (typeof body.siteTitle === "string") {
        await updateSiteTitle(body.siteTitle);
        const logo = await getSiteLogoSettings();
        return NextResponse.json({
          success: true,
          message: "Nama aplikasi berhasil diperbarui.",
          logo,
        });
      }
    }

    const formData = await req.formData();
    const siteTitleVal = formData.get("siteTitle");

    if (typeof siteTitleVal === "string" && siteTitleVal.trim()) {
      await updateSiteTitle(siteTitleVal);
    }

    const file = formData.get("logo");
    if (file instanceof File) {
      if (!isAllowedFile(file)) {
        return jsonError("Format logo harus PNG, JPG, WEBP, atau SVG.", 400);
      }

      if (file.size > 2 * 1024 * 1024) {
        return jsonError("Ukuran logo maksimal 2MB.", 400);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const logoUrl = await processLogoUpload(buffer, file);
      await updateSiteLogoSrc(logoUrl);
    }

    const logo = await getSiteLogoSettings();

    return NextResponse.json({
      success: true,
      message: "Pengaturan berhasil diperbarui.",
      logo,
    });
  } catch (error) {
    console.error("POST /api/admin/site-logo error:", error);

    const message =
      error instanceof Error && error.message
        ? error.message
        : "Gagal memperbarui aplikasi.";

    return jsonError(message, 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const target = req.nextUrl.searchParams.get("target");

    if (target === "title") {
      await updateSiteTitle(DEFAULT_SITE_TITLE);
    } else if (target === "logo") {
      await updateSiteLogoSrc(DEFAULT_SITE_LOGO_SRC);
    } else {
      await updateSiteLogoSrc(DEFAULT_SITE_LOGO_SRC);
      await updateSiteTitle(DEFAULT_SITE_TITLE);
    }

    const logo = await getSiteLogoSettings();

    return NextResponse.json({
      success: true,
      message: "Pengaturan berhasil dikembalikan ke default.",
      logo,
    });
  } catch (error) {
    console.error("DELETE /api/admin/site-logo error:", error);

    const message =
      error instanceof Error && error.message
        ? error.message
        : "Gagal mengembalikan pengaturan aplikasi.";

    return jsonError(message, 500);
  }
}

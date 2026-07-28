import { NextRequest, NextResponse } from "next/server";
import { requireOwner } from "@/lib/api-auth";
import { getApiErrorMessage } from "@/lib/api-errors";
import path from "path";
import { promises as fs } from "fs";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await requireOwner(req);

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File dokumen SK wajib diunggah." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".pdf";
    const filename = `SK_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "documents", "sk");

    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/documents/sk/${filename}`;

    return NextResponse.json({
      success: true,
      message: "File SK berhasil diunggah.",
      file_url: fileUrl,
      uploaded_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("UPLOAD_SK_ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: getApiErrorMessage(error, "Gagal mengunggah file SK."),
      },
      { status: 500 }
    );
  }
}

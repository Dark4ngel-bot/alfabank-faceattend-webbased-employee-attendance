import { NextRequest, NextResponse } from "next/server";

import { requireAuth, requireOwner } from "@/lib/api-auth";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api-errors";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(req.url);
    const audience = searchParams.get("audience") || "employee";

    if (audience === "admin") {
      await requireOwner(req);
    } else {
      await requireAuth(req);
    }

    const announcement = await prisma.announcement.findFirst({
      where: {
        id,
        ...(audience === "admin" ? {} : { status: "published" }),
      },
      select: {
        document_mime: true,
        document_name: true,
        document_url: true,
      },
    });

    if (!announcement || !announcement.document_url) {
      return NextResponse.json(
        { message: "Dokumen pengumuman tidak ditemukan." },
        { status: 404 },
      );
    }

    if (announcement.document_url.startsWith("http://") || announcement.document_url.startsWith("https://")) {
      return NextResponse.redirect(announcement.document_url);
    }

    return NextResponse.json(
      { message: "Dokumen pengumuman belum tersedia." },
      { status: 404 },
    );
  } catch (error) {
    console.error("ANNOUNCEMENT_DOCUMENT_ERROR:", error);

    return NextResponse.json(
      {
        message: getApiErrorMessage(
          error,
          "Gagal mengambil dokumen pengumuman.",
        ),
      },
      { status: getApiErrorStatus(error) },
    );
  }
}

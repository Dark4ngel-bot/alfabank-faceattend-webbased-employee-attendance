import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/api-auth";
import { getApiErrorMessage } from "@/lib/api-errors";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const numbers = await prisma.adminNumber.findMany({
      orderBy: { created_at: "desc" },
    });

    const activeNumber = numbers.find((n) => n.is_active) || null;

    return NextResponse.json({
      success: true,
      numbers,
      activeNumber,
    });
  } catch (error) {
    console.error("GET /api/admin/nomor-admin error:", error);
    return NextResponse.json(
      { success: false, message: getApiErrorMessage(error, "Gagal mengambil data nomor admin.") },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireOwner(req);
    const body = await req.json();

    const label = String(body.label || "").trim();
    const whatsapp = String(body.whatsapp || "").trim();
    const isActive = Boolean(body.is_active);

    if (!label) {
      return NextResponse.json(
        { success: false, message: "Label nomor admin wajib diisi." },
        { status: 400 }
      );
    }

    if (!whatsapp) {
      return NextResponse.json(
        { success: false, message: "Nomor WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    if (isActive) {
      await prisma.adminNumber.updateMany({
        data: { is_active: false },
      });
    }

    const created = await prisma.adminNumber.create({
      data: {
        label,
        whatsapp,
        is_active: isActive,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Nomor admin berhasil ditambahkan.",
      data: created,
    });
  } catch (error) {
    console.error("POST /api/admin/nomor-admin error:", error);
    return NextResponse.json(
      { success: false, message: getApiErrorMessage(error, "Gagal menambah nomor admin.") },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireOwner(req);
    const body = await req.json();
    const id = String(body.id || "").trim();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID nomor admin wajib dikirim." },
        { status: 400 }
      );
    }

    if (body.is_active !== undefined) {
      if (body.is_active) {
        await prisma.adminNumber.updateMany({
          data: { is_active: false },
        });
      }
    }

    const updated = await prisma.adminNumber.update({
      where: { id },
      data: {
        ...(body.label ? { label: String(body.label).trim() } : {}),
        ...(body.whatsapp ? { whatsapp: String(body.whatsapp).trim() } : {}),
        ...(body.is_active !== undefined ? { is_active: Boolean(body.is_active) } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Nomor admin berhasil diperbarui.",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/admin/nomor-admin error:", error);
    return NextResponse.json(
      { success: false, message: getApiErrorMessage(error, "Gagal memperbarui nomor admin.") },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireOwner(req);
    const { searchParams } = new URL(req.url);
    const id = String(searchParams.get("id") || "").trim();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID nomor admin wajib dikirim." },
        { status: 400 }
      );
    }

    await prisma.adminNumber.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Nomor admin berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/nomor-admin error:", error);
    return NextResponse.json(
      { success: false, message: getApiErrorMessage(error, "Gagal menghapus nomor admin.") },
      { status: 500 }
    );
  }
}

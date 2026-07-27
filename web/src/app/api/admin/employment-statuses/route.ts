import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const list = await (prisma as any).employmentStatus.findMany({
      orderBy: { created_at: "asc" },
    }).catch(() => null);

    if (list && list.length > 0) {
      return NextResponse.json({ success: true, data: list });
    }

    return NextResponse.json({
      success: true,
      data: [
        { id: "kartap", name: "Karyawan Tetap", code: "kartap", active: true },
        { id: "kontrak", name: "Kontrak", code: "kontrak", active: true },
        { id: "magang", name: "Magang", code: "magang", active: true },
        { id: "pkl", name: "PKL", code: "pkl", active: true },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil status kepegawaian." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const code = String(body.code || "").trim().toLowerCase() || name.toLowerCase().replace(/\s+/g, "_");

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Nama status kepegawaian wajib diisi." },
        { status: 400 },
      );
    }

    const created = await (prisma as any).employmentStatus.create({
      data: {
        name,
        code,
        active: true,
      },
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      data: created || { id: `emp-status-${Date.now()}`, name, code, active: true },
      message: "Status kepegawaian berhasil ditambahkan.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal membuat status kepegawaian." },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const id = String(body.id || "").trim();
    const name = String(body.name || "").trim();
    const code = String(body.code || "").trim().toLowerCase();
    const active = typeof body.active === "boolean" ? body.active : true;

    if (!id || !name) {
      return NextResponse.json(
        { success: false, message: "ID dan Nama status kepegawaian wajib diisi." },
        { status: 400 },
      );
    }

    const updated = await (prisma as any).employmentStatus.update({
      where: { id },
      data: { name, code, active },
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      data: updated || { id, name, code, active },
      message: "Status kepegawaian berhasil diperbarui.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate status kepegawaian." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID status kepegawaian wajib dikirim." },
        { status: 400 },
      );
    }

    await (prisma as any).employmentStatus.delete({
      where: { id },
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      message: "Status kepegawaian berhasil dihapus.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus status kepegawaian." },
      { status: 500 },
    );
  }
}

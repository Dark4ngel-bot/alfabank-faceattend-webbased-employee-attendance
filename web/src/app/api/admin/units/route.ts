import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type AllowedRole = "owner" | "admin";

const VIEW_ROLES: AllowedRole[] = ["owner", "admin"];
const MANAGE_ROLES: AllowedRole[] = ["owner", "admin"];

const unitSelect = {
  id: true,
  name: true,
  status: true,
  created_at: true,
  updated_at: true,
  _count: {
    select: {
      users: true,
    },
  },
} as const;

async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("faceattend_token")?.value;

  if (!token) throw new Error("Token login tidak ditemukan.");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET belum ada di file .env");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  const userId =
    (payload.id as string | undefined) ||
    (payload.userId as string | undefined) ||
    (payload.sub as string | undefined);

  if (!userId) throw new Error("User ID tidak ditemukan di token.");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, status: true },
  });

  if (!user) throw new Error("User tidak ditemukan.");

  return user;
}

function canAccess(role: string, roles: AllowedRole[]) {
  return roles.includes(role.toLowerCase() as AllowedRole);
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

function getPrismaCode(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    return (error as { code?: string }).code;
  }

  return undefined;
}

function isPrismaForeignKeyError(error: unknown) {
  return getPrismaCode(error) === "P2003";
}

function isPrismaUniqueError(error: unknown) {
  return getPrismaCode(error) === "P2002";
}

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, VIEW_ROLES)
    ) {
      return jsonError("Akses ditolak.", 403);
    }

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const units = await prisma.unit.findMany({
      where: {
        AND: [
          search ? { name: { contains: search } } : {},
          status !== "all" ? { status } : {},
        ],
      },
      select: unitSelect,
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      units,
    });
  } catch (error) {
    console.error("GET /api/admin/units error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal mengambil data unit.",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, MANAGE_ROLES)
    ) {
      return jsonError("Akses ditolak. Hanya admin yang dapat menambah unit.", 403);
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim();

    if (!name) return jsonError("Nama unit wajib diisi.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status unit tidak valid.");
    }

    const unit = await prisma.unit.create({
      data: { name, status },
      select: unitSelect,
    });

    return NextResponse.json({
      success: true,
      message: "Unit berhasil dibuat.",
      unit,
    });
  } catch (error) {
    console.error("POST /api/admin/units error:", error);

    if (isPrismaUniqueError(error)) return jsonError("Nama unit sudah digunakan.", 409);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal menambahkan unit.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, MANAGE_ROLES)
    ) {
      return jsonError("Akses ditolak. Hanya admin yang dapat mengubah unit.", 403);
    }

    const body = await req.json();
    const id = String(body.id || "").trim();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim();

    if (!id) return jsonError("ID unit wajib dikirim.");
    if (!name) return jsonError("Nama unit wajib diisi.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status unit tidak valid.");
    }

    const existingUnit = await prisma.unit.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingUnit) return jsonError("Unit tidak ditemukan.", 404);

    const unit = await prisma.unit.update({
      where: { id },
      data: { name, status },
      select: unitSelect,
    });

    return NextResponse.json({
      success: true,
      message: "Unit berhasil diperbarui.",
      unit,
    });
  } catch (error) {
    console.error("PATCH /api/admin/units error:", error);

    if (isPrismaUniqueError(error)) return jsonError("Nama unit sudah digunakan.", 409);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal memperbarui unit.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, MANAGE_ROLES)
    ) {
      return jsonError("Akses ditolak. Hanya admin yang dapat menghapus unit.", 403);
    }

    const id = req.nextUrl.searchParams.get("id") || "";
    if (!id) return jsonError("ID unit wajib dikirim.");

    const unit = await prisma.unit.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            users: true,
          },
        },
      },
    });

    if (!unit) return jsonError("Unit tidak ditemukan.", 404);

    if (unit._count.users > 0) {
      return jsonError(
        "Unit ini masih digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
      );
    }

    await prisma.unit.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Unit berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/units error:", error);

    if (isPrismaForeignKeyError(error)) {
      return jsonError(
        "Unit tidak bisa dihapus karena masih memiliki relasi. Ubah status menjadi Nonaktif.",
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal menghapus unit.",
      },
      { status: 500 },
    );
  }
}

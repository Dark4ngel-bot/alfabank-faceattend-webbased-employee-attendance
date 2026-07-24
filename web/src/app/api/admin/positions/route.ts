import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type AllowedRole = "owner" | "admin";

const VIEW_ROLES: AllowedRole[] = ["owner", "admin"];
const MANAGE_ROLES: AllowedRole[] = ["owner", "admin"];

const positionSelect = {
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

function isPrismaUniqueError(error: unknown) {
  return getPrismaCode(error) === "P2002";
}

function isPrismaForeignKeyError(error: unknown) {
  return getPrismaCode(error) === "P2003";
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

    const positions = await prisma.position.findMany({
      where: {
        AND: [
          search ? { name: { contains: search } } : {},
          status !== "all" ? { status } : {},
        ],
      },
      select: positionSelect,
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      positions,
      data: positions,
    });
  } catch (error) {
    console.error("GET /api/admin/positions error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil data jabatan.",
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
      return jsonError("Akses ditolak. Hanya admin yang dapat menambah jabatan.", 403);
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim();

    if (!name) return jsonError("Nama jabatan wajib diisi.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status jabatan tidak valid.");
    }

    const position = await prisma.position.create({
      data: { name, status },
      select: positionSelect,
    });

    return NextResponse.json({
      success: true,
      message: "Jabatan berhasil ditambahkan.",
      position,
    });
  } catch (error) {
    console.error("POST /api/admin/positions error:", error);

    if (isPrismaUniqueError(error)) return jsonError("Nama jabatan sudah digunakan.", 409);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal menambahkan jabatan.",
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
      return jsonError("Akses ditolak. Hanya admin yang dapat mengubah jabatan.", 403);
    }

    const body = await req.json();
    const id = String(body.id || "").trim();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim();

    if (!id) return jsonError("ID jabatan wajib dikirim.");
    if (!name) return jsonError("Nama jabatan wajib diisi.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status jabatan tidak valid.");
    }

    const existingPosition = await prisma.position.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingPosition) return jsonError("Jabatan tidak ditemukan.", 404);

    const position = await prisma.position.update({
      where: { id },
      data: { name, status },
      select: positionSelect,
    });

    return NextResponse.json({
      success: true,
      message: "Jabatan berhasil diperbarui.",
      position,
    });
  } catch (error) {
    console.error("PATCH /api/admin/positions error:", error);

    if (isPrismaUniqueError(error)) return jsonError("Nama jabatan sudah digunakan.", 409);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal memperbarui jabatan.",
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
      return jsonError("Akses ditolak. Hanya admin yang dapat menghapus jabatan.", 403);
    }

    const id = req.nextUrl.searchParams.get("id") || "";
    if (!id) return jsonError("ID jabatan wajib dikirim.");

    const position = await prisma.position.findUnique({
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

    if (!position) return jsonError("Jabatan tidak ditemukan.", 404);

    if ((position._count?.users || 0) > 0) {
      return jsonError(
        "Jabatan ini masih digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
      );
    }

    await prisma.position.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Jabatan berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/positions error:", error);

    if (isPrismaForeignKeyError(error)) {
      return jsonError(
        "Jabatan tidak bisa dihapus karena masih memiliki relasi data lain. Ubah status menjadi Nonaktif.",
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal menghapus jabatan.",
      },
      { status: 500 },
    );
  }
}

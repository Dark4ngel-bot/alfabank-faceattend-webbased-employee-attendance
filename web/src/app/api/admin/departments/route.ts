import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type AllowedRole = "owner" | "admin";

const VIEW_ROLES: AllowedRole[] = ["owner", "admin"];
const MANAGE_ROLES: AllowedRole[] = ["owner", "admin"];

const departmentSelect = {
  id: true,
  name: true,
  shift_id: true,
  salary_calculation: true,
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

    const departments = await prisma.department.findMany({
      where: {
        AND: [
          search ? { name: { contains: search } } : {},
          status !== "all" ? { status } : {},
        ],
      },
      select: departmentSelect,
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error("GET /api/admin/departments error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil data divisi.",
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
      return jsonError("Akses ditolak. Hanya admin yang dapat menambah divisi.", 403);
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim();

    if (!name) return jsonError("Nama divisi wajib diisi.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status divisi tidak valid.");
    }

    const department = await prisma.department.create({
      data: { name, status },
      select: departmentSelect,
    });

    return NextResponse.json({
      success: true,
      message: "Divisi berhasil dibuat.",
      department,
    });
  } catch (error) {
    console.error("POST /api/admin/departments error:", error);

    if (isPrismaUniqueError(error)) return jsonError("Nama divisi sudah digunakan.", 409);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal menambahkan divisi.",
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
      return jsonError("Akses ditolak. Hanya admin yang dapat mengubah divisi.", 403);
    }

    const body = await req.json();
    const id = String(body.id || "").trim();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active").trim();

    if (!id) return jsonError("ID divisi wajib dikirim.");
    if (!name) return jsonError("Nama divisi wajib diisi.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status divisi tidak valid.");
    }

    const existingDepartment = await prisma.department.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingDepartment) return jsonError("Divisi tidak ditemukan.", 404);

    const department = await prisma.department.update({
      where: { id },
      data: { name, status },
      select: departmentSelect,
    });

    return NextResponse.json({
      success: true,
      message: "Divisi berhasil diperbarui.",
      department,
    });
  } catch (error) {
    console.error("PATCH /api/admin/departments error:", error);

    if (isPrismaUniqueError(error)) return jsonError("Nama divisi sudah digunakan.", 409);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal memperbarui divisi.",
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
      return jsonError("Akses ditolak. Hanya admin yang dapat menghapus divisi.", 403);
    }

    const id = req.nextUrl.searchParams.get("id") || "";
    if (!id) return jsonError("ID divisi wajib dikirim.");

    const department = await prisma.department.findUnique({
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

    if (!department) return jsonError("Divisi tidak ditemukan.", 404);

    if (department._count.users > 0) {
      return jsonError(
        "Divisi ini masih digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
      );
    }

    await prisma.department.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Divisi berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/departments error:", error);

    if (isPrismaForeignKeyError(error)) {
      return jsonError(
        "Divisi tidak bisa dihapus karena masih memiliki relasi. Ubah status menjadi Nonaktif.",
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal menghapus divisi.",
      },
      { status: 500 },
    );
  }
}

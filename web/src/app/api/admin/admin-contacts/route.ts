import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type AllowedRole = "owner" | "admin";

const VIEW_ROLES: AllowedRole[] = ["owner", "admin"];
const MANAGE_ROLES: AllowedRole[] = ["owner", "admin"];

const adminContactSelect = {
  id: true,
  name: true,
  role_title: true,
  phone: true,
  whatsapp: true,
  email: true,
  note: true,
  status: true,
  created_at: true,
  updated_at: true,
} as const;

async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("faceattend_token")?.value;

  if (!token) throw new Error("Token login tidak ditemukan.");
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET belum ada di file .env");
  }

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

async function getPrimaryAdminContact() {
  return prisma.adminContact.findFirst({
    where: { status: "active" },
    select: adminContactSelect,
    orderBy: [{ updated_at: "desc" }, { created_at: "asc" }],
  });
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

function cleanOptionalText(value: unknown) {
  const text = String(value || "").trim();

  return text || null;
}

function cleanPhone(value: unknown) {
  return String(value || "")
    .trim()
    .replace(/[^\d+]/g, "");
}

function mapAdminContact(contact: {
  id: string;
  name: string;
  role_title: string | null;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  note: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
}) {
  return {
    ...contact,
    roleTitle: contact.role_title,
  };
}

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);
    const searchParams = req.nextUrl.searchParams;
    const primaryOnly =
      searchParams.get("primary") === "1" ||
      searchParams.get("single") === "1";

    if (primaryOnly && currentUser.status === "active") {
      const adminContact = await getPrimaryAdminContact();

      return NextResponse.json({
        success: true,
        adminContact: adminContact ? mapAdminContact(adminContact) : null,
      });
    }

    if (
      currentUser.status !== "active" ||
      !canAccess(currentUser.role, VIEW_ROLES)
    ) {
      return jsonError("Akses ditolak.", 403);
    }

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const adminContacts = await prisma.adminContact.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search } },
                  { role_title: { contains: search } },
                  { phone: { contains: search } },
                  { whatsapp: { contains: search } },
                  { email: { contains: search } },
                ],
              }
            : {},
          status !== "all" ? { status } : {},
        ],
      },
      select: adminContactSelect,
      orderBy: [{ status: "asc" }, { name: "asc" }],
    });

    const data = adminContacts.map(mapAdminContact);

    return NextResponse.json({
      success: true,
      adminContacts: data,
      data,
    });
  } catch (error) {
    console.error("GET /api/admin/admin-contacts error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil kontak admin.",
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
      return jsonError(
        "Akses ditolak. Hanya admin yang dapat menambah kontak admin.",
        403,
      );
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const roleTitle = cleanOptionalText(body.roleTitle || body.role_title);
    const phone = cleanPhone(body.phone);
    const whatsapp = cleanPhone(body.whatsapp) || null;
    const email = cleanOptionalText(body.email);
    const note = cleanOptionalText(body.note);
    const status = String(body.status || "active").trim();

    if (!name) return jsonError("Nama kontak admin wajib diisi.");
    if (!phone) return jsonError("Nomor telepon kontak admin wajib diisi.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status tidak valid.");
    }

    const adminContact = await prisma.$transaction(async (tx) => {
      const createdContact = await tx.adminContact.create({
        data: {
          name,
          role_title: roleTitle,
          phone,
          whatsapp,
          email,
          note,
          status,
        },
        select: adminContactSelect,
      });

      if (status === "active") {
        await tx.adminContact.updateMany({
          where: { id: { not: createdContact.id } },
          data: { status: "inactive" },
        });
      }

      return createdContact;
    });

    return NextResponse.json({
      success: true,
      message: "Kontak admin berhasil dibuat.",
      adminContact: mapAdminContact(adminContact),
    });
  } catch (error) {
    console.error("POST /api/admin/admin-contacts error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal menambahkan kontak admin.",
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
      return jsonError(
        "Akses ditolak. Hanya admin yang dapat mengubah kontak admin.",
        403,
      );
    }

    const body = await req.json();
    const id = String(body.id || "").trim();
    const name = String(body.name || "").trim();
    const roleTitle = cleanOptionalText(body.roleTitle || body.role_title);
    const phone = cleanPhone(body.phone);
    const whatsapp = cleanPhone(body.whatsapp) || null;
    const email = cleanOptionalText(body.email);
    const note = cleanOptionalText(body.note);
    const status = String(body.status || "active").trim();

    if (!id) return jsonError("ID kontak admin wajib dikirim.");
    if (!name) return jsonError("Nama kontak admin wajib diisi.");
    if (!phone) return jsonError("Nomor telepon kontak admin wajib diisi.");
    if (!["active", "inactive"].includes(status)) {
      return jsonError("Status tidak valid.");
    }

    const adminContact = await prisma.$transaction(async (tx) => {
      const updatedContact = await tx.adminContact.update({
        where: { id },
        data: {
          name,
          role_title: roleTitle,
          phone,
          whatsapp,
          email,
          note,
          status,
        },
        select: adminContactSelect,
      });

      if (status === "active") {
        await tx.adminContact.updateMany({
          where: { id: { not: updatedContact.id } },
          data: { status: "inactive" },
        });
      }

      return updatedContact;
    });

    return NextResponse.json({
      success: true,
      message: "Kontak admin berhasil diperbarui.",
      adminContact: mapAdminContact(adminContact),
    });
  } catch (error) {
    console.error("PATCH /api/admin/admin-contacts error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal memperbarui kontak admin.",
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
      return jsonError(
        "Akses ditolak. Hanya admin yang dapat menghapus kontak admin.",
        403,
      );
    }

    const id = req.nextUrl.searchParams.get("id") || "";

    if (!id) return jsonError("ID kontak admin wajib dikirim.");

    await prisma.adminContact.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Kontak admin berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/admin-contacts error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal menghapus kontak admin.",
      },
      { status: 500 },
    );
  }
}

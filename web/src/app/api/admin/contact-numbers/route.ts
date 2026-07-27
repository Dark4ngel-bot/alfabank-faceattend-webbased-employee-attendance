import { NextRequest, NextResponse } from "next/server";
import {
  createAdminContactNumber,
  deleteAdminContactNumber,
  isDuplicateContactNumberError,
  listAdminContactNumbers,
  updateAdminContactNumber,
} from "@/lib/admin-contact-numbers";
import { requireOwnerUser } from "@/lib/api-auth";

export const runtime = "nodejs";

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status },
  );
}

function normalizePhoneNumber(value: unknown) {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;

  return digits;
}

export async function GET(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const numbers = await listAdminContactNumbers();

    return NextResponse.json({
      success: true,
      numbers,
    });
  } catch (error) {
    console.error("GET /api/admin/contact-numbers error:", error);

    return jsonError("Gagal mengambil nomor admin.", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const body = await req.json();
    const label = String(body.label || "Admin").trim();
    const phoneNumber = normalizePhoneNumber(body.phone_number || body.phoneNumber);
    const isActive = Boolean(body.is_active || body.isActive);

    if (!label) return jsonError("Label wajib diisi.", 400);
    if (!phoneNumber) return jsonError("Nomor admin wajib diisi.", 400);
    if (phoneNumber.length < 9 || phoneNumber.length > 15) {
      return jsonError("Nomor admin harus 9 sampai 15 digit.", 400);
    }

    const number = await createAdminContactNumber({
      label,
      phoneNumber,
      isActive,
    });

    return NextResponse.json({
      success: true,
      message: "Nomor admin berhasil ditambahkan.",
      number,
    });
  } catch (error) {
    console.error("POST /api/admin/contact-numbers error:", error);

    if (isDuplicateContactNumberError(error)) {
      return jsonError("Nomor admin sudah terdaftar.", 409);
    }

    return jsonError("Gagal menambah nomor admin.", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const body = await req.json();
    const id = String(body.id || "").trim();
    const label = String(body.label || "").trim();
    const phoneNumber =
      body.phone_number !== undefined || body.phoneNumber !== undefined
        ? normalizePhoneNumber(body.phone_number || body.phoneNumber)
        : undefined;
    const isActive =
      body.is_active !== undefined || body.isActive !== undefined
        ? Boolean(body.is_active || body.isActive)
        : undefined;

    if (!id) return jsonError("ID nomor admin wajib dikirim.", 400);
    if (phoneNumber !== undefined && !phoneNumber) {
      return jsonError("Nomor admin wajib diisi.", 400);
    }
    if (
      phoneNumber !== undefined &&
      (phoneNumber.length < 9 || phoneNumber.length > 15)
    ) {
      return jsonError("Nomor admin harus 9 sampai 15 digit.", 400);
    }

    const number = await updateAdminContactNumber(id, {
      ...(label
        ? {
            label,
          }
        : {}),
      ...(phoneNumber !== undefined
        ? {
            phoneNumber,
          }
        : {}),
      ...(isActive !== undefined
        ? {
            isActive,
          }
        : {}),
    });

    return NextResponse.json({
      success: true,
      message: "Nomor admin berhasil diperbarui.",
      number,
    });
  } catch (error) {
    console.error("PATCH /api/admin/contact-numbers error:", error);

    if (isDuplicateContactNumberError(error)) {
      return jsonError("Nomor admin sudah terdaftar.", 409);
    }

    return jsonError(
      error instanceof Error && error.message === "Nomor admin tidak ditemukan."
        ? error.message
        : "Gagal mengubah nomor admin.",
      error instanceof Error && error.message === "Nomor admin tidak ditemukan."
        ? 404
        : 500,
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireOwnerUser(req);

    const id = String(req.nextUrl.searchParams.get("id") || "").trim();

    if (!id) return jsonError("ID nomor admin wajib dikirim.", 400);

    await deleteAdminContactNumber(id);

    return NextResponse.json({
      success: true,
      message: "Nomor admin berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/contact-numbers error:", error);

    return jsonError("Gagal menghapus nomor admin.", 500);
  }
}

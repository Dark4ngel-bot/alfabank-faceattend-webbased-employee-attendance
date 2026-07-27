import { NextRequest, NextResponse } from "next/server";
import { getActiveAdminContactNumber } from "@/lib/admin-contact-numbers";
import { requireAuth } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    await requireAuth(req);

    const number = await getActiveAdminContactNumber();

    return NextResponse.json({
      success: true,
      number,
    });
  } catch (error) {
    console.error("GET /api/admin-contact-number error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil nomor admin aktif.",
      },
      { status: 500 },
    );
  }
}

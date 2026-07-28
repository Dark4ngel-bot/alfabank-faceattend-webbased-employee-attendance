import { NextResponse } from "next/server";

import { getSiteLogoSettings } from "@/lib/site-logo";

export const runtime = "nodejs";

export async function GET() {
  try {
    const logo = await getSiteLogoSettings();

    return NextResponse.json({
      success: true,
      logo,
    });
  } catch (error) {
    console.error("GET /api/site-logo error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil logo aplikasi.",
      },
      {
        status: 500,
      },
    );
  }
}

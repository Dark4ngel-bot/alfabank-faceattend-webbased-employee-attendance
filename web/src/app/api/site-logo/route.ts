import { NextResponse } from "next/server";

import { getSiteLogoSettings } from "@/lib/site-logo";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    if (searchParams.get("raw") === "1") {
      const logo = await getSiteLogoSettings();

      return NextResponse.redirect(new URL(logo.logoSrc, req.url));
    }

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

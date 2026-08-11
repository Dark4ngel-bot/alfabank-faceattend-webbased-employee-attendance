import { NextResponse } from "next/server";

import { ensureSiteLogoFile, getSiteLogoSettings } from "@/lib/site-logo";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    if (searchParams.get("raw") === "1") {
      const logo = await ensureSiteLogoFile();

      return new NextResponse(logo.buffer, {
        headers: {
          "Content-Type": logo.mime,
          "Cache-Control": "no-store",
        },
      });
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

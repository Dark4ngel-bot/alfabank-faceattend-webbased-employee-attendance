import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { DEFAULT_SITE_LOGO_SRC } from "@/lib/site-logo-defaults";
import { getSiteLogoSettings } from "@/lib/site-logo";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    if (searchParams.get("raw") === "1") {
      const setting = await prisma.appSetting.findUnique({
        where: {
          setting_key: "site_logo_src",
        },
        select: {
          setting_file: true,
          setting_mime: true,
        },
      });

      if (!setting?.setting_file) {
        return NextResponse.redirect(new URL(DEFAULT_SITE_LOGO_SRC, req.url));
      }

      return new NextResponse(new Uint8Array(setting.setting_file), {
        headers: {
          "Content-Type": setting.setting_mime || "image/png",
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

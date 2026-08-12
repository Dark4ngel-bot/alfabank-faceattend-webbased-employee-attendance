import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { DEFAULT_SITE_LOGO_SRC } from "@/lib/site-logo-defaults";
import { SITE_LOGO_SETTING_KEY } from "@/lib/site-logo";

export const runtime = "nodejs";

function defaultLogoRedirect(req: Request) {
  return NextResponse.redirect(new URL(DEFAULT_SITE_LOGO_SRC, req.url));
}

export async function GET(req: Request) {
  try {
    const setting = await prisma.appSetting.findUnique({
      where: {
        setting_key: SITE_LOGO_SETTING_KEY,
      },
      select: {
        setting_file: true,
        setting_mime: true,
        updated_at: true,
      },
    });

    if (!setting?.setting_file) {
      return defaultLogoRedirect(req);
    }

    return new NextResponse(setting.setting_file, {
      headers: {
        "Content-Type": setting.setting_mime || "image/png",
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Last-Modified": setting.updated_at.toUTCString(),
      },
    });
  } catch (error) {
    console.error("GET /api/site-logo/image error:", error);
    return defaultLogoRedirect(req);
  }
}

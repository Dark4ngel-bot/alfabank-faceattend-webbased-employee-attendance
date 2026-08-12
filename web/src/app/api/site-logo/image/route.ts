import { NextResponse } from "next/server";

import { DEFAULT_SITE_LOGO_SRC } from "@/lib/site-logo-defaults";

export const runtime = "nodejs";

function defaultLogoRedirect(req: Request) {
  return NextResponse.redirect(new URL(DEFAULT_SITE_LOGO_SRC, req.url));
}

export async function GET(req: Request) {
  return defaultLogoRedirect(req);
}

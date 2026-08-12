import { prisma } from "@/lib/prisma";
import {
  DEFAULT_SITE_LOGO_MIME,
  DEFAULT_SITE_LOGO_SRC,
  DEFAULT_SITE_TITLE,
  type SiteLogoSettings,
} from "@/lib/site-logo-defaults";

export const SITE_LOGO_SETTING_KEY = "site_logo_src";
export const SITE_TITLE_SETTING_KEY = "site_title";
const SITE_LOGO_IMAGE_SRC = "/api/site-logo/image";

function versionedLogoImageSrc(logoSrc: string, updatedAt: Date | null | undefined) {
  if (!updatedAt || logoSrc === DEFAULT_SITE_LOGO_SRC) return logoSrc;

  const separator = logoSrc.includes("?") ? "&" : "?";
  return `${logoSrc}${separator}v=${updatedAt.getTime()}`;
}

function normalizeLogoSrc(value: string | null | undefined, hasStoredFile = false) {
  if (hasStoredFile) return SITE_LOGO_IMAGE_SRC;

  const logoSrc = String(value || "").trim();

  if (!logoSrc) return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc.includes("/images/creativemu-logo/")) return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc === "/images/alfabank-logo/logo.png") return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc.startsWith("/api/site-logo/image")) return SITE_LOGO_IMAGE_SRC;
  if (logoSrc.startsWith("/api/site-logo")) return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc.startsWith("/uploads/")) return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc.startsWith("/")) return logoSrc;
  if (logoSrc.startsWith("http://") || logoSrc.startsWith("https://")) return logoSrc;

  return DEFAULT_SITE_LOGO_SRC;
}

export function normalizeSiteTitle(value: string | null | undefined) {
  const title = String(value || "").replace(/\s+/g, " ").trim();
  const lowerTitle = title.toLowerCase();

  if (
    lowerTitle === "presensi alfabank" ||
    lowerTitle === "presensi presensi alfabank"
  ) {
    return DEFAULT_SITE_TITLE;
  }

  return title || DEFAULT_SITE_TITLE;
}

export async function getSiteLogoSettings(): Promise<SiteLogoSettings> {
  let logoSetting: {
    setting_value: string;
    setting_file: Uint8Array | null;
    updated_at: Date;
  } | null = null;
  let titleSetting: { setting_value: string } | null = null;

  try {
    const settings = await prisma.appSetting.findMany({
      where: {
        setting_key: {
          in: [SITE_LOGO_SETTING_KEY, SITE_TITLE_SETTING_KEY],
        },
      },
      select: {
        setting_key: true,
        setting_value: true,
        setting_file: true,
        updated_at: true,
      },
    });

    logoSetting = settings.find((s) => s.setting_key === SITE_LOGO_SETTING_KEY) || null;
    titleSetting = settings.find((s) => s.setting_key === SITE_TITLE_SETTING_KEY) || null;
  } catch (error) {
    console.error("getSiteLogoSettings fallback:", error);
  }

  return {
    logoSrc: versionedLogoImageSrc(
      normalizeLogoSrc(logoSetting?.setting_value, Boolean(logoSetting?.setting_file)),
      logoSetting?.updated_at,
    ),
    fallbackLogoSrc: DEFAULT_SITE_LOGO_SRC,
    siteTitle: normalizeSiteTitle(titleSetting?.setting_value),
    fallbackSiteTitle: DEFAULT_SITE_TITLE,
  };
}

export async function updateSiteLogoSrc(logoSrc: string) {
  const normalizedLogoSrc = normalizeLogoSrc(logoSrc);

  await prisma.appSetting.upsert({
    where: {
      setting_key: SITE_LOGO_SETTING_KEY,
    },
    create: {
      setting_key: SITE_LOGO_SETTING_KEY,
      setting_value: normalizedLogoSrc,
      setting_file: null,
      setting_mime: null,
    },
    update: {
      setting_value: normalizedLogoSrc,
      setting_file: null,
      setting_mime: null,
    },
  });

  return normalizedLogoSrc;
}

export async function updateSiteLogoFile(
  buffer: Uint8Array<ArrayBuffer>,
  mime: string,
) {
  await prisma.appSetting.upsert({
    where: {
      setting_key: SITE_LOGO_SETTING_KEY,
    },
    create: {
      setting_key: SITE_LOGO_SETTING_KEY,
      setting_value: SITE_LOGO_IMAGE_SRC,
      setting_file: buffer,
      setting_mime: mime || DEFAULT_SITE_LOGO_MIME,
    },
    update: {
      setting_value: SITE_LOGO_IMAGE_SRC,
      setting_file: buffer,
      setting_mime: mime || DEFAULT_SITE_LOGO_MIME,
    },
  });

  return SITE_LOGO_IMAGE_SRC;
}

export async function resetSiteLogoFileToDefault() {
  await updateSiteLogoSrc(DEFAULT_SITE_LOGO_SRC);

  return DEFAULT_SITE_LOGO_SRC;
}

export async function updateSiteTitle(title: string) {
  const normalizedTitle = normalizeSiteTitle(title);

  await prisma.appSetting.upsert({
    where: {
      setting_key: SITE_TITLE_SETTING_KEY,
    },
    create: {
      setting_key: SITE_TITLE_SETTING_KEY,
      setting_value: normalizedTitle,
    },
    update: {
      setting_value: normalizedTitle,
    },
    select: {
      setting_key: true,
      setting_value: true,
    },
  });

  return normalizedTitle;
}

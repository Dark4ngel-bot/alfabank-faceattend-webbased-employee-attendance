import { prisma } from "@/lib/prisma";
import {
  DEFAULT_SITE_LOGO_SRC,
  DEFAULT_SITE_TITLE,
  type SiteLogoSettings,
} from "@/lib/site-logo-defaults";

export const SITE_LOGO_SETTING_KEY = "site_logo_src";
export const SITE_TITLE_SETTING_KEY = "site_title";

function normalizeLogoSrc(value: string | null | undefined) {
  const logoSrc = String(value || "").trim();

  if (!logoSrc) return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc.startsWith("/api/site-logo")) return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc.startsWith("/")) return logoSrc;
  if (logoSrc.startsWith("http://") || logoSrc.startsWith("https://")) return logoSrc;
  if (logoSrc.startsWith("data:image/")) return logoSrc;

  return DEFAULT_SITE_LOGO_SRC;
}

export function normalizeSiteTitle(value: string | null | undefined) {
  const title = String(value || "").trim();
  return title || DEFAULT_SITE_TITLE;
}

export async function getSiteLogoSettings(): Promise<SiteLogoSettings> {
  let logoSetting: { setting_value: string } | null = null;
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
      },
    });

    logoSetting = settings.find((s) => s.setting_key === SITE_LOGO_SETTING_KEY) || null;
    titleSetting = settings.find((s) => s.setting_key === SITE_TITLE_SETTING_KEY) || null;
  } catch (error) {
    console.error("getSiteLogoSettings fallback:", error);
  }

  return {
    logoSrc: normalizeLogoSrc(logoSetting?.setting_value),
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
    },
    update: {
      setting_value: normalizedLogoSrc,
    },
    select: {
      setting_key: true,
      setting_value: true,
    },
  });

  return normalizedLogoSrc;
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

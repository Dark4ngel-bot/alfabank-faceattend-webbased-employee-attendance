import { prisma } from "@/lib/prisma";
import {
  DEFAULT_SITE_LOGO_SRC,
  type SiteLogoSettings,
} from "@/lib/site-logo-defaults";

export const SITE_LOGO_SETTING_KEY = "site_logo_src";
export const SITE_LOGO_IMAGE_SRC = "/api/site-logo?raw=1";

function versionedLogoImageSrc(updatedAt: Date | null | undefined) {
  if (!updatedAt) return SITE_LOGO_IMAGE_SRC;

  return `${SITE_LOGO_IMAGE_SRC}&v=${updatedAt.getTime()}`;
}

function normalizeLogoSrc(value: string | null | undefined) {
  const logoSrc = String(value || "").trim();

  if (!logoSrc) return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc.startsWith("/")) return logoSrc;

  return DEFAULT_SITE_LOGO_SRC;
}

export async function getSiteLogoSettings(): Promise<SiteLogoSettings> {
  let setting: {
    setting_value: string;
    setting_file: Uint8Array | null;
    updated_at: Date;
  } | null = null;

  try {
    setting = await prisma.appSetting.findUnique({
      where: {
        setting_key: SITE_LOGO_SETTING_KEY,
      },
      select: {
        setting_value: true,
        setting_file: true,
        updated_at: true,
      },
    });
  } catch (error) {
    console.error("getSiteLogoSettings fallback:", error);
  }

  return {
    logoSrc: setting?.setting_file
      ? versionedLogoImageSrc(setting.updated_at)
      : normalizeLogoSrc(setting?.setting_value),
    fallbackLogoSrc: DEFAULT_SITE_LOGO_SRC,
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
      setting_mime: mime,
    },
    update: {
      setting_value: SITE_LOGO_IMAGE_SRC,
      setting_file: buffer,
      setting_mime: mime,
    },
  });

  return SITE_LOGO_IMAGE_SRC;
}

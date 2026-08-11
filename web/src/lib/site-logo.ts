import { readFile } from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/prisma";
import {
  DEFAULT_SITE_LOGO_MIME,
  DEFAULT_SITE_LOGO_SRC,
  DEFAULT_SITE_TITLE,
  type SiteLogoSettings,
} from "@/lib/site-logo-defaults";

export const SITE_LOGO_SETTING_KEY = "site_logo_src";
export const SITE_TITLE_SETTING_KEY = "site_title";
export const SITE_LOGO_IMAGE_SRC = "/api/site-logo?raw=1";

function versionedLogoImageSrc(updatedAt: Date | null | undefined) {
  if (!updatedAt) return SITE_LOGO_IMAGE_SRC;

  return `${SITE_LOGO_IMAGE_SRC}&v=${updatedAt.getTime()}`;
}

function normalizeLogoSrc(value: string | null | undefined) {
  const logoSrc = String(value || "").trim();

  if (!logoSrc) return DEFAULT_SITE_LOGO_SRC;
  if (logoSrc.startsWith("/api/site-logo")) return SITE_LOGO_IMAGE_SRC;
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
    logoSrc: logoSetting?.setting_file
      ? versionedLogoImageSrc(logoSetting.updated_at)
      : normalizeLogoSrc(logoSetting?.setting_value),
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

async function readDefaultSiteLogoFile() {
  const buffer = await readFile(path.join(process.cwd(), "public", "icon.png"));

  return {
    buffer: Uint8Array.from(buffer),
    mime: DEFAULT_SITE_LOGO_MIME,
  };
}

export async function ensureSiteLogoFile() {
  const setting = await prisma.appSetting.findUnique({
    where: {
      setting_key: SITE_LOGO_SETTING_KEY,
    },
    select: {
      setting_file: true,
      setting_mime: true,
    },
  });

  if (setting?.setting_file) {
    return {
      buffer: new Uint8Array(setting.setting_file),
      mime: setting.setting_mime || DEFAULT_SITE_LOGO_MIME,
    };
  }

  const defaultLogo = await readDefaultSiteLogoFile();
  await updateSiteLogoFile(defaultLogo.buffer, defaultLogo.mime);

  return defaultLogo;
}

export async function resetSiteLogoFileToDefault() {
  const defaultLogo = await readDefaultSiteLogoFile();
  await updateSiteLogoFile(defaultLogo.buffer, defaultLogo.mime);

  return SITE_LOGO_IMAGE_SRC;
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

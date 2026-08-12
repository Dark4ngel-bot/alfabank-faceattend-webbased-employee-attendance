import { prisma } from "@/lib/prisma";
import {
  DEFAULT_APP_THEME,
  type AppThemeSettings,
} from "@/lib/app-theme-defaults";

export { DEFAULT_APP_THEME, type AppThemeSettings };

export const APP_THEME_SETTING_KEY = "app_theme_colors";

const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;
const LEGACY_BLUE_THEME_COLORS = new Set([
  "#123c8c",
  "#0f3274",
  "#0f3474",
  "#0f347a",
  "#eaf1ff",
  "#eef5ff",
  "#f8fbff",
  "#f6f8ff",
  "#f1f5ff",
]);

function normalizeHexColor(value: unknown, fallback: string) {
  const color = String(value || "").trim();

  if (!HEX_COLOR_RE.test(color)) return fallback;

  const normalizedColor = color.toLowerCase();

  return LEGACY_BLUE_THEME_COLORS.has(normalizedColor)
    ? fallback
    : normalizedColor;
}

export function normalizeAppThemeSettings(
  value: Partial<AppThemeSettings> | null | undefined,
): AppThemeSettings {
  return {
    primaryColor: normalizeHexColor(
      value?.primaryColor,
      DEFAULT_APP_THEME.primaryColor,
    ),
    primaryHoverColor: normalizeHexColor(
      value?.primaryHoverColor,
      DEFAULT_APP_THEME.primaryHoverColor,
    ),
    softColor: normalizeHexColor(value?.softColor, DEFAULT_APP_THEME.softColor),
    subtleColor: normalizeHexColor(
      value?.subtleColor,
      DEFAULT_APP_THEME.subtleColor,
    ),
    textColor: normalizeHexColor(value?.textColor, DEFAULT_APP_THEME.textColor),
  };
}

function parseThemeJson(value: string | null | undefined) {
  if (!value) return null;

  try {
    return JSON.parse(value) as Partial<AppThemeSettings>;
  } catch {
    return null;
  }
}

export async function getAppThemeSettings(): Promise<AppThemeSettings> {
  let setting: { setting_value: string } | null = null;

  try {
    setting = await prisma.appSetting.findUnique({
      where: {
        setting_key: APP_THEME_SETTING_KEY,
      },
      select: {
        setting_value: true,
      },
    });
  } catch (error) {
    console.error("getAppThemeSettings fallback:", error);
  }

  return normalizeAppThemeSettings(parseThemeJson(setting?.setting_value));
}

export async function updateAppThemeSettings(
  theme: Partial<AppThemeSettings>,
): Promise<AppThemeSettings> {
  const normalizedTheme = normalizeAppThemeSettings(theme);

  await prisma.appSetting.upsert({
    where: {
      setting_key: APP_THEME_SETTING_KEY,
    },
    create: {
      setting_key: APP_THEME_SETTING_KEY,
      setting_value: JSON.stringify(normalizedTheme),
    },
    update: {
      setting_value: JSON.stringify(normalizedTheme),
    },
  });

  return normalizedTheme;
}

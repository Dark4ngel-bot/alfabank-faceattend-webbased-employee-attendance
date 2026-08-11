export const DEFAULT_SITE_LOGO_SRC = "/api/site-logo?raw=1";
export const DEFAULT_SITE_MARK_LOGO_SRC = "/api/site-logo?raw=1";
export const DEFAULT_SITE_LOGO_MIME = "image/png";
export const DEFAULT_SITE_TITLE = "Creativemu";

export type SiteLogoSettings = {
  logoSrc: string;
  fallbackLogoSrc: string;
  siteTitle: string;
  fallbackSiteTitle: string;
};

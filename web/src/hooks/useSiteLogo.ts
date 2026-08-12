"use client";

import { useEffect, useState } from "react";

import {
  DEFAULT_SITE_LOGO_SRC,
  DEFAULT_SITE_TITLE,
  type SiteLogoSettings,
} from "@/lib/site-logo-defaults";

type SiteLogoResponse = {
  success?: boolean;
  logo?: SiteLogoSettings;
};

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

function normalizeSiteTitle(value: string | null | undefined) {
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

export function useSiteLogoSettings() {
  const [logoSrc, setLogoSrc] = useState(DEFAULT_SITE_LOGO_SRC);
  const [siteTitle, setSiteTitle] = useState(DEFAULT_SITE_TITLE);

  useEffect(() => {
    let isMounted = true;

    async function loadLogo() {
      try {
        const response = await fetch("/api/site-logo", {
          method: "GET",
          cache: "no-store",
        });
        const data = (await readJsonResponse(response)) as SiteLogoResponse;

        if (isMounted && response.ok && data.success && data.logo) {
          if (data.logo.logoSrc) setLogoSrc(data.logo.logoSrc);
          setSiteTitle(normalizeSiteTitle(data.logo.siteTitle));
        }
      } catch {
        if (isMounted) {
          setLogoSrc(DEFAULT_SITE_LOGO_SRC);
          setSiteTitle(DEFAULT_SITE_TITLE);
        }
      }
    }

    void loadLogo();

    function handleLogoChanged() {
      void loadLogo();
    }

    window.addEventListener("site-logo-changed", handleLogoChanged);

    return () => {
      isMounted = false;
      window.removeEventListener("site-logo-changed", handleLogoChanged);
    };
  }, []);

  return { logoSrc, siteTitle };
}

export function useSiteLogo() {
  const { logoSrc } = useSiteLogoSettings();
  return logoSrc;
}

export function useSiteTitle() {
  const { siteTitle } = useSiteLogoSettings();
  return siteTitle;
}

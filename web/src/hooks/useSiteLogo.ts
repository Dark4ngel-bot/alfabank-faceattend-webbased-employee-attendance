"use client";

import { useEffect, useState } from "react";

import {
  DEFAULT_SITE_LOGO_SRC,
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

export function useSiteLogo() {
  const [logoSrc, setLogoSrc] = useState(DEFAULT_SITE_LOGO_SRC);

  useEffect(() => {
    let isMounted = true;

    async function loadLogo() {
      try {
        const response = await fetch("/api/site-logo", {
          method: "GET",
          cache: "no-store",
        });
        const data = (await readJsonResponse(response)) as SiteLogoResponse;

        if (isMounted && response.ok && data.success && data.logo?.logoSrc) {
          setLogoSrc(data.logo.logoSrc);
        }
      } catch {
        if (isMounted) setLogoSrc(DEFAULT_SITE_LOGO_SRC);
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

  return logoSrc;
}

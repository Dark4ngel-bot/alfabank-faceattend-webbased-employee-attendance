"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type MobileShellProps = {
  children: ReactNode;
  variant?: "employee" | "admin" | "auth";
  withBottomPadding?: boolean;
  className?: string;
};

function AuthStatusGuard({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    async function validateSession() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        if (!isMounted || response.ok) return;

        if (response.status === 401 || response.status === 403) {
          await fetch("/api/auth/logout", {
            method: "POST",
            cache: "no-store",
          }).catch(() => null);

          window.localStorage.removeItem("presensi_read_announcement_id");
          window.sessionStorage.clear();

          const reason = response.status === 403 ? "inactive" : "expired";
          router.replace(`/login?reason=${reason}&redirect=${pathname}`);
          router.refresh();
        }
      } catch {
        // Keep the current page if the network is temporarily unavailable.
      }
    }

    void validateSession();

    const intervalId = window.setInterval(() => {
      void validateSession();
    }, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [enabled, pathname, router]);

  return null;
}

export default function MobileShell({
  children,
  variant = "employee",
  withBottomPadding = true,
  className = "",
}: MobileShellProps) {
  const companyLogo = useCompanyLogo();
  const bottomPaddingClass = withBottomPadding ? "pb-24 md:pb-0" : "";

  const backgroundGlow =
    variant === "admin"
      ? "from-[#f6f8ff] via-white to-[#eef4ff] dark:from-[#0d1117] dark:via-[#161b22] dark:to-[#0d1117]"
      : "from-white via-[#f8fbff] to-[#eef4ff] dark:from-[#0d1117] dark:via-[#090c10] dark:to-[#0d1117]";

  return (
    <div
      className={`relative min-h-dvh overflow-x-hidden bg-gradient-to-br ${backgroundGlow} ${bottomPaddingClass} ${className}`}
    >
      <AuthStatusGuard enabled={variant !== "auth"} />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="universal-watermark absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat blur-[2px] md:h-[440px] md:w-[440px] lg:h-[520px] lg:w-[520px]"
          style={{
            backgroundImage: `url('${companyLogo}')`,
          }}
        />
      </div>

      <div className="relative z-10 min-h-dvh">{children}</div>
    </div>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  History,
  Home,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type BottomNavProps = {
  variant?: "employee" | "admin";
};

type MenuItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const menus: MenuItem[] = [
  { href: "/beranda", label: "Beranda", icon: Home },
  { href: "/presensi", label: "Presensi", icon: CalendarCheck },
  { href: "/history", label: "Riwayat", icon: History },
  { href: "/profil", label: "Profil", icon: UserRound },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  if (href === "/beranda") return pathname === "/" || pathname === "/beranda";

  if (href === "/history") {
    return pathname === "/history" || pathname.startsWith("/history/");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function BottomNavMotionStyles() {
  return (
    <style>{`
      @keyframes bottomNavShellIn {
        0% {
          opacity: 0;
          transform: translateY(18px) scale(0.98);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes bottomNavActiveBar {
        0% {
          transform: scaleX(0.45);
        }

        100% {
          transform: scaleX(1);
        }
      }

      @keyframes bottomNavIconPop {
        0% {
          transform: scale(0.94);
        }

        60% {
          transform: scale(1.08);
        }

        100% {
          transform: scale(1);
        }
      }

      .bottom-nav-shell-in {
        animation: bottomNavShellIn 300ms ease-out both;
      }

      .bottom-nav-active-bar {
        transform-origin: center;
        animation: bottomNavActiveBar 220ms ease-out both;
      }

      .bottom-nav-icon-pop {
        animation: bottomNavIconPop 240ms ease-out both;
      }

      @media (prefers-reduced-motion: reduce) {
        .bottom-nav-shell-in,
        .bottom-nav-active-bar,
        .bottom-nav-icon-pop {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

function NavItem({
  href,
  label,
  active,
  Icon,
}: {
  href: string;
  label: string;
  active: boolean;
  Icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-[3.4rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-extrabold transition-all duration-200 active:scale-95",
        active
          ? "bg-[#123c8c] text-white shadow-md shadow-blue-900/20"
          : "text-slate-400 hover:bg-slate-50 hover:text-slate-700",
      )}
    >
      <Icon
        size={20}
        strokeWidth={active ? 2.6 : 2.2}
        className="block shrink-0"
      />
      <span className="block max-w-full truncate text-[10px] leading-none">{label}</span>
    </Link>
  );
}

export default function BottomNav({ variant = "employee" }: BottomNavProps) {
  const pathname = usePathname();

  if (variant === "admin") return null;

  return (
    <>
      <BottomNavMotionStyles />

      <div
        aria-hidden="true"
        className="h-[calc(5rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"
      />

      <nav className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.6rem)] left-1/2 z-50 w-[calc(100%-1.75rem)] max-w-[28rem] -translate-x-1/2 md:hidden">
        <div className="bottom-nav-shell-in rounded-3xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl shadow-slate-900/10 backdrop-blur-xl">
          <div className="grid w-full grid-cols-4 gap-1">
            {menus.map((menu) => (
              <NavItem
                key={menu.href}
                href={menu.href}
                label={menu.label}
                Icon={menu.icon}
                active={isActive(pathname, menu.href)}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

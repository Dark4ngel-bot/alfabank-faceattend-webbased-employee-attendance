"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Clock3,
  ClipboardList,
  Coins,
  FileImage,
  History,
  Home,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Network,
  PhoneCall,
  Search,
  Settings,
  Trophy,
  UserPlus,
  UserRound,
  UserRoundCog,
  X,
} from "lucide-react";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  rightLabel?: string;
  variant?: "employee" | "admin";
};

type NotificationStats = {
  total?: number;
  unread?: number;
  pending?: number;
  sick?: number;
  leave?: number;
  permission?: number;
  wfh?: number;
  visit?: number;
};

type NotificationResponse = {
  success?: boolean;
  stats?: NotificationStats;
  message?: string;
};

const employeeNav = [
  { href: "/beranda", label: "Beranda", icon: Home },
  { href: "/presensi", label: "Presensi", icon: CalendarCheck },
  { href: "/pengumuman", label: "Pengumuman", icon: Megaphone },
  { href: "/history", label: "Riwayat", icon: History },
  { href: "/cuti", label: "Cuti", icon: CalendarDays },
  { href: "/profil", label: "Profil", icon: UserRound },
];

const adminMenus = [
  {
    href: "/admin/dashboard",
    label: "Dasbor",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/monitor_perusahaan",
    label: "Monitor Perusahaan",
    icon: BarChart3,
  },
  {
    href: "/admin/pengumuman",
    label: "Pengumuman",
    icon: Megaphone,
  },
];

const masterDataMenus = [
  {
    href: "/admin/shifts",
    label: "Shift",
    icon: Clock3,
  },
  {
    href: "/admin/work-schedules",
    label: "Jam Kerja",
    icon: CalendarClock,
  },
  {
    href: "/admin/kantor",
    label: "Kantor",
    icon: Building2,
  },
  {
    href: "/admin/divisi",
    label: "Divisi",
    icon: Network,
  },
  {
    href: "/admin/jabatans",
    label: "Jabatan",
    icon: Building2,
  },
  {
    href: "/admin/positions",
    label: "Posisi",
    icon: UserRoundCog,
  },
  {
    href: "/admin/employment-status",
    label: "Status Kepegawaian",
    icon: UserRound,
  },
];

const operationalMenus = [
  {
    href: "/admin/employees",
    label: "Daftar Karyawan",
    icon: UserPlus,
  },
  {
    href: "/admin/laporan-kehadiran",
    label: "Laporan Kehadiran",
    icon: FileImage,
  },
  {
    href: "/admin/cuti",
    label: "Laporan Cuti",
    icon: CalendarDays,
  },
  {
    href: "/admin/rekap-kehadiran-karyawan",
    label: "Rekap Kehadiran Karyawan",
    icon: ClipboardList,
  },
  {
    href: "/admin/rank-kehadiran-karyawan",
    label: "Rank Kehadiran Karyawan",
    icon: Trophy,
  },
  {
    href: "/admin/gaji",
    label: "Gaji & Payroll",
    icon: Coins,
  },
  {
    href: "/admin/profil-perusahaan",
    label: "Profil Perusahaan",
    icon: Building2,
  },
];

const WHATSAPP_LINK = "https://wa.me/6282123459565";

function isActivePath(pathname: string, href: string) {
  if (href === "/history") {
    return pathname === "/history" || pathname.startsWith("/history/");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

function getAdminNotificationCount(stats?: NotificationStats) {
  if (!stats) return 0;

  const unread = Number(stats.unread || 0);
  const pending = Number(stats.pending || 0);

  return unread + pending;
}

function getEmployeeNotificationCount(stats?: NotificationStats) {
  if (!stats) return 0;

  return Number(stats.unread || 0);
}

function formatNotificationCount(count: number) {
  if (count <= 0) return "";
  if (count > 99) return "99+";

  return String(count);
}

export default function AppHeader({
  title,
  subtitle,
  rightLabel,
  variant = "employee",
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  const resolvedVariant = useMemo(() => {
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      return "admin";
    }

    return variant;
  }, [pathname, variant]);

  const isAdmin = resolvedVariant === "admin";
  const notificationHref = isAdmin ? "/admin/notifikasi" : "/notifikasi";
  const isNotificationPage = isActivePath(pathname, notificationHref);
  const hasNewNotification = notificationCount > 0;

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 8);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadNotificationCount() {
      try {
        const endpoint = isAdmin
          ? "/api/admin/notifications"
          : "/api/notifications";

        const response = await fetch(endpoint, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          if (isMounted) setNotificationCount(0);
          return;
        }

        const data = (await readJsonResponse(response)) as NotificationResponse;

        const count = isAdmin
          ? getAdminNotificationCount(data.stats)
          : getEmployeeNotificationCount(data.stats);

        if (isMounted) {
          setNotificationCount(count);
        }
      } catch {
        if (isMounted) {
          setNotificationCount(0);
        }
      }
    }

    void loadNotificationCount();

    const intervalId = window.setInterval(() => {
      void loadNotificationCount();
    }, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [isAdmin, pathname]);

  function handleNavigate(href: string) {
    setIsSidebarOpen(false);
    router.push(href);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const keyword = searchKeyword.trim();
    const basePath = isAdmin ? "/admin/search" : "/search";

    if (!keyword) {
      router.push(basePath);
      return;
    }

    router.push(`${basePath}?search=${encodeURIComponent(keyword)}`);
  }

  async function handleLogout() {
    setIsSidebarOpen(false);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        cache: "no-store",
      });
    } finally {
      window.localStorage.removeItem("presensi_read_announcement_id");
      window.sessionStorage.clear();
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 overflow-hidden border-b px-5 py-4 backdrop-blur-2xl transition-all duration-300 md:px-10 lg:px-16 dark:border-[#30363d] ${
          hasScrolled
            ? "border-[#c9d4e3]/90 bg-[#e6edf6]/95 shadow-lg shadow-slate-300/25 dark:bg-[#111823]/95 dark:shadow-black/25"
            : "border-[#d5deea]/85 bg-[#e9eff7]/90 shadow-sm shadow-slate-300/25 dark:bg-[#111823]/90 dark:shadow-black/20"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-16 top-1/2 hidden h-64 w-64 -translate-y-1/2 bg-contain bg-center bg-no-repeat opacity-[0.11] blur-[0.5px] md:block"
          style={{
            backgroundImage: "url('/images/creativemu-logo/creativemu.png')",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c] shadow-lg shadow-slate-200/70 ring-1 ring-blue-100 transition hover:bg-blue-50 active:scale-[0.96] dark:bg-[#21262d] dark:text-[#58a6ff] dark:ring-[#30363d] dark:hover:bg-[#30363d]"
              aria-label="Buka menu"
            >
              <Menu size={25} strokeWidth={3} />
            </button>

            <div className="min-w-0">
              <h1 className="mt-1 truncate text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100 md:text-2xl lg:text-3xl">
                {title}
              </h1>

              {subtitle ? (
                <p className="mt-1 line-clamp-1 max-w-xl text-sm font-semibold leading-5 text-slate-500 dark:text-slate-400">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden w-full max-w-xl flex-1 md:block"
          >
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />

            <input
              type="search"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder={isAdmin ? "Cari data admin..." : "Cari data..."}
              className="h-12 w-full rounded-2xl border border-[#c8d3e2] bg-[#e8eef7]/95 py-2 pl-11 pr-11 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-2 focus:ring-blue-100/50 dark:border-[#30363d] dark:bg-[#1a2230] dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-[#58a6ff] dark:focus:ring-[#1f6feb]/25"
            />

            <button
              type="submit"
              aria-label="Cari"
              className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-[#123c8c] dark:text-slate-500 dark:hover:bg-[#21262d] dark:hover:text-[#58a6ff]"
            >
              <Search size={16} />
            </button>
          </form>

          <div className="flex shrink-0 items-center justify-end gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ecfff5] text-[#00a884] shadow-sm ring-1 ring-[#baf7dc] transition hover:bg-[#dcfce7] active:scale-[0.96] dark:bg-[#132a24] dark:text-[#3dd5a8] dark:ring-[#21453c] dark:hover:bg-[#1a362f]"
            >
              <PhoneCall className="h-5 w-5" strokeWidth={2.7} />
            </a>

            <Link
              href={notificationHref}
              className={`relative hidden h-12 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black shadow-sm ring-1 transition active:scale-[0.96] sm:inline-flex ${
                isNotificationPage
                  ? "bg-[#123c8c] text-white ring-[#123c8c] shadow-lg shadow-blue-900/20"
                  : "bg-[#e7edf6] text-[#123c8c] ring-[#c8d3e2] hover:bg-[#dbe5f1] dark:bg-[#1a2230] dark:text-[#58a6ff] dark:ring-[#30363d] dark:hover:bg-[#252f3f]"
              }`}
            >
              <span className="relative">
                <Bell size={20} strokeWidth={2.7} />

                {hasNewNotification ? (
                  <span className="absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black leading-none text-[#fff6ed] ring-2 ring-[#e8eef6] dark:ring-[#111823]">
                    {formatNotificationCount(notificationCount)}
                  </span>
                ) : null}
              </span>
            </Link>

            <Link
              href={notificationHref}
              aria-label="Buka notifikasi"
              className={`relative flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ring-1 transition active:scale-[0.96] sm:hidden ${
                isNotificationPage
                  ? "bg-[#123c8c] text-white ring-[#123c8c]"
                  : "bg-[#e7edf6] text-[#123c8c] ring-[#c8d3e2] hover:bg-[#dbe5f1] dark:bg-[#1a2230] dark:text-[#58a6ff] dark:ring-[#30363d] dark:hover:bg-[#252f3f]"
              }`}
            >
              <Bell size={21} strokeWidth={2.7} />

              {hasNewNotification ? (
                <span className="absolute right-1.5 top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black leading-none text-[#fff6ed] ring-2 ring-[#e8eef6] dark:ring-[#111823]">
                  {formatNotificationCount(notificationCount)}
                </span>
              ) : null}
            </Link>

            {rightLabel ? (
              <span className="hidden rounded-2xl bg-[#e7edf6] px-4 py-2 text-xs font-black text-slate-600 shadow-sm ring-1 ring-[#c8d3e2] md:inline-flex dark:bg-[#1a2230] dark:text-slate-300 dark:ring-[#30363d]">
                {rightLabel}
              </span>
            ) : null}
          </div>
        </div>
      </header>

      <div className={subtitle ? "h-[106px]" : "h-[88px]"} />

      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/40"
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-[60] h-dvh w-[82vw] max-w-80 border-r border-[#c8d3e2] bg-[#e7edf6] shadow-2xl shadow-slate-950/15 transition-transform duration-300 dark:border-[#30363d] dark:bg-[#111823] dark:shadow-black/50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-blue-50 px-5 py-5 dark:border-[#21262d]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#edf2f8] p-2 shadow-lg shadow-slate-300/40 ring-1 ring-[#c8d3e2]">
                <Image
                  src="/images/creativemu-logo/creativemu.png"
                  alt="Creativemu Logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#123c8c]">
                  Creativemu
                </p>

                <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                  {isAdmin ? "Panel Admin" : "Menu Karyawan"}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition active:scale-[0.96] dark:bg-[#21262d] dark:text-slate-400"
              aria-label="Tutup menu"
            >
              <X size={20} strokeWidth={2.8} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            {isAdmin ? (
              <>
                <p className="px-3 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                  Menu Utama
                </p>

                <nav className="mt-3 space-y-2">
                  {adminMenus.map((menu) => {
                    const Icon = menu.icon;
                    const active = isActivePath(pathname, menu.href);

                    return (
                      <button
                        key={menu.href}
                        type="button"
                        onClick={() => handleNavigate(menu.href)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                          active
                            ? "bg-[#123c8c] text-white shadow-lg shadow-blue-900/20"
                            : "text-slate-600 hover:bg-[#eaf1ff] hover:text-[#123c8c] dark:text-slate-300 dark:hover:bg-[#21262d] dark:hover:text-[#58a6ff]"
                        }`}
                      >
                        <Icon size={18} strokeWidth={2.5} />
                        {menu.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6">
                  <div className="flex items-center gap-3 rounded-2xl bg-[#f6f8ff] px-4 py-3 text-sm font-black text-[#123c8c] dark:bg-[#161b22] dark:text-[#58a6ff]">
                    <Settings size={18} strokeWidth={2.5} />
                    Master Data
                  </div>

                  <div className="mt-2 space-y-1 border-l-2 border-blue-100 pl-4 dark:border-[#30363d]">
                    {masterDataMenus.map((menu) => {
                      const Icon = menu.icon;
                      const active = isActivePath(pathname, menu.href);

                      return (
                        <button
                          key={menu.href}
                          type="button"
                          onClick={() => handleNavigate(menu.href)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
                            active
                              ? "bg-[#eaf1ff] text-[#123c8c]"
                              : "text-slate-500 hover:bg-slate-50 hover:text-[#123c8c] dark:text-slate-300 dark:hover:bg-[#21262d] dark:hover:text-[#58a6ff]"
                          }`}
                        >
                          <Icon size={15} strokeWidth={2.5} />
                          {menu.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="px-3 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                    Operasional
                  </p>

                  <nav className="mt-3 space-y-2">
                    {operationalMenus.map((menu) => {
                      const Icon = menu.icon;
                      const active = isActivePath(pathname, menu.href);

                      return (
                        <button
                          key={menu.href}
                          type="button"
                          onClick={() => handleNavigate(menu.href)}
                          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                            active
                              ? "bg-[#123c8c] text-white shadow-lg shadow-blue-900/20"
                              : "text-slate-600 hover:bg-[#eaf1ff] hover:text-[#123c8c] dark:text-slate-300 dark:hover:bg-[#21262d] dark:hover:text-[#58a6ff]"
                          }`}
                        >
                          <Icon size={18} strokeWidth={2.5} />
                          {menu.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </>
            ) : (
              <>
                <p className="px-3 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                  Menu Karyawan
                </p>

                <nav className="mt-3 space-y-2">
                  {employeeNav.map((menu) => {
                    const Icon = menu.icon;
                    const active = isActivePath(pathname, menu.href);

                    return (
                      <button
                        key={menu.href}
                        type="button"
                        onClick={() => handleNavigate(menu.href)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                          active
                            ? "bg-[#123c8c] text-white shadow-lg shadow-blue-900/20"
                            : "text-slate-600 hover:bg-[#eaf1ff] hover:text-[#123c8c] dark:text-slate-300 dark:hover:bg-[#21262d] dark:hover:text-[#58a6ff]"
                        }`}
                      >
                        <Icon size={18} strokeWidth={2.5} />
                        {menu.label}
                      </button>
                    );
                  })}
                </nav>
              </>
            )}
          </div>

          {isAdmin ? (
            <div className="border-t border-blue-50 p-4 dark:border-[#21262d]">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-black text-rose-600 transition hover:bg-rose-100 active:scale-[0.98] dark:bg-[#2d1a1f] dark:text-[#ff7b72] dark:hover:bg-[#3a2027]"
              >
                <LogOut size={18} strokeWidth={2.5} />
                Keluar
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}

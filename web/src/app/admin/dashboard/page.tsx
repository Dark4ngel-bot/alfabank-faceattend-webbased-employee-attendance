"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Clock3,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  UserRound,
  UsersRound,
  FileText,
  Coins,
  Settings,
  Megaphone,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";

type DashboardStats = {
  totalEmployees: number;
  checkInToday: number;
  checkOutToday: number;
  lateToday: number;
  absentToday: number;
};

type RecentAttendance = {
  id: string;
  attendanceId: string;
  name: string;
  employeeCode?: string | null;
  profilePhoto?: string | null;
  profile_photo?: string | null;
  profile_photo_url?: string | null;
  photo_url?: string | null;
  avatar_url?: string | null;
  position: string | null;
  department: string | null;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: string;
  lateMinutes: number;
  workMinutes: number;
};

type DashboardResponse = {
  stats: DashboardStats;
  recentAttendance: RecentAttendance[];
};

function normalizeProfilePhotoUrl(value: string | null | undefined) {
  if (!value) return "";

  const cleanPhoto = String(value).trim();

  if (!cleanPhoto) return "";

  if (
    cleanPhoto.startsWith("http://") ||
    cleanPhoto.startsWith("https://") ||
    cleanPhoto.startsWith("data:") ||
    cleanPhoto.startsWith("/")
  ) {
    return cleanPhoto;
  }

  if (cleanPhoto.startsWith("uploads/")) {
    return `/${cleanPhoto}`;
  }

  return `/uploads/profiles/${cleanPhoto}`;
}

function getDashboardProfilePhoto(item: RecentAttendance) {
  return normalizeProfilePhotoUrl(
    item.profilePhoto ||
      item.profile_photo ||
      item.profile_photo_url ||
      item.photo_url ||
      item.avatar_url ||
      "",
  );
}

function getInitialName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getStatusClass(item: RecentAttendance) {
  if (item.checkOutTime) {
    return "bg-[#eaf1ff] text-[#123c8c]";
  }

  if (item.lateMinutes > 0 || item.status?.toUpperCase() === "LATE") {
    return "bg-red-50 text-red-700";
  }

  if (item.checkInTime) {
    return "bg-emerald-50 text-emerald-700";
  }

  return "bg-slate-100 text-slate-600";
}

function getStatusLabel(item: RecentAttendance) {
  if (item.checkOutTime) return "Selesai";

  if (item.lateMinutes > 0 || item.status?.toUpperCase() === "LATE") {
    return "Terlambat";
  }

  if (item.checkInTime) return "Check-in";

  return "Belum Absen";
}

function formatTime(value: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMinutes(minutes: number, hasCheckOut = false) {
  if (!hasCheckOut) return "-";

  const safeMinutes = Math.max(0, Number(minutes || 0));
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  return `${hours}:${String(remainingMinutes).padStart(2, "0")}`;
}

function getAttendanceKey(item: RecentAttendance, index: number) {
  return (
    item.attendanceId ||
    `${item.id || "attendance"}-${item.employeeCode || "employee"}-${index}`
  );
}

function getEmployeeSubtitle(item: RecentAttendance) {
  if (item.position) return item.position;
  if (item.department) return item.department;

  return "-";
}

function getEmployeeMeta(item: RecentAttendance) {
  return [item.employeeCode, item.department, item.position]
    .filter(Boolean)
    .join(" - ");
}

function EmployeeProfileAvatar({ item }: { item: RecentAttendance }) {
  const [imageError, setImageError] = useState(false);
  const profilePhoto = getDashboardProfilePhoto(item);

  if (profilePhoto && !imageError) {
    return (
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-[#eaf1ff] ring-1 ring-blue-100 md:h-11 md:w-11">
        <img
          src={profilePhoto}
          alt={`Foto profil ${item.name}`}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-sm font-black text-[#123c8c] ring-1 ring-blue-100 md:h-11 md:w-11">
      {getInitialName(item.name) || <UserRound size={22} strokeWidth={2.6} />}
    </div>
  );
}

function MobileAttendanceCard({
  item,
  index,
}: {
  item: RecentAttendance;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const employeeMeta = getEmployeeMeta(item) || getEmployeeSubtitle(item);

  return (
    <div
      className="dashboard-row-enter border-b border-blue-100 px-4 py-4 last:border-b-0"
      style={{
        animationDelay: `${index * 45}ms`,
      }}
    >
      <button
        type="button"
        className="flex w-full items-center gap-3 text-left"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <EmployeeProfileAvatar item={item} />

        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-black text-slate-950">
            {item.name}
          </p>

          <p className="mt-1 truncate text-xs font-bold text-slate-500">
            {employeeMeta}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-black ${getStatusClass(
            item,
          )}`}
        >
          {getStatusLabel(item)}
        </span>

        <ChevronDown
          size={22}
          strokeWidth={3}
          className={`shrink-0 text-[#123c8c] transition duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-[#f6f8ff] p-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">
              Check-in
            </p>
            <p className="mt-1 text-sm font-black text-slate-800">
              {formatTime(item.checkInTime)}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">
              Check-out
            </p>
            <p className="mt-1 text-sm font-black text-slate-800">
              {formatTime(item.checkOutTime)}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">
              Durasi
            </p>
            <p className="mt-1 text-sm font-black text-slate-800">
              {formatMinutes(item.workMinutes, Boolean(item.checkOutTime))}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">
              Status
            </p>
            <p className="mt-1 text-sm font-black text-slate-800">
              {getStatusLabel(item)}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

function DashboardMotionStyles() {
  return (
    <style>{`
      @keyframes dashboardEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes dashboardRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .dashboard-enter {
        animation: dashboardEnter 320ms ease-out both;
      }

      .dashboard-row-enter {
        opacity: 0;
        animation: dashboardRowEnter 300ms ease-out both;
      }

      @media (prefers-reduced-motion: reduce) {
        .dashboard-enter,
        .dashboard-row-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadDashboardData() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/admin/dashboard", {
        method: "GET",
        cache: "no-store",
      });

      const result = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result?.message || "Gagal mengambil data dashboard admin.",
        );
      }

      setData(result);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengambil data dashboard.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboardData();
  }, []);

  const stats = useMemo(() => {
    const dashboardStats = data?.stats;

    return [
      {
        label: "Total Karyawan",
        value: String(dashboardStats?.totalEmployees ?? 0),
        description: "Karyawan aktif",
        icon: UsersRound,
      },
      {
        label: "Masuk",
        value: String(dashboardStats?.checkInToday ?? 0),
        description: "Sudah masuk hari ini",
        icon: LogIn,
      },
      {
        label: "Keluar",
        value: String(dashboardStats?.checkOutToday ?? 0),
        description: "Sudah keluar hari ini",
        icon: LogOut,
      },
      {
        label: "Terlambat",
        value: String(dashboardStats?.lateToday ?? 0),
        description: "Telat masuk",
        icon: Clock3,
      },
    ];
  }, [data]);
  const [cardOrder, setCardOrder] = useState<number[]>([0, 1, 2, 3]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIdx(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIdx === null) return;
    const newOrder = [...cardOrder];
    const draggedPos = newOrder.indexOf(draggedIdx);
    const targetPos = newOrder.indexOf(targetIndex);
    newOrder[draggedPos] = targetIndex;
    newOrder[targetPos] = draggedIdx;
    setCardOrder(newOrder);
    setDraggedIdx(null);
  };

  return (
    <MobileShell variant="admin">
      <DashboardMotionStyles />

      <AppHeader title="Admin Dasbor" variant="admin" />

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16">
        <div className="dashboard-enter overflow-hidden rounded-3xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-[#161b22] shadow-xl shadow-slate-300/30">
          <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
            <div className="bg-[#123c8c] p-6 text-white md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <LayoutDashboard size={25} strokeWidth={2.6} />
                </div>

                <div>
                  <h2 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">
                    Ringkasan Presensi
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-5 md:p-6">
              {cardOrder.map((statIdx, index) => {
                const item = stats[statIdx];
                if (!item) return null;
                const Icon = item.icon;
                const isCheckIn = item.label === "Masuk";
                const isLate = item.label === "Terlambat";
                const textStyle = isCheckIn ? "text-emerald-600 dark:text-emerald-400" : isLate ? "text-red-600 dark:text-red-400" : "text-[#123c8c] dark:text-blue-450";

                return (
                  <div
                    key={`${item.label}-${index}`}
                    draggable
                    onDragStart={() => handleDragStart(statIdx)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(statIdx)}
                    className="dashboard-row-enter cursor-grab active:cursor-grabbing rounded-2xl border border-blue-100 dark:border-slate-800 bg-[#f6f8ff] dark:bg-[#0d1117] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white dark:hover:bg-[#161b22] hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none"
                    style={{
                      animationDelay: `${index * 70}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {item.label}
                      </p>

                      <Icon
                        size={20}
                        strokeWidth={2.5}
                        className={isCheckIn ? "text-emerald-600 dark:text-emerald-400" : isLate ? "text-red-600 dark:text-red-400" : "text-[#123c8c] dark:text-blue-450"}
                      />
                    </div>

                    {isLoading ? (
                      <div className="mt-4 h-8 w-16 animate-pulse rounded-xl bg-blue-100 dark:bg-slate-800" />
                    ) : (
                      <h3 className={`mt-3 text-3xl font-black ${textStyle}`}>
                        {item.value}
                      </h3>
                    )}

                    <p className={`mt-1 text-xs font-semibold ${isCheckIn ? "text-emerald-600 dark:text-emerald-400" : isLate ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}>
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PINTASAN CEPAT (QUICK ACTIONS) */}
        <div className="dashboard-enter rounded-[2rem] border border-blue-50 dark:border-slate-800 bg-[#f6f8ff] dark:bg-[#161b22] p-6 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[#123c8c] dark:text-blue-400 mb-4">
            Pintasan Cepat (Quick Actions)
          </h3>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-5">
            <a
              href="/admin/employees"
              className="flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-[#0d1117] rounded-2xl border border-blue-100/50 dark:border-slate-850 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none hover:border-[#123c8c] transition duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/20 text-[#123c8c] dark:text-blue-400 mb-2.5">
                <UsersRound size={20} />
              </div>
              <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Kelola Karyawan</span>
            </a>

            <a
              href="/admin/laporan-kehadiran"
              className="flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-[#0d1117] rounded-2xl border border-blue-100/50 dark:border-slate-850 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none hover:border-[#123c8c] transition duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-[#123c8c] dark:text-blue-400 mb-2.5">
                <FileText size={20} />
              </div>
              <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Laporan Absensi</span>
            </a>

            <a
              href="/admin/salary"
              className="flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-[#0d1117] rounded-2xl border border-blue-100/50 dark:border-slate-850 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none hover:border-[#123c8c] transition duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 mb-2.5">
                <Coins size={20} />
              </div>
              <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Gaji & Payroll</span>
            </a>

            <a
              href="/admin/hr-analytics"
              className="flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-[#0d1117] rounded-2xl border border-blue-100/50 dark:border-slate-850 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none hover:border-[#123c8c] transition duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 mb-2.5">
                <TrendingUp size={20} />
              </div>
              <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Analitik HR</span>
            </a>

            <a
              href="/admin/pengumuman"
              className="flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-[#0d1117] rounded-2xl border border-blue-100/50 dark:border-slate-850 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none hover:border-[#123c8c] transition duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 mb-2.5">
                <Megaphone size={20} />
              </div>
              <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Pengumuman</span>
            </a>
          </div>
        </div>

        {errorMessage ? (
          <div className="dashboard-row-enter rounded-3xl border border-red-100 dark:border-red-950/20 bg-red-50 dark:bg-red-950/10 p-5 text-sm font-bold text-red-700 dark:text-red-450">
            {errorMessage}
          </div>
        ) : null}

        <div
          className="dashboard-enter rounded-3xl border border-white/70 dark:border-slate-850 bg-white/90 dark:bg-[#161b22] p-5 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-6"
          style={{
            animationDelay: "100ms",
          }}
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]">
                Laporan Hari Ini
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                Presensi Terbaru
              </h2>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100">
            <div className="hidden grid-cols-[0.55fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr] bg-[#eaf1ff] px-5 py-3 text-xs font-black uppercase tracking-wide text-[#123c8c] md:grid">
              <p>Profil</p>
              <p>Karyawan</p>
              <p>Check-in</p>
              <p>Check-out</p>
              <p>Durasi</p>
              <p>Status</p>
            </div>

            <div className="divide-y divide-blue-100 bg-white">
              {isLoading ? (
                <div className="dashboard-row-enter flex items-center justify-center gap-2 px-5 py-10 text-sm font-bold text-slate-500">
                  <Loader2 size={18} className="animate-spin" />
                  Mengambil data presensi...
                </div>
              ) : data?.recentAttendance.length ? (
                data.recentAttendance.map((item, index) => (
                  <div key={getAttendanceKey(item, index)}>
                    <div className="md:hidden">
                      <MobileAttendanceCard item={item} index={index} />
                    </div>

                    <Link
                      href={`/admin/employees/${item.id}`}
                      className="dashboard-row-enter hidden cursor-pointer px-5 py-4 text-sm transition duration-200 hover:bg-[#f8fbff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123c8c] focus-visible:ring-offset-2 md:grid md:grid-cols-[0.55fr_1.5fr_0.8fr_0.8fr_0.8fr_0.8fr] md:items-center"
                      style={{
                        animationDelay: `${index * 45}ms`,
                      }}
                      aria-label={`Buka detail karyawan ${item.name}`}
                    >
                      <EmployeeProfileAvatar item={item} />

                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-950">
                          {item.name}
                        </p>

                        <p className="mt-1 truncate text-xs font-semibold text-slate-400">
                          {getEmployeeSubtitle(item)}
                        </p>
                      </div>

                      <p className="text-slate-500">
                        {formatTime(item.checkInTime)}
                      </p>

                      <p className="text-slate-500">
                        {formatTime(item.checkOutTime)}
                      </p>

                      <p className="font-semibold text-slate-500">
                        {formatMinutes(
                          item.workMinutes,
                          Boolean(item.checkOutTime),
                        )}
                      </p>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-black ${getStatusClass(
                          item,
                        )}`}
                      >
                        {getStatusLabel(item)}
                      </span>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="dashboard-row-enter px-5 py-10 text-center text-sm font-bold text-slate-500">
                  Belum ada data check-in atau check-out hari ini.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <BottomNav variant="admin" />
    </MobileShell>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  ListFilter,
  Loader2,
  Table,
  UserRound,
  X,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import MobileShell from "@/components/MobileShell";

type EmployeeAttendanceSummary = {
  totalHariKerja: number;
  totalPresensi: number;
  hadir: number;
  terlambat: number;
  totalWorkMinutes: number;
  menunggu: number;
  izin: number;
  sakit: number;
  cuti: number;
  lainnya: number;
  wfh?: number;
  kunjungan?: number;
  gajiPokok: number;
  potonganPerHari: number;
  estimasiPotonganTidakMasuk: number;
  estimasiSalary: number;
};

type DailyAttendanceCategory =
  | "hadir"
  | "terlambat"
  | "wfh"
  | "kunjungan"
  | "izin_sakit"
  | "cuti";

type DailyAttendanceRecord = {
  id?: string;
  date: string;
  category: DailyAttendanceCategory;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  lateMinutes?: number;
  workMinutes?: number;
  workMode?: string | null;
  checkOutWorkMode?: string | null;
};

type EmployeeRecap = {
  id: string;
  name: string;
  employeeCode?: string | null;
  profile_photo?: string | null;
  profile_photo_url?: string | null;
  employmentStartDate?: string | null;
  employmentEndDate?: string | null;
  employmentStatus?: string | null;
  status?: string | null;
  shiftName?: string | null;
  annualLeaveQuota?: number;
  approvedLeaveDays?: number;
  remainingLeaveQuota?: number;
  summary: EmployeeAttendanceSummary;
  dailyRecords?: DailyAttendanceRecord[];
  logs?: DailyAttendanceRecord[];
};

type EmployeeAttendanceRecapResponse = {
  success?: boolean;
  message?: string;
  startDate?: string;
  endDate?: string;
  employees?: EmployeeRecap[];
};

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Rentang tanggal belum dipilih";
  }

  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function formatOptionalDate(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatEmploymentPeriod(employee?: EmployeeRecap | null) {
  const startDate = formatOptionalDate(employee?.employmentStartDate);
  const endDate = formatOptionalDate(employee?.employmentEndDate);

  if (startDate && endDate) return `${startDate} - ${endDate}`;
  if (startDate) return `Mulai ${startDate}`;
  if (endDate) return `Sampai ${endDate}`;

  return "-";
}

function formatWorkDuration(minutes: number) {
  if (!minutes || minutes <= 0) return "0 menit";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}j ${remainingMinutes}m`;
  }

  if (hours > 0) return `${hours}j`;

  return `${remainingMinutes}m`;
}

function getIndonesianDayName(dateText: string) {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "-";
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return days[date.getDay()];
}

function formatTimeOnly(timeStr?: string | null) {
  if (!timeStr) return "-";
  const date = new Date(timeStr);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(":", ".");
}

function formatWorkModeLabel(workMode?: string | null) {
  const mode = String(workMode || "").toUpperCase();
  if (mode === "WFH" || mode === "WFC") return "WFH";
  if (mode === "VISIT" || mode === "KUNJUNGAN") return "KUNJUNGAN";
  return "OFFICE";
}

function getCategoryLabel(category?: string | null) {
  switch (category) {
    case "hadir":
      return "Hadir";
    case "terlambat":
      return "Terlambat";
    case "wfh":
      return "WFH";
    case "kunjungan":
      return "Kunjungan";
    case "izin_sakit":
      return "Izin / Sakit";
    case "cuti":
      return "Cuti";
    default:
      return "Belum Absen";
  }
}

function getDisplayErrorMessage(
  message: string | undefined,
  fallback: string,
) {
  const text = String(message || "").trim();

  if (!text) return fallback;

  return text;
}

function getInitialDate(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key) || "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  return "";
}

function escapeExcelCell(value: string | number | null | undefined) {
  return String(value ?? "-")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getExcelFileName(
  prefix: string,
  employeeName: string,
  startDate: string,
  endDate: string,
) {
  const safeName = employeeName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${prefix}-${safeName || "karyawan"}-${startDate}-${endDate}.xls`;
}

function getEmployeePhoto(employee?: EmployeeRecap | null) {
  return employee?.profile_photo || employee?.profile_photo_url || "";
}

function getMonthDate(value: string) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date();

  if (Number.isNaN(date.getTime())) return new Date();

  date.setDate(1);
  date.setHours(0, 0, 0, 0);

  return date;
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}`;
}

function getDateKey(date: Date) {
  return `${getMonthKey(date)}-${String(date.getDate()).padStart(2, "0")}`;
}

function addMonths(date: Date, amount: number) {
  const nextDate = new Date(date);

  nextDate.setMonth(nextDate.getMonth() + amount);

  return nextDate;
}

function formatCalendarMonth(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function isDateInRange(dateKey: string, startDate: string, endDate: string) {
  if (!startDate || !endDate) return true;

  return dateKey >= startDate && dateKey <= endDate;
}

function buildCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDate = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = firstDate.getDay();
  const days: ({ dateKey: string; day: number } | null)[] = Array.from(
    { length: leadingBlanks },
    () => null,
  );

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, month, day);

    days.push({
      dateKey: getDateKey(date),
      day,
    });
  }

  return days;
}

const calendarCategoryStyles: Record<
  DailyAttendanceCategory,
  { label: string; dot: string; tile: string }
> = {
  hadir: {
    label: "Hadir Tepat Waktu",
    dot: "bg-emerald-500",
    tile: "bg-emerald-500 text-white shadow-md shadow-emerald-200 font-black",
  },
  terlambat: {
    label: "Terlambat",
    dot: "bg-amber-500",
    tile: "bg-amber-500 text-white shadow-md shadow-amber-200 font-black",
  },
  wfh: {
    label: "WFH",
    dot: "bg-sky-500",
    tile: "bg-sky-500 text-white shadow-md shadow-sky-200 font-black",
  },
  kunjungan: {
    label: "Kunjungan",
    dot: "bg-teal-500",
    tile: "bg-teal-500 text-white shadow-md shadow-teal-200 font-black",
  },
  izin_sakit: {
    label: "Izin / Sakit",
    dot: "bg-yellow-400",
    tile: "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-100 font-black",
  },
  cuti: {
    label: "Cuti",
    dot: "bg-purple-500",
    tile: "bg-purple-500 text-white shadow-md shadow-purple-200 font-black",
  },
};

const calendarLegend: DailyAttendanceCategory[] = [
  "hadir",
  "terlambat",
  "wfh",
  "kunjungan",
  "izin_sakit",
  "cuti",
];

function RecapDetailMotionStyles() {
  return (
    <style>{`
      @keyframes recapDetailEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .recap-detail-enter {
        animation: recapDetailEnter 320ms ease-out both;
      }

      .recap-detail-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .recap-detail-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

export default function AdminEmployeeAttendanceRecapDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const employeeId = String(params.id || "");

  const [startDate, setStartDate] = useState(() =>
    getInitialDate(searchParams, "startDate"),
  );
  const [endDate, setEndDate] = useState(() =>
    getInitialDate(searchParams, "endDate"),
  );
  const [employee, setEmployee] = useState<EmployeeRecap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() =>
    getMonthDate(getInitialDate(searchParams, "startDate")),
  );

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportMode, setExportMode] = useState<"summary" | "detail">("summary");

  const getRecap = useCallback(async () => {
    if (startDate && endDate && startDate > endDate) {
      setEmployee(null);
      setErrorMessage("Tanggal mulai tidak boleh melewati tanggal akhir.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const queryParams = new URLSearchParams({ employeeId });

      if (startDate) queryParams.set("startDate", startDate);
      if (endDate) queryParams.set("endDate", endDate);

      const response = await fetch(
        `/api/admin/employee-attendance-recap?${queryParams.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      const data: EmployeeAttendanceRecapResponse =
        await readJsonResponse(response);

      if (!response.ok || !data.success) {
        setEmployee(null);
        setErrorMessage(
          getDisplayErrorMessage(data.message, "Gagal mengambil rekap karyawan."),
        );
        return;
      }

      setEmployee(data.employees?.[0] || null);

      if (data.startDate && data.startDate !== startDate) {
        setStartDate(data.startDate);
      }

      if (data.endDate && data.endDate !== endDate) {
        setEndDate(data.endDate);
      }
    } catch (error) {
      setEmployee(null);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil rekap karyawan.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [employeeId, endDate, startDate]);

  useEffect(() => {
    void getRecap();
  }, [getRecap]);

  useEffect(() => {
    if (!startDate) return;

    setCalendarMonth(getMonthDate(startDate));
  }, [startDate]);

  const summary = useMemo<EmployeeAttendanceSummary>(() => {
    return (
      employee?.summary || {
        totalHariKerja: 0,
        totalPresensi: 0,
        hadir: 0,
        terlambat: 0,
        totalWorkMinutes: 0,
        menunggu: 0,
        izin: 0,
        sakit: 0,
        cuti: 0,
        lainnya: 0,
        wfh: 0,
        kunjungan: 0,
        gajiPokok: 0,
        potonganPerHari: 0,
        estimasiPotonganTidakMasuk: 0,
        estimasiSalary: 0,
      }
    );
  }, [employee]);

  const backHref = `/admin/rekap-kehadiran-karyawan?startDate=${startDate}&endDate=${endDate}`;

  const triggerDownload = (htmlContent: string, fileName: string) => {
    const blob = new Blob([htmlContent], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadExcelSummary = () => {
    if (!employee) return;

    const rows = [
      ["Karyawan", employee.name],
      ["Kode Karyawan", employee.employeeCode || "-"],
      ["Shift", employee.shiftName || "-"],
      ["Status Kepegawaian", employee.employmentStatus || "-"],
      ["Masa Kerja", formatEmploymentPeriod(employee)],
      ["Periode Rekap", formatDateRange(startDate, endDate)],
      ["Total Hari Kerja", summary.totalHariKerja],
      ["Total Presensi", summary.totalPresensi],
      ["Hadir", summary.hadir],
      ["Terlambat (Menit)", summary.terlambat],
      ["WFH", summary.wfh || 0],
      ["Kunjungan", summary.kunjungan || 0],
      ["Total Kerja", formatWorkDuration(summary.totalWorkMinutes)],
      ["Menunggu", summary.menunggu],
      ["Izin", summary.izin],
      ["Sakit", summary.sakit],
      ["Cuti", summary.cuti],
      ["Lainnya", summary.lainnya],
    ];
    const tableRows = rows
      .map(
        ([label, value]) =>
          `<tr><td>${escapeExcelCell(label)}</td><td>${escapeExcelCell(value)}</td></tr>`,
      )
      .join("");
    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            table { border-collapse: collapse; font-family: Arial, sans-serif; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; }
            th { background: #123c8c; color: #ffffff; text-align: left; }
            td:first-child { font-weight: 700; background: #f8fbff; }
          </style>
        </head>
        <body>
          <h2>Ringkasan Rekap Kehadiran - ${escapeExcelCell(employee.name)}</h2>
          <table>
            <thead><tr><th>Info Rekap</th><th>Nilai</th></tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>`;

    triggerDownload(
      html,
      getExcelFileName("rekap-summary", employee.name, startDate, endDate),
    );
    setIsExportModalOpen(false);
  };

  const handleDownloadExcelDetail = () => {
    if (!employee) return;

    const logs = employee.logs || employee.dailyRecords || [];
    const tableRows = logs
      .map((log) => {
        const dayName = getIndonesianDayName(log.date);
        const checkIn = formatTimeOnly(log.checkInTime);
        const checkOut = formatTimeOnly(log.checkOutTime);
        const lateMins = log.lateMinutes ?? 0;
        const workDur = formatWorkDuration(log.workMinutes ?? 0);
        const workMode = formatWorkModeLabel(log.workMode);
        const statusLabel = getCategoryLabel(log.category);

        return `<tr>
          <td>${escapeExcelCell(log.date)}</td>
          <td>${escapeExcelCell(dayName)}</td>
          <td>${escapeExcelCell(employee.name)}</td>
          <td>${escapeExcelCell(employee.employeeCode || "-")}</td>
          <td>${escapeExcelCell(employee.shiftName || "Normal")}</td>
          <td>${escapeExcelCell(checkIn)}</td>
          <td>${escapeExcelCell(checkOut)}</td>
          <td>${escapeExcelCell(lateMins)}</td>
          <td>${escapeExcelCell(workDur)}</td>
          <td>${escapeExcelCell(workMode)}</td>
          <td>${escapeExcelCell(statusLabel)}</td>
        </tr>`;
      })
      .join("");

    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            table { border-collapse: collapse; font-family: Arial, sans-serif; width: 100%; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; font-size: 13px; }
            th { background: #123c8c; color: #ffffff; text-align: left; font-weight: bold; }
            tr:nth-child(even) { background-color: #f8fbff; }
          </style>
        </head>
        <body>
          <h2>List Kehadiran Detail Harian - ${escapeExcelCell(employee.name)}</h2>
          <p>Periode: ${escapeExcelCell(formatDateRange(startDate, endDate))}</p>
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Hari</th>
                <th>Nama Karyawan</th>
                <th>NIK / Kode</th>
                <th>Shift</th>
                <th>Jam Masuk Real</th>
                <th>Jam Pulang Real</th>
                <th>Terlambat (Menit)</th>
                <th>Durasi Kerja</th>
                <th>Mode Absen</th>
                <th>Status Kehadiran</th>
              </tr>
            </thead>
            <tbody>${tableRows || `<tr><td colspan="11" style="text-align:center;">Tidak ada log presensi untuk periode ini</td></tr>`}</tbody>
          </table>
        </body>
      </html>`;

    triggerDownload(
      html,
      getExcelFileName("rekap-detail-harian", employee.name, startDate, endDate),
    );
    setIsExportModalOpen(false);
  };

  const executeExport = () => {
    if (exportMode === "summary") {
      handleDownloadExcelSummary();
    } else {
      handleDownloadExcelDetail();
    }
  };

  const attendanceItems = [
    {
      label: "Hadir",
      value: summary.hadir,
      className: "border-emerald-100 bg-emerald-50 text-emerald-700",
    },
    {
      label: "Terlambat (Menit)",
      value: summary.terlambat,
      className: "border-amber-100 bg-amber-50 text-amber-700",
    },
    {
      label: "WFH",
      value: summary.wfh || 0,
      className: "border-sky-100 bg-sky-50 text-sky-700",
    },
    {
      label: "Kunjungan",
      value: summary.kunjungan || 0,
      className: "border-teal-100 bg-teal-50 text-teal-700",
    },
    {
      label: "Total Kerja",
      value: formatWorkDuration(summary.totalWorkMinutes),
      className: "border-blue-100 bg-blue-50 text-[#123c8c]",
    },
    {
      label: "Sakit",
      value: summary.sakit,
      className: "border-rose-100 bg-rose-50 text-rose-700",
    },
    {
      label: "Cuti Periode Ini",
      value: `${summary.cuti} Hari`,
      className: "border-sky-100 bg-sky-50 text-sky-700",
    },
    {
      label: "Sisa Kuota Cuti",
      value: `${employee?.remainingLeaveQuota ?? Math.max(0, 12 - (employee?.approvedLeaveDays || summary.cuti))} Hari`,
      className: "border-purple-100 bg-purple-50 text-purple-800",
    },
  ];

  const employeePhoto = getEmployeePhoto(employee);
  const dailyRecordByDate = useMemo(() => {
    return new Map(
      (employee?.dailyRecords || []).map((record) => [record.date, record]),
    );
  }, [employee?.dailyRecords]);

  const calendarDays = useMemo(
    () => buildCalendarDays(calendarMonth),
    [calendarMonth],
  );

  const handlePrevMonth = () => {
    const prevMonth = addMonths(calendarMonth, -1);
    setCalendarMonth(prevMonth);

    const year = prevMonth.getFullYear();
    const month = prevMonth.getMonth();
    const firstDayStr = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const lastDayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    setStartDate(firstDayStr);
    setEndDate(lastDayStr);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(calendarMonth, 1);
    setCalendarMonth(nextMonth);

    const year = nextMonth.getFullYear();
    const month = nextMonth.getMonth();
    const firstDayStr = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const lastDayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    setStartDate(firstDayStr);
    setEndDate(lastDayStr);
  };

  return (
    <MobileShell variant="admin" withBottomPadding={false}>
      <RecapDetailMotionStyles />

      <AppHeader title="Detail Rekap Kehadiran" variant="admin" />

      <main className="min-h-dvh bg-gradient-to-br from-[#f6f8ff] via-white to-[#eef4ff]">
        <section className="mx-auto max-w-7xl space-y-7 px-5 py-6 md:px-10 lg:px-16">
          <div className="recap-detail-enter flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={backHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#123c8c] shadow-lg shadow-slate-300/30 ring-1 ring-blue-100 transition hover:bg-[#f8fbff]"
            >
              <ArrowLeft size={17} strokeWidth={2.8} />
              Kembali ke daftar
            </Link>

            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              disabled={isLoading || !employee}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#0f3274] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <Download size={17} strokeWidth={2.8} />
              Download Excel
            </button>
          </div>

          {isLoading ? (
            <div className="recap-detail-enter flex items-center justify-center gap-3 rounded-[2.25rem] border border-blue-100 bg-white p-12 text-sm font-bold text-slate-500 shadow-xl shadow-slate-300/30">
              <Loader2 size={20} className="animate-spin text-[#123c8c]" />
              Mengambil detail rekap karyawan...
            </div>
          ) : errorMessage ? (
            <div className="recap-detail-enter rounded-[2.25rem] border border-red-100 bg-red-50 p-8 text-sm font-bold text-red-700 shadow-xl shadow-slate-300/30">
              {errorMessage}
            </div>
          ) : !employee ? (
            <div className="recap-detail-enter rounded-[2.25rem] border border-blue-100 bg-white p-12 text-center text-sm font-bold text-slate-500 shadow-xl shadow-slate-300/30">
              Data rekap karyawan tidak ditemukan.
            </div>
          ) : (
            <>
              {/* Employee Summary Card */}
              <div className="recap-detail-enter overflow-hidden rounded-[2.25rem] border border-blue-100 bg-white shadow-xl shadow-slate-300/30">
                <div className="grid grid-cols-1 divide-y divide-blue-50 lg:grid-cols-[1.4fr_1fr] lg:divide-x lg:divide-y-0">
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-[#eaf1ff] text-[#123c8c] ring-1 ring-blue-100">
                        {employeePhoto ? (
                          <img
                            src={employeePhoto}
                            alt={employee.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserRound size={32} strokeWidth={2.6} />
                        )}
                      </div>

                      <div>
                        <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                          {employee.name}
                        </h2>
                        <p className="mt-1 text-sm font-bold text-slate-500">
                          {employee.employeeCode || "Karyawan"} •{" "}
                          {employee.shiftName || "Shift Normal"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#123c8c] ring-1 ring-blue-100">
                        {employee.employmentStatus || "Karyawan Tetap"}
                      </span>
                      <span className="inline-flex rounded-full bg-[#f8fbff] border border-blue-100 px-3 py-1 text-xs font-black text-slate-600">
                        Masa Kerja: {formatEmploymentPeriod(employee)}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-3 text-[#123c8c]">
                      <CalendarDays size={22} strokeWidth={2.6} />
                      <h3 className="text-lg font-black uppercase tracking-wide">
                        Filter Periode
                      </h3>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-black uppercase tracking-wide text-slate-500">
                          Tanggal Mulai
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="recap-detail-field mt-2 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-900 focus:border-[#123c8c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-black uppercase tracking-wide text-slate-500">
                          Tanggal Akhir
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="recap-detail-field mt-2 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-900 focus:border-[#123c8c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-blue-100 bg-[#f8fbff] p-4 text-xs font-bold text-slate-600">
                      Menampilkan rekap periode:{" "}
                      <span className="font-black text-[#123c8c]">
                        {formatDateRange(startDate, endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Statistics Grid */}
              <div className="recap-detail-enter rounded-[2.25rem] border border-blue-100 bg-white p-8 shadow-xl shadow-slate-300/30 md:p-12">
                <h3 className="text-2xl font-black text-slate-950">
                  Ringkasan Kehadiran
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {attendanceItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex flex-col items-center justify-center text-center rounded-2xl border p-5 ${item.className}`}
                    >
                      <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                        {item.label}
                      </p>
                      <p className="mt-2 text-2xl font-black">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kalender Kehadiran */}
              <div className="recap-detail-enter rounded-[2.25rem] border border-blue-100 bg-white p-8 shadow-xl shadow-slate-300/30 md:p-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#123c8c]">
                      Kalender Kehadiran
                    </p>
                    <h3 className="mt-1 text-2xl font-black text-slate-950">
                      {formatCalendarMonth(calendarMonth)}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-[#123c8c] shadow-md shadow-slate-200/60 transition hover:bg-[#f8fbff] active:scale-95"
                      title="Bulan sebelumnya"
                    >
                      <ChevronLeft size={18} strokeWidth={2.8} />
                    </button>

                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-[#123c8c] shadow-md shadow-slate-200/60 transition hover:bg-[#f8fbff] active:scale-95"
                      title="Bulan berikutnya"
                    >
                      <ChevronRight size={18} strokeWidth={2.8} />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-black uppercase tracking-wider text-slate-400">
                    <div>Min</div>
                    <div>Sen</div>
                    <div>Sel</div>
                    <div>Rab</div>
                    <div>Kam</div>
                    <div>Jum</div>
                    <div>Sab</div>
                  </div>

                  <div className="mt-3 grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => {
                      if (!day) {
                        return (
                          <div
                            key={`blank-${index}`}
                            className="h-11 rounded-2xl bg-slate-50/60"
                          />
                        );
                      }

                      const record = dailyRecordByDate.get(day.dateKey);
                      const isSelectedRange = isDateInRange(
                        day.dateKey,
                        startDate,
                        endDate,
                      );
                      const categoryStyle = record
                        ? calendarCategoryStyles[record.category]
                        : null;

                      return (
                        <div
                          key={day.dateKey}
                          className={`flex h-11 items-center justify-center rounded-2xl text-xs font-black transition ${
                            categoryStyle
                              ? categoryStyle.tile
                              : isSelectedRange
                                ? "bg-[#f8fbff] text-slate-700 border border-blue-100/60"
                                : "bg-slate-100/70 text-slate-400 font-semibold"
                          }`}
                          title={
                            categoryStyle
                              ? `${day.dateKey} - ${categoryStyle.label}`
                              : day.dateKey
                          }
                        >
                          {day.day}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend Keterangan Warna Kehadiran */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5 rounded-2xl border border-blue-100 bg-[#f8fbff] p-4 text-xs font-bold">
                    {calendarLegend.map((cat) => {
                      const style = calendarCategoryStyles[cat];
                      return (
                        <div key={cat} className="flex items-center gap-2">
                          <span className={`h-3 w-3 rounded-full ${style.dot}`} />
                          <span className="text-slate-700">{style.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      {isExportModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 backdrop-blur-md p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#123c8c]">
                  <FileSpreadsheet size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Pilih Mode Export Excel</h3>
                  <p className="text-xs font-bold text-slate-400">Unduh format rekap kehadiran karyawan</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={() => setExportMode("summary")}
                className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                  exportMode === "summary"
                    ? "border-[#123c8c] bg-[#f0f5ff] ring-2 ring-[#123c8c]/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    exportMode === "summary"
                      ? "bg-[#123c8c] text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Table size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-900">Mode Rekap Total (Summary)</h4>
                  <p className="mt-1 text-xs font-semibold text-slate-500 leading-relaxed">
                    Berisi ringkasan akumulasi total hari kerja, total hadir, terlambat, WFH, cuti, & total jam kerja per periode.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setExportMode("detail")}
                className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                  exportMode === "detail"
                    ? "border-[#123c8c] bg-[#f0f5ff] ring-2 ring-[#123c8c]/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    exportMode === "detail"
                      ? "bg-[#123c8c] text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <ListFilter size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-900">Mode List Kehadiran (Detail Harian)</h4>
                  <p className="mt-1 text-xs font-semibold text-slate-500 leading-relaxed">
                    Format rincian log per tanggal (Tanggal, Hari, Shift, Jam Masuk/Pulang Real, Terlambat, Durasi, Mode, Status).
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-slate-600 transition hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={executeExport}
                className="flex items-center gap-2 rounded-xl bg-[#123c8c] px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#0f3274]"
              >
                <Download size={15} strokeWidth={2.8} />
                Unduh Excel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </MobileShell>
  );
}

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
  Loader2,
  UserRound,
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
  date: string;
  category: DailyAttendanceCategory;
};

type AttendanceLogItem = {
  id: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  lateMinutes: number;
  workMinutes: number;
  status: string | null;
  checkInStatus: string | null;
  workMode: string | null;
  checkOutWorkMode: string | null;
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
  summary: EmployeeAttendanceSummary;
  dailyRecords?: DailyAttendanceRecord[];
  logs?: AttendanceLogItem[];
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

function getExcelFileName(employeeName: string, startDate: string, endDate: string) {
  const safeName = employeeName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `rekap-kehadiran-${safeName || "karyawan"}-${startDate}-${endDate}.xls`;
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
    label: "Hadir",
    dot: "bg-emerald-500",
    tile: "bg-emerald-500 text-white shadow-lg shadow-emerald-200",
  },
  terlambat: {
    label: "Terlambat",
    dot: "bg-orange-500",
    tile: "bg-orange-500 text-white shadow-lg shadow-orange-200",
  },
  wfh: {
    label: "WFH",
    dot: "bg-red-600",
    tile: "bg-red-600 text-white shadow-lg shadow-red-200",
  },
  kunjungan: {
    label: "Kunjungan",
    dot: "bg-teal-500",
    tile: "bg-teal-500 text-white shadow-lg shadow-teal-200",
  },
  izin_sakit: {
    label: "Izin/Sakit",
    dot: "bg-yellow-400",
    tile: "bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-100",
  },
  cuti: {
    label: "Cuti",
    dot: "bg-violet-500",
    tile: "bg-violet-500 text-white shadow-lg shadow-violet-200",
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
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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
            th { background: #b91c1c; color: #ffffff; text-align: left; }
            td:first-child { font-weight: 700; background: #fef2f2; }
          </style>
        </head>
        <body>
          <table>
            <thead><tr><th>Info Rekap</th><th>Nilai</th></tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>`;
    const blob = new Blob([html], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = getExcelFileName(employee.name, startDate, endDate);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
  };

  const handleDownloadExcelDetailList = () => {
    if (!employee) return;

    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const logsMap = new Map((employee.logs || []).map((log) => [log.date, log]));

    const datesInRange: string[] = [];
    if (startDate && endDate) {
      const cur = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T00:00:00`);
      while (cur <= end) {
        datesInRange.push(cur.toISOString().slice(0, 10));
        cur.setDate(cur.getDate() + 1);
      }
    } else {
      (employee.logs || []).forEach((log) => datesInRange.push(log.date));
    }

    const tableRows = datesInRange
      .map((dateStr) => {
        const dateObj = new Date(`${dateStr}T00:00:00`);
        const dayName = dayNames[dateObj.getDay()] || "-";
        const log = logsMap.get(dateStr);

        const checkIn = log?.checkInTime
          ? new Date(log.checkInTime).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "-";

        const checkOut = log?.checkOutTime
          ? new Date(log.checkOutTime).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "-";

        const workMode = log?.workMode
          ? log.workMode.toUpperCase()
          : log?.checkInTime
          ? "OFFICE"
          : "-";

        let statusText = "Tidak Hadir";
        if (log?.checkInTime) {
          if (log.lateMinutes > 0) {
            statusText = `Terlambat (${log.lateMinutes} mnt)`;
          } else {
            statusText = "Hadir Tepat Waktu";
          }
        }

        return `<tr>
          <td>${escapeExcelCell(dateStr)}</td>
          <td>${escapeExcelCell(dayName)}</td>
          <td>${escapeExcelCell(employee.name)}</td>
          <td>${escapeExcelCell(employee.employeeCode || "-")}</td>
          <td>${escapeExcelCell(employee.shiftName || "-")}</td>
          <td>${escapeExcelCell(checkIn)}</td>
          <td>${escapeExcelCell(checkOut)}</td>
          <td>${escapeExcelCell(log?.lateMinutes || 0)}</td>
          <td>${escapeExcelCell(formatWorkDuration(log?.workMinutes || 0))}</td>
          <td>${escapeExcelCell(workMode)}</td>
          <td>${escapeExcelCell(statusText)}</td>
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
            th { background: #b91c1c; color: #ffffff; text-align: left; font-weight: bold; }
            tr:nth-child(even) { background-color: #fef2f2; }
          </style>
        </head>
        <body>
          <h3>Laporan List Kehadiran Harian - ${escapeExcelCell(employee.name)}</h3>
          <p>Periode: ${escapeExcelCell(formatDateRange(startDate, endDate))}</p>
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Hari</th>
                <th>Nama Karyawan</th>
                <th>NIK/Kode</th>
                <th>Shift</th>
                <th>Jam Masuk</th>
                <th>Jam Pulang</th>
                <th>Terlambat (Menit)</th>
                <th>Durasi Kerja</th>
                <th>Mode Absen (WFH/Office)</th>
                <th>Status Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>`;

    const blob = new Blob([html], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `list-kehadiran-${employee.name.toLowerCase().replace(/\s+/g, "-")}-${startDate}-${endDate}.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
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
      className: "border-red-100 bg-red-50 text-[#b91c1c]",
    },
    {
      label: "Sakit",
      value: summary.sakit,
      className: "border-rose-100 bg-rose-50 text-rose-700",
    },
    {
      label: "Cuti",
      value: summary.cuti,
      className: "border-sky-100 bg-sky-50 text-sky-700",
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
  const firstMonth = getMonthDate(startDate || getDateKey(new Date()));
  const lastMonth = getMonthDate(endDate || startDate || getDateKey(new Date()));
  const canOpenPreviousMonth =
    getMonthKey(addMonths(calendarMonth, -1)) >= getMonthKey(firstMonth);
  const canOpenNextMonth =
    getMonthKey(addMonths(calendarMonth, 1)) <= getMonthKey(lastMonth);

  return (
    <MobileShell variant="admin" withBottomPadding={false}>
      <RecapDetailMotionStyles />

      <AppHeader title="Detail Rekap Kehadiran" variant="admin" />

      <main className="min-h-dvh bg-gradient-to-br from-[#f6f8ff] via-white to-[#eef4ff]">
        <section className="mx-auto max-w-7xl space-y-7 px-5 py-6 md:px-10 lg:px-16">
          <div className="recap-detail-enter flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={backHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#b91c1c] shadow-lg shadow-slate-300/30 ring-1 ring-red-100 transition hover:bg-[#fef2f2]"
            >
              <ArrowLeft size={17} strokeWidth={2.8} />
              Kembali ke daftar
            </Link>

            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              disabled={isLoading || !employee}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#b91c1c] px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-950/20 transition hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <Download size={17} strokeWidth={2.8} />
              Download Excel
            </button>
          </div>

          {isExportModalOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xl font-black text-slate-900">
                  Pilihan Mode Export Excel
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Pilih format laporan Excel yang ingin diunduh untuk {employee?.name}:
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={handleDownloadExcelSummary}
                    className="flex w-full items-center justify-between rounded-2xl border border-red-100 bg-[#fef2f2] p-4 text-left transition hover:border-[#b91c1c] hover:bg-red-50/50"
                  >
                    <div>
                      <p className="text-sm font-black text-[#b91c1c]">
                        1. Mode Rekap Total (Summary)
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">
                        Ringkasan total hari kerja, total hadir, terlambat, WFH & total jam kerja.
                      </p>
                    </div>
                    <Download size={18} className="shrink-0 text-[#b91c1c]" />
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadExcelDetailList}
                    className="flex w-full items-center justify-between rounded-2xl border border-red-100 bg-[#fef2f2] p-4 text-left transition hover:border-[#b91c1c] hover:bg-red-50/50"
                  >
                    <div>
                      <p className="text-sm font-black text-[#b91c1c]">
                        2. Mode List Kehadiran (Detail Harian)
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">
                        Rincian log absen per baris tanggal (Jam Masuk, Jam Pulang, WFH & Keterangan).
                      </p>
                    </div>
                    <Download size={18} className="shrink-0 text-[#b91c1c]" />
                  </button>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsExportModalOpen(false)}
                    className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-200"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="recap-detail-enter overflow-hidden rounded-[2.25rem] border border-red-100 bg-white shadow-xl shadow-slate-300/30">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-[#b91c1c] p-8 text-white md:p-12">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white/15 ring-1 ring-white/20">
                    {employeePhoto ? (
                      <img
                        src={employeePhoto}
                        alt={employee?.name || "Foto profil karyawan"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={32} strokeWidth={2.6} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-red-100">
                      Rekap karyawan
                    </p>
                    <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                      {employee?.name ||
                        (isLoading ? "Memuat..." : "Data tidak tersedia")}
                    </h2>
                    <p className="mt-3 text-base font-semibold text-red-100">
                      {formatDateRange(startDate, endDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-7 sm:grid-cols-2 md:p-10">
                <div className="min-h-36 rounded-3xl border border-red-100 bg-[#fef2f2] p-6">
                  <p className="text-sm font-bold text-slate-500">
                    Masa Kerja
                  </p>
                  <h3 className="mt-4 text-xl font-black leading-snug text-[#b91c1c]">
                    {formatEmploymentPeriod(employee)}
                  </h3>
                </div>

                <div className="min-h-36 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                  <p className="text-sm font-bold text-emerald-700">
                    Status Kepegawaian
                  </p>
                  <h3 className="mt-4 text-2xl font-black text-emerald-700">
                    {employee?.employmentStatus || "-"}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div
            className="recap-detail-enter rounded-[2.25rem] border border-white/70 bg-white/95 p-8 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-10"
            style={{ animationDelay: "80ms" }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-3 block text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                  Tanggal Mulai
                </span>

                <div className="relative">
                  <CalendarDays
                    size={22}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="recap-detail-field h-16 w-full rounded-3xl border border-red-100 bg-[#fef2f2] py-4 pl-14 pr-5 text-base font-bold text-slate-700 outline-none transition focus:border-[#b91c1c] focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-3 block text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                  Tanggal Akhir
                </span>

                <div className="relative">
                  <CalendarDays
                    size={22}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="recap-detail-field h-16 w-full rounded-3xl border border-red-100 bg-[#fef2f2] py-4 pl-14 pr-5 text-base font-bold text-slate-700 outline-none transition focus:border-[#b91c1c] focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </label>
            </div>
          </div>

          {errorMessage ? (
            <div className="recap-detail-enter rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-bold text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {isLoading ? (
            <div className="recap-detail-enter flex min-h-56 flex-col items-center justify-center gap-3 rounded-[2rem] border border-red-100 bg-white p-8 text-center shadow-xl shadow-slate-300/30">
              <Loader2
                className="h-8 w-8 animate-spin text-[#b91c1c]"
                strokeWidth={2.7}
              />
              <p className="text-sm font-bold text-slate-500">
                Menghitung rekap kehadiran...
              </p>
            </div>
          ) : (
            <>
              <div
                className="recap-detail-enter grid gap-5 sm:grid-cols-2 lg:grid-cols-7"
                style={{ animationDelay: "120ms" }}
              >
                {attendanceItems.map((item) => (
                  <div
                    key={item.label}
                    className={`min-h-36 rounded-3xl border p-6 ${item.className}`}
                  >
                    <p className="text-sm font-black">{item.label}</p>
                    <p className="mt-5 text-4xl font-black">{item.value}</p>
                  </div>
                ))}
              </div>

              <div
                className="recap-detail-enter overflow-hidden rounded-[2.25rem] border border-red-100 bg-white shadow-xl shadow-slate-300/30"
                style={{ animationDelay: "160ms" }}
              >
                <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#b91c1c]">
                      Kalender Kehadiran
                    </p>
                    <h3 className="mt-2 text-2xl font-black capitalize text-slate-950">
                      {formatCalendarMonth(calendarMonth)}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth((current) => addMonths(current, -1))
                      }
                      disabled={!canOpenPreviousMonth}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-white text-[#b91c1c] shadow-sm transition hover:bg-[#fef2f2] disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300"
                    >
                      <ChevronLeft size={22} strokeWidth={2.8} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth((current) => addMonths(current, 1))
                      }
                      disabled={!canOpenNextMonth}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-white text-[#b91c1c] shadow-sm transition hover:bg-[#fef2f2] disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300"
                    >
                      <ChevronRight size={22} strokeWidth={2.8} />
                    </button>
                  </div>
                </div>

                <div className="p-4 md:p-8">
                  <div className="grid grid-cols-7 gap-2 text-center md:gap-3">
                    {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map(
                      (dayLabel) => (
                        <div
                          key={dayLabel}
                          className="py-2 text-[11px] font-black text-slate-400 md:text-sm"
                        >
                          {dayLabel}
                        </div>
                      ),
                    )}

                    {calendarDays.map((day, index) => {
                      if (!day) {
                        return (
                          <div
                            key={`blank-${index}`}
                            className="h-11 rounded-2xl bg-slate-50 md:h-14"
                          />
                        );
                      }

                      const record = dailyRecordByDate.get(day.dateKey);
                      const categoryStyle = record
                        ? calendarCategoryStyles[record.category]
                        : null;
                      const isInPeriod = isDateInRange(
                        day.dateKey,
                        startDate,
                        endDate,
                      );

                      return (
                        <div
                          key={day.dateKey}
                          className={`flex h-11 items-center justify-center rounded-2xl text-sm font-black transition md:h-14 md:text-base ${
                            !isInPeriod
                              ? "bg-slate-50 text-slate-300"
                              : categoryStyle
                                ? categoryStyle.tile
                                : "bg-[#fef2f2] text-slate-700"
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

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-slate-100 pt-5">
                    {calendarLegend.map((category) => {
                      const categoryStyle = calendarCategoryStyles[category];

                      return (
                        <div
                          key={category}
                          className="flex items-center gap-2 text-sm font-black text-slate-600"
                        >
                          <span
                            className={`h-3.5 w-3.5 rounded-full ${categoryStyle.dot}`}
                          />
                          {categoryStyle.label}
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
    </MobileShell>
  );
}

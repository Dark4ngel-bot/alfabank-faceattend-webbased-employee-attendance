"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Coins,
  CheckCircle,
  AlertTriangle,
  Printer,
  Loader2,
  Search,
  FileText,
  Calendar,
  Scale,
  Info,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: "active" | "inactive";
  created_at: string;
  employment_status: "kartap" | "kontrak" | "magang" | "pkl" | null;
  contract_start_date: string | null;
  contract_end_date: string | null;
  base_salary: number | string | null;
  department?: { name: string } | null;
  position?: { name: string } | null;
};

type SalaryRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  amount: number;
  note: string;
  createdAt: string;
};

function isWorkingDay(date: Date) {
  const day = date.getDay();

  return day !== 0 && day !== 6;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);

  return next;
}

function getWorkingDaysBetween(start: Date, end: Date) {
  const startDate = startOfDay(start);
  const endDate = startOfDay(end);

  if (endDate < startDate) return 0;

  let count = 0;
  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    if (isWorkingDay(cursor)) {
      count += 1;
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return count;
}

function parseDateSafe(value: string | null | undefined) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return startOfDay(date);
}

function getEffectiveWorkdayWindow(emp: Employee, month: number, year: number) {
  const periodStart = startOfDay(new Date(year, month - 1, 1));
  const periodEnd = startOfDay(new Date(year, month, 0));

  const joinDate =
    parseDateSafe(emp.contract_start_date) || parseDateSafe(emp.created_at);
  const contractEnd = parseDateSafe(emp.contract_end_date);

  let effectiveStart = periodStart;
  let effectiveEnd = periodEnd;

  if (joinDate && joinDate > effectiveStart) {
    effectiveStart = joinDate;
  }

  if (contractEnd && contractEnd < effectiveEnd) {
    effectiveEnd = contractEnd;
  }

  if (effectiveEnd < effectiveStart) {
    return {
      effectiveWorkdays: 0,
      periodWorkdays: getWorkingDaysBetween(periodStart, periodEnd),
    };
  }

  return {
    effectiveWorkdays: getWorkingDaysBetween(effectiveStart, effectiveEnd),
    periodWorkdays: getWorkingDaysBetween(periodStart, periodEnd),
  };
}

type SalarySortKey = "name" | "status" | "startDate" | "salary";

export default function AdminSalaryPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<SalaryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<SalarySortKey>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (col: SalarySortKey) => {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  // Pay Modal State
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [payMonth, setPayMonth] = useState("");
  const [payNote, setPayNote] = useState("");
  const [payError, setPayError] = useState("");

  // Dynamic Attendance Stats for selected employee
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [attendanceStats, setAttendanceStats] = useState({
    hadir: 0,
    telat: 0,
    izin: 0,
    sakit: 0,
    cuti: 0,
    totalDays: 30,
    recommendedSalary: 0,
  });

  const fetchSalaryData = async () => {
    try {
      setIsLoading(true);
      const [empRes, salRes] = await Promise.all([
        fetch("/api/employees", { cache: "no-store" }),
        fetch("/api/salary", { cache: "no-store" }),
      ]);

      const empData = await empRes.json();
      const salData = await salRes.json();

      if (empData.success && empData.employees) {
        setEmployees(
          empData.employees.filter((e: any) => e.role === "employee"),
        );
      }
      if (salData.success && salData.records) {
        setRecords(salData.records);
      }
    } catch (error) {
      console.error("Gagal memuat data gaji:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchSalaryData();
  }, []);

  // Fetch stats when selectedEmployee changes or when period changes
  const fetchEmployeeStats = async (emp: Employee, monthName: string) => {
    try {
      setIsStatsLoading(true);
      // Map Indonesian month name to number
      const monthsMap: Record<string, number> = {
        januari: 1,
        februari: 2,
        maret: 3,
        april: 4,
        mei: 5,
        juni: 6,
        juli: 7,
        agustus: 8,
        september: 9,
        oktober: 10,
        november: 11,
        desember: 12,
      };
      const cleanMonth = monthName.toLowerCase().split(" ")[0] || "";
      const monthNum = monthsMap[cleanMonth] || new Date().getMonth() + 1;
      const yearNum =
        Number(monthName.split(" ")[1]) || new Date().getFullYear();

      const res = await fetch(
        `/api/admin/attendance-reports?search=${encodeURIComponent(emp.email)}&month=${monthNum}&year=${yearNum}`,
      );
      const data = await res.json();

      if (data.success && data.reports) {
        const reports = data.reports;
        const hadir = reports.filter((a: any) => {
          const s = String(a.statusLabel || a.status || "").toLowerCase();
          return (
            s.includes("hadir") ||
            s.includes("present") ||
            s.includes("on_time") ||
            s === "on_time"
          );
        }).length;
        const telat = reports.filter((a: any) => {
          const s = String(a.statusLabel || a.status || "").toLowerCase();
          return s.includes("lambat") || s.includes("late");
        }).length;
        const izin = reports.filter((a: any) => {
          const s = String(a.statusLabel || a.status || "").toLowerCase();
          return s.includes("izin") || s.includes("permission");
        }).length;
        const sakit = reports.filter((a: any) => {
          const s = String(a.statusLabel || a.status || "").toLowerCase();
          return s.includes("sakit");
        }).length;
        const cuti = reports.filter((a: any) => {
          const s = String(a.statusLabel || a.status || "").toLowerCase();
          return s.includes("cuti");
        }).length;

        const { effectiveWorkdays } = getEffectiveWorkdayWindow(
          emp,
          monthNum,
          yearNum,
        );
        const activeCount = hadir + telat + izin + sakit + cuti;

        const base = Number(emp.base_salary || 0);
        const paidDays = Math.min(activeCount, effectiveWorkdays);
        const recommended =
          effectiveWorkdays > 0
            ? Math.round(base * (paidDays / effectiveWorkdays))
            : 0;

        setAttendanceStats({
          hadir,
          telat,
          izin,
          sakit,
          cuti,
          totalDays: effectiveWorkdays,
          recommendedSalary: recommended,
        });
      }
    } catch (err) {
      console.error("Gagal memuat statistik kehadiran karyawan:", err);
    } finally {
      setIsStatsLoading(false);
    }
  };

  const openPayModal = (emp: Employee) => {
    setSelectedEmp(emp);
    const date = new Date();
    const currentPeriod = date.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });
    setPayAmount("2000000");
    setPayMonth(currentPeriod);
    setPayNote("Gaji bulanan reguler");
    setPayError("");
    setShowPayModal(true);
    void fetchEmployeeStats(emp, currentPeriod);
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPayMonth(newPeriod);
    if (selectedEmp) {
      void fetchEmployeeStats(selectedEmp, newPeriod);
    }
  };

  const handleProcessPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmp) return;

    const amount = Number(payAmount);
    if (!amount || isNaN(amount) || amount <= 0) {
      setPayError("Nominal gaji harus berupa angka positif.");
      return;
    }

    try {
      setIsSubmitting(true);
      setPayError("");
      const res = await fetch("/api/salary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: selectedEmp.id,
          month: payMonth,
          amount,
          note: payNote,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowPayModal(false);
        void fetchSalaryData();
      } else {
        setPayError(data.message || "Gagal memproses gaji.");
      }
    } catch (err) {
      setPayError("Terjadi kesalahan koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.department?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const sortedEmployees = useMemo(() => {
    const list = [...filteredEmployees];
    list.sort((a, b) => {
      let comparison = 0;
      if (sortColumn === "name") {
        comparison = (a.name || "").localeCompare(b.name || "");
      } else if (sortColumn === "status") {
        const statusA = `${a.employment_status || ""} ${a.department?.name || ""}`;
        const statusB = `${b.employment_status || ""} ${b.department?.name || ""}`;
        comparison = statusA.localeCompare(statusB);
      } else if (sortColumn === "startDate") {
        const dateA = new Date(a.contract_start_date || a.created_at).getTime() || 0;
        const dateB = new Date(b.contract_start_date || b.created_at).getTime() || 0;
        comparison = dateA - dateB;
      } else if (sortColumn === "salary") {
        const salA = Number(a.base_salary || 2000000);
        const salB = Number(b.base_salary || 2000000);
        comparison = salA - salB;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
    return list;
  }, [filteredEmployees, sortColumn, sortDirection]);

  return (
    <MobileShell variant="admin">
      <AppHeader
        title="Gaji & Slip Payroll"
        subtitle="Manajemen penggajian karyawan dan kalkulasi prorata Kemnaker"
        variant="admin"
      />

      <main className="min-h-screen bg-[#f8fbff] dark:bg-[#0d1117] pb-24 text-slate-900 dark:text-slate-100">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-10 lg:px-16 space-y-8">
          {/* ADMIN HERO BANNER GAJI & PAYROLL */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#0f2b66] via-[#123c8c] to-[#2563eb] p-8 text-white shadow-2xl shadow-blue-900/25 border border-white/10">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-12 -translate-y-12 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-300 text-[10px] font-black uppercase tracking-widest border border-white/10">
                    Panel Payroll Admin
                  </span>
                </div>
                <h1 className="mt-3 text-3xl lg:text-4xl font-black tracking-tight text-white">
                  Kelola Penggajian Karyawan
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="rounded-2xl px-6 py-3 text-xs font-black bg-white text-[#123c8c] hover:bg-slate-100 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 shrink-0"
                >
                  <Printer size={16} className="text-[#123c8c]" />
                  <span>Cetak Rekap Laporan PDF</span>
                </button>
              </div>
            </div>

            {/* QUICK STATS IN ADMIN HERO */}
            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="block text-blue-200/70 text-[10px] font-bold uppercase">Total Karyawan Active</span>
                <span className="text-xl font-black text-white">{employees.length} Orang</span>
              </div>
              <div>
                <span className="block text-blue-200/70 text-[10px] font-bold uppercase">Patokan Gaji Pokok</span>
                <span className="text-xl font-black text-emerald-300">Rp 2.000.000</span>
              </div>
              <div>
                <span className="block text-blue-200/70 text-[10px] font-bold uppercase">Formula Dasar</span>
                <span className="text-base font-black text-white">Prorata Hari Kerja</span>
              </div>
              <div>
                <span className="block text-blue-200/70 text-[10px] font-bold uppercase">Riwayat Slip Diterbitkan</span>
                <span className="text-xl font-black text-white">{records.length} Slip</span>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-blue-100 dark:border-slate-800 bg-white dark:bg-[#161b22] p-6 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-5 mb-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                <Coins className="text-[#123c8c] dark:text-blue-400" />
                Daftar Karyawan & Penggajian
              </h3>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Mobile quick sort selector */}
                <div className="flex items-center gap-2 md:hidden">
                  <span className="text-xs font-black text-slate-500 whitespace-nowrap">Urutkan:</span>
                  <select
                    value={`${sortColumn}-${sortDirection}`}
                    onChange={(e) => {
                      const [col, dir] = e.target.value.split("-") as [SalarySortKey, "asc" | "desc"];
                      setSortColumn(col);
                      setSortDirection(dir);
                    }}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1117] py-2.5 px-3 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
                  >
                    <option value="name-asc">Nama Karyawan (A - Z)</option>
                    <option value="name-desc">Nama Karyawan (Z - A)</option>
                    <option value="status-asc">Status / Divisi (A - Z)</option>
                    <option value="status-desc">Status / Divisi (Z - A)</option>
                    <option value="startDate-asc">Mulai Kerja (Terlama)</option>
                    <option value="startDate-desc">Mulai Kerja (Terbaru)</option>
                    <option value="salary-asc">Gaji Pokok (Terendah)</option>
                    <option value="salary-desc">Gaji Pokok (Tertinggi)</option>
                  </select>
                </div>

                <div className="relative rounded-2xl bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 md:w-80">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Cari karyawan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
                  />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2
                  className="animate-spin text-[#123c8c] dark:text-blue-400"
                  size={36}
                />
              </div>
            ) : sortedEmployees.length === 0 ? (
              <p className="text-center text-sm font-semibold text-slate-500 py-6">
                Karyawan tidak ditemukan.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-left text-xs text-slate-600 dark:text-slate-300">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#0d1117] text-slate-500 dark:text-slate-400 font-black uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 whitespace-nowrap">
                      <th className="px-4 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleSort("name")}
                          className={`flex items-center gap-1.5 font-black transition hover:text-[#123c8c] dark:hover:text-blue-400 cursor-pointer ${
                            sortColumn === "name" ? "text-[#123c8c] dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          <span>Nama Karyawan</span>
                          {sortColumn === "name" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp size={13} className="stroke-[3]" />
                            ) : (
                              <ArrowDown size={13} className="stroke-[3]" />
                            )
                          ) : (
                            <ArrowUpDown size={11} className="opacity-30 hover:opacity-100" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleSort("status")}
                          className={`flex items-center gap-1.5 font-black transition hover:text-[#123c8c] dark:hover:text-blue-400 cursor-pointer ${
                            sortColumn === "status" ? "text-[#123c8c] dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          <span>Status / Divisi</span>
                          {sortColumn === "status" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp size={13} className="stroke-[3]" />
                            ) : (
                              <ArrowDown size={13} className="stroke-[3]" />
                            )
                          ) : (
                            <ArrowUpDown size={11} className="opacity-30 hover:opacity-100" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleSort("startDate")}
                          className={`flex items-center gap-1.5 font-black transition hover:text-[#123c8c] dark:hover:text-blue-400 cursor-pointer ${
                            sortColumn === "startDate" ? "text-[#123c8c] dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          <span>Mulai Kerja</span>
                          {sortColumn === "startDate" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp size={13} className="stroke-[3]" />
                            ) : (
                              <ArrowDown size={13} className="stroke-[3]" />
                            )
                          ) : (
                            <ArrowUpDown size={11} className="opacity-30 hover:opacity-100" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleSort("salary")}
                          className={`flex items-center gap-1.5 font-black transition hover:text-[#123c8c] dark:hover:text-blue-400 cursor-pointer ${
                            sortColumn === "salary" ? "text-[#123c8c] dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          <span>Gaji Pokok</span>
                          {sortColumn === "salary" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp size={13} className="stroke-[3]" />
                            ) : (
                              <ArrowDown size={13} className="stroke-[3]" />
                            )
                          ) : (
                            <ArrowUpDown size={11} className="opacity-30 hover:opacity-100" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-center whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {sortedEmployees.map((emp) => {
                      const isInternOrPkl =
                        emp.employment_status === "magang" ||
                        emp.employment_status === "pkl";

                      return (
                        <tr
                          key={emp.id}
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                        >
                          <td className="px-4 py-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            {emp.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="font-black text-slate-700 dark:text-slate-300 capitalize">
                              {emp.employment_status === "kartap"
                                ? "Tetap"
                                : emp.employment_status || "-"}
                            </span>
                            <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                              {emp.department?.name || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold whitespace-nowrap">
                            {new Date(
                              emp.contract_start_date || emp.created_at,
                            ).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(Number(emp.base_salary || 0))}
                          </td>
                          <td className="px-4 py-3 text-center whitespace-nowrap">
                            <button
                              onClick={() => openPayModal(emp)}
                              className="inline-flex h-8 shrink-0 whitespace-nowrap items-center justify-center rounded-xl bg-[#123c8c] dark:bg-blue-600 px-4 text-xs font-black text-white shadow-md shadow-blue-200 dark:shadow-none transition hover:bg-[#1b4da4] dark:hover:bg-blue-700 active:scale-[0.98]"
                            >
                              Hitung & Bayar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* RIWAYAT GAJI */}
          <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-5 mb-6">
              <FileText className="text-[#123c8c]" />
              Riwayat Pembayaran Gaji
            </h3>

            {isLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="animate-spin text-[#123c8c]" size={24} />
              </div>
            ) : records.length === 0 ? (
              <p className="text-center text-sm font-semibold text-slate-500 py-6">
                Belum ada riwayat pembayaran gaji.
              </p>
            ) : (
              <div className="space-y-4">
                {records.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-blue-50 bg-[#f8fbff] hover:bg-slate-50 transition gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#123c8c]">
                        <Coins size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">
                          {rec.employeeName}
                        </h4>
                        <p className="text-xs font-semibold text-slate-500">
                          Periode: {rec.month}
                        </p>
                        <p className="text-xs font-bold text-[#123c8c] mt-1">
                          {rec.note || "Gaji Bulanan"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-400">
                          Nominal Transfer
                        </p>
                        <p className="text-base font-black text-emerald-600">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(rec.amount)}
                        </p>
                      </div>

                      <button
                        onClick={() => window.print()}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-600 transition active:scale-95"
                        title="Cetak Slip Gaji"
                      >
                        <Printer size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* PAY MODAL */}
      {showPayModal && selectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-2xl rounded-[2rem] border border-blue-100 bg-white p-6 shadow-2xl my-8">
            <h3 className="text-lg font-black text-[#123c8c] mb-4">
              Proses Kalkulasi & Gaji Karyawan
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Form Input */}
              <form onSubmit={handleProcessPay} className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">
                    Penerima Gaji
                  </p>
                  <p className="text-base font-black text-slate-800">
                    {selectedEmp.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedEmp.department?.name || "-"} /{" "}
                    {selectedEmp.position?.name || "-"}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase text-slate-400">
                    Periode / Bulan Gaji
                  </label>
                  <input
                    type="text"
                    value={payMonth}
                    onChange={(e) => handlePeriodChange(e.target.value)}
                    className="w-full rounded-xl border border-blue-100 bg-[#f6f8ff] py-2.5 px-4 text-xs font-bold text-slate-700 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase text-slate-400">
                    Nominal Transfer (Rp)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="w-full rounded-xl border border-blue-100 bg-[#f6f8ff] py-2.5 px-4 text-xs font-bold text-slate-700 outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPayAmount(String(attendanceStats.recommendedSalary))
                      }
                      className="px-3 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black shrink-0 hover:bg-emerald-600 transition"
                      title="Gunakan rekomendasi kemnaker"
                    >
                      Prorata
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase text-slate-400">
                    Catatan / Keterangan Slip
                  </label>
                  <textarea
                    value={payNote}
                    onChange={(e) => setPayNote(e.target.value)}
                    className="w-full rounded-xl border border-blue-100 bg-[#f6f8ff] py-2.5 px-4 text-xs font-bold text-slate-700 outline-none"
                    rows={2}
                  />
                </div>

                {payError && (
                  <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-xs font-bold text-red-600">
                    {payError}
                  </div>
                )}

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPayModal(false)}
                    className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-xs font-black text-slate-600 hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 rounded-xl bg-[#123c8c] px-5 text-xs font-black text-white hover:bg-[#1b4da4] transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : null}
                    Proses Gaji
                  </button>
                </div>
              </form>

              {/* Rincian Ringkas Kehadiran & Rekomendasi Gaji */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1117] p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                    Rekap Kehadiran
                  </h4>

                  {isStatsLoading ? (
                    <div className="flex justify-center py-6">
                      <Loader2 className="animate-spin text-[#123c8c] dark:text-blue-400" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white dark:bg-[#161b22] p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="block text-[10px] text-slate-400 font-semibold">Hadir</span>
                        <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                          {attendanceStats.hadir + attendanceStats.telat}
                        </span>
                      </div>
                      <div className="bg-white dark:bg-[#161b22] p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="block text-[10px] text-slate-400 font-semibold">Sakit/Izin</span>
                        <span className="text-base font-black text-amber-600 dark:text-amber-400">
                          {attendanceStats.sakit + attendanceStats.izin}
                        </span>
                      </div>
                      <div className="bg-white dark:bg-[#161b22] p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="block text-[10px] text-slate-400 font-semibold">Cuti</span>
                        <span className="text-base font-black text-blue-600 dark:text-blue-400">
                          {attendanceStats.cuti}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">Gaji Pokok Prorata</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(attendanceStats.recommendedSalary)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">Tunjangan Makan & Transport</span>
                    <span className="font-bold text-emerald-600">
                      +{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format((attendanceStats.hadir + attendanceStats.telat) * 40000)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">Potongan (BPJS / Telat)</span>
                    <span className="font-bold text-rose-500">
                      -{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format((attendanceStats.telat * 5000) + 60000)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">Rekomendasi THP</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                        Math.max(0, attendanceStats.recommendedSalary + ((attendanceStats.hadir + attendanceStats.telat) * 40000) - (attendanceStats.telat * 5000) - 60000)
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav variant="admin" />

      {/* DEDICATED PRINT LAYOUT - KOP SURAT SLIP GAJI */}
      <div id="print-area-salary" className="hidden print:block bg-white p-8 text-slate-900 font-sans">
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden !important;
            }
            #print-area-salary,
            #print-area-salary * {
              visibility: visible !important;
            }
            #print-area-salary {
              display: block !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              background: #ffffff !important;
              color: #0f172a !important;
              margin: 0 !important;
              padding: 24px !important;
            }
            @page {
              size: A4 portrait;
              margin: 8mm;
            }
          }
        `}</style>

        {/* KOP SURAT PERUSAHAAN */}
        <div className="border-b-4 border-[#123c8c] pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-[#123c8c] text-white flex items-center justify-center font-black text-2xl tracking-tighter">
              FA
            </div>
            <div>
              <h1 className="text-xl font-black text-[#123c8c] uppercase tracking-wide">
                PT CREATIVEMU INDONESIA
              </h1>
              <p className="text-xs font-bold text-slate-700">
                Sistem Informasi SDM & Presensi Digital FaceAttend
              </p>
              <p className="text-[10px] font-semibold text-slate-600">
                Jl. Raya Utama No. 88, Jakarta | Email: hr@creativemu.co.id | Telp: (021) 555-0199
              </p>
            </div>
          </div>
          <div className="text-right border-l-2 border-slate-300 pl-4">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 text-[11px] font-black rounded-full uppercase tracking-wider mb-1">
              DOKUMEN RESMI
            </span>
            <p className="text-[10px] font-bold text-slate-700">
              Arsip Penggajian Admin
            </p>
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-black uppercase tracking-wider text-slate-900">
            LAPORAN REKAP SLIP GAJI KARYAWAN
          </h2>
          <p className="text-xs font-bold text-slate-600 mt-0.5">
            Bukti Penerbitan dan Riwayat Transfer Gaji Bulanan
          </p>
        </div>

        {/* RINCIAN SLIP & REKAP GAJI */}
        <div className="space-y-6">
          {records.length === 0 ? (
            <p className="text-center text-sm font-semibold text-slate-500 py-8">
              Tidak ada data riwayat gaji untuk dicetak.
            </p>
          ) : (
            records.map((rec, idx) => (
              <div key={rec.id || idx} className="border-2 border-slate-300 rounded-xl p-5 mb-6 page-break-inside-avoid bg-slate-50/50">
                <div className="flex justify-between border-b-2 border-slate-300 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Nama Karyawan</span>
                    <strong className="text-base font-black text-slate-900">{rec.employeeName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Periode Gaji</span>
                    <strong className="text-base font-black text-[#123c8c]">{rec.month}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Tanggal Transfer</span>
                    <strong className="text-xs font-bold text-slate-800">
                      {new Date(rec.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 my-4 bg-white p-4 rounded-xl border border-slate-300">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block">Keterangan / Catatan Slip:</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{rec.note || "Gaji Bulanan Reguler"}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 block">Total Nominal Diterima (Nett):</span>
                    <p className="text-xl font-black text-emerald-700">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(rec.amount)}
                    </p>
                  </div>
                </div>

                {/* TANDA TANGAN */}
                <div className="grid grid-cols-2 gap-8 pt-4 mt-4 border-t border-slate-300 text-center">
                  <div>
                    <p className="text-xs font-bold text-slate-700">Penerima Gaji,</p>
                    <div className="h-14" />
                    <p className="text-xs font-black text-slate-900 border-b border-slate-500 inline-block px-4">
                      {rec.employeeName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Finance & Payroll Admin,</p>
                    <div className="h-14" />
                    <p className="text-xs font-black text-slate-900 border-b border-slate-500 inline-block px-4">
                      PT CREATIVEMU INDONESIA
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileShell>
  );
}

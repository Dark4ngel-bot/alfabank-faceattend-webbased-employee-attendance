"use client";

import { useEffect, useState } from "react";
import {
  Coins,
  CheckCircle,
  AlertTriangle,
  Printer,
  Loader2,
  FileText,
  Calendar,
  Scale,
  Info,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";

type ProfileData = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  employment_status: "kartap" | "kontrak" | "magang" | "pkl" | null;
  contract_start_date: string | null;
  base_salary: number | string | null;
  department?: { name: string } | null;
  position?: { name: string } | null;
  unit?: { name: string } | null;
  nik?: string | null;
  bank_account_number?: string | null;
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

export default function EmployeeSalaryPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [records, setRecords] = useState<SalaryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Attendance stats for current month
  const [attendanceStats, setAttendanceStats] = useState({
    hadir: 0,
    telat: 0,
    izin: 0,
    sakit: 0,
    cuti: 0,
    totalDays: 30,
    recommendedSalary: 0,
    mealAllowance: 0,
    transportAllowance: 0,
    latePenalty: 0,
    bpjsDeduction: 0,
    netPay: 0,
  });

  const fetchStats = async (email: string, rawBaseSalary: number) => {
    try {
      const baseSalary = rawBaseSalary > 0 ? rawBaseSalary : 2000000;
      const today = new Date();
      const monthNum = today.getMonth() + 1;
      const yearNum = today.getFullYear();

      const res = await fetch(
        `/api/attendance/history?month=${monthNum}&year=${yearNum}`,
      );
      const data = await res.json();

      if (data.records) {
        const reports = data.records;
        const hadir = reports.filter((a: any) => {
          const s = String(a.status || "").toLowerCase();
          return (
            s.includes("hadir") ||
            s.includes("present") ||
            s.includes("on_time") ||
            s === "on_time"
          );
        }).length;
        const telat = reports.filter((a: any) => {
          const s = String(a.status || "").toLowerCase();
          return s.includes("lambat") || s.includes("late");
        }).length;
        const izin = reports.filter((a: any) => {
          const s = String(a.status || "").toLowerCase();
          return s.includes("izin") || s.includes("permission");
        }).length;
        const sakit = reports.filter((a: any) => {
          const s = String(a.status || "").toLowerCase();
          return s.includes("sakit");
        }).length;
        const cuti = reports.filter((a: any) => {
          const s = String(a.status || "").toLowerCase();
          return s.includes("cuti");
        }).length;

        // Effective working days in current month (excluding weekends)
        let totalDays = 0;
        const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
          const dayOfWeek = new Date(yearNum, monthNum - 1, d).getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) totalDays++;
        }
        if (totalDays === 0) totalDays = 22; // default 22 hari kerja

        // Hari kerja yang diakui dibayar (Hadir + Telat + Cuti Resmi + Sakit Ber-surat Dokter + Izin)
        const paidDays = Math.min(hadir + telat + cuti + sakit + izin, totalDays);
        
        // Gaji pokok Prorata
        const recommended = Math.round(baseSalary * (paidDays / totalDays));
        
        // Tunjangan uang makan & transport per hari hadir nyata
        const mealAllowance = (hadir + telat) * 25000;
        const transportAllowance = (hadir + telat) * 15000;
        const latePenalty = telat * 5000;
        const bpjsDeduction = Math.round(baseSalary * 0.03); // 3% BPJS
        
        const netPay =
          recommended +
          mealAllowance +
          transportAllowance -
          latePenalty -
          bpjsDeduction;

        setAttendanceStats({
          hadir,
          telat,
          izin,
          sakit,
          cuti,
          totalDays,
          recommendedSalary: recommended,
          mealAllowance,
          transportAllowance,
          latePenalty,
          bpjsDeduction,
          netPay: Math.max(0, netPay),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [profileRes, salRes] = await Promise.all([
          fetch("/api/profile", { cache: "no-store" }),
          fetch("/api/salary", { cache: "no-store" }),
        ]);

        const profileData = await profileRes.json();
        const salData = await salRes.json();

        if (profileData.success && profileData.user) {
          const userSalary = Number(profileData.user.base_salary || 0);
          setProfile(profileData.user);
          void fetchStats(profileData.user.email, userSalary);
        }
        if (salData.success && salData.records) {
          setRecords(salData.records);
        }
      } catch (err) {
        console.error("Gagal memuat data payroll karyawan:", err);
      } finally {
        setIsLoading(false);
      }
    }
    void fetchData();
  }, []);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <MobileShell variant="employee">
      <div className="print:hidden">
        <AppHeader
          title="Rincian Payroll & Slip"
          subtitle="Rincian pendapatan bersih dan slip gaji resmi Anda"
          variant="employee"
        />

        <main className="min-h-screen bg-[#f6f8ff] dark:bg-[#0d1117] pb-28 text-slate-900 dark:text-white">
          <div className="mx-auto max-w-7xl px-5 py-6 md:px-10 lg:px-16 space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-[#123c8c]" size={36} />
              </div>
            ) : !profile ? (
              <p className="text-center text-sm font-semibold text-slate-500 py-6">
                Profil tidak ditemukan.
              </p>
            ) : (
              <>


                {/* HERO CARD MELAYANG & UTAMA (NET SALARY HERO CARD) */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#0f2b66] via-[#123c8c] to-[#2563eb] p-8 text-white shadow-2xl shadow-blue-900/25 border border-white/10">
                  <div className="absolute right-0 top-0 h-64 w-64 translate-x-12 -translate-y-12 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                  <div className="absolute left-1/3 bottom-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-300 text-[10px] font-black uppercase tracking-widest border border-white/10">
                          Take-Home Pay (THP)
                        </span>
                      </div>
                      <h1 className="mt-3 text-4xl lg:text-5xl font-black tracking-tight text-white">
                        {formatIDR(attendanceStats.netPay)}
                      </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="rounded-2xl px-6 py-3 text-xs font-black bg-white text-[#123c8c] hover:bg-slate-100 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 shrink-0"
                      >
                        <Printer size={16} className="text-[#123c8c]" />
                        <span>Cetak Slip Gaji PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* BOTTOM QUICK STATS INSIDE HERO */}
                  <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="block text-blue-200/70 text-[10px] font-bold uppercase">Gaji Pokok Prorata</span>
                      <span className="text-base font-black text-white">{formatIDR(attendanceStats.recommendedSalary)}</span>
                    </div>
                    <div>
                      <span className="block text-blue-200/70 text-[10px] font-bold uppercase">Tunjangan Kehadiran</span>
                      <span className="text-base font-black text-emerald-300">+{formatIDR(attendanceStats.mealAllowance + attendanceStats.transportAllowance)}</span>
                    </div>
                    <div>
                      <span className="block text-blue-200/70 text-[10px] font-bold uppercase">Potongan Wajib</span>
                      <span className="text-base font-black text-rose-300">-{formatIDR(attendanceStats.latePenalty + attendanceStats.bpjsDeduction)}</span>
                    </div>
                    <div>
                      <span className="block text-blue-200/70 text-[10px] font-bold uppercase">Hari Diakui Dibayar</span>
                      <span className="text-base font-black text-white">{attendanceStats.hadir + attendanceStats.telat + attendanceStats.cuti + attendanceStats.sakit + attendanceStats.izin} / {attendanceStats.totalDays} Hari</span>
                    </div>
                  </div>
                </div>

                {/* HORIZONTAL STATUS PRESENSI WIDGET */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#161b22] p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">Total Hari Masuk</p>
                      <p className="text-2xl font-black text-slate-800 dark:text-white mt-0.5">{attendanceStats.hadir + attendanceStats.telat} <span className="text-xs font-normal text-slate-400">Hari</span></p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#161b22] p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">Sakit / Izin Valid</p>
                      <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">{attendanceStats.sakit + attendanceStats.izin} <span className="text-xs font-normal text-slate-400">Hari</span></p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold">
                      +
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#161b22] p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">Cuti Tahunan Resmi</p>
                      <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">{attendanceStats.cuti} <span className="text-xs font-normal text-slate-400">Hari</span></p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold">
                      ★
                    </span>
                  </div>
                </div>

                {/* RINCIAN DETIL KOMPONEN (DUA KOLOM BERDAMPINGAN) */}
                <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#161b22] p-6 shadow-sm space-y-5">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                    Rincian Komponen Hak & Potongan Gaji
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* PENDAPATAN */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        + Pendapatan (Earnings)
                      </span>
                      
                      <div className="space-y-2 text-xs font-semibold">
                        <div className="flex justify-between items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                          <div>
                            <p className="text-slate-800 dark:text-white font-bold">Gaji Pokok Prorata</p>
                            <p className="text-[10px] text-slate-400">Dasar: Rp 2.000.000 ({attendanceStats.hadir + attendanceStats.telat + attendanceStats.sakit + attendanceStats.izin + attendanceStats.cuti}/{attendanceStats.totalDays} hari)</p>
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {formatIDR(attendanceStats.recommendedSalary)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                          <div>
                            <p className="text-slate-800 dark:text-white font-bold">Tunjangan Uang Makan</p>
                            <p className="text-[10px] text-slate-400">Rp 25.000 x {attendanceStats.hadir + attendanceStats.telat} Hari Hadir</p>
                          </div>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            +{formatIDR(attendanceStats.mealAllowance)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                          <div>
                            <p className="text-slate-800 dark:text-white font-bold">Tunjangan Transportasi</p>
                            <p className="text-[10px] text-slate-400">Rp 15.000 x {attendanceStats.hadir + attendanceStats.telat} Hari Hadir</p>
                          </div>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            +{formatIDR(attendanceStats.transportAllowance)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* POTONGAN */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-rose-500 dark:text-rose-400">
                        - Potongan (Deductions)
                      </span>

                      <div className="space-y-2 text-xs font-semibold">
                        <div className="flex justify-between items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                          <div>
                            <p className="text-slate-800 dark:text-white font-bold">Iuran BPJS Kesehatan & Ketenagakerjaan</p>
                            <p className="text-[10px] text-slate-400">Estimasi 3% dari Gaji Pokok</p>
                          </div>
                          <span className="font-bold text-rose-500 dark:text-rose-400">
                            -{formatIDR(attendanceStats.bpjsDeduction)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                          <div>
                            <p className="text-slate-800 dark:text-white font-bold">Denda Terlambat</p>
                            <p className="text-[10px] text-slate-400">Rp 5.000 x {attendanceStats.telat} Hari Telat</p>
                          </div>
                          <span className="font-bold text-rose-500 dark:text-rose-400">
                            -{formatIDR(attendanceStats.latePenalty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LIST SLIP GAJI */}
                <div className="rounded-[2.2rem] border border-blue-100 dark:border-slate-800 bg-white dark:bg-[#161b22] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-5">
                    <FileText className="text-[#123c8c] dark:text-blue-400" />
                    Riwayat Slip Gaji Anda
                  </h3>

                  {records.length === 0 ? (
                    <p className="text-center text-sm font-semibold text-slate-500 py-6">
                      Belum ada slip gaji yang diterbitkan.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {records.map((rec) => (
                        <div
                          key={rec.id}
                          className="flex items-center justify-between p-4 rounded-2xl border border-blue-50 dark:border-slate-850 bg-[#f8fbff] dark:bg-[#0d1117]/30 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/20 text-[#123c8c] dark:text-blue-450">
                              <FileText size={18} />
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                                Periode: {rec.month}
                              </h4>
                              <p className="text-xs font-semibold text-slate-500">
                                {rec.note || "Gaji bulanan reguler"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-xs font-bold text-slate-400">
                                Diterima
                              </p>
                              <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
                                {formatIDR(rec.amount)}
                              </p>
                            </div>

                            <button
                              onClick={() => window.print()}
                              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-350 transition active:scale-95"
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
              </>
            )}
          </div>
        </main>

        <BottomNav variant="employee" />
      </div>

      {/* DEDICATED CORPORATE SLIP / PAYROLL DRAFT PRINT LAYOUT */}
      <div id="print-area-emp-salary" className="hidden print:block p-8 bg-white text-slate-900 font-sans text-xs">
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden !important;
            }
            #print-area-emp-salary,
            #print-area-emp-salary * {
              visibility: visible !important;
            }
            #print-area-emp-salary {
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
              TERBAYAR / LUNAS
            </span>
            <p className="text-[10px] font-bold text-slate-700">
              Dokumen Slip Gaji Resmi
            </p>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-black uppercase tracking-wider text-slate-900">
            SLIP GAJI RESMI KARYAWAN
          </h2>
          <p className="text-xs font-bold text-slate-600 mt-0.5">
            Bukti Pembayaran Gaji Bulanan Digital
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-300">
          <div>
            <table className="w-full text-xs font-medium text-slate-900">
              <tbody>
                <tr>
                  <td className="font-bold py-1 w-36">Nama Karyawan</td>
                  <td className="font-black">: {profile?.name || "-"}</td>
                </tr>
                <tr>
                  <td className="font-bold py-1">NIK Karyawan</td>
                  <td>: {profile?.nik || "-"}</td>
                </tr>
                <tr>
                  <td className="font-bold py-1">Jabatan / Unit</td>
                  <td>
                    : {profile?.position?.name || "-"} /{" "}
                    {profile?.unit?.name || "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full text-xs font-medium text-slate-900">
              <tbody>
                <tr>
                  <td className="font-bold py-1 w-36">Tanggal Cetak</td>
                  <td>
                    :{" "}
                    {new Date().toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold py-1">No. Rekening</td>
                  <td className="font-black">: {profile?.bank_account_number || "-"}</td>
                </tr>
                <tr>
                  <td className="font-bold py-1">Status Kepegawaian</td>
                  <td>: {profile?.employment_status === "kartap" ? "Karyawan Tetap" : "Karyawan Kontrak"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-2 border-slate-400 p-5 mb-6 rounded-xl">
          {/* EARNINGS COLUMN */}
          <div>
            <h4 className="font-black uppercase tracking-wider text-xs border-b-2 border-slate-400 pb-2 mb-3 text-[#123c8c]">
              I. Pendapatan (Earnings)
            </h4>
            <table className="w-full text-xs space-y-2 text-slate-900">
              <tbody>
                <tr className="py-1">
                  <td className="font-semibold">Gaji Pokok Prorata</td>
                  <td className="text-right font-black">
                    {formatIDR(attendanceStats.recommendedSalary)}
                  </td>
                </tr>
                <tr className="py-1">
                  <td className="font-semibold">
                    Tunjangan Makan ({attendanceStats.hadir + attendanceStats.telat} Hari)
                  </td>
                  <td className="text-right font-bold text-emerald-700">
                    +{formatIDR(attendanceStats.mealAllowance)}
                  </td>
                </tr>
                <tr className="py-1">
                  <td className="font-semibold">
                    Tunjangan Transport ({attendanceStats.hadir + attendanceStats.telat} Hari)
                  </td>
                  <td className="text-right font-bold text-emerald-700">
                    +{formatIDR(attendanceStats.transportAllowance)}
                  </td>
                </tr>
                <tr className="font-black border-t-2 border-slate-300 pt-2 text-slate-900">
                  <td className="pt-2">Total Pendapatan (A)</td>
                  <td className="text-right pt-2 text-emerald-800">
                    {formatIDR(
                      attendanceStats.recommendedSalary +
                        attendanceStats.mealAllowance +
                        attendanceStats.transportAllowance,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DEDUCTIONS COLUMN */}
          <div className="border-l-2 border-slate-300 pl-6">
            <h4 className="font-black uppercase tracking-wider text-xs border-b-2 border-slate-400 pb-2 mb-3 text-rose-700">
              II. Potongan (Deductions)
            </h4>
            <table className="w-full text-xs space-y-2 text-slate-900">
              <tbody>
                <tr className="py-1">
                  <td className="font-semibold">Potongan Terlambat ({attendanceStats.telat} Hari)</td>
                  <td className="text-right font-bold text-rose-700">
                    -{formatIDR(attendanceStats.latePenalty)}
                  </td>
                </tr>
                <tr className="py-1">
                  <td className="font-semibold">Iuran BPJS Wajib (3%)</td>
                  <td className="text-right font-bold text-rose-700">
                    -{formatIDR(attendanceStats.bpjsDeduction)}
                  </td>
                </tr>
                <tr className="font-black border-t-2 border-slate-300 pt-2 text-slate-900">
                  <td className="pt-2">Total Potongan (B)</td>
                  <td className="text-right pt-2 text-rose-800">
                    -{formatIDR(
                      attendanceStats.latePenalty +
                        attendanceStats.bpjsDeduction,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TAKE HOME PAY TOTAL */}
        <div className="border-2 border-[#123c8c] bg-blue-50/60 p-4 mb-8 flex justify-between items-center text-sm font-black rounded-xl text-[#123c8c]">
          <span>GAJI BERSIH DITERIMA (TAKE-HOME PAY)</span>
          <span className="text-lg">{formatIDR(attendanceStats.netPay)}</span>
        </div>

        <div className="grid grid-cols-2 gap-12 text-center text-xs mt-8 pt-4">
          <div>
            <p className="font-bold text-slate-700">Penerima (Karyawan),</p>
            <div className="h-16" />
            <p className="font-black text-slate-900 underline">
              {profile?.name || "........................"}
            </p>
          </div>
          <div>
            <p className="font-bold text-slate-700">Finance HRD / Owner,</p>
            <div className="h-16" />
            <p className="font-black text-slate-900 underline">
              PT CREATIVEMU INDONESIA
            </p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

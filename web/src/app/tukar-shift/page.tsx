"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageSquare,
  Send,
  Users,
  X,
  XCircle,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";

type Colleague = {
  id: string;
  name: string;
  employeeCode: string | null;
  profilePhoto: string | null;
  shiftName: string;
};

type SwapRequest = {
  id: string;
  targetUser?: {
    id: string;
    name: string;
    employeeCode: string | null;
    profilePhoto: string | null;
  };
  requester?: {
    id: string;
    name: string;
    employeeCode: string | null;
    profilePhoto: string | null;
  };
  swapDate: string;
  requesterShiftName: string;
  targetShiftName: string;
  reason: string | null;
  status: string;
  createdAt: string;
};

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateLabel(dateStr: string) {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.getTime() === today.getTime()) return "Hari ini";
    if (date.getTime() === tomorrow.getTime()) return "Besok";

    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getStatusConfig(status: string) {
  switch (status) {
    case "approved":
      return {
        label: "Disetujui",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        ring: "ring-emerald-200",
        dot: "bg-emerald-500",
      };
    case "rejected":
      return {
        label: "Ditolak",
        bg: "bg-red-50",
        text: "text-red-700",
        ring: "ring-red-200",
        dot: "bg-red-500",
      };
    default:
      return {
        label: "Menunggu",
        bg: "bg-amber-50",
        text: "text-amber-700",
        ring: "ring-amber-200",
        dot: "bg-amber-500",
      };
  }
}

export default function TukarShiftPage() {
  const [currentShiftName, setCurrentShiftName] = useState("Shift Utama");
  const [colleagues, setColleagues] = useState<Colleague[]>([]);
  const [sentRequests, setSentRequests] = useState<SwapRequest[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<SwapRequest[]>([]);

  const [targetUserId, setTargetUserId] = useState("");
  const [swapDate, setSwapDate] = useState(() => getTodayString());
  const [reason, setReason] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const [alertState, setAlertState] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  async function loadData() {
    try {
      setIsLoading(true);

      const [dataRes, colRes] = await Promise.all([
        fetch("/api/shift-swaps", { cache: "no-store" }),
        fetch("/api/shift-swaps/colleagues", { cache: "no-store" }),
      ]);

      const dataJson = await dataRes.json();
      const colJson = await colRes.json();

      if (dataJson.success) {
        setCurrentShiftName(dataJson.currentShiftName || "Shift Utama");
        setSentRequests(dataJson.sentRequests || []);
        setIncomingRequests(dataJson.incomingRequests || []);
      }

      if (colJson.success) {
        setColleagues(colJson.colleagues || []);
      }
    } catch (err) {
      console.error("LOAD_SWAP_DATA_ERROR:", err);
      setAlertState({ type: "error", message: "Gagal memuat data tukar shift." });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!targetUserId || !swapDate) {
      setAlertState({ type: "warning", message: "Pilih rekan kerja dan tanggal tukar shift." });
      return;
    }

    try {
      setIsSubmitting(true);
      setAlertState(null);

      const res = await fetch("/api/shift-swaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, swapDate, reason }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setAlertState({ type: "error", message: json.error || "Gagal mengirimkan pengajuan." });
        return;
      }

      setAlertState({ type: "success", message: json.message || "Pengajuan berhasil dikirim!" });
      setTargetUserId("");
      setReason("");
      await loadData();
    } catch (err) {
      console.error("SUBMIT_SWAP_ERROR:", err);
      setAlertState({ type: "error", message: "Terjadi kesalahan saat membuat pengajuan." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAction(swapId: string, action: "approve" | "reject") {
    try {
      setProcessingId(swapId);
      setAlertState(null);

      const res = await fetch(`/api/shift-swaps/${swapId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setAlertState({ type: "error", message: json.error || "Gagal memproses." });
        return;
      }

      setAlertState({ type: "success", message: json.message });
      await loadData();
    } catch (err) {
      console.error("SWAP_ACTION_ERROR:", err);
      setAlertState({ type: "error", message: "Terjadi kesalahan saat memproses." });
    } finally {
      setProcessingId(null);
    }
  }

  const pendingIncoming = incomingRequests.filter((r) => r.status === "pending");
  const allHistory = [
    ...sentRequests.map((r) => ({ ...r, direction: "out" as const })),
    ...incomingRequests.map((r) => ({ ...r, direction: "in" as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const selectedColleague = colleagues.find((c) => c.id === targetUserId);

  return (
    <MobileShell variant="employee">
      <AppHeader title="Tukar Shift" rightLabel="Tukar Shift" />

      {alertState ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/20 px-5 backdrop-blur-[2px]">
          <div
            className={`relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-2xl shadow-slate-900/25 ${
              alertState.type === "success"
                ? "ring-1 ring-emerald-100"
                : alertState.type === "error"
                  ? "ring-1 ring-red-100"
                  : "ring-1 ring-amber-100"
            }`}
          >
            <button
              type="button"
              onClick={() => setAlertState(null)}
              className="absolute right-5 top-5 z-10 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white text-slate-500 shadow-lg shadow-slate-900/10 ring-1 ring-slate-100 transition hover:bg-slate-50 hover:text-slate-800"
              aria-label="Tutup alert"
            >
              <X size={28} strokeWidth={2.8} />
            </button>

            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-amber-100/80 via-orange-50/70 to-transparent" />

            <div className="relative grid gap-5 p-8 pt-9 sm:grid-cols-[116px_1fr] sm:p-10">
              <div
                className={`flex h-28 w-28 items-center justify-center rounded-[1.8rem] ${
                  alertState.type === "success"
                    ? "bg-emerald-50 text-emerald-600"
                    : alertState.type === "error"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-amber-50 text-amber-600"
                }`}
              >
                {alertState.type === "success" ? (
                  <CheckCircle2 size={56} strokeWidth={2.8} />
                ) : alertState.type === "error" ? (
                  <XCircle size={56} strokeWidth={2.8} />
                ) : (
                  <AlertTriangle size={56} strokeWidth={2.8} />
                )}
              </div>

              <div className="min-w-0 pr-16">
                <span
                  className={`inline-flex rounded-full bg-white px-7 py-3 text-sm font-black uppercase tracking-[0.32em] shadow-sm ${
                    alertState.type === "success"
                      ? "text-emerald-700"
                      : alertState.type === "error"
                        ? "text-orange-700"
                        : "text-amber-700"
                  }`}
                >
                  {alertState.type === "success" ? "Berhasil" : "Perhatian"}
                </span>

                <h2 className="mt-6 text-3xl font-black leading-tight text-slate-950">
                  {alertState.type === "success"
                    ? "Pengajuan berhasil"
                    : "Tukar shift tidak bisa"}
                </h2>

                <p className="mt-5 text-lg font-bold leading-8 text-slate-500">
                  {alertState.message}
                </p>
              </div>
            </div>

            <div className="px-8 pb-8 sm:px-10 sm:pb-10">
              <button
                type="button"
                onClick={() => setAlertState(null)}
                className="flex min-h-[64px] w-full items-center justify-center rounded-[1.6rem] bg-[#123c8c] px-6 text-xl font-bold text-white shadow-xl shadow-blue-900/20 transition hover:bg-[#0e2f70] active:scale-[0.99]"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <main className="mx-auto max-w-7xl space-y-6 px-4 pb-28 pt-5 sm:px-6 md:px-10 lg:px-16">

        {/* ── INCOMING REQUESTS ALERT ── */}
        {pendingIncoming.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
              </span>
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-700">
                {pendingIncoming.length} Permintaan Masuk
              </h3>
            </div>

            {pendingIncoming.map((req) => (
              <div
                key={req.id}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/50 shadow-sm"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-sm">
                      <ArrowLeftRight size={20} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-slate-900">
                        {req.requester?.name}
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-slate-500">
                        <span className="text-blue-600">{req.requesterShiftName}</span>
                        {" → "}
                        <span className="text-blue-600">{req.targetShiftName}</span>
                      </p>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                        <Calendar size={12} />
                        {formatDateLabel(req.swapDate)}
                      </div>
                      {req.reason && (
                        <p className="mt-1.5 text-xs font-medium italic text-slate-500">
                          &quot;{req.reason}&quot;
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex border-t border-blue-100">
                  <button
                    type="button"
                    disabled={processingId === req.id}
                    onClick={() => handleAction(req.id, "reject")}
                    className="flex flex-1 items-center justify-center gap-1.5 border-r border-blue-100 px-4 py-3 text-xs font-extrabold text-red-600 transition hover:bg-red-50 active:bg-red-100 disabled:opacity-40"
                  >
                    {processingId === req.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <XCircle size={15} />
                    )}
                    Tolak
                  </button>
                  <button
                    type="button"
                    disabled={processingId === req.id}
                    onClick={() => handleAction(req.id, "approve")}
                    className="flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-extrabold text-emerald-600 transition hover:bg-emerald-50 active:bg-emerald-100 disabled:opacity-40"
                  >
                    {processingId === req.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={15} />
                    )}
                    Setuju
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── GRID LAYOUT: FORM (KIRI) & RIWAYAT (KANAN) ── */}
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          {/* ── FORM AJUKAN (KIRI) ── */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-3xl border border-blue-100/80 bg-white shadow-md shadow-blue-100/30"
          >
            {/* Header */}
            <div className="border-b border-blue-50 bg-gradient-to-r from-[#123c8c] to-[#1e56b8] p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <ArrowLeftRight size={20} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-white">
                      Ajukan Tukar Shift
                    </h2>
                    <p className="text-xs font-semibold text-blue-200">
                      Pilih rekan kerja & tanggal
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-white/15 px-3 py-1.5 text-right backdrop-blur-md ring-1 ring-white/20">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Shift Kamu</p>
                  <p className="text-xs font-black text-white">{currentShiftName}</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 p-5">
              {/* Rekan Kerja */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <Users size={12} />
                  Rekan Kerja Tujuan
                </label>
                <div className="relative">
                  <select
                    value={targetUserId}
                    onChange={(e) => setTargetUserId(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-3.5 pr-10 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Pilih rekan kerja...</option>
                    {colleagues.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name} — {col.shiftName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
                {selectedColleague && (
                  <p className="mt-1.5 text-[11px] font-bold text-blue-600">
                    Tukar ke {selectedColleague.shiftName}
                  </p>
                )}
              </div>

              {/* Tanggal */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <Calendar size={12} />
                  Tanggal Tukar
                </label>
                <input
                  type="date"
                  value={swapDate}
                  min={getTodayString()}
                  onChange={(e) => setSwapDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Alasan */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-500">
                  <MessageSquare size={12} />
                  Alasan (Opsional)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Contoh: Ada acara keluarga mendadak"
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-bold text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !targetUserId}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#123c8c] to-[#1e56b8] py-3.5 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:shadow-xl active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                Kirim Pengajuan
              </button>
            </div>
          </form>

          {/* ── RIWAYAT (KANAN) ── */}
          <section>
            <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">
              Riwayat Tukar Shift
            </h3>

            {isLoading ? (
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white p-8 text-xs font-bold text-slate-400">
                <Loader2 size={16} className="animate-spin text-blue-500" />
                Memuat...
              </div>
            ) : allHistory.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
                <ArrowLeftRight size={28} className="mx-auto text-slate-300" />
                <p className="mt-2 text-xs font-bold text-slate-400">
                  Belum ada riwayat tukar shift.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {allHistory.map((req) => {
                  const cfg = getStatusConfig(req.status);
                  const isOut = req.direction === "out";

                  return (
                    <div
                      key={`${req.direction}-${req.id}`}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm transition hover:shadow-md"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                          isOut
                            ? "bg-orange-50 text-orange-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {isOut ? "↑" : "↓"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-extrabold text-slate-800">
                          {isOut
                            ? `Ke: ${req.targetUser?.name || "-"}`
                            : `Dari: ${req.requester?.name || "-"}`}
                        </p>
                        <div className="mt-1">
                          <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                            {req.requesterShiftName} → {req.targetShiftName}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="text-[11px] font-bold text-slate-400">
                          {formatDateLabel(req.swapDate)}
                        </span>
                        <span
                          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black ring-1 ${cfg.bg} ${cfg.text} ${cfg.ring}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <BottomNav variant="employee" />
    </MobileShell>
  );
}

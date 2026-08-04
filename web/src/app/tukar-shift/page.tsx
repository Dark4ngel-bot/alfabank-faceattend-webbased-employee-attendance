"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  Loader2,
  Send,
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
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
      setAlertState({
        type: "error",
        message: "Gagal memuat data tukar shift.",
      });
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
      setAlertState({
        type: "warning",
        message: "Pilih rekan kerja dan tanggal tukar shift.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setAlertState(null);

      const res = await fetch("/api/shift-swaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId,
          swapDate,
          reason,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setAlertState({
          type: "error",
          message: json.error || "Gagal mengirimkan pengajuan tukar shift.",
        });
        return;
      }

      setAlertState({
        type: "success",
        message: json.message || "Pengajuan tukar shift berhasil dikirim.",
      });

      setTargetUserId("");
      setReason("");
      await loadData();
    } catch (err) {
      console.error("SUBMIT_SWAP_ERROR:", err);
      setAlertState({
        type: "error",
        message: "Terjadi kesalahan saat membuat pengajuan tukar shift.",
      });
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
        setAlertState({
          type: "error",
          message: json.error || "Gagal memproses permintaan tukar shift.",
        });
        return;
      }

      setAlertState({
        type: "success",
        message: json.message,
      });

      await loadData();
    } catch (err) {
      console.error("SWAP_ACTION_ERROR:", err);
      setAlertState({
        type: "error",
        message: "Terjadi kesalahan saat memproses tanggapan.",
      });
    } finally {
      setProcessingId(null);
    }
  }

  const pendingIncoming = incomingRequests.filter((r) => r.status === "pending");

  return (
    <MobileShell variant="employee">
      <AppHeader title="Tukar Shift" rightLabel="Tukar Shift" />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 pb-28 md:px-8">
        {/* ALERT BANNER / NOTIFIKASI PERMINTAAN SHIFT MASUK */}
        {pendingIncoming.length > 0 ? (
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#123c8c]">
              Notifikasi Permintaan Tukar Shift Masuk
            </p>

            {pendingIncoming.map((req) => (
              <div
                key={req.id}
                className="flex flex-col gap-4 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/90 to-white p-4 shadow-lg ring-2 ring-blue-500/20 sm:p-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-3 sm:items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#123c8c] text-white shadow-md sm:h-12 sm:w-12">
                    <ArrowLeftRight size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black leading-snug text-slate-900 sm:text-base">
                      {req.requester?.name} Mengajukan Tukar Shift!
                    </p>
                    <p className="mt-0.5 text-xs font-bold leading-5 text-slate-600 sm:text-sm">
                      Tanggal: <span className="font-extrabold text-[#123c8c]">{req.swapDate}</span> • Shift Kamu ({req.targetShiftName}) ↔ Shift {req.requester?.name} ({req.requesterShiftName})
                    </p>
                    {req.reason ? (
                      <p className="mt-1 text-xs font-medium italic text-slate-600">
                        &quot;{req.reason}&quot;
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 border-t border-blue-100/80 pt-3 md:border-t-0 md:pt-0">
                  {/* BUTTON SETUJU (CENTANG HIJAU) */}
                  <button
                    type="button"
                    disabled={processingId === req.id}
                    onClick={() => handleAction(req.id, "approve")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-black text-white shadow-md transition hover:bg-emerald-700 active:scale-95 disabled:opacity-50 sm:flex-none md:px-5"
                    title="Setujui Tukar Shift"
                  >
                    {processingId === req.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={18} />
                    )}
                    Setuju
                  </button>

                  {/* BUTTON TOLAK (SILANG MERAH) */}
                  <button
                    type="button"
                    disabled={processingId === req.id}
                    onClick={() => handleAction(req.id, "reject")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-red-500 px-4 py-2.5 text-xs font-black text-white shadow-md transition hover:bg-red-600 active:scale-95 disabled:opacity-50 sm:flex-none md:px-5"
                    title="Tolak Tukar Shift"
                  >
                    {processingId === req.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <XCircle size={18} />
                    )}
                    Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* ALERT STATE */}
        {alertState ? (
          <div
            className={`rounded-2xl border p-4 text-sm font-bold ${
              alertState.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : alertState.type === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            {alertState.message}
          </div>
        ) : null}

        {/* FORM BUAT PENGAJUAN TUKAR SHIFT */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/60 md:p-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]">
              <ArrowLeftRight size={24} strokeWidth={2.6} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#123c8c]">
                Tukar Shift Karyawan
              </p>
              <h2 className="mt-0.5 text-xl font-black text-slate-950 sm:text-2xl">
                Ajukan Tukar Shift
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-black text-slate-700">
                Pilih Rekan Kerja (Shift Utama / Pagi / Siang)
              </label>
              <select
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                className="mt-2 min-h-[52px] w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100"
              >
                <option value="">-- Pilih Rekan Kerja --</option>
                {colleagues.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name} ({col.shiftName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-black text-slate-700">
                Tanggal Tukar Shift
              </label>
              <input
                type="date"
                value={swapDate}
                min={getTodayString()}
                onChange={(e) => setSwapDate(e.target.value)}
                className="mt-2 min-h-[52px] w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-black text-slate-700">
                Alasan Tukar Shift (Opsional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Contoh: Ada keperluan keluarga mendadak di jam shift saya."
                className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold leading-6 text-slate-700 outline-none focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] text-sm font-black text-white shadow-lg transition hover:bg-[#0e2f70] active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              Kirim Permintaan Tukar Shift
            </button>
          </div>
        </form>

        {/* RIWAYAT SHIFT SWAP */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">
            Riwayat Pengajuan Tukar Shift
          </h3>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-[#f8fbff] p-8 text-sm font-bold text-slate-500">
              <Loader2 size={18} className="animate-spin text-[#123c8c]" />
              Memuat data...
            </div>
          ) : sentRequests.length === 0 && incomingRequests.length === 0 ? (
            <div className="rounded-2xl border border-blue-100 bg-white p-8 text-center text-sm font-bold text-slate-500">
              Belum ada riwayat pengajuan tukar shift.
            </div>
          ) : (
            <div className="space-y-3">
              {sentRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col gap-2 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Pengajuan Keluar
                    </p>
                    <p className="text-sm font-black text-slate-900">
                      Ke: {req.targetUser?.name} ({req.targetShiftName})
                    </p>
                    <p className="text-xs font-bold text-slate-500">
                      Tanggal Tukar: <span className="text-[#123c8c]">{req.swapDate}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        req.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : req.status === "rejected"
                          ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                          : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                      }`}
                    >
                      {req.status === "approved"
                        ? "Disetujui"
                        : req.status === "rejected"
                        ? "Ditolak"
                        : "Menunggu Konfirmasi"}
                    </span>
                  </div>
                </div>
              ))}

              {incomingRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col gap-2 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Pengajuan Masuk
                    </p>
                    <p className="text-sm font-black text-slate-900">
                      Dari: {req.requester?.name} ({req.requesterShiftName})
                    </p>
                    <p className="text-xs font-bold text-slate-500">
                      Tanggal Tukar: <span className="text-[#123c8c]">{req.swapDate}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        req.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : req.status === "rejected"
                          ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                          : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                      }`}
                    >
                      {req.status === "approved"
                        ? "Disetujui"
                        : req.status === "rejected"
                        ? "Ditolak"
                        : "Menunggu Konfirmasi"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav variant="employee" />
    </MobileShell>
  );
}

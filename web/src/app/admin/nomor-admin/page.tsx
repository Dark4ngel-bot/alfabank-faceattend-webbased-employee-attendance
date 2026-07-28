"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Phone,
  Plus,
  CheckCircle2,
  Trash2,
  PhoneCall,
  Loader2,
  AlertCircle,
  X,
  AlertTriangle,
  Info,
  Edit2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

type AdminNumberItem = {
  id: string;
  label: string;
  whatsapp: string;
  is_active: boolean;
  created_at: string;
};

type AlertModalState = {
  type: "warning" | "success" | "error" | "info";
  title: string;
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
} | null;

async function safeFetchJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { success: false, message: "Respon dari server tidak valid." };
  }
}

function formatWaDisplay(num: string) {
  const clean = num.replace(/\D/g, "");
  if (!clean) return num;
  if (clean.startsWith("0") && clean.length >= 10) {
    return clean.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
  }
  if (clean.startsWith("62") && clean.length >= 11) {
    return `+${clean.slice(0, 2)} ${clean.slice(2, 6)}-${clean.slice(6, 10)}-${clean.slice(10)}`;
  }
  return num;
}

function getWaLink(num: string) {
  let clean = num.replace(/\D/g, "");
  if (clean.startsWith("0")) {
    clean = "62" + clean.slice(1);
  }
  return `https://wa.me/${clean}`;
}

export default function AdminNomorAdminPage() {
  const [numbers, setNumbers] = useState<AdminNumberItem[]>([]);
  const [label, setLabel] = useState("Admin Creativemu");
  const [whatsapp, setWhatsapp] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alertModal, setAlertModal] = useState<AlertModalState>(null);
  const [isAlertClosing, setIsAlertClosing] = useState(false);
  const alertCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showAlert = useCallback(
    (
      title: string,
      message: string,
      type: "warning" | "success" | "error" | "info" = "info",
      onConfirm?: () => void,
      confirmText?: string
    ) => {
      if (alertCloseTimeoutRef.current) {
        clearTimeout(alertCloseTimeoutRef.current);
      }
      setIsAlertClosing(false);
      setAlertModal({ title, message, type, onConfirm, confirmText });
    },
    []
  );

  const closeAlert = useCallback(() => {
    setIsAlertClosing(true);
    alertCloseTimeoutRef.current = setTimeout(() => {
      setAlertModal(null);
      setIsAlertClosing(false);
    }, 240);
  }, []);

  async function fetchNumbers() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/nomor-admin", { cache: "no-store" });
      const data = await safeFetchJson(res);
      if (data.success && Array.isArray(data.numbers)) {
        setNumbers(data.numbers);
      }
    } catch (err) {
      console.error("Gagal mengambil data nomor admin:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchNumbers();
  }, []);

  const activeNumber = numbers.find((n) => n.is_active);

  function resetForm() {
    setLabel("Admin Creativemu");
    setWhatsapp("");
    setIsActive(true);
    setEditingId(null);
  }

  function startEdit(item: AdminNumberItem) {
    setEditingId(item.id);
    setLabel(item.label);
    setWhatsapp(item.whatsapp);
    setIsActive(item.is_active);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanNum = whatsapp.replace(/\D/g, "");
    if (!label.trim() || !cleanNum) {
      showAlert("Data Belum Lengkap", "Label dan Nomor WhatsApp wajib diisi.", "warning");
      return;
    }

    if (cleanNum.length < 12 || cleanNum.length > 13) {
      showAlert(
        "Nomor WhatsApp Tidak Valid",
        "Nomor WhatsApp harus berupa angka dengan panjang 12 sampai 13 digit.",
        "warning"
      );
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingId) {
        // Edit Mode
        const res = await fetch("/api/admin/nomor-admin", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            label: label.trim(),
            whatsapp: cleanNum,
            is_active: isActive,
          }),
        });
        const data = await safeFetchJson(res);
        if (data.success) {
          resetForm();
          void fetchNumbers();
          showAlert("Berhasil", "Nomor Admin berhasil diperbarui.", "success");
        } else {
          showAlert("Gagal Memperbarui", data.message || "Gagal memperbarui nomor admin.", "error");
        }
      } else {
        // Create Mode
        const res = await fetch("/api/admin/nomor-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: label.trim(),
            whatsapp: cleanNum,
            is_active: isActive,
          }),
        });
        const data = await safeFetchJson(res);
        if (data.success) {
          resetForm();
          void fetchNumbers();
          showAlert("Berhasil", "Nomor Admin berhasil ditambahkan ke sistem.", "success");
        } else {
          showAlert("Gagal Menambah Nomor", data.message || "Gagal menambah nomor admin.", "error");
        }
      }
    } catch (err) {
      showAlert("Kesalahan Server", "Terjadi kesalahan server.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function toggleActive(item: AdminNumberItem) {
    try {
      const res = await fetch("/api/admin/nomor-admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          is_active: !item.is_active,
        }),
      });
      const data = await safeFetchJson(res);
      if (data.success) {
        void fetchNumbers();
      }
    } catch (err) {
      console.error("Gagal mengubah status aktif nomor:", err);
    }
  }

  function handleDelete(id: string) {
    showAlert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus nomor admin ini? Data yang dihapus tidak dapat dikembalikan.",
      "warning",
      async () => {
        try {
          const res = await fetch(`/api/admin/nomor-admin?id=${id}`, {
            method: "DELETE",
          });
          const data = await safeFetchJson(res);
          if (data.success) {
            if (editingId === id) resetForm();
            void fetchNumbers();
            showAlert("Berhasil Hapus", "Nomor admin berhasil dihapus.", "success");
          } else {
            showAlert("Gagal Hapus", data.message || "Gagal menghapus nomor admin.", "error");
          }
        } catch (err) {
          showAlert("Kesalahan Server", "Gagal menghapus nomor admin.", "error");
        }
      },
      "Ya, Hapus Nomor"
    );
  }

  function getAlertTheme(type: NonNullable<AlertModalState>["type"]) {
    if (type === "success") {
      return {
        shell: "from-emerald-50 via-white to-blue-50",
        iconWrap: "bg-emerald-100 text-emerald-600",
        badge: "text-emerald-600 bg-white/70",
        button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20",
        icon: CheckCircle2,
        label: "BERHASIL",
      };
    }
    if (type === "error") {
      return {
        shell: "from-red-50 via-white to-blue-50",
        iconWrap: "bg-red-100 text-red-600",
        badge: "text-red-600 bg-white/70",
        button: "bg-red-600 hover:bg-red-700 shadow-red-900/20",
        icon: AlertTriangle,
        label: "GAGAL",
      };
    }
    if (type === "warning") {
      return {
        shell: "from-amber-50 via-white to-blue-50",
        iconWrap: "bg-amber-100 text-amber-600",
        badge: "text-amber-600 bg-white/70",
        button: "bg-amber-600 hover:bg-amber-700 shadow-amber-900/20",
        icon: AlertCircle,
        label: "PERHATIAN",
      };
    }
    return {
      shell: "from-blue-50 via-white to-blue-50",
      iconWrap: "bg-blue-100 text-[#123c8c]",
      badge: "text-[#123c8c] bg-white/70",
      button: "bg-[#123c8c] hover:bg-[#0f3274] shadow-blue-950/20",
      icon: Info,
      label: "INFORMASI",
    };
  }

  const alertTheme = alertModal ? getAlertTheme(alertModal.type) : null;
  const AlertIcon = alertTheme?.icon || Info;

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col bg-[#f4f7fc]">
        <AppHeader title="Nomor Admin" />

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-6xl space-y-6">

            <div className="grid gap-6 md:grid-cols-12">
              {/* Form Tambah/Edit Nomor Admin */}
              <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-slate-200/50 md:col-span-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <PhoneCall size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      NOMOR AKTIF HEADER
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      {activeNumber ? formatWaDisplay(activeNumber.whatsapp) : "Belum ada nomor aktif"}
                    </h3>
                    {activeNumber && (
                      <p className="text-xs font-bold text-emerald-600">
                        {activeNumber.label}
                      </p>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                      {editingId ? "Edit Nomor Admin" : "Tambah Nomor Baru"}
                    </h4>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 underline"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black uppercase text-slate-700">
                      Label
                    </label>
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="Admin Creativemu"
                      className="w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black uppercase text-slate-700">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={13}
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                      placeholder="081234567890 (12-13 Digit)"
                      className="w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#123c8c] focus:ring-[#123c8c]"
                      />
                      <div>
                        <p className="text-xs font-black text-slate-900">
                          Aktifkan ke header kanan atas
                        </p>
                        <p className="text-[11px] font-semibold text-slate-500">
                          Nomor aktif dipakai tombol WhatsApp header.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#123c8c] py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : editingId ? (
                        <Edit2 size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                      <span>{editingId ? "Simpan Perubahan" : "Tambah Nomor"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Daftar Nomor Admin */}
              <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-slate-200/50 md:col-span-7">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      DAFTAR NOMOR
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Nomor Admin
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {isLoading ? (
                    <div className="flex h-48 items-center justify-center">
                      <Loader2 className="animate-spin text-[#123c8c]" />
                    </div>
                  ) : numbers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                      <p className="text-sm font-bold text-slate-400">
                        Belum ada nomor admin.
                      </p>
                    </div>
                  ) : (
                    numbers.map((item) => (
                      <div
                        key={item.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border p-4 gap-3 transition ${
                          item.is_active
                            ? "border-emerald-200 bg-emerald-50/50"
                            : "border-slate-100 bg-[#f8fbff]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              item.is_active
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 text-slate-500"
                            }`}
                          >
                            <Phone size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-black text-slate-900">
                                {formatWaDisplay(item.whatsapp)}
                              </p>
                              <a
                                href={getWaLink(item.whatsapp)}
                                target="_blank"
                                rel="noreferrer"
                                title="Tes Kirim Pesan WA"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 px-2 py-0.5 rounded-full transition"
                              >
                                <MessageCircle size={12} />
                                <span>Tes WA</span>
                              </a>
                            </div>
                            <p className="text-xs font-bold text-slate-500">
                              {item.label}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#123c8c] transition hover:bg-blue-100"
                            title="Edit Nomor"
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleActive(item)}
                            className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${
                              item.is_active
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {item.is_active ? "Aktif" : "Set Aktif"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                            title="Hapus Nomor"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal Alert Kustom */}
        {alertModal && alertTheme ? (
          <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
            <div
              className={`w-full max-w-sm sm:max-w-md max-h-[90vh] flex flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br ${alertTheme.shell} shadow-2xl shadow-slate-900/20 transition-all duration-300 ${
                isAlertClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <div className="relative p-5 md:p-6 overflow-y-auto">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${alertTheme.iconWrap} shadow-md`}
                  >
                    <AlertIcon size={24} strokeWidth={2.8} />
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${alertTheme.badge}`}>
                      {alertTheme.label}
                    </div>

                    <h3 className="mt-2 text-base sm:text-lg font-black leading-tight text-slate-900">
                      {alertModal.title}
                    </h3>

                    <p className="mt-1 text-xs font-bold leading-relaxed text-slate-600">
                      {alertModal.message}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeAlert}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/80 text-slate-400 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 border-t border-white/60 bg-white/60 p-4 shrink-0">
                {alertModal.onConfirm && (
                  <button
                    type="button"
                    onClick={closeAlert}
                    className="w-1/2 rounded-xl bg-slate-200/90 py-2.5 text-xs font-black text-slate-600 transition hover:bg-slate-300"
                  >
                    Batal
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (alertModal.onConfirm) {
                      alertModal.onConfirm();
                    }
                    closeAlert();
                  }}
                  className={`w-full rounded-xl py-2.5 text-xs font-black text-white shadow-md transition active:scale-[0.98] ${alertTheme.button}`}
                >
                  {alertModal.confirmText || "Mengerti"}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <BottomNav />
      </div>
    </MobileShell>
  );
}


"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Pencil,
  PhoneCall,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import AppHeader from "@/components/AppHeader";
import MobileShell from "@/components/MobileShell";

type AdminContactNumber = {
  id: string;
  label: string;
  phone_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type ContactNumbersResponse = {
  success?: boolean;
  message?: string;
  numbers?: AdminContactNumber[];
};

function notifyAdminContactNumberChanged() {
  window.dispatchEvent(new Event("admin-contact-number-changed"));
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

function formatPhoneNumber(value: string) {
  if (!value) return "-";
  if (value.startsWith("62")) return `+${value}`;

  return value;
}

export default function AdminContactNumbersPage() {
  const [numbers, setNumbers] = useState<AdminContactNumber[]>([]);
  const [label, setLabel] = useState("Admin Creativemu");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activateNewNumber, setActivateNewNumber] = useState(true);
  const [editingId, setEditingId] = useState("");
  const [editingLabel, setEditingLabel] = useState("");
  const [editingPhoneNumber, setEditingPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const activeNumber = useMemo(
    () => numbers.find((number) => number.is_active) || null,
    [numbers],
  );

  const loadNumbers = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/admin/contact-numbers", {
        method: "GET",
        cache: "no-store",
      });
      const data: ContactNumbersResponse = await readJsonResponse(response);

      if (!response.ok || !data.success) {
        setNumbers([]);
        setErrorMessage(data.message || "Gagal mengambil nomor admin.");
        return;
      }

      setNumbers(data.numbers || []);
    } catch (error) {
      setNumbers([]);
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal mengambil nomor admin.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNumbers();
  }, [loadNumbers]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setFeedbackMessage("");
      setErrorMessage("");

      const response = await fetch("/api/admin/contact-numbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label,
          phone_number: phoneNumber,
          is_active: activateNewNumber || numbers.length === 0,
        }),
      });
      const data: ContactNumbersResponse = await readJsonResponse(response);

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Gagal menambah nomor admin.");
        return;
      }

      setPhoneNumber("");
      setLabel("Admin Creativemu");
      setActivateNewNumber(true);
      setFeedbackMessage(data.message || "Nomor admin berhasil ditambahkan.");
      await loadNumbers();
      notifyAdminContactNumberChanged();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal menambah nomor admin.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function startEdit(number: AdminContactNumber) {
    setEditingId(number.id);
    setEditingLabel(number.label);
    setEditingPhoneNumber(number.phone_number);
  }

  function cancelEdit() {
    setEditingId("");
    setEditingLabel("");
    setEditingPhoneNumber("");
  }

  async function updateNumber(id: string, payload: Record<string, unknown>) {
    try {
      setIsSaving(true);
      setFeedbackMessage("");
      setErrorMessage("");

      const response = await fetch("/api/admin/contact-numbers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...payload,
        }),
      });
      const data: ContactNumbersResponse = await readJsonResponse(response);

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Gagal mengubah nomor admin.");
        return;
      }

      setFeedbackMessage(data.message || "Nomor admin berhasil diperbarui.");
      cancelEdit();
      await loadNumbers();
      notifyAdminContactNumberChanged();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal mengubah nomor admin.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteNumber(id: string) {
    if (!window.confirm("Hapus nomor admin ini?")) return;

    try {
      setIsSaving(true);
      setFeedbackMessage("");
      setErrorMessage("");

      const response = await fetch(`/api/admin/contact-numbers?id=${id}`, {
        method: "DELETE",
      });
      const data: ContactNumbersResponse = await readJsonResponse(response);

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Gagal menghapus nomor admin.");
        return;
      }

      setFeedbackMessage(data.message || "Nomor admin berhasil dihapus.");
      await loadNumbers();
      notifyAdminContactNumberChanged();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal menghapus nomor admin.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <MobileShell>
      <AppHeader title="Nomor Admin" variant="admin" />

      <main className="min-h-[calc(100dvh-88px)] bg-[#f6f8ff] px-4 pb-24 pt-6 md:px-8 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          <section className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ecfff5] text-[#00a884] ring-1 ring-[#baf7dc]">
                <PhoneCall size={23} strokeWidth={2.7} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]">
                  Nomor Aktif
                </p>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  {activeNumber
                    ? formatPhoneNumber(activeNumber.phone_number)
                    : "Belum ada nomor aktif"}
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-black text-slate-700">Label</span>
                <input
                  value={label}
                  onChange={(event) => setLabel(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-800 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="Admin Creativemu"
                />
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-700">
                  Nomor WhatsApp
                </span>
                <input
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  inputMode="tel"
                  className="mt-2 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-800 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="081234567890"
                />
              </label>

              <label className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
                <span className="min-w-0">
                  <span className="block text-sm font-black text-slate-800">
                    Aktifkan ke header kanan atas
                  </span>
                  <span className="mt-1 block text-xs font-bold text-slate-500">
                    Nomor aktif dipakai tombol WhatsApp.
                  </span>
                </span>

                <input
                  type="checkbox"
                  checked={activateNewNumber || numbers.length === 0}
                  disabled={numbers.length === 0}
                  onChange={(event) =>
                    setActivateNewNumber(event.target.checked)
                  }
                  className="h-5 w-5 shrink-0 accent-emerald-600"
                />
              </label>

              <button
                type="submit"
                disabled={isSaving}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus size={18} strokeWidth={2.7} />
                )}
                Tambah Nomor
              </button>
            </form>
          </section>

          <section className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]">
                  Daftar Nomor
                </p>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Nomor Admin
                </h2>
              </div>

              {isLoading ? (
                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memuat
                </span>
              ) : null}
            </div>

            {errorMessage ? (
              <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 ring-1 ring-rose-100">
                {errorMessage}
              </div>
            ) : null}

            {feedbackMessage ? (
              <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
                {feedbackMessage}
              </div>
            ) : null}

            <div className="mt-5 space-y-3">
              {!isLoading && numbers.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-blue-200 bg-[#f8fbff] px-4 py-8 text-center text-sm font-bold text-slate-500">
                  Belum ada nomor admin.
                </div>
              ) : null}

              {numbers.map((number) => {
                const isEditing = editingId === number.id;

                return (
                  <div
                    key={number.id}
                    className={`rounded-2xl border p-4 transition ${
                      number.is_active
                        ? "border-emerald-200 bg-emerald-50/70"
                        : "border-blue-100 bg-[#f8fbff]"
                    }`}
                  >
                    {isEditing ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          value={editingLabel}
                          onChange={(event) =>
                            setEditingLabel(event.target.value)
                          }
                          className="rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-[#123c8c]"
                        />
                        <input
                          value={editingPhoneNumber}
                          onChange={(event) =>
                            setEditingPhoneNumber(event.target.value)
                          }
                          inputMode="tel"
                          className="rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-[#123c8c]"
                        />
                      </div>
                    ) : (
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#00a884] ring-1 ring-emerald-100">
                          <PhoneCall size={20} strokeWidth={2.7} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-base font-black text-slate-950">
                              {number.label}
                            </p>
                            {number.is_active ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-black text-white">
                                <CheckCircle2 size={13} strokeWidth={2.8} />
                                Aktif
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-bold text-slate-500">
                            {formatPhoneNumber(number.phone_number)}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() =>
                              updateNumber(number.id, {
                                label: editingLabel,
                                phone_number: editingPhoneNumber,
                              })
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-[#123c8c] px-3 py-2 text-xs font-black text-white transition active:scale-[0.97] disabled:opacity-60"
                          >
                            <Save size={15} strokeWidth={2.7} />
                            Simpan
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 transition active:scale-[0.97]"
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          {!number.is_active ? (
                            <button
                              type="button"
                              disabled={isSaving}
                              onClick={() =>
                                updateNumber(number.id, {
                                  is_active: true,
                                })
                              }
                              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white transition active:scale-[0.97] disabled:opacity-60"
                            >
                              <CheckCircle2 size={15} strokeWidth={2.7} />
                              Jadikan Aktif
                            </button>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => startEdit(number)}
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-black text-[#123c8c] ring-1 ring-blue-100 transition active:scale-[0.97]"
                          >
                            <Pencil size={15} strokeWidth={2.7} />
                            Edit
                          </button>

                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => deleteNumber(number.id)}
                            className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-xs font-black text-rose-600 ring-1 ring-rose-100 transition active:scale-[0.97] disabled:opacity-60"
                          >
                            <Trash2 size={15} strokeWidth={2.7} />
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </MobileShell>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  PhoneCall,
  Save,
  UserRound,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";
import {
  AppButton,
  AppFormReveal,
  AppPageTransition,
} from "@/components/ui/AppUI";

type AdminContact = {
  id: string;
  name: string;
  roleTitle?: string | null;
  role_title?: string | null;
  phone: string;
  whatsapp?: string | null;
  email?: string | null;
  note?: string | null;
  status: string;
};

type AdminContactForm = {
  name: string;
  roleTitle: string;
  phone: string;
  whatsapp: string;
  email: string;
  note: string;
};

const initialForm: AdminContactForm = {
  name: "",
  roleTitle: "",
  phone: "",
  whatsapp: "",
  email: "",
  note: "",
};

function normalizePhone(value: string) {
  return value.trim().replace(/[^\d+]/g, "");
}

function getWhatsappLink(phone: string) {
  const normalized = normalizePhone(phone).replace(/^\+/, "");

  return normalized ? `https://wa.me/${normalized}` : "";
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

export default function AdminContactsPage() {
  const [contactId, setContactId] = useState("");
  const [form, setForm] = useState<AdminContactForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const whatsappNumber = normalizePhone(form.whatsapp || form.phone);
  const whatsappLink = getWhatsappLink(whatsappNumber);

  async function loadAdminContact() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/admin/admin-contacts?primary=1", {
        cache: "no-store",
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal mengambil kontak admin.",
        );
      }

      const contact = data.adminContact as AdminContact | null;

      if (!contact) {
        setContactId("");
        setForm(initialForm);
        return;
      }

      setContactId(contact.id);
      setForm({
        name: contact.name || "",
        roleTitle: contact.roleTitle || contact.role_title || "",
        phone: contact.phone || "",
        whatsapp: contact.whatsapp || "",
        email: contact.email || "",
        note: contact.note || "",
      });
    } catch (error) {
      console.error("LOAD_ADMIN_CONTACT_ERROR:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil kontak admin.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAdminContact();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const roleTitle = form.roleTitle.trim();
    const phone = normalizePhone(form.phone);
    const whatsapp = normalizePhone(form.whatsapp || phone);
    const email = form.email.trim();
    const note = form.note.trim();

    if (!name) {
      alert("Nama admin wajib diisi.");
      return;
    }

    if (!phone) {
      alert("Nomor telepon kontak admin wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      const response = await fetch("/api/admin/admin-contacts", {
        method: contactId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: contactId || undefined,
          name,
          roleTitle,
          phone,
          whatsapp,
          email,
          note,
          status: "active",
        }),
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menyimpan kontak admin.",
        );
      }

      const savedContact = data.adminContact as AdminContact | undefined;

      if (savedContact?.id) {
        setContactId(savedContact.id);
      }

      setSuccessMessage("Kontak admin berhasil disimpan.");
      await loadAdminContact();
    } catch (error) {
      console.error("SAVE_ADMIN_CONTACT_ERROR:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan kontak admin.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MobileShell variant="admin">
      <AppHeader title="Kontak Admin" variant="admin" />

      <section className="mx-auto max-w-5xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16">
        <AppPageTransition>
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30">
            <div className="bg-[#123c8c] p-6 text-white md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-100">
                    Master Data Admin Panel
                  </p>
                  <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                    Kontak Admin
                  </h1>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
                  <PhoneCall size={24} strokeWidth={2.7} />
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage ? (
                  <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700">
                    {errorMessage}
                  </div>
                ) : null}

                {successMessage ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-black text-emerald-700">
                    <CheckCircle2 size={18} />
                    {successMessage}
                  </div>
                ) : null}

                {isLoading ? (
                  <div className="rounded-2xl border border-blue-100 bg-[#f6f8ff] px-5 py-10 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#123c8c]" />
                    <p className="mt-3 text-sm font-black text-slate-600">
                      Mengambil kontak admin...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <AppFormReveal>
                        <label className="mb-2 block text-sm font-black text-slate-700">
                          Nama Admin
                        </label>
                        <input
                          value={form.name}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              name: event.target.value,
                            }))
                          }
                          placeholder="Contoh: Admin HRD"
                          className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </AppFormReveal>

                      <AppFormReveal delay={45}>
                        <label className="mb-2 block text-sm font-black text-slate-700">
                          Jabatan / Role
                        </label>
                        <input
                          value={form.roleTitle}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              roleTitle: event.target.value,
                            }))
                          }
                          placeholder="Contoh: HR Admin"
                          className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </AppFormReveal>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <AppFormReveal delay={90}>
                        <label className="mb-2 block text-sm font-black text-slate-700">
                          Nomor Telepon
                        </label>
                        <input
                          value={form.phone}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              phone: event.target.value,
                              whatsapp: prev.whatsapp || event.target.value,
                            }))
                          }
                          placeholder="Contoh: 082123459565"
                          className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </AppFormReveal>

                      <AppFormReveal delay={135}>
                        <label className="mb-2 block text-sm font-black text-slate-700">
                          Nomor WhatsApp
                        </label>
                        <input
                          value={form.whatsapp}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              whatsapp: event.target.value,
                            }))
                          }
                          placeholder="Kosongkan jika sama dengan telepon"
                          className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </AppFormReveal>
                    </div>

                    <AppFormReveal delay={180}>
                      <label className="mb-2 block text-sm font-black text-slate-700">
                        Email
                      </label>
                      <input
                        value={form.email}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }))
                        }
                        placeholder="admin@creativemu.com"
                        className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </AppFormReveal>

                    <AppFormReveal delay={225}>
                      <label className="mb-2 block text-sm font-black text-slate-700">
                        Catatan
                      </label>
                      <textarea
                        value={form.note}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            note: event.target.value,
                          }))
                        }
                        placeholder="Contoh: Hubungi untuk kendala absensi dan izin."
                        className="min-h-28 w-full resize-none rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold leading-6 text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </AppFormReveal>

                    <AppFormReveal
                      delay={270}
                      className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end"
                    >
                      <AppButton
                        type="submit"
                        loading={isSubmitting}
                        loadingText="Menyimpan..."
                        pressAnimation
                        iconAnimation
                        leftIcon={<Save size={18} />}
                        className="h-12"
                      >
                        Simpan Kontak
                      </AppButton>
                    </AppFormReveal>
                  </>
                )}
              </form>

              <div className="app-form-reveal-enter rounded-3xl border border-blue-100 bg-[#f6f8ff] p-5 opacity-0 md:p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#123c8c]">
                  Preview Tombol Kontak
                </p>

                <div className="mt-5 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-blue-50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ecfff5] text-[#00a884] ring-1 ring-[#baf7dc]">
                      <PhoneCall size={24} strokeWidth={2.7} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-black text-slate-950">
                        {form.name || "Kontak Admin"}
                      </p>
                      <p className="mt-1 truncate text-sm font-bold text-slate-500">
                        {form.roleTitle || "Admin"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm font-bold">
                    <a
                      href={form.phone ? `tel:${normalizePhone(form.phone)}` : "#"}
                      className="flex items-center gap-3 rounded-2xl bg-[#f6f8ff] px-4 py-3 text-[#123c8c]"
                    >
                      <PhoneCall size={17} />
                      {normalizePhone(form.phone) || "-"}
                    </a>

                    <a
                      href={whatsappLink || "#"}
                      target={whatsappLink ? "_blank" : undefined}
                      rel={whatsappLink ? "noreferrer" : undefined}
                      className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-700"
                    >
                      <MessageCircle size={17} />
                      {whatsappNumber || "-"}
                    </a>

                    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-600 ring-1 ring-blue-50">
                      <Mail size={17} />
                      <span className="min-w-0 break-all">
                        {form.email || "-"}
                      </span>
                    </div>
                  </div>

                  {form.note ? (
                    <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-500">
                      {form.note}
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slate-500 ring-1 ring-blue-50">
                  <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-[#123c8c]" />
                  Kontak ini yang dipakai tombol telepon di bagian atas aplikasi.
                </div>
              </div>
            </div>
          </div>
        </AppPageTransition>
      </section>

      <BottomNav variant="admin" />
    </MobileShell>
  );
}

"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  CheckCircle2,
  ImageIcon,
  Loader2,
  RotateCcw,
  Save,
  Type,
  Upload,
} from "lucide-react";

import AppHeader from "@/components/AppHeader";
import MobileShell from "@/components/MobileShell";
import {
  AppFormReveal,
  AppLoadingState,
  AppPageTransition,
} from "@/components/ui/AppUI";
import {
  DEFAULT_SITE_LOGO_SRC,
  DEFAULT_SITE_TITLE,
} from "@/lib/site-logo-defaults";

type SiteLogoResponse = {
  success?: boolean;
  message?: string;
  logo?: {
    logoSrc?: string;
    fallbackLogoSrc?: string;
    siteTitle?: string;
    fallbackSiteTitle?: string;
  };
};

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

function notifySiteLogoChanged() {
  window.dispatchEvent(new Event("site-logo-changed"));
}

export default function AdminSiteLogoPage() {
  const [logoSrc, setLogoSrc] = useState(DEFAULT_SITE_LOGO_SRC);
  const [siteTitle, setSiteTitle] = useState(DEFAULT_SITE_TITLE);
  const [inputSiteTitle, setInputSiteTitle] = useState(DEFAULT_SITE_TITLE);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingLogo, setIsSavingLogo] = useState(false);
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const displayLogoSrc = previewSrc || logoSrc;
  const displaySiteTitle = inputSiteTitle || siteTitle || DEFAULT_SITE_TITLE;

  const loadLogoSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/admin/site-logo", {
        method: "GET",
        cache: "no-store",
      });
      const data = (await readJsonResponse(response)) as SiteLogoResponse;

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Gagal mengambil logo & nama aplikasi.");
        return;
      }

      const currentLogo = data.logo?.logoSrc || DEFAULT_SITE_LOGO_SRC;
      const currentTitle = data.logo?.siteTitle || DEFAULT_SITE_TITLE;

      setLogoSrc(currentLogo);
      setSiteTitle(currentTitle);
      setInputSiteTitle(currentTitle);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil pengaturan logo & nama aplikasi.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLogoSettings();
  }, [loadLogoSettings]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewSrc("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;

    setFeedbackMessage("");
    setErrorMessage("");
    setSelectedFile(file);
  }

  async function handleLogoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Pilih file logo terlebih dahulu.");
      return;
    }

    try {
      setIsSavingLogo(true);
      setFeedbackMessage("");
      setErrorMessage("");

      const formData = new FormData();
      formData.append("logo", selectedFile);

      const response = await fetch("/api/admin/site-logo", {
        method: "POST",
        body: formData,
      });
      const data = (await readJsonResponse(response)) as SiteLogoResponse;

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Gagal memperbarui logo aplikasi.");
        return;
      }

      setLogoSrc(data.logo?.logoSrc || DEFAULT_SITE_LOGO_SRC);
      setSelectedFile(null);
      setFeedbackMessage(data.message || "Logo aplikasi berhasil diperbarui.");
      notifySiteLogoChanged();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui logo aplikasi.",
      );
    } finally {
      setIsSavingLogo(false);
    }
  }

  async function handleResetLogo() {
    if (!window.confirm(`Kembalikan logo ke default ${DEFAULT_SITE_TITLE}?`)) return;

    try {
      setIsSavingLogo(true);
      setFeedbackMessage("");
      setErrorMessage("");

      const response = await fetch("/api/admin/site-logo?target=logo", {
        method: "DELETE",
      });
      const data = (await readJsonResponse(response)) as SiteLogoResponse;

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Gagal mengembalikan logo.");
        return;
      }

      setLogoSrc(data.logo?.logoSrc || DEFAULT_SITE_LOGO_SRC);
      setSelectedFile(null);
      setFeedbackMessage("Logo berhasil dikembalikan ke default.");
      notifySiteLogoChanged();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal mengembalikan logo.",
      );
    } finally {
      setIsSavingLogo(false);
    }
  }

  async function handleTitleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const titleValue = inputSiteTitle.trim();
    if (!titleValue) {
      setErrorMessage("Nama aplikasi tidak boleh kosong.");
      return;
    }

    try {
      setIsSavingTitle(true);
      setFeedbackMessage("");
      setErrorMessage("");

      const response = await fetch("/api/admin/site-logo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteTitle: titleValue }),
      });
      const data = (await readJsonResponse(response)) as SiteLogoResponse;

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Gagal memperbarui nama aplikasi.");
        return;
      }

      const updatedTitle = data.logo?.siteTitle || DEFAULT_SITE_TITLE;
      setSiteTitle(updatedTitle);
      setInputSiteTitle(updatedTitle);
      setFeedbackMessage(data.message || "Nama aplikasi berhasil diperbarui.");
      notifySiteLogoChanged();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui nama aplikasi.",
      );
    } finally {
      setIsSavingTitle(false);
    }
  }

  async function handleResetTitle() {
    if (!window.confirm(`Kembalikan nama aplikasi ke default '${DEFAULT_SITE_TITLE}'?`)) return;

    try {
      setIsSavingTitle(true);
      setFeedbackMessage("");
      setErrorMessage("");

      const response = await fetch("/api/admin/site-logo?target=title", {
        method: "DELETE",
      });
      const data = (await readJsonResponse(response)) as SiteLogoResponse;

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Gagal mengembalikan nama aplikasi.");
        return;
      }

      const updatedTitle = data.logo?.siteTitle || DEFAULT_SITE_TITLE;
      setSiteTitle(updatedTitle);
      setInputSiteTitle(updatedTitle);
      setFeedbackMessage(`Nama aplikasi berhasil dikembalikan ke '${DEFAULT_SITE_TITLE}'.`);
      notifySiteLogoChanged();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengembalikan nama aplikasi.",
      );
    } finally {
      setIsSavingTitle(false);
    }
  }

  return (
    <MobileShell variant="admin" withBottomPadding={false}>
      <AppHeader title="Logo & Brand Aplikasi" variant="admin" />

      <main className="min-h-[calc(100dvh-88px)] bg-[#f6f8ff] px-4 pb-12 pt-6 md:px-8 md:pb-16 lg:px-16">
        <AppPageTransition className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_1fr]">
          <AppFormReveal delay={60} className="space-y-5">
            {errorMessage ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 ring-1 ring-rose-100">
                {errorMessage}
              </div>
            ) : null}

            {feedbackMessage ? (
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
                <CheckCircle2 size={18} strokeWidth={2.7} />
                {feedbackMessage}
              </div>
            ) : null}

            {/* CARD 1: UPLOAD LOGO */}
            <section className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c] ring-1 ring-blue-100">
                  <ImageIcon size={23} strokeWidth={2.7} />
                </div>

                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-950">
                    Ganti Gambar Logo
                  </h2>
                </div>
              </div>

              <form onSubmit={handleLogoSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Upload File Logo
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleFileChange}
                    className="mt-2 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-800 file:mr-4 file:rounded-xl file:border-0 file:bg-[#123c8c] file:px-3 file:py-2 file:text-xs file:font-black file:text-white focus:border-[#123c8c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <p className="rounded-2xl bg-[#f8fbff] px-4 py-3 text-xs font-bold leading-5 text-slate-500 ring-1 ring-blue-100">
                  Format PNG, JPG, WEBP, atau SVG. (Max 2 MB)
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={isSavingLogo || !selectedFile}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSavingLogo ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload size={18} strokeWidth={2.7} />
                    )}
                    Simpan Logo
                  </button>

                  <button
                    type="button"
                    disabled={isSavingLogo}
                    onClick={handleResetLogo}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#123c8c] ring-1 ring-blue-100 transition hover:bg-[#eaf1ff] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RotateCcw size={18} strokeWidth={2.7} />
                    Reset Logo
                  </button>
                </div>
              </form>
            </section>

            {/* CARD 2: TULISAN / NAMA BRAND APLIKASI */}
            <section className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c] ring-1 ring-blue-100">
                  <Type size={23} strokeWidth={2.7} />
                </div>

                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-950">
                    Ganti Tulisan Brand
                  </h2>
                </div>
              </div>

              <form onSubmit={handleTitleSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Nama / Tulisan Brand Aplikasi
                  </span>
                  <input
                    type="text"
                    value={inputSiteTitle}
                    onChange={(e) => setInputSiteTitle(e.target.value)}
                    placeholder={`Contoh: ${DEFAULT_SITE_TITLE}`}
                    className="mt-2 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-[#123c8c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <p className="rounded-2xl bg-[#f8fbff] px-4 py-3 text-xs font-bold leading-5 text-slate-500 ring-1 ring-blue-100">
                  Mengubah teks nama brand.
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={isSavingTitle || !inputSiteTitle.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSavingTitle ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save size={18} strokeWidth={2.7} />
                    )}
                    Simpan Tulisan
                  </button>

                  <button
                    type="button"
                    disabled={isSavingTitle}
                    onClick={handleResetTitle}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#123c8c] ring-1 ring-blue-100 transition hover:bg-[#eaf1ff] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RotateCcw size={18} strokeWidth={2.7} />
                    Reset Tulisan
                  </button>
                </div>
              </form>
            </section>
          </AppFormReveal>

          {/* PREVIEW RIGHT COLUMN */}
          <AppFormReveal delay={140} className="h-full">
            <section className="h-full rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/50">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]">
                    Preview Tampilan
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div className="mt-6">
                  <AppLoadingState text="Memuat logo & nama aplikasi..." />
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {/* PREVIEW SIDEBAR BADGE */}
                  <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      Header / Sidebar Brand
                    </p>
                    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-blue-100 bg-white p-3 shadow-md shadow-slate-200/70">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-blue-100">
                        <img
                          src={displayLogoSrc}
                          alt="Preview logo"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#123c8c]">
                          {displaySiteTitle}
                        </p>
                        <p className="text-sm font-black text-slate-900">
                          Panel Admin
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      Logo Panjang
                    </p>
                    <div className="mt-3 flex h-24 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-300 bg-white px-6 py-3 shadow-lg shadow-slate-200/70">
                      <img
                        src={displayLogoSrc}
                        alt="Preview logo panjang"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                        Logo Kotak
                      </p>
                      <div className="mt-3 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 shadow-lg shadow-slate-200/70 ring-1 ring-blue-100">
                        <img
                          src={displayLogoSrc}
                          alt="Preview logo kotak"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="relative min-h-44 overflow-hidden rounded-2xl border border-[#123c8c]/20 bg-[#123c8c] p-5 text-white">
                      <img
                        src={displayLogoSrc}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-4 right-4 h-32 w-32 object-contain opacity-[0.08]"
                      />
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                        {displaySiteTitle}
                      </p>
                      <h3 className="mt-2 max-w-56 text-2xl font-black leading-tight">
                        Contoh Kartu Identitas
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </AppFormReveal>
        </AppPageTransition>
      </main>
    </MobileShell>
  );
}

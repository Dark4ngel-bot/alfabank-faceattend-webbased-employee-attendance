"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Edit,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";

type Office = {
  id: string;
  name: string;
  address?: string | null;
  status?: string;
};

type Department = {
  id: string;
  name: string;
  office_id: string | null;
  status: string;
  office?: Office | null;
};

type Jabatan = {
  id: string;
  name: string;
  department_id: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
  department?: Department | null;
  _count?: {
    users: number;
    positions: number;
  };
};

type JabatanForm = {
  name: string;
  status: string;
};

type JabatanAlert = {
  title: string;
  message: string;
  type: "success" | "error" | "warning";
};

const initialForm: JabatanForm = {
  name: "",
  status: "active",
};

const statusOptions = [
  {
    value: "all",
    label: "Semua Status",
  },
  {
    value: "active",
    label: "Status Aktif",
  },
  {
    value: "inactive",
    label: "Status Nonaktif",
  },
];

function formatStatus(status: string) {
  if (status === "active") return "Aktif";
  if (status === "inactive") return "Nonaktif";

  return status;
}

function normalizeJabatanName(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function getJabatanAlertTheme(type: JabatanAlert["type"]) {
  if (type === "success") {
    return {
      shell: "from-emerald-50 via-white to-red-50",
      iconWrap: "bg-emerald-100 text-emerald-600",
      badge: "bg-white/70 text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20",
      icon: CheckCircle2,
      label: "BERHASIL",
    };
  }

  if (type === "error") {
    return {
      shell: "from-red-50 via-white to-red-50",
      iconWrap: "bg-red-100 text-red-600",
      badge: "bg-white/70 text-red-600",
      button: "bg-red-600 hover:bg-red-700 shadow-red-900/20",
      icon: AlertTriangle,
      label: "GAGAL",
    };
  }

  return {
    shell: "from-orange-50 via-white to-red-50",
    iconWrap: "bg-orange-100 text-orange-600",
    badge: "bg-white/70 text-orange-600",
    button: "bg-[#526fae] hover:bg-[#46629d] shadow-red-950/20",
    icon: AlertTriangle,
    label: "PERHATIAN",
  };
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

function JabatanMotionStyles() {
  return (
    <style>{`
      @keyframes jabatanEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes jabatanRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes jabatanModalBackdrop {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes jabatanModalPanel {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .jabatan-enter {
        animation: jabatanEnter 320ms ease-out both;
      }

      .jabatan-row-enter {
        opacity: 0;
        animation: jabatanRowEnter 300ms ease-out both;
      }

      .jabatan-modal-backdrop {
        animation: jabatanModalBackdrop 180ms ease-out both;
      }

      .jabatan-modal-panel {
        animation: jabatanModalPanel 260ms ease-out both;
        transform-origin: center bottom;
      }

      @keyframes jabatanToastEnter {
        0% {
          opacity: 0;
          transform: translateX(18px) scale(0.98);
        }

        100% {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      .jabatan-toast-enter {
        animation: jabatanToastEnter 260ms ease-out both;
      }

      .jabatan-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .jabatan-enter,
        .jabatan-row-enter,
        .jabatan-modal-backdrop,
        .jabatan-modal-panel,
        .jabatan-toast-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

export default function JabatansPage() {
  const [jabatans, setJabatans] = useState<Jabatan[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState<JabatanForm>(initialForm);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJabatan, setEditingJabatan] = useState<Jabatan | null>(null);
  const [jabatanAlert, setJabatanAlert] = useState<JabatanAlert | null>(null);
  const [isAlertClosing, setIsAlertClosing] = useState(false);
  const alertCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const filteredJabatans = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return jabatans.filter((jabatan) => {
      const jabatanName = jabatan.name.toLowerCase();
      const jabatanStatus = jabatan.status.toLowerCase();

      if (keyword && !jabatanName.includes(keyword)) {
        return false;
      }

      if (statusFilter !== "all" && jabatanStatus !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [jabatans, search, statusFilter]);

  const jabatanAlertTheme = jabatanAlert
    ? getJabatanAlertTheme(jabatanAlert.type)
    : null;
  const JabatanAlertIcon = jabatanAlertTheme?.icon || AlertTriangle;

  const showJabatanAlert = useCallback(
    (title: string, message: string, type: JabatanAlert["type"]) => {
      if (alertCloseTimeoutRef.current) {
        clearTimeout(alertCloseTimeoutRef.current);
      }

      setIsAlertClosing(false);
      setJabatanAlert({
        title,
        message,
        type,
      });

      alertCloseTimeoutRef.current = setTimeout(() => {
        setIsAlertClosing(true);

        alertCloseTimeoutRef.current = setTimeout(() => {
          setJabatanAlert(null);
          setIsAlertClosing(false);
        }, 260);
      }, 3600);
    },
    [],
  );

  const closeJabatanAlert = useCallback(() => {
    if (alertCloseTimeoutRef.current) {
      clearTimeout(alertCloseTimeoutRef.current);
    }

    setIsAlertClosing(true);

    alertCloseTimeoutRef.current = setTimeout(() => {
      setJabatanAlert(null);
      setIsAlertClosing(false);
    }, 260);
  }, []);

  async function loadJabatans() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const params = new URLSearchParams({
        search,
        status: statusFilter,
      });

      const response = await fetch(`/api/admin/jabatans?${params.toString()}`, {
        cache: "no-store",
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal mengambil jabatan.",
        );
      }

      setJabatans(data.jabatans || data.data || []);
    } catch (error) {
      console.error("LOAD_UNITS_ERROR:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data jabatan.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadJabatans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (alertCloseTimeoutRef.current) {
        clearTimeout(alertCloseTimeoutRef.current);
      }
    };
  }, []);

  function openCreateModal() {
    setEditingJabatan(null);
    setForm(initialForm);
    setIsModalOpen(true);
  }

  function openEditModal(jabatan: Jabatan) {
    setEditingJabatan(jabatan);
    setForm({
      name: jabatan.name,
      status: jabatan.status || "active",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingJabatan(null);
    setForm(initialForm);
    setIsModalOpen(false);
  }

  function resetFilter() {
    setSearch("");
    setStatusFilter("all");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      showJabatanAlert(
        "Data belum lengkap",
        "Nama jabatan wajib diisi.",
        "warning",
      );
      return;
    }

    if (!["active", "inactive"].includes(form.status)) {
      showJabatanAlert(
        "Status tidak valid",
        "Status jabatan tidak valid.",
        "warning",
      );
      return;
    }

    const duplicateJabatan = jabatans.find((jabatan) => {
      if (editingJabatan?.id === jabatan.id) return false;

      return normalizeJabatanName(jabatan.name) === normalizeJabatanName(name);
    });

    if (duplicateJabatan) {
      showJabatanAlert(
        "Nama jabatan sudah ada",
        "Gunakan nama jabatan lain karena nama ini sudah terdaftar.",
        "warning",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/jabatans", {
        method: editingJabatan ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingJabatan?.id,
          name,
          status: form.status,
        }),
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menyimpan jabatan.",
        );
      }

      await loadJabatans();
      closeModal();
      showJabatanAlert(
        "Jabatan tersimpan",
        data.message || "Data jabatan berhasil disimpan.",
        "success",
      );
    } catch (error) {
      console.error("SAVE_UNIT_ERROR:", error);

      const message =
        error instanceof Error ? error.message : "Gagal menyimpan jabatan.";

      showJabatanAlert(
        message.toLowerCase().includes("sudah ada")
          ? "Nama jabatan sudah ada"
          : "Gagal menyimpan jabatan",
        message,
        message.toLowerCase().includes("sudah ada") ? "warning" : "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteJabatan(jabatan: Jabatan) {
    const totalUsers = jabatan._count?.users || 0;
    const totalPositions = jabatan._count?.positions || 0;

    if (totalUsers > 0 || totalPositions > 0) {
      showJabatanAlert(
        "Jabatan masih digunakan",
        "Jabatan ini masih memiliki posisi atau digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
        "warning",
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Yakin ingin menghapus jabatan "${jabatan.name}"? Data yang dihapus tidak bisa dikembalikan.`,
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const response = await fetch(`/api/admin/jabatans?id=${jabatan.id}`, {
        method: "DELETE",
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menghapus jabatan.",
        );
      }

      showJabatanAlert(
        "Jabatan dihapus",
        "Jabatan berhasil dihapus.",
        "success",
      );
      await loadJabatans();
    } catch (error) {
      console.error("DELETE_UNIT_ERROR:", error);

      showJabatanAlert(
        "Gagal menghapus jabatan",
        error instanceof Error ? error.message : "Gagal menghapus jabatan.",
        "error",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <MobileShell variant="admin">
      <JabatanMotionStyles />

      <AppHeader title="Daftar Jabatan" variant="admin" />

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16">
        <div className="jabatan-enter overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30">
          <div className="bg-[#b91c1c] p-6 text-white md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                  Daftar Jabatan
                </h1>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-950/20 transition duration-200 hover:bg-emerald-700 active:scale-[0.98]"
              >
                <Plus size={18} />
                Tambah Jabatan
              </button>
            </div>
          </div>

          <div className="p-5 md:p-8">
            <div
              className="jabatan-row-enter grid gap-3 md:grid-cols-[1fr_210px_auto]"
              style={{ animationDelay: "80ms" }}
            >
              <div>
                <label className="text-sm font-black text-slate-500">
                  Nama Jabatan
                </label>

                <div className="relative mt-3">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Cari jabatan..."
                    className="jabatan-field w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-black text-slate-500">
                  Filter Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="jabatan-field mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-100"
                >
                  {statusOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={resetFilter}
                  className="flex h-[54px] flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:bg-slate-100 active:scale-[0.96] md:flex-none"
                >
                  Atur Ulang
                </button>
              </div>
            </div>

            {errorMessage ? (
              <div className="jabatan-row-enter mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <div
              className="jabatan-row-enter mt-8 overflow-hidden rounded-2xl border border-slate-200"
              style={{ animationDelay: "130ms" }}
            >
              <div className="hidden grid-cols-[0.3fr_1.6fr_0.75fr_0.75fr_1fr] bg-slate-100/70 px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-slate-800 md:grid">
                <p>#</p>
                <p>Jabatan</p>
                <p>Posisi</p>
                <p>Status</p>
                <p className="text-center">Aksi</p>
              </div>

              <div className="divide-y divide-slate-100 bg-white">
                {isLoading ? (
                  <div className="jabatan-row-enter px-5 py-10 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#b91c1c]" />
                    <p className="mt-3 text-sm font-black text-slate-600">
                      Mengambil data jabatan...
                    </p>
                  </div>
                ) : filteredJabatans.length === 0 ? (
                  <div className="jabatan-row-enter px-5 py-10 text-center">
                    <Building2 className="mx-auto text-slate-300" size={36} />
                    <p className="mt-3 font-black text-slate-700">
                      Data jabatan tidak ditemukan.
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Tambahkan jabatan baru atau ubah filter pencarian.
                    </p>
                  </div>
                ) : (
                  filteredJabatans.map((jabatan, index) => (
                    <div
                      key={jabatan.id}
                      className="jabatan-row-enter grid gap-4 px-4 py-4 text-sm transition duration-200 hover:bg-slate-50/80 md:grid-cols-[0.3fr_1.6fr_0.75fr_0.75fr_1fr] md:items-center md:px-5 md:py-6"
                      style={{
                        animationDelay: `${index * 55}ms`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 md:block">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xs font-black text-slate-700 md:h-auto md:w-auto md:bg-transparent md:text-sm md:text-slate-500">
                            {index + 1}
                          </div>

                          <div className="md:hidden">
                            <p className="font-black uppercase text-slate-950">
                              {jabatan.name}
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-400">
                              {jabatan._count?.positions || 0} posisi
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black md:hidden ${
                            jabatan.status === "active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {formatStatus(jabatan.status)}
                        </span>
                      </div>

                      <div className="hidden md:block">
                        <p className="font-black uppercase text-slate-950">
                          {jabatan.name}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {jabatan._count?.users || 0} karyawan
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 md:border-0 md:bg-transparent md:p-0">
                        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden">
                          Posisi
                        </p>

                        <p className="mt-1 font-black text-slate-600 md:mt-0">
                          {jabatan._count?.positions || 0}
                        </p>
                      </div>

                      <div className="hidden md:block">
                        <span
                          className={`w-fit rounded-full px-4 py-2 text-xs font-black ${
                            jabatan.status === "active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {formatStatus(jabatan.status)}
                        </span>
                      </div>

                      <div className="grid gap-2 md:flex md:justify-center">
                        <button
                          type="button"
                          onClick={() => openEditModal(jabatan)}
                          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-slate-200 md:bg-white md:px-4 md:py-2 md:text-xs md:text-slate-800 md:shadow-none md:hover:bg-slate-100"
                        >
                          <Edit size={16} className="md:h-3.5 md:w-3.5" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteJabatan(jabatan)}
                          disabled={
                            isDeleting ||
                            (jabatan._count?.users || 0) > 0 ||
                            (jabatan._count?.positions || 0) > 0
                          }
                          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-black text-red-600 transition hover:bg-red-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 md:h-auto md:w-fit md:rounded-xl md:px-4 md:py-2 md:text-xs"
                        >
                          {isDeleting ? (
                            <Loader2
                              size={16}
                              className="animate-spin md:h-3.5 md:w-3.5"
                            />
                          ) : (
                            <Trash2 size={16} className="md:h-3.5 md:w-3.5" />
                          )}
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <div className="jabatan-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 md:items-center md:pb-0">
          <div className="jabatan-modal-panel max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b91c1c]">
                  {editingJabatan ? "Edit Jabatan" : "Tambah Jabatan"}
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  {editingJabatan ? "Update Data Jabatan" : "Jabatan Baru"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Isi nama jabatan sebagai label yang bisa dipakai bebas.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-[0.96]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div
                className="jabatan-row-enter"
                style={{ animationDelay: "40ms" }}
              >
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Nama Jabatan
                </label>

                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Contoh: Kembaliend Development, Mobile Development, Accounting"
                  className="jabatan-field w-full rounded-2xl border border-red-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#b91c1c] focus:bg-white focus:ring-4 focus:ring-red-100"
                />
              </div>

              <div
                className="jabatan-row-enter"
                style={{ animationDelay: "80ms" }}
              >
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Status Jabatan
                </label>

                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      status: event.target.value,
                    }))
                  }
                  className="jabatan-field w-full rounded-2xl border border-red-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#b91c1c] focus:bg-white focus:ring-4 focus:ring-red-100"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>

              <div
                className="jabatan-row-enter flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end"
                style={{ animationDelay: "160ms" }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.98]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : editingJabatan
                      ? "Update Jabatan"
                      : "Tambah Jabatan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {jabatanAlert && jabatanAlertTheme ? (
        <div
          className={`jabatan-toast-enter fixed right-4 top-4 z-[140] w-[calc(100vw-2rem)] max-w-md transition-all duration-300 ease-out md:right-7 md:top-7 ${
            isAlertClosing
              ? "translate-x-8 scale-95 opacity-0"
              : "translate-x-0 scale-100 opacity-100"
          }`}
        >
          <div
            className={`overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br ${jabatanAlertTheme.shell} shadow-2xl shadow-slate-900/20 backdrop-blur-xl transition-all duration-300 ease-out ${
              isAlertClosing
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="relative p-5">
              <div className="relative flex items-start gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] ${jabatanAlertTheme.iconWrap} shadow-lg shadow-slate-300/40`}
                >
                  <JabatanAlertIcon size={32} strokeWidth={3} />
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  <div
                    className={`inline-flex rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] ${jabatanAlertTheme.badge}`}
                  >
                    {jabatanAlertTheme.label}
                  </div>

                  <h3 className="mt-3 text-2xl font-black leading-tight text-slate-950">
                    {jabatanAlert.title}
                  </h3>

                  <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                    {jabatanAlert.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeJabatanAlert}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-800 active:scale-[0.96]"
                  aria-label="Tutup alert"
                >
                  <X size={22} strokeWidth={2.8} />
                </button>
              </div>
            </div>

            <div className="border-t border-white/60 bg-white/70 p-4">
              <button
                type="button"
                onClick={closeJabatanAlert}
                className={`w-full rounded-2xl px-6 py-3.5 text-sm font-black text-white shadow-lg transition active:scale-[0.98] ${jabatanAlertTheme.button}`}
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <BottomNav variant="admin" />
    </MobileShell>
  );
}

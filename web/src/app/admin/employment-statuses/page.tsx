"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
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
import {
  AppButton,
  AppFormReveal,
  AppIconButton,
  AppModalMotion,
  AppModalPanel,
  AppPageTransition,
} from "@/components/ui/AppUI";

type EmploymentStatus = {
  id: string;
  name: string;
  code: string;
  status: string;
  _count?: {
    users: number;
  };
};

type EmploymentStatusForm = {
  name: string;
  code: string;
  status: string;
};

const initialForm: EmploymentStatusForm = {
  name: "",
  code: "",
  status: "active",
};

const statusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "active", label: "Status Aktif" },
  { value: "inactive", label: "Status Nonaktif" },
];

function formatStatus(status: string) {
  if (status === "active") return "Aktif";
  if (status === "inactive") return "Nonaktif";

  return status;
}

function statusClass(status: string) {
  return status === "active"
    ? "bg-blue-50 text-[#123c8c]"
    : "bg-slate-100 text-slate-600";
}

function toCode(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

export default function EmploymentStatusesPage() {
  const [employmentStatuses, setEmploymentStatuses] = useState<
    EmploymentStatus[]
  >([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState<EmploymentStatusForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<EmploymentStatus | null>(
    null,
  );

  const filteredEmploymentStatuses = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return employmentStatuses.filter((item) => {
      const matchesSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.code.toLowerCase().includes(keyword);
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [employmentStatuses, search, statusFilter]);

  async function loadEmploymentStatuses() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const params = new URLSearchParams({
        search,
        status: statusFilter,
      });

      const response = await fetch(
        `/api/admin/employment-statuses?${params.toString()}`,
        {
          cache: "no-store",
        },
      );
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal mengambil status kepegawaian.",
        );
      }

      setEmploymentStatuses(data.employmentStatuses || data.data || []);
    } catch (error) {
      console.error("LOAD_EMPLOYMENT_STATUSES_ERROR:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil status kepegawaian.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadEmploymentStatuses();
    }, 0);

    return () => window.clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreateModal() {
    setEditingStatus(null);
    setForm(initialForm);
    setIsModalOpen(true);
  }

  function openEditModal(status: EmploymentStatus) {
    setEditingStatus(status);
    setForm({
      name: status.name,
      code: status.code,
      status: status.status || "active",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingStatus(null);
    setForm(initialForm);
    setIsModalOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const code = toCode(form.code || name);

    if (!name) {
      alert("Nama status kepegawaian wajib diisi.");
      return;
    }

    if (!code) {
      alert("Kode status kepegawaian tidak valid.");
      return;
    }

    if (!["active", "inactive"].includes(form.status)) {
      alert("Status tidak valid.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/employment-statuses", {
        method: editingStatus ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingStatus?.id,
          name,
          code,
          status: form.status,
        }),
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menyimpan status kepegawaian.",
        );
      }

      await loadEmploymentStatuses();
      closeModal();
    } catch (error) {
      console.error("SAVE_EMPLOYMENT_STATUS_ERROR:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan status kepegawaian.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteStatus(status: EmploymentStatus) {
    if ((status._count?.users || 0) > 0) {
      alert(
        "Status kepegawaian ini masih digunakan karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Yakin ingin menghapus status "${status.name}"? Data yang dihapus tidak bisa dikembalikan.`,
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const response = await fetch(
        `/api/admin/employment-statuses?id=${status.id}`,
        {
          method: "DELETE",
        },
      );
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menghapus status kepegawaian.",
        );
      }

      alert("Status kepegawaian berhasil dihapus.");
      await loadEmploymentStatuses();
    } catch (error) {
      console.error("DELETE_EMPLOYMENT_STATUS_ERROR:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menghapus status kepegawaian.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <MobileShell variant="admin">
      <AppHeader title="Status Kepegawaian" variant="admin" />

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16">
        <AppPageTransition>
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30">
            <div className="bg-[#123c8c] p-6 text-white md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-100">
                    Master Data Admin Panel
                  </p>
                  <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                    Status Kepegawaian
                  </h1>
                </div>

                <AppButton
                  type="button"
                  onClick={openCreateModal}
                  variant="secondary"
                  pressAnimation
                  iconAnimation
                  leftIcon={<Plus size={18} />}
                  className="h-12 bg-white shadow-lg shadow-blue-950/20"
                >
                  Tambah Status
                </AppButton>
              </div>
            </div>

            <div className="p-5 md:p-8">
              <div className="grid gap-3 md:grid-cols-[1fr_210px_auto]">
                <div>
                  <label className="text-sm font-black text-slate-500">
                    Nama Status
                  </label>
                  <div className="relative mt-3">
                    <Search
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Cari status kepegawaian..."
                      className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] py-4 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                    className="mt-3 w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    {statusOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <AppButton
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("all");
                    }}
                    variant="secondary"
                    pressAnimation
                    className="h-[54px] w-full md:w-auto"
                  >
                    Reset
                  </AppButton>
                </div>
              </div>

              {errorMessage ? (
                <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100">
                <div className="hidden grid-cols-[0.3fr_1.5fr_0.9fr_0.7fr_0.75fr_1fr] bg-[#f6f8ff] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#123c8c] md:grid">
                  <p>#</p>
                  <p>Status Kepegawaian</p>
                  <p>Kode</p>
                  <p>Karyawan</p>
                  <p>Status</p>
                  <p className="text-center">Aksi</p>
                </div>

                <div className="divide-y divide-blue-50 bg-white">
                  {isLoading ? (
                    <div className="px-5 py-10 text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#123c8c]" />
                      <p className="mt-3 text-sm font-black text-slate-600">
                        Mengambil status kepegawaian...
                      </p>
                    </div>
                  ) : filteredEmploymentStatuses.length === 0 ? (
                    <div className="px-5 py-10 text-center">
                      <BadgeCheck
                        className="mx-auto text-slate-300"
                        size={36}
                      />
                      <p className="mt-3 font-black text-slate-700">
                        Status kepegawaian tidak ditemukan.
                      </p>
                    </div>
                  ) : (
                    filteredEmploymentStatuses.map((item, index) => (
                      <div
                        key={item.id}
                        className="app-form-reveal-enter grid gap-4 px-4 py-4 text-sm opacity-0 transition duration-200 hover:-translate-y-0.5 hover:bg-[#f8fbff] hover:shadow-lg hover:shadow-slate-200/50 md:grid-cols-[0.3fr_1.5fr_0.9fr_0.7fr_0.75fr_1fr] md:items-center md:px-5 md:py-6"
                        style={{
                          animationDelay: `${index * 45}ms`,
                        }}
                      >
                        <p className="font-black text-slate-500">{index + 1}</p>
                        <div>
                          <p className="font-black uppercase text-slate-950">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-400 md:hidden">
                            {item._count?.users || 0} karyawan
                          </p>
                        </div>
                        <p className="font-black text-slate-500">{item.code}</p>
                        <p className="font-black text-slate-600">
                          {item._count?.users || 0}
                        </p>
                        <div>
                          <span
                            className={`w-fit rounded-full px-4 py-2 text-xs font-black ${statusClass(
                              item.status,
                            )}`}
                          >
                            {formatStatus(item.status)}
                          </span>
                        </div>
                        <div className="grid gap-2 md:flex md:justify-center">
                          <AppButton
                            type="button"
                            onClick={() => openEditModal(item)}
                            variant="primary"
                            size="sm"
                            pressAnimation
                            iconAnimation
                            leftIcon={
                              <Edit size={16} className="md:h-3.5 md:w-3.5" />
                            }
                            className="h-12 rounded-2xl px-4 text-sm md:h-auto md:w-fit md:rounded-xl md:border md:border-blue-100 md:bg-white md:py-2 md:text-xs md:text-[#123c8c] md:shadow-none md:hover:bg-[#eaf1ff]"
                          >
                            Edit
                          </AppButton>
                          <AppButton
                            type="button"
                            onClick={() => handleDeleteStatus(item)}
                            disabled={
                              isDeleting || (item._count?.users || 0) > 0
                            }
                            variant="danger"
                            size="sm"
                            pressAnimation
                            iconAnimation
                            leftIcon={
                              isDeleting ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )
                            }
                            className="h-12 rounded-2xl px-4 text-sm md:h-auto md:w-fit md:rounded-xl md:py-2 md:text-xs"
                          >
                            Hapus
                          </AppButton>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </AppPageTransition>
      </section>

      {isModalOpen ? (
        <AppModalMotion className="backdrop-blur-none">
          <AppModalPanel className="max-w-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]">
                  {editingStatus ? "Edit Status" : "Tambah Status"}
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  {editingStatus
                    ? "Update Status Kepegawaian"
                    : "Status Kepegawaian Baru"}
                </h2>
              </div>
              <AppIconButton
                type="button"
                onClick={closeModal}
                variant="ghost"
                className="h-10 w-10 bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </AppIconButton>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <AppFormReveal>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Nama Status
                </label>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      name: event.target.value,
                      code: editingStatus
                        ? prev.code
                        : toCode(event.target.value),
                    }))
                  }
                  placeholder="Contoh: Tetap, Kontrak, Magang, Freelance"
                  className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </AppFormReveal>

              <AppFormReveal delay={45}>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Kode Status
                </label>
                <input
                  value={form.code}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      code: toCode(event.target.value),
                    }))
                  }
                  placeholder="contoh: tetap, kontrak, magang"
                  className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </AppFormReveal>

              <AppFormReveal delay={90}>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, status: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </AppFormReveal>

              <AppFormReveal
                delay={135}
                className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end"
              >
                <AppButton
                  type="button"
                  onClick={closeModal}
                  variant="ghost"
                  pressAnimation
                  className="bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </AppButton>
                <AppButton
                  type="submit"
                  loading={isSubmitting}
                  loadingText="Menyimpan..."
                  pressAnimation
                >
                  {editingStatus ? "Update Status" : "Tambah Status"}
                </AppButton>
              </AppFormReveal>
            </form>
          </AppModalPanel>
        </AppModalMotion>
      ) : null}

      <BottomNav variant="admin" />
    </MobileShell>
  );
}

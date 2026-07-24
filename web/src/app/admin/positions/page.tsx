"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
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

type Position = {
  id: string;
  name: string;
  status: string;
  _count?: {
    users: number;
  };
};

type PositionForm = {
  name: string;
  status: string;
};

const initialForm: PositionForm = {
  name: "",
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

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

export default function AdminPositionsPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState<PositionForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);

  const filteredPositions = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return positions.filter((position) => {
      const matchesSearch =
        !keyword || position.name.toLowerCase().includes(keyword);
      const matchesStatus =
        statusFilter === "all" || position.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [positions, search, statusFilter]);

  async function loadPositions() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const params = new URLSearchParams({
        search,
        status: statusFilter,
      });

      const response = await fetch(`/api/admin/positions?${params.toString()}`, {
        cache: "no-store",
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Gagal mengambil jabatan.");
      }

      setPositions(data.positions || data.data || []);
    } catch (error) {
      console.error("LOAD_POSITIONS_ERROR:", error);
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
    void loadPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreateModal() {
    setEditingPosition(null);
    setForm(initialForm);
    setIsModalOpen(true);
  }

  function openEditModal(position: Position) {
    setEditingPosition(position);
    setForm({
      name: position.name,
      status: position.status || "active",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingPosition(null);
    setForm(initialForm);
    setIsModalOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      alert("Nama jabatan wajib diisi.");
      return;
    }

    if (!["active", "inactive"].includes(form.status)) {
      alert("Status jabatan tidak valid.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/positions", {
        method: editingPosition ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPosition?.id,
          name,
          status: form.status,
        }),
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Gagal menyimpan jabatan.");
      }

      await loadPositions();
      closeModal();
    } catch (error) {
      console.error("SAVE_POSITION_ERROR:", error);
      alert(error instanceof Error ? error.message : "Gagal menyimpan jabatan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeletePosition(position: Position) {
    if ((position._count?.users || 0) > 0) {
      alert(
        "Jabatan ini masih digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Yakin ingin menghapus jabatan "${position.name}"? Data yang dihapus tidak bisa dikembalikan.`,
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const response = await fetch(`/api/admin/positions?id=${position.id}`, {
        method: "DELETE",
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Gagal menghapus jabatan.");
      }

      alert("Jabatan berhasil dihapus.");
      await loadPositions();
    } catch (error) {
      console.error("DELETE_POSITION_ERROR:", error);
      alert(error instanceof Error ? error.message : "Gagal menghapus jabatan.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <MobileShell variant="admin">
      <AppHeader title="Daftar Jabatan" variant="admin" />

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30">
          <div className="bg-[#123c8c] p-6 text-white md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                Daftar Jabatan
              </h1>
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#123c8c] shadow-lg shadow-blue-950/20 transition hover:bg-blue-50 active:scale-[0.98]"
              >
                <Plus size={18} />
                Tambah Jabatan
              </button>
            </div>
          </div>

          <div className="p-5 md:p-8">
            <div className="grid gap-3 md:grid-cols-[1fr_210px_auto]">
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
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                  className="flex h-[54px] w-full items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-[#123c8c] shadow-sm transition hover:bg-blue-50 active:scale-[0.96] md:w-auto"
                >
                  Reset
                </button>
              </div>
            </div>

            {errorMessage ? (
              <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100">
              <div className="hidden grid-cols-[0.3fr_1.6fr_0.75fr_0.75fr_1fr] bg-[#f6f8ff] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#123c8c] md:grid">
                <p>#</p>
                <p>Jabatan</p>
                <p>Karyawan</p>
                <p>Status</p>
                <p className="text-center">Aksi</p>
              </div>

              <div className="divide-y divide-blue-50 bg-white">
                {isLoading ? (
                  <div className="px-5 py-10 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#123c8c]" />
                    <p className="mt-3 text-sm font-black text-slate-600">
                      Mengambil data jabatan...
                    </p>
                  </div>
                ) : filteredPositions.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <BriefcaseBusiness
                      className="mx-auto text-slate-300"
                      size={36}
                    />
                    <p className="mt-3 font-black text-slate-700">
                      Data jabatan tidak ditemukan.
                    </p>
                  </div>
                ) : (
                  filteredPositions.map((position, index) => (
                    <div
                      key={position.id}
                      className="grid gap-4 px-4 py-4 text-sm transition hover:bg-[#f8fbff] md:grid-cols-[0.3fr_1.6fr_0.75fr_0.75fr_1fr] md:items-center md:px-5 md:py-6"
                    >
                      <p className="font-black text-slate-500">{index + 1}</p>
                      <div>
                        <p className="font-black uppercase text-slate-950">
                          {position.name}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-400 md:hidden">
                          {position._count?.users || 0} karyawan
                        </p>
                      </div>
                      <p className="font-black text-slate-600">
                        {position._count?.users || 0}
                      </p>
                      <div>
                        <span
                          className={`w-fit rounded-full px-4 py-2 text-xs font-black ${statusClass(
                            position.status,
                          )}`}
                        >
                          {formatStatus(position.status)}
                        </span>
                      </div>
                      <div className="grid gap-2 md:flex md:justify-center">
                        <button
                          type="button"
                          onClick={() => openEditModal(position)}
                          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 text-sm font-black text-white transition hover:bg-[#0f3274] active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-blue-100 md:bg-white md:py-2 md:text-xs md:text-[#123c8c] md:hover:bg-[#eaf1ff]"
                        >
                          <Edit size={16} className="md:h-3.5 md:w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePosition(position)}
                          disabled={isDeleting || (position._count?.users || 0) > 0}
                          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-black text-red-600 transition hover:bg-red-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 md:h-auto md:w-fit md:rounded-xl md:py-2 md:text-xs"
                        >
                          {isDeleting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
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
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 backdrop-blur-sm md:items-center md:pb-0">
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]">
                  {editingPosition ? "Edit Jabatan" : "Tambah Jabatan"}
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  {editingPosition ? "Update Data Jabatan" : "Jabatan Baru"}
                </h2>
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
              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Nama Jabatan
                </label>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Contoh: Backend Developer, Mobile Developer, Finance Staff"
                  className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Status Jabatan
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
              </div>

              <div className="rounded-2xl border border-blue-100 bg-[#f6f8ff] p-4">
                <p className="text-sm font-black text-[#123c8c]">
                  Label Jabatan
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Jabatan berdiri sendiri sebagai label. Relasi dengan kantor,
                  divisi, dan unit tidak lagi dipakai.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl bg-[#123c8c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : editingPosition
                      ? "Update Jabatan"
                      : "Tambah Jabatan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <BottomNav variant="admin" />
    </MobileShell>
  );
}

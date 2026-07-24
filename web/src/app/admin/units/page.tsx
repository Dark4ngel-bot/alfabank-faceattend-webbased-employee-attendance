"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Building2, Edit, Loader2, Plus, Search, Trash2, X } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";

type Unit = {
  id: string;
  name: string;
  status: string;
  _count?: {
    users: number;
  };
};

type UnitForm = {
  name: string;
  status: string;
};

const initialForm: UnitForm = {
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

export default function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState<UnitForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);

  const filteredUnits = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return units.filter((unit) => {
      const matchesSearch = !keyword || unit.name.toLowerCase().includes(keyword);
      const matchesStatus = statusFilter === "all" || unit.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [units, search, statusFilter]);

  async function loadUnits() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const params = new URLSearchParams({
        search,
        status: statusFilter,
      });

      const response = await fetch(`/api/admin/units?${params.toString()}`, {
        cache: "no-store",
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Gagal mengambil unit.");
      }

      setUnits(data.units || data.data || []);
    } catch (error) {
      console.error("LOAD_UNITS_ERROR:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal mengambil data unit.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreateModal() {
    setEditingUnit(null);
    setForm(initialForm);
    setIsModalOpen(true);
  }

  function openEditModal(unit: Unit) {
    setEditingUnit(unit);
    setForm({
      name: unit.name,
      status: unit.status || "active",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingUnit(null);
    setForm(initialForm);
    setIsModalOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      alert("Nama unit wajib diisi.");
      return;
    }

    if (!["active", "inactive"].includes(form.status)) {
      alert("Status unit tidak valid.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/units", {
        method: editingUnit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUnit?.id,
          name,
          status: form.status,
        }),
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Gagal menyimpan unit.");
      }

      await loadUnits();
      closeModal();
    } catch (error) {
      console.error("SAVE_UNIT_ERROR:", error);
      alert(error instanceof Error ? error.message : "Gagal menyimpan unit.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteUnit(unit: Unit) {
    if ((unit._count?.users || 0) > 0) {
      alert(
        "Unit ini masih digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Yakin ingin menghapus unit "${unit.name}"? Data yang dihapus tidak bisa dikembalikan.`,
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const response = await fetch(`/api/admin/units?id=${unit.id}`, {
        method: "DELETE",
      });
      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Gagal menghapus unit.");
      }

      alert("Unit berhasil dihapus.");
      await loadUnits();
    } catch (error) {
      console.error("DELETE_UNIT_ERROR:", error);
      alert(error instanceof Error ? error.message : "Gagal menghapus unit.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <MobileShell variant="admin">
      <AppHeader title="Daftar Unit" variant="admin" />

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30">
          <div className="bg-[#123c8c] p-6 text-white md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                Daftar Unit
              </h1>
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#123c8c] shadow-lg shadow-blue-950/20 transition hover:bg-blue-50 active:scale-[0.98]"
              >
                <Plus size={18} />
                Tambah Unit
              </button>
            </div>
          </div>

          <div className="p-5 md:p-8">
            <div className="grid gap-3 md:grid-cols-[1fr_210px_auto]">
              <div>
                <label className="text-sm font-black text-slate-500">
                  Nama Unit
                </label>
                <div className="relative mt-3">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Cari unit..."
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
                <p>Unit</p>
                <p>Karyawan</p>
                <p>Status</p>
                <p className="text-center">Aksi</p>
              </div>

              <div className="divide-y divide-blue-50 bg-white">
                {isLoading ? (
                  <div className="px-5 py-10 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#123c8c]" />
                    <p className="mt-3 text-sm font-black text-slate-600">
                      Mengambil data unit...
                    </p>
                  </div>
                ) : filteredUnits.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <Building2 className="mx-auto text-slate-300" size={36} />
                    <p className="mt-3 font-black text-slate-700">
                      Data unit tidak ditemukan.
                    </p>
                  </div>
                ) : (
                  filteredUnits.map((unit, index) => (
                    <div
                      key={unit.id}
                      className="grid gap-4 px-4 py-4 text-sm transition hover:bg-[#f8fbff] md:grid-cols-[0.3fr_1.6fr_0.75fr_0.75fr_1fr] md:items-center md:px-5 md:py-6"
                    >
                      <p className="font-black text-slate-500">{index + 1}</p>
                      <div>
                        <p className="font-black uppercase text-slate-950">
                          {unit.name}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-400 md:hidden">
                          {unit._count?.users || 0} karyawan
                        </p>
                      </div>
                      <p className="font-black text-slate-600">
                        {unit._count?.users || 0}
                      </p>
                      <div>
                        <span
                          className={`w-fit rounded-full px-4 py-2 text-xs font-black ${statusClass(
                            unit.status,
                          )}`}
                        >
                          {formatStatus(unit.status)}
                        </span>
                      </div>
                      <div className="grid gap-2 md:flex md:justify-center">
                        <button
                          type="button"
                          onClick={() => openEditModal(unit)}
                          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 text-sm font-black text-white transition hover:bg-[#0f3274] active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-blue-100 md:bg-white md:py-2 md:text-xs md:text-[#123c8c] md:hover:bg-[#eaf1ff]"
                        >
                          <Edit size={16} className="md:h-3.5 md:w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUnit(unit)}
                          disabled={isDeleting || (unit._count?.users || 0) > 0}
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
                  {editingUnit ? "Edit Unit" : "Tambah Unit"}
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  {editingUnit ? "Update Data Unit" : "Unit Baru"}
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
                  Nama Unit
                </label>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Contoh: Backend Development, Mobile Development, Accounting"
                  className="w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Status Unit
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
                <p className="text-sm font-black text-[#123c8c]">Label Unit</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Unit berdiri sendiri sebagai label. Relasi dengan kantor,
                  divisi, dan jabatan tidak lagi dipakai.
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
                    : editingUnit
                      ? "Update Unit"
                      : "Tambah Unit"}
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

"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
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
  department?: Department | null;
};

type Position = {
  id: string;
  name: string;
  jabatan_id: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
  jabatan?: Jabatan | null;
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

function statusClass(status: string) {
  return status === "active"
    ? "bg-emerald-50 text-emerald-700"
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

function PositionMotionStyles() {
  return (
    <style>{`
      @keyframes positionEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes positionRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes positionModalBackdrop {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes positionModalPanel {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .position-enter {
        animation: positionEnter 320ms ease-out both;
      }

      .position-row-enter {
        opacity: 0;
        animation: positionRowEnter 300ms ease-out both;
      }

      .position-modal-backdrop {
        animation: positionModalBackdrop 180ms ease-out both;
      }

      .position-modal-panel {
        animation: positionModalPanel 260ms ease-out both;
        transform-origin: center bottom;
      }

      .position-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .position-enter,
        .position-row-enter,
        .position-modal-backdrop,
        .position-modal-panel {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-sm font-black text-slate-500">{children}</label>
  );
}

function SelectField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
}) {
  const {
    label,
    value,
    onChange,
    children,
    disabled,
    icon,
    className = "",
  } = props;

  return (
    <div className={className}>
      <FieldLabel>{label}</FieldLabel>

      <div className="relative mt-3">
        {icon ? (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        ) : null}

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className={`position-field h-[58px] w-full rounded-2xl border border-red-100 bg-[#f6f8ff] pr-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#b91c1c] focus:bg-white focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
            icon ? "pl-11" : "px-4"
          }`}
        >
          {children}
        </select>
      </div>
    </div>
  );
}

function SearchField(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { value, onChange } = props;

  return (
    <div>
      <FieldLabel>Nama Posisi</FieldLabel>

      <div className="relative mt-3">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Cari posisi..."
          className="position-field h-[58px] w-full rounded-2xl border border-red-100 bg-[#f6f8ff] pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#b91c1c] focus:bg-white focus:ring-4 focus:ring-red-100"
        />
      </div>
    </div>
  );
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
      const positionName = position.name.toLowerCase();

      return (
        (!keyword || positionName.includes(keyword)) &&
        (statusFilter === "all" || position.status === statusFilter)
      );
    });
  }, [positions, search, statusFilter]);

  async function loadPositions() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/admin/positions", {
        cache: "no-store",
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal mengambil posisi.",
        );
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

  function resetFilter() {
    setSearch("");
    setStatusFilter("all");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      alert("Nama posisi wajib diisi.");
      return;
    }

    if (!["active", "inactive"].includes(form.status)) {
      alert("Status posisi tidak valid.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/positions", {
        method: editingPosition ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingPosition?.id,
          name,
          status: form.status,
        }),
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menyimpan posisi.",
        );
      }

      await loadPositions();
      closeModal();
    } catch (error) {
      console.error("SAVE_POSITION_ERROR:", error);

      alert(
        error instanceof Error ? error.message : "Gagal menyimpan posisi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeletePosition(position: Position) {
    const totalUsers = position._count?.users || 0;

    if (totalUsers > 0) {
      alert(
        "Posisi ini masih digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.",
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Yakin ingin menghapus posisi "${position.name}"? Data yang dihapus tidak bisa dikembalikan.`,
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const response = await fetch(`/api/admin/positions?id=${position.id}`, {
        method: "DELETE",
      });

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menghapus posisi.",
        );
      }

      alert("Posisi berhasil dihapus.");
      await loadPositions();
    } catch (error) {
      console.error("DELETE_POSITION_ERROR:", error);

      alert(
        error instanceof Error ? error.message : "Gagal menghapus posisi.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <MobileShell variant="admin">
      <PositionMotionStyles />

      <AppHeader title="Daftar Posisi" variant="admin" />

      <section className="mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16">
        <div className="position-enter overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30">
          <div className="bg-[#b91c1c] p-6 text-white md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                  Daftar Posisi
                </h1>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-950/20 transition duration-200 hover:bg-emerald-700 active:scale-[0.98]"
              >
                <Plus size={18} />
                <span>Tambah Posisi</span>
              </button>
            </div>
          </div>

          <div className="p-5 md:p-8">
            <div
              className="position-row-enter space-y-4"
              style={{ animationDelay: "80ms" }}
            >
              <div className="grid gap-4 xl:grid-cols-[minmax(320px,1fr)_minmax(230px,0.35fr)_auto]">
                <SearchField value={search} onChange={setSearch} />

                <SelectField
                  label="Filter Status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  {statusOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </SelectField>

                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    onClick={resetFilter}
                    className="flex h-[58px] flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:bg-slate-100 active:scale-[0.96] xl:flex-none"
                  >
                    Atur Ulang
                  </button>
                </div>
              </div>
            </div>

            {errorMessage ? (
              <div className="position-row-enter mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <div
              className="position-row-enter mt-8 overflow-hidden rounded-2xl border border-slate-200"
              style={{ animationDelay: "130ms" }}
            >
              <div className="hidden grid-cols-[0.3fr_1.6fr_0.75fr_1fr] bg-slate-100/70 px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-slate-800 md:grid">
                <p>#</p>
                <p>Posisi</p>
                <p>Status</p>
                <p className="text-center">Aksi</p>
              </div>

              <div className="divide-y divide-slate-100 bg-white">
                {isLoading ? (
                  <div className="position-row-enter px-5 py-10 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#b91c1c]" />
                    <p className="mt-3 text-sm font-black text-slate-600">
                      Mengambil data posisi...
                    </p>
                  </div>
                ) : filteredPositions.length === 0 ? (
                  <div className="position-row-enter px-5 py-10 text-center">
                    <BriefcaseBusiness
                      className="mx-auto text-slate-300"
                      size={36}
                    />
                    <p className="mt-3 font-black text-slate-700">
                      Data posisi tidak ditemukan.
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Tambahkan posisi baru atau ubah filter pencarian.
                    </p>
                  </div>
                ) : (
                  filteredPositions.map((position, index) => (
                      <div
                        key={position.id}
                        className="position-row-enter grid gap-4 px-4 py-4 text-sm transition duration-200 hover:bg-slate-50/80 md:grid-cols-[0.3fr_1.6fr_0.75fr_1fr] md:items-center md:px-5 md:py-6"
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
                                {position.name}
                              </p>

                              <p className="mt-1 text-xs font-semibold text-slate-400">
                                {position._count?.users || 0} karyawan
                              </p>
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black md:hidden ${statusClass(
                              position.status,
                            )}`}
                          >
                            {formatStatus(position.status)}
                          </span>
                        </div>

                        <div className="hidden md:block">
                          <p className="font-black uppercase text-slate-950">
                            {position.name}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {position._count?.users || 0} karyawan
                          </p>
                        </div>

                        <div className="hidden md:block">
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
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-slate-200 md:bg-white md:px-4 md:py-2 md:text-xs md:text-slate-800 md:shadow-none md:hover:bg-slate-100"
                          >
                            <Edit size={16} className="md:h-3.5 md:w-3.5" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeletePosition(position)}
                            disabled={
                              isDeleting || (position._count?.users || 0) > 0
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
        <div className="position-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 md:items-center md:pb-0">
          <div className="position-modal-panel max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b91c1c]">
                  {editingPosition ? "Edit Posisi" : "Tambah Posisi"}
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  {editingPosition ? "Update Data Posisi" : "Posisi Baru"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Isi nama posisi sebagai label yang bisa dipakai bebas.
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
                className="position-row-enter"
                style={{ animationDelay: "40ms" }}
              >
                <FieldLabel>Nama Posisi</FieldLabel>

                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Contoh: Kembaliend Developer, Mobile Developer, Finance Staff"
                  className="position-field mt-3 h-[58px] w-full rounded-2xl border border-red-100 bg-[#f6f8ff] px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-[#b91c1c] focus:bg-white focus:ring-4 focus:ring-red-100"
                />
              </div>

              <SelectField
                label="Status Posisi"
                value={form.status}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    status: value,
                  }))
                }
                className="position-row-enter"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Nonaktif</option>
              </SelectField>

              <div
                className="position-row-enter flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end"
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
                    : editingPosition
                      ? "Update Posisi"
                      : "Tambah Posisi"}
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

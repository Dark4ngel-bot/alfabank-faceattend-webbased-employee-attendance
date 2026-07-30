"use client";

import { useState, useRef, useEffect, useId } from "react";
import { INDONESIAN_BANKS, BankOption } from "@/lib/indonesian-banks";
import { Search, ChevronDown, Check, Plus, Building2, X } from "lucide-react";

// Brand Color Mapping for Bank Badges
const BANK_COLORS: Record<string, { bg: string; text: string }> = {
  BCA: { bg: "bg-blue-600", text: "text-white" },
  BLU: { bg: "bg-cyan-500", text: "text-white" },
  MANDIRI: { bg: "bg-blue-900", text: "text-amber-300" },
  BNI: { bg: "bg-[#006666]", text: "text-orange-300" },
  BRI: { bg: "bg-blue-700", text: "text-white" },
  BSI: { bg: "bg-emerald-600", text: "text-white" },
  BTN: { bg: "bg-blue-800", text: "text-amber-400" },
  JAGO: { bg: "bg-orange-500", text: "text-white" },
  JENIUS: { bg: "bg-sky-500", text: "text-white" },
  SEABANK: { bg: "bg-orange-600", text: "text-white" },
  BNC: { bg: "bg-amber-400", text: "text-slate-950" },
  ALLO: { bg: "bg-purple-700", text: "text-white" },
  SUPERBANK: { bg: "bg-slate-950", text: "text-lime-400" },
  LINEBANK: { bg: "bg-green-500", text: "text-white" },
  SAQU: { bg: "bg-[#1d4ed8]", text: "text-white" },
  TMRW: { bg: "bg-indigo-600", text: "text-white" },
  MOTION: { bg: "bg-red-600", text: "text-white" },
  CIMB: { bg: "bg-red-700", text: "text-white" },
  DANAMON: { bg: "bg-orange-600", text: "text-white" },
  PERMATA: { bg: "bg-emerald-700", text: "text-white" },
  MAYBANK: { bg: "bg-amber-500", text: "text-slate-950" },
  OCBC: { bg: "bg-red-600", text: "text-white" },
  MEGA: { bg: "bg-amber-600", text: "text-white" },
};

function getBankBadgeStyle(code: string, category: string) {
  if (BANK_COLORS[code]) return BANK_COLORS[code];
  if (category === "DIGITAL") return { bg: "bg-purple-600", text: "text-white" };
  if (category === "SYARIAH") return { bg: "bg-emerald-600", text: "text-white" };
  if (category === "BPD") return { bg: "bg-sky-700", text: "text-white" };
  return { bg: "bg-slate-700", text: "text-white" };
}

export function AppBankSelect({
  label = "Nama Bank",
  value,
  onChange,
  disabled = false,
  className = "",
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const labelId = useId();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
      setSelectedCategory("ALL");
    }
  }, [isOpen]);

  // Find bank object for current value
  const currentBank = INDONESIAN_BANKS.find(
    (b) =>
      b.name.toLowerCase() === value.trim().toLowerCase() ||
      b.shortName.toLowerCase() === value.trim().toLowerCase() ||
      b.code.toLowerCase() === value.trim().toLowerCase()
  );

  // Filter banks
  const filteredBanks = INDONESIAN_BANKS.filter((bank) => {
    const matchesCategory =
      selectedCategory === "ALL" || bank.category === selectedCategory;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      bank.name.toLowerCase().includes(q) ||
      bank.shortName.toLowerCase().includes(q) ||
      bank.code.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const isCustomInput =
    searchQuery.trim().length > 0 &&
    !INDONESIAN_BANKS.some(
      (b) => b.name.toLowerCase() === searchQuery.trim().toLowerCase()
    );

  const categories = [
    { id: "ALL", label: "Semua" },
    { id: "DIGITAL", label: "Digital Bank" },
    { id: "BUMN", label: "BUMN" },
    { id: "SWASTA", label: "Swasta" },
    { id: "SYARIAH", label: "Syariah" },
    { id: "BPD", label: "BPD" },
  ];

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label ? (
        <label
          id={labelId}
          className="mb-2 block text-sm font-black text-slate-700"
        >
          {label}
        </label>
      ) : null}

      {/* TRIGGER BUTTON */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-left text-sm font-bold text-slate-800 outline-none transition hover:border-blue-300 focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100/70 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="flex items-center gap-3 min-w-0">
          {currentBank ? (
            <>
              {/* LOGO BADGE */}
              <span
                className={`flex h-7 px-2.5 shrink-0 items-center justify-center rounded-lg text-xs font-black tracking-wider uppercase shadow-sm ${
                  getBankBadgeStyle(currentBank.code, currentBank.category).bg
                } ${getBankBadgeStyle(currentBank.code, currentBank.category).text}`}
              >
                {currentBank.shortName.slice(0, 6)}
              </span>
              <span className="truncate font-bold text-slate-900">
                {currentBank.name}
              </span>
            </>
          ) : value ? (
            <>
              <span className="flex h-7 px-2.5 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-black uppercase shadow-sm">
                BANK
              </span>
              <span className="truncate font-bold text-slate-900">{value}</span>
            </>
          ) : (
            <>
              <Building2 size={18} className="text-slate-400 shrink-0" />
              <span className="text-slate-400 font-medium">
                Pilih atau cari bank...
              </span>
            </>
          )}
        </div>

        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-[#123c8c]" : ""
          }`}
        />
      </button>

      {/* DROPDOWN POPOVER MODAL */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-[200] mt-2 max-h-[380px] w-full flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* SEARCH HEADER */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/80 space-y-2.5">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama bank (BCA, Mandiri, wondr, blu, Jago, dll)..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-xs font-bold text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#123c8c] focus:ring-2 focus:ring-blue-100"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>

            {/* CATEGORY PILLS */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-black transition ${
                    selectedCategory === cat.id
                      ? "bg-[#123c8c] text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* BANK LIST OPTIONS */}
          <div className="overflow-y-auto max-h-[250px] p-1.5 space-y-1 no-scrollbar">
            {/* CUSTOM INPUT OPTION */}
            {isCustomInput ? (
              <button
                type="button"
                onClick={() => {
                  onChange(searchQuery.trim());
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 rounded-xl p-2.5 text-left text-xs font-black text-[#123c8c] bg-blue-50/80 hover:bg-blue-100 transition border border-blue-200/60"
              >
                <div className="flex h-7 px-2 shrink-0 items-center justify-center rounded-lg bg-[#123c8c] text-white">
                  <Plus size={14} strokeWidth={3} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate">Gunakan: "{searchQuery.trim()}"</p>
                  <p className="text-[10px] text-slate-500 font-normal">
                    Ketik bank kustom pilihan Anda
                  </p>
                </div>
              </button>
            ) : null}

            {filteredBanks.map((bank) => {
              const isSelected =
                value.trim().toLowerCase() === bank.name.toLowerCase() ||
                value.trim().toLowerCase() === bank.shortName.toLowerCase();

              const badgeStyle = getBankBadgeStyle(bank.code, bank.category);

              return (
                <button
                  key={bank.code}
                  type="button"
                  onClick={() => {
                    onChange(bank.name);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 rounded-xl p-2.5 text-left transition ${
                    isSelected
                      ? "bg-blue-50 text-[#123c8c] font-black"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* BANK LOGO BADGE */}
                    <span
                      className={`flex h-7 w-16 shrink-0 items-center justify-center rounded-lg text-[10px] font-black tracking-wider uppercase shadow-xs ${badgeStyle.bg} ${badgeStyle.text}`}
                    >
                      {bank.shortName.slice(0, 7)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold leading-tight text-slate-900">
                        {bank.name}
                      </p>
                      <span className="inline-block mt-0.5 text-[9px] font-extrabold uppercase tracking-wide text-slate-400">
                        {bank.category}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check size={16} className="text-[#123c8c] shrink-0" strokeWidth={3} />
                  )}
                </button>
              );
            })}

            {filteredBanks.length === 0 && !isCustomInput && (
              <div className="p-4 text-center text-xs font-bold text-slate-400">
                Bank tidak ditemukan. Ketik nama bank untuk menambahkan kustom.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

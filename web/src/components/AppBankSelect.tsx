"use client";

import { useId } from "react";
import { INDONESIAN_BANKS } from "@/lib/indonesian-banks";

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
  const selectId = useId();

  return (
    <div className={`w-full ${className}`}>
      {label ? (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-500"
        >
          {label}
        </label>
      ) : null}

      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className="w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100/70 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">-- Pilih Bank --</option>
          {INDONESIAN_BANKS.map((bank) => (
            <option key={bank.code} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

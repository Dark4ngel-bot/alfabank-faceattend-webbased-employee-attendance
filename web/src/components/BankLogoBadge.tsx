import { CreditCard } from "lucide-react";
import { getBankOption } from "@/lib/bank-options";

type BankLogoBadgeProps = {
  bankCode?: string | null;
  accountNumber?: string | null;
  compact?: boolean;
};

export default function BankLogoBadge({
  bankCode,
  accountNumber,
  compact = false,
}: BankLogoBadgeProps) {
  const bank = getBankOption(bankCode);

  if (!bank && !accountNumber) {
    return <span>-</span>;
  }

  return (
    <span className="inline-flex min-w-0 items-center gap-2 align-middle">
      <span
        className={`inline-flex h-8 min-w-12 shrink-0 items-center justify-center rounded-lg px-2 text-[11px] font-black leading-none shadow-sm ${
          bank?.brandClassName || "bg-slate-700 text-white"
        }`}
      >
        {bank?.shortName || <CreditCard size={15} strokeWidth={2.7} />}
      </span>
      <span className="min-w-0">
        {bank && !compact ? (
          <span className="block text-xs font-bold leading-4 text-slate-400">
            {bank.name}
          </span>
        ) : null}
        <span className="block break-all leading-6">
          {accountNumber || "No rekening belum diisi"}
        </span>
      </span>
    </span>
  );
}

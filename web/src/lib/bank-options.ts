export type BankOption = {
  code: string;
  name: string;
  shortName: string;
  brandClassName: string;
};

export const BANK_OPTIONS: BankOption[] = [
  {
    code: "bca",
    name: "Bank Central Asia",
    shortName: "BCA",
    brandClassName: "bg-[#0b4ea2] text-white",
  },
  {
    code: "mandiri",
    name: "Bank Mandiri",
    shortName: "Mandiri",
    brandClassName: "bg-[#003d79] text-[#ffd100]",
  },
  {
    code: "bri",
    name: "Bank Rakyat Indonesia",
    shortName: "BRI",
    brandClassName: "bg-[#00529c] text-white",
  },
  {
    code: "bni",
    name: "Bank Negara Indonesia",
    shortName: "BNI",
    brandClassName: "bg-[#f15a24] text-white",
  },
  {
    code: "bsi",
    name: "Bank Syariah Indonesia",
    shortName: "BSI",
    brandClassName: "bg-[#00a39b] text-white",
  },
  {
    code: "btn",
    name: "Bank Tabungan Negara",
    shortName: "BTN",
    brandClassName: "bg-[#005baa] text-white",
  },
  {
    code: "cimb",
    name: "CIMB Niaga",
    shortName: "CIMB",
    brandClassName: "bg-[#b00020] text-white",
  },
  {
    code: "danamon",
    name: "Bank Danamon",
    shortName: "Danamon",
    brandClassName: "bg-[#f58220] text-white",
  },
  {
    code: "permata",
    name: "PermataBank",
    shortName: "Permata",
    brandClassName: "bg-[#b01630] text-white",
  },
  {
    code: "ocbc",
    name: "OCBC",
    shortName: "OCBC",
    brandClassName: "bg-[#e31b23] text-white",
  },
  {
    code: "maybank",
    name: "Maybank",
    shortName: "Maybank",
    brandClassName: "bg-[#ffc600] text-slate-950",
  },
  {
    code: "panin",
    name: "Panin Bank",
    shortName: "Panin",
    brandClassName: "bg-[#0b54a0] text-white",
  },
  {
    code: "mega",
    name: "Bank Mega",
    shortName: "Mega",
    brandClassName: "bg-[#f2c300] text-slate-950",
  },
  {
    code: "jago",
    name: "Bank Jago",
    shortName: "Jago",
    brandClassName: "bg-[#f37021] text-white",
  },
  {
    code: "jenius",
    name: "Jenius",
    shortName: "Jenius",
    brandClassName: "bg-[#00a7e1] text-white",
  },
  {
    code: "seabank",
    name: "SeaBank",
    shortName: "SeaBank",
    brandClassName: "bg-[#f58220] text-white",
  },
  {
    code: "neo",
    name: "Bank Neo Commerce",
    shortName: "Neo",
    brandClassName: "bg-[#ffcf00] text-slate-950",
  },
  {
    code: "allo",
    name: "Allo Bank",
    shortName: "Allo",
    brandClassName: "bg-[#203b8f] text-white",
  },
  {
    code: "dki",
    name: "Bank DKI",
    shortName: "DKI",
    brandClassName: "bg-[#d71920] text-white",
  },
  {
    code: "bjb",
    name: "Bank BJB",
    shortName: "BJB",
    brandClassName: "bg-[#005eb8] text-white",
  },
  {
    code: "lainnya",
    name: "Bank Lainnya",
    shortName: "Bank",
    brandClassName: "bg-slate-700 text-white",
  },
];

export function getBankOption(code?: string | null) {
  const normalizedCode = String(code || "").trim().toLowerCase();

  return BANK_OPTIONS.find((bank) => bank.code === normalizedCode) || null;
}

export function normalizeBankCode(code: unknown) {
  const normalizedCode = String(code || "").trim().toLowerCase();

  if (!normalizedCode) return null;

  return BANK_OPTIONS.some((bank) => bank.code === normalizedCode)
    ? normalizedCode
    : null;
}

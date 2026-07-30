export type BankOption = {
  code: string;
  name: string;
  shortName: string;
  category: "BUMN" | "SWASTA" | "SYARIAH" | "DIGITAL" | "BPD" | "LAINNYA";
};

export const INDONESIAN_BANKS: BankOption[] = [
  // Bank Utama & Digital Banking
  { code: "BCA", name: "Bank Central Asia (BCA)", shortName: "BCA", category: "SWASTA" },
  { code: "BLU", name: "blu by BCA Digital", shortName: "blu (BCA)", category: "DIGITAL" },
  { code: "MANDIRI", name: "Bank Mandiri (Livin' by Mandiri)", shortName: "Mandiri", category: "BUMN" },
  { code: "BNI", name: "Bank Negara Indonesia (BNI / wondr by BNI)", shortName: "BNI", category: "BUMN" },
  { code: "BRI", name: "Bank Rakyat Indonesia (BRI / BRImo)", shortName: "BRI", category: "BUMN" },
  { code: "BSI", name: "Bank Syariah Indonesia (BSI / BSI Mobile)", shortName: "BSI", category: "SYARIAH" },
  { code: "BTN", name: "Bank Tabungan Negara (BTN / BTN Mobile)", shortName: "BTN", category: "BUMN" },
  { code: "JAGO", name: "Bank Jago", shortName: "Bank Jago", category: "DIGITAL" },
  { code: "JENIUS", name: "Bank BTPN / Jenius", shortName: "Jenius (BTPN)", category: "DIGITAL" },
  { code: "SEABANK", name: "SeaBank Indonesia", shortName: "SeaBank", category: "DIGITAL" },
  { code: "BNC", name: "Bank Neo Commerce (BNC / Neobank)", shortName: "Neo Commerce", category: "DIGITAL" },
  { code: "ALLO", name: "Allo Bank", shortName: "Allo Bank", category: "DIGITAL" },
  { code: "SUPERBANK", name: "Superbank", shortName: "Superbank", category: "DIGITAL" },
  { code: "LINEBANK", name: "LINE Bank by Hana Bank", shortName: "LINE Bank", category: "DIGITAL" },
  { code: "SAQU", name: "Bank Saqu by Astra", shortName: "Bank Saqu", category: "DIGITAL" },
  { code: "TMRW", name: "TMRW by UOB", shortName: "TMRW (UOB)", category: "DIGITAL" },
  { code: "MOTION", name: "MotionBank by MNC Bank", shortName: "MotionBank", category: "DIGITAL" },

  // Bank Swasta Nasional
  { code: "CIMB", name: "Bank CIMB Niaga (OCTO Mobile)", shortName: "CIMB Niaga", category: "SWASTA" },
  { code: "DANAMON", name: "Bank Danamon (D-Bank PRO)", shortName: "Danamon", category: "SWASTA" },
  { code: "PERMATA", name: "Bank Permata (PermataMobile X)", shortName: "Permata", category: "SWASTA" },
  { code: "MAYBANK", name: "Maybank Indonesia", shortName: "Maybank", category: "SWASTA" },
  { code: "OCBC", name: "Bank OCBC NISP (OCBC Mobile)", shortName: "OCBC NISP", category: "SWASTA" },
  { code: "MEGA", name: "Bank Mega", shortName: "Mega", category: "SWASTA" },
  { code: "PANIN", name: "Bank Panin", shortName: "Panin", category: "SWASTA" },
  { code: "SINARMAS", name: "Bank Sinarmas", shortName: "Sinarmas", category: "SWASTA" },
  { code: "BUKOPIN", name: "KB Bank / KB Bukopin", shortName: "KB Bukopin", category: "SWASTA" },

  // Bank Pembangunan Daerah (BPD)
  { code: "DKI", name: "Bank DKI", shortName: "Bank DKI", category: "BPD" },
  { code: "BJB", name: "Bank BJB", shortName: "Bank BJB", category: "BPD" },
  { code: "JATENG", name: "Bank Jateng", shortName: "Bank Jateng", category: "BPD" },
  { code: "JATIM", name: "Bank Jatim", shortName: "Bank Jatim", category: "BPD" },
  { code: "SUMUT", name: "Bank Sumut", shortName: "Bank Sumut", category: "BPD" },
  { code: "NAGARI", name: "Bank Nagari", shortName: "Bank Nagari", category: "BPD" },
  { code: "RIAU", name: "Bank Riau Kepri Syariah", shortName: "Bank Riau Kepri", category: "BPD" },
  { code: "SUMSEL", name: "Bank Sumsel Babel", shortName: "Bank Sumsel", category: "BPD" },
  { code: "LAMPUNG", name: "Bank Lampung", shortName: "Bank Lampung", category: "BPD" },
  { code: "KALSEL", name: "Bank Kalsel", shortName: "Bank Kalsel", category: "BPD" },
  { code: "KALBAR", name: "Bank Kalbar", shortName: "Bank Kalbar", category: "BPD" },
  { code: "KALTIMTARA", name: "Bank Kaltimtara", shortName: "Bank Kaltimtara", category: "BPD" },
  { code: "SULSELBAR", name: "Bank Sulselbar", shortName: "Bank Sulselbar", category: "BPD" },
  { code: "SULUTGO", name: "Bank SulutGo", shortName: "Bank SulutGo", category: "BPD" },
  { code: "NTB", name: "Bank NTB Syariah", shortName: "Bank NTB", category: "BPD" },
  { code: "NTT", name: "Bank NTT", shortName: "Bank NTT", category: "BPD" },
  { code: "PAPUA", name: "Bank Papua", shortName: "Bank Papua", category: "BPD" },
  { code: "LAINNYA", name: "Bank Lainnya", shortName: "Lainnya", category: "LAINNYA" },
];

export function getBankName(bankCodeOrName?: string | null): string {
  if (!bankCodeOrName?.trim()) return "-";

  const found = INDONESIAN_BANKS.find(
    (b) =>
      b.code.toLowerCase() === bankCodeOrName.trim().toLowerCase() ||
      b.name.toLowerCase() === bankCodeOrName.trim().toLowerCase() ||
      b.shortName.toLowerCase() === bankCodeOrName.trim().toLowerCase(),
  );

  return found ? found.name : bankCodeOrName.trim();
}

export type BankOption = {
  code: string;
  name: string;
  shortName: string;
  category: "BUMN" | "SWASTA" | "SYARIAH" | "DIGITAL" | "BPD" | "LAINNYA";
  isDigital?: boolean;
};

export const INDONESIAN_BANKS: BankOption[] = [
  // Digital Banking & Modern Apps
  { code: "BLU", name: "blu by BCA Digital", shortName: "blu", category: "DIGITAL", isDigital: true },
  { code: "WONDR", name: "wondr by BNI", shortName: "wondr", category: "DIGITAL", isDigital: true },
  { code: "LIVIN", name: "Livin' by Mandiri", shortName: "Livin'", category: "DIGITAL", isDigital: true },
  { code: "BRIMO", name: "BRImo by BRI", shortName: "BRImo", category: "DIGITAL", isDigital: true },
  { code: "MYBCA", name: "myBCA Digital", shortName: "myBCA", category: "DIGITAL", isDigital: true },
  { code: "JAGO", name: "Bank Jago", shortName: "Jago", category: "DIGITAL", isDigital: true },
  { code: "JENIUS", name: "Jenius by BTPN", shortName: "Jenius", category: "DIGITAL", isDigital: true },
  { code: "SEABANK", name: "SeaBank Indonesia", shortName: "SeaBank", category: "DIGITAL", isDigital: true },
  { code: "BNC", name: "Bank Neo Commerce (Neobank)", shortName: "Neobank", category: "DIGITAL", isDigital: true },
  { code: "ALLO", name: "Allo Bank", shortName: "Allo", category: "DIGITAL", isDigital: true },
  { code: "SUPERBANK", name: "Superbank", shortName: "Superbank", category: "DIGITAL", isDigital: true },
  { code: "LINEBANK", name: "LINE Bank by Hana Bank", shortName: "LINE Bank", category: "DIGITAL", isDigital: true },
  { code: "SAQU", name: "Bank Saqu by Astra", shortName: "Bank Saqu", category: "DIGITAL", isDigital: true },
  { code: "TMRW", name: "TMRW by UOB", shortName: "TMRW", category: "DIGITAL", isDigital: true },
  { code: "MOTION", name: "MotionBank by MNC Bank", shortName: "MotionBank", category: "DIGITAL", isDigital: true },

  // Bank BUMN & Swasta Utama
  { code: "BCA", name: "Bank Central Asia (BCA)", shortName: "BCA", category: "SWASTA" },
  { code: "MANDIRI", name: "Bank Mandiri", shortName: "Mandiri", category: "BUMN" },
  { code: "BNI", name: "Bank Negara Indonesia (BNI)", shortName: "BNI", category: "BUMN" },
  { code: "BRI", name: "Bank Rakyat Indonesia (BRI)", shortName: "BRI", category: "BUMN" },
  { code: "BSI", name: "Bank Syariah Indonesia (BSI)", shortName: "BSI", category: "SYARIAH" },
  { code: "BTN", name: "Bank Tabungan Negara (BTN)", shortName: "BTN", category: "BUMN" },

  // Bank Swasta Nasional
  { code: "CIMB", name: "Bank CIMB Niaga", shortName: "CIMB Niaga", category: "SWASTA" },
  { code: "DANAMON", name: "Bank Danamon", shortName: "Danamon", category: "SWASTA" },
  { code: "PERMATA", name: "Bank Permata", shortName: "Permata", category: "SWASTA" },
  { code: "MAYBANK", name: "Maybank Indonesia", shortName: "Maybank", category: "SWASTA" },
  { code: "OCBC", name: "Bank OCBC NISP", shortName: "OCBC", category: "SWASTA" },
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

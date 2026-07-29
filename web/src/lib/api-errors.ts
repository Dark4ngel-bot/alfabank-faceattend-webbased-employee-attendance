export function getApiErrorStatus(error: unknown) {
  if (!(error instanceof Error)) return 500;

  const message = error.message.toLowerCase();
  const name = error.name.toLowerCase();

  if (message.includes("akses")) return 403;

  if (
    message.includes("token login") ||
    message.includes("user id tidak ditemukan di token") ||
    name.includes("jwt") ||
    name.includes("jws") ||
    name.includes("jose")
  ) {
    return 401;
  }

  return 500;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Terjadi kesalahan server.",
) {
  const status = getApiErrorStatus(error);

  if (status === 401) return "Silakan login terlebih dahulu.";
  if (status === 403) return "Akses ditolak.";

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("konfigurasi cloudinary belum lengkap")) {
      return "Konfigurasi upload foto di hosting belum lengkap. Pastikan CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET sudah diset.";
    }

    if (
      message.includes("unknown column") ||
      message.includes("doesn't exist") ||
      message.includes("table") ||
      message.includes("prisma") ||
      message.includes("foreign key")
    ) {
      return "Struktur database hosting belum sesuai versi aplikasi. Jalankan migration terbaru lalu coba presensi lagi.";
    }
  }

  return fallback;
}

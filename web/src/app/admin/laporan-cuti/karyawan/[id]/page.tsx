import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyLaporanCutiKaryawanPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/admin/laporan-pengajuan/karyawan/${encodeURIComponent(id)}`);
}

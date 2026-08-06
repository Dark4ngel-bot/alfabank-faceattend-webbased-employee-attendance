import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyDetailLaporanCutiPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/admin/laporan-pengajuan/${encodeURIComponent(id)}`);
}

import { redirect } from "next/navigation";

export default function LegacyEmployeeDetailRedirect() {
  redirect("/admin/daftar-karyawan");
}

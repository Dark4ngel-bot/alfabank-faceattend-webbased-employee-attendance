import { redirect } from "next/navigation";

export default function AdminCompanyProfileShortcutPage() {
  redirect("/admin/profile?tab=company");
}

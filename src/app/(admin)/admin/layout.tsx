import { roles } from "@/src/lib/constant";
import { getCurrentUser } from "@/src/lib/queries/user.queries";

import { AdminShell } from "@/src/templates/admin/_components/AdminShell";
import { redirect } from "next/navigation";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login")
  }
  if (user?.role !== roles.ADMIN) {
    redirect("/")
  }
  return <AdminShell>{children}</AdminShell>;
}

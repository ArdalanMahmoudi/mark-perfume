import { getCurrentUser } from "@/src/lib/queries/user.queries";
import { Sidebar } from "@/src/templates/admin/_components/Sidebar";
import { Topbar } from "@/src/templates/admin/_components/Topbar";
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
  if (user?.role !== "ADMIN") {
    redirect("/")
  }
  return (
    <div className="flex min-h-screen  text-black">
      {/* --------desktop -------- */}
      <div className="hidden lg:flex lg:w-64">
        <Sidebar />
      </div>
      {/* -------- main content-------- */}
      <div className="flex flex-col flex-1">
         <Topbar /> {/* Sidebar mobile in Topbar */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}

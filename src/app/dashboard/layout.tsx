import Container from "@/src/components/common/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import { getCurrentUser } from "@/src/lib/queries/user.queries";
import DashboardMenuMobile from "@/src/templates/dashboard/_components/DashboardMenuMobile";
import Sidebar from "@/src/templates/dashboard/_components/Sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await getCurrentUser()
    if (!session) {
      redirect('/')
    }
  return (
    <>
      <Header user={session} />
      <main className="mt-32 lg:mt-40">
        <section>
          <Container>
            <div className="my-12 grid gap-8 grid-cols-[repeat(1,100%)] lg:grid-cols-[280px_1fr]">
              <DashboardMenuMobile userName={session.username ?? "کاربر"} userImage={session.image ?? "/images/user.png"}/>
              <Sidebar  userName={session.username ?? "کاربر"} userImage={session.image ?? "/images/user.png"}/>
              {children}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

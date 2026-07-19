import Container from "@/src/components/common/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import { getCurrentUser } from "@/src/lib/dal";
import Sidebar from "@/src/templates/dashboard/_components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await getCurrentUser()
  return (
    <>
      <Header isLoggedIn={session}/>
      <main>
        <section>
          <Container>
            <div className="my-12 grid gap-8 grid-cols-[280px_1fr]">
              <Sidebar />
              {children}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

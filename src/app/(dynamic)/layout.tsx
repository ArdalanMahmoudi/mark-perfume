import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import { getCurrentUser } from "@/src/lib/queries/user.queries";

import React from "react";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();

  return (
    <>
      <Header user={session} />
      <main className="mt-16 lg:mt-40">{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;

import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import { getCurrentUser } from "@/src/lib/queries/user.queries";

import React from "react";

async function MainLayout({ children }: { children: React.ReactNode }) {
  return (

      <main>{children}</main>
    
  );
}

export default MainLayout;

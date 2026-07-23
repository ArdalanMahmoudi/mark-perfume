'use client'
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Sidebar } from "@/src/templates/admin/_components/Sidebar";
import { Topbar } from "@/src/templates/admin/_components/Topbar";
import { SidebarMobile } from "./SidebarMobile";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
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

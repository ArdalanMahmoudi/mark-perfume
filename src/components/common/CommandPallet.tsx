"use client";

import * as React from "react";
import {
  Folder,
  Home,
  InfoIcon,
  Package,
  PlusSquare,
  Search,
  Ticket,
  Users,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/src/components/ui/command";
import { useRouter } from "next/navigation";

export function CommandPallet() {
  const [open, setOpen] = React.useState(false);
    const router = useRouter()
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit h-9">
        <Search className="size-4 text-black" />
        <input
          type="text"
          className="flex-1 py-1 text-sm px-4 pr-1 rounded-sm text-black w-full placeholder-gray-400 focus:outline-none "
          placeholder="اینجا پیداش کن"
        />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="جستجوی محصول, کاربر یا دستور" />
          <CommandList>
            <CommandEmpty>هیچ نتیجه‌ای پیدا نشد.</CommandEmpty>
            <CommandGroup heading="پیشنهادات">
              <CommandItem onSelect={() => router.push("/admin")}>
                <Home />
                <span>پیشخوان</span>
              </CommandItem>
              <CommandItem onSelect={() => router.push("/admin/products")}>
                <Package />
                <span>محصولات</span>
              </CommandItem>
              <CommandItem onSelect={() => router.push("/admin/users")}>
                <Users />
                <span>کاربران</span>
              </CommandItem>
              <CommandItem onSelect={() => router.push("/admin/profile")}>
                <InfoIcon />
                <span>جزپیات حساب</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="دسترسی سریع">
              <CommandItem>
                <PlusSquare />
                <span>افزودن محصول</span>
              </CommandItem>
              <CommandItem>
                <Folder />
                <span>افزودن دسته‌بندی</span>
              </CommandItem>
              <CommandItem>
                <Ticket />
                <span>مشاهده تیکت ها</span>
              </CommandItem>
              
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

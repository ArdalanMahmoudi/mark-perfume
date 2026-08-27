import { Bell, MenuIcon, Search } from "lucide-react";
import Image from "next/image";
import { SidebarMobile } from "./SidebarMobile";
import { CommandPallet } from "@/src/components/common/CommandPallet";
import Link from "next/link";
import BreadCrumbs from "@/src/components/common/BreadCrumbs";
import AdminBreadcrumb from "./AdminBreadcrumb";

export const Topbar = ({username, image}) => {
  return (
    <>
      <div className="bg-gray-50 border-b border-grey220 h-16 w-full flex items-center p-4 justify-between">
        <SidebarMobile />
        <AdminBreadcrumb />
        {/* route */}

        <div className="flex flex-row py-1 px-2">
          <div className="flex h-10 w-full flex-row items-center">
            <div className="flex items-center select-none min-w-0 text-button-14 rounded-md group flex-1">
              <Link
                href={"/"}
                className="cursor-pointer flex-1 flex flex-row items-center gap-2 pl-2.5 md:pr-1 py-2 group/owner-breadcrumb min-w-0"
              >
                <span className="flex-1 flex flex-row items-center gap-2 min-w-0 font-bold">
                  <span className="truncate leading-5 max-w-28">{username}</span>
                </span>

                <Image
                  src={image ? image : "/images/user.png"}
                  className="size-8 rounded-full"
                  width={20}
                  height={20}
                  alt="profile image"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import ActiveLink from "../common/ActiveLink";
import {
  BookText,
  ChevronLeft,
  CircleQuestionMark,
  FileText,
  Home,
  Phone,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { DrawerClose } from "../ui/drawer";

const MobileHeaderTabs = () => {
  const activeTabStyle =
    "data-[state=active]:bg-primary data-[state=active]:text-white";
  return (
    <Tabs
      dir="rtl"
      defaultValue="pages"
      className="w-full overflow-y-auto px-5 mobile-header-scrollbar"
    >
      <TabsList className="text-lg w-full" dir="rtl">
        <TabsTrigger className={activeTabStyle} value="pages">
          صفحات
        </TabsTrigger>
        <TabsTrigger className={activeTabStyle} value="category">
          دسته‌بندی ها
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pages">
        <div className="flex flex-col gap-8 text-sm py-4">
          <ActiveLink
            href={"/"}
            className="flex items-center w-full gap-1 cursor-pointer hover:text-primary transition-colors duration-300"
            activeClassName="text-primary"
          >
            <Home className="size-4" />
            <span>خانه</span>
          </ActiveLink>

          <ActiveLink
            href={"/shop"}
            className="flex items-center w-full gap-1 cursor-pointer hover:text-primary transition-colors duration-300"
            activeClassName="text-primary"
          >
            <ShoppingCart className="size-4" />
            <span>فروشگاه</span>
          </ActiveLink>

          <ActiveLink
            href={"/blogs"}
            className="flex items-center w-full gap-1 cursor-pointer hover:text-primary transition-colors duration-300"
            activeClassName="text-primary"
          >
            <FileText className="size-4" />
            <span>مقالات</span>
          </ActiveLink>

          <ActiveLink
            href={"/rules"}
            className="flex items-center w-full gap-1 cursor-pointer hover:text-primary transition-colors duration-300"
            activeClassName="text-primary"
          >
            <BookText className="size-4" />
            <span>قوانین و شرایط خرید</span>
          </ActiveLink>

          <ActiveLink
            href={"/contactus"}
            className="flex items-center w-full gap-1 cursor-pointer hover:text-primary transition-colors duration-300"
            activeClassName="text-primary"
          >
            <Phone className="size-4" />
            <span>تماس با ما</span>
          </ActiveLink>

          <ActiveLink
            href={"/aboutus"}
            className="flex items-center w-full gap-1 cursor-pointer hover:text-primary transition-colors duration-300"
            activeClassName="text-primary"
          >
            <CircleQuestionMark className="size-4" />
            <span>درباره ما</span>
          </ActiveLink>
        </div>
      </TabsContent>
      <TabsContent value="category">
        <div className="flex flex-col gap-8 text-sm py-4">
          <Link
            href={"/shop"}
            className="flex items-center w-full justify-between"
          >
            <span> گلی(Floral)</span>
            <ChevronLeft size={18} />
          </Link>

          <Link
            href={"/shop"}
            className="flex items-center w-full justify-between"
          >
            <span> چوبی (Woody)</span>
            <ChevronLeft size={18} />
          </Link>

          <Link
            href={"/shop"}
            className="flex items-center w-full justify-between"
          >
            <span> شرقی (Oriental/Ambery)</span>
            <ChevronLeft size={18} />
          </Link>

          <Link
            href={"/shop"}
            className="flex items-center w-full justify-between"
          >
            <span> تازه (Fresh)</span>
            <ChevronLeft size={18} />
          </Link>

          <Link
            href={"/shop"}
            className="flex items-center w-full justify-between"
          >
            <span> سرخسی (Fougere)</span>
            <ChevronLeft size={18} />
          </Link>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MobileHeaderTabs;

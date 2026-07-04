import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import ActiveLink from "../common/ActiveLink";
import { BookText, CircleQuestionMark, FileText, Home, Phone, ShoppingCart } from "lucide-react";
import { AccordionHeaderMobile } from "./AccordionHeaderMobile";


const MobileHeaderTabs = () => {
  return (
    <Tabs dir="rtl" defaultValue="pages" className="w-full overflow-y-auto">
      <TabsList className="text-lg w-full" dir="rtl">
        <TabsTrigger value="pages">صفحات</TabsTrigger>
        <TabsTrigger value="category">دسته‌بندی ها</TabsTrigger>
      </TabsList>
      <TabsContent value="pages">
        <div>
            <div className="flex flex-col gap-8 text-sm py-4">
                <ActiveLink href={'/'} className="flex items-center gap-1 w-fit cursor-pointer hover:text-primary transition-colors duration-300" activeClassName="text-primary">
                    <Home className="size-4"/>
                    <span>خانه</span>
                </ActiveLink>
                <ActiveLink href={'/shop'} className="flex items-center gap-1 w-fit cursor-pointer hover:text-primary transition-colors duration-300" activeClassName="text-primary">
                    <ShoppingCart className="size-4"/>
                    <span>فروشگاه</span>
                </ActiveLink>
                <ActiveLink href={'/blogs'} className="flex items-center gap-1 w-fit cursor-pointer hover:text-primary transition-colors duration-300" activeClassName="text-primary">
                    <FileText className="size-4"/>
                    <span>مقالات</span>
                </ActiveLink>
                <ActiveLink href={'/rules'} className="flex items-center gap-1 w-fit cursor-pointer hover:text-primary transition-colors duration-300" activeClassName="text-primary">
                    <BookText className="size-4"/>
                    <span>قوانین و شرایط خرید</span>
                </ActiveLink>
                <ActiveLink href={'/contactus'} className="flex items-center gap-1 w-fit cursor-pointer hover:text-primary transition-colors duration-300" activeClassName="text-primary">
                    <Phone className="size-4"/>
                    <span>تماس با ما</span>
                </ActiveLink>
                <ActiveLink href={'/aboutus'} className="flex items-center gap-1 w-fit cursor-pointer hover:text-primary transition-colors duration-300" activeClassName="text-primary">
                    <CircleQuestionMark className="size-4"/>
                    <span>درباره ما</span>
                </ActiveLink>
            </div>
           
        </div>
      </TabsContent>
      <TabsContent value="category">
        <AccordionHeaderMobile/>
      </TabsContent>
    </Tabs>
  );
};

export default MobileHeaderTabs;

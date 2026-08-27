import React from "react";
import Container from "../common/Container";
import Link from "next/link";
import Image from "next/image";
import {
    AwardIcon,
  BookText,
  CircleQuestionMark,
  FileText,
  Home,
  Info,
  InfoIcon,
  LinkIcon,
  Mail,
  Map,
  Phone,
  ShoppingCart,
} from "lucide-react";
import ActiveLink from "../common/ActiveLink";

const Footer = () => {
  return (
    <footer className="w-full mt-24">
      <div className="lg:py-12 py-8 bg-no-repeat bg-center border-t-2 border-primary bg-secondary" style={{backgroundImage:"url('/images/footer-background.png')"}}>
        <Container>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 lg:col-span-1 flex flex-col gap-4">
              <Link href={"/"} className="flex justify-center">
                <Image
                  src={"/images/logo.png"}
                  width={600}
                  height={300}
                  alt="logo"
                  className="lg:w-1/2 w-4/5 "
                />
              </Link>
              <p className="lg:leading-8 leading-7 text-center text-sm lg:text-balance lg:text-right">
                ایده‌ی راه‌اندازی Mark Perfume از علاقه‌ی عمیق ما به دنیای عطر و
                تجربه‌ی خریدی امن و لذت‌بخش شکل گرفت. از همان ابتدا تلاش کردیم
                با گردآوری مجموعه‌ای متنوع از محبوب‌ترین برندهای دنیا و ارائه‌ی
                خدماتی حرفه‌ای، رضایت مشتریان را به دست آوریم.{" "}
              </p>
              <p className="lg:leading-8 leading-7 text-center text-sm lg:text-balance lg:text-right">
                امروز خوشحالیم که توانسته‌ایم اعتماد مشتریان زیادی را جلب کنیم و
                در مسیر رشد و گسترش این فروشگاه گام برداریم. هدف ما در آینده
                نزدیک، افزایش تنوع محصولات و ارائه‌ی تجربه‌ی خریدی مدرن‌تر و
                راحت‌تر است.
              </p>
            </div>
            <div className="col-span-3 lg:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-hidden">
              {/* col-2 */}
              <div className=" ">
                <p className="font-bold text-primary border-b-2 border-primary text-balance lg:text-lg flex items-center pb-1">
                  <LinkIcon className="size-4.5 ml-1" />
                  لینک‌های مفید
                </p>
                <nav className="flex flex-col gap-3 mt-4">
                  <Link
                    className="p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/"}
                  >
                    <Home className="size-4.5  text-primary" />
                    <span className="text-sm lg:text-balance">خانه</span>
                  </Link>
                  <Link
                    className=" p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/shop"}
                  >
                    <ShoppingCart className="size-4.5  text-primary" />
                    <span className="text-sm lg:text-balance">فروشگاه</span>
                  </Link>
                  <Link
                    className=" p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/blogs"}
                  >
                    <FileText className="size-4.5  text-primary" />
                    <span className="text-sm lg:text-balance">مقالات</span>
                  </Link>
                  <Link
                    className=" p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/rules"}
                  >
                    <BookText className="size-4.5  text-primary" />
                    <span className="text-sm lg:text-balance">قوانین و شرایط خرید</span>
                  </Link>
                  <Link
                    className=" p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/contactus"}
                  >
                    <Phone className="size-4.5  text-primary" />
                    <span className="text-sm lg:text-balance">تماس با ما</span>
                  </Link>
                  <Link
                    className=" p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/aboutus"}
                  >
                    <CircleQuestionMark className="size-4.5  text-primary" />
                    <span className="text-sm lg:text-balance">درباره ما</span>
                  </Link>
                </nav>
              </div>
              {/* col-3 */}
              <div className=" ">
                <p className="font-bold text-primary border-b-2 border-primary text-balance lg:text-lg flex items-center pb-1">
                  <InfoIcon className="size-4.5  ml-1" />
                اطلاعات تماس
                </p>
                <nav className="flex flex-col gap-3 mt-4">
                  <Link
                    className="p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/"}
                  >
                    <Phone className="size-4.5  text-primary" />
                    <span className="text-sm lg:text-balance">۰۹۱۲-۳۴۵-۶۷۸۹</span>
                  </Link>
                  <Link
                    className=" p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/"}
                  >
                    <Mail className="size-4.5  text-primary" />
                    <span className="text-sm lg:text-balance">info@example.com</span>
                  </Link>
                  <Link
                    className=" p-1 lg:p-1.5 transition-all duration-500 ease-linear flex items-center gap-1 "
                    href={"/"}
                  >
                    <Map className="size-4.5!  text-primary" />
                    <span className="text-sm lg:text-balance">آدرس: شیراز، معالی آباد پلاک 2</span>
                  </Link>
                  
                </nav>
              </div>
              {/* col-4 */}
              <div className="col-span-3 lg:col-span-1">
                <p className="font-bold text-primary border-b-2 border-primary text-balance lg:text-lg flex items-center pb-1">
                  <AwardIcon className="size-4.5  ml-1" />
                مجوزها
                </p>
                <div className="flex gap-5 items-center justify-center mt-8">
                    <Image className="border-2 border-primary rounded-sm size-20" src={'/images/rezi.webp'} width={150} height={150} alt="rezi logo"/>
                    <Image className="border-2 border-primary rounded-sm size-20" src={'/images/namad3.png'} width={150} height={150} alt="namad logo"/>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

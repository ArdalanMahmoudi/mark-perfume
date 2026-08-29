import React from 'react';
import Megamenu from './Megamenu';
import ActiveLink from '../common/ActiveLink';
import { BookText, CircleQuestionMark, FileText, Home, Phone, ShoppingCart } from 'lucide-react';
import { CiInstagram, CiLinkedin } from 'react-icons/ci';
import { PiWhatsappLogoThin } from 'react-icons/pi';
import Link from 'next/link';

const NavBottomHeader = ({isSticky}:{isSticky:boolean}) => {
    return (
        <div
            className={`${isSticky ? "max-h-0 opacity-0 hidden" : "opacity-100 max-h-10 lg:flex"} transition-all duration-200 hidden items-center justify-between`}
          >
            <nav className="flex gap-4 text-sm">
              {/* Mega-menu */}
              <Megamenu />
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/"}
              >
                <Home className="size-4.5 text-primary" />
                <span>خانه</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/shop"}
              >
                <ShoppingCart className="size-4.5 text-primary" />
                <span>فروشگاه</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/blogs"}
              >
                <FileText className="size-4.5 text-primary" />
                <span>مقالات</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/rules"}
              >
                <BookText className="size-4.5 text-primary" />
                <span>قوانین و شرایط خرید</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/contactus"}
              >
                <Phone className="size-4.5 text-primary" />
                <span>تماس با ما</span>
              </ActiveLink>
              <ActiveLink
                activeClassName="border-b-2 border-primary"
                className="  p-1.5  flex items-center gap-1 "
                href={"/aboutus"}
              >
                <CircleQuestionMark className="size-4.5 text-primary" />
                <span>درباره ما</span>
              </ActiveLink>
            </nav>
            {/* Social link */}
            <div className="flex items-center gap-4">
              <Link 
                href={"/"}
                className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"
              >
                <CiInstagram className="size-5 text-primary" />
              </Link>
              <Link
                href={"/"}
                className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"
              >
                <PiWhatsappLogoThin className="size-5 text-primary" />
              </Link>
              <Link
                href={"/"}
                className="size-10 bg-white flex items-center justify-center border border-grey220 rounded-full"
              >
                <CiLinkedin className="size-5 text-primary" />
              </Link>
            </div>
          </div>
    );
}

export default NavBottomHeader;

import Link from "next/link";
import React from "react";

type LinkBreadCrumbs = {
  href: string;
  label: string;
};

type BreadCrumbsProps = {
  links: LinkBreadCrumbs[];
  separator?: string;
  textClass?: string;
  secondTextClass?: string;
  classNameWrapper?:boolean
};

const BreadCrumbs = ({
  links = [],
  separator = "/",
  textClass = "",
  secondTextClass = "",
  classNameWrapper = false
}: BreadCrumbsProps) => {
  const isClassNameWrapper = "my-8 bg-secondary py-4 text-primary border border-grey220"
  return (
    <section>
      <div className={classNameWrapper === true && isClassNameWrapper}>
        <div className="m-auto text-sm max-w-7xl px-5">
          <ol className="flex list-none ">
            {links?.map((link, idx) => (
              <li key={idx} className="flex items-center">
                {idx < links?.length - 1 ? (
                  <Link
                    className={`${textClass} text-base cursor-pointer`}
                    href={link?.href}
                  >
                    <span>{link?.label}</span>
                  </Link>
                ) : (
                  <span className={`${secondTextClass} text-muted-foreground`}>{link.label}</span>
                )}
                {idx < links.length - 1 && (
                  <span className="mx-2 ">{separator}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbs;

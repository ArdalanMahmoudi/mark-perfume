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
};

const BreadCrumbs = ({
  links = [],
  separator = "/",
  textClass = "",
  secondTextClass = "",
}: BreadCrumbsProps) => {
  return (
    <section>
      <div className="my-8 bg-secondary py-4 text-primary border border-grey220">
        <div className="m-auto text-sm max-w-7xl px-5">
          <ol className="flex list-none ">
            {links?.map((link, idx) => (
              <li key={idx} className="flex items-center">
                {idx < links?.length - 1 ? (
                  <Link
                    className={`${textClass} cursor-pointer`}
                    href={link?.href}
                  >
                    <span className={`${secondTextClass}`}>{link?.label}</span>
                  </Link>
                ) : (
                  <span className={`${secondTextClass}`}>{link.label}</span>
                )}
                {idx < links.length - 1 && (
                  <span className="mx-2 text-primary">{separator}</span>
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

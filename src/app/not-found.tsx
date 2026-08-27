import React from "react";
import Container from "../components/common/Container";
import { HeartCrack } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";

const NotFound = () => {
  return (
    <section>
      <Container>
        {/* 404 Layout  */}
        <div className="my-20 flex flex-col gap-5 items-center">
          <p className="flex justify-center items-center text-primary text-9xl font-bold gap-2.5">
            4
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="95"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-face-slightly-frowning-icon lucide-face-slightly-frowning text-5xl font-bold p-5 rounded-full shadow-sm shadow-grey220 bg-secondary animate-bounce"
            >
              <path d="M15 10V9" />
              <path d="M9 10V9" />
              <path d="M9 16a5 5 0 016 0" />
              <circle cx="12" cy="12" r="10" />
            </svg>
           
            4
          </p>
          <p className="font-bold leading-8">اوه! به نظر می‌آید که <span className="text-primary">گم شده اید</span>.</p>
          <Link href={"/"}>
          <Button className="rounded-4xl text-base px-5 h-10 hover:bg-secondary hover:text-primary transition-colors duration-300 cursor-pointer border border-primary">برگشت به سایت</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;

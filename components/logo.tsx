import Link from "next/link";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Kanit } from "next/font/google";
const font = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className={cn("text-lg text-neutral-700 pb-1", font.className)}>
          TrellingNotes
        </p>
      </div>
    </Link>
  );
};

export default logo;

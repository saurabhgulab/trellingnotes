import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex font-bold items-center justify-center flex-col",
          font.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No.1 Task Management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          We help teams move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-blue-700 to-red-700 text-white px-4 py-2 rounded-md pb-4 w-fit">
          {" "}
          WorkForward
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-700 mt-4 mx-w-xs md:max-w-2xl text-center mx-auto",
          font.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks.{" "}
      </div>
      <div className="text-sm md:text-xl text-neutral-700 mx-w-xs md:max-w-2xl text-center mx-auto">
        -accomplish it all with TrellingNotes
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;

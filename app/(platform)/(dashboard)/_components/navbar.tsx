import React from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobileSidebar";

const navbar = () => {
  return (
    <nav className="fixed w-full h-14 px-4 items-center z-50 top-0 shadow-sm bg-white flex">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="md:flex hidden">
          <Logo />
        </div>
        <Button
          size="sm"
          variant="primary"
          className="rounded-sm hidden md:block h-auto py-1.5 px-2 "
        >
          Create
        </Button>
        <Button variant="primary" className="rounded-sm block md:hidden">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          afterSwitchSessionUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                width: 30,
                height: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default navbar;

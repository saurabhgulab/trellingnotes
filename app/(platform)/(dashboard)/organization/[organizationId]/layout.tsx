import { FC } from "react";
import { OrgControl } from "./_components/orgControl";
import { startCase } from "lodash";
import { auth, useAuth } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const { orgSlug } = authMiddleware();

  return {
    title: startCase(orgSlug || "organization"),
  };
}

interface OrganizationIdLayoutProps {
  children: React.ReactNode;
}

const OrganizationIdLayout: FC<OrganizationIdLayoutProps> = ({ children }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;

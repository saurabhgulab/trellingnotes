import { OrganizationSwitcher, auth } from "@clerk/nextjs";
const OrganizationIdPage = () => {
  const { orgId, userId } = auth();

  return <OrganizationSwitcher />;
};

export default OrganizationIdPage;

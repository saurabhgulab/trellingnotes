import { auth } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";
import prismadb from "@/lib/db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = authMiddleware();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await prismadb.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubsriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
  return !!isValid;
};

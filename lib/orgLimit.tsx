import { auth } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";
import prismadb from "@/lib/db";
import { MAX_FREE_BOARDS } from "@/constants/board";

export const incrementAvailableCount = async () => {
  const { orgId } = authMiddleware();

  if (!orgId) {
    throw new Error("Unauhtorized");
  }

  const orgLimit = await prismadb.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await prismadb.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await prismadb.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const decreaseAvailableCount = async () => {
  const { orgId } = authMiddleware();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await prismadb.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await prismadb.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await prismadb.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = authMiddleware();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await prismadb.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async () => {
  const { orgId } = authMiddleware();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await prismadb.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};

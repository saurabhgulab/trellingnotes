"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";

import { CreateSafeAction } from "@/lib/createSafeActions";
import prismadb from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { DeleteCard } from "./schema";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = authMiddleware();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let card;

  try {
    card = await prismadb.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};
export const deleteCard = CreateSafeAction(DeleteCard, handler);

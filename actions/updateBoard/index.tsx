"use server";

import { auth } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import prismadb from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/createSafeActions";
import { UpdateBoard } from "./schema";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = authMiddleware();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;

  let board;

  try {
    board = await prismadb.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = CreateSafeAction(UpdateBoard, handler);

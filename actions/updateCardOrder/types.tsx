import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/createSafeActions";
import { UpdateCardOrder } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;

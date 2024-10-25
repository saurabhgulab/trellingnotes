import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/createSafeActions";
import { DeleteBoard } from "./schema";

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType, Board>;

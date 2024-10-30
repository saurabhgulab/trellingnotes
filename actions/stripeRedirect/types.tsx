import { z } from "zod";
import { ActionState } from "@/lib/createSafeActions";
import { StripeRedirect } from "./schema";

export type InputType = z.infer<typeof StripeRedirect>;
export type ReturnType = ActionState<InputType, String>;

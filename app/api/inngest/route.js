import { serve } from "inngest/nextjs";
import { inngest, syncUserCreation, syncUserDelete, syncUserUpdate } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdate,
    syncUserDelete
  ],
});
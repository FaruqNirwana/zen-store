import { serve } from "inngest/next";
import { 
  syncUserCreation, 
  syncUserDelete, 
  syncUserUpdate 
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdate,
    syncUserDelete,
  ],
});

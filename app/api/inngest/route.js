import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";

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

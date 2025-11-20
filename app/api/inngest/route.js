import { serve } from "inngest/next";

import { 
  inngest,
  syncUserCreation, 
  syncUserDelete, 
  syncUserUpdate 
} from "@/config/inngest";

// Configure route to be dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdate,
    syncUserDelete,
  ],
  // Signing key is automatically read from INNGEST_SIGNING_KEY environment variable
  // Make sure it's set in your Vercel environment variables
});

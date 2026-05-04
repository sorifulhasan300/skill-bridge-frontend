import * as z from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    SESSION_URL: z.url(),
    FRONTEND_URL: z.url(),
  },
  client: {
    API_URL: z.string().url().optional(),
  },

  runtimeEnv: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
    SESSION_URL: process.env.SESSION_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },
});

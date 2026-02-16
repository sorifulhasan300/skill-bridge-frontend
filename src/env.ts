import * as z from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    API_URL: z.url(),
    SESSION_URL: z.url(),
    FRONTEND_URL: z.url(),
  },

  runtimeEnv: {
    API_URL: process.env.API_URL,
    SESSION_URL: process.env.SESSION_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },
});

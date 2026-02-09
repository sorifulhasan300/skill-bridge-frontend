import * as z from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    SESSION_URL: z.url(),
    FRONTEND_URL: z.url(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_URL: process.env.SESSION_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },
});

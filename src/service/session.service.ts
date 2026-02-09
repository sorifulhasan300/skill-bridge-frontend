import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookiesData = await cookies();
      const res = await fetch(env.SESSION_URL as string, {
        headers: {
          Cookie: cookiesData.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: "cookies not found" };
      }
      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: "something was wrong" };
    }
  },
};

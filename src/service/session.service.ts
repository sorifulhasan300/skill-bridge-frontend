import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(
        "http://localhost:5000/api/auth/get-session" as string,
        {
          headers: {
            Cookie: cookiesStore.toString(),
          },
          cache: "no-store",
        },
      );
      const session = await res.json();

      if (session === null) {
        return { data: null, error: "cookies not found" };
      }
      return { data: session, error: null };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },
};

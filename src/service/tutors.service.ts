import { env } from "@/env";

export const tutorService = {
  getFeaturedTutors: async () => {
    try {
      const res = await fetch(`${env.DATABASE_URL}/tutors/featured`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: "Failed to fetch tutors" };
      }

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Network error" };
    }
  },
};

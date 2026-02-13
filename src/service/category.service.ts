import { env } from "@/env";
import { cookies } from "next/headers";

export const categoryService = {
  getCategories: async function (searchTerm: string) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(
        `http://localhost:5000/api/category${searchTerm ? `?search=${searchTerm}` : ""}` as string,
        {
          headers: {
            Cookie: cookiesStore.toString(),
          },
          cache: "no-store",
        },
      );
      const categories = await res.json();

      if (categories === null) {
        return { data: null, error: "cookies not found" };
      }
      return { data: categories, error: null };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },
};

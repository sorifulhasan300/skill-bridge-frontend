import { env } from "@/env";
import { cookies } from "next/headers";

export const categoryService = {
  getCategories: async function (searchTerm?: string) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/category${searchTerm ? `?search=${searchTerm}` : ""}` as string,
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
  allCategoriesAdmin: async function () {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/category`, {
        headers: {
          Cookie: cookiesStore.toString(),
        },
        cache: "no-store",
      });
      const categories = await res.json();

      if (categories === null) {
        return { data: null, error: "cookies not found" };
      }
      return { data: categories || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },

  createCategory: async (formData: { name: string; icon: string }) => {
    try {
      const cookiesStore = await cookies();
      const response = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookiesStore.toString(),
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.message || "Failed to create category",
        };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "Network error occurred" };
    }
  },

  updateCategoryData: async (
    id: string,
    updatedPayload: { name: string; icon: string },
  ) => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/category/${id}/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPayload),
        },
      );
      res;
      const result = await res.json();

      if (!res.ok) {
        return {
          message: null,
          error: result.message || "Failed to update category",
          success: false,
        };
      }

      return {
        message: result.message || "Category updated successfully",
        error: null,
        success: true,
      };
    } catch (error) {
      return {
        message: null,
        error: "Server connection failed. Please try again.",
        success: false,
      };
    }
  },
};

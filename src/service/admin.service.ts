import { env } from "@/env";
import { UserStatus } from "@/types/user.types";
import { cookies } from "next/headers";
export const adminService = {
  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const res = await fetch(`${env.DATABASE_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
        next: { revalidate: 0 },
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: result.message || "Failed to fetch users",
        };
      }

      return { data: result.data, error: null };
    } catch (error) {
      console.error("Fetch Users Error:", error);
      return {
        data: null,
        error: "Network error. Please try again later.",
      };
    }
  },
  updateUserStatus: async (id: string, newStatus: UserStatus) => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const res = await fetch(`${env.DATABASE_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },

        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: result.message || "Failed to update user",
        };
      }

      return { data: result.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: "Network error. Please try again later.",
      };
    }
  },
};

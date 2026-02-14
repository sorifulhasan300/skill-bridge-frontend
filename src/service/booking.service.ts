import { env } from "@/env";
import { cookies } from "next/headers";

export const bookingService = {
  getMyBookings: async () => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const res = await fetch(`${env.DATABASE_URL}/api/bookings`, {
        headers: {
          Cookie: allCookies,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: "failed to fetch booking" };
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },
  getTutorBookings: async () => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const res = await fetch(`${env.DATABASE_URL}/api/bookings/tutor`, {
        headers: {
          Cookie: allCookies,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: "failed to fetch booking" };
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },

  getAdminBookings: async () => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const res = await fetch(`${env.DATABASE_URL}/api/bookings/admin`, {
        headers: {
          Cookie: allCookies,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: "failed to fetch booking" };
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },

  updateBooking: async (bookingId: string, status: string) => {
    const cookieStore = await cookies();
    const Cookies = cookieStore.toString();

    try {
      const res = await fetch(`${env.DATABASE_URL}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: Cookies,
        },
        body: JSON.stringify({ status: status }),
      });

      const contentType = res.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = { message: await res.text() };
      }

      if (!res.ok) {
        return {
          success: false,
          data: null,
          error: result.message || result.error || "Update failed",
        };
      }

      return { success: true, data: result.data, error: null };
    } catch (error) {
      console.error("Service Error:", error);
      return { success: false, data: null, error: "Network connection failed" };
    }
  },
};

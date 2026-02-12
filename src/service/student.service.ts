import { env } from "@/env";
import { cookies } from "next/headers";

export const studentService = {
  updateBooking: async (bookingId: string) => {
    const cookieStore = await cookies();
    const Cookies = cookieStore.toString();

    try {
      const res = await fetch(`${env.DATABASE_URL}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: Cookies,
        },
        body: JSON.stringify({ status: "CANCELLED" }),
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

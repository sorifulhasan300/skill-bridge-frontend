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
      console.error("Fetch Error:", error);
      return { data: null, error: "Network error" };
    }
  },
};

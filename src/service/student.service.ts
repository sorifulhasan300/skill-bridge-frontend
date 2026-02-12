import { env } from "@/env";

export const studentService = {
  getProfile: async (bookingId: string) => {
    try {
      const res = await fetch(`${env.DATABASE_URL}/api/bookings/${bookingId}`);
      if (!res.ok) {
        return { data: null, error: "Failed to update booking" };
      }
      const data = await res.json();
      return { data: data, error: "Failed to update booking" };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },
};

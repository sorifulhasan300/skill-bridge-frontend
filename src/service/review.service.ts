import { env } from "@/env";
import { ReviewPayload } from "@/types/review.types";
import { cookies } from "next/headers";

export const reviewService = {
  postReviewAndCloseBooking: async (reviewPayload: ReviewPayload) => {
    console.log(reviewPayload);
    try {
      const cookiesStore = await cookies();
      const response = await fetch(`${env.DATABASE_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        body: JSON.stringify(reviewPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to process review and booking",
        };
      }

      return { success: true, data: data };
    } catch (error: unknown) {
      console.error("Fetch Error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { BookingPayload, QueryOptions } from "@/types/booking.typs";
import { cookies } from "next/headers";

export const bookingService = {
  getMyBookings: async () => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const res = await fetch(`${env.API_URL}/api/bookings/student`, {
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

      const res = await fetch(`${env.API_URL}/api/bookings/tutor`, {
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

  getAdminBookings: async (queryOptions?: QueryOptions) => {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      const params = new URLSearchParams();

      // ?search=xyz
      if (queryOptions?.search) {
        params.append("search", queryOptions.search);
      }

      // ?filters[status]=CONFIRMED
      if (queryOptions?.filters) {
        Object.entries(queryOptions.filters).forEach(([key, value]) => {
          params.append(`filters[${key}]`, String(value));
        });
      }

      // sort is Record<string, 'asc' | 'desc'>
      // → ?sort[createdAt]=desc
      if (queryOptions?.sort) {
        Object.entries(queryOptions.sort).forEach(([key, value]) => {
          params.append(`sort[${key}]`, value);
        });
      }

      // ?page=1&limit=10
      if (queryOptions?.pagination) {
        params.append("page", String(queryOptions.pagination.page));
        params.append("limit", String(queryOptions.pagination.limit));
      }

      const url = `${env.API_URL}/api/bookings/admin${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await fetch(url, {
        headers: { Cookie: allCookies },
        cache: "no-store",
      });

      if (!res.ok) return { data: null, error: "Failed to fetch bookings" };

      const data = await res.json();
      return { data, error: null };
    } catch {
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
      const res = await fetch(`${env.API_URL}/api/bookings/${bookingId}`, {
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

  CreateBooking: async (payload: BookingPayload) => {
    const Cookies = (await cookies()).toString();
    try {
      const response = await fetch(`${env.API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: Cookies,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: null,
          error: data.message || "Booking Failed!",
        };
      }

      return {
        success: true,
        message: "Booking confirmed!",
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        message: null,
        error: "Network connection failed",
      };
    }
  },
  handleAttendance: async (bookingId: string, currentStatus: boolean) => {
    try {
      const Cookies = (await cookies()).toString();

      const response = await fetch(
        `${env.API_URL}/api/bookings/${bookingId}/attend/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Cookie: Cookies },
          body: JSON.stringify({ isAttending: currentStatus }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: null,
          error: data.message || "Attend Failed!",
        };
      }
      return { success: true, message: "Student attended", error: null };
    } catch (error) {
      return {
        success: false,
        message: null,
        error: "Network connection failed",
      };
    }
  },
};

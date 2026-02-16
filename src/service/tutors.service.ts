import { env } from "@/env";
import { cookies } from "next/headers";

export const tutorService = {
  getFeaturedTutors: async () => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/featured`,
        {
          cache: "no-store",
        },
      );

      if (!res.ok) {
        return { data: null, error: "Failed to fetch tutors" };
      }

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Network error" };
    }
  },

  //================================ all tutors =================================
  getAllTutors: async (params: string) => {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, value.toString());
        });
      }

      const queryString = queryParams.toString();
      const url = `${env.NEXT_PUBLIC_BACKEND_URL}/api/tutors${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: "Failed to fetch tutors" };
      }

      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      console.error("Fetch Error:", error);
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },

  getTutorById: async (id: string) => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/${id}`,
        {
          cache: "no-store",
        },
      );

      if (!res.ok) {
        return { data: null, error: "Failed to fetch tutors" };
      }

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },

  getTutorProfile: async () => {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/tutor/profile`,
        {
          headers: {
            Cookie: cookiesStore.toString(),
          },
          cache: "no-store",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: result.message || "Failed to update profile",
        };
      }

      return { data: result, error: null };
    } catch (error) {
      console.error("API Error:", error);
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },

  updateTutorProfile: async (payload: Record<string, unknown>) => {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/update/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookiesStore.toString(),
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: result.message || "Failed to update profile",
        };
      }

      return { data: result, error: null };
    } catch (error) {
      console.error("API Error:", error);
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },

  createTutorProfile: async (payload: Record<string, unknown>) => {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/create-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookiesStore.toString(),
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        },
      );

      const result = await res.json();
      result;

      if (!res.ok) {
        return {
          data: null,
          error: result.message || "Failed to create profile",
        };
      }

      return { data: result, error: null };
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },
};

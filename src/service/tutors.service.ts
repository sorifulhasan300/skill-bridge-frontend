import { env } from "@/env";
import { cookies } from "next/headers";

export const tutorService = {
  getFeaturedTutors: async () => {
    try {
      const res = await fetch(`${env.DATABASE_URL}/api/tutors/featured`, {
        cache: "no-store",
      });

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
  getAllTutors: async () => {
    try {
      const res = await fetch(`${env.DATABASE_URL}/api/tutors`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: "Failed to fetch tutors" };
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

  getTutorById: async (id: string) => {
    try {
      const res = await fetch(`${env.DATABASE_URL}/api/tutors/${id}`, {
        cache: "no-store",
      });

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
};

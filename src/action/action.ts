"use server";

import { userService } from "@/service/session.service";
import { tutorService } from "@/service/tutors.service";

export const getSession = async () => {
  return await userService.getSession();
};

export const getTutorDetailsById = async (id: string) => {
  return await tutorService.getTutorById(id);
};

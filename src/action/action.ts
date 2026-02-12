"use server";

import { userService } from "@/service/session.service";
import { studentService } from "@/service/student.service";
import { tutorService } from "@/service/tutors.service";

export const getSession = async () => {
  return await userService.getSession();
};

export const getTutorDetailsById = async (id: string) => {
  return await tutorService.getTutorById(id);
};

export const updateStudentBookingStatus = async (id: string) => {
  const result = await studentService.updateBooking(id);
  return result;
};

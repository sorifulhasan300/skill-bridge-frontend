"use server";

import { bookingService } from "@/service/booking.service";
import { categoryService } from "@/service/category.service";
import { userService } from "@/service/session.service";
import { studentService } from "@/service/student.service";
import { tutorService } from "@/service/tutors.service";

export const getSession = async () => {
  return await userService.getSession();
};

export const getTutorDetailsById = async (id: string) => {
  return await tutorService.getTutorById(id);
};

export const updateStudentBookingStatus = async (
  id: string,
  status: string,
) => {
  const result = await bookingService.updateBooking(id, status);
  return result;
};

export const getCategories = async (searchTerm: string) => {
  const result = await categoryService.getCategories(searchTerm);
  return result;
};

"use server";

import { adminService } from "@/service/admin.service";
import { bookingService } from "@/service/booking.service";
import { categoryService } from "@/service/category.service";
import { userService } from "@/service/session.service";
import { tutorService } from "@/service/tutors.service";
import { BookingPayload } from "@/types/booking.typs";
import { UserStatus } from "@/types/user.types";

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
export const createTutorProfile = async (payload: Record<string, unknown>) => {
  const result = await tutorService.createTutorProfile(payload);
  return result;
};

export const updateTutorProfile = async (payload: Record<string, unknown>) => {
  const result = await tutorService.updateTutorProfile(payload);
  return result;
};

export const getAllUsers = async () => {
  const result = await adminService.getAllUsers();
  return result;
};

export const updateUserStatus = async (id: string, status: UserStatus) => {
  const result = await adminService.updateUserStatus(id, status);
  return result;
};

export const createCategory = async (formData: {
  name: string;
  icon: string;
}) => {
  const result = await categoryService.createCategory(formData);
  return result;
};

export const updateCategory = async (
  id: string,
  updatedPayload: {
    name: string;
    icon: string;
  },
) => {
  console.log(updatedPayload, id);
  const result = await categoryService.updateCategoryData(id, updatedPayload);
  return result;
};

export const createBooking = async (BookingPayload: BookingPayload) => {
  const result = await bookingService.CreateBooking(BookingPayload);
  return result;
};

export const handleAttendance = async (
  bookingId: string,
  currentStatus: boolean,
) => {
  const result = await bookingService.handleAttendance(
    bookingId,
    currentStatus,
  );
  return result;
};

import AdminBookingTable from "@/components/admin-dashboard/BookingTable";
import { bookingService } from "@/service/booking.service";
import React from "react";

export default async function AdminBookingPage() {
  const response = await bookingService.getAdminBookings();
  const bookings = response?.data?.data || [];
  return (
    <div className="mt-10">
      <h1 className="font-bold mb-4">All Bookings</h1>
      <AdminBookingTable bookings={bookings}></AdminBookingTable>
    </div>
  );
}

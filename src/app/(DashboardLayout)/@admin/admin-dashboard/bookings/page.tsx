import AdminBookingTable from "@/components/admin-dashboard/BookingTable";
import { bookingService } from "@/service/booking.service";
import React from "react";

export default async function AdminBookingPage() {
  const { data, error } = await bookingService.getAdminBookings();
  return (
    <div className="mt-10">
      <h1 className="font-bold mb-4">All Bookings</h1>
      <AdminBookingTable bookings={data.data}></AdminBookingTable>
    </div>
  );
}

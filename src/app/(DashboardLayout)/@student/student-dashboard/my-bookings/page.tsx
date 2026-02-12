import BookingTable from "@/components/student-dashboard/BookingTable";
import { bookingService } from "@/service/booking.service";
import React from "react";

export default async function MyBookings() {
  const { data } = await bookingService.getMyBookings();
  return (
    <div className="mt-10">
      <h1 className="font-bold mb-4">Booking History</h1>
      <BookingTable bookings={data?.data}></BookingTable>
    </div>
  );
}

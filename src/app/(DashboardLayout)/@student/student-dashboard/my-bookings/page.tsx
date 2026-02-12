import BookingTable from "@/components/student-dashboard/BookingTable";
import { bookingService } from "@/service/booking.service";
import React from "react";

export default async function MyBookings() {
  const { data, error } = await bookingService.getMyBookings();
  console.log("booking data", data);
  return (
    <div>
      <BookingTable></BookingTable>
    </div>
  );
}

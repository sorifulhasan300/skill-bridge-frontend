import BookingTable from "@/components/tutor-dashboard/BookingTable";
import { bookingService } from "@/service/booking.service";
import React from "react";

export default async function TutorBookingPage() {
  const { data } = await bookingService.getTutorBookings();

  return (
    <div className="mt-10">
      <h1 className="font-bold mb-4">Booking History</h1>
      <BookingTable bookings={data?.data}></BookingTable>
    </div>
  );
}

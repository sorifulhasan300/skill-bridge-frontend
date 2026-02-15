"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Booking } from "@/types/booking.typs";

export default function BookingTable({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="border rounded-md m-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Student Email</TableHead>
            <TableHead>Session Start</TableHead>
            <TableHead>Session End</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.length > 0 ? (
            bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  {booking.amount} Taka
                </TableCell>
                <TableCell>
                  <span
                    className={
                      booking.status === "CONFIRMED"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {booking.student?.name || "N/A"}
                </TableCell>
                <TableCell className="font-medium">
                  {booking.student?.email || "N/A"}
                </TableCell>
                <TableCell>
                  {new Date(booking.startTime).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(booking.endTime).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No bookings found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

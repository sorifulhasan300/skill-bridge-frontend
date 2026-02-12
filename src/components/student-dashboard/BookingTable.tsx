import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Booking } from "@/types/booking.typs";
import { MoreHorizontalIcon } from "lucide-react";
export default function BookingTable({ bookings }: { bookings: Booking[] }) {
  console.log(bookings);
  return (
    <div className="border rounded-md m-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Session Start</TableHead>
            <TableHead>Session End</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                {booking.amount} Taka
              </TableCell>
              <TableCell>
                <span
                  className={
                    booking.status === "CONFIRMED"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {booking.status}
                </span>
              </TableCell>
              <TableCell>
                {new Date(booking.startTime).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(booking.endTime).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem variant="destructive">
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

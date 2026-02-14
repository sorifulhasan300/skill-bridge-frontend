"use client";

import { useState } from "react";
import { updateStudentBookingStatus } from "@/action/action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Booking } from "@/types/booking.typs";
import { MoreHorizontalIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function BookingTable({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [isPending, setIsPending] = useState(false);

  const handleComplete = async (id: string, status: string) => {
    try {
      setIsPending(true);
      const { data, error, success } = await updateStudentBookingStatus(
        id,
        status,
      );

      if (success) {
        router.refresh();
        setIsAlertOpen(false);
        toast.success("Successfully Update");
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
      setSelectedBookingId(null);
    }
  };

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

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.length > 0 ? (
            bookings.map((booking) => (
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
                  {booking.student.name}
                </TableCell>
                <TableCell className="font-medium">
                  {booking.student.email}
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
                        <MoreHorizontalIcon className="size-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => {
                          setSelectedBookingId(booking.id);
                          setIsAlertOpen(true);
                        }}
                      >
                        Complete session
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No bookings found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently cancel your
              scheduled session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Close</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                if (selectedBookingId)
                  handleComplete(selectedBookingId, "COMPLETED");
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing...
                </>
              ) : (
                "Yes, Complete Booking"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

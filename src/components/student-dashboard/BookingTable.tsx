"use client";

import { useState } from "react";
import {
  handleAttendance,
  postReviewAndCloseBooking,
  updateStudentBookingStatus,
} from "@/action/action";
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
import { ReviewDialog } from "./ReviewDialog";

export default function BookingTable({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [isPending, setIsPending] = useState(false);

  const handleCancelBooking = async (id: string, status: string) => {
    setIsPending(true);

    const toastId = toast.loading("booking updating...");

    try {
      const { data, error, success } = await updateStudentBookingStatus(
        id,
        status,
      );

      if (success) {
        router.refresh();
        setIsAlertOpen(false);
        toast.success("Successfully Update", { id: toastId });
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setSelectedBookingId(null);
      setIsPending(false);
    }
  };

  const handleAttending = async (
    bookingId: string,
    currentAttendStatus: boolean,
  ) => {
    // Removed unused expression
    const toastId = toast.loading("attend updating...");

    try {
      const nextStatus = !currentAttendStatus;

      const result = await handleAttendance(bookingId, nextStatus);

      if (result?.success) {
        toast.success(
          nextStatus ? "Marked as Attended!" : "Marked as Absent/Left",
          { id: toastId },
        );
        window.location.reload();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error: unknown) {
      let errorMessage = "Something went wrong!";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, {
        id: toastId,
      });
    }
  };

  const handleLeaveClick = (booking: Booking) => {
    setActiveBooking(booking);
    setIsReviewOpen(true);
  };
  const onReviewSubmit = async (reviewData: {
    rating: number;
    comment: string;
  }) => {
    if (!activeBooking) {
      toast.error("No active booking found!");
      return;
    }
    const toastId = toast.loading("Review loading...");
    try {
      const payload = {
        tutorId: activeBooking.tutorId,
        studentId: activeBooking.studentId,
        bookingId: activeBooking.id,
        comment: reviewData.comment,
        rating: reviewData.rating,
      };

      const { success, message } = await postReviewAndCloseBooking(payload);

      if (success) {
        toast.success("Review submitted! The session is closed.", {
          id: toastId,
        });
        setIsReviewOpen(false);
        window.location.reload();
      } else {
        toast.error(message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        id: toastId,
      });
    }
  };
  return (
    <div className="border rounded-md m-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Attend</TableHead>
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
                <TableCell>
                  {booking.studentAttend ? "Attended" : "Not Attend"}
                </TableCell>

                <TableCell>{booking.startTime} PM</TableCell>
                <TableCell>{booking.endTime} PM</TableCell>

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
                        Cancel Booking
                      </DropdownMenuItem>
                      {booking.status === "CONFIRMED" && (
                        <>
                          {!booking.studentAttend ? (
                            <DropdownMenuItem
                              className="text-green-600 focus:text-green-600"
                              onSelect={() =>
                                handleAttending(booking.id, false)
                              }
                            >
                              Mark Attend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-orange-600 focus:text-orange-600"
                              onSelect={() => handleLeaveClick(booking)}
                            >
                              Leave & Review
                            </DropdownMenuItem>
                          )}
                        </>
                      )}
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
                  handleCancelBooking(selectedBookingId, "CANCELLED");
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Yes, Cancel Booking"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ReviewDialog
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={onReviewSubmit}
      />
    </div>
  );
}

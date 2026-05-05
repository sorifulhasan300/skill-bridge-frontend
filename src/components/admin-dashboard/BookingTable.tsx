"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Booking } from "@/types/booking.typs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

interface BookingTableProps {
  bookings: Booking[];
}

export default function BookingTable({ bookings }: BookingTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Updates a single param, preserves the rest
  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  // 400ms debounce — avoids API call on every keystroke
  const handleSearch = useDebouncedCallback((value: string) => {
    updateParam("search", value);
  }, 400);

  return (
    <div className="border rounded-md m-4">
      {/* ── Controls ── */}
      <div className="p-4 flex gap-4 items-center flex-wrap">
        {/* Search — matches studentName, studentEmail, tutorName, tutorEmail on backend */}
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search by student or tutor name / email..."
            defaultValue={searchParams.get("search") ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Status filter → filters[status] on backend */}
        <Select
          value={searchParams.get("status") ?? "ALL"}
          onValueChange={(val) =>
            updateParam("status", val === "ALL" ? "" : val)
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort field → sort[field] on backend */}
        <Select
          value={searchParams.get("sortBy") ?? "DEFAULT"}
          onValueChange={(val) =>
            updateParam("sortBy", val === "DEFAULT" ? "" : val)
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DEFAULT">Default</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
            <SelectItem value="createdAt">Date</SelectItem>
            <SelectItem value="startTime">Start Time</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort order → sort[field]: asc | desc */}
        <Select
          value={searchParams.get("sortOrder") ?? "asc"}
          onValueChange={(val) => updateParam("sortOrder", val)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ── Table ── */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Student Email</TableHead>
            <TableHead>Tutor Name</TableHead>
            <TableHead>Session Start</TableHead>
            <TableHead>Session End</TableHead>
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
                        : booking.status === "CANCELLED"
                          ? "text-red-500 font-semibold"
                          : "text-yellow-600 font-semibold"
                    }
                  >
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell>{booking.student?.name || "N/A"}</TableCell>
                <TableCell>{booking.student?.email || "N/A"}</TableCell>
                <TableCell>{booking.student?.user?.name || "N/A"}</TableCell>
                <TableCell>{booking.startTime}</TableCell>
                <TableCell>{booking.endTime}</TableCell>
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

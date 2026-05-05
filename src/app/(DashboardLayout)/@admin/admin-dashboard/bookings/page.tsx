// app/admin/bookings/page.tsx
import { Suspense } from "react";
import AdminBookingTable from "@/components/admin-dashboard/BookingTable";
import { bookingService } from "@/service/booking.service";
import { QueryOptions } from "@/types/booking.typs";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: string;
    limit?: string;
  }>;
}

export default async function AdminBookingPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const queryOptions: QueryOptions = {
    search: params.search || undefined,

    filters: params.status ? { status: params.status } : undefined,

    // ✅ Record<string, 'asc' | 'desc'> format
    sort: params.sortBy
      ? { [params.sortBy]: params.sortOrder ?? "asc" }
      : undefined,

    includes: { student: true, tutor: true },

    pagination: params.page
      ? { page: Number(params.page), limit: Number(params.limit ?? 10) }
      : undefined,
  };

  const { data, error } = await bookingService.getAdminBookings(queryOptions);

  if (error) {
    return (
      <div className="mt-10">
        <h1 className="font-bold mb-4">All Bookings</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h1 className="font-bold mb-4">All Bookings</h1>
      <Suspense
        fallback={<p className="p-4 text-muted-foreground">Loading table…</p>}
      >
        <AdminBookingTable bookings={data?.data || []} />
      </Suspense>
    </div>
  );
}

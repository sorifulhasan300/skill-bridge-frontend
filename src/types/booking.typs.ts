export interface Booking {
  id: string;
  tutorId: string;
  studentId: string;
  amount: number;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
  startTime: string;
  studentAttend: boolean;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  student: {
    name: string;
    email: string;
  };
}

export type BookingPayload = {
  tutorId: string;
  studentId: string;
  day: string;
  slotId: string;
  startTime: string;
  endTime: string;
};

export interface QueryOptions {
  filters?: Record<string, string | number | boolean>;
  search?: string;
  sort?: Record<string, 'asc' | 'desc'>;
  pagination?: {
    page: number;
    limit: number;
  };
  includes?: Record<string, boolean>;
}

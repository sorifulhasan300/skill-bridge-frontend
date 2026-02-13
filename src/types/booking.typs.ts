export interface Booking {
  id: string;
  tutorId: string;
  studentId: string;
  amount: number;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  student: {
    name: string;
    email: string;
  };
}

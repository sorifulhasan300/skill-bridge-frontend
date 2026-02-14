export type TimeSlot = {
  id: string;
  start: string;
  end: string;
  isBooked: boolean;
};

export type TimeSlots = {
  fri: TimeSlot[];
  mon: TimeSlot[];
  sat: TimeSlot[];
  sun: TimeSlot[];
  thu: TimeSlot[];
  tue: TimeSlot[];
  wed: TimeSlot[];
};

export type Review = {
  comment: string;
  rating: number;
  student: {
    name: string;
    email: string;
    image: string;
  };
};

export type Tutor = {
  id: string;
  userId: string;
  title: string;
  bio: string;
  hourlyRate: number;
  isFeatured: boolean;
  experience: number;
  availability: "AVAILABLE" | "UNAVAILABLE";
  timeSlots: TimeSlots;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    status: "ACTIVE" | "BLOCKED" | "INACTIVE";
    image: string;
  };
  reviews: Review[];
};

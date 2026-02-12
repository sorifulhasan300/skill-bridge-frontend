import { Route } from "@/types/route.types";
import { CalendarDays, UserCircle } from "lucide-react";
export const studentRoutes: Route[] = [
  {
    title: "My Bookings",
    logo: CalendarDays,
    url: "/student-dashboard/my-bookings",
  },
  {
    title: "My Profile",
    logo: UserCircle,
    url: "/student-dashboard/my-profile",
  },
];

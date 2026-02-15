import { Route } from "@/types/route.types";
import {
  CalendarCheck,
  UserPlus,
  UserCog,
  UserCircle,
  Clock,
  LayoutDashboard,
} from "lucide-react";

export const tutorRoutes: Route[] = [
  {
    title: "Dashboard", 
    logo: LayoutDashboard,
    url: "/tutor-dashboard", 
  },
  {
    title: "Bookings",
    logo: CalendarCheck,
    url: "/tutor-dashboard/manage-booking",
  },
  {
    title: "Set Availability",
    logo: Clock,
    url: "/tutor-dashboard/set-availability",
  },
  {
    title: "Create Profile",
    logo: UserPlus,
    url: "/tutor-dashboard/create-profile",
  },
  {
    title: "Manage Profile",
    logo: UserCog,
    url: "/tutor-dashboard/tutor-profile",
  },
  {
    title: "My Profile",
    logo: UserCircle,
    url: "/tutor-dashboard/my-profile",
  },
];

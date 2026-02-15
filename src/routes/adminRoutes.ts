import { Route } from "@/types/route.types";
import {
  Users,
  CalendarCheck,
  LayoutGrid,
  LayoutDashboard,
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    logo: LayoutDashboard,
    url: "/admin-dashboard",
  },
  {
    title: "Manage Users",
    logo: Users,
    url: "/admin-dashboard/users",
  },
  {
    title: "All Bookings",
    logo: CalendarCheck,
    url: "/admin-dashboard/bookings",
  },
  {
    title: "Manage Categories",
    logo: LayoutGrid,
    url: "/admin-dashboard/categories",
  },
];

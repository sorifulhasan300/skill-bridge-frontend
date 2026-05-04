"use client";

import * as React from "react";
import { Frame, Map, PieChart } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Session } from "@/types/session.type";
import { Route } from "@/types/route.types";
import { Roles } from "@/constants/constants";
import { adminRoutes } from "@/routes/adminRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { Logo } from "./logo";
// This is sample data.


export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: Session }) {
  let routes: Route[] = [];
  switch (user?.user?.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.tutor:
      routes = tutorRoutes;
      break;
    case Roles.student:
      routes = studentRoutes;
      break;
    default:
      routes = [];
      break;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-6">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

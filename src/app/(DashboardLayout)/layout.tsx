import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Roles } from "@/constants/constants";
import { userService } from "@/service/session.service";
import React, { ReactNode } from "react";

export default async function layout({
  admin,
  student,
  tutor,
}: {
  admin: ReactNode;
  student: ReactNode;
  tutor: ReactNode;
}) {
  const { data, error } = await userService.getSession();
  const role = data?.user?.role;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex gap-4 w-full">
        {role === Roles.admin ? admin : student}
      </div>
    </SidebarProvider>
  );
}

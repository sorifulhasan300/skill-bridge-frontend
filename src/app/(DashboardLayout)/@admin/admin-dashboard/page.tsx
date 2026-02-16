import { StatsCards } from "@/components/admin-dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { adminService } from "@/service/admin.service";
import { Bell } from "lucide-react";
import React from "react";
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const response = await adminService.getStatistics();
  const stats = response?.data;
  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, Admin!
          </h1>
          <p className="text-muted-foreground">
            Heres whats happening with your classes today.
          </p>
        </div>
        <Button variant="outline" className="relative h-10 w-10 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
      </div>
      <StatsCards stats={stats}></StatsCards>
    </div>
  );
}

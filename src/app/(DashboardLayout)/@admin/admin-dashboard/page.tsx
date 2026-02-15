import { StatsCards } from "@/components/admin-dashboard/StatsCard";
import { adminService } from "@/service/admin.service";
import React from "react";
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const response = await adminService.getStatistics();
  const stats = response?.data;
  return (
    <div className="m-4">
      <StatsCards stats={stats}></StatsCards>
    </div>
  );
}

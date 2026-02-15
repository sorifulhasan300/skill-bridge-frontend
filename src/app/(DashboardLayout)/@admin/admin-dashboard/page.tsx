import { StatsCards } from "@/components/admin-dashboard/StatsCard";
import { adminService } from "@/service/admin.service";
import React from "react";

export default async function AdminDashboard() {
  const { data, error } = await adminService.getStatistics();
  console.log(data);
  return (
    <div className="m-4">
      <StatsCards stats={data}></StatsCards>
    </div>
  );
}

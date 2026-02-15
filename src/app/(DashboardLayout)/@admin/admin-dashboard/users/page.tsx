import { getAllUsers } from "@/action/action";
import ManageUsersTable from "@/components/admin-dashboard/ManageUsersTable";
import React from "react";

export default async function ManageUsersPage() {
  const { data, error } = await getAllUsers();
  data;
  return (
    <div className="m-4">
      <h1 className="font-bold mb-4">Users</h1>
      <ManageUsersTable users={data}></ManageUsersTable>
    </div>
  );
}

import ManageCategories from "@/components/admin-dashboard/CategoryTable";
import { categoryService } from "@/service/category.service";
import React from "react";
export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const { data } = await categoryService.allCategoriesAdmin();
  return (
    <div>
      <ManageCategories categories={data.data}></ManageCategories>
    </div>
  );
}

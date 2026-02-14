import ManageCategories from "@/components/admin-dashboard/CategoryTable";
import { categoryService } from "@/service/category.service";
import React from "react";

export default async function CategoriesPage() {
  const { data, error } = await categoryService.allCategoriesAdmin();
  return (
    <div>
      <ManageCategories categories={data.data}></ManageCategories>
    </div>
  );
}

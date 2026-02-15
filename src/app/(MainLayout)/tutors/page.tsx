// app/tutors/page.tsx
import { Suspense } from "react";
import { SearchTutor } from "@/components/tutors/SearchTutor";
import { CategoryFilter } from "@/components/tutors/CategoryFilter";
import { categoryService } from "@/service/category.service";
import TutorGridSkeleton from "@/components/tutors/TutorGridSkeleton";
import TutorList from "@/components/tutors/TutorList";

export default async function TutorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  // URL Query String তৈরি
  const queryString = params
    ? Object.entries(params)
        .filter(([_, v]) => v !== undefined)
        .map(
          ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`,
        )
        .join("&")
    : "";

  const { data: categoriesResponse } = await categoryService.getCategories();
  const categories = categoriesResponse?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Find Your Best Tutor</h1>
        <SearchTutor />
        <CategoryFilter categories={categories} />
      </div>

      <Suspense key={queryString} fallback={<TutorGridSkeleton />}>
        <TutorList queryString={queryString} />
      </Suspense>
    </div>
  );
}

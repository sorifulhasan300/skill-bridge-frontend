"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function TutorPagination({ totalPages }: { totalPages: number }) {
  totalPages;
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12 py-4">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => updatePage(currentPage - 1)}
      >
        Previous
      </Button>
      <span className="text-sm font-medium px-4">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => updatePage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

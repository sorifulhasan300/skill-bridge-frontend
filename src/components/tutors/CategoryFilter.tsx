"use client";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface ICategory {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: ICategory[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
      <Badge
        variant={activeCategory === "all" ? "default" : "outline"}
        className="cursor-pointer px-4 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap"
        onClick={() => handleCategoryChange("all")}
      >
        All
      </Badge>

      {categories?.map((cat) => (
        <Badge
          key={cat.id}
          variant={activeCategory === cat.name ? "default" : "outline"}
          className="cursor-pointer px-4 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap"
          onClick={() => handleCategoryChange(cat.name)}
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  );
}

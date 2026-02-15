"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchTutor() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) params.set("searchTerm", term);
    else params.delete("searchTerm");
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
      <div className="flex-1 w-full">
        <label className="text-xs font-medium mb-1.5 block">
          Search Tutors
        </label>
        <Input
          placeholder="Search by name, bio or skills..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("searchTerm")?.toString()}
        />
      </div>
    </div>
  );
}

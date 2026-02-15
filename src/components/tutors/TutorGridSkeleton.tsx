import { Skeleton } from "@/components/ui/skeleton";

export default function TutorGridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="space-y-4 mb-10">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

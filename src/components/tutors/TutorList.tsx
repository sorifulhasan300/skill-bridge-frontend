// components/tutors/TutorList.tsx
import { tutorService } from "@/service/tutors.service";
import { TutorCard } from "./TutorsCard";
import { Tutor } from "@/types/tutor.types";
import { TutorPagination } from "./Pagination";

export default async function TutorList({
  queryString,
}: {
  queryString: string;
}) {
  const { data: tutorsResponse } = await tutorService.getAllTutors(queryString);
  const tutors = tutorsResponse?.data.data || [];
  const totalPages = tutorsResponse?.data.meta.totalPage || 1;
  if (tutors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl mt-10">
        <p className="text-lg font-medium text-muted-foreground">
          No tutors found.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {tutors.map((tutor: Tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
      {totalPages > 0 && (
        <div className="mt-12">
          <TutorPagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

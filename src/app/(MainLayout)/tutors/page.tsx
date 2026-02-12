import { TutorCard } from "@/components/tutors/TutorsCard";
import { tutorService } from "@/service/tutors.service";
import { Tutor } from "@/types/tutor.types";
import React from "react";

export default async function TutorPage() {
  const { data: tutors, error } = await tutorService.getAllTutors();

  return (
    <div className="max-w-10/12 mx-auto  ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 ">
        {tutors.data.map((tutors: Tutor) => (
          <TutorCard key={tutors.id} tutor={tutors}></TutorCard>
        ))}
      </div>
    </div>
  );
}

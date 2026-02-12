import { Hero } from "@/components/layout/Hero";
import { TutorCard } from "@/components/tutors/TutorsCard";
import { Button } from "@/components/ui/button";
import { tutorService } from "@/service/tutors.service";
import { Tutor } from "@/types/tutor.types";

export default async function Home() {
  const { data: tutors, error } = await tutorService.getFeaturedTutors();
  return (
    <div>
      <Hero />
      <div className="place-items-center">
        <h1 className="text-4xl py-10">Featured Tutors</h1>
      </div>
      <div className="max-w-10/12 mx-auto py-6 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 ">
          {tutors?.data.map((tutors: Tutor) => (
            <TutorCard key={tutors.id} tutor={tutors}></TutorCard>
          ))}
        </div>
      </div>
    </div>
  );
}

import { tutorService } from "@/service/tutors.service";
import { Tutor } from "@/types/tutor.types";
import { TutorCard } from "../tutors/TutorsCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function FeatureTutor() {
  const { data: tutorsResponse } = await tutorService.getFeaturedTutors();
  const tutors = tutorsResponse?.data || [];

  if (tutors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2  bg-muted/10">
        <p className="text-muted-foreground font-medium">
          No featured tutors available right now.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between px-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Featured Tutors
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Learn from the best rated experts in our community.
          </p>
        </div>
        <Button variant="ghost" asChild className="hidden sm:flex group">
          <Link href="/tutors" className="flex items-center gap-2">
            View all tutors
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutors.slice(0, 3).map((tutor: Tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>

      <div className="sm:hidden px-2">
        <Button variant="outline" asChild className="w-full">
          <Link href="/tutors">View all tutors</Link>
        </Button>
      </div>
    </section>
  );
}

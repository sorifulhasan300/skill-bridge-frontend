import { tutorService } from "@/service/tutors.service";
import { Tutor } from "@/types/tutor.types";
import React from "react";
import { TutorCard } from "../tutors/TutorsCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function FeatureTutor() {
  const { data: tutorsResponse, error } =
    await tutorService.getFeaturedTutors();

  const tutors = tutorsResponse?.data || [];

  return (
    <section className=" py-16 lg:py-24 bg-background">
      <div className="w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Featured Tutors
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Learn from the best. Our highly-rated tutors are here to help you
              achieve your academic and professional goals.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="hidden md:flex group text-primary"
          >
            <Link href="/tutors">
              View All Tutors
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Grid Layout */}
        {tutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {tutors.slice(0, 6).map((tutor: Tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-2xl">
            <p className="text-muted-foreground">
              No featured tutors available right now.
            </p>
          </div>
        )}

        {/* Mobile-only View All Button */}
        <div className="mt-10 flex md:hidden justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/tutors">View All Tutors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

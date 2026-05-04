import AvailabilityCard from "@/components/tutor-dashboard/AvailabilityCard";
import { tutorService } from "@/service/tutors.service";
import React from "react";
export const dynamic = "force-dynamic";

export default async function AvailabilityPage() {
  const { data, error } = await tutorService.getTutorProfile();

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <AvailabilityCard timeSlots={data?.timeSlots || {}}></AvailabilityCard>
    </div>
  );
}

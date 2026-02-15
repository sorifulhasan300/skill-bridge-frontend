import AvailabilityCard from "@/components/tutor-dashboard/AvailabilityCard";
import { tutorService } from "@/service/tutors.service";
import React from "react";
export const dynamic = "force-dynamic";

export default async function AvailabilityPage() {
  const { data } = await tutorService.getTutorProfile();

  return (
    <div>
      <AvailabilityCard timeSlots={data.data}></AvailabilityCard>
    </div>
  );
}

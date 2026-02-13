import UpdateTutorProfile from "@/components/tutor-dashboard/UpdateTutorProfile";
import { tutorService } from "@/service/tutors.service";
import React from "react";

export default async function page() {
  const { data } = await tutorService.getTutorProfile();
  return (
    <div>
      <UpdateTutorProfile
        initialData={data.data.timeSlots}
      ></UpdateTutorProfile>
    </div>
  );
}

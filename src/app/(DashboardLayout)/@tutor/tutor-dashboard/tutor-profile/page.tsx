import UpdateTutorProfile from "@/components/tutor-dashboard/UpdateTutorProfile";
import { tutorService } from "@/service/tutors.service";
import React from "react";

export default async function page() {
  const { data } = await tutorService.getTutorProfile();
  console.log(data);
  return (
    <div>
      <UpdateTutorProfile initialData={data.data}></UpdateTutorProfile>
    </div>
  );
}

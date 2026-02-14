import TutorDetails from "@/components/tutors/TutorDetails";
import { tutorService } from "@/service/tutors.service";
import React from "react";
interface PageProps {
  params: Promise<{ id: string }>; // Next.js 15 update: params ekhon promise
}
export default async function page({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="bg-gray-50 lg:min-h-screen">
      <TutorDetails tutorId={id}></TutorDetails>
    </div>
  );
}

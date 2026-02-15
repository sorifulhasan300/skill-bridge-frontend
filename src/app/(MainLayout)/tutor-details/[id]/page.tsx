import TutorDetails from "@/components/tutors/TutorDetails";
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

import VisibilityToggle from "@/components/tutor-dashboard/VisibilityToggle";
import { tutorService } from "@/service/tutors.service";
import React from "react";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";

export default async function SetVisibilityPage() {
  const { data, error } = await tutorService.getTutorProfile();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tutor Profile Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <p className="text-sm text-gray-500">
              Please create your tutor profile first to manage your visibility settings.
            </p>
          </div>
          <div className="space-y-3">
            <Button asChild className="bg-black hover:bg-gray-800 text-white">
              <a href="/tutor-dashboard/create-profile">
                Create Profile
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Button>
            <div>
              <Button variant="link" asChild className="text-black hover:text-gray-700">
                <a href="/tutor-dashboard">
                  Back to Dashboard
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Visibility</h1>
        <p className="text-gray-600">
          Control your online visibility and availability status for students.
        </p>
      </div>

      <VisibilityToggle currentStatus={data?.availability || "UNAVAILABLE"} />
    </div>
  );
}
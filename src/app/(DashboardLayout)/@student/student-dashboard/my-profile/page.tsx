import ProfileCard from "@/components/student-dashboard/ProfileCard";
import { useAuth } from "@/context/auth-context";
import React from "react";

export default function MyProfile() {
  return (
    <div>
      <ProfileCard ></ProfileCard>
    </div>
  );
}

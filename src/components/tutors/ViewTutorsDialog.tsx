"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { getTutorDetailsById } from "@/action/action";
type Tutor = {
  id: string;
  user: { name: string };
  bio: string;
  hourlyRate: number;
};

export default function ViewTutorsDialog({ tutorId }: { tutorId: string }) {
  const [tutor, setTutor] = useState<Tutor | null>(null);
  useEffect(() => {
    const tutordetails = async () => {
      try {
        const { data, error } = await getTutorDetailsById(tutorId);
        setTutor(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    tutordetails();
  }, [tutorId]);
  console.log(tutor);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{tutor?.user.name}</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            {tutor?.bio}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <p>
            <strong>Hourly Rate:</strong> ৳{tutor?.hourlyRate}/hour
          </p>
          {/* More details can go here */}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            onClick={() => {
              // implement booking session logic here
              console.log("Book session clicked for", tutor?.id);
            }}
          >
            Book Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

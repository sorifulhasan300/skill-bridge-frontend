"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateTutorProfile } from "@/action/action";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
}

interface WeeklyAvailability {
  [key: string]: TimeSlot[];
}

const days = [
  { label: "Sat", value: "sat" },
  { label: "Sun", value: "sun" },
  { label: "Mon", value: "mon" },
  { label: "Tue", value: "tue" },
  { label: "Wed", value: "wed" },
  { label: "Thu", value: "thu" },
  { label: "Fri", value: "fri" },
];

export default function AvailabilityCard({
  timeSlots,
}: {
  timeSlots: TimeSlot;
}) {
  console.log(timeSlots);
  const [availability, setAvailability] = useState<WeeklyAvailability>(
    days.reduce((acc, day) => ({ ...acc, [day.value]: [] }), {}),
  );

  const addSlot = (day: string) => {
    const newSlot: TimeSlot = {
      id: crypto.randomUUID(),
      start: "09:00",
      end: "10:00",
    };
    setAvailability((prev) => ({
      ...prev,
      [day]: [...prev[day], newSlot],
    }));
  };

  const removeSlot = (day: string, slotId: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((slot) => slot.id !== slotId),
    }));
  };

  const updateSlot = (
    day: string,
    slotId: string,
    field: "start" | "end",
    value: string,
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((slot) =>
        slot.id === slotId ? { ...slot, [field]: value } : slot,
      ),
    }));
  };

  const handleSave = async () => {
    try {
      const toastId = toast.loading("Updating availability...");

      const payload = {
        timeSlots: availability,
      };
      const { data, error } = await updateTutorProfile(payload);

      if (error) {
        toast.error(error, { id: toastId });
        return;
      }

      toast.success("Availability updated successfully!", { id: toastId });
      console.log("Updated Data:", data);
    } catch (err) {
      toast.error("An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <Card className="m-4 w-full max-w-4xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle>Weekly Availability</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {days.map((day) => (
          <div key={day.value} className="border rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold uppercase text-muted-foreground">
                {day.label}
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8"
                onClick={() => addSlot(day.value)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Slot
              </Button>
            </div>

            {availability[day.value].length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                No slots added
              </p>
            ) : (
              <div className="space-y-2">
                {availability[day.value].map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center gap-2 animate-in fade-in zoom-in duration-200"
                  >
                    <Input
                      type="time"
                      value={slot.start}
                      onChange={(e) =>
                        updateSlot(day.value, slot.id, "start", e.target.value)
                      }
                      className="h-9"
                    />
                    <span className="text-muted-foreground text-xs font-medium">
                      TO
                    </span>
                    <Input
                      type="time"
                      value={slot.end}
                      onChange={(e) =>
                        updateSlot(day.value, slot.id, "end", e.target.value)
                      }
                      className="h-9"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeSlot(day.value, slot.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4">
          <Button
            onClick={handleSave}
            className="w-full h-12 text-md font-semibold"
          >
            Save All Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

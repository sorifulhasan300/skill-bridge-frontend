"use client";
import { Tutor, TimeSlot } from "@/types/tutor.types";
import React, { useEffect, useState } from "react";
import {
  BadgeCheck,
  Clock,
  Mail,
  Star,
  CalendarDays,
  Briefcase,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createBooking, getTutorDetailsById } from "@/action/action";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { BookingPayload } from "@/types/booking.typs";

export default function TutorDetails({ tutorId }: { tutorId: string }) {
  const auth = useAuth();
  const session = auth?.session;

  const [tutorDetails, setTutorDetails] = useState<Tutor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    slot: TimeSlot;
  } | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await getTutorDetailsById(tutorId);
        if (data) setTutorDetails(data.data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (tutorId) fetchDetails();
  }, [tutorId]);

  const handleBooking = async () => {
    const toastId = toast.loading("Creating booking...");
    if (!selectedSlot || !tutorDetails) return;

    const payload = {
      studentId: session?.user?.id,
      tutorId: tutorDetails.id,
      day: selectedSlot.day,
      slotId: selectedSlot.slot.id,
    };

    const { success, message, error } = await createBooking(
      payload as BookingPayload,
    );

    if (success) {
      toast.success(message || "Booking Confirmed!", { id: toastId });
      window.location.reload();
    } else {
      toast.success(error || "Something was wrong!", { id: toastId });
    }
  };
  const timeSlots = tutorDetails?.timeSlots || {};
  if (isLoading)
    return (
      <div className="p-10 text-center text-sm text-muted-foreground">
        Loading profile...
      </div>
    );
  if (!tutorDetails)
    return (
      <div className="p-10 text-center text-sm text-destructive">
        Tutor not found.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-10 bg-background text-foreground transition-colors">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start border-b border-border pb-8">
        <Avatar className="h-24 w-24 rounded-lg border border-border shadow-sm">
          <AvatarImage src={tutorDetails.user.image} />
          <AvatarFallback className="rounded-lg bg-muted text-muted-foreground">
            {tutorDetails.user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {tutorDetails.user.name}
            </h1>
            {tutorDetails.isFeatured && (
              <BadgeCheck className="text-blue-500 dark:text-blue-400 w-5 h-5" />
            )}
          </div>
          <p className="text-muted-foreground font-medium">
            {tutorDetails.title}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground/80">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {tutorDetails.averageRating}{" "}
              <span className="text-muted-foreground font-normal">
                ({tutorDetails.totalReviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              {tutorDetails.user.email}
            </div>
          </div>
        </div>

        <div className="md:text-right bg-muted/50 p-4 rounded-lg border border-border">
          <p className="text-2xl font-bold text-primary">
            ৳{tutorDetails.hourlyRate}
          </p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            Rate per hour
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Bio, Experience & Reviews */}
        <div className="md:col-span-2 space-y-10">
          {/* About Section */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              About Me
            </h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              {tutorDetails.bio}
            </p>
          </section>

          {/* Experience Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card shadow-sm flex items-center gap-3">
              <div className="p-2 bg-muted rounded-md">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">
                  Experience
                </p>
                <p className="text-sm font-semibold">
                  {tutorDetails.experience} Years
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card shadow-sm flex items-center gap-3">
              <div className="p-2 bg-muted rounded-md">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">
                  Availability
                </p>
                <p className="text-sm font-semibold">
                  {tutorDetails.availability}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Student Reviews
              </h3>
            </div>

            <div className="grid gap-4">
              {tutorDetails.reviews && tutorDetails.reviews.length > 0 ? (
                tutorDetails.reviews.slice(0, 4).map((review, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl border border-border bg-card space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarImage src={review.student.image} />
                          <AvatarFallback>
                            {review.student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {review.student.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {review.student.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-normal italic">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-border rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    No reviews yet for this tutor.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right: Schedule Card */}
        <div className="space-y-4">
          <Card className="shadow-sm border border-border rounded-xl overflow-hidden bg-card">
            <CardHeader className="py-4 border-b border-border bg-muted/30">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground/80">
                <CalendarDays className="w-4 h-4 text-primary" /> Select
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-h-[450px] overflow-y-auto">
              {(() => {
                const daysWithSlots = [
                  { label: "Saturday", key: "sat" },
                  { label: "Sunday", key: "sun" },
                  { label: "Monday", key: "mon" },
                  { label: "Tuesday", key: "tue" },
                  { label: "Wednesday", key: "wed" },
                  { label: "Thursday", key: "thu" },
                  { label: "Friday", key: "fri" },
                ].filter(
                  (day) =>
                    tutorDetails?.timeSlots?.[
                      day.key as keyof typeof tutorDetails.timeSlots
                    ]?.length > 0,
                );

                if (daysWithSlots.length === 0) {
                  return (
                    <div className="p-10 text-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-muted/50 mx-auto" />
                      <p className="text-sm text-muted-foreground font-medium">
                        No time slots available.
                      </p>
                    </div>
                  );
                }

                return daysWithSlots.map((day) => (
                  <div
                    key={day.key}
                    className="p-4 border-b border-border last:border-0 bg-card"
                  >
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-3 tracking-widest">
                      {day.label}
                    </p>
                    <div className="space-y-2">
                      {tutorDetails?.timeSlots?.[
                        day.key as keyof typeof tutorDetails.timeSlots
                      ]?.map((slot) => {
                        const isSelected = selectedSlot?.slot.id === slot.id;
                        return (
                          <button
                            key={slot.id}
                            disabled={slot.isBooked}
                            onClick={() =>
                              setSelectedSlot({ day: day?.label, slot })
                            }
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm border transition-all
                        ${
                          slot.isBooked
                            ? "bg-muted text-muted-foreground/30 cursor-not-allowed border-transparent"
                            : isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-md"
                              : "bg-card hover:bg-muted border-border text-foreground/80"
                        }`}
                          >
                            <span className="font-medium">
                              {slot.start} - {slot.end}
                            </span>
                            {slot.isBooked && (
                              <Badge
                                variant="outline"
                                className="text-[9px] uppercase h-4 px-1 opacity-50"
                              >
                                Booked
                              </Badge>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </CardContent>
          </Card>

          <Button
            className="w-full h-11 rounded-xl shadow-sm font-semibold transition-all active:scale-[0.98]"
            disabled={!selectedSlot}
            onClick={handleBooking}
          >
            {selectedSlot ? "Proceed to Booking" : "Select a time slot"}
          </Button>

          {selectedSlot && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center animate-in fade-in slide-in-from-top-1">
              <p className="text-[11px] text-foreground/80">
                You selected{" "}
                <span className="font-bold text-primary">
                  {selectedSlot.day}
                </span>{" "}
                at{" "}
                <span className="font-bold text-primary">
                  {selectedSlot.slot.start}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

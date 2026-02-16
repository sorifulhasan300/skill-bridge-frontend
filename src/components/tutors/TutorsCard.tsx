import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, GraduationCap, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tutor } from "@/types/tutor.types";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  const rating = Math.round(tutor?.averageRating || 0);

  return (
    <Card className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg text-center p-6 flex flex-col h-full">
      {/* Profile Image with Border */}
      <div className="flex justify-center mb-4">
        <div className="relative p-1 border-2 border-primary rounded-full transition-transform group-hover:scale-105 duration-300">
          <Image
            src={tutor?.user.image ?? "/avatar-placeholder.png"}
            alt={tutor?.user.name}
            width={90}
            height={90}
            className="rounded-full object-cover aspect-square"
          />
        </div>
      </div>

      <CardContent className="space-y-3 p-0 flex-grow">
        {/* Tutor Name & Title */}
        <div className="space-y-1">
          <h3 className="font-bold text-xl text-foreground leading-none">
            {tutor?.user.name}
          </h3>
          <p className="text-xs font-medium text-primary uppercase tracking-wider flex items-center justify-center gap-1">
            <GraduationCap className="w-3 h-3" />
            {tutor?.title.split(",")[0]} {/* প্রথম সাবজেক্টটি দেখাবে */}
          </p>
        </div>

        {/* Dynamic Stars */}
        <div className="flex justify-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground opacity-20"
              }`}
            />
          ))}
        </div>

        {/* Experience & Hourly Rate - রেটিং এর নিচে */}
        <div className="flex items-center justify-center gap-4 py-2 border-y border-border/50">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">
              Experience
            </p>
            <p className="text-sm font-semibold">{tutor?.experience} Years</p>
          </div>
          <div className="w-[1px] h-8 bg-border" /> {/* Divider */}
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">
              Rate
            </p>
            <p className="text-sm font-semibold text-primary">
              ৳{tutor?.hourlyRate}/hr
            </p>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-2">
          {tutor?.bio}
        </p>
      </CardContent>

      <CardFooter className="p-0 mt-6">
        <Button
          asChild
          className="w-full rounded-xl bg-primary hover:bg-primary/90 shadow-md"
        >
          <Link href={`/tutor-details/${tutor.id}`}>View Full Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

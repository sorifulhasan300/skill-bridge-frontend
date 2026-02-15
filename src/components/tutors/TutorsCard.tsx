import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Briefcase, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tutor } from "@/types/tutor.types";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <Card className="group overflow-hidden border-border bg-card  dark:hover:border-primary/50">
      {/* Header with Background Gradient Effect */}

      <CardHeader className="flex flex-row gap-4 items-start pt-6">
        <div className="relative">
          <Image
            src={tutor?.user.image ?? "/avatar-placeholder.png"}
            alt={tutor?.user.name}
            width={64}
            height={64}
            className="rounded-2xl object-cover border-2 border-background shadow-sm"
          />
          {tutor?.availability === "AVAILABLE" && (
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background"></span>
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-lg leading-none truncate group-hover:text-primary transition-colors">
              {tutor?.user.name}
            </h3>
            {tutor?.isFeatured && (
              <Badge
                variant="default"
                className="bg-amber-500 hover:bg-amber-600 text-[10px] h-5 px-1.5 shrink-0"
              >
                PRO
              </Badge>
            )}
          </div>
          <p className="text-sm font-medium text-primary mt-1.5">
            ৳{tutor?.hourlyRate}{" "}
            <span className="text-muted-foreground font-normal">/ hr</span>
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold">
              {tutor?.averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({tutor?.totalReviews})
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tutor Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
          {tutor?.bio}
        </p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-3 py-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span>{tutor?.experience} yrs Exp.</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Flexible Hours</span>
          </div>
        </div>

        {/* Dynamic Badges based on Title/Specialty */}
        <div className="flex flex-wrap gap-2">
          {tutor?.title
            .split(",")
            .slice(0, 2)
            .map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-secondary/50 font-normal text-[11px]"
              >
                {skill.trim()}
              </Badge>
            ))}
        </div>
      </CardContent>

      <CardFooter className=" p-4  mt-auto">
        <Button asChild className="w-full ">
          <Link
            href={`/tutor-details/${tutor.id}`}
            className="flex items-center justify-center"
          >
            View Profile
            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => (
  <div className="w-full py-10 lg:py-20 bg-muted/30">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">Now live</Badge>
          </div>

          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
              Learn faster. Teach smarter. All in one place.
            </h1>

            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              SkillBridge connects learners with expert tutors for personalized
              sessions. Browse tutors, check availability, and book instantly.
              Tutors manage profiles, schedules, and sessions without hassle.
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Button asChild size="lg" variant="outline" className="gap-4">
              <Link href={"/tutors"}>
                Find a tutor <MoveRight className="w-6 h-4" />
              </Link>
            </Button>

            <Button size="lg" className="gap-4">
              <Link
                className="flex items-center gap-3"
                href={"/tutor-dashboard/create-profile"}
              >
                Become a tutor <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-muted aspect-square group">
            <Image
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
              alt="Study Materials"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 backdrop-blur-[2px]">
              <span className="bg-white text-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Resources
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-muted row-span-2 group">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Students Collaboration"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <p className="text-white font-bold text-lg">
                Interactive Learning
              </p>
              <p className="text-white/80 text-xs mt-1">
                Join our global classroom
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-muted aspect-square group">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Online Tutoring Session"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-4 left-4">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Expert Guidance
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

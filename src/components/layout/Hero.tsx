import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

          <div className="flex flex-row gap-4">
            <Button size="lg" variant="outline" className="gap-4">
              Find a tutor <MoveRight className="w-4 h-4" />
            </Button>

            <Button size="lg" className="gap-4">
              Become a tutor <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-muted rounded-md aspect-square"></div>
          <div className="bg-muted rounded-md row-span-2"></div>
          <div className="bg-muted rounded-md aspect-square"></div>
        </div>
      </div>
    </div>
  </div>
);

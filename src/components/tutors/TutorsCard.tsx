import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tutor } from "@/types/tutor.types";
// import ViewTutorsDialog from "./TutorDetails";
import { Button } from "../ui/button";
import Link from "next/link";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="flex flex-row gap-4 items-center">
        <Image
          src={tutor?.user.image ?? "/avatar-placeholder.png"}
          alt={tutor?.user.name}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{tutor?.user.name}</h3>
          <p className="text-sm text-muted-foreground">
            ৳{tutor?.hourlyRate}/hour
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {tutor?.bio}
        </p>
        <div className="mt-3">
          <Badge variant="secondary">{tutor?.availability}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        {/* Dialog trigger here */}
        <Button>
          <Link href={`/tutor-details/${tutor.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

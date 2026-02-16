import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah Ahmed",
      role: "HSC Student",
      content:
        "Found an amazing Math tutor within minutes. The booking process was so seamless!",
      image: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Rakib Hasan",
      role: "Parent",
      content:
        "The quality of instructors here is top-notch. My son's grades improved significantly.",
      image: "https://i.pravatar.cc/150?u=rakib",
    },
    {
      name: "Ayesha Khan",
      role: "University Student",
      content:
        "I love the flexibility. Being able to see live slots makes scheduling so much easier.",
      image: "https://i.pravatar.cc/150?u=ayesha",
    },
  ];

  return (
    <section className="py-24  max-w-10/12 mx-auto">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-16">
          Loved by students & parents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-border bg-card/50 space-y-4 hover:shadow-sm transition-all"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground italic leading-relaxed">
                {review.content}
              </p>
              <div className="flex items-center gap-3 pt-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={review.image} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-bold leading-none">
                    {review.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

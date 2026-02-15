import { Button } from "@/components/ui/button";
import { BookOpen, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToActionSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 text-primary-foreground group">
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-3xl font-bold">
                Find the Perfect Tutor
              </h3>
              <p className="mb-8 text-primary-foreground/80 leading-relaxed max-w-sm">
                Unlock your potential by learning from top-rated experts. Search
                by subject, price, and rating to find your match.
              </p>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="group/btn"
              >
                <Link href="/tutors">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-all group-hover:bg-white/20" />
          </div>

          {/* For Tutors */}
          <div className="relative overflow-hidden rounded-3xl border bg-card p-8 md:p-12 group">
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-4 text-3xl font-bold">Become a Tutor</h3>
              <p className="mb-8 text-muted-foreground leading-relaxed max-w-sm">
                Join our community of professional educators. Share your
                knowledge, set your own schedule, and earn while you teach.
              </p>
              <Button asChild size="lg" className="group/btn">
                <Link href="/tutor-dashboard/create-profile">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
          </div>
        </div>

        {/* Optional Stats Sub-section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t pt-12 text-center">
          <div>
            <p className="text-3xl font-bold">10k+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
              Active Students
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
              Expert Tutors
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">50+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
              Subjects
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">4.9/5</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
              Satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

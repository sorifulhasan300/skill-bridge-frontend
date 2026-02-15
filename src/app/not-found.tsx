import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 ">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary text-xs font-bold shadow-sm">
          404
        </div>
      </div>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
        Page Not Found
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
        Oops! The page you are looking for doesn&apos;t exist or has been moved.
        Don&apos;t worry, let&apos;s get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default" size="lg" className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/tutors">
            <Search className="h-4 w-4" />
            Browse Tutors
          </Link>
        </Button>
      </div>
    </div>
  );
}

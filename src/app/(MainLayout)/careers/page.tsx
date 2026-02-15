import React from "react";
import {
  GraduationCap,
  Briefcase,
  Users,
  Star,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const JOBS = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / Dhaka",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Learning Content Specialist",
    department: "Education",
    location: "Dhaka",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Customer Success Manager",
    department: "Support",
    location: "Remote",
    type: "Part-time",
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* 1. Hero Section */}
      <section className="py-20 bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Briefcase className="h-4 w-4" />
            <span>Join Our Team</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s shape the future of{" "}
            <span className="text-primary">Learning</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join TutorHub and help us build a world where everyone has access to
            the best mentors. Work from anywhere, grow your skills, and make an
            impact.
          </p>
          <Button size="lg" asChild>
            <Link href="#openings">View Open Positions</Link>
          </Button>
        </div>
      </section>

      {/* 2. Why Join Us Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Why you&apos;ll love working here
          </h2>
          <p className="text-muted-foreground">
            We care about our team as much as we care about our students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Diverse Team",
              desc: "Work with passionate people from various backgrounds and expertise.",
            },
            {
              icon: Star,
              title: "Growth Mindset",
              desc: "We provide resources for continuous learning and career advancement.",
            },
            {
              icon: GraduationCap,
              title: "Education First",
              desc: "Being an EdTech, we live and breathe the spirit of learning.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Open Positions List */}
      <section id="openings" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Open Positions
          </h2>

          <div className="space-y-4">
            {JOBS.map((job) => (
              <Card
                key={job.id}
                className="group hover:border-primary transition-all"
              >
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" /> {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Don&apos;t see a perfect fit? Send your CV to{" "}
              <span className="text-primary font-medium">
                careers@tutorhub.com
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

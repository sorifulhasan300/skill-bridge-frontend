/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  BookOpen,
  Users,
  Award,
  Target,
  Lightbulb,
  Heart,
  CheckCircle,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "About Us | TutorHub",
  description:
    "Learn about TutorHub's mission to connect students with expert tutors worldwide.",
};

export default function AboutPage() {
  const stats = [
    { label: "Active Tutors", value: "500+", icon: Users },
    { label: "Students Helped", value: "10,000+", icon: BookOpen },
    { label: "Success Rate", value: "95%", icon: Award },
    { label: "Subjects Covered", value: "50+", icon: Target },
  ];

  const values = [
    {
      icon: Heart,
      title: "Student-Centered",
      description:
        "We put students first, ensuring every learning experience is personalized and effective.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously evolve our platform to provide the best learning tools and experiences.",
    },
    {
      icon: Star,
      title: "Quality",
      description:
        "Every tutor on our platform is carefully vetted to ensure the highest quality education.",
    },
  ];

  const features = [
    "Personalized Learning Plans",
    "Real-time Progress Tracking",
    "Interactive Whiteboard",
    "Video Conferencing",
    "Flexible Scheduling",
    "Multi-subject Support",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#FBFBFB] dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Empowering Learning
            <span className="block text-black dark:text-blue-400">
              One Student at a Time
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            TutorHub is revolutionizing education by connecting passionate
            tutors with eager learners worldwide. Our mission is to make quality
            education accessible to everyone, everywhere.
          </p>
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
            Join Our Community
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-black dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[#FBFBFB] dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              At TutorHub, we believe that everyone deserves access to quality
              education. Our platform bridges the gap between expert tutors and
              students seeking knowledge, creating personalized learning
              experiences that adapt to individual needs and goals.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
              Whether you're a student looking to excel in your studies or a
              professional seeking to learn new skills, TutorHub provides the
              tools and connections you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Our Values
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              These core principles guide everything we do at TutorHub
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg bg-white dark:bg-slate-800"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <value.icon className="h-12 w-12 text-black dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-slate-900 dark:text-slate-100">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#FBFBFB] dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Why Choose TutorHub?
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Discover what makes our platform the preferred choice for online
                learning
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-black dark:text-green-400 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students and tutors who are already experiencing
            the future of education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100"
            >
              <Link href="/tutors"> Find a Tutor</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white"
            >
              <Link href="/tutors">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

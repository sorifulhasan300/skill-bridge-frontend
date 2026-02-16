"use client";

import React from "react";
import { CheckCircle2, Clock, User, Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8  mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, Admin!
            </h1>
            <p className="text-muted-foreground">
              Heres whats happening with your classes today.
            </p>
          </div>
          <Button variant="outline" className="relative h-10 w-10 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Class
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today, 4:00 PM</div>
              <p className="text-xs text-muted-foreground">
                Mathematics with Dr. Rahim
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Tasks
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">03 Assignments</div>
              <p className="text-xs text-muted-foreground">2 due by tomorrow</p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet</CardTitle>
              <Badge variant="outline" className="bg-background">
                Balance
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳ 2,450.00</div>
              <p className="text-xs text-muted-foreground">
                Last top up: 2 days ago
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Schedule & Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* List Style */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Recent Lessons</CardTitle>
              <CardDescription>Your last 3 attended classes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { subject: "Physics", tutor: "Kamal Hossain", date: "Feb 15" },
                { subject: "English", tutor: "Sara Islam", date: "Feb 14" },
                { subject: "Chemistry", tutor: "Tanvir Ahmed", date: "Feb 12" },
              ].map((lesson, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {lesson.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.tutor}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {lesson.date}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs h-8">
                View Full History
              </Button>
            </CardContent>
          </Card>

          {/* Action Card */}
          <Card className="shadow-none flex flex-col justify-center items-center p-8 text-center border-dashed border-2">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <h1 className="font-semibold">Incomplete Profile</h1>
            <p className="text-sm text-muted-foreground mb-4">
              Add your education details to get better tutor matches.
            </p>
            <Button size="sm">
              <Link
                href={"/student-dashboard/my-profile"}
                className="font-semibold"
              >
                Update Profile
              </Link>
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}

"use client";

import React from "react";
import {
  Users,
  Calendar,
  DollarSign,
  Clock,
  ChevronRight,
  CheckCircle,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TutorDashboard() {
  return (
    <div className="p-6 space-y-6  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, Tutor!
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

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Students",
            value: "24",
            icon: Users,
            color: "text-blue-600",
          },
          {
            label: "Active Bookings",
            value: "12",
            icon: Calendar,
            color: "text-purple-600",
          },
          {
            label: "Total Earnings",
            value: "৳45,200",
            icon: DollarSign,
            color: "text-green-600",
          },
          {
            label: "Hours Taught",
            value: "156h",
            icon: Clock,
            color: "text-orange-600",
          },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recent Booking Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Rahim Ahmed", subject: "Mathematics", time: "2h ago" },
              { name: "Sara Islam", subject: "Physics", time: "5h ago" },
              { name: "Tanvir Hasan", subject: "English", time: "Yesterday" },
            ].map((booking, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{booking.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.subject}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground mr-2">
                    {booking.time}
                  </span>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="link" className="w-full text-sm">
              View all requests <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                subject: "Advanced Calculus",
                date: "Today, 4:00 PM",
                status: "Live",
              },
              {
                subject: "Physics 101",
                date: "Tomorrow, 10:00 AM",
                status: "Scheduled",
              },
              {
                subject: "English Literature",
                date: "18 Feb, 11:30 AM",
                status: "Scheduled",
              },
            ].map((cls, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border-l-4 border-l-blue-500 bg-blue-50/30 rounded-r-lg"
              >
                <div>
                  <p className="font-semibold text-sm">{cls.subject}</p>
                  <p className="text-xs text-muted-foreground">{cls.date}</p>
                </div>
                <Badge
                  variant={cls.status === "Live" ? "destructive" : "secondary"}
                >
                  {cls.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full" variant="secondary">
              Go to Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

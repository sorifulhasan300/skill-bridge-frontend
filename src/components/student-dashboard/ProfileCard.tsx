"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Briefcase, Camera } from "lucide-react";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Full Stack Developer",
    avatar: "https://github.com/shadcn.png",
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", user);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="relative mx-auto mb-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isEditing ? "Edit Profile" : user.name}
          </CardTitle>
          <CardDescription>{user.role}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                disabled={!isEditing}
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                disabled={!isEditing}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <Label htmlFor="role">Job Role</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="role"
                disabled={!isEditing}
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button className="cursor-pointer" onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

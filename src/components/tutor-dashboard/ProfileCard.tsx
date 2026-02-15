"use client";

import React, { useState, useEffect } from "react";
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
import { User, Mail, Briefcase, Camera, ImageIcon } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { SessionUser } from "@/types/user.types";

export default function ProfileCard() {
  const { session } = useAuth() || {};
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<SessionUser>(
    session?.user && "name" in session.user && "image" in session.user
      ? (session.user as SessionUser)
      : { name: "", image: "" },
  );

  if (session?.user && Object.keys(user).length === 0 && !isEditing) {
    setUser(
      session?.user && "name" in session.user && "image" in session.user
        ? (session.user as SessionUser)
        : { name: "", image: "" },
    );
  }

  const handleSave = async () => {
    const toastId = toast.loading("login...");

    await authClient.updateUser(
      {
        name: user.name,
        image: user.image,
      },
      {
        disableSignal: true,
        onSuccess() {
          toast.success("update profile successfully", { id: toastId });
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Something went wrong", {
            id: toastId,
          });
        },
      },
    );
  };

  const handleCancel = () => {
    setUser(
      session?.user && "name" in session.user && "image" in session.user
        ? (session.user as SessionUser)
        : ({ name: "", image: "" } as SessionUser),
    );
    setIsEditing(false);
  };

  if (!session) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="relative mx-auto mb-4 w-24 h-24">
            <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.substring(0, 2).toUpperCase() || "JD"}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white shadow-md hover:bg-gray-100"
              >
                <Camera className="h-4 w-4 text-gray-600" />
              </Button>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isEditing ? "Edit Profile" : user?.name}
          </CardTitle>
          <CardDescription>{user?.role || "Member"}</CardDescription>
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
                value={user?.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <Label htmlFor="image">Profile Image URL</Label>
          <div className="relative">
            {/* Image icon ba Link icon use korte paren */}
            <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="image"
              type="text" // Jehetu apni URL niben, tai text ba url type thakbe
              disabled={!isEditing}
              placeholder="https://example.com/photo.jpg"
              value={user?.image || ""}
              onChange={(e) => setUser({ ...user, image: e.target.value })}
              className="pl-10"
            />
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
                value={user?.email || ""}
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
                value={user?.role || ""}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          {isEditing ? (
            <>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

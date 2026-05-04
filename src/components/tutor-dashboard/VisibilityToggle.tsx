"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { updateTutorProfile } from "@/action/action";
import { Eye, EyeOff } from "lucide-react";

interface VisibilityToggleProps {
  currentStatus: "AVAILABLE" | "UNAVAILABLE";
}

export default function VisibilityToggle({ currentStatus }: VisibilityToggleProps) {
  const [availability, setAvailability] = useState<"AVAILABLE" | "UNAVAILABLE">(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    const newStatus = availability === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";
    setIsLoading(true);

    try {
      const toastId = toast.loading(
        `Setting visibility to ${newStatus.toLowerCase()}...`
      );

      const payload = {
        availability: newStatus,
      };

      const { data, error } = await updateTutorProfile(payload);

      if (error) {
        toast.error(error, { id: toastId });
        return;
      }

      setAvailability(newStatus);
      toast.success(
        `Visibility updated to ${newStatus.toLowerCase()} successfully!`,
        { id: toastId }
      );
    } catch (err) {
      toast.error("An unexpected error occurred while updating visibility.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isAvailable = availability === "AVAILABLE";

  return (
    <Card className="shadow-sm border">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {isAvailable ? (
            <Eye className="h-6 w-6 text-green-600" />
          ) : (
            <EyeOff className="h-6 w-6 text-gray-400" />
          )}
          Visibility Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">Current Status:</span>
              <Badge
                variant={isAvailable ? "default" : "secondary"}
                className={isAvailable ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
              >
                {isAvailable ? "Visible to Students" : "Hidden from Students"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              {isAvailable
                ? "Students can find and book sessions with you."
                : "You are hidden from student search results."
              }
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Toggle Visibility</h3>
              <p className="text-sm text-gray-600">
                Change your availability status instantly
              </p>
            </div>
            <Button
              onClick={handleToggle}
              disabled={isLoading}
              className="min-w-[120px] bg-black hover:bg-gray-800 text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Updating...
                </div>
              ) : isAvailable ? (
                "Hide Profile"
              ) : (
                "Show Profile"
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className={`p-4 rounded-lg border-2 transition-colors ${
              isAvailable
                ? "border-green-200 bg-green-50"
                : "border-gray-200 bg-gray-50"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Visible</span>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Appear in student search results</li>
                <li>• Receive booking requests</li>
                <li>• Show availability schedule</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-2 transition-colors ${
              !isAvailable
                ? "border-gray-300 bg-gray-100"
                : "border-gray-200 bg-gray-50"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <EyeOff className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Hidden</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hidden from student searches</li>
                <li>• No new booking requests</li>
                <li>• Profile still accessible via direct link</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
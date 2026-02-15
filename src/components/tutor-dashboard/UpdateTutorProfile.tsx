"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { X, Search, Check, Save, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getCategories, updateTutorProfile } from "@/action/action";

interface Category {
  id: string;
  name: string;
}

interface UpdateProfileProps {
  initialData?: {
    title?: string;
    bio?: string;
    hourlyRate?: number;
    experience?: number;
    categories?: { category: Category }[];
  };
}

export default function UpdateTutorProfile({
  initialData,
}: UpdateProfileProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      bio: initialData?.bio || "",
      hourlyRate: initialData?.hourlyRate || 0,
      experience: initialData?.experience || 0,
      // Mapping nested junction table data to a flat array of IDs
      categories:
        initialData?.categories?.map(
          (c: { category: Category }) => c.category?.id,
        ) || [],
    },
    onSubmit: async ({ value }) => {
      try {
        const toastId = toast.loading("Updating profile...");

        const { data, error } = await updateTutorProfile(value);

        if (error) {
          toast.error(error, { id: toastId });
          return;
        }

        toast.success("Profile Updated Successfully!", { id: toastId });
        ("Updated Data:", data);
      } catch (err) {
        toast.error("An unexpected error occurred.");
        console.error(err);
      }
    },
  });

  // Fetch categories for search
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await getCategories(searchTerm);
        setCategories(data?.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchCategories, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <Card className="max-w-5xl mx-auto mt-8 mb-12 shadow-md">
      <CardHeader className="bg-slate-50/50 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <CardTitle className="text-2xl font-bold">
              Update Tutor Profile
            </CardTitle>
            <CardDescription>
              Modify your teaching profile and expertise.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TITLE */}
              <form.Field name="title">
                {(field) => (
                  <Field className="md:col-span-2">
                    <FieldLabel>Profile Title</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Expert Math and Physics Tutor"
                    />
                  </Field>
                )}
              </form.Field>

              {/* HOURLY RATE */}
              <form.Field name="hourlyRate">
                {(field) => (
                  <Field>
                    <FieldLabel>Hourly Rate (BDT)</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </Field>
                )}
              </form.Field>

              {/* EXPERIENCE */}
              <form.Field name="experience">
                {(field) => (
                  <Field>
                    <FieldLabel>Experience (Years)</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </Field>
                )}
              </form.Field>

              {/* CATEGORIES */}
              <form.Field name="categories">
                {(field) => (
                  <Field className="md:col-span-2">
                    <FieldLabel>Teaching Categories</FieldLabel>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {field.state.value?.map((catId: string) => {
                        // Finding name from newly fetched list or initial data
                        const foundInList = categories.find(
                          (c) => c.id === catId,
                        );
                        const foundInInitial = initialData?.categories?.find(
                          (c) => c.category.id === catId,
                        );
                        const displayName =
                          foundInList?.name ||
                          foundInInitial?.category.name ||
                          "Selected";

                        return (
                          <Badge
                            key={catId}
                            variant="secondary"
                            className="py-1.5 px-3"
                          >
                            {displayName}
                            <X
                              className="ml-2 h-3.5 w-3.5 cursor-pointer hover:text-destructive"
                              onClick={() => {
                                field.handleChange(
                                  field.state.value.filter(
                                    (id: string) => id !== catId,
                                  ),
                                );
                              }}
                            />
                          </Badge>
                        );
                      })}
                    </div>

                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start font-normal text-muted-foreground"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          {loading
                            ? "Loading..."
                            : "Search and add categories..."}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Type a subject (e.g. Math)..."
                            onValueChange={setSearchTerm}
                          />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {categories?.map((cat) => {
                                const isSelected = field.state.value.includes(
                                  cat.id,
                                );
                                return (
                                  <CommandItem
                                    key={cat.id}
                                    onSelect={() => {
                                      const current = field.state.value;
                                      field.handleChange(
                                        isSelected
                                          ? current.filter(
                                              (id: string) => id !== cat.id,
                                            )
                                          : [...current, cat.id],
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        isSelected
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {cat.name}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </Field>
                )}
              </form.Field>
            </div>

            {/* BIO */}
            <form.Field name="bio">
              {(field) => (
                <Field>
                  <FieldLabel>Biography</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={6}
                    placeholder="Tell students about your teaching style and background..."
                  />
                </Field>
              )}
            </form.Field>

            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg" className="px-12 font-semibold">
                <Save className="mr-2 h-5 w-5" /> Save Changes
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import * as z from "zod";
import { toast } from "sonner";
import { X, Search, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { createTutorProfile, getCategories } from "@/action/action";

/* ===============================
    ZOD SCHEMA
================================ */
const profileSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  hourlyRate: z.number().min(3, "Rate must be at least 3 BDT"),
  experience: z.number().min(1, "Experience must be at least 1 number"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
});

type FormValues = z.infer<typeof profileSchema>;

export default function CreateProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [availableCategories, setAvailableCategories] = useState<
    { id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      bio: "",
      hourlyRate: 0,
      experience: 0,
      categories: [],
    } as FormValues,
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Publishing profile...");

      const { data, error } = await createTutorProfile(value);
      if (error) {
        toast.error(error, { id: toastId });
        return;
      }
      toast.success("Profile Publish Successfully!", { id: toastId });
    },
  });

  // Fetch Categories logic
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await getCategories(searchTerm);
        setAvailableCategories(data?.data || []);
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
    <Card className="max-w-4xl mx-auto mt-10 mb-12 shadow-md">
      <CardHeader className="border-b bg-slate-50/50">
        <CardTitle className="text-2xl font-bold">
          Create Tutor Profile
        </CardTitle>
        <CardDescription>
          Setup your tutoring expertise and hourly rates.
        </CardDescription>
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
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g., Professional English & Mathematics Tutor"
                    />
                    <FieldError errors={field.state.meta.errors} />
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
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <form.Field name="experience">
                {(field) => (
                  <Field>
                    <FieldLabel>Hourly Rate (BDT)</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              {/* CATEGORIES */}
            </div>
            <form.Field name="categories">
              {(field) => (
                <Field>
                  <FieldLabel>Subjects</FieldLabel>

                  {/* Selected Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {field.state.value.map((catId) => {
                      const catName =
                        availableCategories.find((c) => c.id === catId)?.name ||
                        "Selected";
                      return (
                        <Badge
                          key={catId}
                          variant="secondary"
                          className="pl-2 pr-1 py-1 flex items-center gap-1"
                        >
                          {catName}
                          <button
                            type="button"
                            onClick={() => {
                              field.handleChange(
                                field.state.value.filter((id) => id !== catId),
                              );
                            }}
                            className="hover:bg-slate-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>

                  {/* Search Popover */}
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-muted-foreground font-normal"
                      >
                        <span className="flex items-center">
                          <Search className="mr-2 h-4 w-4" /> Search subjects...
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[350px] p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search..."
                          onValueChange={setSearchTerm}
                        />
                        <CommandList>
                          <CommandEmpty>
                            {loading ? "Searching..." : "No subjects found."}
                          </CommandEmpty>
                          <CommandGroup>
                            {availableCategories.map((cat) => {
                              const isSelected = field.state.value.includes(
                                cat.id,
                              );
                              return (
                                <CommandItem
                                  key={cat.id}
                                  onSelect={() => {
                                    const nextValue = isSelected
                                      ? field.state.value.filter(
                                          (id) => id !== cat.id,
                                        ) // Deselect
                                      : [...field.state.value, cat.id]; // Select
                                    field.handleChange(nextValue);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      isSelected ? "opacity-100" : "opacity-0",
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
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
            {/* BIO */}
            <form.Field name="bio">
              {(field) => (
                <Field>
                  <FieldLabel>Biography</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Describe your teaching experience, qualifications, and methods..."
                    rows={6}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* SUBMIT */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  className="cursor-pointer"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Publish Profile"}
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

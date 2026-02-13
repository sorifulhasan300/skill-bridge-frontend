"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import * as z from "zod";
import { toast } from "sonner";
import { X, Search, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getCategories } from "@/action/action";

/* ===============================
   ZOD SCHEMA
================================ */
const slotSchema = z.object({
  id: z.string(),
  start: z.string().min(1, "Required"),
  end: z.string().min(1, "Required"),
  booked: z.boolean().default(false),
});

const profileSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  hourlyRate: z.number().min(1, "Rate must be at least 1 BDT"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  timeSlots: z.record(z.array(slotSchema)).optional(),
});

type FormValues = z.infer<typeof profileSchema>;

const days = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

/* ===============================
   COMPONENT
================================ */
export default function CreateProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      bio: "",
      hourlyRate: 0,
      categories: [],
      timeSlots: days.reduce((acc, day) => ({ ...acc, [day]: [] }), {}),
    } as FormValues,
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("FORM SUBMITTED SUCCESSFULLY:", value);
      toast.success("Profile Created Successfully!");
    },
    onSubmitInvalid: ({ formApi }) => {
      console.error("Form Validation Failed:", formApi.state.fieldMeta);
      toast.error("Please fix the errors in the form.");
    },
  });

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
    <Card className="max-w-5xl mx-auto mt-8 mb-12 shadow-lg">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-2xl">Create Tutor Profile</CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-6">
            {/* TITLE */}
            <form.Field name="title">
              {(field) => (
                <Field>
                  <FieldLabel>Profile Title</FieldLabel>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g., Expert Math & Physics Tutor"
                  />
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
                    placeholder="Describe your teaching style..."
                    rows={4}
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
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* CATEGORIES */}
            <form.Field name="categories">
              {(field) => (
                <Field>
                  <FieldLabel>Subjects / Categories</FieldLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.state.value.map((catId) => (
                      <Badge key={catId} variant="secondary">
                        {categories.find((c) => c.id === catId)?.name ||
                          "Loading..."}
                        <X
                          className="ml-2 h-3 w-3 cursor-pointer"
                          onClick={() =>
                            field.handleChange(
                              field.state.value.filter((id) => id !== catId),
                            )
                          }
                        />
                      </Badge>
                    ))}
                  </div>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-muted-foreground"
                      >
                        <Search className="mr-2 h-4 w-4" /> Select subjects...
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search..."
                          onValueChange={setSearchTerm}
                        />
                        <CommandList>
                          <CommandEmpty>
                            {loading ? "Searching..." : "No results"}
                          </CommandEmpty>
                          <CommandGroup>
                            {categories.map((cat) => (
                              <CommandItem
                                key={cat.id}
                                onSelect={() => {
                                  const current = field.state.value;
                                  field.handleChange(
                                    current.includes(cat.id)
                                      ? current.filter((id) => id !== cat.id)
                                      : [...current, cat.id],
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.state.value.includes(cat.id)
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {cat.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* TIME SLOTS */}
            <form.Field name="timeSlots">
              {(field) => (
                <div className="space-y-4 pt-4 border-t">
                  <FieldLabel className="text-lg">
                    Weekly Availability
                  </FieldLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {days.map((day) => (
                      <div
                        key={day}
                        className="p-3 border rounded-lg bg-slate-50"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold uppercase text-xs text-slate-500">
                            {day}
                          </span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-7 text-primary"
                            onClick={() => {
                              const currentSlots =
                                field.state.value?.[day] || [];
                              field.handleChange({
                                ...field.state.value,
                                [day]: [
                                  ...currentSlots,
                                  {
                                    id: crypto.randomUUID(),
                                    start: "09:00",
                                    end: "10:00",
                                    booked: false,
                                  },
                                ],
                              });
                            }}
                          >
                            + Add
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {(field.state.value?.[day] || []).map(
                            (slot, index) => (
                              <div
                                key={slot.id}
                                className="flex items-center gap-2 bg-white p-2 rounded border shadow-sm"
                              >
                                <Input
                                  type="time"
                                  className="h-8 text-xs px-1"
                                  value={slot.start}
                                  onChange={(e) => {
                                    const updated = [
                                      ...field.state.value![day],
                                    ];
                                    updated[index].start = e.target.value;
                                    field.handleChange({
                                      ...field.state.value,
                                      [day]: updated,
                                    });
                                  }}
                                />
                                <Input
                                  type="time"
                                  className="h-8 text-xs px-1"
                                  value={slot.end}
                                  onChange={(e) => {
                                    const updated = [
                                      ...field.state.value![day],
                                    ];
                                    updated[index].end = e.target.value;
                                    field.handleChange({
                                      ...field.state.value,
                                      [day]: updated,
                                    });
                                  }}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-destructive"
                                  onClick={() => {
                                    const updated = field.state.value![
                                      day
                                    ].filter((s) => s.id !== slot.id);
                                    field.handleChange({
                                      ...field.state.value,
                                      [day]: updated,
                                    });
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form.Field>

            {/* SUBMIT */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full h-12 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Publish Profile"}
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

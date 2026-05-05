"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { Mail } from "lucide-react";

const formSchema = z.object({
  name: z.string("").min(5, "password must be at least 5 characters."),
  password: z.string("").min(5, "password must be at least 5 characters."),
  email: z.email(),
  image: z.string(),
  role: z.enum(["STUDENT", "TUTOR"]),
});
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      role: "",
      email: "",
      image: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message as string, { id: toastId });
          return;
        }
        toast.success("Register Successfully", { id: toastId });
        router.push("/login");
      } catch (error) {
        toast.error("Something was wrong, please try again", { id: toastId });
      }
    },
  });

  const handleGmailSignup = async () => {
    // const toastId = toast.loading("Redirecting to Gmail...");
    // try {
    //   const { data, error } = await authClient.signUp.social({
    //     provider: "google",
    //   });
    //   if (error) {
    //     toast.error(error.message, { id: toastId });
    //     return;
    //   }
    //   toast.success("Account created successfully", { id: toastId });
    //   router.push("/login");
    // } catch (error) {
    //   toast.error("Something was wrong", { id: toastId });
    // }
    toast.info(
      "Currently, Gmail signup is not available. Please use email and password to create an account.",
    );
    return;
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGmailSignup}
            className="w-full"
          >
            <Mail className="mr-2 h-4 w-4" />
            Continue with Gmail
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="password">Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Full Name"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="role">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>I want to join as</FieldLabel>

                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select account type</option>
                      <option value="STUDENT">Student</option>
                      <option value="TUTOR">Tutor</option>
                    </select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="password">Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Email"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="password"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="*********"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="image">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="password">Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Profile Image url"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

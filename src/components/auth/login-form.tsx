"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import * as z from "zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Mail } from "lucide-react";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/auth-context";
const formSchema = z.object({
  password: z.string("").min(5, "password must be at least 5 characters."),
  email: z.email(),
});
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const auth = useAuth();
  const refreshAuth = auth?.refreshAuth;

  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("login...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Login Successfully", { id: toastId });
        if (refreshAuth) {
          await refreshAuth();
        }
        router.push("/");
      } catch (error) {
        toast.error("Something was wrong", { id: toastId });
      }
    },
  });

  const handleGmailLogin = async () => {
    // const toastId = toast.loading("Redirecting to Gmail...");
    // try {
    //   const { data, error } = await authClient.signIn.social({
    //     provider: "google",
    //   });
    //   if (error) {
    //     toast.error(error.message, { id: toastId });
    //     return;
    //   }
    //   toast.success("Login Successfully", { id: toastId });
    //   if (refreshAuth) {
    //     await refreshAuth();
    //   }
    //   router.push("/");
    // } catch (error) {
    //   toast.error("Something was wrong", { id: toastId });
    // }
    toast.info(
      "Currently, Gmail signup is not available. Please use email and password to create an account.",
    );
    return;
  };

  const handleDemoLogin = async (email: string, password: string) => {
    const toastId = toast.loading("Login...");
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }
      toast.success("Login Successfully", { id: toastId });
      if (refreshAuth) {
        await refreshAuth();
      }
      router.push("/");
    } catch (error) {
      toast.error("Something was wrong", { id: toastId });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGmailLogin}
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
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="text">Email</FieldLabel>
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
                      <FieldLabel htmlFor="text">Password</FieldLabel>

                      <Input
                        id={field.name}
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Password"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field>
            <Button form="login-form" type="submit">
              Login
            </Button>

            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground text-center">
                Demo Accounts:
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleDemoLogin("admin@gmail.com", "admin@gmail.com")
                  }
                  className="w-full text-xs"
                >
                  Admin Login
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleDemoLogin("tutor123@gmail.com", "tutor123@gmail.com")
                  }
                  className="w-full text-xs"
                >
                  Tutor Login
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleDemoLogin(
                      "soriful.student@gmail.com",
                      "soriful.student@gmail.com",
                    )
                  }
                  className="w-full text-xs"
                >
                  Student Login
                </Button>
              </div>
            </div>

            <FieldDescription className="text-center mt-4">
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

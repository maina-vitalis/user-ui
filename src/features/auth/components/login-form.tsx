"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { getMe, login } from "@/features/auth/api/auth-api";
import { useAuthStore } from "@/lib/store/useAuthStore";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setAuthStatus } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      const me = await getMe();
      setUser(me);
      setAuthStatus("authenticated");
      toast.success("Login successful");
      const redirectPath = searchParams.get("redirect");
      router.push(redirectPath || "/dashboard");
    },

    onError: (error: unknown) => {
      const errorMessage = getApiErrorMessage(error, "Login failed");
      toast.error(errorMessage);
    },
  });

  const onGoogleSignIn = () => {
    console.log("Google sign-in clicked");
  };

  function onSubmit(values: LoginFormValues) {
    mutation.mutate(values);
  }

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-lg">
      <CardHeader className="space-y-2 pb-4  text-center">
        <CardTitle className="text-2xl font-semibold">Login</CardTitle>
        <CardDescription>Enter your credentials to sign in</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={onGoogleSignIn}
            disabled={mutation.isPending}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 py-1 rounded-sm text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder-opacity-50"
                        placeholder="your.email@example.com"
                        type="email"
                        disabled={mutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        disabled={mutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-0">
        <Link
          href="/forgot-password"
          className="text-sm text-primary font-medium hover:underline self-start"
        >
          Forgot password?
        </Link>
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

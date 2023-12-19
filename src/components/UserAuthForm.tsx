"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff, Shell } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAuthValidator } from "@/lib/Validators/accountValidator";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<loginAuthValidator>({
    resolver: zodResolver(loginAuthValidator),
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const onSubmit = async ({ email, password }: loginAuthValidator) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        toast.error("Invalid Credentials.");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      toast.success("Login successfully");
      router.replace("/shop");
    } catch {
      setIsLoading(false);
      toast.error("something went wrong, try again later.");
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <div>
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                placeholder="email@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs pt-2">{`${errors.email.message}`}</p>
              )}
            </div>
            <div className="relative">
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                {...register("password")}
                id="email"
                placeholder="password"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-xs pt-2">{`${errors.password.message}`}</p>
              )}
              <button
                type="button"
                className="absolute top-2 right-0 flex items-center pr-3 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading || !watchEmail || !watchPassword}
          >
            {isLoading && <Shell className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

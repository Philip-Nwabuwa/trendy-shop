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
import AuthValidator, {
  TAuthValidator,
} from "@/lib/Validators/accountValidator";
import { toast } from "sonner";
import { useRegisterUser, useValidateUser } from "@/hooks/formHook";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const { mutateAsync: registerUser, isLoading } = useRegisterUser();
  const { mutateAsync: validateUser } = useValidateUser();

  const onSubmit = async ({ email, password }: TAuthValidator) => {
    try {
      const registeredUser = await validateUser({ email });
      if (registeredUser.data.user === null) {
        const result = await registerUser({ email, password });
        reset();
        toast.success(result.data.message);
      } else {
        toast.error("The user has already been registered. Proceed to login");
        return;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
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
            disabled={isLoading || !isValid || !watchEmail || !watchPassword}
          >
            {isLoading && <Shell className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}

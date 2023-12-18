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
import { useRouter } from "next/navigation";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
    mode: "onChange",
  });
  type View = "firstView" | "secondView";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [view, setView] = useState<View>("firstView");

  const handleFirstForm = () => {
    setView("secondView");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const watchEmail = watch("email");
  const watchZipcode = watch("zipcode");
  const watchLastName = watch("lastName");
  const watchFirstName = watch("firstName");
  const watchPassword = watch("password");
  const { mutateAsync: registerUser, isLoading } = useRegisterUser();
  const { mutateAsync: validateUser } = useValidateUser();

  const handleBackbutton = () => {
    setView("firstView");
  };

  const onSubmit = async ({
    email,
    password,
    firstName,
    lastName,
    address,
  }: TAuthValidator) => {
    console.log(email, password, firstName, lastName, address);
    reset();
    // try {
    //   if (password !== confirmPassword) {
    //     toast.error("Passwords do not match");
    //     return;
    //   }
    //   const registeredUser = await validateUser({ email });
    //   if (registeredUser.data.user === null) {
    //     const result = await registerUser({ email, password });
    //     reset();
    //     toast.success(result.data.message);
    //     router.push("/login");
    //   } else {
    //     toast.error("The user has already been registered. Proceed to login");
    //     return;
    //   }
    // } catch (error: any) {
    //   const errorMessage = error.response?.data?.message || "An error occurred";
    //   toast.error(errorMessage);
    // }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-3">
            {view === "firstView" && (
              <>
                <div>
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    {...register("email", { required: "Email is required" })}
                    id="email"
                    placeholder="email@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500">{`${errors.email.message}`}</p>
                  )}
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    Zip Code
                  </Label>
                  <Input
                    {...register("zipcode")}
                    id="zipcode"
                    placeholder="Zipcode"
                    type="number"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  disabled={isSubmitting || !watchEmail || !watchZipcode}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting && (
                    <Shell className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Continue
                </Button>
              </>
            )}

            {view === "secondView" && (
              <>
                <Button onClick={handleBackbutton}>back</Button>

                <div className="relative">
                  <Label className="sr-only" htmlFor="email">
                    Password
                  </Label>
                  <Input
                    {...register("password")}
                    id="password"
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
                <div className="relative">
                  <Label className="sr-only" htmlFor="email">
                    Confirm Password
                  </Label>
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-0 flex items-center pr-3 focus:outline-none"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    First Name
                  </Label>
                  <Input
                    {...register("firstName")}
                    id="firstName"
                    placeholder="First Name"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    Last Name
                  </Label>
                  <Input
                    {...register("lastName")}
                    id="lastName"
                    placeholder="Last Name"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    Street
                  </Label>
                  <Input
                    {...register("address.street")}
                    id="street"
                    placeholder="Street"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    City
                  </Label>
                  <Input
                    {...register("address.city")}
                    id="city"
                    placeholder="City"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    State
                  </Label>
                  <Input
                    {...register("address.state")}
                    id="state"
                    placeholder="State"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="text">
                    Country
                  </Label>
                  <Input
                    {...register("address.country")}
                    id="Country"
                    placeholder="Country"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  // disabled={
                  //   isLoading ||
                  //   !isValid ||
                  //   !watchEmail ||
                  //   !watchPassword ||
                  //   !confirmPassword
                  // }
                  onClick={handleSubmit(onSubmit)}
                >
                  {isLoading && <Shell className="mr-2 h-4 w-4 animate-spin" />}
                  Continue
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

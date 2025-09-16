"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import signUpImg from "@/assets/auth/register.png";
import { Label } from "../ui/label";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/Slices/AuthSlice/authSlice";
import { AppDispatch, RootState } from "@/store/store";

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    remember: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpSchemaType = z.infer<typeof signUpSchema>;

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignIn: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({
  open,
  onOpenChange,
  onSwitchToSignIn,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { remember: false },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      const res = await dispatch(
        registerUser({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
      ).unwrap();

      toast.success("Registered successfully! Please verify OTP.");
      console.log("📌 Register Response:", res);
      reset();

      // keep modal open for OTP or close and show VerifyOtpModal
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err || "Registration failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl overflow-hidden bg-[#FAFDFF] border-none rounded-none p-6">
        <div className="grid md:grid-cols-12 max-w-full md:gap-6 lg:items-center">
          <div className="hidden md:block md:col-span-7">
            <Image
              src={signUpImg}
              alt="Register"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-5 flex flex-col justify-between">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold mb-2 font-cursive">
                <img src="/TAC1.png" className="max-w-sm" alt="" />
              </DialogTitle>
              <h3 className="text-xl text-accent-orange font-semibold">
                Register
              </h3>
              <p className="text-sm text-gray-600">
                Create your account and enjoy the articles of{" "}
                <span className="font-semibold">The Australian Canvas</span>.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <Label className="mb-1">Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label className="mb-1">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Min. 6 characters"
                    className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-1">Re-enter Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Re-enter password"
                  className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-brick-red hover:bg-[#7c2d22] text-white px-3 sm:px-4 md:px-6 py-2 rounded-none border text-sm border-[#62180F]"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={onSwitchToSignIn}
                className="text-brick-red font-semibold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;

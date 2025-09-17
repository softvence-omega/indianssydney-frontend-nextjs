"use client";

import signUpImg from "@/assets/auth/register.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/store/features/auth/auth.api";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "../ui/label";
import VerifyOtpModal from "./VerifyOtpModal";

type SignUpSchemaType = {
  email: string;
  password: string;
  confirmPassword: string;
  remember?: boolean;
};

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
  const [openVerifyOtpModal, setOpenVerifyOtpModal] = React.useState(false);
  const [email, setEmail] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [registerNewUser] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    defaultValues: { remember: false },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    setEmail(data.email);

    try {
      const result = await registerNewUser(data).unwrap();
      if (result?.resetToken) {
        setOpenVerifyOtpModal(true);
        toast.success("Registered successfully! Please verify OTP.");
        reset();
        onOpenChange(false);
      } else {
        toast.error(result?.data?.message || "Registration failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
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
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
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
                    {...register("confirmPassword", {
                      required: "Please re-enter password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
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
      <VerifyOtpModal
        open={openVerifyOtpModal}
        onOpenChange={setOpenVerifyOtpModal}
        email={email}
      />
    </>
  );
};

export default SignUpModal;

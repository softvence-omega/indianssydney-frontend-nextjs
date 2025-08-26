import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Label } from "../ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

// ✅ Schema with password confirmation
const resetSchema = z
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

type ResetPasswordType = z.infer<typeof resetSchema>;

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResetPasswordModal: React.FC<SignUpModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetSchema),
    defaultValues: { remember: false },
  });

  const onSubmit = (data: ResetPasswordType) => {
    toast.success("Registered Successfully!");
    console.log("✅ Registration Data:", data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl overflow-hidden bg-[#FAFDFF] border-none rounded-none p-6">
        <div className="">
          {/* Left Image */}

          {/* Right Form */}
          <div className="md:col-span-5 flex flex-col justify-between text-center">
            <DialogHeader>
              <DialogTitle className="text-xl lg:text-2xl text-center  font-bold mb-2 text-accent-orange">
                Reset Password
              </DialogTitle>

              <p className="text-sm text-gray-600 text-center">
                Enter your new password to change the old one.
              </p>
            </DialogHeader>

            {/* ✅ Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    className="rounded-none mt-2 pr-10 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label>Re-enter Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    className="rounded-none mt-2 pr-10 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4"
                    {...register("confirmPassword")}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                className="bg-brick-red hover:bg-[#7c2d22] text-white px-3 sm:px-4 md:px-6 py-2 rounded-none border text-sm border-[#62180F]"
                type="submit"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;

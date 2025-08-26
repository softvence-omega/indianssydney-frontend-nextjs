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

// ✅ Schema with password confirmation
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
  onSwitchToSignIn: () => void; // New prop for switching to signin
};

const SignUpModal: React.FC<SignUpModalProps> = ({
  open,
  onOpenChange,
  onSwitchToSignIn,
}) => {
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

  const onSubmit = (data: SignUpSchemaType) => {
    toast.success("Registered Successfully!");
    console.log("✅ Registration Data:", data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl overflow-hidden bg-[#FAFDFF] border-none rounded-none p-6">
        <div className="grid md:grid-cols-12 max-w-full md:gap-6 lg:items-center">
          {/* Left Image */}
          <div className="hidden md:block md:col-span-7">
            <img
              src={signUpImg}
              alt="Register"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <DialogHeader>
              <DialogTitle className="text-3xl lg:text-[32px] font-bold mb-2 font-cursive">
                The Australian Canvas
              </DialogTitle>
              <h3 className="text-xl text-accent-orange font-semibold">
                Register
              </h3>
              <p className="text-sm text-gray-600">
                Create your account and enjoy the articles of
                <span className="font-semibold"> The Australian Canvas</span>.
              </p>
            </DialogHeader>

            {/* ✅ Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
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
                Register
              </button>
            </form>

            {/* Login Link - Updated to use onSwitchToSignIn */}
            <p className="text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={onSwitchToSignIn}
                className="text-brick-red font-semibold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>

            {/* Divider */}
            <p className="text-center py-4 text-xs">Or sign in with</p>

            {/* Google Button */}
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                className="w-full rounded-none border-slight-border px-4 py-3 h-auto flex justify-center items-center"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                <p className="text-sm">Google</p>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;

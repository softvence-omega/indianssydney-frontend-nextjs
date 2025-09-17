import signInImg from "@/assets/auth/signIn.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import { Label } from "../ui/label";

import { AppDispatch } from "@/store/store";
import Image from "next/image";
import { useDispatch } from "react-redux";

// ✅ Schema
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

type SignInModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignUp: () => void;
  onSwitchToForgot: () => void;
  onSwitchToReset: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({
  open,
  onOpenChange,
  onSwitchToSignUp,
  onSwitchToForgot,
  // onSwitchToReset,
}) => {
  const dispatch = useDispatch<AppDispatch>(); // Initialize useDispatch
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      remember: false,
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    try {
      // await dispatch(
      //   loginUser({ email: data?.email, password: data?.password })
      // ).unwrap();
      toast.success("Logged In Successfully");
      reset();
      onOpenChange(false);
    } catch (err) {
      console.log(err)
      const message =
        err instanceof Error ? err.message : String(err);
      toast.error(message || "Login failed");
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl overflow-hidden bg-[#FAFDFF] border-none rounded-none p-6">
        <div className="grid md:grid-cols-12 max-w-full md:gap-6 lg:items-center">
          {/* Left Image */}
          <div className="hidden md:block md:col-span-7">
            <Image
              src={signInImg}
              alt="Sign In"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <DialogHeader>
              <DialogTitle className="text-3xl lg:text-[32px] font-bold mb-2 font-cursive">
                <img src="/TAC1.png" alt="" className="max-w-sm" />
              </DialogTitle>
              <h3 className="text-xl text-accent-orange font-semibold">
                Sign In
              </h3>
              <p className="text-sm text-gray-600">
                Welcome back! <br />
                Sign in to your account and enjoy the articles of
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
                    placeholder="Password"
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

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="remember"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="remember"
                      />
                    )}
                  />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
                <p
                  onClick={onSwitchToForgot}
                  className="text-sm text-brick-red hover:underline"
                >
                  Forgot password?
                </p>
              </div>

              {/* Submit */}
              <button
                className="bg-brick-red hover:bg-[#7c2d22] text-white px-3 sm:px-4 md:px-6 py-2 rounded-none border text-sm border-[#62180F]"
                type="submit"
              >
                Sign In
              </button>
            </form>

            {/* Register Link */}
            <p className="text-sm mt-4">
              Not registered yet?
              <span
                onClick={onSwitchToSignUp}
                className="text-brick-red font-semibold ml-2 cursor-pointer hover:underline"
              >
                Register Now
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

export default SignInModal;

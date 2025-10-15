import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";

// ✅ Schema with password confirmation
const forgotSchema = z
  .object({
    email: z.string().email("Invalid email address"),
  })

type ForgotSchemaType = z.infer<typeof forgotSchema>;

type ForgotModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ForgotPasswordModal: React.FC<ForgotModalProps> = ({
  open,
  onOpenChange,
}) => {


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotSchemaType>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotSchemaType) => {
    toast.success("Registered Successfully!");
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
                Forgot Password
              </DialogTitle>

              <p className="text-sm text-gray-600 text-center">
                Enter your email to send the reset link.
              </p>
            </DialogHeader>

            {/* ✅ Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
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

export default ForgotPasswordModal;

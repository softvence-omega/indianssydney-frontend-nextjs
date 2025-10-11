"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { useVerifyOTPMutation } from "@/store/features/auth/auth.api"; // <-- use your API hook

type VerifyOtpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string | null;
};

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({
  open,
  onOpenChange,
  email,
}) => {
  const [otp, setOtp] = useState("");
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const handleVerify = async () => {
    try {
      const resetToken = localStorage.getItem("resetToken");
      if (!resetToken) throw new Error("Missing resetToken");
      if (!email) throw new Error("Missing email");

      // 🔹 Call backend with resetToken + emailOtp
      const res = await verifyOTP({
        resetToken,
        emailOtp: otp,
      });

      toast.success("OTP verified successfully!");
      setOtp("");
      onOpenChange(false); // close modal
    } catch (err: any) {
      toast.error(
        err?.data?.message || err.message || "OTP verification failed"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#FAFDFF] border-none rounded-none p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">
            Verify Your Email
          </DialogTitle>
          <p className="text-sm text-gray-600">
            OTP has been sent to <span className="font-semibold">{email}</span>.
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="rounded-none bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4 text-center tracking-widest"
          />

          <Button
            onClick={handleVerify}
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-brick-red hover:bg-[#7c2d22] text-white rounded-none border border-[#62180F]"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyOtpModal;

"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSubscribeMutation } from "@/store/features/newsletter/newsletter.api";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const res = await subscribe({ email }).unwrap();
      toast.success(res?.message || "Subscribed successfully!");
      setEmail(""); // clear input on success
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to subscribe. Please try again."
      );
    }
  };

  return (
    <Card className="bg-accent-orange/10 border-accent-orange shadow-sm">
      <CardContent>
        <h3 className="text-xl lg:text-3xl font-bold mb-2 text-accent-orange text-center">
          Stay Informed
        </h3>
        <p className="text-sm md:text-base font-semibold mb-4 text-center">
          Get breaking news and analysis delivered to your inbox
        </p>
        <div className="space-y-3">
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white h-auto py-2 shadow-none"
          />
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-accent-orange hover:bg-orange-500"
          >
            {isLoading ? "Subscribing..." : "Subscribe Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Newsletter;

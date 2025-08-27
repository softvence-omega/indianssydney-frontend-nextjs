"use client";

import { useState } from "react";
import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Button } from "@/components/ui/button";

import paypalImg from "@/assets/other/paypal.svg";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

const benefits = [
  {
    title: "Article",
    description:
      "Engage with expert reporting, including culture coverage and analysis.",
  },
  {
    title: "Podcast",
    description:
      "Engage with expert reporting, including culture coverage and analysis.",
  },
  {
    title: "Video",
    description:
      "Engage with expert reporting, including culture coverage and analysis.",
  },
  {
    title: "Live Event",
    description:
      "Engage with expert reporting, including culture coverage and analysis.",
  },
];
const plans = [
  {
    id: "weekly",
    label:
      "$0.25/week for your first year, billed as $1 every four weeks, then $12 thereafter.",
    price: "$0.25/week",
    description:
      "$1 every four weeks for your first year, then $12 thereafter.",
  },
  {
    id: "yearly",
    label: "$10/year billed once for your first year, then $90 thereafter.",
    price: "$10/year",
    description: "Billed once for your first year, then $90 thereafter.",
  },
];

const Subscription = () => {
  // Dynamic plan array

  const [subscriptionPlan, setSubscriptionPlan] = useState<string>(plans[0].id);

  return (
    <div>
      <CommonWrapper>
        <CommonPadding>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-2 font-cursive">
              The Australian Canvas
            </h1>
            <p className="text-xl md:text-3xl lg:text-[32px] font-bold mb-2 py-3 md:py-5">
              With no limits comes new horizons
            </p>

            <PrimaryButton
              title="Our Sale is on, Don’t miss out"
              className="bg-transparent text-brick-red font-semibold border-2 border-brick-red hover:bg-amber-50 mb-6 md:mb-8"
            />

            {/* Subscription Plan Selection with RadioGroup */}
            <div className="mb-6 max-w-md mx-auto">
              <RadioGroup
                value={subscriptionPlan}
                onValueChange={setSubscriptionPlan}
                className="space-y-4"
              >
                {plans.map((plan) => (
                  <div key={plan.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={plan.id} id={plan.id} />
                    <Label
                      htmlFor={plan.id}
                      className="text-base md:text-lg font-medium leading-snug cursor-pointer"
                    >
                      {plan.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
              <PrimaryButton
                title="Continue With Card"
                className="bg-blue-primary text-white hover:bg-blue-primary/90 border-blue-primary px-8 py-2"
              />
              <Button className="bg-transparent text-white hover:bg-white px-8 border-blue-primary sm:px-4 md:px-6 py-2 rounded-none text-sm cursor-pointer border-2">
                <img src={paypalImg} alt="PayPal" width={60} height={10} />
              </Button>
            </div>

            {/* Subscribers enjoy more section */}
            <div className="mt-10 md:mt-16 text-left">
              <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold mb-4 md:mb-8 max-w-xl text-center mx-auto">
                Subscribers enjoy more with The Australian Canvas All Access.
              </h3>
              <ul className="space-y-5 max-w-xl mx-auto">
                {benefits.map((benefit, index, arr) => (
                  <li
                    key={index}
                    className={`pb-4 ${
                      index < arr.length - 1 ? "border-b border-gray-900" : ""
                    }`}
                  >
                    <strong className="text-lg md:text-2xl font-semibold">
                      {benefit.title}
                    </strong>
                    <br />
                    <p className="text-sm md:text-base">
                      {" "}
                      {benefit.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default Subscription;

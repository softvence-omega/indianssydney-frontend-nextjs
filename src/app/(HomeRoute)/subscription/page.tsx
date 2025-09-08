"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/components/reusable/PrimaryButton";


import PlanCard from "./PlanCard";

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
    price: "$5",
    duration: "/Month",
    description:
      "Access daily articles, breaking news, and limited features. Perfect for casual readers.",
    features: [
      "Daily news updates",
      "Access to top stories",
      "Mobile-friendly design",
      "Limited access to archives",
      "Limited access to archives",
    ],
    buttonText: "Subscribe Basic",
  },
  {
    price: "$15",
    duration: "/Month",
    description:
      "Enjoy unlimited access to premium articles, in-depth reports, and exclusive newsletters.",
    features: [
      "Unlimited premium articles",
      "Full archive access",
      "Exclusive newsletters",
      "Ad-free experience",
      "Early access to special reports",
    ],
    buttonText: "Subscribe Premium",
  },
];

const Subscription = () => {
  // Dynamic plan array


  return (
    <div>
      <CommonWrapper>
        <CommonPadding>
          <div className="max-w-3xl mx-auto text-center">
            <img src="/TAC1.png" className="w-full" alt="" />
            <p className="text-xl md:text-3xl lg:text-[32px] font-bold mb-2 py-3 md:py-5">
              With no limits comes new horizons
            </p>

            <PrimaryButton
              title="Our Sale is on, Don’t miss out"
              className="bg-transparent text-brick-red font-semibold border-2 border-brick-red hover:bg-amber-50 mb-6 md:mb-8"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center py-10">
              {plans.map((plan, index) => (
                <PlanCard key={index} {...plan} />
              ))}
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

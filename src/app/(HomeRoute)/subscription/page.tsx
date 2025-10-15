"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import PlanCard from "./PlanCard";
import { useGetAllPlanQuery } from "@/store/features/plans/plans.api";

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

const Subscription = () => {
  const { data: plansData, isLoading, isError } = useGetAllPlanQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading plans</div>;

  const plans = plansData?.data || [];

  return (
    <div>
      <CommonWrapper>
        <CommonPadding>
          <div className="max-w-3xl mx-auto text-center">
            <img src="/TAC1.png" className="w-full" alt="Subscription Banner" />
            <p className="text-xl md:text-3xl lg:text-[32px] font-bold mb-2 py-3 md:py-5">
              With no limits comes new horizons
            </p>

            <PrimaryButton
              title="Our Sale is on, Don’t miss out"
              className="bg-transparent text-brick-red font-semibold border-2 border-brick-red hover:bg-amber-50 mb-6 md:mb-8"
            />

            {/* Plans Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center py-10">
              {plans?.length > 0 ? (
                plans.map((plan: any) => (
                  <PlanCard
                    id={plan?.id}
                    key={plan?.id}
                    price={`$${plan?.Price}`}
                    duration={
                      plan?.billingCycle === "MONTHLY"
                        ? "/Month"
                        : plan?.billingCycle === "YEARLY"
                        ? "/Year"
                        : ""
                    }
                    description={plan?.shortBio || ""}
                    features={plan?.features || []}
                    buttonText={`Subscribe ${plan?.name}`}
                  />
                ))
              ) : (
                <p>No plans available</p>
              )}
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
                      {benefit?.title}
                    </strong>
                    <br />
                    <p className="text-sm md:text-base">
                      {benefit?.description}
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

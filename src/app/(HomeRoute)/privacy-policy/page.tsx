"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import CommonHeader from "@/components/reusable/CommonHeader";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";
import { useGetAllPrivacyPolicyQuery } from "@/store/features/site/privacy.api"; // ✅ use query hook

const PrivacyPolicy = () => {
  const { data, isLoading, isError } = useGetAllPrivacyPolicyQuery({});

  if (isLoading) {
    return (
      <CommonWrapper>
        <SkeletonLoader />
      </CommonWrapper>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load Privacy Policies. Please try again later.
      </div>
    );
  }

  const privacyPolicies = data?.data || [];

  return (
    <div className="bg-white">
      <CommonHeader
        title="Privacy Policy"
        description="Below are our privacy policies explaining how we handle and protect your information."
      />
      <CommonWrapper>
        <CommonPadding>
          <div className="px-6 py-8">
            {privacyPolicies.map((section: any, index: number) => (
              <div key={section.id || index} className="pb-10">
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {section.subtext}
                </p>
              </div>
            ))}

            {privacyPolicies.length === 0 && (
              <p className="text-gray-500 text-center">
                No privacy policies found.
              </p>
            )}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default PrivacyPolicy;

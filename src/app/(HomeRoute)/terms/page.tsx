"use client";

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import CommonHeader from "@/components/reusable/CommonHeader";
import { useGetAllTermsQuery } from "@/store/features/site/terms.api";
import { Loader2 } from "lucide-react";

const Terms = () => {
  const { data, isLoading, isError } = useGetAllTermsQuery({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load Terms & Conditions. Please try again later.
      </div>
    );
  }

  const termsData = data?.data || [];

  return (
    <div className="bg-white">
      <CommonHeader
        title="Terms & Conditions"
        description="Please read our terms and conditions carefully before using our platform."
      />
      <CommonWrapper>
        <CommonPadding>
          <div className="px-6 py-8">
            {termsData.map((section: any, index: number) => (
              <section key={section.id || index} className="mb-10">
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}

            {termsData.length === 0 && (
              <p className="text-gray-500 text-center">
                No Terms & Conditions found.
              </p>
            )}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default Terms;

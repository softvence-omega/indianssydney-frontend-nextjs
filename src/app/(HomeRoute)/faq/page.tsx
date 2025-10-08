"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CommonHeader from "@/components/reusable/CommonHeader";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";
import { useGetAllFAQQuery } from "@/store/features/site/faq.api";
import { Loader2 } from "lucide-react";

const FAQ = () => {
  const { data, isLoading, isError } = useGetAllFAQQuery({});

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
        Failed to load FAQs. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white">
      <CommonHeader
        title="FAQ"
        description="Find answers to the most common questions below, grouped by topic."
      />

      <CommonWrapper>
        <CommonPadding>
          <div className="px-6 py-8">
            {/* Iterate over each section from API */}
            {data?.data?.map((section: any) => (
              <div key={section.id} className="mb-12">
                <h2 className="text-xl font-semibold mb-4">
                  {section.sectionTitle}
                </h2>

                <Accordion type="single" collapsible>
                  {/* Iterate over FAQ items in each section */}
                  {section.faqs?.map((faq: any) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="hover:text-accent-orange">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            {/* If no FAQs */}
            {data?.data?.length === 0 && (
              <p className="text-gray-500 text-center">No FAQs available.</p>
            )}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default FAQ;

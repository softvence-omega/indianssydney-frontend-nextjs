import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CommonHeader from "@/components/reusable/CommonHeader";
import CommonWrapper from "@/common/CommonWrapper";
import CommonPadding from "@/common/CommonPadding";

// FAQ data with multiple sections and each section having multiple FAQs
const faqSections = [
  {
    sectionTitle: "General FAQs",
    items: [
      {
        question: "What we need from you?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        question: "How we protect your data?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        question: "Your privacy with our collaborators and marketers",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        question: "Your References and Responsibilities",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
  },
  {
    sectionTitle: "Privacy Policies",
    items: [
      {
        question: "Our Email Guidelines",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        question: "Cookie Policy",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
      {
        question: "The Australian Canvas privacy policy",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      },
    ],
  },
  // Add more sections as needed
];

const FAQ = () => {
  return (
    <div className="bg-white">
      <CommonHeader
        title="FAQ"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />

      <CommonWrapper>
        <CommonPadding>
          <div className="px-6 py-8">
            {/* Iterate over each section */}
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-12">
                <h2 className="text-xl font-semibold mb-4">
                  {section.sectionTitle}
                </h2>

                <Accordion type="single" collapsible>
                  {/* Iterate over FAQ items in each section */}
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${itemIndex}`}>
                      <AccordionTrigger className="hover:text-accent-orange">{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default FAQ;

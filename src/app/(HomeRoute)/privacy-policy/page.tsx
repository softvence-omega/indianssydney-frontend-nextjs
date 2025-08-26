import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import CommonHeader from "@/components/reusable/CommonHeader";

// Define privacy policy sections
const privacySections = [
  {
    title: "What we need from you",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "How we protect your data",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "The Australian Canvas privacy policy",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Your privacy with our collaborators and marketers",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Our Email Guidelines",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
      <CommonHeader
        title="Privacy Policy"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
      <CommonWrapper>
        <CommonPadding>
          <div className="px-6 py-8">
            {privacySections.map((section, index) => (
              <div key={index} >
                <div className="pb-10">
                    <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <p>{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default PrivacyPolicy;

"use client";

import CommonWrapper from "@/common/CommonWrapper";
import Chatbot from "@/components/chatbot/Chatbot";
import BusinessInnovation from "@/components/home/BusinessInnovation";
import EducationCareer from "@/components/home/EducationCareer";
import NewsCurrent from "@/components/home/NewsCurrent/NewsCurrent";
import PodcastVideo from "@/components/home/PodcastVideo";
import Recommendation from "@/components/home/Recommendation";
import SportsPlay from "@/components/home/SportsPlay";
import Ad from "@/components/reusable/Ad";
import AustralianCanvasLoader from "@/components/reusable/AustralianCanvasLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetHomePageDataQuery } from "@/store/features/article/article.api";
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";

const Page = () => {
  const { data, isLoading, isError } = useGetHomePageDataQuery({});

  if (isLoading)
    return <AustralianCanvasLoader />;
    // return <HomePageLoader />;
  if (isError)
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>
            This is an alert with icon, title and description.
          </AlertDescription>
        </Alert>
        <Alert>
          <PopcornIcon />
          <AlertTitle>
            This Alert has a title and an icon. No description.
          </AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div>
      <CommonWrapper>
        <div className="overflow-hidden">
          <NewsCurrent data={data?.data?.[0]} />
          <Ad />
          <BusinessInnovation data={data?.data?.[1]} />
          <Ad />
          <EducationCareer data={data?.data?.[2]} />
          <Ad />
          <SportsPlay data={data?.data?.[3]} />
          <Ad />
          <NewsCurrent data={data?.data?.[4]} />
          <Ad />
          <PodcastVideo />
          <Ad />
          <EducationCareer data={data?.data?.[5]} />
          <Ad />
          <Recommendation />
          <div className=" bottom-4 right-4 z-50">
            <Chatbot />
          </div>
          <Ad/>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Page;

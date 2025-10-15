"use client";

import CommonWrapper from "@/common/CommonWrapper";
import Chatbot from "@/components/chatbot/Chatbot";
import ArtsMedia from "@/components/home/ArtsMedia";
import BusinessInnovation from "@/components/home/BusinessInnovation";
import EducationCareer from "@/components/home/EducationCareer";
import LifeLiving from "@/components/home/LifeLiving";
import NewsCurrent from "@/components/home/NewsCurrent/NewsCurrent";
import PodcastVideo from "@/components/home/PodcastVideo";
import Recommendation from "@/components/home/Recommendation";
import SportsPlay from "@/components/home/SportsPlay";
import Ad from "@/components/reusable/Ad";
import { useGetHomePageDataQuery } from "@/store/features/article/article.api";

const Page = () => {
  const { data, isLoading, isError } = useGetHomePageDataQuery({});

  if (isLoading)
    return (
      <div className="p-10 text-xl min-h-[50vh] text-center animate-pulse flex items-center justify-center">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="p-10 text-xl text-red-500">Error loading articles</div>
    );

  return (
    <div>
      <CommonWrapper>
        <div className="overflow-hidden">
          <NewsCurrent data={data?.data?.[0]} />
          <BusinessInnovation data={data?.data?.[1]} />
          <EducationCareer data={data?.data?.[2]} />
          <Ad />
          <SportsPlay data={data?.data?.[3]} />
          {/* <LifeLiving data={data?.data?.[0]} /> */}
          {/* <ArtsMedia /> */}
          <NewsCurrent data={data?.data?.[4]} />
          <PodcastVideo />
          <Ad />
          <EducationCareer data={data?.data?.[5]} />

          {/* <EnvironmentPlanet />
        <FoodFlavours />
        <CultureIdentity />
        <VoicesPerspective />
        */}
          <Recommendation />
          <div className=" bottom-4 right-4 z-50">
            <Chatbot />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Page;

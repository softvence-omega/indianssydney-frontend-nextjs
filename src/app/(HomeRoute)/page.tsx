import CommonWrapper from "@/common/CommonWrapper";
import ArtsMedia from "@/components/home/ArtsMedia";
import BusinessInnovation from "@/components/home/BusinessInnovation";
import EducationCareer from "@/components/home/EducationCareer";
import NewsCurrent from "@/components/home/NewsCurrent/NewsCurrent";
import SportsPlay from "@/components/home/SportsPlay";
import Ad from "@/components/reusable/Ad";
import Recommendation from "@/components/home/Recommendation";
import EnvironmentPlanet from "@/components/home/EnvironmentPlanet copy";
import LifeLiving from "@/components/home/LifeLiving";
import PodcastVideo from "@/components/home/PodcastVideo";
import FoodFlavours from "@/components/home/FoodFlavours";
import CultureIdentity from "@/components/home/CultureIdentity";
import VoicesPerspective from "@/components/home/VoicesPerspective";
import Chatbot from "@/components/chatbot/Chatbot";

const page = () => {
  return (
    <div>
      <CommonWrapper>
        <NewsCurrent />
        <BusinessInnovation />
        <EducationCareer />
        <Ad />
        <SportsPlay />
        <LifeLiving />
        <ArtsMedia />
        <PodcastVideo />
        <Ad />
        <EnvironmentPlanet />
        <FoodFlavours />
        <CultureIdentity />
        <VoicesPerspective />
        <Recommendation />
        <div className=" bottom-4 right-4 fixed z-50">
          <Chatbot/>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default page;

import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import LivePodcastCard from "@/components/live-podcast/LiveCard";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";

const PodcastVideoPage = () => {
  return (
    <div>
      <CommonWrapper>
        <CommonPadding>
          <PrimaryHeading title="Podcasts & Videos" icon={false} />

          <div>
            <PrimaryHeading title="Live Podcasts" />
            <LivePodcastCard
              episode="01"
              title="Understanding TypeScript"
              description="A deep dive into the features and benefits of TypeScript for modern web development."
              liveStatus={true}
              views={150}
              imageSrc="/images/podcast-thumbnail.jpg"
            />
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default PodcastVideoPage;

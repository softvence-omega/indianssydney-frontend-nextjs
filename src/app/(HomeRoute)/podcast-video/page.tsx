import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";

const PodcastVideoPage = () => {
  return (
    <div>
      <CommonWrapper>
        <CommonPadding>
          <PrimaryHeading title="Podcasts & Videos" icon={false} />

          <div>
          <PrimaryHeading title="Live Podcasts" />

          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default PodcastVideoPage;

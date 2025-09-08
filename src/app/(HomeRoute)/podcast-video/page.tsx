import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";
import LivePodcastCard from "@/components/live-podcast/LiveCard";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import LivePodcasts from "./LivePodcasts";
import UpcomingPodcasts from "./UpcomingPodcasts";
import WeeklyMagazine from "./WeeklyMagazine";

const PodcastVideoPage = () => {
  return (
    <div>
      <CommonWrapper>
        <CommonPadding>
          <PrimaryHeading title="Podcasts & Videos" icon={false} />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="col-span-3">
              <LivePodcasts />
            </div>
            <UpcomingPodcasts />
          </div>
          <div className="my-6">

          <WeeklyMagazine  />
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default PodcastVideoPage;

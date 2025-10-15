import LivePodcasts from "@/app/(HomeRoute)/podcast-video/LivePodcasts";
import Podcasts from "@/app/(HomeRoute)/podcast-video/Podcasts";
import TopStories from "@/app/(HomeRoute)/podcast-video/TopStories";
import UpcomingPodcasts from "@/app/(HomeRoute)/podcast-video/UpcomingPodcasts";
import WeeklyMagazine from "@/app/(HomeRoute)/podcast-video/WeeklyMagazine";
import CommonPadding from "@/common/CommonPadding";
import CommonWrapper from "@/common/CommonWrapper";

const PodcastVideo = () => {
  return (
    <div>
      <CommonWrapper>
        <CommonPadding>
          {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="col-span-3">
              <LivePodcasts />
            </div>
            <UpcomingPodcasts />
          </div> */}
          <div className="my-6">
            <WeeklyMagazine />
          </div>
          <div className="my-6">
            <Podcasts />
          </div>
          <div className="mb-6">
            {/* <TopStories /> */}
          </div>
        </CommonPadding>
      </CommonWrapper>
    </div>
  );
};

export default PodcastVideo;

import LivePodcasts from "@/app/(HomeRoute)/podcast-video/LivePodcasts";
import TopStories from "@/app/(HomeRoute)/podcast-video/TopStories";
import UpcomingPodcasts from "@/app/(HomeRoute)/podcast-video/UpcomingPodcasts";
import WeeklyMagazine from "@/app/(HomeRoute)/podcast-video/WeeklyMagazine";

const PodcastVideo = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-3">
          <LivePodcasts />
        </div>
        <UpcomingPodcasts />
      </div>
      <div className="my-6">
        <WeeklyMagazine />
      </div>
      <div className="mb-6">
        <TopStories />
      </div>
    </div>
  );
};

export default PodcastVideo;

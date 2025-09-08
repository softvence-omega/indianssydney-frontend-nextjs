import LivePodcastCard from "@/components/live-podcast/LiveCard";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";

const WeeklyMagazine = () => {
  return (
    <div>
      <PrimaryHeading title="Weekly Audio Magazine" className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <LivePodcastCard
          episode="1"
          title="The Soundwave Show"
          description="Bringing you compelling stories and unique narratives from around the globe"
          liveStatus={false}
          views={10}
          imageSrc="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <LivePodcastCard
          episode="1"
          title="The Soundwave Show"
          description="Bringing you compelling stories and unique narratives from around the globe"
          liveStatus={false}
          views={10}
          imageSrc="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
};

export default WeeklyMagazine;

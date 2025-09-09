import CountdownTimerCard from "@/components/live-podcast/UpcomingCountdownCard";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
const events = [
  {
    name: "Tech Innovation Summit 2025",
    date: "2025-08-21T18:08:00",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center",
  },
  {
    name: "Product Launch Event",
    date: "2025-12-25T12:00:00",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop&crop=center",
  },
  {
    name: "Annual Conference 2025",
    date: "2025-10-15T09:00:00",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop&crop=center",
  },
];
const UpcomingPodcasts = () => {
  return (
    <div>
      <PrimaryHeading title="Upcoming Podcast" className="mb-4" />

      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        {events.slice(0,2).map((event, index) => (
          <CountdownTimerCard
            key={index}
            eventName={event.name}
            eventDate={event.date}
            backgroundImage={event.image}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingPodcasts;

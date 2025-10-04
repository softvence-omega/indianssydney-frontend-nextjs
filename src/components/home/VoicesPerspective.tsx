import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCard3 from "@/components/reusable/NewsCard3";

const VoicesPerspective = () => {
  return (
    <div>
      <div className="border-b border-slight-border">
        <PrimaryHeading
          title="Voices & Perspectives"
          seeAllRoute="/voices-perspectives"
        />
        <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:border-b border-slight-border lg:pb-4">
            {newsItems.slice(2, 5).map((item) => (
              <NewsCard3 key={item.id} {...item} />
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-4 lg:mt-6">
            {newsItems.slice(0, 3).map((item) => (
              <NewsCard3
                key={item.id}
                {...item}
                imgHeight=" h-[120px] md:h-[140px]"
              />
            ))}
            {newsItems.slice(2, 5).map((item) => (
              <NewsCard3
                key={item.id}
                {...item}
                imgHeight=" h-[120px] md:h-[140px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoicesPerspective;

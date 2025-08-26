import CommonPadding from "@/common/CommonPadding";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCard4 from "../reusable/NewsCard4";

const SportsPlay = () => {
  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading title="Sports & Play" seeAllRoute="/sports" />
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {newsItems.slice(1, 4).map((item) => (
              <NewsCard4 key={item.id} {...item} />
            ))}
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default SportsPlay;

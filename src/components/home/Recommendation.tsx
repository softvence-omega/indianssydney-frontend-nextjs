import CommonPadding from "@/common/CommonPadding";
import PrimaryHeading from "../reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCardSecondary from "../reusable/NewsCardSecondary";

const Recommendation = () => {
  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading title="Recommendations"/>
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 gap-4 ">
            {newsItems.map((item) => (
              <NewsCardSecondary key={item.id} {...item} />
            ))}
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default Recommendation;

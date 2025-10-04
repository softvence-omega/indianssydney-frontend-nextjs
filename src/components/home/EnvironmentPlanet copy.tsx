import CommonPadding from "@/common/CommonPadding";
import PrimaryHeading from "../reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCard3 from "../reusable/NewsCard3";
import NewsSlider from "./NewsCurrent/NewsSlider";
import NewsCardSecondary from "../reusable/NewsCardSecondary";

const EnvironmentPlanet = () => {
  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading
            title="Environment & Planet"
            seeAllRoute="/environment-planet"
          />
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1 lg:grid-cols-4 gap-4 xl:divide-x xl:divide-slight-border">
            {/* Main slider section */}
            <div className="lg:col-span-3 xl:pr-4">
              <NewsSlider items={newsItems} />

              <div className="mt-4 grid grid-cols-2 gap-4">
                {newsItems.slice(2, 4).map((item) => (
                  <NewsCardSecondary key={item.id} {...item} />
                ))}
              </div>
            </div>

            {/* Secondary cards */}
            <div className="hidden lg:grid grid-cols-2 lg:grid-cols-1 gap-4">
              {newsItems.slice(4, 5).map((item) => (
                <NewsCard3
                  key={item.id}
                  {...item}
                  imgHeight="h-[200px] md:h-[300px] lg:h-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default EnvironmentPlanet;

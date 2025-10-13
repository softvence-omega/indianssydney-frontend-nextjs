import CommonPadding from "@/common/CommonPadding";
import PrimaryHeading from "../../reusable/PrimaryHeading";
import NewsSlider from "./NewsSlider";
import NewsCardSecondary from "../../reusable/NewsCardSecondary";
import { newsItems } from "@/utils/demoData";

const NewsCurrent = ({ data }: { data: any }) => {
  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading
            title={data?.category?.name}
            seeAllRoute={`/${data?.category?.slug}`}
          />
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4 xl:divide-x xl:divide-slight-border">
            {/* Main slider section */}
            <div className="xl:col-span-2 xl:pr-4">
              <NewsSlider items={data?.contents?.slice(0, 4)} />
            </div>

            {/* Secondary cards */}
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
              {data?.contents?.slice(0, 2)?.map((item: any) => (
                <NewsCardSecondary
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subTitle={item.subTitle}
                  paragraph={item.paragraph}
                  image={item.image || "/placeholder.png"} // fallback if no image
                  category={item.category?.name}
                  author={item.user?.fullName}
                  publishedAt={new Date(item.createdAt).toLocaleDateString()}
                />
              ))}
            </div>
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default NewsCurrent;

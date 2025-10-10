import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { newsItems } from "@/utils/demoData";
import NewsCardSecondary from "../reusable/NewsCardSecondary";
import NewsCard3 from "@/components/reusable/NewsCard3";

const BusinessInnovation = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="border-b border-slight-border">
        <PrimaryHeading
          title={data?.category?.name}
          seeAllRoute={`/${data?.category?.slug}`}
        />

        {/* Responsive Grid Layout */}
        <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4">
          {/* 1 */}
          <div>
            {data?.contents?.[0] && (
              <NewsCardSecondary
                key={data?.contents?.[0]?.id}
                id={data?.contents?.[0]?.id}
                title={data?.contents?.[0]?.title}
                subTitle={data?.contents?.[0]?.subTitle}
                paragraph={data?.contents?.[0]?.paragraph}
                image={data?.contents?.[0]?.image} // fallback if no image
                category={data?.contents?.[0]?.name}
                author={data?.contents?.[0]?.fullName}
                publishedAt={new Date(
                  data?.contents?.[0]?.createdAt
                ).toLocaleDateString()}
                layout="right"
              />
            )}
          </div>

          {/* 2 (bottom left) */}
          <div className=" lg:col-start-1 lg:row-start-2">
            {data?.contents?.[1] && (
              <NewsCardSecondary
                key={data?.contents?.[1]?.id}
                id={data?.contents?.[1]?.id}
                title={data?.contents?.[1]?.title}
                subTitle={data?.contents?.[1]?.subTitle}
                paragraph={data?.contents?.[1]?.paragraph}
                image={data?.contents?.[1]?.image} // fallback if no image
                category={data?.contents?.[1]?.name}
                author={data?.contents?.[1]?.fullName}
                publishedAt={new Date(
                  data?.contents?.[1]?.createdAt
                ).toLocaleDateString()}
                layout="right"
              />
            )}
          </div>

          {/* 3 (tall center) */}
          {data?.contents?.[2] && (
            <div className="col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1">
              <NewsCard3
                key={data?.contents?.[2]?.id}
                id={data?.contents?.[2]?.id}
                image={data?.contents?.[2]?.image}
                tag={data?.contents?.[2]?.tags?.[0]}
                title={data?.contents?.[2]?.title}
                description={data?.contents?.[2]?.paragraph}
                author={data?.contents?.[2]?.fullName}
              />
            </div>
          )}

          {/* 4 (top right) */}
          {data?.contents?.[3] && (
            <div className="lg:col-start-3 lg:row-start-1">
              <NewsCardSecondary
                key={data?.contents?.[3]?.id}
                id={data?.contents?.[3]?.id}
                title={data?.contents?.[3]?.title}
                subTitle={data?.contents?.[3]?.subTitle}
                paragraph={data?.contents?.[3]?.paragraph}
                image={data?.contents?.[3]?.image} // fallback if no image
                category={data?.contents?.[3]?.name}
                author={data?.contents?.[3]?.fullName}
                publishedAt={new Date(
                  data?.contents?.[3]?.createdAt
                ).toLocaleDateString()}
                layout="left"
              />
            </div>
          )}

          {/* 5 (bottom right) */}
          {data?.contents?.[4] && (
            <div className="lg:col-start-3 lg:row-start-2">
              <NewsCardSecondary
                key={data?.contents?.[4]?.id}
                id={data?.contents?.[4]?.id}
                title={data?.contents?.[4]?.title}
                subTitle={data?.contents?.[4]?.subTitle}
                paragraph={data?.contents?.[4]?.paragraph}
                image={data?.contents?.[4]?.image} // fallback if no image
                category={data?.contents?.[4]?.name}
                author={data?.contents?.[4]?.fullName}
                publishedAt={new Date(
                  data?.contents?.[4]?.createdAt
                ).toLocaleDateString()}
                layout="left"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessInnovation;

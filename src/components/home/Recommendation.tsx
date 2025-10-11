"use client";

import CommonPadding from "@/common/CommonPadding";
import PrimaryHeading from "../reusable/PrimaryHeading";
import NewsCardSecondary from "../reusable/NewsCardSecondary";
import { useGetAllArticleForReccomendationQuery } from "@/store/features/article/article.api";
import { Skeleton } from "@/components/ui/skeleton"; // optional for better UX

const Recommendation = () => {
  const { data, isLoading, isError } = useGetAllArticleForReccomendationQuery(
    {}
  );

  if (isLoading) {
    return (
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading title="Recommendations" />
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </CommonPadding>
    );
  }

  if (isError) {
    return (
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading title="Recommendations" />
          <p className="text-center text-muted-foreground py-6">
            Failed to load recommendations. Please try again later.
          </p>
        </div>
      </CommonPadding>
    );
  }

  const recommendations = data?.data || [];
  console.log("recommendations", data);

  return (
    <div>
      <CommonPadding>
        <div className="border-b border-slight-border">
          <PrimaryHeading title="Recommendations" />
          <div className="py-3 border-t border-slight-border mt-5 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.length > 0 ? (
              recommendations.slice(0, 15).map((item: any) => (
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
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-6">
                No recommendations available.
              </p>
            )}
          </div>
        </div>
      </CommonPadding>
    </div>
  );
};

export default Recommendation;

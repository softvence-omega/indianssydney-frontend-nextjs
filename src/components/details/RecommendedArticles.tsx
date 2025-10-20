import { useGetRecommendedArticleQuery } from "@/store/features/article/article.api";
import NewsCardSecondary from "../reusable/NewsCardSecondary";
import PrimaryHeading from "../reusable/PrimaryHeading";
import { Skeleton } from "../ui/skeleton";

const RecommendedArticles = ({ id }: { id: string }) => {
  const { data, isFetching } = useGetRecommendedArticleQuery(id)
  return (
    <div>
      <PrimaryHeading title="Recommended Articles" className="mb-6" />

      {
        isFetching && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-xl bg-gray-300" />
            ))}
          </div>
        )
      }
      <div className="space-y-4">
        {data?.map((item: any) => (
          <NewsCardSecondary
            key={item?.id}
            id={item?.id}
            title={item?.title}
            subTitle={item?.subTitle}
            paragraph={item?.paragraph}
            image={item?.image || "/placeholder.png"} // fallback if no image
            video={item?.video}
            category={item?.category?.name}
            author={item?.user?.fullName}
            imageHeight="lg:h-[140px]"
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedArticles;

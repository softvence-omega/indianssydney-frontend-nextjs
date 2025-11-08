import { use } from "react";
import { baseAPI } from "@/store/api/baseApi";

export const adminAnalyticsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // top articles

    getTopArticles: build.query({
      query: () => ({
        url: `/admin-management/analytics/top-content`,
        method: "GET",
      }),
    }),

    getTopCategory: build.query({
      query: () => ({
        url: `/admin-management/analytics/top-category`,
        method: "GET",
      }),
    }),

    // -----------------------  overview-dashboard/community-moderation -----------------------

    getCommunityModeration: build.query({
      query: () => ({
        url: `/overview-dashboard/community-moderation`,
        method: "GET",
      }),
    }),
    //  end
  }),
});

export const {
  useGetTopArticlesQuery,
  useGetTopCategoryQuery,
  useGetCommunityModerationQuery,
} = adminAnalyticsApi;

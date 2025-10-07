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

    //  end
  }),
});

export const { useGetTopArticlesQuery, useGetTopCategoryQuery } =
  adminAnalyticsApi;

import { use } from "react";
import { baseAPI } from "@/store/api/baseApi";

export const llmApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createLaw: build.mutation({
      query: (data: FormData) => ({
        url: "/australia-law/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllLaws: build.query({
      query: () => ({
        url: "/australia-law",
        method: "GET",
      }),
    }),

    getSingleLaw: build.query({
      query: (id: string) => ({
        url: `/australia-law/${id}`,
        method: "GET",
      }),
    }),

    updateLaw: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `/australia-law/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteLaw: build.mutation({
      query: (id: string) => ({
        url: `/australia-law/${id}`,
        method: "DELETE",
      }),
    }),
    // -------analytics-dashboard/top-tags--

    topperformancetags: build.query({
      query: () => ({
        url: `/overview-dashboard/analytics-dashboard/top-tags`,
        method: "GET",
      }),
    }),

    // analytics-dashboard/content-metrics

    contentmetrics: build.query({
      query: () => ({
        url: `/overview-dashboard/analytics-dashboard/content-metrics`,
        method: "GET",
      }),
    }),
    // ---overview-dashboard/Engagement-Personalization?period=month--

    EngagementPersonalization: build.query({
      query: ({ period }: { period: string }) => ({
        url: `/overview-dashboard/Engagement-Personalization?period=${period}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useEngagementPersonalizationQuery,
  useTopperformancetagsQuery,
  useContentmetricsQuery,
  useCreateLawMutation,
  useGetAllLawsQuery,
  useGetSingleLawQuery,
  useUpdateLawMutation,
  useDeleteLawMutation,
} = llmApi;

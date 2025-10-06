import { baseAPI } from "@/store/api/baseApi";

export const editorOverviewApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // top articles

    getEditorDashboardOverview: build.query({
      query: () => ({
        url: `/admin-dashboard/overview`,
        method: "GET",
      }),
    }),

    getRecentActivityEditor: build.query({
      query: () => ({
        url: `/admin-dashboard/recent-activity`,
        method: "GET",
      }),
    }),

    getTopPerformingContents: build.query({
      query: () => ({
        url: `/admin-dashboard/top-performance`,
        method: "GET",
      }),
    }),

    getTopContributors: build.query({
      query: () => ({
        url: `/admin-dashboard/top-contributor`,
        method: "GET",
      }),
    }),

    //  end
  }),
});

export const {
  useGetEditorDashboardOverviewQuery,
  useGetRecentActivityEditorQuery,
  useGetTopPerformingContentsQuery,
  useGetTopContributorsQuery,
} = editorOverviewApi;

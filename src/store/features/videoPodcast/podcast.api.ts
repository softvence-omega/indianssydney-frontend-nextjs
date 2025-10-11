import { baseAPI } from "@/store/api/baseApi";

export const podcastApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getPodcastsApproved: build.query({
      query: () => ({
        url: "/contentmanage/approved-by-type-superadmin",
        method: "GET",
      }),
      providesTags: ["podcast"],
    }),

    getPodcastsPending: build.query({
      query: () => ({
        url: "/contentmanage/pending-by-type-superadmin",
        method: "GET",
      }),
      providesTags: ["podcast"],
    }),

    getPodcastsDeclined: build.query({
      query: () => ({
        url: "/contentmanage/declined-by-type-superadmin",
        method: "GET",
      }),
      providesTags: ["podcast"],
    }),
  }),
});

export const {
  useGetPodcastsApprovedQuery,
  useGetPodcastsPendingQuery,
  useGetPodcastsDeclinedQuery,
} = podcastApi;

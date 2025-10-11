import { baseAPI } from "@/store/api/baseApi";

export const podcastApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getPodcasts: build.query({
      query: () => "/content/contentType-podcast",
    }),
  }),
});

export const { useGetPodcastsQuery } = podcastApi;

import { baseAPI } from "@/store/api/baseApi";

export const videoApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getVideos: build.query({
      query: () => "/content/contentType-video",
    }),
  }),
});

export const { useGetVideosQuery } = videoApi;

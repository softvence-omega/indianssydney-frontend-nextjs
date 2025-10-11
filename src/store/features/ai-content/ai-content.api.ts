import { baseAPI } from "@/store/api/baseApi";

export const aiContentApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    tagGenerator: build.mutation({
      query: (data) => ({
        url: "/aicontent/seo",
        method: "POST",
        body: data,
      }),
    }),

    getTags: build.query({
      query: () => ({
        url: "/aicontent/seo",
        method: "GET",
      }),
    }),

    generateContent: build.mutation({
      query: (data) => ({
        url: "/aicontent/paragraph",
        method: "POST",
        body: data,
      }),
    }),

    getContent: build.query({
      query: () => ({
        url: "/aicontent/paragraph",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useTagGeneratorMutation,
  useGetTagsQuery,
  useGenerateContentMutation,
  useGetContentQuery,
} = aiContentApi;

import { use } from 'react';
import { baseAPI } from "@/store/api/baseApi";

export const videoApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getVideosApproved: build.query({
      query: () => ({
        url: "/contentmanage/approved-by-type-superadmin",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    getVideosPending: build.query({
      query: () => ({
        url: "/contentmanage/pending-by-type-superadmin",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    getVideosDeclined: build.query({
      query: () => ({
        url: "/contentmanage/declined-by-type-superadmin",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
     getAllVideos: build.query({
      query: () => ({
        url: "/content/contentType-video",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
      // -----status chnage api--
    contentStatusChange: build.mutation({
      query: ({ status, id }) => ({
        url: `/admin-management/${id}/content-status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["content"],
    }),

   
  
  }),
  

});

export const {
  useGetVideosApprovedQuery,
  useGetVideosPendingQuery,
  useGetVideosDeclinedQuery,
  useGetAllVideosQuery,
  useContentStatusChangeMutation
} = videoApi;

import { baseAPI } from "@/store/api/baseApi";

export const communityApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // ---------- any user create community -----
    createCommunityPost: build.mutation({
      query: (data: any) => ({
        url: "/community/community-post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["community"],
    }),

    // ----- any user comment on community post -----
    createCommunityPostComment: build.mutation({
      query: (data: any) => ({
        url: "/community/community-comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["community"],
    }),

    // ---- community post reaction ----
    createCommunityPostReaction: build.mutation({
      query: (data: any) => ({
        url: "/community/post-reaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["community"],
    }),

    // ---- get all community posts ----
    getAllCommunityPost: build.query({
      query: () => ({
        url: "/community/community-post",
        method: "GET",
      }),
      providesTags: ["community"],
    }),

    // ----- comment reaction -----
    createCommentReaction: build.mutation({
      query: (data: any) => ({
        url: "/community/comment-reaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["community"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllCommunityPostQuery,
  useCreateCommunityPostMutation,
  useCreateCommunityPostCommentMutation,
  useCreateCommunityPostReactionMutation,
  useCreateCommentReactionMutation,
} = communityApi;

import { baseAPI } from "@/store/api/baseApi";

export const bookmarkApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getBookmarks: build.query({
      query: () => ({
        url: `/content/bookmarks`,
        method: "GET",
      }),
      providesTags: ["bookmark"],
    }),
    postBookmark: build.mutation({
      query: (contentId) => ({
        url: `/content/bookmark/${contentId}`,
        method: "POST",
      }),
      invalidatesTags: ["bookmark"],
    }),

    deleteBookmark: build.mutation({
      query: (contentId) => ({
        url: `/content/bookmark/${contentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookmark"],
    }),
  }),
});

export const {
  usePostBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarksQuery,
} = bookmarkApi;

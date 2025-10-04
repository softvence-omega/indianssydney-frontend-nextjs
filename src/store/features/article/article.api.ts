import { baseAPI } from "@/store/api/baseApi";


export const articleApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // for contributor get my articles

    getMyArticles: build.query({
      query: () => ({
        url: "/content/by-user",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // for all user article get
    getAllArticle: build.query({
      query: () => ({
        url: "/content/contents-all",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // for all user get article details

    getArticleDetails: build.query({
      query: (id: string) => ({
        url: `/content/${id}`,
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // for contributor article post
    createNewArticle: build.mutation({
      query: (data: any) => ({
        url: "/content",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["content"],
    }),

    //--------------------- ADMIN AND EDITOR ---------------------

    // recent article for editor and admin
    getRecentArticle: build.query({
      query: () => ({
        url: "/admin-management/recent-contents",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // pending article for editor and admin
    getPendingArticle: build.query({
      query: () => ({
        url: "/admin-management/all-contents-pending",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // approved article for editor and admin

    getApprovedArticle: build.query({
      query: () => ({
        url: "/admin-management/all-contents-approve",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // declined content for editor and admin

    getDeclinedArticle: build.query({
      query: () => ({
        url: "/admin-management/all-contents-Decline",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // update article staus for editor and admin

    updateArticleStatus: build.mutation({
      query: ({ status, id }) => ({
        url: `/admin-management/${id}/content-status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["content"],
    }),
    //  end
  }),
});

export const {
  useGetAllArticleQuery,
  useCreateNewArticleMutation,
  useGetRecentArticleQuery,
  useGetPendingArticleQuery,
  useGetApprovedArticleQuery,
  useGetDeclinedArticleQuery,
  useUpdateArticleStatusMutation,
  useGetArticleDetailsQuery,
  useGetMyArticlesQuery,
} = articleApi;

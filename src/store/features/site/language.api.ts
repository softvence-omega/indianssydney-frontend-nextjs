import { baseAPI } from "@/store/api/baseApi";

export const languagesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createLanguage: build.mutation({
      query: ({ data }) => ({
        url: `/settings/language`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["language"],
    }),
    deleteFAQ: build.mutation({
      query: (id: string) => ({
        url: `/settings/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["language"],
    }),
    updateFAQ: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `/settings/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    getAllFAQ: build.query({
      query: () => ({
        url: "/settings/faq",
        method: "GET",
      }),
      providesTags: ["faq"],
    }),

    //  end
  }),
});

export const {
  useCreateLanguageMutation,
  useGetAllFAQQuery,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = languagesApi;

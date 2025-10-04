import { baseAPI } from "@/store/api/baseApi";

export const faqApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createFAQ: build.mutation({
      query: ({ data }) => ({
        url: `/settings/faq-section-with-faqs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    deleteFAQ: build.mutation({
      query: (id: string) => ({
        url: `/settings/faq/${id}`,
        method: "DELETE",
      }),
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
  useCreateFAQMutation,
  useGetAllFAQQuery,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;

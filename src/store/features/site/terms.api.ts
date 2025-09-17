import { baseAPI } from "@/store/api/baseApi";

export const termsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    deleteTerms: build.mutation({
      query: (id: string) => ({
        url: `/settings/privacy-policy/${id}`,
        method: "DELETE",
      }),
    }),
    updateTerms: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `/settings/privacy-policy/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["privacy-policy"],
    }),
    getAllTerms: build.query({
      query: () => ({
        url: "/settings/privacy-policy",
        method: "GET",
      }),
      providesTags: ["privacy-policy"],
    }),

    //  end
  }),
});

export const {
  useGetAllTermsQuery,
  useUpdateTermsMutation,
  useDeleteTermsMutation,
} = termsApi;

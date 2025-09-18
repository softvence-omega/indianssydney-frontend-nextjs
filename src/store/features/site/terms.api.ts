import { baseAPI } from "@/store/api/baseApi";

export const termsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
      createTerms: build.mutation({
      query: ({ data }) => ({
        url: `/settings/terms`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),
    deleteTerms: build.mutation({
      query: (id: string) => ({
        url: `/settings/terms/${id}`,
        method: "DELETE",
      }),
    }),
    updateTerms: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `/settings/terms/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),
    getAllTerms: build.query({
      query: () => ({
        url: "/settings/terms",
        method: "GET",
      }),
      providesTags: ["terms"],
    }),

    //  end
  }),
});

export const {
  useCreateTermsMutation,
  useGetAllTermsQuery,
  useUpdateTermsMutation,
  useDeleteTermsMutation,
} = termsApi;

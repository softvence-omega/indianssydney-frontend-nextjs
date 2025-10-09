import { baseAPI } from "@/store/api/baseApi";

export const adManagementApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createNewAd: build.mutation({
      query: (data: any) => ({
        url: "/settings/ads-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ad-management"],
    }),
    getAllAd: build.query({
      query: () => ({
        url: "/settings/ads",
      }),
      providesTags: ["ad-management"],
    }),
    deleteAd: build.mutation({
      query: (id: string) => ({
        url: `/settings/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ad-management"],
    }),
    updateAd: build.mutation({
      query: ({id, data}) => ({
        url: `/settings/ads/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ad-management"],
    }),

    //  end
  }),
});

export const {
  useCreateNewAdMutation,
  useGetAllAdQuery,
  useUpdateAdMutation,
  useDeleteAdMutation,
} = adManagementApi;

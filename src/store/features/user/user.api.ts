import { baseAPI } from "@/store/api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createApplicationForContributor: build.mutation({
      query: (data) => ({
        url: `/user/apply-contributor`,
        method: "POST",
        body: data,
      }),
    }),

    createReport: build.mutation({
      query: (formData: FormData) => ({
        url: "/user/create-report",
        method: "POST",
        body: formData,
      }),
    }),
    getPendingContributorsRequest: build.query({
      query: () => ({
        url: `/admin-management/contributor/all`,
        method: "GET",
      }),
      providesTags: ["contributor"],
    }),
    updateContributorRequestStatus: build.mutation({
      query: ({ status, id }) => ({
        url: `/admin-management/contributor/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["contributor"],
    }),
    //  end
  }),
});

export const {
  useCreateApplicationForContributorMutation,
  useGetPendingContributorsRequestQuery,
  useUpdateContributorRequestStatusMutation,
  useCreateReportMutation,
} = userAPI;

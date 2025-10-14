import { baseAPI } from "@/store/api/baseApi";

export const adminReportApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createReport: build.mutation({
      query: (data) => ({
        url: "/user/create-report",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["report"],
    }),
    getAllReports: build.query({
      query: () => ({
        url: "/contentmanage/reports",
        method: "GET",
      }),
      providesTags: ["report"],
    }),

    getSingleReport: build.query({
      query: (id) => ({
        url: `/contentmanage/reports/${id}`,
        method: "GET",
      }),
      providesTags: ["report"],
    }),

    softDeleteReport: build.mutation({
      query: (id) => ({
        url: `/contentmanage/reports/${id}/soft-delete`,
        method: "PATCH",
      }),
      invalidatesTags: ["report"],
    }),

    updateReportStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `/contentmanage/reports/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["report"],
    }),

    //  end
  }),
});

export const {
  useCreateReportMutation,
  useGetAllReportsQuery,
  useGetSingleReportQuery,
  useSoftDeleteReportMutation,
  useUpdateReportStatusMutation,
} = adminReportApi;

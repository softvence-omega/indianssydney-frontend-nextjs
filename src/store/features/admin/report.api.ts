import { baseAPI } from "@/store/api/baseApi";

export const adminReportApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createReport: build.mutation({
      query: (data) => ({
        url: "/user/create-report",
        method: "POST",
        body: data,
      }),
    }),
    getAllReports: build.query({
      query: () => ({
        url: "/contentmanage/reports",
        method: "GET",
      }),
    }),

    //  end
  }),
});

export const { useCreateReportMutation, useGetAllReportsQuery } =
  adminReportApi;

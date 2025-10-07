import { baseAPI } from "@/store/api/baseApi";

export const adminReportApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllReports: build.query({
      query: () => ({
        url: "/contentmanage/reports",
        method: "GET",
      }),
    }),

    //  end
  }),
});

export const { useGetAllReportsQuery } = adminReportApi;

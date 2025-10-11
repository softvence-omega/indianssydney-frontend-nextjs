import { baseAPI } from "@/store/api/baseApi";

export const adminApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // Admin dashboard overview

    getTotalUserCount: build.query({
      query: () => ({
        url: "/overview-dashboard/totaluser",
        method: "GET",
      }),
    }),
    getTotalUserActivityCount: build.query({
      query: () => ({
        url: "/overview-dashboard/totaluser-activity",
        method: "GET",
      }),
    }),

    getPageViewCount: build.query({
      query: () => ({
        url: "/overview-dashboard/pageview",
        method: "GET",
      }),
    }),

    getTrafficEngagement: build.query({
      query: () => ({
        url: "/overview-dashboard/traffic-engagement",
        method: "GET",
      }),
    }),

    getRecentUserActivity: build.query({
      query: () => ({
        url: "/overview-dashboard/recent-activity",
        method: "GET",
      }),
    }),

    getEditorActivity: build.query({
      query: () => ({
        url: "/overview-dashboard/editor-content-activity",
        method: "GET",
      }),
    }),

    // Admin dashboard user management
    getAllUser: build.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    updateUserRole: build.mutation({
      query: ({ id, data }) => ({
        url: `/usermanage/superadmin/${id}/role`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    //  end
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserRoleMutation,
  useGetTotalUserCountQuery,
  useGetTotalUserActivityCountQuery,
  useGetTrafficEngagementQuery,
  useGetPageViewCountQuery,
  useGetRecentUserActivityQuery,
  useGetEditorActivityQuery,
} = adminApi;

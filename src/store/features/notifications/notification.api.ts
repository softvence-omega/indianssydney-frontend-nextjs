import { baseAPI } from "@/store/api/baseApi";

export const notificationApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query({
      query: () => ({
        url: "/notification-setting/all-notifications",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;

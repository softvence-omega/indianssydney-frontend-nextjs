import { baseAPI } from "@/store/api/baseApi";
import { get } from "http";

export const profileApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `/user/me/profile`,
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: build.mutation({
      query: (formData) => ({
        url: `/user/me/update`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: `/user/me/update-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),

    //  end
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = profileApi;

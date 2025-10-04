import { baseAPI } from "@/store/api/baseApi";

export const privacyApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createPrivacyPolicy: build.mutation({
      query: ({ data }) => ({
        url: `/settings/privacy-policy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["privacy-policy"],
    }),
    deletePrivacyPolicy: build.mutation({
      query: (id: string) => ({
        url: `/settings/privacy-policy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["privacy-policy"],
    }),
    updatePrivacyPolicy: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `/settings/privacy-policy/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["privacy-policy"],
    }),
    getAllPrivacyPolicy: build.query({
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
  useCreatePrivacyPolicyMutation,
  useGetAllPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useDeletePrivacyPolicyMutation,
} = privacyApi;

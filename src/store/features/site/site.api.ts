import { baseAPI } from "@/store/api/baseApi";

export const siteApi = baseAPI.injectEndpoints({
    endpoints: build => ({
        deletePrivacyPolicy: build.mutation({
            query: (id: string) => ({
                url: `/settings/privacy-policy/${id}`,
                method: 'DELETE',
            }),
        }),
        updatePrivacyPolicy: build.mutation({
            query: ({ data, id }: { data: any, id: string }) => ({
                url: `/settings/privacy-policy/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['privacy-policy']
        }),
        getAllPrivacyPolicy: build.query({
            query: () => ({
                url: '/settings/privacy-policy',
                method: 'GET'
            }),
            providesTags: ["privacy-policy"]
        })


        //  end
    })
})

export const {
    useGetAllPrivacyPolicyQuery,
    useUpdatePrivacyPolicyMutation,
    useDeletePrivacyPolicyMutation
} = siteApi
import { baseAPI } from "@/store/api/baseApi";

export const adminApi = baseAPI.injectEndpoints({
    endpoints: build => ({
        getAllUser: build.query({
            query: () => ({
                url: '/user/all',
                method: 'GET'
            }),
            providesTags: ['users']
        }),

        updateUserRole: build.mutation({
            query: ({ id, data }) => ({
                url: `/usermanage/superadmin/${id}/role`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['users']
        }),


        //  end
    })
})

export const {
    useGetAllUserQuery,
    useUpdateUserRoleMutation

} = adminApi
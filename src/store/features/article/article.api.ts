import { baseAPI } from "@/store/api/baseApi";

export const articleApi = baseAPI.injectEndpoints({
    endpoints: build => ({
        createNewArticle: build.mutation({
            query: (data: any) => ({
                url: '/content',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['content']
        }),
        



        //  end
    })
})

export const {
    useCreateNewArticleMutation,

} = articleApi
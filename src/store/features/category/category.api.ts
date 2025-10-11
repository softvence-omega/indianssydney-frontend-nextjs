import { baseAPI } from "@/store/api/baseApi";

export const categoryApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createNewCategory: build.mutation({
      query: (data: any) => ({
        url: "/category-subcategory/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    getAllCategory: build.query({
      query: () => ({
        url: "/category-subcategory/category",
      }),
      providesTags: ["category"],
    }),
    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `/category-subcategory/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/category-subcategory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    //  end
  }),
});

export const {
  useCreateNewCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;

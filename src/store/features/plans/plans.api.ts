import { baseAPI } from "@/store/api/baseApi";

export const plansApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createNewPlan: build.mutation({
      query: (data: any) => ({
        url: "/contentmanage/create-plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["plan"],
    }),
    getAllPlan: build.query({
      query: () => ({
        url: "/contentmanage/all-plans",
        method: "GET",
      }),
      providesTags: ["plan"],
    }),
    deletePlan: build.mutation({
      query: (id: string) => ({
        url: `/contentmanage/delete-plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plan"],
    }),
    updatePlan: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/contentmanage/update-plan/${id}`,
        method: "PATCH",
        body: data, // Send data directly as the body
      }),
      invalidatesTags: ["plan"],
    }),

    //  end
  }),
});

export const {
  useCreateNewPlanMutation,
  useGetAllPlanQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApi;

import { baseAPI } from "@/store/api/baseApi";
import { get } from "http";

export const llmApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createLaw: build.mutation({
      query: (data: FormData) => ({
        url: "/australia-law/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllLaws: build.query({
      query: () => ({
        url: "/australia-law",
        method: "GET",
      }),
    }),

    getSingleLaw: build.query({
      query: (id: string) => ({
        url: `/australia-law/${id}`,
        method: "GET",
      }),
    }),

    updateLaw: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => ({
        url: `/australia-law/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteLaw: build.mutation({
      query: (id: string) => ({
        url: `/australia-law/${id}`,
        method: "DELETE",
      }),
    }),

    //  end
  }),
});

export const {
  useCreateLawMutation,
  useGetAllLawsQuery,
  useGetSingleLawQuery,
  useUpdateLawMutation,
  useDeleteLawMutation,
} = llmApi;

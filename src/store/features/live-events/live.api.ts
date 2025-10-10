import { baseAPI } from "@/store/api/baseApi";

export const liveApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createNewLive: build.mutation({
      query: (data: any) => ({
        url: "/live-events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["live"],
    }),
    getAllLiveEvent: build.query({
      query: () => ({
        url: "/live-events",
        method: "GET",
      }),
      providesTags: ["live"],
    }),

    getSingleLiveEvent: build.query({
      query: (id: string) => ({
        url: `/live-events/${id}`,
        method: "GET",
      }),
      providesTags: ["live"],
    }),
    deleteLiveEvent: build.mutation({
      query: (id: string) => ({
        url: `/live-events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["live"],
    }),
    updateLiveEvent: build.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/live-events/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["live"],
    }),

    //  end
  }),
});

export const {
  useGetSingleLiveEventQuery,
  useCreateNewLiveMutation,
  useGetAllLiveEventQuery,
  useDeleteLiveEventMutation,
  useUpdateLiveEventMutation,
} = liveApi;

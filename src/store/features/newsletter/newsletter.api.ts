import { baseAPI } from "@/store/api/baseApi";
import { subscribe } from "diagnostics_channel";

export const liveApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    subscribe: build.mutation({
      query: (data) => ({
        url: "/subscribe",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
    useSubscribeMutation,
} = liveApi;

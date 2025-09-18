import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQueryAPI = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryAPI,
  tagTypes: ["category", "content", "privacy-policy", "terms"],
  endpoints: () => ({}),
});

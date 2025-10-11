import { baseAPI } from "@/store/api/baseApi";

export const paymentApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
    }),

    getMyPayment: build.query({
      query: () => ({
        url: "/payment/my-payments",
        method: "GET",
      }),
    }),

    getAllPayment: build.query({
      query: () => ({
        url: "/payment/all-payments",
        method: "GET",
      }),
    }),

    getSinglePayment: build.query({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetMyPaymentQuery,
  useGetAllPaymentQuery,
  useGetSinglePaymentQuery,
} = paymentApi;

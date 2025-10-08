import { baseAPI } from "@/store/api/baseApi";

export const chatbotApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    postChatbot: build.mutation({
      query: (body) => ({
        url: "/faqbot",
        method: "POST",
        body,
      }),
    }),

    getChatbot: build.query({
      query: () => ({
        url: "/faqbot",
        method: "GET",
      }),
    }),

    getChatbotById: build.query({
      query: (id) => ({
        url: `/faqbot/${id}`,
        method: "GET",
      }),
    }),

    //  end
  }),
});

export const {
  usePostChatbotMutation,
  useGetChatbotQuery,
  useGetChatbotByIdQuery,
} = chatbotApi;

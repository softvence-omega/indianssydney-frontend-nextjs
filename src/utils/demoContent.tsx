import { FormData } from '../app/(HomeRoute)/publish-content/page';



export const demoContents: (FormData & { id: string })[] = [
  {
    id: "1",
    contentType: "article",
    category: "Business",
    subCategory: "Finance",
    title: "Volkswagen Profits Tumble as Tariffs Weigh on Auto Industry",
    subTitle: "German automaker faces challenges amid trade disputes",
    audioFile: null,
    imageOrVideo:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=400&auto=format&fit=crop",
    imageCaption: "A modern Volkswagen car design",
    shortQuote: "Trade tensions are reshaping the auto industry.",
    paragraph:
      "Volkswagen reported a sharp decline in third-quarter profits, with earnings falling 23%...",
    tags: ["Business", "Finance", "Automotive"],
    additionalFields: {
      additional_1: { type: "paragraph", value: "This is an extra paragraph." },
      additional_2: { type: "quote", value: "Markets are unpredictable." },
      additional_3: {
        type: "image/video",
        value:
          "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=400&auto=format&fit=crop",
      },
    },
    about: "",
  },
  {
    id: "2",
    contentType: "video",
    category: "Technology",
    subCategory: "AI",
    title: "Sydney AI Startup Raises $50M in Series B Funding",
    subTitle: "Healthtech disruptor attracts global investment",
    audioFile: null,
    imageOrVideo:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=400&auto=format&fit=crop",
    imageCaption: "AI-powered health diagnostics in action",
    shortQuote: "AI is transforming healthcare worldwide.",
    paragraph: "A Sydney-based AI startup closed a $50M funding round...",
    tags: ["Tech", "AI", "Healthcare"],
    additionalFields: {
      additional_1: { type: "paragraph", value: "Investors are bullish on AI." },
      additional_2: { type: "quote", value: "AI is the new electricity." },
    },
    about: "This video covers the funding story of a Sydney AI startup.",
  },
  {
    id: "3",
    contentType: "podcast",
    category: "Business",
    subCategory: "Startups",
    title: "The Future of Australian Startups",
    subTitle: "Challenges and Opportunities in 2025",
    audioFile: null,
    imageOrVideo: null,
    imageCaption: "",
    shortQuote: "Innovation is thriving in Australia.",
    paragraph:
      "In this episode, we discuss how Australian startups are adapting...",
    tags: ["Startups", "Australia", "Innovation"],
    additionalFields: {},
    about: "Podcast discussion on Australia's startup ecosystem.",
  },
  {
    id: "4",
    contentType: "live-event",
    category: "Sports",
    subCategory: "Cricket",
    title: "Australia vs India: Live Cricket Match",
    subTitle: "Day 1 Test Match Coverage",
    audioFile: null,
    imageOrVideo:
      "https://images.unsplash.com/photo-1505842465776-3d90f616310d?q=80&w=400&auto=format&fit=crop",
    imageCaption: "Live cricket match between Australia and India",
    shortQuote: "Cricket unites fans worldwide.",
    paragraph: "Catch all the live updates from the iconic MCG stadium...",
    tags: ["Cricket", "Sports", "Live"],
    additionalFields: {},
    about: "Live streaming of the Australia vs India Test Match.",
    dateTimeSlot: "2025-08-30T10:00:00Z",
  },
];

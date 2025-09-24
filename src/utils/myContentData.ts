export type ContentType = "article" | "podcast" | "video";
export type ContentStatus = "approved" | "pending" | "rejected";
export type ContentTypeNew = "ARTICLE" | "PODCAST" | "VIDEO";
export interface ContentItem {
  id: string;
  type: ContentType;
  status: ContentStatus;
  image: string;
  tag: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  content: string;
  author: string;
  readTime: string;
  publishedAt: string; // ISO date string
  featured: boolean;
  views: number;
  likes: number;
  comments: number;
}



export const myContentData: ContentItem[] = [
  {
    id: "1",
    type: "article",
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=400&auto=format&fit=crop",
    tag: "BREAKING",
    category: "news-current-affairs",
    subcategory: "national-headlines",
    title: "Australia Announces Major Infrastructure Investment Package",
    description:
      "The federal government unveils a $15 billion infrastructure plan focusing on renewable energy projects...",
    content:
      "Prime Minister Anthony Albanese today announced a comprehensive infrastructure package...",
    author: "Sarah Chen",
    readTime: "6 min read",
    publishedAt: "2025-08-18T11:00:00Z",  // Ensure this is present
    featured: true,
    views: 1000,
    likes: 50,
    comments: 10,
  },
  {
    id: "2",
    type: "podcast",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=400&auto=format&fit=crop",
    tag: "TECH",
    category: "business-innovation",
    subcategory: "tech-startups",
    title: "Sydney AI Startup Raises $50M in Series B Funding",
    description:
      "The AI-driven health platform has attracted global investors for its innovative solutions...",
    content:
      "A Sydney-based AI startup has closed a $50M funding round led by international venture firms...",
    author: "Michael Tan",
    readTime: "6 min read",
    publishedAt: "2025-08-18T11:00:00Z",  // Ensure this is present
    featured: false,
    views: 1000,
    likes: 50,
    comments: 10,
  },
  {
    id: "3",
    type: "video",
    status: "rejected",
    image:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=400&auto=format&fit=crop",
    tag: "BREAKING",
    category: "news-current-affairs",
    subcategory: "national-headlines",
    title: "Australia Announces Major Infrastructure Investment Package",
    description:
      "The federal government unveils a $15 billion infrastructure plan focusing on renewable energy projects...",
    content:
      "Prime Minister Anthony Albanese today announced a comprehensive infrastructure package...",
    author: "Sarah Chen",
    readTime: "6 min read",
    publishedAt: "2025-08-18T11:00:00Z",  // Ensure this is present
    featured: true,
    views: 1000,
    likes: 50,
    comments: 10,
  },
  {
    id: "4",
    type: "article",
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=400&auto=format&fit=crop",
    tag: "BREAKING",
    category: "news-current-affairs",
    subcategory: "national-headlines",
    title: "Australia Announces Major Infrastructure Investment Package",
    description:
      "The federal government unveils a $15 billion infrastructure plan focusing on renewable energy projects...",
    content:
      "Prime Minister Anthony Albanese today announced a comprehensive infrastructure package...",
    author: "Sarah Chen",
    readTime: "6 min read",
    publishedAt: "2025-08-18T11:00:00Z",  // Ensure this is present
    featured: true,
    views: 1000,
    likes: 50,
    comments: 10,
  },
  // Ensure every item has a `publishedAt` field
];



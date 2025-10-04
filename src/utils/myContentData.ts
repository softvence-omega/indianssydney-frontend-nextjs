export type ContentStatus = "APPROVE" | "PENDING" | "Declined";
export type ContentTypeNew = "ARTICLE" | "PODCAST" | "VIDEO";
export interface ContentItem {
  id: string;
  contentType: ContentTypeNew;
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

// types.ts
export type AdditionalFieldType = "paragraph" | "quote" | "image" | "video" |"audio";

export interface AdditionalField {
  type: AdditionalFieldType;
  value: string | File | null | string[];
}

export type ContentType = "article" | "video" | "podcast" | "live-event";

export interface FormData {
  contentType: ContentType;
  category: string;
  subCategory: string;
  title: string;
  subTitle: string;
  audioFile: File | null;
  image: File | null;
  video: File | null;
  imageCaption: string;
  shortQuote: string;
  paragraph: string;
  dateTimeSlot: string;
  tags: string[];
  additionalFields: { [key: string]: AdditionalField };
  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: number;
}




// export interface DetailsData {
//   id?: string;
//   contentType: ContentType;
//   category: string;
//   subCategory: string;
//   title: string;
//   subTitle: string;

//   audioFile: string | null;
//   image: string | null;
//   video: string | null;
//   imageCaption: string;
//   shortQuote: string;
//   paragraph: string;

//   tags: string[];
//   additionalFields: Record<string, AdditionalField>;

//   dateTimeSlot?: string;
//   about: string;

//   publishedAt?: string;
//   views?: number;
//   likes?: number;
//   comments?: number;
// }

export interface AdditionalFields {
  id: string;
  contentId: string;
  type: "paragraph" | "image" | "quote" | "audio" | "video";
  value: string | File | null;  // Value can be a string or file for image/audio/video
  order: number;
}

export interface User {
  id: string;
  fullName: string | null;
  email: string;
  profilePhoto: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  isDeleted: boolean;
}

export interface SubCategory {
  id: string;
  subname: string;
  subslug: string;
  categoryId: string;
}

export interface DetailsData {
  id: string;
  contentType: "ARTICLE" | "VIDEO" | "PODCAST"; // Can be extended to other content types if necessary
  title: string;
  subTitle: string;
  paragraph: string | null;
  shortQuote: string | null;
  image: string | null; // URL to the image
  videoFile: string | null; // URL to the video file
  imageCaption: string | null;
  audioFile: string | null;
  videoThumbnail: string | null;
  tags: string[];
  additionalContents: AdditionalFields[];
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | string; // Can be expanded to other statuses
  isDeleted: boolean;
  userId: string;
  categoryId: string;
  subCategoryId: string;
  user: User;
  category: Category;
  subCategory: SubCategory;
  dateTimeSlot?: string;
  views?: number;
}


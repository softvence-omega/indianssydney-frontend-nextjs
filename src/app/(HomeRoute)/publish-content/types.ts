// types.ts

// for upload
export type AdditionalFieldType =
  | "paragraph"
  | "shortQuote"
  | "image"
  | "video"
  | "audio";

export interface AdditionalField {
  type: AdditionalFieldType;
  value: string |File| null;
}

export type ContentType = "ARTICLE" | "VIDEO" | "PODCAST";

// export interface FormData {
//   contentType: ContentType;
//   category: string;
//   subCategory: string;
//   title: string;
//   subTitle: string;
//   audioFile: File | null;
//   image: File | null;
//   video: File | null;
//   imageCaption: string;
//   shortQuote: string;
//   paragraph: string;
//   dateTimeSlot: string;
//   tags: string[];
//   additionalFields: { [key: string]: AdditionalField };
//   publishedAt?: string;
//   views?: number;
//   likes?: number;
//   comments?: number;
// }

export interface UploadFormData {
  contentType: ContentType;
  title: string;
  subTitle: string;
  categoryId: string;
  subCategoryId: string;
  categorysslug: string;
  subcategorysslug: string;
  paragraph: string;
  image?: File | null;
  video?: File | null;
  audio?: File | null;
  imageCaption?: string;
  videoThumbnail?: File | null;
  youtubeVideoUrl?: "";
  shortQuote: string;
  tags:string[];
  additionalContents: AdditionalField[];
  publishedAt?: string;
  contentviews?: number;
  likeCount?: number;
  commentCount?: number;
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
  type: "paragraph" | "image" | "shortQuote" | "audio" | "video";
  value: string | File | null;
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
  tamplate: string; // ✅ Added since API returns this
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
  contentType: "ARTICLE" | "VIDEO" | "PODCAST";
  title: string;
  subTitle: string;
  paragraph: string | null;
  shortQuote: string | null;
  image: string | null;
  video: string | null; // ✅ renamed from videoFile
  audio: string | null; // ✅ renamed from audioFile
  imageCaption: string | null;
  youtubeVideoUrl: string; // ✅ added
  videoThumbnail: string | null;
  tags: string[];
  additionalContents: AdditionalFields[];
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "APPROVE" | "DECLINED" | string;
  isDeleted: boolean;
  userId: string;
  categoryId: string;
  subCategoryId: string;
  user: User;
  category: Category;
  subCategory: SubCategory;
  views?: number; // ✅ maps to API's contentviews
}

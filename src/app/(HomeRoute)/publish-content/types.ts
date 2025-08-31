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




export interface DetailsData {
  id?: string;
  contentType: ContentType;
  category: string;
  subCategory: string;
  title: string;
  subTitle: string;

  audioFile: string | null;
  image: string | null;
  video: string | null;
  imageCaption: string;
  shortQuote: string;
  paragraph: string;

  tags: string[];
  additionalFields: Record<string, AdditionalField>;

  dateTimeSlot?: string;
  about: string;

  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: number;
}

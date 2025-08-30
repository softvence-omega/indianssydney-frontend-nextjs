// types.ts
export type AdditionalFieldType = "paragraph" | "quote" | "image" | "video";

export interface AdditionalField {
  type: AdditionalFieldType;
  value: string | File | null | string[];
}

export interface FormData {
  contentType: "article" | "video" | "podcast" | "live-event";
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
}

export type DetailsData = FormData; // Alias for consistency

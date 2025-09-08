import { DetailsData } from "./types";

export const demoDetailsData: {
  success: boolean;
  message: string;
  data: DetailsData;
} = {
  success: true,
  message: "Content created successfully",
  data: {
    id: "1",
    contentType: "ARTICLE",
    title: "NestJS Upload Demo",
    subTitle: "Learn how to upload files using NestJS",
    paragraph:
      "Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify as well.Nest provides a level of abstraction above these common Node.js frameworks (Express/Fastify), but also exposes their APIs directly to the developer. This gives developers the freedom to use the myriad of third-party modules which are available for the underlying platform.",
    shortQuote:
      "Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript)",
    image:
      "https://images-www.contentful.com/fo9twyrwpveg/3WOwdAEfvlOW4Aln4O1ZOR/b23c94930398cb97ff76e7b1d887379c/nestjs-vs-nextjs-header2.png",
    videoFile:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    imageCaption: "A demo showcasing NestJS file upload",
    audioFile:
      "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
    tags: ["NestJS", "File Upload", "Tutorial", "Backend Development"],
    videoThumbnail: "https://www.example.com/images/nestjs-thumbnail.png",
    createdAt: "2025-09-03T04:32:03.812Z",
    updatedAt: "2025-09-03T04:32:03.812Z",
    status: "PENDING",
    isDeleted: false,
    userId: "2e939aa8-b3c8-4d5f-81d1-77cb0b3da279",
    categoryId: "98ebc6cd-2c9a-4086-a822-ba66936e536f",
    subCategoryId: "a6f654ec-2634-48de-830f-29a0bad7d8bd",
    user: {
      id: "2e939aa8-b3c8-4d5f-81d1-77cb0b3da279",
      fullName: "John Doe",
      email: "aqua7808@powerscrews.com",
      profilePhoto:
        "https://images.unsplash.com/photo-1756789347857-f4616d9f02f6?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    category: {
      id: "98ebc6cd-2c9a-4086-a822-ba66936e536f",
      name: "How to Build with NestJS",
      slug: "how-to-build-with-nestjs",
      createdAt: "2025-09-03T03:19:54.779Z",
      isDeleted: false,
    },
    subCategory: {
      id: "a6f654ec-2634-48de-830f-29a0bad7d8bd",
      subname: "Education",
      subslug: "education",
      categoryId: "98ebc6cd-2c9a-4086-a822-ba66936e536f",
    },
    additionalContents: [
      {
        id: "42c7bb77-a644-45c6-921d-1afe37b16221",
        contentId: "bfd09272-b294-40b9-8288-0e2f2f4964b1",
        type: "paragraph",
        value:
          "Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify as well.Nest provides a level of abstraction above these common Node.js frameworks (Express/Fastify), but also exposes their APIs directly to the developer. This gives developers the freedom to use the myriad of third-party modules which are available for the underlying platform.",
        order: 1,
      },
      {
        id: "95469ef5-f60e-47aa-ab28-ba9ffb23ce40",
        contentId: "bfd09272-b294-40b9-8288-0e2f2f4964b1",
        type: "image",
        value:
          "https://images-www.contentful.com/fo9twyrwpveg/3WOwdAEfvlOW4Aln4O1ZOR/b23c94930398cb97ff76e7b1d887379c/nestjs-vs-nextjs-header2.png",
        order: 2,
      },
      {
        id: "3f3b9578-bd2f-48b9-976e-716b087339ea",
        contentId: "bfd09272-b294-40b9-8288-0e2f2f4964b1",
        type: "quote",
        value:
          "NestJS makes it super easy to handle file uploads with minimal setup.",
        order: 3,
      },
      {
        id: "c59c1560-ab4f-4141-a21c-da9bcce3df6f",
        contentId: "bfd09272-b294-40b9-8288-0e2f2f4964b1",
        type: "audio",
        value:
          "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
        order: 4,
      },
      {
        id: "b3c65cc6-447c-4089-860f-51f66d6e9c70",
        contentId: "bfd09272-b294-40b9-8288-0e2f2f4964b1",
        type: "video",
        value: "https://www.example.com/videos/nestjs-upload-video.mp4",
        order: 5,
      },
    ],
  },
};

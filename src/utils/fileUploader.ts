"use client";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY as string,
  },
});

export default async function uploadFileInAws(file: File) {
  if (!file) return;

  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: "newportalbucket1122",
        Key: file.name,
        Body: file,
        ContentType: file.type,
      },
    });

    upload.on("httpUploadProgress", (progress) => {
    });

    const result = await upload.done();
    return result?.Location;
  } catch (err) {
  }
}

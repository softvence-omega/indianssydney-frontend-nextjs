"use client"
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

export default async function uploadFileInAws(file: File) {
  if (!file) return;

  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: "indianssendy12",
        Key: file.name,
        Body: file,
        ContentType: file.type,
      },
    });

    upload.on("httpUploadProgress", (progress) => {
      console.log("Progress:", progress);
    });

    const result = await upload.done();
    return result?.Location;
  } catch (err) {
    console.log("Upload Error:", err);
  }
}

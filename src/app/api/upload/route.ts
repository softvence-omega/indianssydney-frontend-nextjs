import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Read file data
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save in your VPS uploads folder
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  // Create public URL
  const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${fileName}`;

  return NextResponse.json({ url: imageUrl });
};

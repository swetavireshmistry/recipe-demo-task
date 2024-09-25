import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the POST handler
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const filename=new Date().getTime()
    // Define file path
    const filePath = path.join(process.cwd(), 'public','assets','images',"upload",`${filename}.png`);
    // Ensure the directory exists
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Read the file and write it to the file system
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    return NextResponse.json({ message: 'File uploaded successfully!', image:`${filename}.png` });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ message: 'File upload failed' }, { status: 500 });
  }
}

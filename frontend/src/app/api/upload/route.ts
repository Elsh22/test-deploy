// api/upload/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../models/lib/mongodb";
import { Readable } from 'stream';

let gfs: mongoose.mongo.GridFSBucket;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF, DOC, and DOCX files are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    await connectDB();
    
    if (!gfs) {
      gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'resumes'
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix;

    const uploadStream = gfs.openUploadStream(filename, {
      contentType: file.type,
      metadata: {
        originalName: file.name,
        uploadDate: new Date()
      }
    });

    // Convert buffer to stream and pipe to GridFS
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);

    await new Promise((resolve, reject) => {
      readable
        .pipe(uploadStream)
        .on('error', reject)
        .on('finish', resolve);
    });

    return NextResponse.json({ 
      fileId: uploadStream.id.toString(),
      msg: ["File uploaded successfully"],
      success: true 
    });

  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { error: "Error uploading file", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get('id');

    if (!fileId) {
      return NextResponse.json(
        { error: "No file ID provided" },
        { status: 400 }
      );
    }

    await connectDB();

    if (!gfs) {
      gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'resumes'
      });
    }

    // Find file metadata and validate
    const files = await gfs.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
    if (!files.length) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    const file = files[0];
    const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    // Convert stream to buffer
    const chunks: any[] = [];
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Return file with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.contentType,
        'Content-Disposition': `attachment; filename="${file.filename}"`,
      },
    });
  } catch (error) {
    console.error('Error retrieving file:', error);
    return NextResponse.json(
      { error: "Error retrieving file" },
      { status: 500 }
    );
  }
}
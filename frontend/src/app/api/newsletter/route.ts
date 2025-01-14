import { NextResponse } from "next/server";
import connectDB from "../../models/lib/mongodb";
import { Newsletter } from "../../models/newsletter";
import mongoose from "mongoose";

// Get subscribers (for admin dashboard)
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    // Build query for search
    const query = search
      ? { email: { $regex: search, $options: 'i' } }
      : {};

    // Get total count for pagination
    const total = await Newsletter.countDocuments(query);

    // Get paginated results
    const subscribers = await Newsletter.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      success: true,
      subscribers,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Newsletter Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch subscribers" 
    }, { status: 500 });
  }
}

// Subscribe to newsletter (existing functionality)
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isExport = searchParams.get('export') === 'true';

    if (isExport) {
      // Handle export request
      await connectDB();
      const subscribers = await Newsletter.find().sort({ date: -1 });
      
      // Convert to CSV
      const csv = [
        ['Email', 'Date Subscribed'],
        ...subscribers.map(sub => [
          sub.email,
          new Date(sub.date).toISOString()
        ])
      ].map(row => row.join(',')).join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=subscribers-${new Date().toISOString().split('T')[0]}.csv`
        }
      });
    } else {
      // Handle newsletter subscription
      const { email } = await req.json();

      await connectDB();
      await Newsletter.create({ email });

      return NextResponse.json({
        msg: ["Successfully subscribed to newsletter"],
        success: true,
      });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      return NextResponse.json({ msg: errorList });
    } 

    return NextResponse.json({ msg: ["Unable to subscribe to newsletter."] });
  }
}

// Delete subscriber (for admin dashboard)
export async function DELETE(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: "No subscriber ID provided" 
      }, { status: 400 });
    }

    const result = await Newsletter.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json({ 
        success: false, 
        error: "Subscriber not found" 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully"
    });
  } catch (error) {
    console.error('Delete Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to delete subscriber" 
    }, { status: 500 });
  }
}

// Update subscriber (for admin dashboard)
export async function PATCH(request: Request) {
  try {
    await connectDB();
    
    const { id, updates } = await request.json();
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: "No subscriber ID provided" 
      }, { status: 400 });
    }

    const subscriber = await Newsletter.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!subscriber) {
      return NextResponse.json({ 
        success: false, 
        error: "Subscriber not found" 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      subscriber
    });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to update subscriber" 
    }, { status: 500 });
  }
}
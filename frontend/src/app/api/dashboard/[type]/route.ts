// api/dashboard/[type]/route.ts
import { NextResponse } from "next/server";
import connectDB from "../../../models/lib/mongodb";
import { Contact } from "../../../models/contact";
import { ChapterApplication } from "../../../models/chapterApplication";
import { EventSuggestion } from "../../../models/eventSuggestion";
import { Partnership } from "../../../models/partnership";
import { DMCNonProfit } from "../../../models/dmcNonProfit";
import { Newsletter } from "../../../models/newsletter";

const ITEMS_PER_PAGE = 10;

const getModel = (type: string) => {
  console.log('Getting model for type:', type);
  switch (type) {
    case 'contacts':
      return Contact;
    case 'chapters':
      return ChapterApplication;
    case 'events':
      return EventSuggestion;
    case 'partnerships':
      return Partnership;
    case 'nonprofits':
      return DMCNonProfit;
    case 'newsletter':
      return Newsletter;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  console.log('API Route accessed:', params.type);
  
  try {
    // Check for auth token
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    console.log('Search params:', Object.fromEntries(searchParams));

    const page = parseInt(searchParams.get('page') || '1');
    const seen = searchParams.get('seen');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'date';
    const order = searchParams.get('order') || 'desc';
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    const Model = getModel(params.type);

    // Build query
    const query: any = {};

    // Handle seen/unseen filter
    if (seen !== null && seen !== undefined && seen !== '') {
      query.seen = seen === 'true';
    }

    // Handle date range filter
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) {
        query.date.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setDate(endDate.getDate() + 1);
        query.date.$lte = endDate;
      }
    }

    // Handle search
    if (search) {
      const searchFields = getSearchFields(params.type);
      query.$or = searchFields.map(field => ({
        [field]: { $regex: search, $options: 'i' }
      }));
    }

    console.log('Query:', JSON.stringify(query, null, 2));

    // Get total count for pagination
    const total = await Model.countDocuments(query);
    console.log('Total count:', total);

    // Handle sorting
    const sortQuery: any = {};
    if (sortBy === 'date') {
      sortQuery.date = order === 'desc' ? -1 : 1;
    } else if (sortBy === 'seen') {
      sortQuery.seen = order === 'desc' ? -1 : 1;
      sortQuery.date = -1; // Secondary sort
    } else {
      sortQuery[sortBy] = order === 'desc' ? -1 : 1;
    }

    // Get paginated data
    const data = await Model.find(query)
      .sort(sortQuery)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .lean();

    console.log(`Retrieved ${data.length} items`);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        totalPages: Math.ceil(total / ITEMS_PER_PAGE),
        total,
        hasMore: page * ITEMS_PER_PAGE < total
      }
    });
  } catch (error) {
    console.error(`${params.type} Error:`, error);
    return NextResponse.json({ 
      success: false, 
      error: `Failed to fetch ${params.type}`,
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function getSearchFields(type: string): string[] {
  switch (type) {
    case 'contacts':
      return ['fullname', 'email', 'subject', 'message'];
    case 'chapters':
      return ['chapterName', 'institution', 'primaryContact'];
    case 'events':
      return ['eventTitle', 'description', 'yourRole'];
    case 'partnerships':
      return ['organizationName', 'contactPerson', 'email', 'message'];
    case 'nonprofits':
      return ['firstName', 'lastName', 'email', 'company', 'jobTitle'];
    default:
      return [];
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, seen } = await request.json();
    await connectDB();

    const Model = getModel(params.type);
    const result = await Model.findByIdAndUpdate(
      id, 
      { seen }, 
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ 
        success: false, 
        error: "Document not found" 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to update document"
    }, { status: 500 });
  }
}
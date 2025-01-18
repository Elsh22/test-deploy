// api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../models/lib/mongodb";
import { Contact } from "../../models/contact";
import { ChapterApplication } from "../../models/chapterApplication";
import { EventSuggestion } from "../../models/eventSuggestion";
import { Partnership } from "../../models/partnership";
import { DMCNonProfit } from "../../models/dmcNonProfit";

// Remove the edge runtime declaration
// export const runtime = 'edge';

// Explicitly set Node.js runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Check for auth token
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectDB();
    
    // Get counts in parallel
    const [
      totalContacts,
      totalChapters,
      totalEvents,
      totalPartnerships,
      totalNonprofits
    ] = await Promise.all([
      Contact.countDocuments(),
      ChapterApplication.countDocuments(),
      EventSuggestion.countDocuments(),
      Partnership.countDocuments(),
      DMCNonProfit.countDocuments()
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get recent counts in parallel
    const [
      recentContacts,
      recentChapters,
      recentEvents,
      recentPartnerships,
      recentNonprofits
    ] = await Promise.all([
      Contact.countDocuments({ date: { $gte: sevenDaysAgo } }),
      ChapterApplication.countDocuments({ date: { $gte: sevenDaysAgo } }),
      EventSuggestion.countDocuments({ date: { $gte: sevenDaysAgo } }),
      Partnership.countDocuments({ date: { $gte: sevenDaysAgo } }),
      DMCNonProfit.countDocuments({ date: { $gte: sevenDaysAgo } })
    ]);

    // Get unseen counts in parallel
    const [
      unseenContacts,
      unseenChapters,
      unseenEvents,
      unseenPartnerships,
      unseenNonprofits
    ] = await Promise.all([
      Contact.countDocuments({ seen: false }),
      ChapterApplication.countDocuments({ seen: false }),
      EventSuggestion.countDocuments({ seen: false }),
      Partnership.countDocuments({ seen: false }),
      DMCNonProfit.countDocuments({ seen: false })
    ]);

    // Prepare and return response
    return NextResponse.json({
      success: true,
      stats: {
        totalSubmissions: totalContacts + totalChapters + totalEvents + totalPartnerships + totalNonprofits,
        recentSubmissions: recentContacts + recentChapters + recentEvents + recentPartnerships + recentNonprofits,
        unseenSubmissions: unseenContacts + unseenChapters + unseenEvents + unseenPartnerships + unseenNonprofits,
        submissionsByType: {
          contacts: totalContacts,
          chapters: totalChapters,
          events: totalEvents,
          partnerships: totalPartnerships,
          nonprofits: totalNonprofits,
          newsletter: 0
        },
        recentByType: {
          contacts: recentContacts,
          chapters: recentChapters,
          events: recentEvents,
          partnerships: recentPartnerships,
          nonprofits: recentNonprofits,
          newsletter: 0
        },
        unseenByType: {
          contacts: unseenContacts,
          chapters: unseenChapters,
          events: unseenEvents,
          partnerships: unseenPartnerships,
          nonprofits: unseenNonprofits,
          newsletter: 0
        }
      }
    });
  } catch (error) {
    console.error('Stats Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch statistics",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
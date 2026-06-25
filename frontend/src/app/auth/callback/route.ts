import { NextResponse, type NextRequest } from "next/server";
import { isLocalPortalEnabled } from "../../../lib/localPortal";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export async function GET(request: NextRequest) {
  if (!isLocalPortalEnabled()) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";
  const supabase = createSupabaseServerClient();

  if (code && supabase) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, request.url));
}

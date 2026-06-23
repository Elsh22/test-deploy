import { NextResponse } from "next/server";

type ApiContext = {
  params: {
    path?: string[];
  };
};

export function GET(_request: Request, context: ApiContext) {
  const path = context.params.path?.join("/") ?? "";

  if (
    path === "courses" ||
    path === "planner/items" ||
    path === "dashboard/dashboard_cards"
  ) {
    return NextResponse.json([]);
  }

  if (path === "users/self/colors") {
    return NextResponse.json({});
  }

  return NextResponse.json({ ok: true });
}

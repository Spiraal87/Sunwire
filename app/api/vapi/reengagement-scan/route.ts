// This route is triggered on a schedule (via Vercel Cron) to scan for cold leads.
// Eventually will identify leads that haven't engaged recently and trigger follow-up texts.

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("[reengagement-scan] Cron job triggered");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[reengagement-scan] Error running scan:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[reengagement-scan] Manual trigger:", body);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[reengagement-scan] Error running scan:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

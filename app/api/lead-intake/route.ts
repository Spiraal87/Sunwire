// This route receives website form submissions and inbound leads.
// Eventually will trigger an immediate outbound Vapi call or text to engage the lead.

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[lead-intake] Received lead submission:", body);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[lead-intake] Error processing lead:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

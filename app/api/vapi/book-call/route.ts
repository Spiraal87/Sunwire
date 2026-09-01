// This route receives booking confirmations from Vapi after a successful appointment booking.
// Eventually will schedule a reminder call/text before the appointment.

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[book-call] Received booking confirmation:", body);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[book-call] Error processing booking:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

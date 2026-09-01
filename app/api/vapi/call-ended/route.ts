import { NextRequest, NextResponse } from "next/server";
import { appendRow } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[call-ended] Received webhook:", body);

    if (process.env.GOOGLE_SHEET_ID) {
      const timestamp = new Date().toISOString();
      const callId = body.call?.id || "unknown";
      const duration = body.call?.duration || "0";
      const status = body.call?.status || "unknown";

      await appendRow(process.env.GOOGLE_SHEET_ID, [
        timestamp,
        callId,
        duration,
        status,
        JSON.stringify(body),
      ]);

      console.log("[call-ended] Row written to Google Sheets");
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[call-ended] Error processing webhook:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

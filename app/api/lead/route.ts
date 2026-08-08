import { NextResponse } from "next/server";
import { Resend } from "resend";

const LEAD_RECIPIENT = "cdjohnsonzero@gmail.com";
const LEAD_SENDER = "Sunforge Leads <leads@sunforgedigital.com>";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  businessType?: string;
  email?: string;
  callType?: string;
  website?: string; // honeypot
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots that fill this out get a fake success so they never learn they were caught.
  if (isNonEmptyString(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const { firstName, lastName, businessType, email, callType } = payload;
  if (
    !isNonEmptyString(firstName) ||
    !isNonEmptyString(lastName) ||
    !isNonEmptyString(businessType) ||
    !isNonEmptyString(email)
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const fullName = `${firstName} ${lastName}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; skipping email send for lead:", businessType);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const bodyLines = [
    `Name: ${fullName}`,
    `Business type: ${businessType}`,
    `Email: ${email}`,
    `What kind of calls do they get most: ${isNonEmptyString(callType) ? callType : "(not provided)"}`,
  ];

  try {
    await resend.emails.send({
      to: LEAD_RECIPIENT,
      from: LEAD_SENDER,
      replyTo: email,
      subject: `New lead: ${businessType}`,
      text: bodyLines.join("\n"),
    });
  } catch (error) {
    console.error("Failed to send lead email via Resend:", error);
  }

  return NextResponse.json({ ok: true });
}

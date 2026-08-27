import { Resend } from "resend";

// Map client IDs to their information
const CLIENTS = {
  demo: {
    businessName: "Sunforge Digital Demo",
    notifyEmail: "cdjohnsonzero@gmail.com",
    notifyPhone: "719-451-1199",
  },
} as const;

type ClientId = keyof typeof CLIENTS;

interface VapiPayload {
  message?: {
    type?: string;
    toolCallList?: Array<{
      id: string;
      name: string;
      arguments: string | Record<string, unknown>;
    }>;
    toolCalls?: Array<{
      id: string;
      function: {
        name: string;
        arguments: string | Record<string, unknown>;
      };
    }>;
  };
}

interface LeadData {
  name?: string;
  business_name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  [key: string]: unknown;
}

function parseArguments(
  args: string | Record<string, unknown>
): Record<string, unknown> {
  if (typeof args === "string") {
    try {
      return JSON.parse(args);
    } catch {
      return {};
    }
  }
  return args || {};
}

export async function POST(request: Request) {
  try {
    // Get the client ID from the URL query params
    const url = new URL(request.url);
    const clientId = url.searchParams.get("client") as ClientId | null;

    console.log("Received Vapi webhook");
    console.log("Client ID from query:", clientId);

    // Validate client ID
    if (!clientId || !(clientId in CLIENTS)) {
      console.error("Invalid or missing client ID:", clientId);
      return Response.json(
        { error: "Invalid client ID" },
        { status: 400 }
      );
    }

    // Parse the incoming payload
    const payload: VapiPayload = await request.json();
    console.log("Raw payload:", JSON.stringify(payload, null, 2));

    // Extract tool call data (handle both payload shapes)
    let toolCallData: Record<string, unknown> = {};

    if (payload.message?.toolCallList?.[0]) {
      const toolCall = payload.message.toolCallList[0];
      toolCallData = parseArguments(toolCall.arguments);
    } else if (payload.message?.toolCalls?.[0]) {
      const toolCall = payload.message.toolCalls[0];
      toolCallData = parseArguments(toolCall.function.arguments);
    }

    console.log("Extracted tool call data:", toolCallData);

    // Get client config
    const client = CLIENTS[clientId];

    // Extract lead information
    const leadData: LeadData = {
      name: (toolCallData.name || toolCallData.customer_name || toolCallData.caller_name || "Not provided") as string,
      business_name: (toolCallData.business_name || toolCallData.company || toolCallData.business_type || "Not provided") as string,
      phone: (toolCallData.phone || toolCallData.phone_number || toolCallData.caller_phone || "Not provided") as string,
      email: (toolCallData.email || toolCallData.customer_email || "Not provided") as string,
      notes: (toolCallData.notes || toolCallData.message || toolCallData.interest_notes || toolCallData.reason_for_calling || "No additional notes") as string,
    };

    console.log("Parsed lead data:", leadData);

    // Send email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailResult = await resend.emails.send({
      from: "Sunforge Digital <noreply@sunforgedigital.com>",
      to: client.notifyEmail,
      subject: `New Lead: ${leadData.name}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>From:</strong> ${client.businessName}</p>
        <hr />
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Business:</strong> ${leadData.business_name}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Notes:</strong> ${leadData.notes}</p>
      `,
    });

    console.log("Email sent:", emailResult);

    if (emailResult.error) {
      console.error("Email send error:", emailResult.error);
      return Response.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Return the response Vapi expects
    // Get the tool call ID from the payload
    const toolCallId =
      payload.message?.toolCallList?.[0]?.id ||
      payload.message?.toolCalls?.[0]?.id ||
      "unknown";

    const response = {
      results: [
        {
          toolCallId: toolCallId,
          result: "Thanks! I've recorded your information and sent it to our team.",
        },
      ],
    };

    console.log("Sending response to Vapi:", response);
    return Response.json(response);
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

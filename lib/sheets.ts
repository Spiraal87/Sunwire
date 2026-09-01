import { google } from "googleapis";

const sheets = google.sheets("v4");

function getAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    "http://localhost"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return oauth2Client;
}

export async function appendRow(sheetId: string, values: string[]): Promise<void> {
  try {
    const auth = getAuthClient();

    // Force token refresh before making API call
    await auth.refreshAccessToken();

    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: sheetId,
      range: "Leads!A:Z",
      valueInputOption: "RAW",
      requestBody: {
        values: [values],
      },
    });

    console.log("[sheets] Row appended successfully");
  } catch (error) {
    console.error("[sheets] Error appending row:", error);
    throw error;
  }
}

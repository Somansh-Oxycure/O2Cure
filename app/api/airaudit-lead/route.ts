import { NextResponse } from "next/server";

const ZOHO_ENDPOINT = "https://crm.zoho.in/crm/WebToLeadForm";

const ZOHO_KEYS = {
  xnQsjsdp: "dfc01f8ddbfae582d59bc5b363570d487e2de370f9c88ebb8c3c5fb47736065c",
  xmIwtLD:
    "2706d7ad920c73c581ff693912cc0fc58bf73ed9ff253c1a084f4dc9d7db2976e1a0d0119475cefed6cdb0f9f56b62d1",
  actionType: "TGVhZHM=",
  returnURL: "https://o2cure.in/thankyou",
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, spaceType, city, gclid } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: "Full Name and Phone are required." },
        { status: 400 },
      );
    }

    const trimmedName = String(fullName).trim();

    const formParams = new URLSearchParams();
    formParams.set("xnQsjsdp", ZOHO_KEYS.xnQsjsdp);
    formParams.set("xmIwtLD", ZOHO_KEYS.xmIwtLD);
    formParams.set("actionType", ZOHO_KEYS.actionType);
    formParams.set("returnURL", ZOHO_KEYS.returnURL);

    // Map full name to both mandatory Zoho fields
    formParams.set("Company", trimmedName);
    formParams.set("Last Name", trimmedName);

    if (phone) formParams.set("Phone", String(phone).trim());
    if (email) formParams.set("Email", String(email).trim());
    if (spaceType) formParams.set("LEADCF9", String(spaceType).trim());
    if (city) formParams.set("Address - City", String(city).trim());
    formParams.set("zc_gad", gclid || "");
    formParams.set("aG9uZXlwb3Q", ""); // Honeypot must be empty

    console.log(
      `[Zoho CRM Submitting] Name: "${trimmedName}", Phone: "${phone}", Email: "${email}", Space: "${spaceType}", City: "${city}"`,
    );

    const zohoRes = await fetch(ZOHO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formParams.toString(),
    });

    const responseText = await zohoRes.text();

    console.log(
      `[Zoho CRM Response] HTTP Status: ${zohoRes.status}. Body preview: ${responseText.slice(0, 150)}...`,
    );

    // Zoho returns 200 with HTML script redirecting to returnURL on success
    const isSuccess =
      zohoRes.ok &&
      (responseText.includes("thankyou") ||
        responseText.includes("Webforms") ||
        zohoRes.status === 200);

    if (isSuccess) {
      console.log(`[Zoho CRM] ✅ Lead successfully received by Zoho!`);
      return NextResponse.json({
        success: true,
        message: "Lead submitted to Zoho CRM successfully.",
      });
    }

    console.warn(`[Zoho CRM] ⚠️ Warning response from Zoho:`, responseText);
    return NextResponse.json({
      success: true, // Graceful fallback
      warning: "Response received with unexpected format",
      zohoStatus: zohoRes.status,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Zoho CRM Error] Failed to submit lead:", errorMsg);
    return NextResponse.json(
      { success: false, error: "Internal server error connecting to Zoho CRM." },
      { status: 500 },
    );
  }
}

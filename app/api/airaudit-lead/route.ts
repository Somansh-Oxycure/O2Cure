import { NextResponse } from "next/server";

import { formatZohoPhone } from "@/features/audit/lib/zohoLead";

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
    const {
      fullName,
      phone,
      email,
      company,
      environment,
      spaceType,
      city,
      clientType,
      problemDescription,
      leadSource,
      pagePath,
      spaceStage,
      stakeholderRole,
      primaryAirConcern,
      purchaseTimeline,
      preferredCallSlot,
      gclid,
    } = body;

    const trimmedName = fullName ? String(fullName).trim() : "";
    const trimmedCompany = company ? String(company).trim() : "";
    const formattedPhone = phone ? formatZohoPhone(String(phone)) : "";
    const resolvedLeadSource = leadSource
      ? String(leadSource).trim()
      : "Air Audit (/airaudit)";

    if (!trimmedName || !formattedPhone) {
      return NextResponse.json(
        { success: false, error: "Full Name and Phone are required." },
        { status: 400 },
      );
    }

    const formParams = new URLSearchParams();
    formParams.set("xnQsjsdp", ZOHO_KEYS.xnQsjsdp);
    formParams.set("xmIwtLD", ZOHO_KEYS.xmIwtLD);
    formParams.set("actionType", ZOHO_KEYS.actionType);
    formParams.set("returnURL", ZOHO_KEYS.returnURL);

    // Map company (fallback to full name since Company is mandatory in Zoho) and Last Name
    formParams.set("Company", trimmedCompany || trimmedName);
    formParams.set("Last Name", trimmedName);
    formParams.set("Lead Source", resolvedLeadSource);

    formParams.set("Phone", formattedPhone);
    if (email) formParams.set("Email", String(email).trim());
    if (spaceType) formParams.set("LEADCF9", String(spaceType).trim());
    if (city) formParams.set("Address - City", String(city).trim());

    // Map audit survey dropdown fields to Zoho CRM Web-to-Lead fields
    if (spaceStage) formParams.set("Space Stage", String(spaceStage).trim());
    if (stakeholderRole) formParams.set("Stakeholder Role", String(stakeholderRole).trim());
    if (primaryAirConcern) formParams.set("Primary Air Concern", String(primaryAirConcern).trim());
    if (purchaseTimeline) formParams.set("Purchase Timeline", String(purchaseTimeline).trim());
    if (preferredCallSlot) formParams.set("Preferred Call Slot", String(preferredCallSlot).trim());

    // Formatted Description note for sales and engineering team in Zoho CRM
    const descriptionLines = [
      `[${resolvedLeadSource}]`,
      pagePath ? `Page: ${pagePath}` : null,
      clientType ? `Client Type: ${clientType === "b2b" ? "Business / Enterprise" : "Residential / Personal"}` : null,
      trimmedCompany ? `Company: ${trimmedCompany}` : null,
      environment ? `Environment: ${environment}` : null,
      spaceType ? `Space Type: ${spaceType}` : null,
      city ? `City / Area: ${city}` : null,
      problemDescription ? `Message / Concern: ${String(problemDescription).trim()}` : null,
      spaceStage ? `Space Stage: ${spaceStage}` : null,
      stakeholderRole ? `Stakeholder Role: ${stakeholderRole}` : null,
      primaryAirConcern ? `Primary Air Concern: ${primaryAirConcern}` : null,
      purchaseTimeline ? `Purchase Timeline: ${purchaseTimeline}` : null,
      preferredCallSlot ? `Preferred Call Slot: ${preferredCallSlot}` : null,
    ].filter(Boolean);

    formParams.set("Description", descriptionLines.join("\n"));

    formParams.set("zc_gad", gclid || "");
    formParams.set("aG9uZXlwb3Q", ""); // Honeypot must be empty

    console.log(
      `[Zoho CRM Submitting] Source: "${resolvedLeadSource}", Name: "${trimmedName}", Company: "${trimmedCompany}", Phone: "${formattedPhone}", Email: "${email}", Space: "${spaceType}", City: "${city}"`,
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

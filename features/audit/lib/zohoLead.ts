import type { EnquirySubmissionResult } from "@/features/contact/types";

/**
 * Zoho CRM Web-to-Lead hand-off for the Air Audit form.
 * Field names match the Zoho webform exactly (note "Address - City").
 */

const ZOHO_ACTION = "https://crm.zoho.in/crm/WebToLeadForm";
const ZOHO_KEYS = {
  xnQsjsdp: "dfc01f8ddbfae582d59bc5b363570d487e2de370f9c88ebb8c3c5fb47736065c",
  xmIwtLD:
    "2706d7ad920c73c581ff693912cc0fc58bf73ed9ff253c1a084f4dc9d7db2976e1a0d0119475cefed6cdb0f9f56b62d1",
  actionType: "TGVhZHM=",
  returnURL: "https://o2cure.in/thankyou",
} as const;

export interface ZohoLeadInput {
  fullName: string;
  phone: string;
  email: string;
  /** Raw environment value from the form (e.g. "corporate") or "residential". */
  environment: string;
  city: string;
}

/** Maps the form's environment values onto Zoho's Space Type picklist. */
const SPACE_TYPE: Record<string, string> = {
  residential: "Residential",
  corporate: "Commercial",
  government: "Commercial",
  "airports-transit": "Commercial",
  industrial: "Industrial",
  healthcare: "Healthcare",
  education: "Education",
};

export async function submitZohoLead(
  input: ZohoLeadInput,
): Promise<EnquirySubmissionResult> {
  const name = input.fullName.trim();
  const params = new URLSearchParams();

  params.set("xnQsjsdp", ZOHO_KEYS.xnQsjsdp);
  params.set("zc_gad", new URLSearchParams(window.location.search).get("gclid") ?? "");
  params.set("xmIwtLD", ZOHO_KEYS.xmIwtLD);
  params.set("actionType", ZOHO_KEYS.actionType);
  params.set("returnURL", ZOHO_KEYS.returnURL);

  // Full name feeds both mandatory fields.
  params.set("Company", name);
  params.set("Last Name", name);
  params.set("Phone", input.phone.trim());
  params.set("Email", input.email.trim());

  const spaceType = SPACE_TYPE[input.environment];
  if (spaceType) params.set("LEADCF9", spaceType);
  if (input.city) params.set("Address - City", input.city);

  params.set("aG9uZXlwb3Q", ""); // honeypot — must stay empty

  try {
    // Zoho sends no CORS headers, so the response is opaque; a resolved
    // request means the lead was handed off.
    await fetch(ZOHO_ACTION, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    return { success: true, message: "Lead sent." };
  } catch {
    return { success: false, message: "Submission failed." };
  }
}

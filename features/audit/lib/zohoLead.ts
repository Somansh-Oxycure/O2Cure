import type { EnquirySubmissionResult } from "@/features/contact/types";

export interface ZohoLeadInput {
  fullName: string;
  phone: string;
  email: string;
  /** Raw environment value from the form (e.g. "corporate") or "residential". */
  environment: string;
  city: string;
  spaceStage?: string;
  stakeholderRole?: string;
  primaryAirConcern?: string;
  purchaseTimeline?: string;
  preferredCallSlot?: string;
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
  const gclid =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("gclid") ?? ""
      : "";

  const spaceType = SPACE_TYPE[input.environment] || "Residential";

  try {
    const res = await fetch("/api/airaudit-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: input.fullName,
        phone: input.phone,
        email: input.email,
        spaceType,
        city: input.city,
        spaceStage: input.spaceStage,
        stakeholderRole: input.stakeholderRole,
        primaryAirConcern: input.primaryAirConcern,
        purchaseTimeline: input.purchaseTimeline,
        preferredCallSlot: input.preferredCallSlot,
        gclid,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.success === false) {
      console.warn("[Audit Lead] Server returned error status:", data);
      return {
        success: false,
        message: data.error || "Failed to submit lead.",
      };
    }

    return {
      success: true,
      referenceId: `ZOHO-${Date.now().toString(36).toUpperCase()}`,
      message: "Lead received and saved to Zoho CRM.",
    };
  } catch (err) {
    console.error("[Audit Lead] Network error:", err);
    return { success: false, message: "Network error submitting lead." };
  }
}

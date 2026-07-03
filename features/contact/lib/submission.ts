import type {
  EnquiryFormData,
  EnquirySubmissionAdapter,
  EnquirySubmissionResult,
} from "@/features/contact/types";

const SIMULATED_LATENCY_MS = 1_200;

/**
 * Default adapter — simulates a successful hand-off without network I/O.
 * Replace with a real adapter when wiring Sanity, CRM, email or API routes.
 */
export const simulatedEnquirySubmission: EnquirySubmissionAdapter = {
  async submit(data: EnquiryFormData): Promise<EnquirySubmissionResult> {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

    if (process.env.NODE_ENV === "development") {
      console.info("[enquiry] simulated submission", data);
    }

    return {
      success: true,
      referenceId: `ENQ-${Date.now().toString(36).toUpperCase()}`,
      message: "Enquiry received.",
    };
  },
};

/**
 * Future integration examples (not wired yet):
 *
 * - `createApiRouteSubmission('/api/enquiry')` → Next.js Route Handler
 * - `createCrmSubmission(hubspotClient)` → HubSpot / Salesforce lead API
 * - `createEmailSubmission(resendClient)` → transactional email + notification
 * - `createSanitySubmission(sanityClient)` → document create + webhook
 */
export function createApiRouteSubmission(
  endpoint: string,
): EnquirySubmissionAdapter {
  return {
    async submit(data) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return { success: false, message: "Submission failed." };
      }

      return (await response.json()) as EnquirySubmissionResult;
    },
  };
}

import type {
  NewsletterSubmissionAdapter,
  NewsletterSubmissionResult,
} from "@/features/footer/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Simulated newsletter signup — replace with a real adapter when wiring
 * Sanity, email service or API route.
 */
export const simulatedNewsletterSubmission: NewsletterSubmissionAdapter = {
  async subscribe(email: string): Promise<NewsletterSubmissionResult> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!EMAIL_PATTERN.test(email.trim())) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    return { success: true };
  },
};

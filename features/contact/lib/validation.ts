import type {
  EnquiryFormData,
  EnquiryFormErrors,
  EnquiryFormField,
} from "@/features/contact/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s+().-]{7,}$/;

const messages = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  phone: "Please enter a valid phone number.",
  environment: "Please select an environment.",
} as const;

function isFilled(value: string) {
  return value.trim().length > 0;
}

/**
 * Minimal, field-level validation. Returns only the first error per field
 * so the UI stays calm — no aggressive error walls.
 */
export function validateEnquiryForm(data: EnquiryFormData): EnquiryFormErrors {
  const errors: EnquiryFormErrors = {};

  if (!isFilled(data.name)) {
    errors.name = messages.name;
  }

  if (!isFilled(data.email)) {
    errors.email = messages.email;
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = messages.email;
  }

  if (!isFilled(data.phone)) {
    errors.phone = messages.phone;
  } else if (!PHONE_PATTERN.test(data.phone.trim())) {
    errors.phone = messages.phone;
  }

  if (!data.environment) {
    errors.environment = messages.environment;
  }

  return errors;
}

export function hasEnquiryErrors(errors: EnquiryFormErrors) {
  return Object.keys(errors).length > 0;
}

/** Touch a single field on blur — validate only what the user left. */
export function validateEnquiryField(
  field: EnquiryFormField,
  data: EnquiryFormData,
): string | undefined {
  return validateEnquiryForm(data)[field];
}

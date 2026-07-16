"use client";

import { motion } from "framer-motion";
import {
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type ReactNode,
} from "react";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import { cn } from "@/lib/utils";

type FloatingFieldProps = {
  label: string;
  error?: string;
  optional?: boolean;
  value?: string;
  children: (props: {
    id: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
    onFocus: () => void;
    onBlur: (event: FocusEvent<HTMLElement>) => void;
  }) => ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

/**
 * Shared floating-label shell for text inputs, textarea and select.
 * Keeps focus motion consistent across every enquiry field.
 */
export function FloatingField({
  label,
  error,
  optional = false,
  value = "",
  children,
  className,
  ...props
}: FloatingFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || value.trim().length > 0;

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="group relative">
        <motion.label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-0 origin-left text-muted-foreground transition-colors duration-300 ease-premium",
            isFloating
              ? "top-0 text-xs tracking-wide"
              : "top-4 text-base sm:top-5",
            isFocused && "text-brand-blue",
            error && "text-destructive",
          )}
          animate={{
            y: 0,
            scale: isFloating ? 0.92 : 1,
          }}
          transition={{ duration: durations.fast, ease: easings.premium }}
        >
          {label}
          {optional ? (
            <span className="ml-1 text-muted-foreground/70">(optional)</span>
          ) : null}
        </motion.label>

        {children({
          id,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        })}

        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20 origin-left"
          initial={false}
          animate={{
            scaleX: 1,
            opacity: isFocused ? 1 : 0.5,
          }}
          transition={{ duration: durations.fast, ease: easings.premium }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[1px] bg-brand-green origin-left"
          initial={false}
          animate={{
            scaleX: isFocused ? 1 : 0,
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: durations.fast, ease: easings.premium }}
        />
      </div>

      {error ? (
        <p id={errorId} className="mt-2 text-sm text-destructive/90" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const fieldClassName =
  "w-full border-0 bg-transparent pt-6 pb-2 text-base text-white outline-none transition-colors duration-300 ease-premium placeholder:text-transparent sm:pt-7 sm:text-[1.0625rem]";

type FloatingInputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "className"
> & {
  label: string;
  error?: string;
  optional?: boolean;
};

export function FloatingInput({
  label,
  error,
  optional,
  value = "",
  onFocus,
  onBlur,
  ...props
}: FloatingInputProps) {
  const stringValue = String(value ?? "");

  return (
    <FloatingField label={label} error={error} optional={optional} value={stringValue}>
      {(fieldProps) => (
        <input
          {...props}
          {...fieldProps}
          value={stringValue}
          className={fieldClassName}
          onFocus={(event) => {
            fieldProps.onFocus();
            onFocus?.(event);
          }}
          onBlur={(event) => {
            fieldProps.onBlur(event);
            onBlur?.(event);
          }}
        />
      )}
    </FloatingField>
  );
}

type FloatingTextareaProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "className"
> & {
  label: string;
  error?: string;
  optional?: boolean;
};

export function FloatingTextarea({
  label,
  error,
  optional,
  value = "",
  onFocus,
  onBlur,
  ...props
}: FloatingTextareaProps) {
  const stringValue = String(value ?? "");

  return (
    <FloatingField label={label} error={error} optional={optional} value={stringValue}>
      {(fieldProps) => (
        <textarea
          {...props}
          {...fieldProps}
          value={stringValue}
          className={cn(fieldClassName, "min-h-[7rem] resize-y leading-relaxed")}
          onFocus={(event) => {
            fieldProps.onFocus();
            onFocus?.(event);
          }}
          onBlur={(event) => {
            fieldProps.onBlur(event);
            onBlur?.(event);
          }}
        />
      )}
    </FloatingField>
  );
}

type FloatingSelectProps = Omit<
  ComponentPropsWithoutRef<"select">,
  "className" | "children"
> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function FloatingSelect({
  label,
  error,
  options,
  placeholder = "Select",
  value = "",
  onFocus,
  onBlur,
  onChange,
  ...props
}: FloatingSelectProps) {
  const stringValue = String(value ?? "");

  return (
    <FloatingField label={label} error={error} value={stringValue}>
      {(fieldProps) => (
        <select
          {...props}
          {...fieldProps}
          value={stringValue}
          onChange={onChange}
          onFocus={(event) => {
            fieldProps.onFocus();
            onFocus?.(event);
          }}
          onBlur={(event) => {
            fieldProps.onBlur(event);
            onBlur?.(event);
          }}
          className={cn(
            fieldClassName,
            "cursor-pointer appearance-none pr-8",
            !stringValue && "text-muted-foreground",
          )}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FloatingField>
  );
}

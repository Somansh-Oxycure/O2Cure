"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { easings } from "@/components/motion/easings";

export function WhatsAppButton() {
  const prefersReducedMotion = useReducedMotion();

  // Entrance transition
  const entranceTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: easings.premium, delay: 0.8 };

  // Idle floating transition (up and down)
  const floatTransition = prefersReducedMotion
    ? {}
    : {
        y: {
          duration: 3.5,
          repeat: Infinity,
          ease: easings.idle,
        },
      };

  return (
    <motion.a
      href="https://wa.me/919034952636"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-transparent shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 lg:h-12 lg:w-12"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.08 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
      transition={entranceTransition}
    >
      <motion.div
        className="relative h-full w-full"
        animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
        transition={floatTransition}
      >
        <Image
          src="/WhatsApp.svg"
          alt="WhatsApp logo"
          fill
          priority
          className="object-contain"
        />
      </motion.div>
    </motion.a>
  );
}

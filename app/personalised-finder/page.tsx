import type { Metadata } from "next";
import { AirIssueFinder } from "@/features/solutions";

export const metadata: Metadata = {
  title: "Personalised Air Issue Finder | O2Cure",
  description: "Find the best air purification solution tailored to your specific environment and needs.",
};

export default function PersonalisedFinderPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white pt-16">
      <div className="border-b border-[#E5E7EB] bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
            Diagnostics
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[clamp(1.75rem,1.5rem+1.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#1C1C1C]">
                Personalised Issue Finder
              </h1>
              <p className="mt-2 max-w-lg text-[0.9rem] leading-[1.6] text-[#6B7280]">
                Identify specific air quality issues and discover the optimal system for your space.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AirIssueFinder />
    </main>
  );
}

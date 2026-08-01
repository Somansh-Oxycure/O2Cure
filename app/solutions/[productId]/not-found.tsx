import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F4] px-6">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#3A7D2A] mb-4">
        404
      </p>
      <h1 className="font-semibold text-3xl md:text-4xl text-[#1C1C1C] tracking-tight text-center mb-4">
        Product not found.
      </h1>
      <p className="text-[#6B7280] text-base mb-10 text-center max-w-sm">
        We couldn&apos;t find that product. Browse our full catalogue to find the right air purification solution.
      </p>
      <Link
        href="/solutions"
        className="inline-flex items-center gap-2 rounded-full bg-[#1C1C1C] text-white font-semibold px-7 py-3.5 hover:bg-[#3A7D2A] transition-colors"
      >
        View all solutions
      </Link>
    </main>
  );
}

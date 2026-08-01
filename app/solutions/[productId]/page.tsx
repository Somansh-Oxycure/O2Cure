import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/features/solutions/data/productCatalog";
import { getProductDetail } from "@/features/solutions/data/productDetailData";
import { ProductDetailPage } from "@/features/solutions/components/ProductDetailPage";

// ─── Static params — pre-renders all 26 product pages at build time ───────────

export function generateStaticParams() {
  return products.map((p) => ({ productId: p.id }));
}

// ─── Per-product metadata ─────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const entry = products.find((p) => p.id === productId);
  const detail = getProductDetail(productId);

  if (!entry || !detail) {
    return { title: "Product Not Found | O2Cure" };
  }

  const title = `${entry.systemName} | O2Cure Air Purification`;
  const description = detail.overview.slice(0, 155) + "…";
  const imageUrl = `https://o2cure.in${entry.image.src}`;

  return {
    title,
    description,
    keywords: [
      "air purifier",
      "O2Cure",
      entry.systemName,
      ...detail.contaminantsCleared.slice(0, 4),
      "air purification India",
    ].join(","),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://o2cure.in/solutions/${productId}`,
      siteName: "O2Cure",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: entry.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://o2cure.in/solutions/${productId}`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const entry = products.find((p) => p.id === productId);
  const detail = getProductDetail(productId);

  if (!entry || !detail) {
    notFound();
  }

  // JSON-LD Product schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: entry.systemName,
    description: detail.overview,
    brand: {
      "@type": "Brand",
      name: "O2Cure",
    },
    image: `https://o2cure.in${entry.image.src}`,
    ...(detail.cta.type === "priced" && detail.cta.price
      ? {
          offers: {
            "@type": "Offer",
            price: detail.cta.price.replace(/[₹,]/g, ""),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "O2Cure",
              url: "https://o2cure.in",
            },
          },
        }
      : {
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStoreOnly",
            seller: {
              "@type": "Organization",
              name: "O2Cure",
              url: "https://o2cure.in",
            },
          },
        }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailPage detail={detail} entry={entry} />
    </>
  );
}

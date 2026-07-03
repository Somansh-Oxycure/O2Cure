import { AqiSection } from "@/features/aqi";
import { ContactSection } from "@/features/contact";
import { ChapterExperience } from "@/features/environment";
import { FooterSection } from "@/features/footer";
import { Hero } from "@/features/hero";
import { ProductsSection } from "@/features/products";
import { TechnologySection } from "@/features/technology";
import { TrustSection } from "@/features/trust";

export default function Home() {
  return (
    <div className="bg-background">
      <ChapterExperience hero={<Hero />} />
      <AqiSection />
      <TechnologySection />
      <ProductsSection />
      <TrustSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

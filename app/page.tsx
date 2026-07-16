import { AqiSection } from "@/features/aqi";
import { ContactSection } from "@/features/contact";
import { ChapterExperience } from "@/features/environment";
import { FooterSection } from "@/features/footer";
import { Hero } from "@/features/hero";
import { ProductsSection } from "@/features/products";
import { TechnologySection } from "@/features/technology";
import { MetricsSection, ClienteleSection, TestimonialsSection, CertificationsSection } from "@/features/trust";

export default function Home() {
  return (
    <div className="bg-background">
      <ChapterExperience hero={<Hero />} />
      <ClienteleSection />
      <MetricsSection />
      <AqiSection />
      <TechnologySection />
      <CertificationsSection />
      {/* <ProductsSection /> */}
      {/* Numbers / impact metrics sit right after the environment narrative */}
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

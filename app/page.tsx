import { AqiSection } from "@/features/aqi";
import { ContactSection } from "@/features/contact";
import { ChapterExperience } from "@/features/environment";
import { FooterSection } from "@/features/footer";
import { Hero, HeroVideo, HERO_MODE } from "@/features/hero";

import { TechnologySection } from "@/features/technology";
import { MetricsSection, ClienteleSection, TestimonialsSection, CertificationsSection } from "@/features/trust";

export default function Home() {
  const ActiveHero = HERO_MODE === "video" ? HeroVideo : Hero;

  return (
    <div className="bg-background">
      <ChapterExperience hero={<ActiveHero />} />
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

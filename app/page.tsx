import { AqiSection } from "@/features/aqi";
import { ContactSection } from "@/features/contact";
import { ChapterExperience } from "@/features/environment";
import { FooterSection } from "@/features/footer";
import { Hero, HeroVideo, HERO_MODE } from "@/features/hero";

import { TechnologySection } from "@/features/technology";
import { MetricsSection, ClienteleSection, TestimonialsSection, CertificationsSection } from "@/features/trust";

export default function Home() {
  return (
    <div className="bg-background">
      <ChapterExperience
        hero={
          <>
            <div className="hidden md:block">
              <HeroVideo />
            </div>
            <div className="block md:hidden">
              <Hero />
            </div>
          </>
        }
      />
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

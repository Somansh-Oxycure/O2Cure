import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { SocialIcon } from "@/features/footer/components/SocialIcon";
import { footerContent } from "@/features/footer/content";
import { formatBrandText } from "@/lib/brand";

/**
 * AuditFooter — Landing page footer matching the Figma design.
 * Left: logo, mission bio, green social icons.
 * Bottom bar: copyright notice and "Made with care for healthier living."
 */
export function AuditFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="audit-footer"
      role="contentinfo"
      aria-label="Site footer"
      className="border-t border-border/50 bg-[#F2F5F1] px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal delay={0} distance={16} amount={0.2}>
          <div className="flex flex-col items-start">
            {/* Logo */}
            <Image
              src="/O2cure-final-logo.png"
              alt="O₂Cure — Take a Deep Breath"
              width={140}
              height={95}
              className="h-auto w-[110px] sm:w-[125px]"
            />

            {/* Mission statement */}
            <p className="mt-5 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-[0.82rem]">
              Creating healthier indoor spaces through intelligent air purification for
              homes, workplaces and critical environments.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4 text-brand-green">
              {footerContent.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-7 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 hover:opacity-80"
                >
                  <SocialIcon platform={social.platform} className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="mt-12 border-t border-border/60 sm:mt-16" aria-hidden />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[0.72rem] text-muted-foreground sm:flex-row sm:text-xs">
          <p>
            © {currentYear} {formatBrandText("O2Cure")}. All rights reserved.
          </p>
          <p>Made with care for healthier living.</p>
        </div>
      </div>
    </footer>
  );
}

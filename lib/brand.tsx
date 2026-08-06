import React from 'react';

export function O2CureLogoText({ className }: { className?: string }) {
  return (
    <span className={`whitespace-nowrap text-brand-green ${className || ''}`}>
      <span className="text-[1.15em] leading-none">O</span>
      <sub className="align-baseline text-[0.6em] relative -bottom-[0.1em] font-bold">2CURE</sub>
    </span>
  );
}

export function formatBrandText(text: string | React.ReactNode): React.ReactNode {
  if (typeof text !== 'string') return text;

  // Split the text by O2Cure or O₂Cure, case insensitive
  const parts = text.split(/(O₂Cure|O2Cure|O2cure|o2cure)/gi);

  // If the array only has one part, it means no match was found
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, index) => {
        if (/^(O₂Cure|O2Cure|O2cure|o2cure)$/i.test(part)) {
          return <O2CureLogoText key={index} />;
        }
        return part;
      })}
    </>
  );
}

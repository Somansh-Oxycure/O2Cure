import React from 'react';
import { cn } from '@/lib/utils';

export const O2CureLogoText = ({ className }: { className?: string }) => {
  return (
    <span className={cn('font-bold text-[#3A7D2A] inline-block', className)}>
      O<sub className='bottom-0 font-semibold'>2</sub>Cure
    </span>
  );
};

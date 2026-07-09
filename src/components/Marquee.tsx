import { motion } from 'motion/react';

interface MarqueeProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
}

export default function Marquee({ 
  items = [
    'SHOPIFY EXPERT', 
    'CONVERSION RATE OPTIMIZATION', 
    'HIGH-CONVERTING LANDING PAGES', 
    'CUSTOM LIQUID CODE', 
    'FIGMA DESIGN SYSTEMS',
    'MODERN BRANDING SOLUTIONS',
    'MOBILE-FIRST USER EXPERIENCES'
  ],
  speed = 25,
  reverse = false
}: MarqueeProps) {
  
  // Duplicate list to make infinite seamless transition
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-brand-card/30 border-y border-white/5 py-5 select-none my-12">
      {/* Decorative side fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-12 text-sm md:text-md font-mono font-bold tracking-widest text-brand-text-secondary/40 items-center"
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%']
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed
        }}
      >
        {marqueeItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span>{text}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink shrink-0 shadow-[0_0_8px_#B14EFF]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

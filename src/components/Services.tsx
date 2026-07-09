import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Target, Sparkles, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '../data';

// Map icon strings to Lucide elements safely
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag: ShoppingBag,
  Target: Target,
  Sparkles: Sparkles,
  Layers: Layers
};

// Define gradients for each card to match the vibrant colorful spheres in the reference image
const cardGradients = [
  'from-[#9B51E0] via-[#7B3FE4] to-[#3080ED]', // Purple to Blue
  'from-[#3080ED] via-[#855DFF] to-[#E040FB]', // Blue to Purple/Pink
  'from-[#E040FB] via-[#D855E3] to-[#FF5CC8]', // Pink/Purple to Rose
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = () => {
    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 6000); // Resume autoplay after 6 seconds of no interaction
  };

  useEffect(() => {
    // Autoplay only on mobile screens (md is 768px in services component breakpoint)
    const checkIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;
    
    const interval = setInterval(() => {
      if (isInteractingRef.current || !checkIsMobile()) return;
      
      setActiveIdx((prev) => {
        const nextIdx = (prev + 1) % SERVICES_DATA.length;
        const slider = document.getElementById('services-slider');
        if (slider) {
          const cardWidth = slider.clientWidth - 48;
          slider.scrollTo({
            left: nextIdx * (cardWidth + 24),
            behavior: 'smooth'
          });
        }
        return nextIdx;
      });
    }, 3000); // Autoplay slide interval

    return () => {
      clearInterval(interval);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPosition = target.scrollLeft;
    const cardWidth = target.clientWidth - 48; // width is calc(100vw - 3rem)
    if (cardWidth > 0) {
      const index = Math.round(scrollPosition / (cardWidth + 24)); // 24 is gap-6
      setActiveIdx(Math.max(0, Math.min(SERVICES_DATA.length - 1, index)));
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    handleInteraction();
    const slider = document.getElementById('services-slider');
    if (slider) {
      const cardWidth = slider.clientWidth - 48;
      const step = direction === 'left' ? -1 : 1;
      const targetIdx = Math.max(0, Math.min(SERVICES_DATA.length - 1, activeIdx + step));
      
      slider.scrollTo({
        left: targetIdx * (cardWidth + 24),
        behavior: 'smooth'
      });
      setActiveIdx(targetIdx);
    }
  };

  return (
    <section id="services" className="relative py-24 px-6 lg:px-12 border-t border-white/5 bg-[#080814]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <span className="text-brand-pink text-xs font-mono tracking-widest uppercase block font-semibold">
            WHAT I DO
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Services I Offer
          </h2>
        </div>

        {/* 3 Cards Touch Slider on mobile, Grid on desktop */}
        <div 
          id="services-slider"
          onScroll={handleScroll}
          onTouchStart={handleInteraction}
          onMouseDown={handleInteraction}
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none gap-6 md:gap-8 max-w-6xl mx-auto pb-6 md:pb-0 px-6 md:px-0 -mx-6 md:mx-auto md:grid-cols-3"
        >
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = IconMap[service.iconName] || Layers;
            const gradientClass = cardGradients[idx % cardGradients.length];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="relative p-8 rounded-2xl bg-[#13182D] border border-white/5 transition-all duration-300 group flex flex-col items-center text-center shadow-lg min-w-[calc(100vw-3rem)] max-w-[calc(100vw-3rem)] snap-center md:min-w-0 md:max-w-none md:snap-align-none"
              >
                {/* Subtle top glow line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-brand-purple/40 transition-all duration-500 rounded-t-2xl" />
                
                {/* Centered Circular Icon Container with Vibrant Gradient Background */}
                <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                  <IconComponent className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white tracking-wide mt-6 mb-3 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-brand-text-secondary leading-relaxed font-light max-w-xs mb-2">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Left/Right Navigation and Pagination Dots */}
        <div className="flex md:hidden flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollSlider('left')}
              disabled={activeIdx === 0}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                activeIdx === 0 
                  ? 'border-white/5 text-white/20' 
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
              aria-label="Previous service"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {SERVICES_DATA.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    const slider = document.getElementById('services-slider');
                    if (slider) {
                      const cardWidth = slider.clientWidth - 48;
                      slider.scrollTo({
                        left: dotIdx * (cardWidth + 24),
                        behavior: 'smooth'
                      });
                      setActiveIdx(dotIdx);
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIdx === dotIdx ? 'w-5 bg-brand-pink' : 'w-1.5 bg-white/10'
                  }`}
                  aria-label={`Go to service ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollSlider('right')}
              disabled={activeIdx === SERVICES_DATA.length - 1}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                activeIdx === SERVICES_DATA.length - 1 
                  ? 'border-white/5 text-white/20' 
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
              aria-label="Next service"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

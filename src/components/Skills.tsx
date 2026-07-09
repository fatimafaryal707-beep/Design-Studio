import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data';
import { ShoppingBag, Code, Framer, Palette, Eye, Smartphone, TrendingUp, Layout, ChevronLeft, ChevronRight } from 'lucide-react';

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag: ShoppingBag,
  Code: Code,
  Framer: Framer,
  Palette: Palette,
  Eye: Eye,
  Smartphone: Smartphone,
  TrendingUp: TrendingUp,
  Layout: Layout
};

export default function Skills() {
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
    // Autoplay only on mobile/touch screens
    const checkIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 640;
    
    const interval = setInterval(() => {
      if (isInteractingRef.current || !checkIsMobile()) return;
      
      setActiveIdx((prev) => {
        const nextIdx = (prev + 1) % SKILLS_DATA.length;
        const slider = document.getElementById('skills-slider');
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
    const cardWidth = target.clientWidth - 48; // spacing margin
    if (cardWidth > 0) {
      const index = Math.round(scrollPosition / (cardWidth + 24)); // 24 is gap-6
      setActiveIdx(Math.max(0, Math.min(SKILLS_DATA.length - 1, index)));
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    handleInteraction();
    const slider = document.getElementById('skills-slider');
    if (slider) {
      const cardWidth = slider.clientWidth - 48;
      const step = direction === 'left' ? -1 : 1;
      const targetIdx = Math.max(0, Math.min(SKILLS_DATA.length - 1, activeIdx + step));
      
      slider.scrollTo({
        left: targetIdx * (cardWidth + 24),
        behavior: 'smooth'
      });
      setActiveIdx(targetIdx);
    }
  };

  return (
    <section id="skills" className="relative py-24 px-6 lg:px-12 border-t border-white/5 bg-[#080814]">
      {/* Background radial highlight */}
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-brand-purple/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-purple/20 bg-brand-purple/5 text-brand-purple text-xs font-mono tracking-widest uppercase">
            <span>Expertise</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-brand-text-secondary max-w-xl text-sm md:text-md font-light leading-relaxed">
            Crafting premium interactive stores with strict performance parameters. Fully equipped with modern design frameworks and conversion tactics.
          </p>
        </div>

        {/* Skills Cards Grid - Touch scroll with display-one on mobile, grid on desktop */}
        <div 
          id="skills-slider"
          onScroll={handleScroll}
          onTouchStart={handleInteraction}
          onMouseDown={handleInteraction}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scrollbar-none gap-6 max-w-7xl mx-auto pb-6 sm:pb-0 px-6 sm:px-0 -mx-6 sm:mx-auto sm:grid-cols-2 lg:grid-cols-4"
        >
          {SKILLS_DATA.map((skill, idx) => {
            const Icon = IconMap[skill.icon] || Code;
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ 
                  y: -5,
                  borderColor: idx % 3 === 0 ? 'rgba(177, 78, 255, 0.4)' : idx % 3 === 1 ? 'rgba(93, 124, 255, 0.4)' : 'rgba(255, 92, 200, 0.4)',
                  boxShadow: idx % 3 === 0 ? '0 0 25px rgba(177, 78, 255, 0.12)' : idx % 3 === 1 ? '0 0 25px rgba(93, 124, 255, 0.12)' : '0 0 25px rgba(255, 92, 200, 0.12)'
                }}
                className="relative p-6 rounded-2xl glass-card transition-all duration-300 group overflow-hidden flex flex-col justify-between min-w-[calc(100vw-3rem)] max-w-[calc(100vw-3rem)] snap-center sm:min-w-0 sm:max-w-none sm:snap-align-none"
              >
                {/* Visual subtle corner neon dot */}
                <div className={`absolute top-0 right-0 h-10 w-10 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-white/10`} />

                <div>
                  {/* Skill Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-white/2 border border-white/5 group-hover:bg-white/5 transition-colors duration-300 ${
                       idx % 3 === 0 ? 'text-brand-purple' : idx % 3 === 1 ? 'text-brand-blue' : 'text-brand-pink'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] text-brand-text-secondary font-mono bg-white/5 px-2 py-0.5 rounded">
                      {skill.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-md font-display font-semibold text-white tracking-wide group-hover:text-white transition-colors">
                    {skill.name}
                  </h3>
                </div>

                {/* Progress bar and numeric scale */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-brand-text-secondary/50">PRO LEVEL</span>
                    <span className="text-white font-bold">{skill.level}%</span>
                  </div>
                  
                  <div className="relative w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${
                        idx % 3 === 0 ? 'from-brand-purple to-brand-blue' : 
                        idx % 3 === 1 ? 'from-brand-blue to-brand-pink' : 
                        'from-brand-pink to-brand-purple'
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Left/Right Navigation and Pagination Dots */}
        <div className="flex sm:hidden flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollSlider('left')}
              disabled={activeIdx === 0}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                activeIdx === 0 
                  ? 'border-white/5 text-white/20' 
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
              aria-label="Previous skill"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {SKILLS_DATA.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    const slider = document.getElementById('skills-slider');
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
                  aria-label={`Go to skill ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollSlider('right')}
              disabled={activeIdx === SKILLS_DATA.length - 1}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                activeIdx === SKILLS_DATA.length - 1 
                  ? 'border-white/5 text-white/20' 
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
              aria-label="Next skill"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

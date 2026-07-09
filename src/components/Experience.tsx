import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Building, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slideDuration = 5500; // 5.5 seconds autoplay

  const experiences = [
    {
      year: '2022 – PRESENT',
      role: 'Shopify & Store Customization',
      company: 'Freelance',
      desc: 'Crafting bespoke digital storefronts tailored to individual brand needs, combining robust performance optimization with beautiful modern interfaces.',
      accomplishments: [
        'Designed and customized Shopify stores for eCommerce brands.',
        'Built visually appealing and performance-focused websites.'
      ]
    },
    {
      year: '2022 – PRESENT',
      role: 'Landing Pages & Conversion',
      company: 'Freelance',
      desc: 'Designing and launching laser-focused, high-converting landing pages and custom layouts optimized for the ultimate user experience.',
      accomplishments: [
        'Created high-converting landing pages and product pages.',
        'Developed responsive website layouts focused on user experience.'
      ]
    },
    {
      year: '2022 – PRESENT',
      role: 'Redesigns & Optimization',
      company: 'Freelance',
      desc: 'Collaborating on international projects to transform underperforming websites into sleek, mobile-friendly modern web experiences.',
      accomplishments: [
        'Worked with international clients on website redesign and optimization projects.',
        'Designed mobile-friendly interfaces and modern web experiences.'
      ]
    }
  ];

  // Autoplay functionality for Mobile
  useEffect(() => {
    if (isHovered) return;

    const autoPlayNext = () => {
      setActiveIdx((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
    };

    timeoutRef.current = setInterval(autoPlayNext, slideDuration);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isHovered, experiences.length]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="experience" className="relative py-24 px-6 lg:px-12 border-t border-white/5">
      {/* Background visual lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-pink/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-pink/20 bg-brand-pink/5 text-brand-pink text-xs font-mono tracking-widest uppercase">
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Professional Journey
          </h2>
          <p className="text-brand-text-secondary max-w-xl text-sm md:text-md font-light">
            An established path of visual layout craftsmanship, Shopify expertise, and constant expansion of conversion strategies since 2022.
          </p>
        </div>

        {/* 1. Desktop & Tablet View (Grid layout) */}
        <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8 text-left">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative p-8 rounded-2xl bg-[#0d1021]/80 border border-white/5 hover:border-brand-pink/20 hover:shadow-[0_0_30px_rgba(255,92,200,0.1)] transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Top glow hover bar */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-gradient-to-r group-hover:from-brand-purple/40 group-hover:via-brand-pink/50 group-hover:to-brand-blue/40 transition-all duration-500 rounded-t-2xl" />

              <div className="space-y-5">
                {/* Year Chip & Meta */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono tracking-widest font-bold px-3 py-1 rounded-full border shrink-0 ${
                    idx === 0 ? 'border-brand-purple/20 bg-brand-purple/5 text-brand-purple' : 
                    idx === 1 ? 'border-brand-blue/20 bg-brand-blue/5 text-brand-blue' : 
                    'border-brand-pink/20 bg-brand-pink/5 text-brand-pink'
                  }`}>
                    {exp.year}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary/70 max-w-[150px] truncate">
                    <Building className="h-3.5 w-3.5 shrink-0 text-brand-pink/40" />
                    <span className="truncate">{exp.company}</span>
                  </div>
                </div>

                {/* Role Title */}
                <h3 className="text-lg md:text-xl font-display font-bold text-white tracking-wide group-hover:text-brand-pink transition-colors duration-300 min-h-[56px] flex items-center">
                  {exp.role}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-brand-text-secondary leading-relaxed font-light min-h-[80px]">
                  {exp.desc}
                </p>

                {/* Bullets lists */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  {exp.accomplishments.map((item, accIdx) => (
                    <div key={accIdx} className="flex gap-2.5 items-start text-xs text-brand-text-secondary font-light">
                      <Award className="h-4 w-4 text-brand-pink/70 shrink-0 mt-0.5 group-hover:text-brand-pink group-hover:scale-110 transition-transform duration-300" />
                      <span className="group-hover:text-white/90 transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Mobile View (Single Card Carousel with Left-Right Navigation) */}
        <div 
          className="block md:hidden text-left relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="min-h-[380px] relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 40;
                  if (info.offset.x < -swipeThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrev();
                  }
                }}
                className="relative p-7 rounded-2xl bg-[#0d1021]/80 border border-white/5 shadow-xl flex flex-col justify-between cursor-grab active:cursor-grabbing touch-pan-y"
              >
                {/* Visual Top Highlight */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-purple/40 via-brand-pink/50 to-brand-blue/40 rounded-t-2xl" />

                <div className="space-y-4">
                  {/* Year Chip & Meta */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[9px] font-mono tracking-widest font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                      activeIdx === 0 ? 'border-brand-purple/20 bg-brand-purple/5 text-brand-purple' : 
                      activeIdx === 1 ? 'border-brand-blue/20 bg-brand-blue/5 text-brand-blue' : 
                      'border-brand-pink/20 bg-brand-pink/5 text-brand-pink'
                    }`}>
                      {experiences[activeIdx].year}
                    </span>
                    
                    <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary/70">
                      <Building className="h-3.5 w-3.5 text-brand-pink/40 shrink-0" />
                      <span>{experiences[activeIdx].company}</span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-lg font-display font-bold text-white tracking-wide">
                    {experiences[activeIdx].role}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-brand-text-secondary leading-relaxed font-light min-h-[72px]">
                    {experiences[activeIdx].desc}
                  </p>

                  {/* Bullets lists */}
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    {experiences[activeIdx].accomplishments.map((item, accIdx) => (
                      <div key={accIdx} className="flex gap-2.5 items-start text-xs text-brand-text-secondary font-light">
                        <Award className="h-4 w-4 text-brand-pink/70 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-white active:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Previous experience"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {experiences.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    activeIdx === idx 
                      ? 'w-6 bg-brand-pink shadow-[0_0_8px_#FF5CC8]' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-white active:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Next experience"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}


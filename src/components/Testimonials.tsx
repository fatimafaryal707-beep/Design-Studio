import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slideDuration = 5500; // 5.5 seconds autoplay

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return;

    const nextSlide = () => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    };

    timeoutRef.current = setInterval(nextSlide, slideDuration);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  // Slide animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: 'easeIn' }
    })
  };

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="relative py-24 px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      {/* Background soft lighting blobs */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center">
        
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-brand-blue text-xs font-mono tracking-widest uppercase">
            <span>Kind Words</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-brand-text-secondary max-w-lg mx-auto text-sm md:text-md font-light">
            Real feedback from founders and operators who trusted Fatima to design their premium Shopify stores and conversion ecosystems.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative min-h-[280px] md:min-h-[220px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
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
              className="w-full glass-card p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative select-none cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* Giant Quote Icon background decoration */}
              <div className="absolute top-6 right-8 text-brand-purple/5 pointer-events-none">
                <Quote className="h-20 w-20 transform scale-x-[-1]" />
              </div>

              {/* Stars representation */}
              <div className="flex justify-center gap-1 mb-6 text-brand-pink">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-current" />
                ))}
              </div>

              {/* Testimonial Core Text */}
              <p className="text-white font-display text-md md:text-lg font-light leading-relaxed max-w-2xl mx-auto italic mb-8">
                "{currentTestimonial.text}"
              </p>

              {/* Client Metadata and avatar letter */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-white font-bold text-md border border-white/10 shadow-neon-purple shrink-0">
                  {currentTestimonial.avatarLetter}
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-white leading-tight">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-xs text-brand-text-secondary font-mono tracking-wide">
                    {currentTestimonial.role}, <span className="text-brand-pink font-semibold">{currentTestimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrow buttons and Dots Indicators */}
        <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
          {/* Prev Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-brand-text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>

          {/* Indicators list */}
          <div className="flex gap-2">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index 
                    ? 'w-6 bg-gradient-to-r from-brand-purple to-brand-blue' 
                    : 'w-2 bg-white/10 hover:bg-white/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-brand-text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}

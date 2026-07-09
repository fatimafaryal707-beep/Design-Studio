import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds loader
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="loader-screen"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-bg font-sans"
        exit={{
          y: '-100%',
          opacity: 0,
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }}
      >
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple/10 blur-[120px] animate-glow-1" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-blue/10 blur-[100px] animate-glow-2" />
        </div>

        <div className="relative flex flex-col items-center z-10">
          {/* Glowing Brand Mark "DS" */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex items-center justify-center h-24 w-24 rounded-2xl border border-white/10 bg-brand-sidebar/80 shadow-neon-purple backdrop-blur-md mb-8"
          >
            <span className="text-4xl font-display font-bold text-gradient-purple-blue tracking-tighter">
              DS
            </span>
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-brand-pink/30"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Designer Name and Title */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white font-display text-xl font-semibold tracking-wide mb-1 uppercase"
          >
            Design Studio
          </motion.h2>
          
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-brand-text-secondary text-sm font-mono tracking-widest uppercase mb-12"
          >
            Shopify Designer & Website Designer
          </motion.p>

          {/* Counting Progress */}
          <div className="relative w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-purple via-brand-blue to-brand-pink"
              style={{ width: `${progress}%` }}
            />
          </div>

          <motion.div
            className="mt-4 font-mono text-sm text-brand-pink font-semibold"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            {progress}%
          </motion.div>
        </div>

        {/* Dynamic bottom labels */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-12 font-mono text-xs text-brand-text-secondary/40">
          <span>CREATIVE STUDIO © 2026</span>
          <span>ESTABLISHED 2022</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

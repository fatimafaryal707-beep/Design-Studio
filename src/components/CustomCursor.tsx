import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery-smooth spring physics config
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dynamic Background Ambient Radial Glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-10 opacity-35 mix-blend-screen transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${trailX}px ${trailY}px, rgba(177, 78, 255, 0.08), rgba(93, 124, 255, 0.04), transparent 80%)`,
        }}
      />

      {/* Futuristic Glowing Cursor Dot */}
      <motion.div
        id="custom-cursor"
        className="pointer-events-none fixed top-0 left-0 z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink shadow-[0_0_10px_#FF5CC8]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Outward Ring with physics delay */}
      <motion.div
        id="custom-cursor-ring"
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/50 shadow-[0_0_12px_rgba(177,78,255,0.2)]"
        style={{
          x: trailX,
          y: trailY,
        }}
      />
    </>
  );
}

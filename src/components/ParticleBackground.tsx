import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  parallaxFactor: number;
  driftX: number;
  driftY: number;
}

interface ParticleItemProps {
  p: Particle;
  smoothX: any;
  smoothY: any;
  key?: any;
}

function ParticleItem({ p, smoothX, smoothY }: ParticleItemProps) {
  // Create custom responsive motion transformation mapping for parallax depth effect
  // It multiplies the smooth spring coordinate by the individual particle depth factor
  const transformX = useTransform(smoothX, (val: number) => val * p.parallaxFactor);
  const transformY = useTransform(smoothY, (val: number) => val * p.parallaxFactor);

  return (
    <motion.div
      className="absolute rounded-full shrink-0"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        backgroundColor: p.color,
        x: transformX,
        y: transformY,
        // Apply glowing box shadow only to larger prominent stars to avoid visual clutter
        boxShadow: p.size > 2.5 
          ? `0 0 8px ${p.color}, 0 0 16px ${p.color}55` 
          : 'none',
      }}
      animate={{
        // Combine parallax coordinate mapping with custom drift behavior
        scale: [1, 1.4, 1],
        opacity: [0.15, p.size > 2.5 ? 0.8 : 0.5, 0.15],
        translateX: [0, p.driftX, 0],
        translateY: [0, p.driftY, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: p.duration,
        delay: p.delay,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // High-performance motion values for relative mouse cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Luxurious spring physics for smooth fluid deceleration
  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Elegant theme color palette (Faryal Fatima's premium design aesthetic)
    const colors = [
      '#B14EFF', // Electric Purple
      '#5D7CFF', // Neon Blue
      '#FF5CC8', // Hot Pink
      '#FFFFFF', // Pure Luminescent White
      '#38BDF8', // Cyan Aura
    ];

    const generated: Particle[] = Array.from({ length: 42 }).map((_, i) => {
      const size = Math.random() * 2.5 + 1.2; // Sizes between 1.2px and 3.7px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        id: i,
        x: Math.random() * 100, // Random percentage offset
        y: Math.random() * 100,
        size,
        color,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 12, // Slow, elegant astronomical drift
        parallaxFactor: (size / 3.7) * 45, // Larger (closer) particles move more than smaller (deeper) particles
        driftX: Math.random() * 40 - 20, // Individual random horizontal drifting speed
        driftY: Math.random() * -40 - 20, // Elegant rising trend
      };
    });

    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate normalized cursor coordinate from the center of the viewport component (-0.5 to 0.5)
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(relativeX);
      mouseY.set(relativeY);
    };

    const handleMouseLeave = () => {
      // Gently spring back to natural center position
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      id="hero-particle-background"
    >
      {particles.map((p) => (
        <ParticleItem 
          key={p.id} 
          p={p} 
          smoothX={smoothX} 
          smoothY={smoothY} 
        />
      ))}
    </div>
  );
}

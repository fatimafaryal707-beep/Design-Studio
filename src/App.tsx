import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

// Import custom sections and features
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Framer Motion scroll progress spring tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // High performance IntersectionObserver to track and highlight active sidebar sections during scrolling
  useEffect(() => {
    if (loading) return;

    const sections = ['home', 'services', 'portfolio', 'skills', 'experience', 'contact'];
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Trigger when at least 25% of the section is visible on viewports
          rootMargin: '-20% 0px -40% 0px',
          threshold: 0.15,
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, [loading]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Calculate absolute top position of the target element relative to the document
      let elementPosition = 0;
      let curElement: HTMLElement | null = targetElement;
      while (curElement) {
        elementPosition += curElement.offsetTop;
        curElement = curElement.offsetParent as HTMLElement | null;
      }
      
      const headerOffset = 85; // Fixed offset of sticky headers with comfortable spacing
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div id="portfolio-app" className="bg-brand-bg min-h-screen text-white font-sans selection:bg-brand-purple selection:text-white relative">
      
      {/* 1. Glassmorphism Scroll Progress Indicator Bar */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue z-50 origin-left"
        style={{ scaleX }}
      />

      {/* 2. Interactive Neon Custom Mouse Trail Aura */}
      <CustomCursor />

      {/* 3. Floating Interactive Sidebar Panel */}
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 4. Scrollable Container Offset for Left Persistent Sidebar on Desktop */}
      <div className="lg:ml-80 relative min-h-screen flex flex-col justify-between">
        
        {/* Aesthetic layout decorative line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none hidden lg:block" />

        {/* Top Header Navigation Bar */}
        <Header activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Dynamic Portfolio Content Blocks */}
        <main className="flex-1">
          {/* Section 1: Hero Welcome Frame */}
          <Hero onNavigate={handleNavigate} />

          {/* Interactive Marquee banner 1 */}
          <Marquee speed={25} reverse={false} />

          {/* Section 3: Premium Business Services */}
          <Services />

          {/* Section 4: Live Interactive Case Studies Grid */}
          <Portfolio />

          {/* Section 5: Dynamic Counter Metrics & Accolades */}
          <Stats />

          {/* Interactive Marquee banner 2 */}
          <Marquee 
            items={[
              'CONVERTING VISITORS INTO CUSTOMERS',
              'AWARD WINNING PORTFOLIO AESTHETICS',
              'SHOPIFY TEMPLATE ARCHITECTURE',
              'CONVERSION EXPERT SINCE 2022'
            ]} 
            speed={35} 
            reverse={true} 
          />

          {/* Section 6: Technical Skills Radar Card */}
          <Skills />

          {/* Section 6.5: Career Path Timeline */}
          <Experience />

          {/* Section 7: Auto sliding glowing Testimonials */}
          <Testimonials />

          {/* Section 8: Work scoping and Copy Email form */}
          <Contact />
        </main>

        {/* Global Footer (humble literal representation) */}
        <footer className="py-8 px-6 lg:px-12 border-t border-white/5 bg-brand-sidebar/30 text-center text-[11px] font-mono text-brand-text-secondary/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              DESIGNED & CODED BY FARYAL FATIMA © 2026
            </div>
            <div className="flex gap-4">
              <a href="#home" className="hover:text-white transition-colors">BACK TO TOP</a>
              <span>•</span>
              <a href="#services" className="hover:text-white transition-colors">SERVICES</a>
              <span>•</span>
              <a href="#portfolio" className="hover:text-white transition-colors">CASE STUDIES</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

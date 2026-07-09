import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';
import { 
  ArrowUpRight, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  TrendingUp, 
  X, 
  Layers, 
  ExternalLink, 
  Laptop, 
  Smartphone, 
  Zap, 
  ShoppingCart, 
  ChevronRight, 
  TrendingDown,
  Heart,
  Play,
  Pause
} from 'lucide-react';

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // States for unified autoplay single-project slider
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  // Logical filter groups to avoid clutter while retaining specific categories on card badges
  const filterGroups = ['All', 'Fashion', 'Kids', 'eCommerce & Lifestyle'];

  // Match active tab to the projects
  const filteredProjects = PROJECTS_DATA.filter(project => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Fashion') {
      return ['Fashion eCommerce', 'Women\'s Fashion', 'Fashion Brand'].includes(project.category);
    }
    if (selectedFilter === 'Kids') {
      return ['Kids Fashion Store', 'Kids eCommerce'].includes(project.category);
    }
    if (selectedFilter === 'eCommerce & Lifestyle') {
      return ['eCommerce Store', 'General eCommerce', 'Lifestyle Store', 'Shopify eCommerce'].includes(project.category);
    }
    return true;
  });

  // Reset active index when filter changes
  useEffect(() => {
    setActiveProjectIndex(0);
  }, [selectedFilter]);

  // Autoplay loop for single-project slider (runs on both mobile & desktop)
  useEffect(() => {
    if (filteredProjects.length <= 1 || isAutoplayPaused || activeProject) return;

    const timer = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [filteredProjects.length, isAutoplayPaused, activeProject]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, projectId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const getBadgeStyle = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('fashion') || cat.includes('women')) {
      return 'text-[#FF5CC8] bg-[#FF5CC8]/10 border-[#FF5CC8]/20';
    } else if (cat.includes('kids')) {
      return 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20';
    } else if (cat.includes('lifestyle')) {
      return 'text-[#FAD961] bg-[#FAD961]/10 border-[#FAD961]/20';
    } else {
      return 'text-[#00E394] bg-[#00E394]/10 border-[#00E394]/20';
    }
  };

  return (
    <section id="portfolio" className="relative py-24 px-6 lg:px-12 border-t border-white/5 bg-[#03030d]">
      {/* Immersive background decoration */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#9F5CFC]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#00E394]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div id="portfolio-section-header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="h-3 w-3 text-[#FF5CC8] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#FF5CC8] uppercase font-bold">
                FEATURED WORK
              </span>
            </div>
            <h2 id="portfolio-title" className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              Selected Projects
            </h2>
            <p id="portfolio-subheading" className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-medium">
              A collection of Shopify stores and eCommerce experiences designed and launched for growing brands since 2022.
            </p>
          </div>

          {/* Quick Filter Info Badge */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-slate-500 bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-3">
            <Zap className="h-4 w-4 text-[#00E394]" />
            <span>9 ACTIVE SHOCK-CONVERSION STORES</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div id="portfolio-filter-tabs" className="flex flex-wrap gap-2.5 mb-12 pb-5 border-b border-white/5">
          {filterGroups.map((filter) => (
            <button
              id={`filter-btn-${filter.toLowerCase().replace(/\s+/g, '-')}`}
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all duration-300 relative cursor-pointer ${
                selectedFilter === filter 
                  ? 'text-white' 
                  : 'text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/5 border border-white/5'
              }`}
            >
              {selectedFilter === filter && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9F5CFC]/20 to-[#FF5CC8]/20 border border-[#9F5CFC]/40 shadow-[0_0_15px_rgba(159,92,252,0.15)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {filter === 'All' && <Layers className="h-3.5 w-3.5" />}
                {filter === 'Fashion' && <Sparkles className="h-3.5 w-3.5 text-[#FF5CC8]" />}
                {filter === 'Kids' && <Heart className="h-3.5 w-3.5 text-[#3B82F6]" />}
                {filter === 'eCommerce & Lifestyle' && <ShoppingCart className="h-3.5 w-3.5 text-[#00E394]" />}
                {filter}
              </span>
            </button>
          ))}
        </div>

        {/* Unified Premium Single-Project Autoplay Showcase Slider (Responsive for both Desktop and Mobile) */}
        <div id="portfolio-project-showcase-slider" className="mb-20 px-1">
          {filteredProjects.length > 0 && (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredProjects[activeProjectIndex].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onMouseMove={(e) => handleMouseMove(e, filteredProjects[activeProjectIndex].id)}
                  onMouseEnter={() => {
                    setHoveredProjectId(filteredProjects[activeProjectIndex].id);
                    setIsAutoplayPaused(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredProjectId(null);
                    setIsAutoplayPaused(false);
                  }}
                  className="group relative w-full rounded-3xl bg-[#090916]/40 backdrop-blur-md border border-white/5 hover:border-[#9F5CFC]/30 p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden cursor-pointer"
                  id={`project-showcase-${filteredProjects[activeProjectIndex].id}`}
                >
                  {/* Mouse follow radial glow effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    style={{
                      background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(159, 92, 252, 0.12), transparent 50%)'
                    }}
                  />

                  <div className="z-10 relative flex flex-col gap-8">
                    {/* Visual Showcase (Widescreen Mockup / Preview) - Full Width */}
                    <div className="w-full space-y-4">
                      <div 
                        onClick={() => setActiveProject(filteredProjects[activeProjectIndex])}
                        className="relative aspect-[16/10] md:aspect-[16/7] w-full rounded-2xl bg-[#03030d] overflow-hidden border border-white/5 group-hover:border-[#9F5CFC]/20 transition-all duration-300 shadow-inner"
                      >
                        {/* Real-time Website Screenshot via thum.io */}
                        <img
                          src={filteredProjects[activeProjectIndex].imageUrl}
                          alt={filteredProjects[activeProjectIndex].title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />

                        {/* Glassmorphism Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 md:p-8 backdrop-blur-[1px]">
                          <div className="flex gap-4 max-w-md">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveProject(filteredProjects[activeProjectIndex]);
                              }}
                              className="flex-1 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-xs font-sans font-bold tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Eye className="h-4 w-4 text-[#FF5CC8]" />
                              Quick Case Study
                            </button>
                            <a 
                              href={filteredProjects[activeProjectIndex].liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#9F5CFC] to-[#FF5CC8] hover:shadow-[0_0_15px_rgba(159,92,252,0.4)] text-xs font-sans font-bold tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Globe className="h-4 w-4 text-white" />
                              Visit Store Live
                            </a>
                          </div>
                        </div>

                        {/* Floating Category Tag */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className={`inline-flex items-center rounded-lg border px-3.5 py-1 text-[10px] font-sans font-bold uppercase tracking-widest backdrop-blur-md shadow-md ${getBadgeStyle(filteredProjects[activeProjectIndex].category)}`}>
                            {filteredProjects[activeProjectIndex].category}
                          </span>
                        </div>

                        {/* Floating Autoplay/Live Indicator Badge */}
                        <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            {!isAutoplayPaused && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E394] opacity-75"></span>
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isAutoplayPaused ? 'bg-amber-400' : 'bg-[#00E394]'}`}></span>
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                            {isAutoplayPaused ? 'Paused' : 'Autoplay'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Presentation Showcase */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left w-full">
                      {/* Left Side: Title, Description, Tags */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-mono text-[#9F5CFC]">
                            <Sparkles className="h-4 w-4 text-[#FF5CC8]" />
                            <span className="uppercase tracking-widest font-bold">Featured Showcase Store</span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">
                            {filteredProjects[activeProjectIndex].title}
                          </h3>

                          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                            {filteredProjects[activeProjectIndex].description}
                          </p>
                        </div>

                        {/* Display tags underneath description */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {filteredProjects[activeProjectIndex].tags.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono font-medium text-slate-400 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Side: Performance, Highlights & Actions */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                        <div className="space-y-6">
                          {/* Interactive Performance Metrics */}
                          <div className="grid grid-cols-2 gap-3.5">
                            <div className="p-3.5 rounded-2xl bg-white/[0.01] border border-white/5 text-left hover:bg-white/[0.02] transition-colors">
                              <span className="text-[11px] text-slate-500 font-sans block uppercase font-semibold tracking-wider">Page Speed</span>
                              <span className="text-xl font-sans font-black text-white">&lt; 1.2s</span>
                              <span className="text-[10px] text-[#00E394] block mt-0.5">Liquid Optimized</span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-white/[0.01] border border-white/5 text-left hover:bg-white/[0.02] transition-colors">
                              <span className="text-[11px] text-slate-500 font-sans block uppercase font-semibold tracking-wider">Conversion Boost</span>
                              <span className="text-xl font-sans font-black text-[#00E394] flex items-center gap-1">
                                +45% <TrendingUp className="h-4 w-4" />
                              </span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">CRO Centered Layout</span>
                            </div>
                          </div>

                          {/* Core Deliverables List */}
                          <div className="space-y-2.5">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Store Highlights</span>
                            <ul className="space-y-2 text-xs text-slate-300">
                              <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="h-4 w-4 text-[#00E394] mt-0.5 flex-shrink-0" />
                                <span>Ultra-slick responsive design fully calibrated for mobile screens</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="h-4 w-4 text-[#00E394] mt-0.5 flex-shrink-0" />
                                <span>Hand-written Shopify liquid refinements replacing clunky apps</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                          <button
                            onClick={() => setActiveProject(filteredProjects[activeProjectIndex])}
                            className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-98 border border-white/10 text-xs font-sans font-extrabold tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase cursor-pointer"
                          >
                            <Eye className="h-4 w-4 text-[#FF5CC8]" />
                            <span>Case Study</span>
                          </button>
                          <a
                            href={filteredProjects[activeProjectIndex].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9F5CFC] to-[#FF5CC8] hover:shadow-[0_0_20px_rgba(159,92,252,0.4)] active:scale-98 text-xs font-sans font-extrabold tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase cursor-pointer"
                          >
                            <Globe className="h-4 w-4" />
                            <span>Visit Live</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls, Pagination Progress bar & Autoplay States */}
              <div className="flex items-center justify-between mt-8 px-2 max-w-4xl mx-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoplayPaused(true);
                    setActiveProjectIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
                  }}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-slate-400 active:scale-90 hover:bg-white/5 hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label="Previous Project"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </button>

                {/* Progress Indicators and Pause Controls */}
                <div className="flex items-center gap-6">
                  {/* Play/Pause state toggle */}
                  <button
                    onClick={() => setIsAutoplayPaused(prev => !prev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-mono"
                    title={isAutoplayPaused ? "Play Autoplay" : "Pause Autoplay"}
                  >
                    {isAutoplayPaused ? (
                      <>
                        <Play className="h-3 w-3 fill-slate-400 text-slate-400" />
                        <span>Paused</span>
                      </>
                    ) : (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E394] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E394]"></span>
                        </span>
                        <span>Playing</span>
                      </>
                    )}
                  </button>

                  {/* Dot Progress indicators */}
                  <div className="flex gap-2.5">
                    {filteredProjects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAutoplayPaused(true);
                          setActiveProjectIndex(idx);
                        }}
                        className={`h-2.5 transition-all duration-300 rounded-full ${
                          activeProjectIndex === idx 
                            ? 'w-8 bg-gradient-to-r from-[#9F5CFC] to-[#FF5CC8] shadow-[0_0_10px_rgba(159,92,252,0.4)]' 
                            : 'w-2.5 bg-white/15 hover:bg-white/30'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoplayPaused(true);
                    setActiveProjectIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
                  }}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-slate-400 active:scale-90 hover:bg-white/5 hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label="Next Project"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Premium Designer Showcase Section */}
        <div id="premium-designer-showcase" className="relative rounded-3xl bg-gradient-to-b from-[#0b0b24]/40 to-[#03030d] border border-white/5 p-8 md:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#FF5CC8]/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#9F5CFC]/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E394]/10 border border-[#00E394]/20">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00E394]" />
                <span className="text-[9px] font-mono tracking-widest text-[#00E394] uppercase font-bold">
                  DESIGN & OPTIMIZATION METHODOLOGY
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight leading-tight">
                Shopify storefront design optimized for authentic customer conversions
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Over 80% of eCommerce traffic is mobile. Instead of loading bulky templates with slow, third-party applications, I build highly lightweight storefront custom structures in native Liquid and clean code to keep load speed under 1.5 seconds.
              </p>

              {/* Three bento-style highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1.5">
                  <Smartphone className="h-5 w-5 text-[#3B82F6]" />
                  <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider">Mobile-First UI</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">Optimized responsive screens designed for smooth touch experiences and quick-add actions.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1.5">
                  <Zap className="h-5 w-5 text-[#FAD961]" />
                  <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider">Liquid Speed</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">Hand-crafted code modifications that dramatically eliminate third-party dependencies.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1.5">
                  <TrendingUp className="h-5 w-5 text-[#00E394]" />
                  <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider">CRO Centered</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">Structured purchase flows with elegant checkout drawers and clean navigation funnels.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden text-left space-y-4">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[#9F5CFC]/5 blur-2xl" />
                <h4 className="text-xs font-mono text-[#9F5CFC] tracking-widest uppercase font-bold">CLIENT SATISFACTION SCORE</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-sans font-black text-white">100%</span>
                  <span className="text-xs text-slate-400">Success Rate</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-[#9F5CFC] to-[#FF5CC8]" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Reflected across all Shopify store deployments and user interface audits completed since 2022.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left relative overflow-hidden space-y-4">
                <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-[#00E394]/5 blur-2xl" />
                <h4 className="text-xs font-mono text-[#00E394] tracking-widest uppercase font-bold">EXPERIENCE STATS</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-2xl font-sans font-bold text-white block">30+</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Stores Launched</span>
                  </div>
                  <div>
                    <span className="text-2xl font-sans font-bold text-white block">4+ Years</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">UX Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Case-Study Style Modal Popup */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090a18] border border-white/10 p-6 md:p-8 text-left shadow-[0_25px_60px_rgba(0,0,0,0.8)] scrollbar-thin"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all text-slate-400 hover:text-white cursor-pointer z-10"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
                {/* Visual Preview Side */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-[#03030d] group shadow-inner">
                    <img
                      src={activeProject.imageUrl}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-widest ${getBadgeStyle(activeProject.category)}`}>
                        {activeProject.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        ESTABLISHED WORK
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
                      {activeProject.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {activeProject.description}
                    </p>

                    <div className="border-t border-white/5 pt-4">
                      <h4 className="text-xs font-mono text-[#9F5CFC] tracking-widest uppercase font-bold mb-3">
                        DESIGNED METRICS AVERAGE
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 text-left">
                          <span className="text-xs text-slate-500 font-sans block">Load Speed</span>
                          <span className="text-lg font-sans font-black text-white">&lt; 1.2s</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 text-left">
                          <span className="text-xs text-slate-500 font-sans block">CRO Boost</span>
                          <span className="text-lg font-sans font-black text-[#00E394] flex items-center gap-1">
                            +45% <TrendingUp className="h-4 w-4 text-[#00E394]" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <h4 className="text-xs font-mono text-[#00E394] tracking-widest uppercase font-bold mb-3">
                        DELIVERABLES & FEATURES
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-400">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#00E394] flex-shrink-0" />
                          <span>Complete custom Shopify Liquid optimization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#00E394] flex-shrink-0" />
                          <span>Fully responsive, ultra-slick mobile architecture</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#00E394] flex-shrink-0" />
                          <span>SEO & Structured product schema integration</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9F5CFC] to-[#FF5CC8] hover:shadow-[0_0_20px_rgba(159,92,252,0.4)] text-xs font-sans font-extrabold tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase cursor-pointer"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Launch Store Live website</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

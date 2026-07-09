import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, ShoppingBag, Eye, Play, X, Video, Upload, FileVideo, Trash2, CheckCircle2 } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const DB_NAME = 'DesignStudioVideoDB';
const STORE_NAME = 'videos';
const KEY_NAME = 'intro_video';

function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function saveVideoToDB(blob: Blob): Promise<void> {
  return initDB().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(blob, KEY_NAME);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

function getVideoFromDB(): Promise<Blob | null> {
  return initDB().then((db) => {
    return new Promise<Blob | null>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(KEY_NAME);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  });
}

function deleteVideoFromDB(): Promise<void> {
  return initDB().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(KEY_NAME);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Floating particles mock for background
  const particles = Array.from({ length: 12 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const [localVideoBlobUrl, setLocalVideoBlobUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => current === msg ? null : current);
    }, 4000);
  };

  // Load saved video from IndexedDB on mount
  useEffect(() => {
    getVideoFromDB().then((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setLocalVideoBlobUrl(url);
      }
    }).catch(err => console.error("Error loading video from DB:", err));
  }, []);

  // Clean up object URL when component unmounts or blob URL changes
  useEffect(() => {
    return () => {
      if (localVideoBlobUrl) {
        URL.revokeObjectURL(localVideoBlobUrl);
      }
    };
  }, [localVideoBlobUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (localVideoBlobUrl) {
        URL.revokeObjectURL(localVideoBlobUrl);
      }
      const url = URL.createObjectURL(file);
      setLocalVideoBlobUrl(url);
      try {
        await saveVideoToDB(file);
        showToast("Video uploaded and saved to IndexedDB!");
      } catch (err) {
        console.error("Error saving video to DB:", err);
        showToast("Failed to save video locally.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      if (localVideoBlobUrl) {
        URL.revokeObjectURL(localVideoBlobUrl);
      }
      const url = URL.createObjectURL(file);
      setLocalVideoBlobUrl(url);
      try {
        await saveVideoToDB(file);
        showToast("Video dropped and saved to IndexedDB!");
      } catch (err) {
        console.error("Error saving video to DB:", err);
        showToast("Failed to save video locally.");
      }
    }
  };

  const handleRemoveVideo = async () => {
    if (localVideoBlobUrl) {
      URL.revokeObjectURL(localVideoBlobUrl);
      setLocalVideoBlobUrl(null);
    }
    try {
      await deleteVideoFromDB();
      showToast("Local video removed from database.");
    } catch (err) {
      console.error("Error deleting video from DB:", err);
      showToast("Failed to delete video from database.");
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden px-6 lg:px-12"
    >
      {/* Dynamic Background Blur Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-brand-purple/15 blur-[120px] animate-glow-1" />
        <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] rounded-full bg-brand-blue/15 blur-[130px] animate-glow-2" />
        <div className="absolute top-[40%] left-[10%] w-[250px] h-[250px] rounded-full bg-brand-pink/5 blur-[90px]" />
      </div>

      {/* Subtle Interactive Particle Background */}
      <ParticleBackground />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Text Content with Staggered Transitions */}
        <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
          
          {/* Headline chip */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-purple/20 bg-brand-purple/5 text-brand-purple text-xs font-mono tracking-widest uppercase"
          >
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Hello, I'm</span>
          </motion.div>

          {/* Large Title */}
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white leading-tight"
            >
              Faryal Fatima
            </motion.h1>

            {/* Glowing Profession subtitle */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-2xl md:text-4xl font-display font-medium text-gradient-purple-blue leading-snug"
            >
              Shopify Designer & Website Designer
            </motion.h3>
          </div>

          {/* Subheading Statement */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-xl text-white font-display font-medium leading-relaxed max-w-xl"
          >
            Designing Shopify Stores & Websites That Convert
          </motion.p>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0.7 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-sm md:text-md text-brand-text-secondary leading-relaxed max-w-lg"
          >
            I'm a Shopify Designer & Website Designer helping ambitious brands build premium, high-converting digital storefronts and immersive web platforms. Designing websites since 2022.
          </motion.p>

          {/* Action Buttons (with magnetic style hover effects) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center flex-wrap gap-4 pt-4"
          >
            {/* View Work Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('portfolio')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white font-display font-semibold text-sm shadow-neon-purple hover:shadow-neon-pink transition-all duration-300 flex items-center gap-2 cursor-pointer group"
            >
              <span>View My Work</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>

            {/* Watch Intro Button - Replaces Let's Talk */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-4 py-2 px-4 rounded-full text-white font-display font-semibold text-sm hover:text-white/90 transition-all duration-300 cursor-pointer bg-transparent"
            >
              {/* Circular Play button with glowing gradient border */}
              <div className="relative flex items-center justify-center h-12 w-12 rounded-full p-[1.5px] bg-gradient-to-r from-[#F45C6D] via-[#9F5CFC] to-[#3B82F6] shadow-lg shadow-brand-purple/20">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#080a13] hover:bg-[#121424] transition-colors">
                  <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                </div>
              </div>
              <span className="text-white text-base font-semibold tracking-wide hover:underline decoration-brand-purple/50 decoration-2 underline-offset-4">
                Watch Intro
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column: Premium Animated Abstract Visual (NO profiles, photo-free) */}
        <div className="lg:col-span-5 flex justify-center relative select-none order-1 lg:order-2">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
            className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] flex items-center justify-center"
          >
            {/* 1. Orbiting Cosmic Rings (Dash-borders with varied rotation) */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-dashed border-brand-purple/20"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            />
            <motion.div 
              className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-brand-blue/20"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            />
            <motion.div 
              className="absolute w-[70%] h-[70%] rounded-full border border-brand-pink/10"
              animate={{ rotate: 180 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
            />

            {/* 2. Abstract Geometric Orbit Shapes */}
            <motion.div 
              className="absolute h-6 w-6 rounded-lg bg-brand-pink/30 border border-brand-pink/50 backdrop-blur-md top-4 left-1/4"
              animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            />
            <motion.div 
              className="absolute h-8 w-8 rounded-full bg-brand-blue/20 border border-brand-blue/40 backdrop-blur-md bottom-8 right-12"
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            />

            {/* 3. Central Giant Glowing Gradient Orb */}
            <div className="absolute w-[160px] h-[160px] md:w-[220px] md:h-[220px] rounded-full bg-gradient-to-tr from-brand-purple via-brand-blue to-brand-pink opacity-80 blur-[2px] shadow-neon-purple animate-glow-1 flex items-center justify-center">
              {/* Inner dark core to preserve depth */}
              <div className="w-[94%] h-[94%] bg-[#080814]/90 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Embedded glass overlay grid */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:10px_10px]" />
                
                {/* Small internal pulsing glowing nucleus */}
                <motion.div 
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* 4. Glassmorphism Orbital Rings overlaying the orb */}
            <motion.div 
              className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full border-2 border-white/5 bg-white/2 backdrop-blur-[6px]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
              style={{ rotateX: 60, rotateY: 15 }}
            />

            {/* 5. Floating Particle Effects */}
            {particles.map((_, i) => {
              const delay = i * 0.4;
              const angle = (i / particles.length) * Math.PI * 2;
              const radius = 100 + Math.random() * 50;
              const initialX = Math.cos(angle) * radius;
              const initialY = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: i % 3 === 0 ? '#B14EFF' : i % 3 === 1 ? '#5D7CFF' : '#FF5CC8',
                    left: '50%',
                    top: '50%',
                    x: initialX,
                    y: initialY,
                  }}
                  animate={{
                    y: [initialY, initialY - 40, initialY],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1.4, 0.8]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4 + Math.random() * 3,
                    delay: delay,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}

            {/* 6. Floating Glass Stats Card ("3+ Years Experience") */}
            <motion.div
              initial={{ x: 30, y: 30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-4 left-2 md:left-6 px-5 py-4 rounded-xl border border-white/10 bg-brand-sidebar/80 backdrop-blur-lg shadow-neon-pink flex items-center gap-3.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/15 border border-brand-pink/20 shrink-0">
                <ShoppingBag className="h-5 w-5 text-brand-pink" />
              </div>
              <div>
                <div className="text-xl font-display font-bold text-white leading-none">3+ Years</div>
                <div className="text-[10px] text-brand-text-secondary font-mono uppercase tracking-widest mt-1">Experience</div>
              </div>
            </motion.div>

            {/* Secondary Floating Conversion Badge */}
            <motion.div
              initial={{ x: -30, y: -30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-8 right-2 md:right-6 px-4 py-3.5 rounded-xl border border-white/10 bg-brand-sidebar/80 backdrop-blur-lg shadow-neon-blue flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/15 border border-brand-blue/20 shrink-0">
                <Eye className="h-4. w-4. text-brand-blue" />
              </div>
              <div className="text-left">
                <div className="text-sm font-display font-bold text-white leading-none">Converting</div>
                <div className="text-[9px] text-brand-text-secondary font-mono uppercase tracking-widest mt-0.5">UX Framework</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Dynamic Video Intro Modal Popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#090b14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-brand-purple/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-white/5 bg-white/[0.02] gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-brand-purple/20 text-brand-purple">
                    <Video className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-bold text-white">Faryal Fatima - Video Intro & Shopify Showreel</h4>
                    <p className="text-[10px] text-brand-text-secondary">Explore conversion layouts & website optimization</p>
                  </div>
                </div>
                
                {/* Actions & Close */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {localVideoBlobUrl && (
                    <button
                      onClick={handleRemoveVideo}
                      className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/10 transition-all cursor-pointer flex items-center gap-1.5 font-medium"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove Video</span>
                    </button>
                  )}

                  <button 
                    onClick={() => setIsVideoOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Responsive Video Container 16:9 Aspect Ratio */}
              <div className="relative aspect-video w-full bg-[#030307]">
                {/* Local video player view */}
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
                  {localVideoBlobUrl ? (
                    <div className="relative w-full h-full group/video">
                      <video
                        src={localVideoBlobUrl}
                        controls
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-contain"
                      />
                      {/* Custom Floating Top Control Bar */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black/90 text-xs text-white border border-white/10 transition-colors shadow-lg backdrop-blur-md cursor-pointer"
                        >
                          <Upload className="h-3.5 w-3.5 text-brand-purple" />
                          <span>Replace Video File</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Exquisite Drag and Drop Uploader Area
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-[90%] max-w-xl aspect-[16/10] sm:aspect-[16/9] mx-auto rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
                        isDragging
                          ? 'border-brand-purple bg-brand-purple/10 scale-[1.02] shadow-neon-purple'
                          : 'border-white/10 bg-white/[0.01] hover:border-white/25 hover:bg-white/[0.02]'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="relative mb-4">
                        {/* Pulsing ring animation */}
                        <div className="absolute inset-0 rounded-full bg-brand-purple/20 blur-md scale-150 animate-pulse" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple">
                          <Upload className="h-6 w-6" />
                        </div>
                      </div>

                      <h5 className="text-sm font-sans font-bold text-white mb-1">
                        Drag & drop your intro video here
                      </h5>
                      <p className="text-xs text-brand-text-secondary max-w-xs mb-4">
                        Supports MP4, WebM, or any video format. Click to select from your device.
                      </p>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                        <FileVideo className="h-3.5 w-3.5 text-[#FF5CC8]" />
                        <span>Strictly Offline Client-side Playback</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-4 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row gap-2 sm:items-center justify-between text-xs text-slate-400">
                <span className="font-mono tracking-wide text-[10px] uppercase">
                  {localVideoBlobUrl 
                    ? '✓ PLAYING LOCAL VIDEO FILE (INDEXEDDB SAVED)' 
                    : '⚠ NO VIDEO FILE LOADED'
                  }
                </span>
                <span className="font-medium text-brand-pink">Ready to scale your business? Let's connect!</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification for local actions */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] p-4 rounded-2xl bg-[#080812]/95 border border-brand-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-md max-w-sm flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">Video Studio Update</h4>
              <p className="text-[11px] text-brand-text-secondary mt-0.5 leading-normal font-sans">
                {toastMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

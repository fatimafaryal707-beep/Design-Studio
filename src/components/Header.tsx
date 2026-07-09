import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bell, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [showToast, setShowToast] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Track scroll position to add glassmorphism background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
    onNavigate(item.id);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 px-6 lg:px-12 py-5 ${
          scrolled 
            ? 'bg-[#080814]/90 backdrop-blur-md border-b border-white/5 py-4' 
            : 'bg-[#080814]/40 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          
          {/* Mobile Hamburger Icon (Left Aligned on mobile) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-white/5 bg-white/5 text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Centered Navigation Links (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-10 mx-auto">
            {navItems.map((item) => {
              // Determine if active
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  className={`text-[15px] font-medium transition-all duration-300 relative py-1 cursor-pointer flex flex-col items-center group ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-brand-text-secondary hover:text-white'
                  }`}
                >
                  <span className="font-sans tracking-wide">{item.label}</span>
                  
                  {/* Underline pink active dot indicator like in the image */}
                  {isActive ? (
                    <motion.div
                      layoutId="headerActiveDot"
                      className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-brand-pink"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  ) : (
                    <span className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-brand-pink opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side CTA Button - Let's Talk with premium gradient and airplane icon */}
          <div className="flex items-center shrink-0">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 92, 200, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onNavigate('contact');
                setIsOpen(false);
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-pink via-brand-purple to-brand-blue text-white font-display font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-purple/20"
            >
              <span>Let's Talk</span>
              <Send className="h-4 w-4 transform -rotate-12" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Panel inside header container for clean stacking */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden w-full overflow-hidden mt-4 border border-white/5 bg-[#0c0c20]/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3"
            >
              <div className="flex flex-col gap-1.5">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsOpen(false);
                        // Brief layout-settle micro-delay so mobile navigation scrolling lands perfectly
                        setTimeout(() => {
                          handleItemClick(item);
                        }, 50);
                      }}
                      className={`text-left py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-purple/20 to-brand-pink/10 text-white font-semibold border-l-2 border-brand-pink'
                          : 'text-brand-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="font-sans tracking-wide">{item.label}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-pink shadow-[0_0_8px_#FF5CC8]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Blog coming soon Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-brand-sidebar/95 border border-brand-purple/20 shadow-2xl backdrop-blur-md max-w-sm flex items-center gap-3.5"
          >
            <div className="h-10 w-10 rounded-xl bg-brand-purple/15 border border-brand-purple/20 text-brand-purple flex items-center justify-center shrink-0">
              <Bell className="h-5 w-5 animate-bounce" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">Blog Coming Soon</h4>
              <p className="text-[11px] text-brand-text-secondary leading-normal mt-0.5">
                The design studio blog is currently being drafted and will launch in a few weeks!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

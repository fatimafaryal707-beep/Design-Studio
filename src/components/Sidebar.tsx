import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  Home, 
  Briefcase, 
  Layers, 
  CheckSquare, 
  History, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink,
  Menu,
  X,
  Sparkles,
  Instagram,
  Download,
  FileText
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we are on mobile screen
  useEffect(() => {
    const handleResize = () => {
      const mobileMode = window.innerWidth < 1024;
      setIsMobile(mobileMode);
      if (!mobileMode) setIsOpen(false); // Close mobile menu if resized to desktop
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: CheckSquare },
    { id: 'experience', label: 'Experience', icon: History },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleDownloadCV = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Draw left column background (Teal vertical block)
    // Dark rich teal: RGB(14, 74, 64) matches their brand color
    doc.setFillColor(14, 74, 64);
    doc.rect(0, 0, 72, 297, 'F');

    // Draw stylish White Circle with initials "DS" to represent her profile image
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1);
    doc.setFillColor(20, 110, 95); // slightly lighter teal inside circle
    doc.circle(36, 40, 20, 'FD'); // centered at X:36, Y:40, radius:20

    // Circle text initials
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text('DS', 36, 48, { align: 'center' });

    // Left Column Side Header 1: Contact
    doc.setFillColor(20, 110, 95);
    doc.roundedRect(8, 75, 56, 10, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Contact', 36, 81.5, { align: 'center' });

    // Contact details below Header 1
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('fatimafaryal707@gmail.com', 36, 94, { align: 'center' });
    doc.text('linkedin.com/in/faryalfatima11', 36, 100, { align: 'center' });
    doc.text('Saddar, Karachi', 36, 106, { align: 'center' });

    // Left Column Side Header 2: Education
    doc.setFillColor(20, 110, 95);
    doc.roundedRect(8, 118, 56, 10, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', 36, 124.5, { align: 'center' });

    // Education details below Header 2
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Guard Public College', 12, 137);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Science', 12, 142);
    doc.text('2019 - 2021', 12, 147);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Virtual University', 12, 157);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Degree In BBA (Present)', 12, 162);
    doc.text('2024 - 2025', 12, 167);

    // Left Column Side Header 3: Brand Info
    doc.setFillColor(20, 110, 95);
    doc.roundedRect(8, 178, 56, 10, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Studio', 36, 184.5, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Design Studio', 12, 197);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Owner & Lead Designer', 12, 202);


    // RIGHT COLUMN CONTENT:
    const rightMargin = 82;

    // Header Name in primary deep teal color
    doc.setTextColor(14, 74, 64);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.text('Faryal Fatima', rightMargin, 35);

    // Job Title below name
    doc.setTextColor(44, 62, 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(15);
    doc.text('Shopify & Website Designer', rightMargin, 45);

    // Decorative Separator Line
    doc.setDrawColor(14, 74, 64);
    doc.setLineWidth(0.6);
    doc.line(rightMargin, 49, 195, 49);

    // Summary section matching her exact introduction copy
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const summaryText = "I'm a Shopify & Website Designer helping ambitious brands build premium, high-converting digital storefronts and immersive web platforms since 2022.";
    const splitSummary = doc.splitTextToSize(summaryText, 113);
    doc.text(splitSummary, rightMargin, 57);


    // Section 1: Work Experience Right Header Banner
    doc.setFillColor(14, 74, 64);
    doc.roundedRect(rightMargin, 75, 113, 10, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Work Experience', rightMargin + 5, 81.5);

    // Work Experience Items List
    let expY = 94;

    // Item 1: Freelancing / Design Studio
    doc.setTextColor(14, 74, 64);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('Design Studio / Freelance  (2022 - Present)', rightMargin, expY);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'oblique');
    doc.setFontSize(9.5);
    doc.text('Lead Shopify & Website Designer', rightMargin, expY + 5);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('• Designing custom, high-converting Shopify storefronts with Liquid code.', rightMargin + 4, expY + 10);
    doc.text('• Crafting pixel-perfect landing pages and full eCommerce layout redesigns.', rightMargin + 4, expY + 15);

    // Item 2: Self-Employed Website Designing
    expY += 23;
    doc.setTextColor(14, 74, 64);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('Independent Website Designing  (2022 - 2023)', rightMargin, expY);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'oblique');
    doc.setFontSize(9.5);
    doc.text('Website Designer', rightMargin, expY + 5);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('• Learned Shopify Liquid and built conversion-rate-optimized (CRO) themes.', rightMargin + 4, expY + 10);
    doc.text('• Collaborated with global clients to launch high-performance sites.', rightMargin + 4, expY + 15);


    // Section 2: Skills Header Banner
    const skillY = 158;
    doc.setFillColor(14, 74, 64);
    doc.roundedRect(rightMargin, skillY, 113, 10, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Skills', rightMargin + 5, skillY + 6.5);

    // Skills indicators matching the visual design of original CV
    const skills = [
      { name: 'Shopify Store Design', score: 10 },
      { name: 'Website Design & UX', score: 9 },
      { name: 'Conversion Rate Opt', score: 9 },
      { name: 'Custom Liquid Code', score: 8 },
      { name: 'Figma Design Systems', score: 9 }
    ];

    let skY = skillY + 18;
    skills.forEach((skill) => {
      doc.setTextColor(44, 62, 80);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(skill.name, rightMargin, skY);

      // Draw horizontal track bar
      const barX = rightMargin + 52;
      doc.setFillColor(235, 240, 238); // light gray track
      doc.roundedRect(barX, skY - 3, 45, 3.5, 1.5, 1.5, 'F');

      // Draw filled indicator matching rating
      doc.setFillColor(14, 74, 64); // brand teal fill
      const fillWidth = (skill.score / 10) * 45;
      doc.roundedRect(barX, skY - 3, fillWidth, 3.5, 1.5, 1.5, 'F');

      skY += 8.5;
    });

    // Save final PDF to device
    doc.save('Faryal_Fatima_CV.pdf');
  };

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full p-6 text-white font-sans justify-between">
      {/* Top Brand Logo Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue border border-white/10 shadow-neon-purple shrink-0 cursor-pointer"
            onClick={() => handleItemClick('home')}
          >
            <span className="text-xl font-display font-bold tracking-tighter text-white">DS</span>
          </motion.div>
          <div>
            <h1 className="text-md font-display font-semibold tracking-wide text-white leading-tight">
              Design Studio
            </h1>
            <p className="text-xs text-brand-text-secondary font-mono tracking-wider uppercase scale-90 origin-left">
              Faryal Fatima
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative group text-left ${
                  isActive 
                    ? 'text-white' 
                    : 'text-brand-text-secondary hover:text-white'
                }`}
              >
                {/* Active Highlight Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-purple/15 to-brand-blue/10 border-l-2 border-brand-purple"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Subtle Hover border accent */}
                <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1 h-1 rounded-full bg-brand-pink" />
                </div>

                <Icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-brand-purple' : 'text-brand-text-secondary group-hover:text-white'
                }`} />
                <span className="font-display tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Features (Freelance Availability & Socials) */}
      <div className="mt-8 space-y-6">
        {/* Availability Badge Card */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="p-5 rounded-2xl border border-white/5 bg-[#0d1021]/80 relative overflow-hidden shadow-xl"
        >
          {/* Animated Green Status Pulse */}
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E394]/75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E394]"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#00E394] uppercase font-extrabold">
              Available for Freelance
            </span>
          </div>

          <p className="text-xs text-brand-text-secondary leading-relaxed mb-4">
            Available for Shopify storefront setups & high-conversion designs.
          </p>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://www.linkedin.com/in/faryalfatima11"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9F5CFC] to-[#5F78FF] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-neon-purple transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Hire Me</span>
          </motion.a>
        </motion.div>

        {/* Download CV Section Card */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-white/5 bg-[#0d1021]/60 text-left shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-extrabold">
              Download CV
            </span>
            <button 
              onClick={handleDownloadCV} 
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Download PDF"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleDownloadCV}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-xl bg-[#080a13] border border-white/5 hover:bg-[#121424] transition-all duration-300 text-left group/cv cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-[#1a1235] text-[#8b5cf6] group-hover/cv:bg-[#211545] group-hover/cv:text-[#a855f7] transition-all duration-300">
              <FileText className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-300 group-hover/cv:text-white transition-colors font-medium truncate">
                Faryal_Fatima_CV.pdf
              </p>
            </div>
          </button>
        </motion.div>

        {/* Social Icons Link Grid */}
        <div className="border-t border-white/5 pt-5">
          <div className="flex items-center justify-center gap-4 text-brand-text-secondary">
            <motion.a
              whileHover={{ y: -3, color: '#B14EFF' }}
              href="https://linkedin.com/in/faryalfatima11"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#13182D]/50 border border-white/5 hover:border-white/10 hover:bg-[#1C2342]/80 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, color: '#FF5CC8' }}
              href="https://www.behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#13182D]/50 border border-white/5 hover:border-white/10 hover:bg-[#1C2342]/80 transition-all"
              title="Behance"
            >
              <ExternalLink className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, color: '#5D7CFF' }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#13182D]/50 border border-white/5 hover:border-white/10 hover:bg-[#1C2342]/80 transition-all"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, color: '#E1306C' }}
              href="https://www.instagram.com/designstudio.vsls/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#13182D]/50 border border-white/5 hover:border-white/10 hover:bg-[#1C2342]/80 transition-all"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </motion.a>
          </div>
          <p className="text-center text-[10px] text-brand-text-secondary/30 mt-4 font-mono">
            © 2026 Fatima. Built beautifully.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Header Toggle Bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-brand-sidebar/80 backdrop-blur-md border-b border-white/5 z-30 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center border border-white/10 shadow-neon-purple">
              <span className="text-sm font-display font-bold text-white">DS</span>
            </div>
            <span className="text-sm font-display font-semibold text-white tracking-wide">Design Studio</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-brand-text-secondary hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      {!isMobile && (
        <aside className="fixed left-0 top-0 bottom-0 w-80 glass-sidebar z-20">
          {sidebarContent}
        </aside>
      )}

      {/* Mobile Responsive Overlay Drawer */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <>
            {/* Backdrop opacity scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30"
            />
            
            {/* Slide-in drawer panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-80 bg-brand-sidebar z-40 border-r border-white/10 overflow-y-auto"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

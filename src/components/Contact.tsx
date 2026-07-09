import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Copy, Check, Send, Sparkles, AlertCircle, Instagram, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5,000 - $10,000',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const emailAddress = 'fatimafaryal707@gmail.com';
  const linkedinUrl = 'https://linkedin.com/in/faryalfatima11';

  const budgets = [
    'Under $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $20,000',
    '$20,000+'
  ];

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailAddress);
        setCopied(true);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (err) {
      // Robust fallback using textarea selection for copy
      const textArea = document.createElement('textarea');
      textArea.value = emailAddress;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
        } else {
          console.error('execCommand copy was unsuccessful');
        }
      } catch (copyErr) {
        console.error('Fallback copy failed', copyErr);
      }
      document.body.removeChild(textArea);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all fields before sending.');
      return;
    }
    setErrorMsg('');
    setIsSending(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Budget: formData.budget,
          Message: formData.message,
          _subject: `Shopify Design Studio Inquiry from ${formData.name}`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again or copy the email directly.');
      }

      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        budget: '$5,000 - $10,000',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please copy the email directly.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 lg:px-12 border-t border-white/5">
      {/* Background neon soft focus lighting */}
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-brand-purple/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0b0b1a] border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl relative"
        >
          {/* Column 1: Gradient Block (Left) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#E1306C] via-[#B14EFF] to-[#4068FF] p-8 md:p-12 flex flex-col justify-center items-center text-center lg:text-left lg:items-start text-white relative overflow-hidden min-h-[350px] lg:min-h-full">
            {/* Soft decorative light overlay */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />

            {/* Paper Airplane Circle */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 mb-8 shadow-inner">
              <Send className="h-6 w-6 text-white transform -rotate-12" />
            </div>

            {/* Title */}
            <h2 className="relative z-10 text-3xl md:text-4xl font-display font-bold leading-tight mb-4">
              Let's Work<br />Together!
            </h2>

            {/* Subtext */}
            <p className="relative z-10 text-white/95 text-xs md:text-sm font-light leading-relaxed max-w-xs">
              Have a project in mind?<br />Let's create something great.
            </p>
          </div>

          {/* Column 2: Interactive Form (Center) */}
          <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center border-y lg:border-y-0 lg:border-r border-white/5 bg-[#090915]">
            <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
              
              {/* Name & Email in one row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#111126] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-text-secondary/40 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/30 transition-all font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#111126] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-text-secondary/40 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/30 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1 relative">
                <textarea
                  rows={4}
                  required
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#111126] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-text-secondary/40 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/30 transition-all font-sans h-36 resize-none"
                />
              </div>

              {/* Submit feedback */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2 font-bold font-display">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>Message Sent Successfully!</span>
                    </div>
                    <span className="text-[11px] text-brand-text-secondary">Thank you. Fatima will review your request and reply shortly.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button Aligned to Bottom Right */}
              <div className="flex justify-end pt-1">
                <motion.button
                  whileHover={isSending ? {} : { scale: 1.02 }}
                  whileTap={isSending ? {} : { scale: 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className={`py-3 px-6 rounded-xl bg-gradient-to-r from-brand-pink via-brand-purple to-brand-blue text-white font-display font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isSending ? 'opacity-70 cursor-not-allowed' : 'shadow-neon-purple hover:shadow-neon-pink'
                  }`}
                >
                  {isSending ? (
                    <>
                      <span>Sending...</span>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Column 3: Contact Info (Right) */}
          <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-center space-y-6 bg-[#080812]">
            
            {/* Email info row */}
            <div className="flex items-center gap-4 group text-left">
              <button 
                onClick={handleCopyEmail}
                className="h-11 w-11 rounded-full border border-white/10 flex items-center justify-center text-brand-text-secondary hover:text-white hover:border-white/20 transition-all shrink-0 cursor-pointer relative"
                title="Copy Email Address"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Mail className="h-4 w-4" />}
              </button>
              <div className="text-left min-w-0">
                <span className="text-[10px] text-brand-text-secondary/50 font-mono uppercase tracking-widest block">Email</span>
                <span className="text-white text-xs sm:text-sm font-medium font-mono block truncate" title={emailAddress}>
                  {emailAddress}
                </span>
              </div>
            </div>

            {/* Instagram / Social info row */}
            <a 
              href="https://www.instagram.com/designstudio.vsls/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group cursor-pointer text-left"
            >
              <div className="h-11 w-11 rounded-full border border-white/10 flex items-center justify-center text-brand-text-secondary group-hover:text-[#E1306C] group-hover:border-[#E1306C]/30 transition-all shrink-0">
                <Instagram className="h-4 w-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] text-brand-text-secondary/50 font-mono uppercase tracking-widest block">Instagram</span>
                <span className="text-white text-xs sm:text-sm font-medium font-mono block truncate group-hover:underline">
                  @designstudio.vsls
                </span>
              </div>
            </a>

            {/* LinkedIn info row */}
            <a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group cursor-pointer text-left"
            >
              <div className="h-11 w-11 rounded-full border border-white/10 flex items-center justify-center text-brand-text-secondary group-hover:text-[#0077B5] group-hover:border-[#0077B5]/30 transition-all shrink-0">
                <Linkedin className="h-4 w-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] text-brand-text-secondary/50 font-mono uppercase tracking-widest block">LinkedIn</span>
                <span className="text-white text-xs sm:text-sm font-medium font-mono block truncate group-hover:underline">
                  faryalfatima11
                </span>
              </div>
            </a>



          </div>
        </motion.div>
      </div>
    </section>
  );
}

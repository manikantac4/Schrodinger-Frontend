import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'हि', label: 'हिन्दी' },
  { code: 'தமிழ்', label: 'தமிழ்' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'FR', label: 'Français' },
  { code: 'JP', label: '日本語' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen]               = useState(false);
  const [activeLang, setActiveLang]           = useState(LANGUAGES[0]);
  const [hoveredLink, setHoveredLink]         = useState(null);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = ['Product', 'Features', 'Pricing', 'Resources'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* ── Logo ── */}
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm" />
          </div>
          <span className="text-white font-bold tracking-widest text-sm uppercase">
            Sentinel
          </span>
        </motion.div>

        {/* ── Desktop Nav Links ── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-4 py-2 text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors duration-200 rounded-lg group"
            >
              {/* hover bg pill */}
              <motion.span
                className="absolute inset-0 rounded-lg bg-white/5"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: hoveredLink === link ? 1 : 0, scale: hoveredLink === link ? 1 : 0.92 }}
                transition={{ duration: 0.18 }}
              />
              <span className="relative z-10">{link}</span>
            </a>
          ))}
        </div>

        {/* ── Desktop Right: Lang + Access + Portal ── */}
        <div className="hidden md:flex items-center gap-1">

          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((p) => !p)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
            >
              <Globe size={14} className="opacity-70" />
              <span>{activeLang.code}</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 opacity-60 ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-40 py-1.5 rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(12,12,12,0.97)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.7)',
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setActiveLang(lang); setLangOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 ${
                        activeLang.code === lang.code
                          ? 'text-white bg-white/6'
                          : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {activeLang.code === lang.code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Thin divider */}
          <div className="w-px h-4 bg-white/10 mx-1.5" />

          {/* Access Portal (Log in) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 text-sm font-medium text-[#a1a1aa] hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
          >
            Access Portal
          </motion.button>

          {/* Get Started (Sign up) */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(255,255,255,0.12)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            className="ml-1 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-100 transition-colors duration-200"
          >
            Get Started
          </motion.button>
        </div>

        {/* ── Mobile toggle ── */}
        <motion.button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileMenuOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-white/8"
            style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                  className="text-[#a1a1aa] hover:text-white text-base font-medium px-3 py-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}

              <div className="h-px bg-white/8 my-3" />

              {/* Mobile lang row */}
              <div className="flex flex-wrap gap-2 px-3 mb-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setActiveLang(lang)}
                    className={`text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all duration-150 ${
                      activeLang.code === lang.code
                        ? 'bg-white/10 text-white'
                        : 'text-[#71717a] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="text-left px-3 py-3 text-white text-base font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                Access Portal
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                className="bg-white text-black px-5 py-3 rounded-full text-base font-semibold text-center mt-1 hover:bg-zinc-100 transition-colors"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
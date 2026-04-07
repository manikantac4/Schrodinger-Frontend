/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Newspaper,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  ShoppingBag,
  Truck,
  Link as LinkIcon,
  DollarSign,
  Settings,
  Loader2
} from 'lucide-react';
import API from '../services/service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// ─── Helpers ──────────────────────────────────────────────────────────────────

function newsImpact(category = '') {
  const neg = ['NaturalDisaster', 'SupplyChain', 'Geopolitical', 'Financial'];
  return neg.includes(category) ? 'negative' : 'positive';
}

function stratIcon(category = '') {
  const c = category.toLowerCase();
  if (c.includes('price')) return DollarSign;
  if (c.includes('product')) return ShoppingBag;
  if (c.includes('logistics') || c.includes('transport')) return Truck;
  if (c.includes('material') || c.includes('supply')) return LinkIcon;
  if (c.includes('operations') || c.includes('workforce') || c.includes('financial')) return Settings;
  return Sparkles;
}

function flattenOptimized(optimized = {}) {
  const out = [];
  const push = (arr = [], cat) =>
    arr.forEach(s => out.push({ ...s, _category: cat }));
  push(optimized.priceStrategy,               'Price');
  push(optimized.productStrategy,             'Product');
  push(optimized.logisticsStrategy,           'Logistics');
  push(optimized.rawMaterialStrategy,         'Materials');
  push(optimized.generalStrategicSuggestions, 'General');
  return out;
}

function buildImpacts(analysis = {}, events = {}) {
  const items = [];

  if (analysis.riskLevel) {
    items.push({
      id: 'risk',
      title: `Overall Risk: ${analysis.riskLevel}`,
      explanation: `Your business has been assessed as ${analysis.riskLevel} risk based on current market events and supply chain exposure.`,
      severity: analysis.riskLevel,
      icon: AlertTriangle,
      accent: analysis.riskLevel === 'High' ? '#FF6B35' : analysis.riskLevel === 'Medium' ? '#F5C842' : '#6EE7B7',
      label: 'Risk Level'
    });
  }

  (events.weather || []).forEach((w, i) => {
    items.push({
      id: `weather-${i}`,
      title: `${w.event.charAt(0).toUpperCase() + w.event.slice(1)} in ${w.location}`,
      explanation: `A ${w.severity}-severity ${w.event} is forecasted to affect ${w.affectedArea} from ${new Date(w.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} to ${new Date(w.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}.`,
      severity: w.severity === 'high' ? 'High' : 'Medium',
      icon: TrendingUp,
      accent: w.severity === 'high' ? '#FF6B35' : '#F5C842',
      label: 'Weather Alert'
    });
  });

  (analysis.generalStrategicSuggestions || [])
    .filter(s => ['Workforce', 'Financial'].includes(s.category))
    .forEach((s, i) => {
      items.push({
        id: `gen-${i}`,
        title: s.category === 'Workforce' ? 'Staff Impact' : 'Financial Pressure',
        explanation: s.action,
        severity: s.impact >= 7 ? 'High' : 'Medium',
        icon: Users,
        accent: '#FF9F43',
        label: s.category
      });
    });

  return items;
}

// ─── Components ───────────────────────────────────────────────────────────────

const LoadingScreen = () => {
  const [textIdx, setTextIdx] = useState(0);
  const texts = ["Initializing Intelligence...", "Analyzing Global Signals...", "Generating Insights..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIdx(i => (i + 1) % texts.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080A0C]"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-t-4 border-b-4 border-[#FF6B35] shadow-[0_0_30px_rgba(255,107,53,0.5)]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#F5C842] blur-xl"
        />
      </div>
      <div className="mt-12 h-6 overflow-hidden relative w-64 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={textIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-[#F5C842] font-mono text-xs tracking-[0.2em] uppercase absolute w-full"
          >
            {texts[textIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Navbar = ({ user, initials }) => (
  <nav className="fixed top-0 left-0 right-0 h-16 bg-[#080A0C]/80 backdrop-blur-md border-b border-white/10 z-40 px-6 flex items-center justify-between">
    {/* Left page border accent */}
    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#FF6B35] via-[#F5C842] to-transparent" />
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-gradient-to-br from-[#FF6B35] to-[#F5C842] flex items-center justify-center font-bold text-black">
        S
      </div>
      <span className="font-bold tracking-widest text-white font-serif">SENTINEL</span>
    </div>
    <div className="text-white/50 font-mono text-xs hidden md:block tracking-[0.2em]">
      INTELLIGENCE DASHBOARD
    </div>
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="text-right hidden sm:block">
        <div className="text-sm font-semibold text-white/90">{user?.name || 'User'}</div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest group-hover:text-[#F5C842] transition-colors">View Profile</div>
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#F5C842] flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(255,107,53,0.3)]">
        {initials || 'U'}
      </div>
      <ChevronDown size={14} className="text-white/40" />
    </div>
  </nav>
);

const StatCard = ({ label, value, index }) => {
  const isOrange = index % 2 === 0;
  const shadowColor = isOrange ? 'rgba(255,107,53,0.25)' : 'rgba(245,200,66,0.25)';
  const accentColor = isOrange ? '#FF6B35' : '#F5C842';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative flex flex-col gap-1 px-5 py-5 rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
      style={{ boxShadow: `0 8px 24px -8px ${shadowColor}` }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: accentColor }} />
      <span className="text-[10px] font-semibold tracking-widest uppercase text-white/40 font-mono">{label}</span>
      <span className="text-2xl font-bold text-white font-serif">{value}</span>
    </motion.div>
  );
};

// ─── News Ticker (improved) ────────────────────────────────────────────────────

const NewsTicker = ({ newsItems }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  if (!newsItems || newsItems.length === 0) return null;

  const doubled = [...newsItems, ...newsItems];

  return (
    <section className="mb-12">
      {/* Section label */}
      <div className="flex items-center gap-2 mb-4">
        <Newspaper size={14} className="text-[#F5C842]" />
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F5C842] font-mono">Live News Feed</span>
        <div className="flex-1 h-px bg-gradient-to-r from-[#F5C842]/30 to-transparent ml-2" />
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Hover to pause</span>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        style={{ padding: '16px 0' }}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #080A0C, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #080A0C, transparent)' }} />

        {/* Live dot */}
        <div className="absolute top-3 right-6 z-20 flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"
          />
          <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Live</span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 14,
            animation: isPaused ? 'none' : 'tickerScroll 35s linear infinite',
            width: 'max-content',
            padding: '4px 14px',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { setIsPaused(false); setHoveredId(null); }}
        >
          {doubled.map((item, idx) => {
            const impact = newsImpact(item.category);
            const uid = `${item._id || idx}-${idx}`;
            const isHov = hoveredId === uid;

            return (
              <div
                key={uid}
                onMouseEnter={() => setHoveredId(uid)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  flexShrink: 0,
                  width: window.innerWidth < 640 ? 220 : 270,
                  borderRadius: 20,
                  padding: '18px 20px',
                  background: isHov ? 'rgba(255,255,255,0.058)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHov ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.07)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  transform: isHov ? 'translateY(-4px)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isHov ? '0 8px 32px rgba(0,0,0,0.25)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '3px 9px', borderRadius: 99,
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)', fontFamily: '"DM Mono", monospace'
                  }}>{item.category || 'News'}</span>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: impact === 'positive' ? 'rgba(245,200,66,0.12)' : 'rgba(255,107,53,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {impact === 'positive'
                      ? <ArrowUpRight size={13} style={{ color: '#F5C842' }} />
                      : <ArrowDownRight size={13} style={{ color: '#FF6B35' }} />}
                  </div>
                </div>
                <p style={{
                  margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.88)',
                  fontFamily: '"Playfair Display", serif',
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>{item.title || item.headline}</p>
                {item.source && (
                  <span style={{
                    display: 'block', marginTop: 10, fontSize: 9, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                    fontFamily: '"DM Mono", monospace'
                  }}>
                    {item.source}
                  </span>
                )}
                {/* Bottom shimmer bar */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: impact === 'positive'
                    ? 'linear-gradient(90deg, transparent, rgba(245,200,66,0.45), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,107,53,0.45), transparent)'
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ImpactWheel = ({ impacts }) => {
  if (!impacts || impacts.length === 0) return <p className="text-white/40 text-center py-12">No impact data available.</p>;

  return (
    <div className="relative w-full max-w-[90vw] md:max-w-[700px] aspect-square mx-auto flex items-center justify-center py-12">
      <motion.div
        className="absolute z-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#F5C842] flex items-center justify-center shadow-[0_0_40px_rgba(255,107,53,0.4)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-28 h-28 rounded-full bg-[#080A0C] flex flex-col items-center justify-center border border-white/10">
          <AlertTriangle size={24} className="text-[#FF6B35] mb-1" />
          <span className="font-bold text-white text-center leading-tight text-sm font-serif">Risk<br />Core</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {impacts.map((impact, i) => {
          const getAngle = (i, total) => {
  // 4 → square (0,90,180,270)
  if (total === 4) return i * 90;

  // 5 → star (skip pattern for star effect)
  if (total === 5) return (i * 144) % 360;

  // 6 → hexagon (60° each)
  if (total === 6) return i * 60;

  // default → circle
  return (i / total) * 360;
};
          const Icon = impact.icon;
          const angle = getAngle(i, impacts.length) - 90;
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-[80%] md:w-[60%] origin-left flex items-center justify-end pr-8"
              style={{ transform: `translateY(-50%) rotate(${angle}deg)` }}
            >
             <div
  className="absolute left-10 w-[calc(100%-2.5rem)] h-[2px]"
  style={{
    background: `linear-gradient(to right, ${impact.accent}, transparent)`,
    boxShadow: `0 0 8px ${impact.accent}80`
  }}
/>
              <motion.div
                className="relative z-30 w-40 md:w-56 p-4 rounded-2xl bg-[#080A0C] border border-white/10 shadow-xl group"
                style={{ transform: `rotate(-${angle}deg)` }}
                whileHover={{ scale: 1.05, borderColor: impact.accent }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${impact.accent}15 0%, transparent 70%)` }} />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${impact.accent}20` }}>
                    <Icon size={16} style={{ color: impact.accent }} />
                  </div>
                  <span className="text-xs font-bold text-white/90 truncate font-serif">{impact.title}</span>
                </div>
                <p className="text-[10px] text-white/50 line-clamp-3 leading-relaxed">{impact.explanation}</p>
                <div className="mt-2 text-[8px] font-mono uppercase tracking-widest" style={{ color: impact.accent }}>
                  {impact.label}
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const SuggestionCard = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.01 }}
    className="flex items-start gap-5 rounded-3xl p-6 relative overflow-hidden group bg-white/5 border border-white/10"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
      style={{ background: 'radial-gradient(ellipse at top right, rgba(245,200,66,0.04), transparent 70%)' }} />
    <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-[#F5C842]/10 border border-[#F5C842]/20">
      <Sparkles size={16} className="text-[#F5C842]" />
    </div>
    <div className="relative z-10 flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F5C842]/15 to-[#FF6B35]/15 border border-[#F5C842]/20 text-[#F5C842] font-mono">
          AI · {item._category || item.tag}
        </span>
        {item.material && (
          <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 text-[#6EE7B7] font-mono">
            {item.material}
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-white/70">{item.action || item.advice}</p>
    </div>
  </motion.div>
);

const OptimizedCard = ({ item }) => {
  const Icon = stratIcon(item._category || '');
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className="flex items-start gap-5 rounded-3xl p-6 relative overflow-hidden group bg-[#6EE7B7]/5 border border-[#6EE7B7]/20"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(110,231,183,0.07), transparent 70%)' }} />
      <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#6EE7B7]/70 to-transparent" />
      <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-[#6EE7B7]/10 border border-[#6EE7B7]/30">
        <Icon size={16} className="text-[#6EE7B7]" />
      </div>
      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] font-mono">
            Optimised · {item._category}
          </span>
          {item.material && (
            <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 text-[#6EE7B7] font-mono">
              {item.material}
            </span>
          )}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] font-mono">
              Cost {item.cost}/10
            </span>
            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 text-[#6EE7B7] font-mono">
              Impact {item.impact}/10
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-white/80">{item.action}</p>
        {item.logic && (
          <p className="mt-3 text-xs leading-relaxed text-[#6EE7B7]/60 italic border-l-2 border-[#6EE7B7]/30 pl-3">
            {item.logic}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ─── Page Border Frame ─────────────────────────────────────────────────────────

const PageBorderFrame = () => (
  <>
    {/* Left border */}
    <div className="fixed left-0 top-0 bottom-0 w-[3px] z-30 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #FF6B35, #F5C842 40%, rgba(110,231,183,0.4) 80%, transparent)' }} />
    {/* Right border */}
    <div className="fixed right-0 top-0 bottom-0 w-[3px] z-30 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,200,66,0.3) 40%, #FF6B35 80%, transparent)' }} />
    {/* Top border */}
    <div className="fixed top-0 left-0 right-0 h-[3px] z-30 pointer-events-none"
      style={{ background: 'linear-gradient(to right, #FF6B35, #F5C842, #FF6B35)' }} />
    {/* Bottom border */}
    <div className="fixed bottom-0 left-0 right-0 h-[3px] z-30 pointer-events-none"
      style={{ background: 'linear-gradient(to right, transparent, #FF6B35 30%, #F5C842 70%, transparent)' }} />
    {/* Corner accents */}
    <div className="fixed top-0 left-0 w-6 h-6 z-30 pointer-events-none border-t-2 border-l-2 border-[#FF6B35] rounded-tl-sm" />
    <div className="fixed top-0 right-0 w-6 h-6 z-30 pointer-events-none border-t-2 border-r-2 border-[#F5C842] rounded-tr-sm" />
    <div className="fixed bottom-0 left-0 w-6 h-6 z-30 pointer-events-none border-b-2 border-l-2 border-[#F5C842] rounded-bl-sm" />
    <div className="fixed bottom-0 right-0 w-6 h-6 z-30 pointer-events-none border-b-2 border-r-2 border-[#FF6B35] rounded-br-sm" />
  </>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ bizName }) => (
  <footer
    className="w-full border-t border-white/10 px-6 py-4 mt-12"
    style={{ background: 'rgba(8,10,12,0.8)', backdropFilter: 'blur(10px)' }}
  >
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
      
      {/* Left */}
      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
        © {new Date().getFullYear()} Sentinel
      </span>

      {/* Center */}
      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
        {bizName}
      </span>

      {/* Right */}
      <div className="flex items-center gap-3">
        {['Privacy', 'Terms'].map(item => (
          <a
            key={item}
            href="#"
            className="text-[10px] font-mono text-white/30 hover:text-[#F5C842] transition-colors uppercase tracking-widest"
          >
            {item}
          </a>
        ))}
      </div>

    </div>
  </footer>
);

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('impacts');
  const [showOptimized, setShowOptimized] = useState(false);

  useEffect(() => {
  const auth = getAuth();

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      setShowLoadingScreen(false);
      return;
    }

    try {
      const res = await API.post('/businessAnalysis/analyze');
      setData(res.data);
    } catch (err) {
      console.error("API Error:", err);
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setShowLoadingScreen(false), 2500);
    }
  });

  return () => unsubscribe();
}, []);

  const user      = data?.user        || {};
  const business  = data?.business    || {};
  const events    = data?.events      || {};
  const analysis  = data?.analysis    || {};
  const optimized = data?.optimizedStrategies || {};

  const newsItems     = events.news || [];
  const impactItems   = buildImpacts(analysis, events);
  const allStrategies = flattenOptimized(analysis);
  const optStrategies = flattenOptimized(optimized);

  const firstName = (user.name || '').split(' ')[0] || 'there';
  const initials  = (user.name || '  ').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const bizName   = business?.profile
    ? `${business.profile.subIndustry || business.profile.industry} Business`
    : 'Your Business';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <AnimatePresence>
        {showLoadingScreen && <LoadingScreen />}
      </AnimatePresence>

      {/* Page border frame */}
      <PageBorderFrame />

      <div className="min-h-screen text-white pt-24 pb-0"
        style={{ background: '#080A0C', fontFamily: '"DM Sans", sans-serif' }}>

        <Navbar user={user} initials={initials} />

        {/* Ambient glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.03) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.03) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── Welcome Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#F5C842] shadow-[0_0_8px_#F5C842]" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 font-mono">
                Live Intelligence · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
              </span>
            </div>
            <h1 className="font-bold leading-tight font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-4">
              Welcome back, <span className="text-[#F5C842]">{firstName}</span>
              
            </h1>
            <p className="text-lg text-white/50 font-light">
              Here's what's happening around {bizName} today.
            </p>
          </motion.div>

          {error && (
            <div className="mb-8 rounded-2xl px-6 py-4 flex items-center gap-3 bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35]">
              <AlertTriangle size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!showLoadingScreen && !error && (
            <>
              {/* ── Stats Row ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              >
                <StatCard label="News Items"      value={`${newsItems.length} Today`}       index={0} />
                <StatCard label="Risk Level"      value={analysis.riskLevel || '—'}          index={1} />
                <StatCard label="Optimised Strats" value={`${optStrategies.length} Ready`}  index={2} />
                <StatCard label="All Suggestions" value={`${allStrategies.length} Total`}   index={3} />
              </motion.div>

              {/* ── News Ticker ── */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <NewsTicker newsItems={newsItems} />
              </motion.div>

              {/* ── Section Navigation ── */}
              <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('impacts')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${activeTab === 'impacts' ? 'bg-[#FF6B35] text-white shadow-[0_0_20px_rgba(255,107,53,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  <AlertTriangle size={18} /> Impacts
                </button>
                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${activeTab === 'suggestions' ? 'bg-[#F5C842] text-black shadow-[0_0_20px_rgba(245,200,66,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  <Lightbulb size={18} /> AI Suggestions
                </button>
              </div>

              {/* ── Dynamic Content Area ── */}
              <div className="min-h-[500px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'impacts' ? (
                    <motion.div
                      key="impacts"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImpactWheel impacts={impactItems} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="suggestions"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6"
                    >
                      <div className="flex justify-end mb-2">
                        <button
                          onClick={() => setShowOptimized(!showOptimized)}
                          className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-2 ${showOptimized ? 'bg-[#6EE7B7]/20 text-[#6EE7B7] border border-[#6EE7B7]/50 shadow-[0_0_20px_rgba(110,231,183,0.2)]' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'}`}
                        >
                          <Zap size={14} />
                          {showOptimized ? 'Showing Optimized Strategies' : 'Show Quantum Optimized'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {showOptimized
                          ? optStrategies.map((item, i) => <OptimizedCard key={i} item={item} />)
                          : allStrategies.map((item, i) => <SuggestionCard key={i} item={item} />)
                        }
                        {(!showOptimized && allStrategies.length === 0) &&
                          <p className="text-white/40 col-span-full">No suggestions available.</p>}
                        {(showOptimized && optStrategies.length === 0) &&
                          <p className="text-white/40 col-span-full">No optimized strategies available.</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Footer bizName={bizName} />
        </div>
      </div>
    </>
  );
}
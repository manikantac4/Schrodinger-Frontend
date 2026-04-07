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
      accent: analysis.riskLevel === 'High' ? '#e05a3a' : analysis.riskLevel === 'Medium' ? '#c9a227' : '#3a9e75',
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
      accent: w.severity === 'high' ? '#e05a3a' : '#c9a227',
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
        accent: '#c97a30',
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0f11]"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-t-2 border-b-2 border-[#e05a3a]/60"
        />
      </div>
      <div className="mt-10 h-6 overflow-hidden relative w-64 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={textIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-white/40 font-mono text-xs tracking-[0.2em] uppercase absolute w-full"
          >
            {texts[textIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Navbar = ({ user, initials }) => (
  <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0d0f11]/90 backdrop-blur-md border-b border-white/[0.07] z-40 px-6 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded bg-[#e05a3a]/80 flex items-center justify-center font-bold text-white text-sm">
        S
      </div>
      <span className="font-semibold tracking-widest text-white/80 text-sm font-serif">SENTINEL</span>
    </div>
    <div className="text-white/30 font-mono text-[10px] hidden md:block tracking-[0.2em]">
      INTELLIGENCE DASHBOARD
    </div>
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="text-right hidden sm:block">
        <div className="text-sm font-medium text-white/70">{user?.name || 'User'}</div>
        <div className="text-[10px] text-white/30 uppercase tracking-widest group-hover:text-white/50 transition-colors">View Profile</div>
      </div>
      <div className="w-9 h-9 rounded-full bg-[#e05a3a]/20 border border-[#e05a3a]/30 flex items-center justify-center text-[#e05a3a] font-semibold text-sm">
        {initials || 'U'}
      </div>
      <ChevronDown size={13} className="text-white/30" />
    </div>
  </nav>
);

const StatCard = ({ label, value, index }) => {
  const accent = index % 2 === 0 ? 'rgba(224,90,58,0.15)' : 'rgba(201,162,39,0.15)';
  const bar    = index % 2 === 0 ? '#e05a3a' : '#c9a227';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="relative flex flex-col gap-1 px-5 py-5 rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: bar, opacity: 0.5 }} />
      <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30 font-mono">{label}</span>
      <span className="text-2xl font-semibold text-white/85 font-serif">{value}</span>
    </motion.div>
  );
};

// ─── News Ticker ────────────────────────────────────────────────────────────

const NewsTicker = ({ newsItems }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  if (!newsItems || newsItems.length === 0) return null;

  const doubled = [...newsItems, ...newsItems];

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper size={13} className="text-white/40" />
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 font-mono">Live News Feed</span>
        <div className="flex-1 h-px bg-white/[0.06] ml-2" />
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Hover to pause</span>
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]"
        style={{ padding: '14px 0' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0d0f11, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0d0f11, transparent)' }} />

        <div className="absolute top-3 right-5 z-20 flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#e05a3a]/70"
          />
          <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Live</span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            animation: isPaused ? 'none' : 'tickerScroll 35s linear infinite',
            width: 'max-content',
            padding: '4px 12px',
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
                  width: window.innerWidth < 640 ? 210 : 260,
                  borderRadius: 14,
                  padding: '16px 18px',
                  background: isHov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${isHov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: isHov ? 'translateY(-3px)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '2px 8px', borderRadius: 99,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Mono", monospace'
                  }}>{item.category || 'News'}</span>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: impact === 'positive' ? 'rgba(201,162,39,0.1)' : 'rgba(224,90,58,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {impact === 'positive'
                      ? <ArrowUpRight size={12} style={{ color: '#c9a227' }} />
                      : <ArrowDownRight size={12} style={{ color: '#e05a3a' }} />}
                  </div>
                </div>
                <p style={{
                  margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: '"Playfair Display", serif',
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>{item.title || item.headline}</p>
                {item.source && (
                  <span style={{
                    display: 'block', marginTop: 8, fontSize: 9, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)',
                    fontFamily: '"DM Mono", monospace'
                  }}>
                    {item.source}
                  </span>
                )}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 1.5,
                  background: impact === 'positive'
                    ? 'linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(224,90,58,0.3), transparent)'
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Impact Cards (replaces ImpactWheel) ──────────────────────────────────────

const ImpactCards = ({ impacts }) => {
  if (!impacts || impacts.length === 0)
    return <p className="text-white/30 text-center py-12 text-sm">No impact data available.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {impacts.map((impact, i) => {
        const Icon = impact.icon;
        return (
          <motion.div
            key={impact.id || i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className="flex items-start gap-4 rounded-xl p-5 bg-white/[0.04] border border-white/[0.07] relative overflow-hidden group"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
              style={{ background: impact.accent, opacity: 0.6 }}
            />
            <div
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: `${impact.accent}18` }}
            >
              <Icon size={15} style={{ color: impact.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full font-mono"
                  style={{ background: `${impact.accent}18`, color: impact.accent, border: `1px solid ${impact.accent}30` }}>
                  {impact.label}
                </span>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  {impact.severity}
                </span>
              </div>
              <p className="text-sm font-semibold text-white/75 mb-1.5 font-serif">{impact.title}</p>
              <p className="text-xs text-white/40 leading-relaxed">{impact.explanation}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const SuggestionCard = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    className="flex items-start gap-4 rounded-xl p-5 relative overflow-hidden bg-white/[0.04] border border-white/[0.07]"
  >
    <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.06]">
      <Sparkles size={14} className="text-white/50" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/40 font-mono">
          AI · {item._category || item.tag}
        </span>
        {item.material && (
          <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#3a9e75]/10 border border-[#3a9e75]/20 text-[#3a9e75]/80 font-mono">
            {item.material}
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-white/60">{item.action || item.advice}</p>
    </div>
  </motion.div>
);

const OptimizedCard = ({ item }) => {
  const Icon = stratIcon(item._category || '');
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="flex items-start gap-4 rounded-xl p-5 relative overflow-hidden bg-[#3a9e75]/[0.05] border border-[#3a9e75]/20"
    >
      <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[#3a9e75]/40" />
      <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-[#3a9e75]/10 border border-[#3a9e75]/20">
        <Icon size={14} className="text-[#3a9e75]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-2">
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-[#3a9e75]/10 border border-[#3a9e75]/20 text-[#3a9e75]/80 font-mono">
            Optimised · {item._category}
          </span>
          {item.material && (
            <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#3a9e75]/10 border border-[#3a9e75]/20 text-[#3a9e75]/70 font-mono">
              {item.material}
            </span>
          )}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#e05a3a]/10 border border-[#e05a3a]/20 text-[#e05a3a]/70 font-mono">
              Cost {item.cost}/10
            </span>
            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#3a9e75]/10 border border-[#3a9e75]/20 text-[#3a9e75]/70 font-mono">
              Impact {item.impact}/10
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-white/70">{item.action}</p>
        {item.logic && (
          <p className="mt-3 text-xs leading-relaxed text-[#3a9e75]/50 italic border-l-2 border-[#3a9e75]/20 pl-3">
            {item.logic}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = ({ bizName }) => (
  <footer className="w-full border-t border-white/[0.07] px-6 py-4 mt-12">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
        © {new Date().getFullYear()} Sentinel
      </span>
      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
        {bizName}
      </span>
      <div className="flex items-center gap-3">
        {['Privacy', 'Terms'].map(item => (
          <a
            key={item}
            href="#"
            className="text-[10px] font-mono text-white/20 hover:text-white/40 transition-colors uppercase tracking-widest"
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

      <div
        className="min-h-screen text-white pt-24 pb-0"
        style={{ background: '#0d0f11', fontFamily: '"DM Sans", sans-serif' }}
      >
        <Navbar user={user} initials={initials} />

        {/* Subtle ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(224,90,58,0.025) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.02) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── Welcome Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 font-mono">
                Live Intelligence · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
              </span>
            </div>
            <h1 className="font-semibold leading-tight font-serif text-4xl md:text-5xl text-white/85 tracking-tight mb-3">
              Welcome back, <span className="text-[#c9a227]/80">{firstName}</span>
            </h1>
            <p className="text-base text-white/35 font-light">
              Here's what's happening around {bizName} today.
            </p>
          </motion.div>

          {error && (
            <div className="mb-8 rounded-xl px-5 py-4 flex items-center gap-3 bg-[#e05a3a]/8 border border-[#e05a3a]/15 text-[#e05a3a]/70">
              <AlertTriangle size={16} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!showLoadingScreen && !error && (
            <>
              {/* ── Stats Row ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
              >
                <StatCard label="News Items"       value={`${newsItems.length} Today`}      index={0} />
                <StatCard label="Risk Level"       value={analysis.riskLevel || '—'}         index={1} />
                <StatCard label="Optimised Strats" value={`${optStrategies.length} Ready`}  index={2} />
                <StatCard label="All Suggestions"  value={`${allStrategies.length} Total`}  index={3} />
              </motion.div>

              {/* ── News Ticker ── */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                <NewsTicker newsItems={newsItems} />
              </motion.div>

              {/* ── Section Navigation ── */}
              <div className="flex flex-wrap gap-3 mb-8 border-b border-white/[0.07] pb-4">
                <button
                  onClick={() => setActiveTab('impacts')}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'impacts'
                      ? 'bg-white/10 text-white border border-white/15'
                      : 'text-white/35 hover:text-white/55 hover:bg-white/[0.04]'
                  }`}
                >
                  <AlertTriangle size={15} /> Impacts
                </button>
                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'suggestions'
                      ? 'bg-white/10 text-white border border-white/15'
                      : 'text-white/35 hover:text-white/55 hover:bg-white/[0.04]'
                  }`}
                >
                  <Lightbulb size={15} /> AI Suggestions
                </button>
              </div>

              {/* ── Dynamic Content Area ── */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'impacts' ? (
                    <motion.div
                      key="impacts"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ImpactCards impacts={impactItems} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="suggestions"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-5"
                    >
                      <div className="flex justify-end mb-1">
                        <button
                          onClick={() => setShowOptimized(!showOptimized)}
                          className={`px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all flex items-center gap-2 ${
                            showOptimized
                              ? 'bg-[#3a9e75]/10 text-[#3a9e75]/80 border border-[#3a9e75]/25'
                              : 'bg-white/[0.04] text-white/35 border border-white/[0.07] hover:bg-white/[0.07] hover:text-white/55'
                          }`}
                        >
                          <Zap size={12} />
                          {showOptimized ? 'Showing Optimized' : 'View Best Strategies'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {showOptimized
                          ? optStrategies.map((item, i) => <OptimizedCard key={i} item={item} />)
                          : allStrategies.map((item, i) => <SuggestionCard key={i} item={item} />)
                        }
                        {(!showOptimized && allStrategies.length === 0) &&
                          <p className="text-white/30 col-span-full text-sm">No suggestions available.</p>}
                        {(showOptimized && optStrategies.length === 0) &&
                          <p className="text-white/30 col-span-full text-sm">No optimized strategies available.</p>}
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
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
  Loader2,
  LogOut,
  User,
  LayoutDashboard,
  X
} from 'lucide-react';

import API from '../services/service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// ─── Animations ───────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

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
  const push = (arr = [], cat) => arr.forEach(s => out.push({ ...s, _category: cat }));
  push(optimized.priceStrategy, 'Price');
  push(optimized.productStrategy, 'Product');
  push(optimized.logisticsStrategy, 'Logistics');
  push(optimized.rawMaterialStrategy, 'Materials');
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
  return items.slice(0, 6);
}

// ─── Loading Screen ────────────────────────────────────────────────────────────

const LOADING_MESSAGES = [
  'Initializing Intelligence...',
  'Analyzing Global Signals...',
  'Processing Market Data...',
  'Generating Insights...',
  'Calibrating Risk Models...',
  'Almost Ready...'
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const raw = current / steps;
      // Ease-out curve
      const eased = 1 - Math.pow(1 - raw, 2.5);
      setProgress(Math.min(eased * 100, 100));
      const msgStep = Math.floor((current / steps) * (LOADING_MESSAGES.length - 1));
      setMsgIndex(Math.min(msgStep, LOADING_MESSAGES.length - 1));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onComplete, 600);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#080A0C',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 0
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '20%', left: '30%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '30%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Energy ring */}
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 40 }}>
        <svg width="120" height="120" style={{ position: 'absolute', inset: 0 }}>
          {/* Track */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          {/* Progress arc */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="url(#energyGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.03s linear' }}
          />
          <defs>
            <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#F5C842" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center logo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2
        }}>
          <span style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 11, fontWeight: 500,
            letterSpacing: '0.15em',
            background: 'linear-gradient(135deg, #FF6B35, #F5C842)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>SNT</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontFamily: '"DM Mono", monospace' }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Brand name */}
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 36, fontWeight: 700,
          letterSpacing: '-0.01em',
          background: 'linear-gradient(135deg, #FFFFFF 40%, rgba(255,255,255,0.5))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: 0
        }}>SENTINEL</h1>
        <p style={{ margin: '6px 0 0', fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
          Business Intelligence
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: 280, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #FF6B35, #F5C842)',
          borderRadius: 99,
          transition: 'width 0.03s linear'
        }} />
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', margin: 0 }}
        >
          {LOADING_MESSAGES[msgIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = ({ user, initials, activePage, setActivePage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'impacts', label: 'Impacts', icon: Zap },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
  ];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 60,
      background: 'rgba(8,10,12,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center',
      padding: '0 clamp(16px, 4vw, 48px)',
      gap: 0
    }}>
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'linear-gradient(135deg, #FF6B35, #F5C842)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, fontWeight: 700, color: '#080A0C', letterSpacing: '0.05em' }}>SNT</span>
        </div>
        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>SENTINEL</span>
      </div>

      {/* Center: Nav */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActivePage(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 10, border: 'none',
              background: activePage === id ? 'rgba(255,255,255,0.07)' : 'transparent',
              color: activePage === id ? '#fff' : 'rgba(255,255,255,0.45)',
              cursor: 'pointer', fontSize: 13, fontWeight: 500,
              fontFamily: '"DM Sans", sans-serif',
              transition: 'all 0.2s',
              position: 'relative'
            }}
          >
            <Icon size={14} />
            {label}
            {activePage === id && (
              <motion.div
                layoutId="navIndicator"
                style={{
                  position: 'absolute', bottom: -1, left: 8, right: 8, height: 1,
                  background: 'linear-gradient(90deg, #FF6B35, #F5C842)',
                  borderRadius: 99
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Right: Profile */}
      <div style={{ position: 'relative', flex: '0 0 auto' }} ref={dropRef}>
        <button
          onClick={() => setDropdownOpen(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '5px 12px 5px 5px',
            cursor: 'pointer', color: '#fff'
          }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #FF6B35, #F5C842)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#080A0C'
          }}>{initials || 'U'}</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)', fontFamily: '"DM Sans", sans-serif' }}>
            {(user.name || '').split(' ')[0] || 'User'}
          </span>
          <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.3)', transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'none' }} />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                width: 180,
                background: 'rgba(16,18,22,0.98)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
                padding: 6,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
              }}
            >
              {[{ icon: User, label: 'View Profile' }, { icon: LogOut, label: 'Logout', danger: true }].map(({ icon: Icon, label, danger }) => (
                <button
                  key={label}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 12px', borderRadius: 9, border: 'none',
                    background: 'transparent',
                    color: danger ? '#FF6B35' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer', fontSize: 13, fontWeight: 400,
                    fontFamily: '"DM Sans", sans-serif',
                    textAlign: 'left', transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Section Label ─────────────────────────────────────────────────────────────

const SectionLabel = ({ icon: Icon, label, accent = '#F5C842' }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
  >
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: 32, height: 32, borderRadius: 10,
      background: `${accent}1A`, border: `1px solid ${accent}30`
    }}>
      <Icon size={15} style={{ color: accent }} />
    </div>
    <span style={{
      fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.45)', fontFamily: '"DM Mono", "Fira Mono", monospace'
    }}>{label}</span>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
  </motion.div>
);

// ─── News Ticker ──────────────────────────────────────────────────────────────

const NewsTicker = ({ newsItems }) => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  // Duplicate for seamless loop
  const doubled = [...newsItems, ...newsItems];

  return (
    <section style={{ marginBottom: 48 }}>
      <SectionLabel icon={Newspaper} label="Live News Feed" accent="#F5C842" />
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Edge fades */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #080A0C, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #080A0C, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div
          ref={trackRef}
          style={{
            display: 'flex', gap: 12,
            animation: isPaused ? 'none' : 'tickerScroll 30s linear infinite',
            width: 'max-content'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { setIsPaused(false); setHoveredId(null); }}
        >
          {doubled.map((item, idx) => {
            const impact = newsImpact(item.category);
            const isHov = hoveredId === `${item._id}-${idx}`;
            return (
              <div
                key={`${item._id}-${idx}`}
                onMouseEnter={() => setHoveredId(`${item._id}-${idx}`)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  flexShrink: 0,
                  width: 260,
                  borderRadius: 20,
                  padding: '16px 18px',
                  background: isHov ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.028)',
                  border: `1px solid ${isHov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.065)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  transform: isHov ? 'translateY(-3px)' : 'none',
                  position: 'relative', overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: 99,
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
                    color: 'rgba(255,255,255,0.5)', fontFamily: '"DM Mono", monospace'
                  }}>{item.category || 'News'}</span>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: impact === 'positive' ? 'rgba(245,200,66,0.12)' : 'rgba(255,107,53,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {impact === 'positive'
                      ? <ArrowUpRight size={13} style={{ color: '#F5C842' }} />
                      : <ArrowDownRight size={13} style={{ color: '#FF6B35' }} />}
                  </div>
                </div>
                <p style={{
                  margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.4,
                  color: 'rgba(255,255,255,0.88)',
                  fontFamily: '"Playfair Display", serif',
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>{item.title || item.headline}</p>
                {item.source && (
                  <span style={{ display: 'block', marginTop: 8, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: '"DM Mono", monospace' }}>
                    {item.source}
                  </span>
                )}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: impact === 'positive'
                    ? 'linear-gradient(90deg, transparent, rgba(245,200,66,0.4), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)'
                }} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

// ─── Impact Wheel ──────────────────────────────────────────────────────────────

const ImpactWheel = ({ impactItems, riskLevel }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [rotation, setRotation] = useState(0);
  const animRef = useRef(null);
  const rotRef = useRef(0);

  useEffect(() => {
    let paused = false;
    const animate = () => {
      if (!paused) {
        rotRef.current += 0.12;
        setRotation(rotRef.current);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const pause = () => { /* handled by hoveredIdx */ };

  const n = impactItems.length || 1;
  const R = 180; // orbit radius
  const CX = 300, CY = 280; // center

  const riskColor = riskLevel === 'High' ? '#FF6B35' : riskLevel === 'Medium' ? '#F5C842' : '#6EE7B7';

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        width="100%" viewBox={`0 0 600 560`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Orbit rings */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx={CX} cy={CY} r={R * 0.65} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* Center glow */}
        <circle cx={CX} cy={CY} r={68} fill={`${riskColor}10`} stroke={`${riskColor}20`} strokeWidth="1" />
        <circle cx={CX} cy={CY} r={52} fill={`${riskColor}15`} stroke={`${riskColor}30`} strokeWidth="1" />

        {/* Center label */}
        <text x={CX} y={CY - 10} textAnchor="middle" dominantBaseline="middle"
          style={{ fill: riskColor, fontSize: 12, fontWeight: 700, fontFamily: '"DM Mono", monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          RISK
        </text>
        <text x={CX} y={CY + 8} textAnchor="middle" dominantBaseline="middle"
          style={{ fill: riskColor, fontSize: 20, fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
          {riskLevel || '—'}
        </text>

        {/* Spokes + cards */}
        {impactItems.map((item, i) => {
          const angleStep = (2 * Math.PI) / n;
          const angle = angleStep * i + (rotation * Math.PI / 180);
          const cx = CX + R * Math.cos(angle);
          const cy = CY + R * Math.sin(angle);
          const isHov = hoveredIdx === i;
          const cardW = 130, cardH = 60;

          return (
            <g key={item.id}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Spoke */}
              <line
                x1={CX + 52 * Math.cos(angle)} y1={CY + 52 * Math.sin(angle)}
                x2={cx - (cardW / 2) * Math.cos(angle)} y2={cy - (cardH / 2) * Math.sin(angle)}
                stroke={isHov ? item.accent : 'rgba(255,255,255,0.08)'}
                strokeWidth={isHov ? 1.5 : 0.8}
                strokeDasharray={isHov ? 'none' : '3 4'}
                style={{ transition: 'all 0.3s' }}
              />
              {/* Dot on spoke */}
              <circle cx={cx} cy={cy} r={isHov ? 5 : 3}
                fill={isHov ? item.accent : 'rgba(255,255,255,0.15)'}
                style={{ transition: 'all 0.3s' }}
              />
              {/* Card */}
              <foreignObject
                x={cx - cardW / 2}
                y={cy - cardH / 2}
                width={cardW}
                height={cardH}
              >
                <div xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    width: cardW, height: cardH,
                    borderRadius: 12,
                    background: isHov ? `${item.accent}18` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isHov ? item.accent + '40' : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '6px 10px',
                    transition: 'all 0.3s',
                    textAlign: 'center',
                    transform: `rotate(${-rotation}deg)`,
                    transformOrigin: '50% 50%'
                  }}>
                  <span style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: item.accent,
                    fontFamily: '"DM Mono", monospace', lineHeight: 1.2
                  }}>{item.label}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                    fontFamily: '"DM Sans", sans-serif', lineHeight: 1.3, marginTop: 3
                  }}>{item.title.length > 22 ? item.title.slice(0, 22) + '…' : item.title}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Hover detail panel */}
      <AnimatePresence>
        {hoveredIdx !== null && impactItems[hoveredIdx] && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute', bottom: 20, left: '50%',
              transform: 'translateX(-50%)',
              width: 340,
              borderRadius: 16,
              padding: '16px 20px',
              background: 'rgba(12,14,18,0.96)',
              border: `1px solid ${impactItems[hoveredIdx].accent}30`,
              boxShadow: `0 8px 40px ${impactItems[hoveredIdx].accent}18`,
              zIndex: 10,
              pointerEvents: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: impactItems[hoveredIdx].accent, fontFamily: '"DM Mono", monospace',
                padding: '3px 8px', borderRadius: 99,
                background: `${impactItems[hoveredIdx].accent}15`,
                border: `1px solid ${impactItems[hoveredIdx].accent}30`
              }}>{impactItems[hoveredIdx].label}</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Mono", monospace', letterSpacing: '0.08em' }}>
                SEVERITY: {impactItems[hoveredIdx].severity?.toUpperCase()}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontFamily: '"Playfair Display", serif', lineHeight: 1.4, marginBottom: 6 }}>
              {impactItems[hoveredIdx].title}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
              {impactItems[hoveredIdx].explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Impact Card (list fallback) ───────────────────────────────────────────────

const ImpactCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeLeft}
      whileHover={{ x: 4, transition: { duration: 0.18 } }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 20,
        borderRadius: 24, padding: 20, position: 'relative', overflow: 'hidden',
        background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.065)'
      }}
    >
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 16, width: 44, height: 44,
        background: `${item.accent}18`, border: `1px solid ${item.accent}28`
      }}>
        <Icon size={18} style={{ color: item.accent }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, justifyContent: 'space-between', marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontFamily: '"Playfair Display", serif' }}>
            {item.title}
          </h3>
          <span style={{
            flexShrink: 0, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '4px 10px', borderRadius: 99,
            background: `${item.accent}18`, border: `1px solid ${item.accent}30`, color: item.accent,
            fontFamily: '"DM Mono", monospace'
          }}>{item.label}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.42)' }}>
          {item.explanation}
        </p>
      </div>
      <div style={{
        position: 'absolute', left: 0, top: 16, bottom: 16, width: 3, borderRadius: 99,
        background: `linear-gradient(to bottom, ${item.accent}60, ${item.accent}00)`
      }} />
    </motion.div>
  );
};

// ─── Suggestion Card ───────────────────────────────────────────────────────────

const SuggestionCard = ({ item, optimized }) => {
  const Icon = optimized ? stratIcon(item._category || '') : Sparkles;
  const accent = optimized ? '#6EE7B7' : '#F5C842';

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.008, transition: { duration: 0.18 } }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 20,
        borderRadius: 24, padding: 24, position: 'relative', overflow: 'hidden',
        background: optimized ? 'rgba(110,231,183,0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${optimized ? 'rgba(110,231,183,0.15)' : 'rgba(255,255,255,0.065)'}`
      }}
    >
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, borderRadius: 14,
        background: `${accent}15`, border: `1px solid ${accent}28`
      }}>
        <Icon size={16} style={{ color: accent }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: 99,
            background: optimized ? 'rgba(110,231,183,0.12)' : 'linear-gradient(135deg, rgba(245,200,66,0.15), rgba(255,107,53,0.15))',
            border: `1px solid ${accent}30`, color: accent,
            fontFamily: '"DM Mono", monospace'
          }}>{optimized ? `Optimised · ${item._category}` : `AI · ${item._category || item.tag}`}</span>

          {item.material && (
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '3px 8px', borderRadius: 99,
              background: 'rgba(110,231,183,0.08)', border: '1px solid rgba(110,231,183,0.15)',
              color: '#6EE7B7', fontFamily: '"DM Mono", monospace'
            }}>{item.material}</span>
          )}

          {optimized && (
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 99, background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.15)', color: 'rgba(255,107,53,0.8)', fontFamily: '"DM Mono", monospace' }}>
                Cost {item.cost}/10
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 99, background: 'rgba(110,231,183,0.08)', border: '1px solid rgba(110,231,183,0.2)', color: '#6EE7B7', fontFamily: '"DM Mono", monospace' }}>
                Impact {item.impact}/10
              </span>
            </div>
          )}
        </div>

        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.72)' }}>
          {item.action || item.advice}
        </p>

        {optimized && item.logic && (
          <p style={{ margin: '8px 0 0', fontSize: 12, lineHeight: 1.6, color: 'rgba(110,231,183,0.55)', fontStyle: 'italic' }}>
            {item.logic}
          </p>
        )}
      </div>

      {optimized && (
        <div style={{
          position: 'absolute', left: 0, top: 16, bottom: 16, width: 3, borderRadius: 99,
          background: 'linear-gradient(to bottom, rgba(110,231,183,0.7), rgba(110,231,183,0))'
        }} />
      )}
    </motion.div>
  );
};

// ─── Stat Pill ─────────────────────────────────────────────────────────────────

const StatPill = ({ label, value, accent, shadow }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', gap: 6,
    padding: '18px 22px', borderRadius: 20,
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: shadow ? `0 4px 30px ${shadow}` : 'none',
    transition: 'box-shadow 0.3s'
  }}>
    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Mono", monospace' }}>{label}</span>
    <span style={{ fontSize: 22, fontWeight: 700, color: accent, fontFamily: '"Playfair Display", serif' }}>{value}</span>
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const Skeleton = ({ style = {} }) => (
  <div style={{ borderRadius: 12, background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s ease-in-out infinite', ...style }} />
);

// ─── Dashboard Page ────────────────────────────────────────────────────────────

const DashboardPage = ({ data, newsItems, allStrategies, optStrategies, impactItems, analysis, user, bizName, firstName, initials, setActivePage }) => (
  <motion.div
    key="dashboard"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.4 }}
  >
    {/* Welcome */}
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5C842', boxShadow: '0 0 6px #F5C842' }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Mono", monospace' }}>
          Live Intelligence · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
        </span>
      </div>
      <h1 style={{
        margin: 0, fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700,
        color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15
      }}>
        Welcome back, <span style={{ color: '#F5C842' }}>{firstName}</span>{' '}
      
      </h1>
      <p style={{ margin: '10px 0 0', fontSize: 15, color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}>
        Here's what's happening around {bizName} today
      </p>
    </div>

    {/* Stats Row */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 48 }}>
      <StatPill label="News Items" value={`${newsItems.length} Today`} accent="#F5C842" shadow="rgba(255,107,53,0.08)" />
      <StatPill label="Risk Level" value={analysis.riskLevel || '—'} accent="#FF6B35" shadow="rgba(245,200,66,0.06)" />
      <StatPill label="Optimised" value={`${optStrategies.length} Ready`} accent="#6EE7B7" shadow="rgba(255,107,53,0.06)" />
      <StatPill label="Suggestions" value={`${allStrategies.length} Total`} accent="#A78BFA" shadow="rgba(245,200,66,0.05)" />
    </div>

    {/* News Ticker */}
    {newsItems.length > 0 && <NewsTicker newsItems={newsItems} />}

    {/* Section nav buttons */}
    <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
      {[
        { id: 'impacts', label: '⚠️ View Impact Analysis', accent: '#FF6B35', bg: 'rgba(255,107,53,0.08)', border: 'rgba(255,107,53,0.2)' },
        { id: 'suggestions', label: '💡 Explore AI Suggestions', accent: '#F5C842', bg: 'rgba(245,200,66,0.08)', border: 'rgba(245,200,66,0.2)' }
      ].map(({ id, label, accent, bg, border }) => (
        <button key={id} onClick={() => setActivePage(id)} style={{
          flex: 1, padding: '16px 24px', borderRadius: 16,
          background: bg, border: `1px solid ${border}`,
          color: accent, fontSize: 14, fontWeight: 600,
          fontFamily: '"DM Sans", sans-serif', cursor: 'pointer',
          transition: 'all 0.2s', letterSpacing: '0.01em'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = bg.replace('0.08', '0.13'); e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = bg; e.currentTarget.style.transform = 'none'; }}
        >{label}</button>
      ))}
    </div>

    {/* Footer */}
    <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: '"DM Mono", monospace' }}>{bizName} · Intelligence Dashboard</span>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: '"DM Mono", monospace' }}>Powered by AI</span>
    </div>
  </motion.div>
);

// ─── Impacts Page ──────────────────────────────────────────────────────────────

const ImpactsPage = ({ impactItems, analysis, setActivePage }) => (
  <motion.div
    key="impacts"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: 0.4 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
      <div>
        <h2 style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 700, color: '#fff' }}>Business Impacts</h2>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Risk assessment and impact analysis</p>
      </div>
      <button onClick={() => setActivePage('suggestions')} style={{
        padding: '10px 20px', borderRadius: 12,
        background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)',
        color: '#F5C842', fontSize: 13, fontWeight: 600,
        fontFamily: '"DM Sans", sans-serif', cursor: 'pointer'
      }}>View Suggestions →</button>
    </div>

    {/* Wheel */}
    <div style={{ marginBottom: 40 }}>
      <SectionLabel icon={Zap} label="Impact Wheel — Hover to Explore" accent="#FF6B35" />
      <div style={{ borderRadius: 24, padding: 12, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)' }}>
        {impactItems.length > 0
          ? <ImpactWheel impactItems={impactItems} riskLevel={analysis.riskLevel} />
          : <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 40 }}>No impact data available.</p>}
      </div>
    </div>

    {/* Impact Cards list */}
    <SectionLabel icon={AlertTriangle} label="Impact Details" accent="#FF9F43" />
    <motion.div variants={container} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {impactItems.map(item => <ImpactCard key={item.id} item={item} />)}
    </motion.div>
  </motion.div>
);

// ─── Suggestions Page ──────────────────────────────────────────────────────────

const SuggestionsPage = ({ allStrategies, optStrategies, setActivePage }) => {
  const [showOptimized, setShowOptimized] = useState(false);
  const items = showOptimized ? optStrategies : allStrategies;

  return (
    <motion.div
      key="suggestions"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 700, color: '#fff' }}>
            {showOptimized ? '⚛️ Optimised Strategies' : '💡 AI Suggestions'}
          </h2>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
            {showOptimized ? 'Quantum-optimised recommendations with cost-impact analysis' : 'AI-generated strategic recommendations for your business'}
          </p>
        </div>
        <button onClick={() => setActivePage('impacts')} style={{
          padding: '10px 20px', borderRadius: 12,
          background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)',
          color: '#FF6B35', fontSize: 13, fontWeight: 600,
          fontFamily: '"DM Sans", sans-serif', cursor: 'pointer'
        }}>View Impacts →</button>
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 36, padding: 6, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', width: 'fit-content' }}>
        {[
          { val: false, label: '💡 AI Suggestions', accent: '#F5C842' },
          { val: true, label: '⚛️ Quantum Optimised', accent: '#6EE7B7' }
        ].map(({ val, label, accent }) => (
          <button
            key={String(val)}
            onClick={() => setShowOptimized(val)}
            style={{
              padding: '9px 18px', borderRadius: 12, border: 'none',
              background: showOptimized === val
                ? (val ? 'rgba(110,231,183,0.12)' : 'rgba(245,200,66,0.12)')
                : 'transparent',
              color: showOptimized === val ? accent : 'rgba(255,255,255,0.4)',
              fontSize: 13, fontWeight: 600,
              fontFamily: '"DM Sans", sans-serif', cursor: 'pointer',
              transition: 'all 0.25s',
              border: showOptimized === val ? `1px solid ${accent}30` : '1px solid transparent'
            }}
          >{label}</button>
        ))}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={showOptimized ? 'opt' : 'ai'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
        >
          {items.length > 0
            ? items.map((item, i) => (
              <motion.div key={`${item.id || i}`} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                <SuggestionCard item={item} optimized={showOptimized} />
              </motion.div>
            ))
            : <p style={{ gridColumn: '1/-1', fontSize: 14, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 40 }}>No strategies available.</p>
          }
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(true);
  const [animDone, setAnimDone] = useState(false);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');

 useEffect(() => {
  const auth = getAuth();

  // Wait for Firebase to confirm auth state before calling API
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // Not logged in — redirect to login
      setError('You are not logged in. Please sign in first.');
      setApiLoading(false);
      return;
    }

    try {
      const res = await API.post('/businessAnalysis/analyze');
      setData(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load dashboard.');
    } finally {
      setApiLoading(false);
    }
  });

  // Cleanup listener on unmount
  return () => unsubscribe();
}, []);

  const handleLoadingComplete = () => {
    setAnimDone(true);
  };

  // Show loading screen until BOTH the animation and API call are done
  const showLoader = !animDone || apiLoading;

  // Derive display values
  const user = data?.user || {};
  const business = data?.business || {};
  const events = data?.events || {};
  const analysis = data?.analysis || {};
  const optimized = data?.optimizedStrategies || {};

  const newsItems = events.news || [];
  const impactItems = buildImpacts(analysis, events);
  const allStrategies = flattenOptimized(analysis);
  const optStrategies = flattenOptimized(optimized);

  const firstName = (user.name || '').split(' ')[0] || 'there';
  const initials = (user.name || '  ').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const bizName = business?.profile ? `${business.profile.subIndustry || business.profile.industry} Business` : 'Your Business';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .sug-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Loading screen */}
      <AnimatePresence>
        {showLoader && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main app */}
      {animDone && (
        <div style={{ minHeight: '100vh', background: '#080A0C', color: '#fff', fontFamily: '"DM Sans", sans-serif' }}>
          {/* Ambient glows */}
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,200,66,0.035) 0%, transparent 70%)' }} />
          </div>

          {/* Navbar */}
          {!apiLoading && !error && (
            <Navbar user={user} initials={initials} activePage={activePage} setActivePage={setActivePage} />
          )}

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: `${apiLoading || error ? '48px' : '80px'} clamp(20px,4vw,56px) 48px` }}>

            {/* Error State */}
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ borderRadius: 16, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
                <AlertTriangle size={16} style={{ color: '#FF6B35', flexShrink: 0 }} />
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{error}</p>
              </motion.div>
            )}

            {/* Inline loading (API still fetching after anim done) */}
            {!error && apiLoading && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
                <Loader2 size={28} style={{ color: 'rgba(255,255,255,0.3)', animation: 'spin 1s linear infinite' }} />
              </div>
            )}

            {/* Pages */}
            {!apiLoading && !error && (
              <AnimatePresence mode="wait">
                {activePage === 'dashboard' && (
                  <DashboardPage
                    key="dashboard"
                    data={data} newsItems={newsItems} allStrategies={allStrategies}
                    optStrategies={optStrategies} impactItems={impactItems}
                    analysis={analysis} user={user} bizName={bizName}
                    firstName={firstName} initials={initials}
                    setActivePage={setActivePage}
                  />
                )}
                {activePage === 'impacts' && (
                  <ImpactsPage key="impacts" impactItems={impactItems} analysis={analysis} setActivePage={setActivePage} />
                )}
                {activePage === 'suggestions' && (
                  <SuggestionsPage key="suggestions" allStrategies={allStrategies} optStrategies={optStrategies} setActivePage={setActivePage} />
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
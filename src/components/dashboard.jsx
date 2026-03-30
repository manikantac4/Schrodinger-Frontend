import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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

/**
 * Maps a news item category string to a positive/negative sentiment.
 * NaturalDisaster, SupplyChain, Geopolitical → negative; else positive
 */
function newsImpact(category = '') {
  const neg = ['NaturalDisaster', 'SupplyChain', 'Geopolitical', 'Financial'];
  return neg.includes(category) ? 'negative' : 'positive';
}

/** Pick an icon component for a strategy category string */
function stratIcon(category = '') {
  const c = category.toLowerCase();
  if (c.includes('price')) return DollarSign;
  if (c.includes('product')) return ShoppingBag;
  if (c.includes('logistics') || c.includes('transport')) return Truck;
  if (c.includes('material') || c.includes('supply')) return LinkIcon;
  if (c.includes('operations') || c.includes('workforce') || c.includes('financial')) return Settings;
  return Sparkles;
}

/** Flatten all optimized strategies into a single list with a category label */
function flattenOptimized(optimized = {}) {
  const out = [];
  const push = (arr = [], cat) =>
    arr.forEach(s => out.push({ ...s, _category: cat }));

  push(optimized.priceStrategy,            'Price');
  push(optimized.productStrategy,          'Product');
  push(optimized.logisticsStrategy,        'Logistics');
  push(optimized.rawMaterialStrategy,      'Materials');
  push(optimized.generalStrategicSuggestions, 'General');
  return out;
}

/** Build impact cards from analysis */
function buildImpacts(analysis = {}, events = {}) {
  const items = [];

  // Risk level from analysis
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

  // Weather events
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

  // Workforce / operations hints from general strategies
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

  return items.slice(0, 4);
}

// ─── Section Label ─────────────────────────────────────────────────────────────

const SectionLabel = ({ icon: Icon, label, accent = '#F5C842' }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-3 mb-8"
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-xl" style={{ background: `${accent}1A`, border: `1px solid ${accent}30` }}>
      <Icon size={15} style={{ color: accent }} />
    </div>
    <span className="text-sm font-semibold tracking-[0.08em] uppercase" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: '"DM Mono", "Fira Mono", monospace' }}>
      {label}
    </span>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
  </motion.div>
);

// ─── News Card ─────────────────────────────────────────────────────────────────

const NewsCard = ({ item }) => {
  const impact = newsImpact(item.category);
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col h-full rounded-3xl p-6 cursor-pointer relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.032)', border: '1px solid rgba(255,255,255,0.072)' }}
    >
      <div className="flex items-start justify-between mb-5">
        <span
          className="text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.55)', fontFamily: '"DM Mono", monospace' }}
        >
          {item.category || item.tag || 'News'}
        </span>
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full"
          style={{ background: impact === 'positive' ? 'rgba(245,200,66,0.12)' : 'rgba(255,107,53,0.12)' }}
        >
          {impact === 'positive'
            ? <ArrowUpRight size={16} style={{ color: '#F5C842' }} />
            : <ArrowDownRight size={16} style={{ color: '#FF6B35' }} />}
        </div>
      </div>

      <h3
        className="text-base font-semibold leading-snug mb-3"
        style={{ color: 'rgba(255,255,255,0.92)', fontFamily: '"Playfair Display", "Georgia", serif', lineHeight: 1.45 }}
      >
        {item.title || item.headline}
      </h3>

      <p className="text-sm leading-relaxed mt-auto" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}>
        {item.description}
      </p>

      {item.source && (
        <span className="mt-3 text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"DM Mono", monospace' }}>
          {item.source}
        </span>
      )}

      <div
        className="absolute bottom-0 left-6 right-6 h-px"
        style={{ background: impact === 'positive' ? 'rgba(245,200,66,0.12)' : 'rgba(255,107,53,0.12)' }}
      />
    </motion.div>
  );
};

// ─── Impact Card ───────────────────────────────────────────────────────────────

const ImpactCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeLeft}
      whileHover={{ x: 4, transition: { duration: 0.18 } }}
      className="flex items-start gap-5 rounded-3xl p-5 relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.065)' }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-2xl w-11 h-11"
        style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}28` }}
      >
        <Icon size={18} style={{ color: item.accent }} />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-start gap-3 justify-between mb-2">
          <h3 className="text-base font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.9)', fontFamily: '"Playfair Display", serif' }}>
            {item.title}
          </h3>
          <span
            className="flex-shrink-0 text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}30`, color: item.accent, fontFamily: '"DM Mono", monospace' }}
          >
            {item.label}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>
          {item.explanation}
        </p>
      </div>

      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
        style={{ background: `linear-gradient(to bottom, ${item.accent}60, ${item.accent}00)` }}
      />
    </motion.div>
  );
};

// ─── Strategy Card (AI Suggestions — standard) ────────────────────────────────

const SuggestionCard = ({ item }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.008, transition: { duration: 0.18 } }}
    className="flex items-start gap-5 rounded-3xl p-6 relative overflow-hidden group"
    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.065)' }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
      style={{ background: 'radial-gradient(ellipse at top right, rgba(245,200,66,0.04), transparent 70%)' }}
    />

    <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl" style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)' }}>
      <Sparkles size={16} style={{ color: '#F5C842' }} />
    </div>

    <div className="relative z-10 flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.15), rgba(255,107,53,0.15))', border: '1px solid rgba(245,200,66,0.2)', color: '#F5C842', fontFamily: '"DM Mono", monospace' }}
        >
          AI · {item._category || item.tag}
        </span>
        {item.material && (
          <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full" style={{ background: 'rgba(110,231,183,0.08)', border: '1px solid rgba(110,231,183,0.15)', color: '#6EE7B7', fontFamily: '"DM Mono", monospace' }}>
            {item.material}
          </span>
        )}
      </div>
      <p className="text-[0.94rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
        {item.action || item.advice}
      </p>
    </div>
  </motion.div>
);

// ─── Optimized Strategy Card (GREEN) ─────────────────────────────────────────

const OptimizedCard = ({ item }) => {
  const Icon = stratIcon(item._category || '');
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.008, y: -2, transition: { duration: 0.18 } }}
      className="flex items-start gap-5 rounded-3xl p-6 relative overflow-hidden group"
      style={{
        background: 'rgba(110,231,183,0.04)',
        border: '1px solid rgba(110,231,183,0.15)',
      }}
    >
      {/* Green glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(110,231,183,0.07), transparent 70%)' }}
      />

      {/* Left green accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
        style={{ background: 'linear-gradient(to bottom, rgba(110,231,183,0.7), rgba(110,231,183,0.0))' }}
      />

      <div
        className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl"
        style={{ background: 'rgba(110,231,183,0.12)', border: '1px solid rgba(110,231,183,0.25)' }}
      >
        <Icon size={16} style={{ color: '#6EE7B7' }} />
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <span
            className="text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(110,231,183,0.12)', border: '1px solid rgba(110,231,183,0.25)', color: '#6EE7B7', fontFamily: '"DM Mono", monospace' }}
          >
            Optimised · {item._category}
          </span>
          {item.material && (
            <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full" style={{ background: 'rgba(110,231,183,0.08)', border: '1px solid rgba(110,231,183,0.15)', color: '#6EE7B7', fontFamily: '"DM Mono", monospace' }}>
              {item.material}
            </span>
          )}
          {item.strategyType && (
            <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full" style={{ background: 'rgba(110,231,183,0.06)', border: '1px solid rgba(110,231,183,0.12)', color: 'rgba(110,231,183,0.7)', fontFamily: '"DM Mono", monospace' }}>
              {item.strategyType}
            </span>
          )}

          {/* Cost / impact badges */}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-full" style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.15)', color: 'rgba(255,107,53,0.8)', fontFamily: '"DM Mono", monospace' }}>
              Cost {item.cost}/10
            </span>
            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-full" style={{ background: 'rgba(110,231,183,0.08)', border: '1px solid rgba(110,231,183,0.2)', color: '#6EE7B7', fontFamily: '"DM Mono", monospace' }}>
              Impact {item.impact}/10
            </span>
          </div>
        </div>

        <p className="text-[0.94rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
          {item.action}
        </p>

        {item.logic && (
          <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(110,231,183,0.55)', lineHeight: 1.6, fontStyle: 'italic' }}>
            {item.logic}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ─── Stat Pill ─────────────────────────────────────────────────────────────────

const StatPill = ({ label, value, accent }) => (
  <div
    className="flex flex-col gap-1 px-5 py-4 rounded-2xl"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
  >
    <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Mono", monospace' }}>{label}</span>
    <span className="text-xl font-bold" style={{ color: accent, fontFamily: '"Playfair Display", serif' }}>{value}</span>
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const Skeleton = ({ className = '', style = {} }) => (
  <div
    className={`rounded-2xl animate-pulse ${className}`}
    style={{ background: 'rgba(255,255,255,0.05)', ...style }}
  />
);

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.post('/businessAnalysis/analyze');
        setData(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Failed to load dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // ── Derive display values from API response ──
  const user       = data?.user        || {};
  const business   = data?.business    || {};
  const events     = data?.events      || {};
  const analysis   = data?.analysis    || {};
  const optimized  = data?.optimizedStrategies || {};

  const newsItems      = events.news || [];
  const impactItems    = buildImpacts(analysis, events);
  const allStrategies  = flattenOptimized(analysis);          // full list for "AI Suggestions"
  const optStrategies  = flattenOptimized(optimized);         // optimised subset (green)

  const firstName = (user.name || '').split(' ')[0] || 'there';
  const initials  = (user.name || '  ').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const bizName   = business?.profile ? `${business.profile.subIndustry || business.profile.industry} Business` : 'Your Business';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div className="min-h-screen text-white" style={{ background: '#080A0C', fontFamily: '"DM Sans", sans-serif' }}>
        {/* Ambient glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,200,66,0.035) 0%, transparent 70%)' }} />
        </div>

        <div className="relative" style={{ zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: 'clamp(28px, 5vw, 72px) clamp(20px, 4vw, 56px)' }}>

          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5C842', boxShadow: '0 0 6px #F5C842' }} />
                <span className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Mono", monospace' }}>
                  Live Intelligence · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                </span>
              </div>

              {loading ? (
                <Skeleton style={{ width: 340, height: 52, borderRadius: 12 }} />
              ) : (
                <h1
                  className="font-bold leading-tight"
                  style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.15 }}
                >
                  Welcome back,{' '}
                  <span style={{ color: '#F5C842' }}>{firstName}</span>
                  &nbsp;
                  <motion.span
                    className="inline-block"
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                    style={{ transformOrigin: 'bottom right' }}
                  >
                    👋
                  </motion.span>
                </h1>
              )}

              <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300, letterSpacing: '0.01em' }}>
                {loading ? "Loading your intelligence dashboard…" : `Here's what's happening around ${bizName} today`}
              </p>
            </div>

            {/* Profile card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 rounded-3xl cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 18px 10px 10px' }}
            >
              {loading ? (
                <Skeleton style={{ width: 48, height: 48, borderRadius: 12 }} />
              ) : (
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-base"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #F5C842)', color: '#080A0C', boxShadow: '0 4px 20px rgba(255,107,53,0.25)' }}
                >
                  {initials || 'U'}
                </div>
              )}
              <div>
                {loading
                  ? <Skeleton style={{ width: 100, height: 14, marginBottom: 6 }} />
                  : <p className="text-[0.95rem] font-semibold" style={{ color: 'rgba(255,255,255,0.92)' }}>{user.name || '—'}</p>
                }
                {loading
                  ? <Skeleton style={{ width: 70, height: 11 }} />
                  : <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{user.email || bizName}</p>
                }
              </div>
              <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 4 }} />
            </motion.div>
          </motion.header>

          {/* ── Error State ── */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 rounded-2xl px-6 py-4 flex items-center gap-3"
              style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}
            >
              <AlertTriangle size={16} style={{ color: '#FF6B35', flexShrink: 0 }} />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{error}</p>
            </motion.div>
          )}

          {/* ── Loading Spinner ── */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
          )}

          {!loading && !error && (
            <>
              {/* ── Stats Row ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
              >
                <StatPill label="News Items"       value={`${newsItems.length} Today`}                           accent="#F5C842" />
                <StatPill label="Risk Level"       value={analysis.riskLevel || '—'}                             accent="#FF6B35" />
                <StatPill label="Optimised Strats" value={`${optStrategies.length} Ready`}                       accent="#6EE7B7" />
                <StatPill label="All Suggestions"  value={`${allStrategies.length} Total`}                       accent="#A78BFA" />
              </motion.div>

              {/* ── News ── */}
              {newsItems.length > 0 && (
                <section className="mb-16">
                  <SectionLabel icon={Newspaper} label="Relevant News" accent="#F5C842" />
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {newsItems.map(item => <NewsCard key={item._id} item={item} />)}
                  </motion.div>
                </section>
              )}

              {/* ── Two Column: Impacts + All AI Suggestions ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">

                {/* Impacts */}
                <section>
                  <SectionLabel icon={Zap} label="Business Impacts" accent="#FF6B35" />
                  <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-4">
                    {impactItems.length > 0
                      ? impactItems.map(item => <ImpactCard key={item.id} item={item} />)
                      : <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No impact data available.</p>
                    }
                  </motion.div>
                </section>

                {/* All AI Suggestions */}
                <section>
                  <SectionLabel icon={Lightbulb} label="AI Suggestions" accent="#F5C842" />
                  <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-4">
                    {allStrategies.length > 0
                      ? allStrategies.map((item, i) => <SuggestionCard key={`${item.id}-${i}`} item={item} />)
                      : <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No suggestions available.</p>
                    }
                  </motion.div>
                </section>

              </div>

              {/* ── Optimised Strategies (Full Width, Green) ── */}
              {optStrategies.length > 0 && (
                <section className="mb-16">
                  <SectionLabel icon={Sparkles} label="Optimised Strategies" accent="#6EE7B7" />
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {optStrategies.map((item, i) => <OptimizedCard key={`opt-${item.id}-${i}`} item={item} />)}
                  </motion.div>
                </section>
              )}

              {/* ── Footer ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 pt-8 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"DM Mono", monospace' }}>
                  {bizName} · Intelligence Dashboard
                </span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"DM Mono", monospace' }}>
                  Powered by AI
                </span>
              </motion.div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
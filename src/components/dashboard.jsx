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
  Zap
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

const user = { name: "Pandu Ranga", business: "Paradise Restaurant", industry: "Food & Dining" };

const news = [
  {
    id: 1,
    headline: "Tomato prices surge by 40% due to supply shortage",
    description: "Unseasonal rains have disrupted the supply chain, leading to a sharp increase in tomato prices across wholesale markets.",
    tag: "Supply Chain",
    impact: "negative"
  },
  {
    id: 2,
    headline: "New local food festival announced for next month",
    description: "The city council has announced a week-long food festival to promote local businesses and culinary tourism.",
    tag: "Local Event",
    impact: "positive"
  },
  {
    id: 3,
    headline: "Energy costs expected to stabilize in Q3",
    description: "Recent policy changes and increased renewable output are projected to stabilize commercial energy rates.",
    tag: "Utility",
    impact: "positive"
  },
  {
    id: 4,
    headline: "Labor shortage continues to affect hospitality sector",
    description: "Restaurants and hotels are struggling to find skilled staff as the industry faces a prolonged labor shortage.",
    tag: "Labor",
    impact: "negative"
  }
];

const impacts = [
  {
    id: 1,
    title: "Increased ingredient cost",
    explanation: "Tomato and onion prices are up 40%, directly affecting your signature curry margins.",
    severity: "High",
    icon: TrendingUp,
    accent: "#FF6B35",
    label: "Cost Risk"
  },
  {
    id: 2,
    title: "Higher footfall expected",
    explanation: "Upcoming local food festival could increase weekend traffic by an estimated 25%.",
    severity: "Low",
    icon: Users,
    accent: "#F5C842",
    label: "Opportunity"
  },
  {
    id: 3,
    title: "Staff retention risk",
    explanation: "Competitors are offering higher wages for experienced kitchen personnel in your area.",
    severity: "Medium",
    icon: AlertTriangle,
    accent: "#FF9F43",
    label: "HR Risk"
  }
];

const suggestions = [
  {
    id: 1,
    advice: "Switch to local tomato suppliers to reduce costs and ensure a steady supply through the season.",
    tag: "Supply"
  },
  {
    id: 2,
    advice: "Launch a special 'Festival Menu' to attract tourists during the upcoming local food event.",
    tag: "Revenue"
  },
  {
    id: 3,
    advice: "Review staff benefits and consider a small retention bonus for key kitchen personnel this quarter.",
    tag: "HR"
  }
];

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

// ─── Section Label ─────────────────────────────────────────────────────────────

const SectionLabel = ({ icon: Icon, label, accent = "#F5C842" }) => (
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

const NewsCard = ({ item }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="flex flex-col h-full rounded-3xl p-6 cursor-pointer relative overflow-hidden"
    style={{
      background: 'rgba(255,255,255,0.032)',
      border: '1px solid rgba(255,255,255,0.072)',
    }}
  >
    {/* Subtle glow on hover via pseudo-element alternative */}
    <div className="flex items-start justify-between mb-5">
      <span
        className="text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.09)',
          color: 'rgba(255,255,255,0.55)',
          fontFamily: '"DM Mono", monospace'
        }}
      >
        {item.tag}
      </span>
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full"
        style={{
          background: item.impact === 'positive' ? 'rgba(245,200,66,0.12)' : 'rgba(255,107,53,0.12)',
        }}
      >
        {item.impact === 'positive'
          ? <ArrowUpRight size={16} style={{ color: '#F5C842' }} />
          : <ArrowDownRight size={16} style={{ color: '#FF6B35' }} />
        }
      </div>
    </div>

    <h3
      className="text-base font-semibold leading-snug mb-3"
      style={{ color: 'rgba(255,255,255,0.92)', fontFamily: '"Playfair Display", "Georgia", serif', lineHeight: 1.45 }}
    >
      {item.headline}
    </h3>

    <p
      className="text-sm leading-relaxed mt-auto"
      style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}
    >
      {item.description}
    </p>

    {/* Bottom accent line */}
    <div
      className="absolute bottom-0 left-6 right-6 h-px"
      style={{ background: item.impact === 'positive' ? 'rgba(245,200,66,0.12)' : 'rgba(255,107,53,0.12)' }}
    />
  </motion.div>
);

// ─── Impact Card ───────────────────────────────────────────────────────────────

const ImpactCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeLeft}
      whileHover={{ x: 4, transition: { duration: 0.18 } }}
      className="flex items-start gap-5 rounded-3xl p-5 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.065)',
      }}
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
            style={{
              background: `${item.accent}18`,
              border: `1px solid ${item.accent}30`,
              color: item.accent,
              fontFamily: '"DM Mono", monospace'
            }}
          >
            {item.label}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>
          {item.explanation}
        </p>
      </div>

      {/* Left border accent */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
        style={{ background: `linear-gradient(to bottom, ${item.accent}60, ${item.accent}00)` }}
      />
    </motion.div>
  );
};

// ─── Suggestion Card ───────────────────────────────────────────────────────────

const SuggestionCard = ({ item, index }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.008, transition: { duration: 0.18 } }}
    className="flex items-start gap-5 rounded-3xl p-6 relative overflow-hidden group"
    style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.065)',
    }}
  >
    {/* Subtle background glow */}
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
          style={{
            background: 'linear-gradient(135deg, rgba(245,200,66,0.15), rgba(255,107,53,0.15))',
            border: '1px solid rgba(245,200,66,0.2)',
            color: '#F5C842',
            fontFamily: '"DM Mono", monospace'
          }}
        >
          AI · {item.tag}
        </span>
      </div>
      <p className="text-[0.94rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
        {item.advice}
      </p>
    </div>
  </motion.div>
);

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

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div
        className="min-h-screen text-white"
        style={{
          background: '#080A0C',
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {/* Ambient background glows */}
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
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5C842', boxShadow: '0 0 6px #F5C842' }} />
                <span className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Mono", monospace' }}>
                  Live Intelligence · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                </span>
              </div>

              <h1
                className="font-bold leading-tight"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.15
                }}
              >
                Welcome back,{' '}
                <span style={{ color: '#F5C842' }}>Pandu</span>
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

              <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300, letterSpacing: '0.01em' }}>
                Here's what's happening around your business today
              </p>
            </div>

            {/* Profile card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 rounded-3xl cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '10px 18px 10px 10px'
              }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-base"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35, #F5C842)',
                  color: '#080A0C',
                  boxShadow: '0 4px 20px rgba(255,107,53,0.25)'
                }}
              >
                PR
              </div>
              <div>
                <p className="text-[0.95rem] font-semibold" style={{ color: 'rgba(255,255,255,0.92)' }}>{user.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{user.business}</p>
              </div>
              <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 4 }} />
            </motion.div>
          </motion.header>

          {/* ── Stats Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
          >
            <StatPill label="News Items" value="4 Today" accent="#F5C842" />
            <StatPill label="High Risk" value="1 Alert" accent="#FF6B35" />
            <StatPill label="Opportunities" value="2 Found" accent="#6EE7B7" />
            <StatPill label="AI Suggestions" value="3 Ready" accent="#A78BFA" />
          </motion.div>

          {/* ── News ── */}
          <section className="mb-16">
            <SectionLabel icon={Newspaper} label="Relevant News" accent="#F5C842" />
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {news.map(item => <NewsCard key={item.id} item={item} />)}
            </motion.div>
          </section>

          {/* ── Two Column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

            {/* Impacts */}
            <section>
              <SectionLabel icon={Zap} label="Business Impacts" accent="#FF6B35" />
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
              >
                {impacts.map(item => <ImpactCard key={item.id} item={item} />)}
              </motion.div>
            </section>

            {/* Suggestions */}
            <section>
              <SectionLabel icon={Lightbulb} label="AI Suggestions" accent="#F5C842" />
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
              >
                {suggestions.map((item, i) => <SuggestionCard key={item.id} item={item} index={i} />)}
              </motion.div>
            </section>

          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 pt-8 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"DM Mono", monospace' }}>
              Paradise Restaurant · Intelligence Dashboard
            </span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"DM Mono", monospace' }}>
              Powered by AI
            </span>
          </motion.div>

        </div>
      </div>
    </>
  );
}
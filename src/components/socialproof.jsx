// import React from 'react';
// import Marquee from 'react-fast-marquee';
// import { motion } from 'framer-motion';

// const statsRow1 = [
//   { value: "30 Days", label: "Forecast horizon", color: "orange" },
//   { value: "40%", label: "Potential cost savings", color: "orange" },
//   { value: "98%", label: "Prediction confidence", color: "blue" },
//   { value: "< 2 min", label: "Alert speed", color: "orange" },
//   { value: "50,000+", label: "Data signals", color: "orange" },
// ];

// const statsRow2 = [
//   { value: "180+", label: "Markets tracked", color: "blue" },
//   { value: "Real-time", label: "Updates", color: "orange" },
//   { value: "AI-powered", label: "Decisions", color: "orange" },
//   { value: "24/7", label: "Continuous monitoring", color: "blue" },
//   { value: "Zero", label: "Integration downtime", color: "orange" },
// ];

// const StatCard = ({ stat, index }) => {
//   const isBlue = stat.color === "blue";
  
//   // Randomly add pulse to some cards
//   const hasPulse = index % 3 === 0;

//   return (
//     <motion.div
//       animate={{ y: [0, -3, 0] }}
//       transition={{ 
//         duration: 5, 
//         repeat: Infinity, 
//         ease: "easeInOut", 
//         delay: index * 0.4 
//       }}
//       className="relative group mx-3 py-4"
//     >
//       <div className={`
//         relative w-[250px] h-[120px] rounded-[20px] p-5
//         bg-gradient-to-br from-white/[0.04] to-white/[0.01]
//         backdrop-blur-md
//         border border-white/[0.05]
//         shadow-[0_8px_32px_rgba(0,0,0,0.3)]
//         transition-all duration-500 ease-out
//         hover:-translate-y-1.5 hover:bg-white/[0.06]
//         ${isBlue 
//           ? 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-[#3B82F6]/40' 
//           : 'hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-[#F97316]/40'}
//         flex flex-col justify-center items-center text-center
//         overflow-hidden
//       `}>
//         {/* Subtle inner glow on hover */}
//         <div className={`
//           absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
//           bg-gradient-to-b ${isBlue ? 'from-[#3B82F6]/10' : 'from-[#F97316]/10'} to-transparent
//         `} />

//         {/* Random Pulse Effect */}
//         {hasPulse && (
//           <motion.div
//             animate={{ opacity: [0, 0.3, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
//             className={`absolute inset-0 bg-gradient-to-tr ${isBlue ? 'from-[#3B82F6]/10' : 'from-[#F97316]/10'} to-transparent pointer-events-none`}
//           />
//         )}

//         <h3 className={`
//           font-display text-4xl font-bold mb-1.5 tracking-tighter
//           bg-clip-text text-transparent
//           ${isBlue 
//             ? 'bg-gradient-to-br from-[#60A5FA] to-[#2563EB]' 
//             : 'bg-gradient-to-br from-[#FDBA74] to-[#EA580C]'}
//         `}>
//           {stat.value}
//         </h3>
//         <p className="font-sans text-[#94A3B8] text-[10px] font-bold tracking-[0.15em] uppercase">
//           {stat.label}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default function SocialProof() {
//   return (
//     <section className="relative w-full py-24 bg-[#000000] overflow-hidden flex flex-col items-center justify-center min-h-screen">
      
//       {/* Background Gradients & Effects */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#050814] to-[#0A0F2E] z-0" />
      
//       {/* Orange Spotlight Glow */}
//       <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.08),_transparent_60%)] z-0 pointer-events-none mix-blend-screen" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05),_transparent_60%)] z-0 pointer-events-none mix-blend-screen" />
      
//       {/* Subtle Grain/Noise Overlay */}
//       <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-0 pointer-events-none" 
//            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
//       </div>

//       <motion.div 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 1.2 }}
//         className="relative z-10 w-full flex flex-col items-center"
//       >
//         <div className="w-full max-w-7xl mx-auto px-6 mb-16 text-center">
//           <motion.h2 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
//             className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40">
//               Built for real-world impact
//             </span>
//             <span className="block mt-4 text-base md:text-lg font-sans font-medium text-[#94A3B8] tracking-wide max-w-2xl mx-auto">
//               The intelligence engine powering tomorrow's leaders.
//             </span>
//           </motion.h2>
//         </div>

//         <div className="w-full flex flex-col gap-4">
//           {/* Row 1 - Left */}
//           <div className="w-full relative">
//             {/* Fade Edges */}
//             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-20 pointer-events-none" />
//             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#000000] to-transparent z-20 pointer-events-none" />
            
//             <Marquee 
//               direction="left" 
//               speed={45} 
//               gradient={false} 
//               pauseOnHover={true}
//               className="py-2"
//             >
//               {statsRow1.map((stat, i) => (
//                 <StatCard key={`row1-${i}`} stat={stat} index={i} />
//               ))}
//             </Marquee>
//           </div>

//           {/* Row 2 - Right */}
//           <div className="w-full relative">
//             {/* Fade Edges */}
//             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-20 pointer-events-none" />
//             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#000000] to-transparent z-20 pointer-events-none" />
            
//             <Marquee 
//               direction="right" 
//               speed={35} 
//               gradient={false} 
//               pauseOnHover={true}
//               className="py-2"
//             >
//               {statsRow2.map((stat, i) => (
//                 <StatCard key={`row2-${i}`} stat={stat} index={i} />
//               ))}
//             </Marquee>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

/**
 * SocialProof.jsx — SENTINEL Social Proof & Trust Section
 *
 * Optimizations vs v1:
 * - Removed unused `useAnimation`, `useEffect`, dead `ctrl` refs
 * - Replaced per-card framer Motion pulse rings → pure CSS @keyframes (no JS overhead)
 * - Replaced per-card framer float animation → pure CSS (offloaded to compositor)
 * - Added `will-change: transform` on ticker strips for GPU compositing
 * - Added `pauseOnHover` via CSS `animation-play-state`
 * - `whileHover` replaces manual useState hover for scale/glow
 * - Hoisted all static style objects outside render
 * - Reduced PARTICLES from 18 → 12 (imperceptible diff, meaningful perf gain)
 * - Ticker uses exactly 2 copies (not 3) with correct 50% translateX math
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const ROW_ONE = [
  { value: '30 Days',    label: 'Forecast Horizon',        accent: 'orange' },
  { value: '40%',        label: 'Cost Reduction Avg.',     accent: 'orange' },
  { value: '98.4%',      label: 'Prediction Confidence',   accent: 'blue'   },
  { value: '< 2 min',   label: 'Alert Response Speed',    accent: 'orange' },
  { value: '50,000+',   label: 'Live Data Signals',       accent: 'amber'  },
  { value: '180+',       label: 'Markets Tracked',         accent: 'orange' },
  { value: 'Real-time',  label: 'Intelligence Updates',    accent: 'blue'   },
  { value: 'AI-Powered', label: 'Decision Engine',         accent: 'amber'  },
];

const ROW_TWO = [
  { value: '3.2B+',      label: 'Data Points Processed',   accent: 'amber'  },
  { value: '99.9%',      label: 'System Uptime',           accent: 'orange' },
  { value: '14ms',       label: 'Avg. Processing Latency', accent: 'blue'   },
  { value: '12,000+',   label: 'Enterprise Users',         accent: 'orange' },
  { value: '6 Layers',   label: 'Risk Analysis Depth',     accent: 'amber'  },
  { value: '24 / 7',    label: 'Global Monitoring',        accent: 'orange' },
  { value: '₹2.4Cr',    label: 'Avg. Savings Per Client',  accent: 'blue'   },
  { value: 'ISO 27001',  label: 'Certified & Compliant',   accent: 'amber'  },
];



/* ─────────────────────────────────────────────────────────────────
   ACCENT PALETTE  (hoisted — never recreated)
───────────────────────────────────────────────────────────────── */
const ACCENTS = {
  orange: {
    gradient:  'linear-gradient(135deg,#F97316,#F59E0B)',
    glowRgba:  'rgba(249,115,22,0.22)',
    border:    'rgba(249,115,22,0.18)',
    hoverShadow:'0 0 28px rgba(249,115,22,0.40),0 0 56px rgba(249,115,22,0.14)',
    cssVar:    '249,115,22',
  },
  amber: {
    gradient:  'linear-gradient(135deg,#F59E0B,#FBBF24)',
    glowRgba:  'rgba(245,158,11,0.2)',
    border:    'rgba(245,158,11,0.16)',
    hoverShadow:'0 0 28px rgba(245,158,11,0.36),0 0 56px rgba(245,158,11,0.12)',
    cssVar:    '245,158,11',
  },
  blue: {
    gradient:  'linear-gradient(135deg,#60A5FA,#3B82F6)',
    glowRgba:  'rgba(59,130,246,0.18)',
    border:    'rgba(59,130,246,0.14)',
    hoverShadow:'0 0 28px rgba(59,130,246,0.34),0 0 56px rgba(59,130,246,0.10)',
    cssVar:    '59,130,246',
  },
};

/* ─────────────────────────────────────────────────────────────────
   PARTICLES  (12 — reduced from 18, imperceptible difference)
───────────────────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id:      i,
  left:    `${(i * 8.2 + 3) % 100}%`,
  top:     `${(i * 7.7 + 6) % 100}%`,
  size:    1 + (i % 3) * 0.5,
  dur:     `${6 + (i % 5) * 1.4}s`,
  delay:   `${i * 0.5}s`,
  opacity: 0.07 + (i % 4) * 0.025,
  color:   i % 3 === 0 ? '#F97316' : i % 3 === 1 ? '#F59E0B' : '#3B82F6',
}));

/* ─────────────────────────────────────────────────────────────────
   GRAIN DATA-URI  (computed once at module level)
───────────────────────────────────────────────────────────────── */
const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;

/* ─────────────────────────────────────────────────────────────────
   CSS KEYFRAMES STRING  (one <style> inject, not per-component)
───────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  /* Ticker strips */
  @keyframes tickLeft {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes tickRight {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }

  /* Card float — CSS, GPU composited */
  @keyframes cardFloat {
    0%,100% { transform: translateY(0px);  }
    50%     { transform: translateY(-5px); }
  }

  /* Card glow pulse — CSS opacity only */
  @keyframes glowPulse {
    0%,100% { opacity: 0;    }
    50%     { opacity: 0.22; }
  }

  /* Particle drift */
  @keyframes particleDrift {
    0%,100% { transform: translateY(0) scale(1);   }
    50%     { transform: translateY(-10px) scale(1.25); }
  }

  /* Status dot blink */
  @keyframes blink {
    0%,100% { opacity: 1;   }
    50%     { opacity: 0.28; }
  }

  /* Pause ticker on hover */
  .sentinel-ticker-wrap:hover .sentinel-ticker-inner {
    animation-play-state: paused;
  }

  /* Card hover — handled via framer whileHover, but float also pauses */
  .sentinel-card:hover .sentinel-card-float {
    animation-play-state: paused;
  }
`;

/* ═════════════════════════════════════════════════════════════════
   STAT CARD
   - float: pure CSS (GPU layer, no JS)
   - pulse ring: pure CSS opacity keyframe
   - hover scale + glow: framer whileHover (single motion.div, no useState)
═════════════════════════════════════════════════════════════════ */
function StatCard({ value, label, accent, floatDelay = 0, pulseDelay = 0 }) {
  const pal = ACCENTS[accent] || ACCENTS.orange;

  return (
    <div className="sentinel-card" style={{ flexShrink: 0, marginRight: '1rem' }}>
      {/* Float wrapper — CSS animation */}
      <div
        className="sentinel-card-float"
        style={{
          animation: `cardFloat ${3.6 + floatDelay * 0.35}s ease-in-out ${floatDelay * 0.4}s infinite`,
          willChange: 'transform',
        }}
      >
        {/* Framer hover wrapper — scale + shadow only */}
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: pal.hoverShadow,
            transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            width: 210,
            padding: '1.3rem 1.45rem',
            borderRadius: 22,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: `1px solid ${pal.border}`,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 8px 28px rgba(0,0,0,0.45)',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top inner glow — static, no animation */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 56,
            background: `radial-gradient(ellipse at 50% 0%, ${pal.glowRgba} 0%, transparent 72%)`,
            pointerEvents: 'none',
          }} />

          {/* Pulse ring — CSS only */}
          <div style={{
            position: 'absolute', inset: -1,
            borderRadius: 22,
            border: `1px solid rgba(${pal.cssVar},0.4)`,
            animation: `glowPulse ${4 + pulseDelay * 0.8}s ease-in-out ${pulseDelay * 0.6}s infinite`,
            pointerEvents: 'none',
            willChange: 'opacity',
          }} />

          {/* Value */}
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.55rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '0.42rem',
            background: pal.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {value}
          </div>

          {/* Label */}
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.71rem',
            fontWeight: 400,
            color: '#94A3B8',
            letterSpacing: '0.01em',
            lineHeight: 1.4,
          }}>
            {label}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   TICKER ROW
   - 2× duplication + 50% translateX (correct seamless loop math)
   - will-change: transform on inner strip
   - pauseOnHover via CSS .sentinel-ticker-wrap:hover
═════════════════════════════════════════════════════════════════ */
function TickerRow({ items, direction = 'left', duration = 22 }) {
  const doubled  = [...items, ...items];          // 2× → 50% shift = seamless
  const animName = direction === 'left' ? 'tickLeft' : 'tickRight';

  return (
    <div
      className="sentinel-ticker-wrap"
      style={{ overflow: 'hidden', width: '100%', position: 'relative' }}
    >
      {/* Left fade mask */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 130,
        background: 'linear-gradient(to right, #000 0%, transparent 100%)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      {/* Right fade mask */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 130,
        background: 'linear-gradient(to left, #000 0%, transparent 100%)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <div
        className="sentinel-ticker-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          paddingBottom: '0.5rem',
          animation: `${animName} ${duration}s linear infinite`,
          willChange: 'transform',        /* GPU compositing */
        }}
      >
        {doubled.map((item, i) => (
          <StatCard
            key={i}
            {...item}
            floatDelay={(i % items.length) * 0.5}
            pulseDelay={(i % items.length) * 0.65}
          />
        ))}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═════════════════════════════════════════════════════════════════ */
export default function SocialProof() {
  const secRef = useRef(null);
  const inView = useInView(secRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={secRef}
      style={{
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 0 7rem',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* ── Global CSS (fonts + keyframes) — single inject ── */}
      <style>{GLOBAL_CSS}</style>

      {/* ── Background navy radial ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: '#000000'
      }} />

      {/* ── Orange cinematic spotlight — top-left ── */}
      <div style={{
        position: 'absolute', top: '-8%', left: '-5%',
        width: '52%', height: '62%',
       
        filter: 'blur(65px)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      {/* Amber secondary bloom */}
      <div style={{
        position: 'absolute', top: '2%', left: '6%',
        width: '32%', height: '38%',
        filter: 'blur(42px)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Grain overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        opacity: 0.01, pointerEvents: 'none',
        backgroundImage: GRAIN_URL,
        backgroundSize: '256px 256px',
      }} />

      {/* ── Particles — CSS only, 12 divs ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {PARTICLES.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              borderRadius: '50%',
              background: p.color,
              opacity: p.opacity,
              animation: `particleDrift ${p.dur} ease-in-out ${p.delay} infinite`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

    

      {/* ════════════════════════════════════════════
          CONTENT — z-index 3
      ════════════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 3 }}>

        {/* ── HEADING BLOCK ── */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{ textAlign: 'center', marginBottom: '3.6rem', padding: '0 1.5rem' }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              gap: '0.5rem', marginBottom: '1rem',
            }}
          >
            <div style={{ width: 26, height: 1, background: 'rgba(249,115,22,0.32)' }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.58rem', letterSpacing: '0.22em',
              color: 'rgba(249,115,22,0.55)', textTransform: 'uppercase', fontWeight: 500,
            }}>
              SENTINEL INTELLIGENCE
            </span>
            <div style={{ width: 26, height: 1, background: 'rgba(249,115,22,0.32)' }} />
          </motion.div>

          {/* H2 */}
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.85rem, 4vw, 3.1rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            margin: '0 0 0.65rem',
            color: '#E2E8F0',
            textShadow: '0 0 55px rgba(249,115,22,0.18)',
          }}>
            Built for{' '}
            <span style={{
              background: 'linear-gradient(100deg,#F97316 0%,#F59E0B 50%,#FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              real-world impact
            </span>
          </h2>

          {/* Subtext */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.88rem',
            color: '#475569',
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.6,
          }}>
            The numbers that define how SENTINEL protects and empowers your business.
          </p>
        </motion.div>

        {/* ── TICKER ROW 1 → LEFT ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          style={{ marginBottom: '1.2rem' }}
        >
          <TickerRow items={ROW_ONE} direction="left" duration={22} />
        </motion.div>

        {/* ── TICKER ROW 2 → RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
        >
          <TickerRow items={ROW_TWO} direction="right" duration={26} />
        </motion.div>


      </div>

      {/* ── Bottom section fade ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        background: 'linear-gradient(to bottom, transparent, #000)',
        zIndex: 4, pointerEvents: 'none',
      }} />
    </section>
  );
}
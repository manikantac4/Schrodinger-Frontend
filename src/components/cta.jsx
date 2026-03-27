/**
 * CTA.jsx — SENTINEL Final Call-To-Action (Optimized + Responsive)
 *
 * Changes vs v1:
 * - Responsive padding: 5rem mobile → 8rem desktop (was 9rem/11rem flat)
 * - Heading: clamp(1.75rem, 4vw, 2.8rem) — was overscaled at 3.65rem
 * - Eyebrow: 0.65rem — was 0.54rem (too small)
 * - Subtext: 0.88rem → readable on all screens
 * - Trust note: #475569 (visible) — was #1E293B (near invisible)
 * - fontFamily hoisted to section → all children inherit, no repetition
 * - Button padding scales via clamp
 * - @media breakpoints for mobile button stacking + padding
 * - Reduced particles on mobile via CSS media
 * - maxWidth content uses percentage padding on small screens
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   PARTICLES  (8, sparse)
───────────────────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id:    i,
  left:  `${(i * 12.5 + 5) % 100}%`,
  top:   `${(i * 11.3 + 8) % 100}%`,
  size:  0.8 + (i % 2) * 0.5,
  dur:   `${7 + (i % 4) * 1.5}s`,
  delay: `${i * 0.55}s`,
  op:    0.05 + (i % 3) * 0.018,
  color: i % 2 === 0 ? '#F97316' : '#F59E0B',
}));

/* ─────────────────────────────────────────────────────────────────
   GRAIN
───────────────────────────────────────────────────────────────── */
const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;

/* ─────────────────────────────────────────────────────────────────
   CSS — keyframes + responsive + buttons
───────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── Keyframes ── */
  @keyframes ctaFloat {
    0%,100% { transform: translateY(0);    }
    50%     { transform: translateY(-8px); }
  }
  @keyframes btnPulse {
    0%,100% { box-shadow: 0 4px 20px rgba(249,115,22,0.35); }
    50%     { box-shadow: 0 4px 38px rgba(249,115,22,0.62), 0 0 55px rgba(249,115,22,0.18); }
  }
  @keyframes btnSheen {
    from { transform: translateX(-130%) skewX(-18deg); }
    to   { transform: translateX(350%)  skewX(-18deg); }
  }

  /* ── Primary button ── */
  .cta-primary {
    position: relative;
    overflow: hidden;
    animation: btnPulse 3.5s ease-in-out infinite;
    transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease;
  }
  .cta-primary::after {
    content: '';
    position: absolute;
    top: 0; left: 0; height: 100%; width: 36%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    transform: translateX(-130%) skewX(-18deg);
    pointer-events: none;
  }
  .cta-primary:hover {
    transform: scale(1.045);
    box-shadow: 0 6px 44px rgba(249,115,22,0.68) !important;
    animation: none;
  }
  .cta-primary:hover::after {
    animation: btnSheen 0.58s ease forwards;
  }

  /* ── Secondary button ── */
  .cta-secondary {
    transition:
      border-color 0.2s ease,
      color        0.2s ease,
      box-shadow   0.2s ease,
      transform    0.2s cubic-bezier(0.16,1,0.3,1);
  }
  .cta-secondary:hover {
    border-color: rgba(249,115,22,0.50) !important;
    color: #F97316 !important;
    box-shadow: 0 0 20px rgba(249,115,22,0.12),
                inset 0 0 18px rgba(249,115,22,0.04);
    transform: scale(1.03);
  }

  /* ── Responsive ── */

  /* Mobile — ≤ 480px */
  @media (max-width: 480px) {
    .cta-section   { padding: 5rem 1.25rem 6rem !important; }
    .cta-content   { padding: 0 0.25rem; }
    .cta-btn-group { flex-direction: column; width: 100%; }
    .cta-primary,
    .cta-secondary { width: 100%; justify-content: center; }
    .cta-particle  { display: none; }   /* hide particles on small screens */
  }

  /* Tablet — 481px → 768px */
  @media (min-width: 481px) and (max-width: 768px) {
    .cta-section { padding: 6rem 2rem 7.5rem !important; }
  }

  /* Desktop — ≥ 769px */
  @media (min-width: 769px) {
    .cta-section { padding: 8rem 2rem 9.5rem !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────────
   FRAMER VARIANTS
───────────────────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* ═════════════════════════════════════════════════════════════════
   COMPONENT
═════════════════════════════════════════════════════════════════ */
export default function CTA() {
  const secRef = useRef(null);
  const inView = useInView(secRef, { once: true, margin: '-70px' });

  return (
    <section
      ref={secRef}
      className="cta-section"
      style={{
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        /* Base padding — overridden per breakpoint by CSS above */
        padding: '8rem 2rem 9.5rem',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{CSS}</style>

      {/* ── BACKGROUND LAYERS ──────────────────────────────────────── */}

      {/* L1 — Cinematic focus-zone darkening */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `linear-gradient(
          to bottom,
          rgba(0,0,0,0)    0%,
          rgba(0,0,0,0.40) 32%,
          rgba(0,0,0,0.86) 78%,
          rgba(0,0,0,0.96) 100%
        )`,
      }} />

      {/* L2 — Navy depth (continuous from SocialProof) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 60% 42% at 50% 108%, #0A0F2E 0%, transparent 66%)',
      }} />

      {/* L3 — Center orange spotlight behind heading */}
      <div style={{
        position: 'absolute',
        top: '6%', left: '50%', transform: 'translateX(-50%)',
        width: 'min(62%, 600px)', height: '50%',
        background: 'radial-gradient(ellipse at 50% 36%, rgba(249,115,22,0.09) 0%, rgba(245,158,11,0.045) 44%, transparent 70%)',
        filter: 'blur(52px)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* L4 — Subtle light beam rays */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '2%', left: '46%',
          width: 3, height: '50%',
          background: 'linear-gradient(to bottom, rgba(249,115,22,0.10), transparent)',
          transform: 'rotate(-15deg)', transformOrigin: 'top center',
          filter: 'blur(7px)',
        }} />
        <div style={{
          position: 'absolute', top: '2%', left: '52%',
          width: 3, height: '46%',
          background: 'linear-gradient(to bottom, rgba(245,158,11,0.08), transparent)',
          transform: 'rotate(15deg)', transformOrigin: 'top center',
          filter: 'blur(7px)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 'min(200px, 40%)', height: '55%',
          background: 'linear-gradient(to bottom, rgba(249,115,22,0.05), transparent)',
          filter: 'blur(30px)',
        }} />
      </div>

      {/* L5 — Grain */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        opacity: 0.02, pointerEvents: 'none',
        backgroundImage: GRAIN_URL, backgroundSize: '256px 256px',
      }} />

      {/* L6 — Sparse particles (hidden on mobile via CSS) */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="cta-particle"
            style={{
              position: 'absolute',
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              borderRadius: '50%',
              background: p.color,
              opacity: p.op,
              animation: `ctaFloat ${p.dur} ease-in-out ${p.delay} infinite`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* Top hairline */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.08) 28%, rgba(249,115,22,0.08) 72%, transparent)',
        zIndex: 2,
      }} />

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <motion.div
        className="cta-content"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{
          position: 'relative', zIndex: 3,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          maxWidth: 580, margin: '0 auto',
        }}
      >

        {/* Eyebrow */}
        <motion.div variants={fadeUp} style={{
          display: 'inline-flex', alignItems: 'center',
          gap: '0.48rem', marginBottom: '1.2rem',
        }}>
          <div style={{ width: 18, height: 1, background: 'rgba(249,115,22,0.22)' }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(0.6rem, 1.2vw, 0.68rem)',
            letterSpacing: '0.18em',
            color: 'rgba(249,115,22,0.45)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            SENTINEL · ACT NOW
          </span>
          <div style={{ width: 18, height: 1, background: 'rgba(249,115,22,0.22)' }} />
        </motion.div>

        {/* Main heading — well-scaled, not overblown */}
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.7rem, 3.8vw, 2.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.12,
            margin: '0 0 1rem',
            textShadow: '0 0 50px rgba(249,115,22,0.12)',
          }}
        >
          <span style={{ color: '#E2E8F0', display: 'block' }}>
            Don't react to the world.
          </span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(100deg, #F97316 0%, #F59E0B 52%, #FBBF24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Stay ahead of it.
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 'clamp(0.82rem, 1.6vw, 0.92rem)',
            color: '#94A3B8',
            fontWeight: 400,
            lineHeight: 1.65,
            margin: '0 0 2.2rem',
            maxWidth: 420,
          }}
        >
          Predict risks. Act early. Protect your business with Sentinel.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="cta-btn-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* PRIMARY */}
          <button
            className="cta-primary"
            style={{
              padding: 'clamp(0.7rem,1.5vw,0.85rem) clamp(1.6rem,3vw,2.2rem)',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
              color: '#000',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(0.82rem, 1.4vw, 0.9rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Start Free
          </button>

          {/* SECONDARY */}
          <button
            className="cta-secondary"
            style={{
              padding: 'clamp(0.68rem,1.5vw,0.83rem) clamp(1.4rem,2.8vw,2rem)',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.11)',
              cursor: 'pointer',
              background: 'transparent',
              color: '#94A3B8',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(0.82rem, 1.4vw, 0.9rem)',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            See Demo
          </button>
        </motion.div>

        {/* Trust note — readable color now */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 'clamp(0.64rem, 1.1vw, 0.7rem)',
            color: '#475569',
            marginTop: '1.2rem',
            letterSpacing: '0.025em',
            lineHeight: 1.5,
          }}
        >
          No credit card required · Setup in under 2 minutes
        </motion.p>

      </motion.div>

      {/* Bottom fade to black */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
        background: 'linear-gradient(to bottom, transparent, #000000)',
        zIndex: 4, pointerEvents: 'none',
      }} />
    </section>
  );
}
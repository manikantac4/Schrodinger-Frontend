/**
 * CTA.jsx — SENTINEL Final Call-To-Action (Compact + Clean)
 *
 * Changes vs previous:
 * - Pure #000 background, no gradient layers or radial overlays
 * - Reduced vertical padding: 4rem top/bottom (was 8rem/9.5rem)
 * - Removed decorative light beams, grain, particles — clean and fast
 * - Heading tightened: clamp(1.6rem, 3.5vw, 2.4rem)
 * - Subtext trimmed to 0.875rem, line-height 1.6
 * - Button group gap reduced, sizing clean
 * - Trust note bumped to #64748B for legibility
 * - Single subtle orange glow ring instead of multi-layer bg
 * - Hairline divider at top kept — minimal accent
 * - fontFamily hoisted to section
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes btnPulse {
    0%,100% { box-shadow: 0 4px 18px rgba(249,115,22,0.32); }
    50%     { box-shadow: 0 4px 34px rgba(249,115,22,0.58), 0 0 48px rgba(249,115,22,0.14); }
  }
  @keyframes btnSheen {
    from { transform: translateX(-130%) skewX(-18deg); }
    to   { transform: translateX(350%)  skewX(-18deg); }
  }

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
    box-shadow: 0 6px 40px rgba(249,115,22,0.65) !important;
    animation: none;
  }
  .cta-primary:hover::after {
    animation: btnSheen 0.58s ease forwards;
  }

  .cta-secondary {
    transition:
      border-color 0.2s ease,
      color        0.2s ease,
      box-shadow   0.2s ease,
      transform    0.2s cubic-bezier(0.16,1,0.3,1);
  }
  .cta-secondary:hover {
    border-color: rgba(249,115,22,0.45) !important;
    color: #F97316 !important;
    box-shadow: 0 0 18px rgba(249,115,22,0.10), inset 0 0 14px rgba(249,115,22,0.04);
    transform: scale(1.03);
  }

  @media (max-width: 480px) {
    .cta-section   { padding: 3rem 1.25rem 3.5rem !important; }
    .cta-btn-group { flex-direction: column; width: 100%; }
    .cta-primary,
    .cta-secondary { width: 100%; justify-content: center; }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .cta-section { padding: 3.5rem 2rem 4rem !important; }
  }

  @media (min-width: 769px) {
    .cta-section { padding: 4.5rem 2rem 5rem !important; }
  }
`;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function CTA() {
  const secRef = useRef(null);
  const inView = useInView(secRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={secRef}
      className="cta-section"
      style={{
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        padding: '4.5rem 2rem 5rem',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <style>{CSS}</style>

      {/* Top hairline accent */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.12) 30%, rgba(249,115,22,0.12) 70%, transparent)',
        zIndex: 2,
      }} />

      {/* Single subtle orange glow — behind heading only */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 'min(55%, 480px)', height: '70%',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.07) 0%, transparent 65%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* CONTENT */}
      <motion.div
        className="cta-content"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{
          position: 'relative', zIndex: 3,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          maxWidth: 520, margin: '0 auto',
          gap: 0,
        }}
      >

        {/* Eyebrow */}
        <motion.div variants={fadeUp} style={{
          display: 'inline-flex', alignItems: 'center',
          gap: '0.45rem', marginBottom: '1rem',
        }}>
          <div style={{ width: 16, height: 1, background: 'rgba(249,115,22,0.25)' }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.20em',
            color: 'rgba(249,115,22,0.55)',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            SENTINEL · ACT NOW
          </span>
          <div style={{ width: 16, height: 1, background: 'rgba(249,115,22,0.25)' }} />
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.15,
            margin: '0 0 0.85rem',
          }}
        >
          <span style={{ color: '#E2E8F0', display: 'block' }}>
            Don't react to the world.
          </span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(100deg, #F97316 0%, #F59E0B 55%, #FBBF24 100%)',
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
            fontSize: '0.875rem',
            color: '#94A3B8',
            fontWeight: 400,
            lineHeight: 1.6,
            margin: '0 0 1.8rem',
            maxWidth: 380,
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
            gap: '0.6rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            className="cta-primary"
            style={{
              padding: '0.75rem 2rem',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
              color: '#000',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Start Free
          </button>

          <button
            className="cta-secondary"
            style={{
              padding: '0.73rem 1.8rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.10)',
              cursor: 'pointer',
              background: 'transparent',
              color: '#94A3B8',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            See Demo
          </button>
        </motion.div>

        {/* Trust note */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: '0.7rem',
            color: '#64748B',
            marginTop: '1rem',
            letterSpacing: '0.02em',
            lineHeight: 1.5,
          }}
        >
          No credit card required · Setup in under 2 minutes
        </motion.p>

      </motion.div>

      {/* Bottom fade to black */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
        background: 'linear-gradient(to bottom, transparent, #000000)',
        zIndex: 4, pointerEvents: 'none',
      }} />
    </section>
  );
}
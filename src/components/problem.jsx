import { motion, useInView } from 'framer-motion';
import { TrendingDown, Globe, Radio, EyeOff, Zap, BarChart2 } from 'lucide-react';
import { useRef } from 'react';

/* ── Animation variants ─────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28, filter: 'blur(4px)' },
  show:   { opacity: 1, x: 0,   filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Flow step data ─────────────────────────────────────────────── */
const STEPS = [
  { icon: Globe,    label: 'Global event happens',                 color: '#fbbf24' },
  { icon: Radio,    label: 'Signals generated — news, prices, supply changes', color: '#fb923c' },
  { icon: EyeOff,   label: "Businesses don't notice",             color: '#f97316' },
  { icon: Zap,      label: 'Costs increase suddenly',             color: '#ef4444' },
  { icon: BarChart2,label: 'Profit drops',                        color: '#dc2626' },
];

const QUESTIONS = [
  `"Why did my costs suddenly increase?"`,
  `"What changed in the market?"`,
  `"Why didn't I see this earlier?"`,
  `"How do others react before me?"`,
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function ProblemSection() {
  const headRef  = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  const headInView  = useInView(headRef,  { once: true, margin: '-60px' });
  const leftInView  = useInView(leftRef,  { once: true, margin: '-80px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' });

  return (
    <section style={{
      background: '#060606',
      fontFamily: "'DM Sans', 'Sora', system-ui, sans-serif",
      padding: '6rem 1.5rem 8rem',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
    }}>

      {/* ── Ambient glows ──────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-5%', left: '-10%',
          width: '50%', height: '60%',
          background: 'radial-gradient(ellipse at 20% 20%, rgba(251,191,36,0.09) 0%, rgba(249,115,22,0.06) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', right: '-5%',
          width: '45%', height: '55%',
          background: 'radial-gradient(ellipse, rgba(185,28,28,0.09) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        {/* Noise grain */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.028, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
        {/* Part label line */}
        <div style={{
          position: 'absolute', top: '1.8rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}>
          <div style={{ width: 32, height: 1, background: 'rgba(249,115,22,0.3)' }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '0.18em',
            color: 'rgba(249,115,22,0.5)', textTransform: 'uppercase',
          }}>PART 02</span>
          <div style={{ width: 32, height: 1, background: 'rgba(249,115,22,0.3)' }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TOP HEADING — CENTER
      ══════════════════════════════════════════ */}
      <motion.div
        ref={headRef}
        variants={stagger}
        initial="hidden"
        animate={headInView ? 'show' : 'hidden'}
        style={{
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          maxWidth: 740, margin: '0 auto 5.5rem',
        }}
      >
        <motion.p variants={fadeUp} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.66rem', letterSpacing: '0.14em',
          color: '#fb923c', textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          The Problem
        </motion.p>

        <motion.h2 variants={fadeUp} style={{
          fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1.1, margin: '0 0 1.1rem',
        }}>
          <span style={{
            background: 'linear-gradient(100deg, #fbbf24 0%, #f97316 60%, #fb923c 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            The World Is Predictable.
          </span>
          <br />
          <span style={{ color: '#fff' }}>Your Business Isn't.</span>
        </motion.h2>

        <motion.p variants={fadeUp} style={{
          fontSize: '1rem', color: 'rgba(255,255,255,0.32)',
          fontStyle: 'italic',
          fontFamily: "'Playfair Display', Georgia, serif",
          margin: 0,
        }}>
          Because you don&apos;t see the signals in time.
        </motion.p>
      </motion.div>

      {/* ══════════════════════════════════════════
          TWO-COLUMN CONTENT
      ══════════════════════════════════════════ */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1160, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
        gap: '3.5rem',
        alignItems: 'center',
      }}>

        {/* ════════════════════════════════════════
            LEFT — PROBLEM FLOW + QUESTIONS
        ════════════════════════════════════════ */}
        <motion.div
          ref={leftRef}
          variants={stagger}
          initial="hidden"
          animate={leftInView ? 'show' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}
        >
          {/* Section label */}
          <motion.p variants={fadeUp} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.64rem', letterSpacing: '0.12em',
            color: 'rgba(251,191,36,0.5)', textTransform: 'uppercase',
            margin: 0,
          }}>
            Cause → Effect Chain
          </motion.p>

          {/* Flow steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={i}
                variants={fadeLeft}
                style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}
              >
                {/* Connector spine */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  width: 32, flexShrink: 0,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: `rgba(${hexToRgb(color)}, 0.1)`,
                    border: `1px solid ${color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: i === 0 ? 0 : 0,
                  }}>
                    <Icon style={{ width: 13, height: 13, color }} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{
                      width: 1, flex: 1, minHeight: 24,
                      background: `linear-gradient(to bottom, ${color}55, ${STEPS[i+1].color}33)`,
                    }} />
                  )}
                </div>

                {/* Step label */}
                <div style={{ paddingLeft: '0.9rem', paddingTop: 4, paddingBottom: i < STEPS.length - 1 ? 20 : 0 }}>
                  <span style={{
                    fontSize: '0.82rem', fontWeight: 500,
                    color: 'rgba(255,255,255,0.62)',
                    lineHeight: 1.5,
                  }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)',
                      marginRight: '0.5rem', fontWeight: 400,
                    }}>
                      0{i + 1}
                    </span>
                    {label.split(/(\bsignals\b|\bcosts\b|\bProfit\b|\bdoesn't notice\b)/gi).map((part, pi) =>
                      /signals|costs|profit|doesn't notice/i.test(part)
                        ? <span key={pi} style={{ color, fontWeight: 600 }}>{part}</span>
                        : part
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div variants={fadeUp} style={{
            height: 1,
            background: 'linear-gradient(to right, rgba(249,115,22,0.2), transparent)',
          }} />

          {/* Questions block */}
          <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {QUESTIONS.map((q, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.35)',
                  fontStyle: 'italic',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  lineHeight: 1.5,
                  borderLeft: '2px solid rgba(251,191,36,0.2)',
                  transition: 'border-color 0.3s',
                }}
              >
                {q}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════
            RIGHT — IMAGE WITH CLIPPED/ANGLED EDGE
        ════════════════════════════════════════ */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
          animate={rightInView
            ? { opacity: 1, x: 0, filter: 'blur(0px)' }
            : { opacity: 0, x: 60, filter: 'blur(10px)' }
          }
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ position: 'relative' }}
        >
          {/* Shadow halo */}
          <div style={{
            position: 'absolute', inset: '-2rem',
            borderRadius: '30px',
            background: 'radial-gradient(ellipse at center, rgba(185,28,28,0.22) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0,
          }} />

          {/* Image card — clipped with diagonal left edge */}
          <div style={{
            position: 'relative', zIndex: 2,
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: `
              0 0 0 1px rgba(239,68,68,0.1),
              0 12px 60px rgba(0,0,0,0.75),
              inset 0 1px 0 rgba(255,255,255,0.04)
            `,
            aspectRatio: '3 / 4',
            /* Diagonal clip on LEFT side */
            clipPath: 'polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}>
            {/* Photo */}
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
              alt="Stressed small business owner"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: 0.52,
                filter: 'grayscale(30%) contrast(1.18) brightness(0.8)',
              }}
              referrerPolicy="no-referrer"
            />

            {/* Gradient overlays */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(4,4,4,1) 0%, rgba(4,4,4,0.7) 35%, rgba(4,4,4,0.08) 65%, rgba(4,4,4,0.45) 100%)',
            }} />
            {/* Orange-tinted vignette top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
              background: 'linear-gradient(to bottom, rgba(120,40,10,0.18), transparent)',
            }} />
            {/* Left fade (diagonal side) */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(4,4,4,0.8) 0%, transparent 25%)',
            }} />

            {/* Overlay content */}
            <div style={{
              position: 'absolute', inset: 0, padding: '2rem',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>

              {/* Impact chips */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate={rightInView ? 'show' : 'hidden'}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem' }}
              >
                {[
                  { label: 'Monthly Profit', value: '↓ 47%',  delay: 0.6 },
                  { label: 'LPG Costs',       value: '↑ +18%', delay: 0.75 },
                ].map(({ label, value, delay }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={rightInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.38rem 0.9rem',
                      borderRadius: '8px',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.22)',
                      backdropFilter: 'blur(16px)',
                      width: 'fit-content',
                    }}
                  >
                    <TrendingDown style={{ width: 12, height: 12, color: '#f87171' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#fecaca' }}>
                      {label}
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: '#f87171', marginLeft: '0.5rem',
                      }}>
                        {value}
                      </span>
                    </span>
                  </motion.div>
                ))}

                {/* Main loss pill */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={rightInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.92 }}
                  style={{
                    marginTop: '0.25rem',
                    display: 'inline-flex', alignItems: 'center',
                    padding: '0.7rem 1.2rem',
                    borderRadius: '10px',
                    background: 'rgba(239,68,68,0.13)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 45px rgba(239,68,68,0.15)',
                    width: 'fit-content',
                  }}
                >
                  <span style={{
                    fontSize: '1rem', fontWeight: 700, color: '#fff',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    Losing{' '}
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#f87171' }}>
                      ₹12,000
                    </span>
                    {' '}/month
                  </span>
                </motion.div>
              </motion.div>

              {/* Quote */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={rightInView ? { opacity: 1 } : {}}
                transition={{ duration: 1.3, delay: 1.15 }}
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.25)',
                  fontStyle: 'italic',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  lineHeight: 1.6, margin: 0,
                }}
              >
                "Why is this happening to my business?"
              </motion.p>
            </div>
          </div>

          {/* Corner glow accent */}
          <div style={{
            position: 'absolute', bottom: '-2rem', right: '-2rem',
            width: 130, height: 130, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239,68,68,0.22), transparent 70%)',
            filter: 'blur(24px)', zIndex: 0, pointerEvents: 'none',
          }} />
        </motion.div>

      </div>

      {/* ── ping animation ── */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,400&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');
      `}</style>
    </section>
  );
}

/* ── Hex to RGB helper ─────────────────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
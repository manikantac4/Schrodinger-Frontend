import { motion, useInView } from 'framer-motion';
import { TrendingDown, Clock, ShieldAlert, Activity } from 'lucide-react';
import { useRef } from 'react';

// ── Stagger children helper ──────────────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -32, filter: 'blur(6px)' },
  show:   { opacity: 1, x: 0,   filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Metric chip ──────────────────────────────────────────────────────────────
function MetricChip({ icon, label, value, color }) {
  return (
    <motion.div variants={fadeUp}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '0.35rem',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', fontWeight: 600,
        }}>
          {icon}
          <span>{label}</span>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '1.5rem', fontWeight: 700,
          color, letterSpacing: '-0.03em', lineHeight: 1,
        }}>
          {value}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Problem() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' });

  const rightRef    = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#080808',
        fontFamily: "'DM Sans', 'Sora', system-ui, sans-serif",
        padding: '7rem 1.5rem 8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Ambient background glow ─────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Left warm glow */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-8%',
          width: '55%', height: '80%',
          background: 'radial-gradient(ellipse at 20% 20%, rgba(251,146,60,0.14) 0%, rgba(234,88,12,0.07) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
        {/* Right red/dark glow to match the impact side */}
        <div style={{
          position: 'absolute', bottom: '0%', right: '-5%',
          width: '45%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(185,28,28,0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        {/* Subtle center separator line */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%',
          width: '1px', height: '70%',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.04) 70%, transparent)',
          transform: 'translateX(-50%)',
        }} />
      </div>

      {/* ── Noise grain ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.025, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* ── Content grid ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        gap: '4rem',
        alignItems: 'center',
      }}>

        {/* ════════════════════════════════════════
            LEFT — Signal Intelligence Panel
        ════════════════════════════════════════ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.2)',
              fontSize: '0.68rem', fontWeight: 700,
              color: '#fb923c', letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: '#fb923c', opacity: 0.75,
                  animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
                }} />
                <span style={{
                  position: 'relative', display: 'inline-flex',
                  borderRadius: '50%', width: 8, height: 8, background: '#f97316',
                }} />
              </span>
              Signal Detected
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 800, letterSpacing: '-0.04em',
              lineHeight: 1.1, color: '#fff', margin: 0,
            }}>
              Oil Supply Disruption<br />
              <span style={{ color: 'rgba(255,255,255,0.28)' }}>Detected in Real-Time</span>
            </h2>
          </motion.div>

          {/* Metrics row */}
          <motion.div variants={fadeUp}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0px',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px', overflow: 'hidden',
            }}>
              {[
                { icon: <Activity style={{ width: 13, height: 13 }} />, label: 'Confidence', value: '92%',  color: '#fb923c' },
                { icon: <Clock     style={{ width: 13, height: 13 }} />, label: 'Impact In',  value: '72hr', color: '#fff' },
                { icon: <ShieldAlert style={{ width: 13, height: 13 }} />, label: 'Risk',    value: 'HIGH', color: '#f87171' },
              ].map(({ icon, label, value, color }, i) => (
                <div key={label} style={{
                  background: 'rgba(14,14,14,0.9)',
                  padding: '1.25rem 1rem',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  display: 'flex', flexDirection: 'column', gap: '0.4rem',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    color: 'rgba(255,255,255,0.3)', fontSize: '0.67rem',
                    textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600,
                  }}>
                    {icon}<span>{label}</span>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.35rem', fontWeight: 700,
                    color, letterSpacing: '-0.02em',
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Analysis block */}
          <motion.div variants={fadeUp}>
            <div style={{
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.055)',
              borderRadius: '12px',
              padding: '1.1rem 1.25rem',
            }}>
              <p style={{
                fontSize: '0.83rem', color: 'rgba(255,255,255,0.42)',
                lineHeight: 1.8, margin: 0,
              }}>
                Anomaly detected in global shipping routes — a{' '}
                <span style={{ color: '#fb923c', fontWeight: 600 }}>14% reduction</span> in crude oil
                flow through key straits. Predictive models flag significant downstream pricing impact
                within <span style={{ color: '#fff', fontWeight: 600 }}>3 days</span>.
              </p>
            </div>
          </motion.div>

          {/* Terminal log */}
          <motion.div variants={fadeUp}>
            <div style={{
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '10px',
              padding: '0.9rem 1.1rem',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: '0.67rem',
              color: 'rgba(255,255,255,0.22)',
              lineHeight: 2,
            }}>
              <span style={{ color: '#fb923c' }}>›</span> nexus.signal.init() — parsing 2.4M data points<br />
              <span style={{ color: '#fb923c' }}>›</span> route_anomaly.detected — strait_of_hormuz<br />
              <span style={{ color: '#4ade80' }}>›</span> alert.dispatched — 09:42:17 UTC
            </div>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════
            RIGHT — Human Impact (Cinematic Image)
        ════════════════════════════════════════ */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
          animate={rightInView
            ? { opacity: 1, x: 0, filter: 'blur(0px)' }
            : { opacity: 0, x: 60, filter: 'blur(8px)' }
          }
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          {/* ── Outer shadow halo (the "shadow border" effect) ── */}
          <div style={{
            position: 'absolute',
            inset: '-1.5rem',
            borderRadius: '28px',
            background: 'radial-gradient(ellipse at center, rgba(185,28,28,0.18) 0%, transparent 70%)',
            filter: 'blur(30px)',
            zIndex: 0,
          }} />

          {/* ── Glowing border ring ── */}
          <div style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(185,28,28,0.25) 50%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />

          {/* ── Image card ── */}
          <div style={{
            position: 'relative', zIndex: 2,
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: `
              0 0 0 1px rgba(239,68,68,0.12),
              0 8px 40px rgba(0,0,0,0.7),
              0 32px 80px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.06)
            `,
            aspectRatio: '3 / 4',
          }}>
            {/* Photo */}
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
              alt="Stressed small business owner looking at bills"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: 0.5,
                filter: 'grayscale(40%) contrast(1.15) brightness(0.85)',
              }}
              referrerPolicy="no-referrer"
            />

            {/* Multi-layer gradient overlays */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `
                linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.75) 35%, rgba(5,5,5,0.1) 65%, rgba(5,5,5,0.4) 100%)
              `,
            }} />
            {/* Left edge shadow merging with the signal card */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 30%)',
            }} />
            {/* Red-tinted top vignette */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
              background: 'linear-gradient(to bottom, rgba(120,20,20,0.15), transparent)',
            }} />

            {/* ── Overlay content ── */}
            <div style={{
              position: 'absolute', inset: 0, padding: '2rem',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              {/* Staggered impact chips */}
              <motion.div
                variants={container}
                initial="hidden"
                animate={rightInView ? 'show' : 'hidden'}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.4rem' }}
              >
                {[
                  { label: 'Monthly Profit',  value: '↓ 47%',  indent: 0,  delay: 0.55 },
                  { label: 'LPG Costs',        value: '↑ +18%', indent: 20, delay: 0.7  },
                ].map(({ label, value, indent, delay }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
                    style={{
                      marginLeft: indent,
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.38rem 0.85rem',
                      borderRadius: '8px',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      backdropFilter: 'blur(16px)',
                      width: 'fit-content',
                    }}
                  >
                    <TrendingDown style={{ width: 13, height: 13, color: '#f87171' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#fecaca' }}>
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={rightInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.88 }}
                  style={{
                    marginTop: '0.3rem',
                    display: 'inline-flex', alignItems: 'center',
                    padding: '0.65rem 1.15rem',
                    borderRadius: '10px',
                    background: 'rgba(239,68,68,0.14)',
                    border: '1px solid rgba(239,68,68,0.28)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 40px rgba(239,68,68,0.18)',
                    width: 'fit-content',
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                    Losing{' '}
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#f87171',
                    }}>
                      ₹12,000
                    </span>
                    {' '}/month
                  </span>
                </motion.div>
              </motion.div>

              {/* Quote */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={rightInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 1.1 }}
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.28)',
                  fontStyle: 'italic',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                "Why is this happening to my business?"
              </motion.p>
            </div>
          </div>

          {/* ── Corner accent glow spots ── */}
          <div style={{
            position: 'absolute', bottom: '-2rem', right: '-2rem',
            width: 120, height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239,68,68,0.2), transparent 70%)',
            filter: 'blur(20px)',
            zIndex: 0, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: '-1rem', left: '30%',
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)',
            filter: 'blur(16px)',
            zIndex: 0, pointerEvents: 'none',
          }} />
        </motion.div>

      </div>

      {/* ── ping keyframe ── */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
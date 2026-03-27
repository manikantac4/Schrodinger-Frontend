import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Problemimg from '../assets/problem.jpeg';

/* ─── Variants ───────────────────────────────────────────────────── */
const stagger = (delay = 0.05, gap = 0.09) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariant = (i) => ({
  hidden: { opacity: 0, x: -28, filter: 'blur(5px)' },
  show: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  },
});

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

/* ─── Data ───────────────────────────────────────────────────────── */
const QUESTIONS = [
  { q: '"Why did my costs suddenly increase?"',   accent: 'rgba(251,191,36,0.45)' },
  { q: '"What changed in the market?"',           accent: 'rgba(251,191,36,0.62)' },
  { q: '"Why didn\'t I see this earlier?"',       accent: 'rgba(249,115,22,0.72)' },
  { q: '"How do others react before me?"',        accent: 'rgba(249,115,22,0.92)' },
];

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function ProblemSection() {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  const leftInView  = useInView(leftRef,  { once: true, margin: '-60px' });
  const rightInView = useInView(rightRef, { once: true, margin: '-60px' });

  return (
    <section
      className="relative bg-[#070707] overflow-hidden"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,400&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
      />

      {/* ── Ambient glows ─────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[55%] h-[60%] blur-[90px]"
          style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(251,191,36,0.08) 0%, rgba(249,115,22,0.04) 50%, transparent 70%)' }}
        />
        <div className="absolute bottom-[-8%] right-[-4%] w-[40%] h-[45%] blur-[80px]"
          style={{ background: 'radial-gradient(ellipse at 75% 75%, rgba(251,191,36,0.05) 0%, transparent 65%)' }}
        />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          ONE UNIFIED LAYOUT  — heading lives inside the left column
          so heading + body feel like one continuous piece
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full flex flex-col md:flex-row min-h-screen">

        {/* ══ LEFT ═══════════════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
          <motion.div
            ref={leftRef}
            variants={stagger(0.04, 0.1)}
            initial="hidden"
            animate={leftInView ? 'show' : 'hidden'}
            className="flex flex-col gap-5 max-w-[540px] mx-auto md:mx-0 md:ml-auto md:mr-10"
          >

        

            {/* Main heading */}
            <motion.h2 variants={fadeUp} className="m-0" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.85rem, 4vw, 2.9rem)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
              color: '#fff',
            }}>
              <span style={{
                background: 'linear-gradient(95deg, #fbbf24 0%, #f97316 55%, #fb923c 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                The World Is Predictable.
              </span>
              <br />
              <span>Your Business Isn't.</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="m-0" style={{
              fontSize: '0.87rem', color: 'rgba(255,255,255,0.28)',
              fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.6,
            }}>
              Because you don't see the signals in time.
            </motion.p>

            {/* Connector rule — visually bridges heading → body */}
            <motion.div variants={fadeUp} style={{
              height: 1, margin: '0.1rem 0',
              background: 'linear-gradient(to right, rgba(251,191,36,0.5), rgba(249,115,22,0.18), transparent)',
            }} />

            {/* Body paragraph */}
            <motion.p variants={fadeUp} className="m-0" style={{
              fontSize: '1.05rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.78,
            }}>
              Global events happen every day. Signals are generated through news,
              prices, and supply chain shifts. But most businesses don't notice
              these changes in time. Before you know it, costs spike suddenly and
              profit drops without warning.
            </motion.p>

            {/* Cause → Effect label */}
            <motion.p variants={fadeUp} className="m-0" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem', letterSpacing: '0.14em',
              color: 'rgba(251,191,36,0.38)', textTransform: 'uppercase',
            }}>
              Cause → Effect Chain
            </motion.p>

            {/* ── Animated Question Cards ── */}
            <motion.div
              variants={stagger(0.08, 0.11)}
              className="flex flex-col gap-[0.45rem] mt-1"
            >
              {QUESTIONS.map(({ q, accent }, i) => (
                <motion.div
                  key={i}
                  variants={cardVariant(i)}
                  whileHover={{ x: 6, transition: { duration: 0.22 } }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                    padding: '0.6rem 0.85rem',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.055)',
                    borderLeft: `3px solid ${accent}`,
                    borderRadius: '0 6px 6px 0',
                    cursor: 'default',
                  }}
                >
                  {/* Pulsing dot */}
                  <motion.span
                    animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
                    style={{
                      flexShrink: 0, width: 5, height: 5, borderRadius: '50%',
                      background: accent,
                      boxShadow: `0 0 7px ${accent}`,
                    }}
                  />
                  <p className="m-0" style={{
                    fontSize: '0.9rem', color: 'rgba(255,255,255,0.52)',
                    fontStyle: 'italic', lineHeight: 1.45,
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}>
                    {q}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* ══ RIGHT — Chevron Image ══════════════════════════════════ */}
        <motion.div
          ref={rightRef}
          variants={slideRight}
          initial="hidden"
          animate={rightInView ? 'show' : 'hidden'}
          className="flex-1 relative min-h-[50vh] md:min-h-screen"
        >
          {/* Amber chevron bg */}
          <div className="absolute inset-0 bg-black"
            style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)' }}
          />
          {/* Image */}
          <div className="absolute inset-0"
            style={{
              left: '3%',
              clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)',
            }}
          >
            <img
              src={Problemimg}
              alt="Stressed business owner"
              className="w-full h-full object-cover object-center"
              style={{ opacity: 0.8, filter: 'contrast(1.1) brightness(0.9)' }}
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
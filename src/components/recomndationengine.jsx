import { useState } from "react";
import { motion } from "motion/react";

const FONT_STYLE = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');`;

// Each layer has its own full color identity
const SENTINEL_LAYERS = [
  {
    id: "sie-impact",
    title: "IMPACT",
    content: "Save ₹2,300 in procurement costs",
    accent:     "#10b981",
    accentDim:  "rgba(16,185,129,0.14)",
    accentGlow: "rgba(16,185,129,0.3)",
    tagColor:   "#6ee7b7",
    bg:         "#07140f",
    border:     "rgba(16,185,129,0.28)",
  },
  {
    id: "sie-analysis",
    title: "AI ANALYSIS",
    content: "Detected 18% rise in LPG prices and matched with historical cost impact patterns",
    accent:     "#818cf8",
    accentDim:  "rgba(129,140,248,0.14)",
    accentGlow: "rgba(129,140,248,0.3)",
    tagColor:   "#c7d2fe",
    bg:         "#090b1a",
    border:     "rgba(129,140,248,0.28)",
  },
  {
    id: "sie-context",
    title: "CONTEXT",
    content: "Supply disruption in global fuel markets affecting local pricing",
    accent:     "#f59e0b",
    accentDim:  "rgba(245,158,11,0.14)",
    accentGlow: "rgba(245,158,11,0.3)",
    tagColor:   "#fcd34d",
    bg:         "#141005",
    border:     "rgba(245,158,11,0.28)",
  },
  {
    id: "sie-risk",
    title: "RISK",
    content: "Failure to act may result in ₹10,000 monthly loss",
    accent:     "#f87171",
    accentDim:  "rgba(248,113,113,0.14)",
    accentGlow: "rgba(248,113,113,0.3)",
    tagColor:   "#fca5a5",
    bg:         "#140707",
    border:     "rgba(248,113,113,0.28)",
  },
  {
    id: "sie-extra",
    title: "EXTRA",
    content: "Recommended within next 48 hours",
    accent:     "#38bdf8",
    accentDim:  "rgba(56,189,248,0.14)",
    accentGlow: "rgba(56,189,248,0.3)",
    tagColor:   "#7dd3fc",
    bg:         "#050f18",
    border:     "rgba(56,189,248,0.28)",
  },
];

function SieHighlightText({ text, color }) {
  const regex = /(₹[\d,]+|\d+%|\d+ hours)/g;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} style={{ color, fontWeight: 600 }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function SentinelInsightEngine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLayer = SENTINEL_LAYERS[activeIndex];

  return (
    <>
      <style>{`
        ${FONT_STYLE}

        .sie-root *, .sie-root *::before, .sie-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        .sie-root {
          --sie-bg:           #070707;
          --sie-white:        #ffffff;
          --sie-amber:        #fbbf24;
          --sie-orange:       #f97316;
          --sie-orange-mid:   #fb923c;
          --sie-w78:          rgba(255,255,255,0.78);
          --sie-w52:          rgba(255,255,255,0.52);
          --sie-w28:          rgba(255,255,255,0.28);
          --sie-amber45:      rgba(251,191,36,0.45);
          --sie-amber62:      rgba(251,191,36,0.62);
          --sie-orange72:     rgba(249,115,22,0.72);
          --sie-surface-hi:   rgba(255,255,255,0.055);
          --sie-font-display: 'Playfair Display', Georgia, serif;
          --sie-font-body:    'DM Sans', sans-serif;
          --sie-font-mono:    'JetBrains Mono', monospace;
          --sie-fs-hero:      clamp(1.85rem, 4vw, 2.9rem);

          min-height: 100vh;
          background: var(--sie-bg);
          color: var(--sie-white);
          font-family: var(--sie-font-body);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          user-select: none;
          position: relative;
          overflow: hidden;
        }

        .sie-grid {
          max-width: 1100px; width: 100%;
          display: grid; grid-template-columns: 1fr;
          gap: 4rem; align-items: center;
          position: relative; z-index: 1;
        }
        @media (min-width: 1024px) {
          .sie-grid { grid-template-columns: 1fr 1fr; gap: 6rem; }
        }

        .sie-left { display: flex; flex-direction: column; gap: 2rem; }

        .sie-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.4rem 0.85rem; border-radius: 999px;
          background: var(--sie-surface-hi); border: 1px solid var(--sie-surface-hi);
          font-family: var(--sie-font-mono); font-size: 0.6rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--sie-w52); width: fit-content;
        }
        .sie-badge-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          background: var(--sie-orange);
          box-shadow: 0 0 8px var(--sie-orange72), 0 0 16px var(--sie-amber45);
          animation: sie-pulse 2.4s ease-in-out infinite;
        }
        @keyframes sie-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.8); }
        }

        .sie-headline {
          font-family: var(--sie-font-display);
          font-size: var(--sie-fs-hero);
          font-weight: 400; line-height: 1.15;
          letter-spacing: -0.01em; color: var(--sie-w78);
        }
        .sie-headline em { font-style: italic; color: var(--sie-white); }
        .sie-headline strong {
          font-weight: 700;
          background: linear-gradient(135deg, var(--sie-amber) 0%, var(--sie-orange-mid) 60%, var(--sie-orange) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sie-divider {
          width: 3rem; height: 1px;
          background: linear-gradient(90deg, var(--sie-amber62), transparent);
        }
        .sie-descriptor {
          font-size: 1.05rem; color: var(--sie-w52);
          line-height: 1.7; max-width: 400px; font-weight: 300;
        }
        .sie-features { list-style: none; display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.5rem; }
        .sie-feature-item {
          display: flex; align-items: center; gap: 0.9rem;
          font-size: 0.87rem; color: var(--sie-w28); font-weight: 400;
        }
        .sie-feature-dot {
          width: 5px; height: 5px; border-radius: 50%;
          flex-shrink: 0; background: var(--sie-amber45);
        }

        /* ── Right column ── */
        .sie-right {
          position: relative; height: 550px;
          width: 100%; max-width: 28rem;
          margin-left: auto; margin-right: auto;
        }
        @media (min-width: 1024px) { .sie-right { margin-right: 0; } }

        /* ── Card base ── */
        .sie-card {
          position: absolute; top: 2.5rem; left: 0;
          width: 100%; border-radius: 1.1rem;
          padding: 2rem; height: 260px;
          transform-origin: top center;
          overflow: hidden;
        }

        /* Glow smear inside active card */
        .sie-card-glow {
          position: absolute; inset: 0;
          border-radius: 1.1rem;
          pointer-events: none;
          transition: opacity 0.4s;
        }

        .sie-card-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; height: 100%;
        }

        /* Tag pill */
        .sie-tag {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.3rem 0.75rem; border-radius: 999px;
          font-family: var(--sie-font-mono); font-size: 0.58rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          width: fit-content; margin-bottom: 1.1rem;
          transition: background 0.35s, border-color 0.35s, color 0.35s;
        }
        .sie-tag-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
          transition: background 0.35s;
        }

        /* Divider accent line */
        .sie-card-line {
          height: 1px; width: 2rem; margin-bottom: 1rem;
          transition: background 0.35s, opacity 0.35s;
          opacity: 0;
        }
        .sie-card-line--active { opacity: 1; }

        /* Text */
        .sie-card-text {
          font-size: 1.4rem; line-height: 1.45;
          font-weight: 300; transition: color 0.3s;
        }
        .sie-card-text--active   { color: rgba(255,255,255,0.9); }
        .sie-card-text--inactive { color: rgba(255,255,255,0.2); }

        /* ── Dots ── */
        .sie-dots {
          position: absolute; bottom: -2.2rem; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 0.5rem; align-items: center;
        }
        .sie-dot {
          border-radius: 50%;
          transition: background 0.35s, transform 0.35s, box-shadow 0.35s, width 0.35s;
          width: 5px; height: 5px;
        }

        /* ── Hover zones ── */
        .sie-hover-zones {
          position: absolute; inset: 0; z-index: 100;
          display: flex; flex-direction: column;
        }
        .sie-hover-zone { flex: 1; width: 100%; cursor: default; }
      `}</style>

      <div className="sie-root">
        <div className="sie-grid">

          {/* ── LEFT ── */}
          <div className="sie-left">

            <h1 className="sie-headline">
              AI Recommendation<br />
              <strong>Insight</strong> <em>Engine</em>
            </h1>

            <div className="sie-divider" />

            <p className="sie-descriptor">
              Explore the reasoning behind Sentinel's recommendations. Hover
              over the insight card to reveal deeper layers of intelligence —
              from immediate impact to underlying context and risks.
            </p>

            <ul className="sie-features">
              {["Multi-layered analysis", "Context-aware reasoning", "Predictive risk assessment"].map((f) => (
                <li key={f} className="sie-feature-item">
                  <span className="sie-feature-dot" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT ── */}
          <div className="sie-right">

            {SENTINEL_LAYERS.map((layer, index) => {
              const isActive = activeIndex === index;
              const distance = Math.abs(activeIndex - index);
              const isAbove  = index < activeIndex;

              const baseY   = index * 35;
              const yOffset = isActive
                ? baseY - 15
                : isAbove
                ? baseY - 40 - distance * 10
                : baseY + 40 + distance * 10;

              const scale   = isActive ? 1.02 : 1 - distance * 0.02;
              const blur = isActive ? 0 : 1 + distance * 0.8;
           const opacity = isActive ? 1 : Math.max(0.45, 0.75 - distance * 0.1);
              const zIndex  = isActive ? 50 : 10 - distance;

              return (
                <motion.div
                  key={layer.id}
                  className="sie-card"
                  initial={false}
                  animate={{ y: yOffset, scale, zIndex, filter: `blur(${blur}px)`, opacity }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    background: layer.bg,
                    border: `1px solid ${isActive ? layer.border : "rgba(255,255,255,0.07)"}`,
                    boxShadow: isActive
                      ? `0 0 0 1px ${layer.border}, 0 24px 64px rgba(0,0,0,0.75), 0 0 100px ${layer.accentGlow}`
                      : "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Colored top-left glow smear */}
                  <div
                    className="sie-card-glow"
                    style={{
                      background: `radial-gradient(ellipse at 0% 0%, ${layer.accentDim} 0%, transparent 65%)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  <div className="sie-card-inner">
                    {/* Colored tag pill */}
                    <div
                      className="sie-tag"
                      style={{
                        background: isActive ? layer.accentDim : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isActive ? layer.border : "rgba(255,255,255,0.07)"}`,
                        color: isActive ? layer.tagColor : "rgba(255,255,255,0.2)",
                      }}
                    >
                      <span
                        className="sie-tag-dot"
                        style={{ background: isActive ? layer.accent : "rgba(255,255,255,0.18)" }}
                      />
                      {layer.title}
                    </div>

                    {/* Accent divider line */}
                    <div
                      className={`sie-card-line ${isActive ? "sie-card-line--active" : ""}`}
                      style={{ background: `linear-gradient(90deg, ${layer.accent}, transparent)` }}
                    />

                    {/* Main text */}
                    <h3 className={`sie-card-text ${isActive ? "sie-card-text--active" : "sie-card-text--inactive"}`}>
                      <SieHighlightText text={layer.content} color={layer.accent} />
                    </h3>
                  </div>
                </motion.div>
              );
            })}

            {/* Layer indicator dots */}
            <div className="sie-dots">
              {SENTINEL_LAYERS.map((layer, index) => (
                <div
                  key={`sie-dot-${index}`}
                  className="sie-dot"
                  style={{
                    background: activeIndex === index ? layer.accent : "rgba(255,255,255,0.18)",
                    transform: activeIndex === index ? "scale(1.5)" : "scale(1)",
                    boxShadow: activeIndex === index ? `0 0 8px ${layer.accentGlow}` : "none",
                  }}
                />
              ))}
            </div>

            {/* Invisible hover zones */}
            <div className="sie-hover-zones" onMouseLeave={() => setActiveIndex(0)}>
              {SENTINEL_LAYERS.map((_, index) => (
                <div
                  key={`sie-zone-${index}`}
                  className="sie-hover-zone"
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
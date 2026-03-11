import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Reusable input field ──────────────────────────────────────────────────────
const Field = ({ label, type, placeholder }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontSize: 10, fontWeight: 700, color: '#6ee7b7',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        fontFamily: "'Courier New', monospace",
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '12px 16px', boxSizing: 'border-box',
          background: focused ? 'rgba(6,78,59,0.5)' : 'rgba(6,78,59,0.28)',
          border: `1.5px solid ${focused ? '#34d399' : 'rgba(52,211,153,0.22)'}`,
          borderRadius: 10, outline: 'none', fontSize: 15,
          color: '#ecfdf5', fontFamily: 'Georgia, serif',
          transition: 'all 0.25s',
          boxShadow: focused ? '0 0 0 3px rgba(52,211,153,0.12)' : 'none',
        }}
      />
    </div>
  );
};

// ── SVG-based 3D Lamp ─────────────────────────────────────────────────────────
// Draws a proper banker's lamp shade: wide elliptical bottom, narrow elliptical top,
// side panels, inner glow, rim details — all in SVG so shape is always correct.
const SVGLamp = ({ isOn, size = 220 }) => {
  const W = size;
  const H = size * 1.1;

  // Key geometry
  const cx = W / 2;
  const topY = H * 0.06;
  const botY = H * 0.78;
  const topRx = W * 0.10;
  const topRy = W * 0.03;
  const botRx = W * 0.46;
  const botRy = W * 0.10;

  // Colors
  const shadeBase  = isOn ? '#166534' : '#0d2e1a';
  const shadeMid   = isOn ? '#15803d' : '#0f3620';
  const shadeLight = isOn ? '#22c55e' : '#174d28';
  const shadeDark  = isOn ? '#052e16' : '#061a0e';
  const rimColor   = isOn ? '#4ade80' : '#1a4731';
  const innerGlow  = isOn ? 'rgba(187,247,208,0.55)' : 'rgba(0,0,0,0)';
  const bulbColor  = isOn ? '#fef9c3' : '#111';

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        {/* Main shade gradient — left=dark, right=highlight, simulates 3D cylinder */}
        <linearGradient id="shadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={shadeDark}  />
          <stop offset="22%"  stopColor={shadeBase}  />
          <stop offset="48%"  stopColor={shadeLight} />
          <stop offset="72%"  stopColor={shadeMid}   />
          <stop offset="100%" stopColor={shadeDark}  />
        </linearGradient>

        {/* Inner ceiling of shade — bright when on */}
        <radialGradient id="innerGrad" cx="50%" cy="100%" r="70%">
          <stop offset="0%"   stopColor={innerGlow} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Bottom rim glow */}
        <radialGradient id="rimGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={isOn ? 'rgba(74,222,128,0.7)' : 'rgba(0,0,0,0)'} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Bulb glow */}
        <radialGradient id="bulbGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={isOn ? '#fffde7' : '#1a2a1a'} />
          <stop offset="60%"  stopColor={isOn ? '#fde68a' : '#111'} />
          <stop offset="100%" stopColor={isOn ? '#d97706' : '#0a0a0a'} />
        </radialGradient>

        {/* Clip to shade silhouette */}
        <clipPath id="shadeClip">
          <path d={`
            M ${cx - topRx} ${topY}
            Q ${cx} ${topY - topRy * 1.5} ${cx + topRx} ${topY}
            L ${cx + botRx} ${botY}
            Q ${cx} ${botY + botRy * 1.6} ${cx - botRx} ${botY}
            Z
          `} />
        </clipPath>

        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="rimBlur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ── Shade body (trapezoid with curved top+bottom ellipses) ── */}
      {/* Shadow/depth layer behind */}
      <path
        d={`
          M ${cx - topRx + 4} ${topY}
          L ${cx + botRx + 8} ${botY + 4}
          Q ${cx} ${botY + botRy * 1.7 + 6} ${cx - botRx - 8} ${botY + 4}
          Z
        `}
        fill="rgba(0,0,0,0.4)"
        filter="url(#softBlur)"
      />

      {/* Main shade fill */}
      <path
        d={`
          M ${cx - topRx} ${topY}
          L ${cx + botRx} ${botY}
          Q ${cx} ${botY + botRy * 1.6} ${cx - botRx} ${botY}
          Z
        `}
        fill="url(#shadeGrad)"
      />

      {/* Inner glow (ceiling of shade) */}
      <path
        d={`
          M ${cx - topRx} ${topY}
          L ${cx + botRx} ${botY}
          Q ${cx} ${botY + botRy * 1.6} ${cx - botRx} ${botY}
          Z
        `}
        fill="url(#innerGrad)"
        opacity={isOn ? 1 : 0}
        style={{ transition: 'opacity 0.5s' }}
      />

      {/* Vertical panel lines to simulate 3D facets */}
      {[-0.28, -0.06, 0.16, 0.38].map((t, i) => {
        const topX = cx + t * topRx * 2.5;
        const botX = cx + t * botRx * 2.2;
        const alpha = isOn ? [0.22, 0.14, 0.18, 0.10][i] : 0.12;
        return (
          <line
            key={i}
            x1={topX} y1={topY}
            x2={botX} y2={botY}
            stroke={isOn ? 'rgba(187,247,208,0.35)' : 'rgba(34,197,94,0.12)'}
            strokeWidth={1}
            opacity={alpha * 3}
          />
        );
      })}

      {/* ── Top ellipse (opening) ── */}
      <ellipse
        cx={cx} cy={topY}
        rx={topRx} ry={topRy}
        fill={isOn ? '#d97706' : '#0d1a10'}
        stroke={isOn ? '#fbbf24' : '#1a3a20'}
        strokeWidth={1.5}
      />

      {/* Bulb visible through top */}
      <ellipse
        cx={cx} cy={topY}
        rx={topRx * 0.65} ry={topRy * 0.7}
        fill="url(#bulbGrad)"
        style={{ transition: 'all 0.5s' }}
      />
      {isOn && (
        <ellipse
          cx={cx} cy={topY}
          rx={topRx * 0.65} ry={topRy * 0.7}
          fill="rgba(255,253,231,0.6)"
          filter="url(#softBlur)"
        />
      )}

      {/* ── Bottom rim ellipse ── */}
      {/* Glow halo behind rim */}
      <ellipse
        cx={cx} cy={botY}
        rx={botRx + 12} ry={botRy + 6}
        fill="url(#rimGlow)"
        filter="url(#rimBlur)"
        opacity={isOn ? 0.8 : 0}
        style={{ transition: 'opacity 0.5s' }}
      />

      {/* Rim underside (dark) */}
      <ellipse
        cx={cx} cy={botY}
        rx={botRx} ry={botRy * 1.6}
        fill={isOn ? '#052e16' : '#061208'}
        stroke={rimColor}
        strokeWidth={2}
        style={{ transition: 'all 0.5s' }}
      />

      {/* Rim topside (lit) */}
      <ellipse
        cx={cx} cy={botY}
        rx={botRx} ry={botRy}
        fill={isOn ? '#166534' : '#0a1f10'}
        stroke={rimColor}
        strokeWidth={2.5}
        style={{ transition: 'all 0.5s' }}
      />

      {/* Rim highlight arc */}
      <path
        d={`M ${cx - botRx * 0.7} ${botY - botRy * 0.2} Q ${cx} ${botY - botRy * 1.1} ${cx + botRx * 0.7} ${botY - botRy * 0.2}`}
        fill="none"
        stroke={isOn ? 'rgba(187,247,208,0.5)' : 'rgba(52,211,153,0.12)'}
        strokeWidth={2}
        style={{ transition: 'all 0.5s' }}
      />

      {/* ── Cord attachment cap ── */}
      <rect
        x={cx - 14} y={0}
        width={28} height={topY + topRy + 2}
        rx={5} ry={5}
        fill="#1a1a1c"
        stroke="#2d2d30"
        strokeWidth={1}
      />
      <rect
        x={cx - 8} y={0}
        width={16} height={8}
        rx={3}
        fill="#252527"
      />
    </svg>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function InteractiveLampLogin() {
  const [isOn, setIsOn]     = useState(false);
  const [mouse, setMouse]   = useState({ x: 0, y: 0 });
  const [vw, setVw]         = useState(typeof window !== 'undefined' ? window.innerWidth  : 800);
  const [vh, setVh]         = useState(typeof window !== 'undefined' ? window.innerHeight : 600);

  useEffect(() => {
    const mm = (e) => setMouse({ x: e.clientX, y: e.clientY });
    const rz = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener('mousemove', mm);
    window.addEventListener('resize', rz);
    return () => { window.removeEventListener('mousemove', mm); window.removeEventListener('resize', rz); };
  }, []);

  // Lamp size: responsive but generous
  const lampSize = Math.min(Math.max(vw * 0.28, 180), 300);
  const cordLen  = Math.min(vh * 0.12, 90);
  const cx       = vw / 2;
  // Bottom of shade in page coords (approx)
  const shadeBotY = cordLen + lampSize * 1.1 * 0.78;

  return (
    <div style={{
      position: 'relative', minHeight: '100vh', width: '100%',
      overflow: 'hidden', background: '#020b05',
      fontFamily: 'Georgia, serif',
    }}>
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage:
          'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Cursor ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: isOn
          ? `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(52,211,153,0.04) 0%, transparent 70%)`
          : `radial-gradient(200px circle at ${mouse.x}px ${mouse.y}px, rgba(52,211,153,0.11) 0%, transparent 70%)`,
        transition: 'background 0.1s',
      }} />

      {/* ── CORD ── */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 4, height: cordLen,
        background: 'linear-gradient(180deg, #2a2a2e 0%, #1a1a1c 100%)',
        borderRadius: 2, zIndex: 30,
      }} />

      {/* ── LAMP (SVG) ── */}
      <div
        style={{
          position: 'absolute',
          top: cordLen - 2,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onDoubleClick={() => setIsOn(v => !v)}
        title="Double-click to toggle lamp"
      >
        <SVGLamp isOn={isOn} size={lampSize} />

        {/* Hover hint */}
        <div style={{
          textAlign: 'center', marginTop: 6,
          fontSize: 9, letterSpacing: '0.22em',
          color: '#1a4731', fontFamily: "'Courier New', monospace",
          textTransform: 'uppercase',
          opacity: 0.7,
        }}>
          double·click
        </div>
      </div>

      {/* ── LIGHT CONE ── */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            key="cone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}
          >
            {/* SVG cone */}
            <svg
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient id="coneG" cx="50%" cy="0%" r="75%" gradientUnits="userSpaceOnUse"
                  gradientTransform={`translate(${cx}, ${shadeBotY})`}>
                  <stop offset="0%"   stopColor="#4ade80" stopOpacity="0.28" />
                  <stop offset="30%"  stopColor="#16a34a" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#052e16" stopOpacity="0"   />
                </radialGradient>
              </defs>
              {/* Wide cone from lamp base to screen bottom */}
              <polygon
                points={`
                  ${cx - lampSize * 0.46}, ${shadeBotY}
                  ${cx + lampSize * 0.46}, ${shadeBotY}
                  ${vw * 0.92}, ${vh}
                  ${vw * 0.08}, ${vh}
                `}
                fill="url(#coneG)"
              />
              {/* Brighter inner cone */}
              <polygon
                points={`
                  ${cx - lampSize * 0.28}, ${shadeBotY}
                  ${cx + lampSize * 0.28}, ${shadeBotY}
                  ${cx + vw * 0.22}, ${vh}
                  ${cx - vw * 0.22}, ${vh}
                `}
                fill="rgba(74,222,128,0.07)"
              />
            </svg>

            {/* Floor glow pool */}
            <div style={{
              position: 'absolute', bottom: 0,
              left: cx - vw * 0.35, width: vw * 0.7, height: '25vh',
              background: 'radial-gradient(ellipse at 50% 100%, rgba(74,222,128,0.18) 0%, rgba(22,163,74,0.06) 45%, transparent 70%)',
              filter: 'blur(32px)',
            }} />

            {/* Edge light rays */}
            {[-1, 1].map(side => (
              <div key={side} style={{
                position: 'absolute',
                top: shadeBotY,
                left: side === -1 ? cx - lampSize * 0.46 : cx + lampSize * 0.46,
                width: 2, height: vh - shadeBotY,
                background: 'linear-gradient(180deg, rgba(74,222,128,0.4) 0%, transparent 100%)',
                transform: `rotate(${side * 22}deg)`,
                transformOrigin: 'top center',
                filter: 'blur(2px)',
              }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LOGIN FORM ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: Math.min(cordLen + lampSize * 0.85, vh * 0.38),
        boxSizing: 'border-box', zIndex: 50,
        pointerEvents: 'none',
      }}>
        <AnimatePresence>
          {isOn && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.15 }}
              style={{
                pointerEvents: 'all',
                width: '100%',
                maxWidth: Math.min(Math.max(vw * 0.88, 280), 380),
                background: 'rgba(2,20,12,0.94)',
                backdropFilter: 'blur(24px)',
                borderRadius: 22,
                padding: vw < 400 ? '30px 22px 26px' : '40px 36px 34px',
                border: '1px solid rgba(52,211,153,0.18)',
                boxShadow: [
                  '0 0 0 1px rgba(52,211,153,0.06)',
                  '0 2px 0 rgba(74,222,128,0.25)',
                  '0 32px 90px rgba(0,0,0,0.75)',
                  '0 0 100px rgba(52,211,153,0.07)',
                ].join(', '),
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 9, height: 9, borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 10px #4ade80, 0 0 20px rgba(74,222,128,0.5)',
                  }} />
                  <h2 style={{
                    fontSize: vw < 400 ? 22 : 28,
                    fontWeight: 900, color: '#ecfdf5',
                    letterSpacing: '-0.03em', fontStyle: 'italic',
                    margin: 0, lineHeight: 1,
                  }}>
                    Sign In
                  </h2>
                </div>
                <p style={{
                  fontSize: 11, color: '#34d399', margin: '0 0 0 19px',
                  letterSpacing: '0.06em', opacity: 0.65,
                  fontFamily: "'Courier New', monospace",
                }}>
                  Lamp is on — welcome back
                </p>
              </div>

              {/* Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Field label="Username" type="text" placeholder="Enter your name" />
                <Field label="Password" type="password" placeholder="••••••••" />

                {/* Options row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: -6 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
                    <input type="checkbox" style={{ accentColor: '#4ade80', width: 14, height: 14 }} />
                    <span style={{ fontSize: 11, color: '#6ee7b7', fontFamily: "'Courier New', monospace" }}>Remember me</span>
                  </label>
                  <a href="#" onClick={e=>e.preventDefault()} style={{ fontSize: 11, color: '#4ade80', textDecoration: 'none', fontFamily: "'Courier New', monospace" }}>
                    Forgot?
                  </a>
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={e => e.preventDefault()}
                  style={{
                    width: '100%', padding: '14px 0', marginTop: 2,
                    background: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',
                    color: '#4ade80', fontWeight: 800, fontSize: 12,
                    letterSpacing: '0.22em', border: '1px solid rgba(74,222,128,0.28)',
                    borderRadius: 12, cursor: 'pointer',
                    fontFamily: "'Courier New', monospace", textTransform: 'uppercase',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(74,222,128,0.08)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #166534 0%, #15803d 100%)';
                    e.currentTarget.style.color = '#ecfdf5';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(74,222,128,0.28), inset 0 1px 0 rgba(255,255,255,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #052e16 0%, #14532d 100%)';
                    e.currentTarget.style.color = '#4ade80';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(74,222,128,0.08)';
                  }}
                >
                  Enter
                </motion.button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(52,211,153,0.1)' }} />
                  <span style={{ fontSize: 10, color: '#065f46', fontFamily: "'Courier New', monospace" }}>or</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(52,211,153,0.1)' }} />
                </div>

                <p style={{ textAlign: 'center', fontSize: 12, color: '#6b7280', margin: 0, fontFamily: "'Courier New', monospace" }}>
                  No account?{' '}
                  <a href="#" onClick={e=>e.preventDefault()} style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 700 }}>
                    Create one
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Off-state hint */}
        <AnimatePresence>
          {!isOn && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                pointerEvents: 'none',
                color: '#1a4731', fontSize: 12,
                letterSpacing: '0.16em',
                fontFamily: "'Courier New', monospace",
                textAlign: 'center', margin: 0,
              }}
            >
              Turn on the lamp to begin
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
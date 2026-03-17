import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  Mail, Lock, User, Eye, EyeOff,
  Github, Chrome, Linkedin,
  ArrowRight, CheckCircle2, Loader2
} from 'lucide-react';

/* ── Google Fonts injected once ── */
const injectFonts = () => {
  if (document.getElementById('auth-fonts')) return;
  const link = document.createElement('link');
  link.id = 'auth-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap';
  document.head.appendChild(link);
};

/* ══════════════════════════════════════════════
   3-D PARTICLE CANVAS BACKGROUND
   Mouse moves tilt the entire particle field
══════════════════════════════════════════════ */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    /* ── Floating orbs (large blurred spheres giving 3-D depth) ── */
    const orbs = [
      { x: W * 0.15, y: H * 0.25, r: 320, color: '99,102,241', speed: 0.18, angle: 0 },
      { x: W * 0.80, y: H * 0.20, r: 260, color: '139,92,246', speed: 0.12, angle: 1.2 },
      { x: W * 0.55, y: H * 0.75, r: 300, color: '79,70,229',  speed: 0.15, angle: 2.4 },
      { x: W * 0.05, y: H * 0.70, r: 200, color: '167,139,250',speed: 0.22, angle: 3.6 },
      { x: W * 0.92, y: H * 0.75, r: 240, color: '109,40,217', speed: 0.10, angle: 0.7 },
    ];

    /* ── Star / particle field ── */
    const COUNT = 160;
    const stars = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * W,           // depth
      size: Math.random() * 1.6 + 0.3,
      brightness: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    /* ── Grid lines (perspective grid on floor) ── */
    const GRID_LINES = 14;

    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / W - 0.5) * 2;   // -1 to 1
      mouse.current.y = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      /* ── Background base ── */
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   '#07071a');
      bg.addColorStop(0.5, '#0d0b2b');
      bg.addColorStop(1,   '#120820');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const mx = mouse.current.x * 30;   // pixel shift from mouse
      const my = mouse.current.y * 20;

      /* ── Animated floating orbs ── */
      orbs.forEach((o, i) => {
        o.angle += o.speed * 0.01;
        const ox = o.x + Math.cos(o.angle) * 60 + mx * (0.04 + i * 0.012);
        const oy = o.y + Math.sin(o.angle * 0.7) * 45 + my * (0.03 + i * 0.01);

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        grad.addColorStop(0,   `rgba(${o.color},0.22)`);
        grad.addColorStop(0.5, `rgba(${o.color},0.08)`);
        grad.addColorStop(1,   `rgba(${o.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── Perspective grid ── */
      const horizon = H * 0.52 + my * 4;
      const vanishX  = W * 0.5 + mx * 3;

      ctx.save();
      ctx.globalAlpha = 0.13;
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 0.7;

      // vertical lines
      for (let i = 0; i <= GRID_LINES; i++) {
        const xBase = (i / GRID_LINES) * W;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(xBase, H);
        ctx.stroke();
      }
      // horizontal lines (log-spaced for perspective)
      for (let j = 1; j <= 10; j++) {
        const p = Math.pow(j / 10, 1.8);
        const y = horizon + p * (H - horizon);
        const xLeft  = vanishX - (vanishX) * p;
        const xRight = vanishX + (W - vanishX) * p;
        ctx.beginPath();
        ctx.moveTo(xLeft, y);
        ctx.lineTo(xRight, y);
        ctx.stroke();
      }
      ctx.restore();

      /* ── Stars ── */
      stars.forEach((s) => {
        // parallax shift by depth
        const depth = s.z / W;
        const sx = s.x + mx * depth * 18;
        const sy = s.y + my * depth * 12;
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(t * 60 * s.twinkleSpeed + s.twinkleOffset));
        const alpha = s.brightness * twinkle;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#c4b5fd';
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ── Subtle scan-line vignette ── */
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
};

/* ══════════════════════════════════════════════
   FLOATING INPUT
══════════════════════════════════════════════ */
const FloatingInput = ({ label, type, icon: Icon, value, onChange, id, showPasswordToggle = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const inputType = showPasswordToggle ? (showPass ? 'text' : 'password') : type;
  const active = isFocused || Boolean(value);

  return (
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      {/* icon */}
      <span style={{
        position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
        color: isFocused ? '#a78bfa' : '#64748b',
        transition: 'color 0.2s', pointerEvents: 'none', display: 'flex', zIndex: 2,
      }}>
        <Icon size={16} />
      </span>

      <input
        id={id} type={inputType} value={value} onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        style={{
          width: '100%', boxSizing: 'border-box',
          background: isFocused ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isFocused ? 'rgba(167,139,250,0.7)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '0.9rem',
          padding: '1.15rem 3rem 0.5rem 2.7rem',
          color: '#f1f5f9',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.94rem', fontWeight: 400,
          outline: 'none',
          transition: 'all 0.25s',
          boxShadow: isFocused
            ? '0 0 0 3px rgba(139,92,246,0.18), 0 4px 24px rgba(99,102,241,0.12)'
            : 'none',
        }}
      />

      <label htmlFor={id} style={{
        position: 'absolute', left: '2.7rem',
        fontFamily: "'Outfit', sans-serif",
        pointerEvents: 'none',
        transition: 'all 0.22s cubic-bezier(.4,0,.2,1)',
        ...(active
          ? { top: '0.4rem', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#a78bfa' }
          : { top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem', color: '#64748b' }
        ),
      }}>
        {label}
      </label>

      {showPasswordToggle && (
        <button type="button" onClick={() => setShowPass(!showPass)} style={{
          position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', color: '#64748b', cursor: 'pointer',
          padding: 0, display: 'flex', alignItems: 'center',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
        >
          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════
   SOCIAL BUTTON
══════════════════════════════════════════════ */
const SocialButton = ({ icon: Icon, label }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
        padding: '0.65rem 0.3rem', borderRadius: '0.85rem',
        background: hov ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.09)'}`,
        color: '#e2e8f0', cursor: 'pointer',
        fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', fontWeight: 500,
        transform: hov ? 'translateY(-2px) scale(1.03)' : 'none',
        transition: 'all 0.2s ease',
        boxShadow: hov ? '0 4px 18px rgba(99,102,241,0.2)' : 'none',
      }}
    >
      <Icon size={16} style={{ color: hov ? '#a78bfa' : '#64748b', transition: 'color 0.2s', flexShrink: 0 }} />
      <span>{label}</span>
    </button>
  );
};

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [mode, setMode] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', confirmPassword: '' });

  const cardRef   = useRef(null);
  const contentRef = useRef(null);
  const loaded    = useRef(false);

  useEffect(() => { injectFonts(); }, []);

  /* ── Page-load: window-snap-open ── */
  useEffect(() => {
    if (loaded.current || !cardRef.current) return;
    loaded.current = true;
    gsap.set(cardRef.current, { opacity: 0 });
    gsap.fromTo(
      cardRef.current,
      { scale: 0.55, opacity: 0, y: -70, rotateX: 20, rotateY: -8 },
      { scale: 1,    opacity: 1, y: 0,   rotateX: 0,  rotateY: 0,
        duration: 0.85, ease: 'back.out(1.6)', delay: 0.25 }
    );
  }, []);

  /* ── Toggle: slide-out ── */
  const handleToggle = useCallback(() => {
    const next = mode === 'login' ? 'signup' : 'login';
    gsap.to(contentRef.current, {
      opacity: 0, x: mode === 'login' ? -32 : 32,
      duration: 0.27, ease: 'power2.in',
      onComplete: () => setMode(next),
    });
  }, [mode]);

  /* ── Toggle: slide-in ── */
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: mode === 'login' ? 32 : -32 },
      { opacity: 1, x: 0, duration: 0.42, ease: 'power2.out' }
    );
  }, [mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false); setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  const F = { fontFamily: "'Outfit', sans-serif" };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spinAnim { to { transform: rotate(360deg); } }
        .spin-icon { animation: spinAnim 1s linear infinite; }
        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0f0c2a inset !important;
          -webkit-text-fill-color: #f1f5f9 !important;
          caret-color: #f1f5f9;
        }
        ::-webkit-scrollbar { width: 4px; background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 2px; }
      `}</style>

      {/* ── Live 3D canvas ── */}
      <ParticleCanvas />

      {/* ── Page wrapper ── */}
      <main style={{
        position: 'relative', zIndex: 1,
        minHeight: '100vh', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        perspective: '1000px',
      }}>

        {/* ── Glass card ── */}
        <div ref={cardRef} style={{
          width: '100%', maxWidth: '455px',
          background: 'rgba(15,12,42,0.65)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(167,139,250,0.18)',
          borderRadius: '1.75rem',
          padding: 'clamp(1.75rem, 5vw, 2.5rem)',
          boxShadow: `
            0 2px 0 rgba(167,139,250,0.12) inset,
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 80px rgba(0,0,0,0.7),
            0 0 60px rgba(99,102,241,0.1)
          `,
          opacity: 0,
        }}>
          <div ref={contentRef}>

            {/* Heading */}
            <div style={{ marginBottom: '1.6rem' }}>
              {/* small eyebrow */}
              <p style={{ ...F, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: '0.4rem' }}>
                {mode === 'login' ? '— Secure Login' : '— New Account'}
              </p>
              <h1 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(1.85rem, 5vw, 2.35rem)',
                fontWeight: 400, color: '#f1f5f9',
                lineHeight: 1.12, letterSpacing: '-0.01em',
                marginBottom: '0.4rem',
              }}>
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p style={{ ...F, fontSize: '0.85rem', color: '#64748b', fontWeight: 400 }}>
                {mode === 'login'
                  ? 'Enter your credentials to continue'
                  : 'Join our community and start today'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <FloatingInput id="fullName" label="Full Name" type="text" icon={User}
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
              )}
              <FloatingInput id="email" label="Email Address" type="email" icon={Mail}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
              <FloatingInput id="password" label="Password" type="password" icon={Lock}
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                showPasswordToggle
              />
              {mode === 'signup' && (
                <FloatingInput id="confirmPassword" label="Confirm Password" type="password" icon={Lock}
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  showPasswordToggle
                />
              )}

              {/* Remember / Forgot */}
              {mode === 'login' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.3rem 0 0.9rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ accentColor: '#7c3aed', width: '0.88rem', height: '0.88rem' }} />
                    <span style={{ ...F, fontSize: '0.78rem', color: '#64748b' }}>Remember me</span>
                  </label>
                  <button type="button" style={{
                    background: 'none', border: 'none', ...F,
                    fontSize: '0.78rem', fontWeight: 600, color: '#a78bfa', cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                    onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                style={{
                  width: '100%', padding: '0.95rem',
                  borderRadius: '0.9rem', border: 'none',
                  background: isSuccess
                    ? 'linear-gradient(135deg,#059669,#10b981)'
                    : 'linear-gradient(135deg,#5b21b6,#4f46e5,#7c3aed)',
                  backgroundSize: '200% 200%',
                  color: '#fff', ...F,
                  fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.04em',
                  cursor: isSubmitting || isSuccess ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  boxShadow: isSuccess
                    ? '0 4px 20px rgba(16,185,129,0.4)'
                    : '0 4px 28px rgba(99,102,241,0.45)',
                  transition: 'transform 0.15s, box-shadow 0.25s, background 0.4s',
                  marginTop: '0.25rem',
                }}
                onMouseEnter={e => { if (!isSubmitting && !isSuccess) { e.currentTarget.style.transform = 'translateY(-2px) scale(1.015)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(99,102,241,0.55)'; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = isSuccess ? '0 4px 20px rgba(16,185,129,0.4)' : '0 4px 28px rgba(99,102,241,0.45)'; }}
                onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.015)'; }}
              >
                {isSubmitting
                  ? <Loader2 size={19} className="spin-icon" />
                  : isSuccess
                    ? <><CheckCircle2 size={19} /><span>Success!</span></>
                    : <><span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span><ArrowRight size={17} /></>
                }
              </button>
            </form>

            {/* Divider */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '1.4rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ ...F, padding: '0 0.9rem', fontSize: '0.63rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#475569', fontWeight: 600 }}>
                Or continue with
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            </div>

            {/* Social */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.6rem' }}>
              <SocialButton icon={Chrome} label="Google" />
              <SocialButton icon={Github} label="GitHub" />
              <SocialButton icon={Linkedin} label="LinkedIn" />
            </div>

            {/* Toggle */}
            <p style={{ ...F, marginTop: '1.5rem', textAlign: 'center', fontSize: '0.82rem', color: '#64748b' }}>
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={handleToggle} style={{
                background: 'none', border: 'none', ...F,
                fontSize: '0.82rem', fontWeight: 700, color: '#a78bfa', cursor: 'pointer',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>

          </div>
        </div>
      </main>

      {/* Footer */}
      <div style={{
        position: 'fixed', bottom: '1.2rem',
        left: '50%', transform: 'translateX(-50%)',
        ...F, fontSize: '0.6rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', color: '#334155', whiteSpace: 'nowrap',
        zIndex: 2,
      }}>
        © 2026 Lumina Systems · Secure Authentication
      </div>
    </>
  );
}
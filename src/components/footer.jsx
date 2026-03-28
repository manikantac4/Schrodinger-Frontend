import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowRight, ExternalLink } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared data
// ─────────────────────────────────────────────────────────────────────────────
const SOCIALS = [
  { name: 'X',         href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.844l4.255 5.626 5.895-5.626Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg> },
  { name: 'LinkedIn',  href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'GitHub',    href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { name: 'Instagram', href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { name: 'YouTube',   href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { name: 'Facebook',  href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: 'Discord',   href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.104 13.201 13.201 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg> },
  { name: 'Telegram',  href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { name: 'WhatsApp',  href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { name: 'Google',    href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg> },
  { name: 'Slack',     href: '#', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z"/></svg> },
];

const COLUMNS = [
  { title: 'Product',   links: ['Overview', 'Features', 'Pricing', 'Changelog', 'Roadmap'] },
  { title: 'Solutions', links: ['Enterprise', 'Startups', 'Finance', 'Supply Chain', 'Retail'] },
  { title: 'Resources', links: ['Blog', 'Use Cases', 'Documentation', 'Testimonials', 'Insights'] },
  { title: 'Company',   links: ['About Us', 'Team', 'Careers', 'Activity', 'Contact'] },
  { title: 'Legal',     links: ['Terms & Conditions', 'Privacy Policy', 'Cookies', 'Refunds', 'License'] },
];

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ width: 22, height: 22, background: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 11, height: 11, background: '#000', borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '0.92rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E2E8F0' }}>
        Sentinel
      </span>
    </div>
  );
}

function SocialIcons({ size = 14 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
      {SOCIALS.map(s => (
        <motion.a key={s.name} href={s.href} aria-label={s.name} title={s.name}
          whileHover={{ scale: 1.22, color: '#F97316' }}
          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d3748', borderRadius: 6, cursor: 'pointer', textDecoration: 'none', transition: 'color 0.2s' }}
        >{s.icon}</motion.a>
      ))}
    </div>
  );
}

function SheetWrap({ children, inView }) {
  return (
    <div style={{ position: 'relative', background: 'transparent', overflow: 'hidden' }}>
      <motion.footer
        style={{ position: 'relative', background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', willChange: 'transform, border-radius' }}
        initial={{ y: '14%', opacity: 0.4, borderRadius: '36px 36px 0 0' }}
        animate={inView ? { y: '0%', opacity: 1, borderRadius: '28px 28px 0 0' } : { y: '14%', opacity: 0.4, borderRadius: '36px 36px 0 0' }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* shimmer edge */}
        <div aria-hidden style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 35%, rgba(249,115,22,0.25) 55%, rgba(255,255,255,0.14) 75%, transparent 100%)', borderRadius: 999, pointerEvents: 'none', zIndex: 2 }} />
        {/* glow */}
        <div aria-hidden style={{ position: 'absolute', top: -140, left: '50%', transform: 'translateX(-50%)', width: 700, height: 340, background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.06) 0%, transparent 68%)', pointerEvents: 'none', zIndex: 0 }} />
        {children}
      </motion.footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Newsletter input (shared)
// ─────────────────────────────────────────────────────────────────────────────
function Newsletter({ compact = false }) {
  const [email, setEmail]         = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState('');

  const handleSubmit = () => {
    if (!email || !email.includes('@')) { setError('Enter a valid email'); return; }
    setError('');
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setEmail(''); }, 3500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {!compact && <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.88rem', color: '#E2E8F0', margin: 0 }}>Stay ahead of the curve</p>}
      {!compact && <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0 }}>Weekly signals, no noise.</p>}
      <div style={{ display: 'flex', gap: '0.4rem', marginTop: compact ? 0 : '0.15rem' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '0 0.65rem' }}>
          <Mail size={12} style={{ color: '#475569', flexShrink: 0 }} />
          <input type="email" placeholder="your@email.com" value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#E2E8F0', fontSize: '0.82rem', fontFamily: "'DM Sans',sans-serif", padding: '0.52rem 0' }}
          />
        </div>
        <motion.button onClick={handleSubmit} whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}
          style={submitted
            ? { width: 34, height: 34, flexShrink: 0, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F97316', cursor: 'default', fontSize: '0.85rem' }
            : { width: 34, height: 34, flexShrink: 0, background: 'linear-gradient(135deg,#F97316,#F59E0B)', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', cursor: 'pointer' }
          }
        >{submitted ? '✓' : <ArrowRight size={14} />}</motion.button>
      </div>
      {error     && <p style={{ fontSize: '0.72rem', color: '#ef4444', margin: 0 }}>{error}</p>}
      {submitted && <p style={{ fontSize: '0.72rem', color: '#F97316', margin: 0 }}>You're in! 🎯</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED FOOTER CONTENT — used by both desktop and mobile
// ─────────────────────────────────────────────────────────────────────────────
function FooterContent({ inView }) {
  const divider = <div style={{ height: 1, background: 'rgba(255,255,255,0.055)', margin: '2.25rem 0' }} />;

  return (
    <SheetWrap inView={inView}>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '3.5rem 2rem 2rem', fontFamily: "'DM Sans',sans-serif" }}>

        {/* TOP ROW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', minWidth: 180 }}>
            <Logo />
            <p style={{ fontSize: '0.84rem', lineHeight: 1.65, color: '#475569', margin: 0 }}>Predict risks. Act early.<br />Protect your business.</p>
            <a href="mailto:world@sentinel.ai" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#475569', textDecoration: 'none' }}>
              <Mail size={12} style={{ opacity: 0.4, flexShrink: 0 }} /> world@sentinel.ai
            </a>
          </div>
          <div style={{ minWidth: 240, flex: '0 0 auto' }}><Newsletter /></div>
        </div>

        {divider}

        {/* LINK GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.8rem 0.5rem' }}>
          {COLUMNS.map(col => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.15rem' }}>{col.title}</p>
              {col.links.map(link => (
                <a key={link} href="#" style={{ fontSize: '0.82rem', color: '#475569', transition: 'color 0.18s', lineHeight: 1.5, textDecoration: 'none', display: 'block' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#CBD5E1'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>

        {divider}

        {/* BOTTOM */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.77rem', color: '#2d3748', margin: 0 }}>© 2025 Sentinel. All rights reserved.</p>
          <SocialIcons />
        </div>

      </div>
    </SheetWrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT — same layout on all screen sizes
// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=DM+Sans:wght@400;500&display=swap');
        footer a { text-decoration: none; }

        @media (max-width: 767px) {
          /* Stack top row vertically on small screens */
          .footer-top-row {
            flex-direction: column !important;
          }
          /* Link grid: 2 columns on mobile instead of 5 */
          .footer-link-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          /* Single column on very small screens */
          .footer-link-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* sentinel div just for the inView trigger */}
      <div ref={ref} style={{ position: 'absolute', pointerEvents: 'none' }} />

      <SheetWrap inView={inView}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '3.5rem 2rem 2rem', fontFamily: "'DM Sans',sans-serif" }}>

          {/* TOP ROW */}
          <div className="footer-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', minWidth: 180 }}>
              <Logo />
              <p style={{ fontSize: '0.84rem', lineHeight: 1.65, color: '#475569', margin: 0 }}>Predict risks. Act early.<br />Protect your business.</p>
              <a href="mailto:world@sentinel.ai" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#475569', textDecoration: 'none' }}>
                <Mail size={12} style={{ opacity: 0.4, flexShrink: 0 }} /> world@sentinel.ai
              </a>
            </div>
            <div style={{ minWidth: 240 }}><Newsletter /></div>
          </div>

          {/* DIVIDER */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.055)', margin: '2.25rem 0' }} />

          {/* LINK GRID */}
          <div className="footer-link-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.8rem 0.5rem' }}>
            {COLUMNS.map(col => (
              <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 0.15rem' }}>{col.title}</p>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ fontSize: '0.82rem', color: '#475569', transition: 'color 0.18s', lineHeight: 1.5, textDecoration: 'none', display: 'block' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#CBD5E1'}
                    onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.055)', margin: '2.25rem 0' }} />

          {/* BOTTOM */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '0.77rem', color: '#2d3748', margin: 0 }}>© 2025 Sentinel. All rights reserved.</p>
            <SocialIcons />
          </div>

        </div>
      </SheetWrap>
    </>
  );
}
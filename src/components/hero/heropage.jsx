import { useEffect, useState } from "react";
import Navbar from "./navbar";
import HeroBackground from "./herobackground";

/* ── Floating glass data card ── */
function DataCard({ children, className = "", style = {}, delay = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`absolute hidden md:block transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "14px",
        padding: "14px 18px",
        animation: `float ${3 + Math.random()}s ease-in-out infinite`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function HeroPage() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 700),
      setTimeout(() => setPhase(4), 1000),
      setTimeout(() => setPhase(5), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,300;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
          70%  { box-shadow: 0 0 0 12px rgba(249,115,22,0); }
          100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-inner {
          animation: ticker 22s linear infinite;
          white-space: nowrap;
          display: flex;
          gap: 48px;
        }
        .entry-0 {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .entry-1 { opacity: 1; transform: translateY(0); }

        /* ── CTA tempt loop: idle 7s → wiggle+glow → breathe, every 10s ── */
        @keyframes cta-tempt {
          0%   { transform: scale(1);    box-shadow: 0 0 32px rgba(249,115,22,0.30); }
          70%  { transform: scale(1);    box-shadow: 0 0 32px rgba(249,115,22,0.30); }
          73%  { transform: scale(1.07); box-shadow: 0 0 56px rgba(249,115,22,0.78); }
          76%  { transform: scale(0.97); box-shadow: 0 0 20px rgba(249,115,22,0.35); }
          79%  { transform: scale(1.06); box-shadow: 0 0 68px rgba(249,115,22,0.90); }
          83%  { transform: scale(1.02); box-shadow: 0 0 44px rgba(249,115,22,0.55); }
          88%  { transform: scale(1.04); box-shadow: 0 0 52px rgba(249,115,22,0.62); }
          93%  { transform: scale(1.01); box-shadow: 0 0 36px rgba(249,115,22,0.40); }
          100% { transform: scale(1);    box-shadow: 0 0 32px rgba(249,115,22,0.30); }
        }
        .cta-primary {
          animation: cta-tempt 10s ease-in-out infinite;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-primary:hover {
          animation: none;
          transform: scale(1.08) !important;
          box-shadow: 0 0 80px rgba(249,115,22,0.95) !important;
        }

        /* Arrow nudge synced with tempt cycle */
        @keyframes arrow-nudge {
          0%, 70% { transform: translateX(0); }
          74%     { transform: translateX(6px); }
          77%     { transform: translateX(-2px); }
          80%     { transform: translateX(5px); }
          84%     { transform: translateX(0); }
          100%    { transform: translateX(0); }
        }
        .cta-arrow { animation: arrow-nudge 10s ease-in-out infinite; }
        .cta-primary:hover .cta-arrow {
          animation: none;
          transform: translateX(5px);
          transition: transform 0.2s ease;
        }

        /* Warning line subtle amber flash */
        @keyframes warn-flash {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }
        .warn-text { animation: warn-flash 2.6s ease-in-out infinite; }

        /* Demo button hover */
        .cta-demo {
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .cta-demo:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.28) !important;
          color: #ffffff !important;
          transform: scale(1.04);
        }
      `}</style>

      <Navbar />

      {/* ── Hero wrapper ── */}
      <section
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <HeroBackground />

        {/* ── Floating data card — top left ── */}
        <DataCard className="left-[5%] lg:left-[8%] top-[28%]" delay={1400} style={{ minWidth: 180 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Crude Oil</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-red-400" style={{ background: "rgba(239,68,68,0.12)" }}>HIGH</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-white text-lg font-bold">$94.20</span>
            <span className="text-xs text-red-400 font-medium">↑ 3.4%</span>
          </div>
          <div className="mt-2 text-[10px] text-zinc-500">Impact on logistics: +₹2.1Cr</div>
        </DataCard>

        {/* ── Floating data card — bottom right ── */}
        <DataCard className="right-[5%] lg:right-[8%] bottom-[22%]" delay={1700} style={{ minWidth: 200, animationDelay: "1.2s" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">INR/USD</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-amber-400" style={{ background: "rgba(245,158,11,0.12)" }}>WATCH</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-zinc-500 line-through text-sm">₹83.0</span>
            <span className="text-white text-lg font-bold">₹85.4</span>
          </div>
          <div className="mt-2 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full" style={{ width: "72%", background: "linear-gradient(90deg, #f59e0b, #ef4444)" }} />
          </div>
          <div className="mt-1.5 text-[10px] text-zinc-500">Export margin pressure: Medium</div>
        </DataCard>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-25">

          {/* Badge */}
          <div className={`entry-0 ${phase >= 1 ? "entry-1" : ""} mb-7`} style={{ transitionDelay: "0ms" }}>
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
              style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "#fb923c", letterSpacing: "0.12em" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" style={{ animation: "pulse-ring 2s ease infinite" }} />
              AI-Powered Business Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`entry-0 ${phase >= 2 ? "entry-1" : ""} text-white leading-none mb-6`}
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 400, letterSpacing: "-0.02em", transitionDelay: "80ms" }}
          >
            The World Moves.{" "}
            <em className="not-italic" style={{ background: "linear-gradient(135deg, #f97316 0%, #fbbf24 60%, #ef4444 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              We Predict
            </em>
            <br />
            What It Means for You.
          </h1>

          {/* ── Subtext — brighter, text-shadow for legibility over video ── */}
          <p
            className={`entry-0 ${phase >= 3 ? "entry-1" : ""} max-w-xl mx-auto mb-4`}
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.18rem)",
              lineHeight: "1.7",
              fontWeight: 400,
              color: "#d4d4d8",
              textShadow: "0 1px 12px rgba(0,0,0,0.9), 0 2px 24px rgba(0,0,0,0.7)",
              transitionDelay: "120ms",
            }}
          >
            Turn global events into clear business decisions —{" "}
            <span style={{ color: "#ffffff", fontWeight: 600 }}>before they impact you.</span>
          </p>

          {/* ── Warning line — visible amber, text-shadow ── */}
          <div
            className={`entry-0 ${phase >= 3 ? "entry-1" : ""} flex items-center gap-2 mb-10`}
            style={{ transitionDelay: "180ms" }}
          >
            <span className="text-amber-400 text-sm warn-text">⚠</span>
            <span
              className="warn-text text-sm font-semibold"
              style={{ color: "#a1a1aa", textShadow: "0 1px 10px rgba(0,0,0,0.95), 0 2px 20px rgba(0,0,0,0.8)" }}
            >
              Most businesses react too late.{" "}
              <span style={{ color: "#f59e0b" }}>Stay ahead.</span>
            </span>
          </div>

          {/* ── CTAs ── */}
          <div
            className={`entry-0 ${phase >= 4 ? "entry-1" : ""} flex flex-col sm:flex-row items-center gap-4`}
            style={{ transitionDelay: "220ms" }}
          >
            {/* Primary — tempt animation */}
            <button
              className="cta-primary group relative flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
                letterSpacing: "0.01em",
              }}
            >
              <span>See Your Business Impact</span>
              <svg
                className="cta-arrow w-4 h-4"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            {/* Secondary — glass demo button */}
            <button
              className="cta-demo group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(12px)",
                color: "#a1a1aa",
                letterSpacing: "0.01em",
              }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <svg className="w-3 h-3 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Demo
            </button>
          </div>

          {/* Trusted by — ticker */}
          <div
            className={`entry-0 ${phase >= 5 ? "entry-1" : ""} mt-16 w-full max-w-2xl overflow-hidden`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest mb-5 font-medium">
              Trusted by forward-thinking teams
            </p>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10" style={{ background: "linear-gradient(to right, black, transparent)" }} />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10" style={{ background: "linear-gradient(to left, black, transparent)" }} />
              <div className="ticker-inner">
                {["Accenture","Deloitte","HDFC Bank","Tata Steel","Infosys","Mahindra","Bajaj Finance","L&T",
                  "Accenture","Deloitte","HDFC Bank","Tata Steel","Infosys","Mahindra","Bajaj Finance","L&T"].map((name, i) => (
                  <span key={i} className="text-zinc-700 font-semibold text-sm hover:text-zinc-400 transition-colors cursor-default" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

       
      </section>
    </>
  );
}
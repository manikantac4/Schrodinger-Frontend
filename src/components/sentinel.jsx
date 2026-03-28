// import { useEffect, useRef, useState } from "react";
// import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";

// /* ─── Google Fonts ─────────────────────────────────────────────────────────── */
// const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');`;

// /* ─── Pipeline Steps ────────────────────────────────────────────────────────── */
// const STEPS = [
//   {
//     id: "s1",
//     num: "01",
//     title: "Business Context",
//     subtitle: "Grounding the system",
//     shape: "circle",
//     side: "left",
//     image: "step1.png",
//     color: "#fbbf24",
//     glow: "rgba(251,191,36,0.5)",
//     details: [
//       { label: "Industry", value: "Manufacturing / FMCG" },
//       { label: "Location", value: "Region-aware" },
//       { label: "Financial Signals", value: "P&L, margins, budgets" },
//       { label: "Supply Dependencies", value: "Vendor chains, SLAs" },
//       { label: "Risk Buffer", value: "Configurable thresholds" },
//     ],
//   },
//   {
//     id: "s2",
//     num: "02",
//     title: "Signal Collection",
//     subtitle: "World data ingested live",
//     shape: "hexagon",
//     side: "right",
//     image: "step2.png",
//     color: "#fb923c",
//     glow: "rgba(249,115,22,0.5)",
//     details: [
//       { label: "News Sources", value: "Reuters, Bloomberg, Mint, ET, Hindu BL, Moneycontrol" },
//       { label: "Commodity Feeds", value: "MCX, NCDEX, global indices" },
//       { label: "Policy Updates", value: "RBI, GST council, MoF" },
//       { label: "Market Signals", value: "Futures, spot pricing" },
//     ],
//   },
//   {
//     id: "s3",
//     num: "03",
//     title: "ML Processing",
//     subtitle: "Raw noise → structured signals",
//     shape: "diamond",
//     side: "left",
//     image: "step3.png",
//     color: "#f97316",
//     glow: "rgba(249,115,22,0.55)",
//     details: [
//       { label: "Data Cleaning", value: "Dedup, normalization, gaps" },
//       { label: "Signal Structuring", value: "Event tagging, timelines" },
//       { label: "Feature Extraction", value: "Trend vectors, volatility" },
//       { label: "AI Pre-processing", value: "Embedding & context prep" },
//     ],
//   },
//   {
//     id: "s4",
//     num: "04",
//     title: "LLM Intelligence",
//     subtitle: "Deep reasoning engine",
//     shape: "large-circle",
//     side: "center",
//     image: "step4.png",
//     color: "#fbbf24",
//     glow: "rgba(251,191,36,0.7)",
//     details: [
//       { label: "Context Understanding", value: "Business + market fusion" },
//       { label: "Reasoning", value: "Multi-hop causal chains" },
//       { label: "Impact Mapping", value: "Cost / revenue deltas" },
//       { label: "Decision Generation", value: "Action-ranked outputs" },
//     ],
//   },
//   {
//     id: "s5",
//     num: "05",
//     title: "Outputs",
//     subtitle: "Intelligence delivered",
//     shape: "split",
//     side: "split",
//     image: "step5.png",
//     color: "#fbbf24",
//     glow: "rgba(251,191,36,0.45)",
//     left: {
//       title: "Impact Insights",
//       items: ["Cost delta estimates", "Opportunity windows", "Risk exposure scores", "Trend projections"],
//     },
//     right: {
//       title: "Recommended Actions",
//       items: ["Procurement timing", "Vendor switch triggers", "Budget reallocation", "Executive alerts"],
//     },
//   },
// ];

// /* ─── SVG Node Shapes ───────────────────────────────────────────────────────── */
// function NodeShape({ shape, color, glow, active, size = 48 }) {
//   const s = size;
//   const pulse = active
//     ? { boxShadow: `0 0 0 0 ${glow}`, animation: "snp-pulse 2s ease-in-out infinite" }
//     : {};

//   if (shape === "circle" || shape === "large-circle") {
//     const r = shape === "large-circle" ? s * 0.75 : s * 0.5;
//     return (
//       <svg width={s * 1.5} height={s * 1.5} viewBox={`0 0 ${s * 1.5} ${s * 1.5}`}>
//         <defs>
//           <radialGradient id={`ng-${shape}`} cx="50%" cy="35%" r="60%">
//             <stop offset="0%" stopColor={color} stopOpacity="0.9" />
//             <stop offset="100%" stopColor={color} stopOpacity="0.3" />
//           </radialGradient>
//           <filter id={`gf-${shape}`}>
//             <feGaussianBlur stdDeviation={active ? "6" : "3"} result="blur" />
//             <feComposite in="SourceGraphic" in2="blur" operator="over" />
//           </filter>
//         </defs>
//         {active && (
//           <circle cx={s * 0.75} cy={s * 0.75} r={r + 14} fill={glow} opacity="0.25">
//             <animate attributeName="r" values={`${r + 8};${r + 20};${r + 8}`} dur="2.5s" repeatCount="indefinite" />
//             <animate attributeName="opacity" values="0.3;0.08;0.3" dur="2.5s" repeatCount="indefinite" />
//           </circle>
//         )}
//         <circle cx={s * 0.75} cy={s * 0.75} r={r} fill={`url(#ng-${shape})`} opacity={active ? 1 : 0.5} />
//         <circle cx={s * 0.75} cy={s * 0.75} r={r} fill="none" stroke={color} strokeWidth={active ? "1.5" : "0.8"} opacity={active ? 0.8 : 0.3} />
//         {shape === "large-circle" && (
//           <circle cx={s * 0.75} cy={s * 0.75} r={r * 0.55} fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="4 4" opacity={active ? 0.6 : 0.2} />
//         )}
//       </svg>
//     );
//   }

//   if (shape === "hexagon") {
//     const cx = s * 0.75, cy = s * 0.75, hr = s * 0.5;
//     const pts = Array.from({ length: 6 }, (_, i) => {
//       const a = (Math.PI / 180) * (60 * i - 30);
//       return `${cx + hr * Math.cos(a)},${cy + hr * Math.sin(a)}`;
//     }).join(" ");
//     return (
//       <svg width={s * 1.5} height={s * 1.5} viewBox={`0 0 ${s * 1.5} ${s * 1.5}`}>
//         <defs>
//           <radialGradient id="ng-hex" cx="50%" cy="35%" r="60%">
//             <stop offset="0%" stopColor={color} stopOpacity="0.85" />
//             <stop offset="100%" stopColor={color} stopOpacity="0.25" />
//           </radialGradient>
//         </defs>
//         {active && (
//           <polygon points={pts} fill={glow} opacity="0.18" transform={`scale(1.35) translate(${-cx * 0.26},${-cy * 0.26})`} />
//         )}
//         <polygon points={pts} fill="url(#ng-hex)" opacity={active ? 1 : 0.45} />
//         <polygon points={pts} fill="none" stroke={color} strokeWidth={active ? "1.5" : "0.8"} opacity={active ? 0.8 : 0.3} />
//       </svg>
//     );
//   }

//   if (shape === "diamond") {
//     const cx = s * 0.75, cy = s * 0.75, dr = s * 0.55;
//     const pts = `${cx},${cy - dr} ${cx + dr * 0.7},${cy} ${cx},${cy + dr} ${cx - dr * 0.7},${cy}`;
//     return (
//       <svg width={s * 1.5} height={s * 1.5} viewBox={`0 0 ${s * 1.5} ${s * 1.5}`}>
//         <defs>
//           <radialGradient id="ng-dia" cx="50%" cy="30%" r="60%">
//             <stop offset="0%" stopColor={color} stopOpacity="0.9" />
//             <stop offset="100%" stopColor={color} stopOpacity="0.25" />
//           </radialGradient>
//         </defs>
//         {active && (
//           <polygon points={pts} fill={glow} opacity="0.2" transform={`scale(1.4) translate(${-cx * 0.286},${-cy * 0.286})`} />
//         )}
//         <polygon points={pts} fill="url(#ng-dia)" opacity={active ? 1 : 0.45} />
//         <polygon points={pts} fill="none" stroke={color} strokeWidth={active ? "1.5" : "0.8"} opacity={active ? 0.8 : 0.3} />
//       </svg>
//     );
//   }

//   return null;
// }

// /* ─── Detail Card ───────────────────────────────────────────────────────────── */
// function DetailCard({ step, active, side }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: side === "left" ? -40 : 40, filter: "blur(8px)" }}
//       animate={active ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0.25, x: side === "left" ? -20 : 20, filter: "blur(3px)" }}
//       transition={{ duration: 0.55, ease: "easeOut" }}
//       style={{
//         background: "rgba(255,255,255,0.028)",
//         border: `1px solid ${active ? step.glow.replace("0.5", "0.35") : "rgba(255,255,255,0.055)"}`,
//         borderRadius: "0.85rem",
//         padding: "1.4rem 1.6rem",
//         backdropFilter: "blur(10px)",
//         boxShadow: active ? `0 0 32px ${step.glow.replace("0.5", "0.2")}` : "none",
//         minWidth: "220px",
//         maxWidth: "300px",
//         transition: "box-shadow 0.4s, border-color 0.4s",
//       }}
//     >
//       {/* Step number + label */}
//       <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
//         <span style={{
//           fontFamily: "'JetBrains Mono', monospace",
//           fontSize: "0.58rem",
//           letterSpacing: "0.18em",
//           color: active ? step.color : "rgba(255,255,255,0.3)",
//           textTransform: "uppercase",
//           transition: "color 0.35s",
//         }}>
//           STEP {step.num}
//         </span>
//         <div style={{ flex: 1, height: "1px", background: active ? `linear-gradient(90deg,${step.color},transparent)` : "rgba(255,255,255,0.08)" }} />
//       </div>

//       {/* Detail rows */}
//       <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
//         {step.details.map((d, i) => (
//           <div key={i}>
//             <div style={{
//               fontFamily: "'JetBrains Mono', monospace",
//               fontSize: "0.56rem",
//               color: active ? step.color : "rgba(255,255,255,0.25)",
//               letterSpacing: "0.12em",
//               textTransform: "uppercase",
//               marginBottom: "0.15rem",
//               transition: "color 0.35s",
//             }}>
//               {d.label}
//             </div>
//             <div style={{
//               fontFamily: "'DM Sans', sans-serif",
//               fontSize: "0.82rem",
//               color: active ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.22)",
//               fontWeight: 300,
//               lineHeight: 1.4,
//               transition: "color 0.35s",
//             }}>
//               {d.value}
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// /* ─── Image Placeholder ────────────────────────────────────────────────────── */
// function StepImage({ src, active, color, glow }) {
//   return (
//     <motion.div
//       animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.18, scale: 0.96 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       style={{
//         width: "100%",
//         maxWidth: "220px",
//         aspectRatio: "4/3",
//         borderRadius: "0.75rem",
//         background: "rgba(255,255,255,0.03)",
//         border: `1px solid ${active ? glow.replace("0.5", "0.25") : "rgba(255,255,255,0.06)"}`,
//         overflow: "hidden",
//         position: "relative",
//         boxShadow: active ? `0 0 24px ${glow.replace("0.5", "0.15")}` : "none",
//         transition: "box-shadow 0.4s, border-color 0.4s",
//       }}
//     >
//       <img
//         src={src}
//         alt=""
//         style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
//         onError={(e) => { e.target.style.display = "none"; }}
//       />
//       {/* Fallback visual if image missing */}
//       <div style={{
//         position: "absolute", inset: 0,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         flexDirection: "column", gap: "0.5rem",
//       }}>
//         <div style={{
//           width: "40px", height: "40px", borderRadius: "50%",
//           border: `1px solid ${color}`,
//           opacity: active ? 0.4 : 0.1,
//           boxShadow: active ? `0 0 20px ${glow}` : "none",
//         }} />
//         <span style={{
//           fontFamily: "'JetBrains Mono', monospace",
//           fontSize: "0.52rem",
//           color: active ? color : "rgba(255,255,255,0.15)",
//           letterSpacing: "0.15em",
//           textTransform: "uppercase",
//         }}>
//           {src}
//         </span>
//       </div>
//     </motion.div>
//   );
// }

// /* ─── Single Step Row ───────────────────────────────────────────────────────── */
// function StepRow({ step, index, pulseAt }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { threshold: 0.4, once: false });
//   const [active, setActive] = useState(false);

//   useEffect(() => {
//     if (isInView) setActive(true);
//     else setActive(false);
//   }, [isInView]);

//   const isLLM = step.shape === "large-circle";
//   const nodeSize = isLLM ? 64 : 44;

//   /* Desktop left/right layout */
//   const isLeft = step.side === "left";
//   const isCenter = step.side === "center";

//   return (
//     <div
//       ref={ref}
//       style={{
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: isCenter ? "center" : isLeft ? "flex-start" : "flex-end",
//         width: "100%",
//         padding: "3rem 0",
//       }}
//       className="snp-step-row"
//     >
//       {/* ── LEFT SIDE content ─────────────────────────────── */}
//       {(isLeft || isCenter) && !isCenter && (
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
//           transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
//           style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end", marginRight: "auto" }}
//           className="snp-hide-mobile"
//         >
//           <StepImage src={step.image} active={active} color={step.color} glow={step.glow} />
//           <DetailCard step={step} active={active} side="left" />
//         </motion.div>
//       )}

//       {isCenter && (
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
//           transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
//           style={{ marginRight: "auto" }}
//           className="snp-hide-mobile"
//         >
//           <StepImage src={step.image} active={active} color={step.color} glow={step.glow} />
//         </motion.div>
//       )}

//       {/* ── CENTER NODE ─────────────────────────────────────── */}
//       <div style={{
//         position: "absolute",
//         left: "50%",
//         transform: "translateX(-50%)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         zIndex: 10,
//       }}>
//         {/* Step number above node */}
//         <motion.div
//           animate={active ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 4 }}
//           transition={{ duration: 0.4 }}
//           style={{
//             fontFamily: "'JetBrains Mono', monospace",
//             fontSize: "0.55rem",
//             color: active ? step.color : "rgba(255,255,255,0.28)",
//             letterSpacing: "0.2em",
//             textTransform: "uppercase",
//             marginBottom: "0.4rem",
//             transition: "color 0.4s",
//           }}
//         >
//           {step.num}
//         </motion.div>

//         <NodeShape shape={step.shape} color={step.color} glow={step.glow} active={active} size={nodeSize} />

//         {/* Title below node */}
//         <motion.div
//           animate={active ? { opacity: 1, y: 0 } : { opacity: 0.25, y: -4 }}
//           transition={{ duration: 0.4, delay: 0.05 }}
//           style={{
//             marginTop: "0.5rem",
//             textAlign: "center",
//           }}
//         >
//           <div style={{
//             fontFamily: "'Playfair Display', serif",
//             fontSize: isLLM ? "1.05rem" : "0.9rem",
//             color: active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.28)",
//             fontWeight: 500,
//             transition: "color 0.4s",
//             whiteSpace: "nowrap",
//           }}>
//             {step.title}
//           </div>
//           <div style={{
//             fontFamily: "'DM Sans', sans-serif",
//             fontSize: "0.7rem",
//             color: active ? step.color : "rgba(255,255,255,0.18)",
//             fontWeight: 300,
//             transition: "color 0.4s",
//             marginTop: "0.15rem",
//             letterSpacing: "0.02em",
//           }}>
//             {step.subtitle}
//           </div>
//         </motion.div>

//         {/* Connecting line to detail card (desktop only) */}
//         {!isCenter && (
//           <svg
//             style={{ position: "absolute", top: "50%", pointerEvents: "none", zIndex: -1 }}
//             width="140" height="2"
//             viewBox="0 0 140 2"
//             preserveAspectRatio="none"
//             className={`snp-connector ${isLeft ? "snp-connector-left" : "snp-connector-right"} snp-hide-mobile`}
//           >
//             <line x1="0" y1="1" x2="140" y2="1"
//               stroke={active ? step.color : "rgba(255,255,255,0.08)"}
//               strokeWidth="1"
//               strokeDasharray={active ? "none" : "4 4"}
//               style={{ transition: "stroke 0.5s" }}
//             />
//           </svg>
//         )}
//       </div>

//       {/* ── RIGHT SIDE content ────────────────────────────── */}
//       {(!isLeft && !isCenter) && (
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
//           transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
//           style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start", marginLeft: "auto" }}
//           className="snp-hide-mobile"
//         >
//           <StepImage src={step.image} active={active} color={step.color} glow={step.glow} />
//           <DetailCard step={step} active={active} side="right" />
//         </motion.div>
//       )}

//       {isCenter && (
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
//           transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
//           style={{ marginLeft: "auto" }}
//           className="snp-hide-mobile"
//         >
//           <DetailCard step={step} active={active} side="right" />
//         </motion.div>
//       )}

//       {/* ── MOBILE: stacked ─────────────────────────────────── */}
//       <div className="snp-mobile-stack">
//         <StepImage src={step.image} active={active} color={step.color} glow={step.glow} />
//         <DetailCard step={step} active={active} side="right" />
//       </div>
//     </div>
//   );
// }

// /* ─── Step 5: Split Output ──────────────────────────────────────────────────── */
// function SplitOutput({ step }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { threshold: 0.35, once: false });
//   const [active, setActive] = useState(false);

//   useEffect(() => {
//     if (isInView) setActive(true);
//     else setActive(false);
//   }, [isInView]);

//   return (
//     <div ref={ref} style={{ position: "relative", width: "100%", padding: "3rem 0 2rem" }}>
//       {/* Center node */}
//       <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1rem" }}>
//         <motion.div
//           animate={active ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 4 }}
//           style={{
//             fontFamily: "'JetBrains Mono', monospace",
//             fontSize: "0.55rem",
//             color: active ? step.color : "rgba(255,255,255,0.28)",
//             letterSpacing: "0.2em",
//             textTransform: "uppercase",
//             marginBottom: "0.4rem",
//             transition: "color 0.4s",
//           }}
//         >
//           05
//         </motion.div>
//         <NodeShape shape="circle" color={step.color} glow={step.glow} active={active} size={44} />
//         <motion.div
//           animate={active ? { opacity: 1 } : { opacity: 0.25 }}
//           style={{
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "0.9rem",
//             color: active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.28)",
//             fontWeight: 500,
//             marginTop: "0.5rem",
//             transition: "color 0.4s",
//           }}
//         >
//           {step.title}
//         </motion.div>
//         <div style={{
//           fontFamily: "'DM Sans', sans-serif",
//           fontSize: "0.7rem",
//           color: active ? step.color : "rgba(255,255,255,0.18)",
//           fontWeight: 300,
//           transition: "color 0.4s",
//           marginTop: "0.15rem",
//         }}>
//           {step.subtitle}
//         </div>
//       </div>

//       {/* SVG branching lines */}
//       <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
//         <svg width="320" height="48" viewBox="0 0 320 48" style={{ overflow: "visible" }}>
//           <motion.line x1="160" y1="0" x2="160" y2="20"
//             stroke={step.color} strokeWidth="1" opacity={active ? 0.6 : 0.1}
//             animate={active ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0.1 }}
//           />
//           <motion.path d="M160,20 Q80,20 60,48" fill="none"
//             stroke={step.color} strokeWidth="1" opacity={active ? 0.5 : 0.08}
//             animate={active ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0.08 }}
//             initial={{ pathLength: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//           />
//           <motion.path d="M160,20 Q240,20 260,48" fill="none"
//             stroke={step.color} strokeWidth="1" opacity={active ? 0.5 : 0.08}
//             animate={active ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0.08 }}
//             initial={{ pathLength: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//           />
//         </svg>
//       </div>

//       {/* Two output cards */}
//       <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
//         {[step.left, step.right].map((branch, bi) => (
//           <motion.div
//             key={bi}
//             initial={{ opacity: 0, y: 24 }}
//             animate={active ? { opacity: 1, y: 0 } : { opacity: 0.18, y: 12 }}
//             transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 + bi * 0.12 }}
//             style={{
//               background: "rgba(255,255,255,0.028)",
//               border: `1px solid ${active ? step.glow.replace("0.45", "0.28") : "rgba(255,255,255,0.055)"}`,
//               borderRadius: "0.85rem",
//               padding: "1.4rem 1.6rem",
//               backdropFilter: "blur(10px)",
//               boxShadow: active ? `0 0 28px ${step.glow.replace("0.45", "0.18")}` : "none",
//               minWidth: "200px",
//               flex: 1,
//               maxWidth: "280px",
//               transition: "box-shadow 0.4s, border-color 0.4s",
//             }}
//           >
//             <div style={{
//               fontFamily: "'JetBrains Mono', monospace",
//               fontSize: "0.58rem",
//               color: active ? step.color : "rgba(255,255,255,0.25)",
//               letterSpacing: "0.15em",
//               textTransform: "uppercase",
//               marginBottom: "0.85rem",
//               transition: "color 0.35s",
//             }}>
//               {branch.title}
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
//               {branch.items.map((item, ii) => (
//                 <div key={ii} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
//                   <div style={{
//                     width: "4px", height: "4px", borderRadius: "50%", flexShrink: 0,
//                     background: active ? step.color : "rgba(255,255,255,0.2)",
//                     boxShadow: active ? `0 0 6px ${step.glow}` : "none",
//                     transition: "background 0.35s, box-shadow 0.35s",
//                   }} />
//                   <span style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: "0.82rem",
//                     color: active ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.22)",
//                     fontWeight: 300,
//                     lineHeight: 1.4,
//                     transition: "color 0.35s",
//                   }}>
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ─── Traveling Pulse on Spine ──────────────────────────────────────────────── */
// function SpinePulse({ containerRef }) {
//   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

//   return (
//     <motion.div
//       style={{
//         position: "absolute",
//         left: "50%",
//         transform: "translateX(-50%)",
//         top: 0,
//         width: "6px",
//         height: "6px",
//         borderRadius: "50%",
//         background: "radial-gradient(circle, #fbbf24 0%, rgba(251,191,36,0.3) 70%, transparent 100%)",
//         boxShadow: "0 0 12px rgba(251,191,36,0.8), 0 0 24px rgba(251,191,36,0.4)",
//         y,
//         zIndex: 20,
//         pointerEvents: "none",
//       }}
//     />
//   );
// }

// /* ─── Main Component ────────────────────────────────────────────────────────── */
// export default function SentinelPipeline() {
//   const containerRef = useRef(null);

//   return (
//     <>
//       <style>{`
//         ${FONTS}

//         .snp-root *, .snp-root *::before, .snp-root *::after {
//           box-sizing: border-box; margin: 0; padding: 0;
//         }

//         .snp-root {
//           --snp-bg: #070707;
//           --snp-amber: #fbbf24;
//           --snp-orange: #f97316;
//           --snp-font-display: 'Playfair Display', Georgia, serif;
//           --snp-font-body: 'DM Sans', sans-serif;
//           --snp-font-mono: 'JetBrains Mono', monospace;

//           background: var(--snp-bg);
//           color: #fff;
//           font-family: var(--snp-font-body);
//           position: relative;
//           overflow: hidden;
//           padding: 6rem 2rem 8rem;
//         }

//         /* ── Section header ── */
//         .snp-header {
//           text-align: center;
//           margin-bottom: 5rem;
//         }
//         .snp-header-badge {
//           display: inline-flex; align-items: center; gap: 0.5rem;
//           padding: 0.35rem 0.85rem; border-radius: 999px;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           font-family: var(--snp-font-mono);
//           font-size: 0.58rem; letter-spacing: 0.2em;
//           text-transform: uppercase; color: rgba(255,255,255,0.4);
//           margin-bottom: 1.2rem;
//         }
//         .snp-header-badge-dot {
//           width: 6px; height: 6px; border-radius: 50%;
//           background: #fbbf24;
//           box-shadow: 0 0 8px rgba(251,191,36,0.7);
//           animation: snp-blink 2s ease-in-out infinite;
//         }
//         @keyframes snp-blink {
//           0%,100%{opacity:1} 50%{opacity:0.45}
//         }
//         .snp-header-title {
//           font-family: var(--snp-font-display);
//           font-size: clamp(1.85rem, 4vw, 2.9rem);
//           font-weight: 400; line-height: 1.15;
//           color: rgba(255,255,255,0.85);
//           margin-bottom: 0.75rem;
//         }
//         .snp-header-title span {
//           font-style: italic;
//           background: linear-gradient(135deg, #fbbf24 0%, #fb923c 55%, #f97316 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .snp-header-sub {
//           font-size: 1rem; color: rgba(255,255,255,0.38);
//           font-weight: 300; max-width: 460px; margin: 0 auto;
//           line-height: 1.65;
//         }

//         /* ── Pipeline container ── */
//         .snp-pipeline {
//           position: relative;
//           max-width: 900px;
//           margin: 0 auto;
//         }

//         /* Center spine */
//         .snp-spine {
//           position: absolute;
//           left: 50%;
//           top: 0; bottom: 0;
//           width: 1px;
//           transform: translateX(-50%);
//           background: linear-gradient(to bottom,
//             transparent 0%,
//             rgba(255,255,255,0.07) 8%,
//             rgba(255,255,255,0.07) 92%,
//             transparent 100%
//           );
//           z-index: 1;
//         }

//         /* Connector lines to cards */
//         .snp-connector {
//           position: absolute;
//           top: 50%; transform: translateY(-50%);
//         }
//         .snp-connector-left {
//           right: 100%; margin-right: -4px;
//         }
//         .snp-connector-right {
//           left: 100%; margin-left: -4px;
//         }

//         /* Hide/show responsive */
//         .snp-hide-mobile { display: flex; }
//         .snp-mobile-stack { display: none; flex-direction: column; gap: 1rem; align-items: center; }

//         @media (max-width: 768px) {
//           .snp-hide-mobile { display: none !important; }
//           .snp-mobile-stack { display: flex !important; }
//           .snp-step-row { justify-content: center !important; padding: 1.5rem 0 !important; flex-direction: column; align-items: center; gap: 1.5rem; }
//           .snp-root { padding: 4rem 1rem 6rem; }
//         }
//       `}</style>

//       <div className="snp-root">

//         {/* ── HEADER ── */}
//         <motion.div
//           className="snp-header"
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//         >
//           <div className="snp-header-badge">
//             <span className="snp-header-badge-dot" />
//             System Architecture
//           </div>
//           <h2 className="snp-header-title">
//             How Sentinel <span>Thinks</span>
//           </h2>
//           <p className="snp-header-sub">
//             A live intelligence pipeline — from raw market signals to precise business decisions.
//           </p>
//         </motion.div>

//         {/* ── PIPELINE ── */}
//         <div className="snp-pipeline" ref={containerRef}>

//           {/* Center spine */}
//           <div className="snp-spine" />

//           {/* Traveling pulse */}
//           <SpinePulse containerRef={containerRef} />

//           {/* Steps 1–4 */}
//           {STEPS.filter(s => s.shape !== "split").map((step, i) => (
//             <StepRow key={step.id} step={step} index={i} pulseAt={i} />
//           ))}

//           {/* Step 5: Split */}
//           <SplitOutput step={STEPS.find(s => s.shape === "split")} />

//         </div>
//       </div>
//     </>
//   );
// }
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    id: 1,
    title: "Business Context",
    shape: "circle",
    align: "left",
   details: [
  "Industry",
  "Location",
  "Supply Dependencies",
  "Financial Health",
  "Risk Buffer"
],
image: "https://picsum.photos/seed/step1/600/400"
  },
  {
    id: 2,
    title: "Signal Collection",
    shape: "hexagon",
    align: "right",
    details: ["News Sources", "Commodity Feeds", "Policy Updates", "Market Signals"],
    image: "https://picsum.photos/seed/step2/600/400"
  },
  {
    id: 3,
    title: "AI Processing",
    shape: "diamond",
    align: "left",
    details: ["Data Cleaning", "Signal Structuring", "Feature Extraction", "AI Pre-processing"],
    image: "https://picsum.photos/seed/step3/600/400"
  },
  {
    id: 4,
    title: "LLM Intelligence",
    shape: "large-circle",
    align: "center",
    details: ["Context Understanding", "Reasoning", "Impact Mapping", "Decision Generation"],
    image: "https://picsum.photos/seed/step4/600/400"
  },
  {
    id: 5,
    title: "Outputs",
    shape: "split",
    align: "split",
    detailsLeft: ["Impact Insights"],
    detailsRight: ["Recommended Actions"],
    image: "https://picsum.photos/seed/step5/600/400"
  }
];

const StepNode = ( { shape}) => {
  const floatAnimation = {
    y: [-3, 3, -3],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  switch (shape) {
    case 'circle':
      return (
        <motion.div animate={floatAnimation} className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-[#fbbf24]/20 blur-md shadow-[0_0_25px_rgba(251,191,36,0.5)]" />
          <div className="absolute inset-0 rounded-full border border-[#fbbf24]/30 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
          <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#fbbf24] relative z-10 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="#070707" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        </motion.div>
      );
    case 'hexagon':
      return (
        <motion.div animate={floatAnimation} className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 bg-[#f97316]/20 blur-md shadow-[0_0_25px_rgba(249,115,22,0.6)]" />
          <svg width="26" height="26" viewBox="0 0 24 24" className="text-[#f97316] relative z-10 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
            <polygon points="12 2 22 7 22 17 12 22 2 17 2 7" stroke="currentColor" strokeWidth="2.5" fill="#070707" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      );
    case 'diamond':
      return (
        <motion.div animate={floatAnimation} className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 bg-[#fb923c]/20 blur-md shadow-[0_0_25px_rgba(251,146,60,0.5)]" />
          <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#fb923c] relative z-10 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]">
            <polygon points="12 2 22 12 12 22 2 12" stroke="currentColor" strokeWidth="3" fill="#070707" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      );
    case 'large-circle':
      return (
        <motion.div 
          className="relative flex items-center justify-center w-20 h-20"
          whileInView={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#fbbf24]/40 to-[#f97316]/40 blur-xl shadow-[0_0_40px_rgba(251,191,36,0.6)]" />
          <div className="absolute inset-0 rounded-full border border-[#fbbf24]/50 animate-ping opacity-30" style={{ animationDuration: '2s' }} />
          <svg width="56" height="56" viewBox="0 0 48 48" className="text-[#fbbf24] relative z-10 drop-shadow-[0_0_15px_rgba(251,191,36,1)]">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="#070707" />
            <circle cx="24" cy="24" r="12" fill="url(#glowGradient)" className="opacity-90" />
            <defs>
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f97316" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      );
    case 'split':
      return (
        <>
          <div className="hidden md:block relative w-[160px] h-[80px]">
            <svg width="160" height="80" viewBox="0 0 160 80" className="absolute top-0 left-0 overflow-visible">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M 80 0 L 80 30 C 80 60 20 60 20 80" 
                fill="none" stroke="url(#splitGradLeft)" strokeWidth="2" 
              />
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d="M 80 0 L 80 30 C 80 60 140 60 140 80" 
                fill="none" stroke="url(#splitGradRight)" strokeWidth="2" 
              />
              <defs>
                <linearGradient id="splitGradLeft" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="splitGradRight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div 
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8 }}
              className="absolute bottom-0 left-[20px] -translate-x-1/2 w-4 h-4 rounded-full bg-[#f97316] shadow-[0_0_20px_rgba(249,115,22,1)] z-10" 
            />
            <motion.div 
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.8 }}
              className="absolute bottom-0 left-[140px] -translate-x-1/2 w-4 h-4 rounded-full bg-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,1)] z-10" 
            />
          </div>
          <div className="md:hidden relative flex items-center justify-center w-10 h-10">
            <div className="absolute inset-0 rounded-full bg-[#fbbf24]/20 blur-md shadow-[0_0_20px_rgba(251,191,36,0.45)]" />
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#fbbf24] relative z-10">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="#070707" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
        </>
      );
    default:
      return null;
  }
}

const GlassCard =({ title, details, image, className = "" }) => (
  <div className={`bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl p-6 md:p-8 rounded-3xl w-full relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl ${className}`}>
    {/* Inner subtle ring for premium glass feel */}
    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 pointer-events-none" />
    
    {/* Hover gradient glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24]/10 via-transparent to-[#f97316]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    
    <h3 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] mb-5 text-[#ffffff] leading-tight relative z-10 drop-shadow-md">{title}</h3>
    
    <div className="flex flex-wrap gap-2 mb-8 relative z-10">
      {details.map(d => (
        <span key={d} className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md group-hover:border-white/20 transition-colors duration-300">
          {d}
        </span>
      ))}
    </div>
    
    {image && (
      <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-2xl border border-white/10 z-10 bg-[#070707]">
        {/* Vignette overlay to blend image into dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/40 to-transparent z-10 opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-[#070707]/80 z-10" />
        
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out" 
        />
      </div>
    )}
  </div>
);

const StepRow = ({ step, index }) => {
  const isLeft = step.align === 'left';
  const isRight = step.align === 'right';
  const isCenter = step.align === 'center';
  const isSplit = step.align === 'split';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-15%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col md:flex-row w-full items-center md:justify-center mb-24 md:mb-32 group"
    >
      {/* Mobile connecting line */}
      <motion.div 
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
        className="md:hidden absolute left-8 top-12 w-8 h-[1px] bg-gradient-to-r from-[#fbbf24]/80 to-transparent z-10 origin-left" 
      />
      {isLeft && (
        <>
          <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-20 flex justify-end relative">
            {/* Desktop connecting line */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden md:block absolute top-1/2 right-0 w-20 h-[1px] bg-gradient-to-l from-[#fbbf24] to-transparent shadow-[0_0_8px_rgba(251,191,36,0.6)] origin-right" 
            />
            <motion.div 
              initial={{ filter: "blur(12px)", x: -30 }}
              whileInView={{ filter: "blur(0px)", x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-lg"
            >
              <GlassCard title={step.title} details={step.details} image={step.image} />
            </motion.div>
          </div>
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 top-12 md:top-1/2 md:-translate-y-1/2">
            <StepNode shape={step.shape} />
          </div>
          <div className="hidden md:block w-1/2 pl-20" />
        </>
      )}

      {isRight && (
        <>
          <div className="hidden md:block w-1/2 pr-20" />
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 top-12 md:top-1/2 md:-translate-y-1/2">
            <StepNode shape={step.shape} />
          </div>
          <div className="w-full md:w-1/2 pl-20 flex justify-start relative">
            {/* Desktop connecting line */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden md:block absolute top-1/2 left-0 w-20 h-[1px] bg-gradient-to-r from-[#f97316] to-transparent shadow-[0_0_8px_rgba(249,115,22,0.6)] origin-left" 
            />
            <motion.div 
              initial={{ filter: "blur(12px)", x: 30 }}
              whileInView={{ filter: "blur(0px)", x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-lg"
            >
              <GlassCard title={step.title} details={step.details} image={step.image} />
            </motion.div>
          </div>
        </>
      )}

      {isCenter && (
        <div className="w-full flex flex-col items-center relative z-20 pl-20 md:pl-0">
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 top-12 md:-top-16 md:translate-y-0">
            <StepNode shape={step.shape} />
          </div>
          <motion.div 
            initial={{ filter: "blur(15px)", y: 30, scale: 0.95 }}
            whileInView={{ filter: "blur(0px)", y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-3xl mt-0 md:mt-12"
          >
            <GlassCard 
              title={step.title} 
              details={step.details} 
              image={step.image} 
              className="border-[#fbbf24]/30 shadow-[0_0_50px_rgba(251,191,36,0.15)] ring-1 ring-[#fbbf24]/20" 
            />
          </motion.div>
        </div>
      )}

      {isSplit && (
        <div className="w-full flex flex-col items-center relative z-20 pl-20 md:pl-0">
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 top-12 md:-top-20 md:translate-y-0">
            <StepNode shape={step.shape} />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 mt-0 md:mt-12 max-w-5xl">
            <motion.div 
              initial={{ filter: "blur(12px)", x: -30, opacity: 0 }}
              whileInView={{ filter: "blur(0px)", x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full md:w-1/2"
            >
              <GlassCard title="Impact Insights" details={step.detailsLeft} image={step.image} />
            </motion.div>
            <motion.div 
              initial={{ filter: "blur(12px)", x: 30, opacity: 0 }}
              whileInView={{ filter: "blur(0px)", x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="w-full md:w-1/2"
            >
              <GlassCard title="Recommended Actions" details={step.detailsRight} image="https://picsum.photos/seed/step5b/600/400" />
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function SentinelPipeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#070707] py-32 overflow-hidden font-sans text-[#ffffff]">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#fbbf24]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center mb-40 px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-[#ffffff] mb-6 leading-tight tracking-tight drop-shadow-lg"
        >
          How Sentinel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#f97316] to-[#fb923c] drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">Thinks</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-sans text-[1.15rem] md:text-[1.25rem] text-white/60 leading-relaxed max-w-2xl mx-auto"
        >
          A live visualization of our intelligence pipeline. From raw global signals to structured reasoning and actionable impact.
        </motion.p>
      </div>

      {/* Center Spine Base */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 z-0" />
      
      {/* Animated Comet Pulse */}
      <motion.div 
        className="absolute left-8 md:left-1/2 top-0 w-[2px] h-48 bg-gradient-to-b from-transparent via-[#fbbf24] to-[#f97316] -translate-x-1/2 z-30"
        style={{ top: pulseY, y: "-100%" }}
      >
        {/* Comet Head */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[12px] bg-[#fff] rounded-full blur-[1px] shadow-[0_0_20px_rgba(251,191,36,1),0_0_40px_rgba(249,115,22,0.8)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pb-32">
        {steps.map((step, i) => (
          <StepRow key={step.id} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { motion } from "motion/react";

// const layers = [
//   {
//     id: "impact",
//     title: "IMPACT",
//     content: "Save ₹2,300 in procurement costs",
//   },
//   {
//     id: "analysis",
//     title: "AI ANALYSIS",
//     content: "Detected 18% rise in LPG prices and matched with historical cost impact patterns",
//   },
//   {
//     id: "context",
//     title: "CONTEXT",
//     content: "Supply disruption in global fuel markets affecting local pricing",
//   },
//   {
//     id: "risk",
//     title: "RISK",
//     content: "Failure to act may result in ₹10,000 monthly loss",
//   },
//   {
//     id: "extra",
//     title: "EXTRA",
//     content: "Recommended within next 48 hours",
//   },
// ];

// export default function App() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const renderText = (text) => {
//     const regex = /(₹[\d,]+|\d+%|\d+ hours)/g;
//     const parts = text.split(regex);
//     return parts.map((part, i) => {
//       if (part.match(regex)) {
//         return (
//           <span key={i} style={{ color: "#F97316", fontWeight: 500 }}>
//             {part}
//           </span>
//         );
//       }
//       return <span key={i}>{part}</span>;
//     });
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');

//         :root {
//           --col-bg: #070707;
//           --col-white: #ffffff;
//           --col-amber: #fbbf24;
//           --col-orange: #f97316;
//           --col-orange-mid: #fb923c;
//           --col-white-78: rgba(255,255,255,0.78);
//           --col-white-52: rgba(255,255,255,0.52);
//           --col-white-28: rgba(255,255,255,0.28);
//           --col-amber-45: rgba(251,191,36,0.45);
//           --col-amber-62: rgba(251,191,36,0.62);
//           --col-orange-72: rgba(249,115,22,0.72);
//           --col-orange-92: rgba(249,115,22,0.92);
//           --col-amber-38: rgba(251,191,36,0.38);
//           --col-surface-lo: rgba(255,255,255,0.025);
//           --col-surface-hi: rgba(255,255,255,0.055);

//           --fs-hero: clamp(1.85rem, 4vw, 2.9rem);
//           --fs-body: 1.05rem;
//           --fs-small: 0.9rem;
//           --fs-xsmall: 0.87rem;
//           --fs-label: 0.6rem;

//           --font-display: 'Playfair Display', Georgia, serif;
//           --font-body: 'DM Sans', sans-serif;
//           --font-mono: 'JetBrains Mono', monospace;
//         }

//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         body {
//           background: var(--col-bg);
//           color: var(--col-white);
//           font-family: var(--font-body);
//         }

//         .root {
//           min-height: 100vh;
//           background: var(--col-bg);
//           color: var(--col-white);
//           font-family: var(--font-body);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 3rem 1.5rem;
//           user-select: none;
//           position: relative;
//           overflow: hidden;
//         }



//         .grid {
//           max-width: 1100px;
//           width: 100%;
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 4rem;
//           align-items: center;
//           position: relative;
//           z-index: 1;
//         }

//         @media (min-width: 1024px) {
//           .grid {
//             grid-template-columns: 1fr 1fr;
//             gap: 6rem;
//           }
//         }

//         /* ─── LEFT SIDE ─────────────────────────────────── */
//         .left {
//           display: flex;
//           flex-direction: column;
//           gap: 2rem;
//         }

//         .badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.4rem 0.85rem;
//           border-radius: 999px;
//           background: var(--col-surface-hi);
//           border: 1px solid var(--col-surface-hi);
//           font-family: var(--font-mono);
//           font-size: var(--fs-label);
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: var(--col-white-52);
//           width: fit-content;
//         }

//         .badge-dot {
//           width: 7px;
//           height: 7px;
//           border-radius: 50%;
//           background: var(--col-orange);
//           box-shadow: 0 0 8px var(--col-orange-72), 0 0 16px var(--col-amber-45);
//           animation: pulse 2.4s ease-in-out infinite;
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.6; transform: scale(0.8); }
//         }

//         .headline {
//           font-family: var(--font-display);
//           font-size: var(--fs-hero);
//           font-weight: 400;
//           line-height: 1.15;
//           letter-spacing: -0.01em;
//           color: var(--col-white-78);
//         }

//         .headline em {
//           font-style: italic;
//           color: var(--col-white);
//         }

//         .headline strong {
//           font-weight: 700;
//           font-style: normal;
//           color: var(--col-white);
//           background: linear-gradient(135deg, var(--col-amber) 0%, var(--col-orange-mid) 60%, var(--col-orange) 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .descriptor {
//           font-size: var(--fs-body);
//           color: var(--col-white-52);
//           line-height: 1.7;
//           max-width: 400px;
//           font-weight: 300;
//         }

//         .feature-list {
//           list-style: none;
//           display: flex;
//           flex-direction: column;
//           gap: 0.85rem;
//           margin-top: 0.5rem;
//         }

//         .feature-item {
//           display: flex;
//           align-items: center;
//           gap: 0.9rem;
//           font-size: var(--fs-xsmall);
//           color: var(--col-white-28);
//           font-family: var(--font-body);
//           font-weight: 400;
//           letter-spacing: 0.01em;
//         }

//         .feature-dot {
//           width: 5px;
//           height: 5px;
//           border-radius: 50%;
//           flex-shrink: 0;
//           background: var(--col-amber-45);
//         }

//         /* Divider line */
//         .divider {
//           width: 3rem;
//           height: 1px;
//           background: linear-gradient(90deg, var(--col-amber-62), transparent);
//         }

//         /* ─── RIGHT SIDE (untouched structure) ──────────── */
//         .right {
//           position: relative;
//           height: 550px;
//           width: 100%;
//           max-width: 28rem;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         @media (min-width: 1024px) {
//           .right {
//             margin-right: 0;
//           }
//         }

//         .card {
//           position: absolute;
//           top: 2.5rem;
//           left: 0;
//           width: 100%;
//           background: #111827;
//           border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 1rem;
//           padding: 2rem;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.8);
//           height: 260px;
//           transform-origin: top center;
//         }

//         .card-inner {
//           display: flex;
//           flex-direction: column;
//           height: 100%;
//         }

//         .card-label {
//           font-size: 0.6rem;
//           font-weight: 700;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           margin-bottom: 1.5rem;
//           transition: color 0.3s;
//         }

//         .card-label--active { color: rgba(156,163,175,1); }
//         .card-label--inactive { color: rgba(75,85,99,1); }

//         .card-text {
//           font-size: 1.5rem;
//           line-height: 1.4;
//           font-weight: 300;
//           transition: color 0.3s;
//         }

//         .card-text--active { color: white; }
//         .card-text--inactive { color: rgba(156,163,175,1); }

//         .hover-zones {
//           position: absolute;
//           inset: 0;
//           z-index: 100;
//           display: flex;
//           flex-direction: column;
//         }

//         .hover-zone {
//           flex: 1;
//           width: 100%;
//           cursor: default;
//         }
//       `}</style>

//       <div className="root">
//         <div className="grid">

//           {/* ── LEFT ── */}
//           <div className="left">
//             <div className="badge">
//               <span className="badge-dot" />
//               Sentinel AI
//             </div>

//             <h1 className="headline">
//               AI Recommendation<br />
//               <strong>Insight</strong> <em>Engine</em>
//             </h1>

//             <div className="divider" />

//             <p className="descriptor">
//               Explore the reasoning behind Sentinel's recommendations. Hover over the insight card to reveal deeper layers of intelligence — from immediate impact to underlying context and risks.
//             </p>

//             <ul className="feature-list">
//               <li className="feature-item">
//                 <span className="feature-dot" />
//                 Multi-layered analysis
//               </li>
//               <li className="feature-item">
//                 <span className="feature-dot" />
//                 Context-aware reasoning
//               </li>
//               <li className="feature-item">
//                 <span className="feature-dot" />
//                 Predictive risk assessment
//               </li>
//             </ul>
//           </div>

//           {/* ── RIGHT (structure identical to original) ── */}
//           <div className="right">
//             {layers.map((layer, index) => {
//               const isActive = activeIndex === index;
//               const distance = Math.abs(activeIndex - index);
//               const isAbove = index < activeIndex;

//               const baseY = index * 35;

//               let yOffset = baseY;
//               let scale = 1 - distance * 0.04;
//               let blur = isActive ? 0 : 2 + distance * 1.5;
//               let opacity = isActive ? 1 : Math.max(0.2, 0.7 - distance * 0.15);
//               let zIndex = isActive ? 50 : 10 - distance;

//               if (isActive) {
//                 yOffset = baseY - 15;
//                 scale = 1.02;
//               } else if (isAbove) {
//                 yOffset = baseY - 40 - distance * 10;
//               } else {
//                 yOffset = baseY + 40 + distance * 10;
//               }

//               return (
//                 <motion.div
//                   key={layer.id}
//                   className="card"
//                   initial={false}
//                   animate={{
//                     y: yOffset,
//                     scale,
//                     zIndex,
//                     filter: `blur(${blur}px)`,
//                     opacity,
//                   }}
//                   transition={{ duration: 0.3, ease: "easeOut" }}
//                 >
//                   <div className="card-inner">
//                     <span className={`card-label ${isActive ? "card-label--active" : "card-label--inactive"}`}>
//                       {layer.title}
//                     </span>
//                     <h3 className={`card-text ${isActive ? "card-text--active" : "card-text--inactive"}`}>
//                       {renderText(layer.content)}
//                     </h3>
//                   </div>
//                 </motion.div>
//               );
//             })}

//             {/* Invisible Hover Zones — untouched */}
//             <div
//               className="hover-zones"
//               onMouseLeave={() => setActiveIndex(0)}
//             >
//               {layers.map((_, index) => (
//                 <div
//                   key={`zone-${index}`}
//                   className="hover-zone"
//                   onMouseEnter={() => setActiveIndex(index)}
//                 />
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }
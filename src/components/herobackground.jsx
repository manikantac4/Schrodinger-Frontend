import heroVideo from "../assets/hero-video2.mp4";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">

      {/* ── Layer 1: Background video — full quality, no loss ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 1 }}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* ── Layer 2: Dark base veil so text stays readable ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.52)",
        }}
      />

      {/* ── Layer 3: ORANGE radial glow — bursts from top-left corner ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at -5% 0%, rgba(234,88,12,0.82) 0%, rgba(194,65,12,0.42) 35%, transparent 65%)",
        }}
      />

      {/* ── Layer 4: Amber hot-core at the very corner ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 38% at -2% -2%, rgba(251,146,60,0.70) 0%, rgba(249,115,22,0.30) 40%, transparent 65%)",
        }}
      />

      {/* ── Layer 5: Top-edge darkness so navbar sits clean ── */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      />

      {/* ── Layer 6: Bottom fade to pure black ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
        }}
      />

      {/* ── Layer 7: Left + right edge vignettes ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
// import heroBg from "../../assets/herobg.png";

// export default function HeroBackground() {
//   return (
//     <div className="absolute inset-0 w-full h-full overflow-hidden">

//       {/* ── Layer 1: Background image — full quality, no loss ── */}
//       <img
//         src={heroBg}
//         alt=""
//         className="absolute inset-0 w-full h-full object-cover"
//         style={{ opacity: 1 }}
//       />

//       {/* ── Layer 2: Dark base veil so text stays readable ── */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background: "rgba(0,0,0,0.52)",
//         }}
//       />

//       {/* ── Layer 3: ORANGE radial glow — bursts from top-left corner ── */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 85% 70% at -5% 0%, rgba(234,88,12,0.82) 0%, rgba(194,65,12,0.42) 35%, transparent 65%)",
//         }}
//       />

//       {/* ── Layer 4: Amber hot-core at the very corner ── */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 45% 38% at -2% -2%, rgba(251,146,60,0.70) 0%, rgba(249,115,22,0.30) 40%, transparent 65%)",
//         }}
//       />

//       {/* ── Layer 5: Top-edge darkness so navbar sits clean ── */}
//       <div
//         className="absolute top-0 left-0 right-0 h-24"
//         style={{
//           background:
//             "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
//         }}
//       />

//       {/* ── Layer 6: Bottom fade to pure black ── */}
//       <div
//         className="absolute bottom-0 left-0 right-0 h-56"
//         style={{
//           background:
//             "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
//         }}
//       />

//       {/* ── Layer 7: Left + right edge vignettes ── */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.35) 100%)",
//         }}
//       />
//     </div>
//   );
// }
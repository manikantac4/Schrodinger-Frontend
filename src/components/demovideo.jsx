import { useState, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap');

  .vp__root {
    min-height: 100vh;
    background: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    box-sizing: border-box;
  }

  .vp__root *, .vp__root *::before, .vp__root *::after {
    box-sizing: border-box;
  }

  


  /* ── Layout ── */
  .vp__wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;
  }

  /* ── Heading ── */
  .vp__heading-block {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .vp__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border-radius: 99px;
    background: rgba(249,115,22,0.08);
    border: 1px solid rgba(249,115,22,0.18);
  }

  .vp__eyebrow-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #F97316;
    flex-shrink: 0;
  }

  .vp__eyebrow-dot--playing {
    animation: vp-pulse 1.2s ease-in-out infinite;
  }

  .vp__eyebrow-text {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(249,115,22,0.8);
  }

  .vp__title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: #fff;
    margin: 0;
  }

  .vp__title-accent {
    background: linear-gradient(135deg, #F97316 0%, #FBBF24 60%, #F97316 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .vp__subquote {
    font-size: 15px;
    font-weight: 300;
    font-style: italic;
    color: rgba(255,255,255,0.38);
    letter-spacing: 0.01em;
    max-width: 500px;
    line-height: 1.6;
    margin: 0;
  }

  .vp__subquote-em {
    color: rgba(255,255,255,0.55);
    font-style: normal;
  }

  /* ── Floating card ── */
  .vp__float-card {
    width: 100%;
    position: relative;
    border-radius: 28px;
    box-shadow:
  0 20px 60px rgba(0,0,0,0.6);
      0 20px 60px rgba(0,0,0,0.55),
      0 60px 120px rgba(0,0,0,0.45),
      0 4px 16px rgba(0,0,0,0.3);
    animation: vp-float 6s ease-in-out infinite;
  }

  /* ── Animated border ── */
  .vp__border-ring {
    position: absolute;
    inset: -2px;
    border-radius: 30px;
    opacity: 0;
    transition: opacity 0.8s ease;
    overflow: hidden;
    pointer-events: none;
    z-index: 2;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 2px;
  }

  .vp__border-ring--active { opacity: 1; }

  .vp__border-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 160%;
    aspect-ratio: 1;
    background: conic-gradient(from 0deg, #F97316, #7C3AED, #3B82F6, #EC4899, #F97316);
    animation: vp-spin 4s linear infinite;
  }

  /* ── Glow ring ── */
  .vp__glow-ring {
    position: absolute;
    inset: -6px;
    border-radius: 34px;
    opacity: 0;
    transition: opacity 0.8s ease;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
    filter: blur(20px);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 6px;
  }

  .vp__glow-ring--active { opacity: 0.45; }

  .vp__glow-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 160%;
    aspect-ratio: 1;
    background: conic-gradient(from 0deg, #F97316, #7C3AED, #3B82F6, #EC4899, #F97316);
    animation: vp-spin 4s linear infinite;
  }

  /* ── Video surface ── */
  .vp__card-inner {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #0e0e0e;
    border-radius: 26px;
    overflow: hidden;
    z-index: 3;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.07);
  }

  .vp__card-inner::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.12) 30%,
      rgba(255,255,255,0.18) 50%,
      rgba(255,255,255,0.12) 70%,
      transparent
    );
    z-index: 10;
    pointer-events: none;
  }

  .vp__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── Keyframes (namespaced) ── */
  @keyframes vp-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  @keyframes vp-spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes vp-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }
`;

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <>
      <style>{styles}</style>
      <div className="vp__root">
       

        <div className="vp__wrapper">

          {/* Heading */}
          <div className="vp__heading-block">
           

            <h1 className="vp__title">
              Demo <span className="vp__title-accent">Video</span>
            </h1>

            <p className="vp__subquote">
              The border <span className="vp__subquote-em">awakens</span> when you hit play —<br />
              a living frame for every moment.
            </p>
          </div>

          {/* Floating video card */}
          <div className="vp__float-card">
            <div className={`vp__glow-ring${isPlaying ? ' vp__glow-ring--active' : ''}`}>
              <div className="vp__glow-spinner" />
            </div>

            <div className={`vp__border-ring${isPlaying ? ' vp__border-ring--active' : ''}`}>
              <div className="vp__border-spinner" />
            </div>

            <div className="vp__card-inner">
              <video
                ref={videoRef}
                className="vp__video"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                poster="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import loginBg from "../assets/loginup.png";

// ── Firebase placeholders ─────────────────────────────────────────
// import {
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   TwitterAuthProvider,
// } from "firebase/auth";
// import { auth } from "../firebase/config";

// Google
// const googleProvider = new GoogleAuthProvider();
// googleProvider.addScope("email");
// googleProvider.addScope("profile");

// Twitter / X
// const twitterProvider = new TwitterAuthProvider();

// LinkedIn → needs backend OAuth2 flow (LinkedIn doesn't support client-side popup)
// const handleLinkedInOAuth = () => {
//   const clientId = "YOUR_LINKEDIN_CLIENT_ID";
//   const redirectUri = encodeURIComponent("https://yourdomain.com/auth/linkedin/callback");
//   const scope = encodeURIComponent("r_liteprofile r_emailaddress");
//   window.location.href =
//     `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
// };
// ─────────────────────────────────────────────────────────────────
import { loginUser , signupUser , googleLogin } from '../firebase/authService';
import { useNavigate } from "react-router-dom";
const GoogleIcon = () => (
  <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg style={{ width: 18, height: 18, flexShrink: 0 }} fill="#0A66C2" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = () => (
  <svg style={{ width: 16, height: 16, flexShrink: 0 }} fill="white" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: 24, height: 24, background: "white", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 12, height: 12, background: "black", borderRadius: 2 }} />
    </div>
    <span style={{ color: "white", fontWeight: 700, letterSpacing: "0.15em", fontSize: 11, textTransform: "uppercase" }}>Sentinel</span>
  </div>
);

function InputField({ icon: Icon, type, placeholder, value, onChange, focused, focusKey, onFocus, onBlur, rightEl }) {
  const isFocused = focused === focusKey;
  return (
    <div style={{ position: "relative" }}>
      <Icon style={{
        position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
        width: 16, height: 16, pointerEvents: "none",
        color: isFocused ? "#fb923c" : "#71717a",
        transition: "color 0.2s",
      }} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required
        style={{
          width: "100%",
          paddingLeft: 44,
          paddingRight: rightEl ? 44 : 16,
          paddingTop: 14,
          paddingBottom: 14,
          fontSize: 14,
          color: "white",
          background: "rgba(255,255,255,0.05)",
          border: isFocused ? "1.5px solid rgba(249,115,22,0.7)" : "1.5px solid rgba(255,255,255,0.08)",
          boxShadow: isFocused ? "0 0 0 3px rgba(249,115,22,0.10)" : "none",
          borderRadius: 12,
          outline: "none",
          transition: "border 0.2s, box-shadow 0.2s",
          cursor: "text",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
        className="auth-input"
      />
      {rightEl}
    </div>
  );
}

export default function Login({ onSwitchToSignup }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [focused, setFocused]   = useState(null);

  // ── OAuth handlers (replace bodies with real calls) ──
  // const handleGoogle = async () => {
  //   try {
  //     // const result = await signInWithPopup(auth, googleProvider);
  //     // const user = result.user;
  //     // const idToken = await user.getIdToken();
  //     // → send idToken to your backend if needed
  //     console.log("PLACEHOLDER: Google OAuth — connect signInWithPopup(auth, googleProvider)");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleTwitter = async () => {
    try {
      // const result = await signInWithPopup(auth, twitterProvider);
      // const user = result.user;
      // const credential = TwitterAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const secret = credential.secret;
      console.log("PLACEHOLDER: Twitter OAuth — connect signInWithPopup(auth, twitterProvider)");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLinkedIn = () => {
    // LinkedIn requires server-side OAuth2 code exchange
    // Step 1 — redirect to LinkedIn authorization:
    // const CLIENT_ID    = "YOUR_LINKEDIN_CLIENT_ID";
    // const REDIRECT_URI = encodeURIComponent("https://yourdomain.com/auth/linkedin/callback");
    // const SCOPE        = encodeURIComponent("r_liteprofile r_emailaddress");
    // const STATE        = crypto.randomUUID(); // store in sessionStorage for CSRF check
    // window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${STATE}`;
    //
    // Step 2 — on /auth/linkedin/callback (server):
    // Exchange `code` for access token via POST to https://www.linkedin.com/oauth/v2/accessToken
    // Fetch profile from https://api.linkedin.com/v2/me
    // Create Firebase custom token → signInWithCustomToken(auth, customToken)
    console.log("PLACEHOLDER: LinkedIn OAuth — implement server-side redirect flow");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError(""); setLoading(true);
  //   try {
  //     // await signInWithEmailAndPassword(auth, email, password);
  //     await new Promise(r => setTimeout(r, 1200));
  //   } catch (err) {
  //     setError(err.message || "Login failed.");
  //   } finally { setLoading(false); }
  // };

// Initialize navigate at the top of your component
const navigate = useNavigate();

const handleSignIn = async (e) => {
  e.preventDefault();

  // 1. Use existing state variables instead of 'formData'
  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    // 2. Use 'setLoading' instead of 'setIsSubmitting'
    setLoading(true);
    setError(""); // Clear previous errors

    const res = await loginUser(email, password);
    const user = res.user;

    console.log("Logged in UID:", user.uid);
    navigate("/dashboard");

  } catch (err) {
    console.error(err.message);
    // 3. Update the error state so the UI displays the message
    if (err.code === "auth/user-not-found") {
      setError("User not found");
    } else if (err.code === "auth/wrong-password") {
      setError("Incorrect password");
    } else {
      setError(err.message);
    }
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = async () => {
  try {
    setLoading(true);
    setError("");
    const res = await googleLogin();
    console.log("Google UID:", res.user.uid);
    navigate("/dashboard");
  } catch (err) {
    console.error(err.message);
    setError("Google login failed");
  } finally {
    setLoading(false);
  }
};

  // ── Social buttons — matches Signup's 3-col icon + label grid ──
  const SocialRow = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
      {[
        { icon: <GoogleIcon />, label: "Google",   fn: handleGoogleLogin   },
        { icon: <LinkedInIcon />, label: "LinkedIn", fn: handleLinkedIn },
        { icon: <XIcon />,      label: "X",        fn: handleTwitter  },
      ].map(({ icon, label, fn }) => (
        <motion.button key={label} type="button" onClick={fn}
          whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.09)" }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            padding: "11px 8px", borderRadius: 12, fontSize: 12, fontWeight: 500,
            color: "#a1a1aa", background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(255,255,255,0.09)",
            cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s",
          }}>
          {icon}
          <span>{label}</span>
        </motion.button>
      ))}
    </div>
  );

  const Divider = (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
      <span style={{ color: "#52525b", fontSize: 10, letterSpacing: "0.12em", fontWeight: 500 }}>OR CONTINUE WITH EMAIL</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
    </div>
  );

  const Form = (
    <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <InputField icon={Mail} type="email" placeholder="Email address" value={email}
        onChange={e => setEmail(e.target.value)} focused={focused} focusKey="email"
        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />

      <InputField icon={Lock} type={showPass ? "text" : "password"} placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)} focused={focused} focusKey="pass"
        onFocus={() => setFocused("pass")} onBlur={() => setFocused(null)}
        rightEl={
          <button type="button" onClick={() => setShowPass(p => !p)}
            style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#71717a", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -6 }}>
        <a href="#" style={{ fontSize: 12, color: "#71717a", textDecoration: "none", cursor: "pointer" }}
          onMouseEnter={e => e.target.style.color = "#fb923c"}
          onMouseLeave={e => e.target.style.color = "#71717a"}>
          Forgot password?
        </a>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ color: "#f87171", fontSize: 12, textAlign: "center", padding: "10px 12px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", margin: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button type="submit" disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 44px rgba(249,115,22,0.55)" }}
        whileTap={{ scale: 0.97 }}
        style={{
          width: "100%", padding: "14px 0", borderRadius: 12, color: "white",
          fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8, marginTop: 4,
          background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
          opacity: loading ? 0.7 : 1, border: "none",
          cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
        }}>
        {loading
          ? <svg style={{ width: 20, height: 20, animation: "spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24">
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          : <><span>Sign In</span><ArrowRight size={15} /></>}
      </motion.button>
    </form>
  );

  /* ─── MOBILE (< 1024px) ─── */
  const MobileView = (
    <div style={{
      display: "none", position: "relative", width: "100%", minHeight: "100vh",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "40px 20px",
    }} className="mobile-auth-view">

      {/* Full-page background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={loginBg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.32)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 60% at 0% 0%, rgba(234,88,12,0.5) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)" }} />
      </div>

      {/* Logo — top left, same as Signup mobile */}
      <div style={{ position: "relative", zIndex: 10, alignSelf: "flex-start", marginBottom: 28 }}>
        <Logo />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative", zIndex: 10, width: "100%", maxWidth: 420,
          background: "rgba(8,8,8,0.9)", border: "1.5px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)",
          borderRadius: 24, padding: "28px 22px",
        }}>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.5rem", letterSpacing: "-0.02em", color: "white", marginBottom: 4, fontWeight: 600 }}>
          Welcome back
        </h1>
        <p style={{ color: "#71717a", fontSize: 13, marginBottom: 20, marginTop: 0 }}>
          Sign in to your account
        </p>

        {SocialRow}

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ color: "#52525b", fontSize: 10, letterSpacing: "0.12em", fontWeight: 500 }}>OR CONTINUE WITH EMAIL</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {Form}

        <p style={{ textAlign: "center", fontSize: 13, color: "#52525b", marginTop: 20, marginBottom: 0 }}>
          No account?{" "}
          <button onClick={onSwitchToSignup}
            style={{ color: "#fb923c", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, padding: 0 }}
            onMouseEnter={e => e.target.style.color = "#fdba74"}
            onMouseLeave={e => e.target.style.color = "#fb923c"}>
            Get Started
          </button>
        </p>
      </motion.div>
    </div>
  );

  /* ─── DESKTOP (>= 1024px) ─── */
  const DesktopView = (
    <div style={{ display: "none", width: "100%", minHeight: "100vh", position: "relative" }} className="desktop-auth-view">

      {/* Full-bleed background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={loginBg} alt="Sentinel" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.55)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 75% at -5% 0%, rgba(234,88,12,0.65) 0%, rgba(194,65,12,0.3) 35%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 45% 40% at -2% -2%, rgba(251,146,60,0.5) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.88) 28%, rgba(0,0,0,0.4) 52%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)" }} />
      </div>

      {/* Logo — top left, same as Signup desktop */}
      <div style={{ position: "absolute", top: 32, left: "6vw", zIndex: 10 }}>
        <Logo />
      </div>

      {/* Right form panel */}
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "44%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5vw" }}>
        <motion.div
          initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 420 }}>

          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.8rem, 2.4vw, 2.4rem)", letterSpacing: "-0.02em", color: "white", marginBottom: 6, fontWeight: 600 }}>
            Access Portal
          </h1>
          <p style={{ color: "#71717a", fontSize: 14, marginBottom: 28, marginTop: 0 }}>
            Welcome back — sign in to your dashboard.
          </p>

          {SocialRow}
          {Divider}
          {Form}

          <p style={{ textAlign: "center", fontSize: 13, color: "#52525b", marginTop: 24, marginBottom: 0 }}>
            Don't have an account?{" "}
            <button onClick={onSwitchToSignup}
              style={{ color: "#fb923c", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, padding: 0 }}
              onMouseEnter={e => e.target.style.color = "#fdba74"}
              onMouseLeave={e => e.target.style.color = "#fb923c"}>
              Get Started
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "relative", background: "#000", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #000; -webkit-font-smoothing: antialiased; }
        a { cursor: pointer !important; }
        input { cursor: text !important; }
        ::selection { background: rgba(249,115,22,0.3); color: white; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #f97316; }
        .auth-input::placeholder { color: #52525b; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1023px) {
          .mobile-auth-view  { display: flex !important; }
          .desktop-auth-view { display: none !important; }
        }
        @media (min-width: 1024px) {
          .mobile-auth-view  { display: none !important; }
          .desktop-auth-view { display: block !important; min-height: 100vh; }
        }
      `}</style>
      {MobileView}
      {DesktopView}
    </div>
  );
}
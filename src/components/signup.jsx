import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from "lucide-react";
import signupBg from "../assets/signup.png";
import Dashboard from "./dashboard";

import { signupUser ,  googleLogin} from "../firebase/authService";
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

const pwStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};
const strengthLabel = [null, "Weak", "Fair", "Good", "Strong"];
const strengthColor = [null, "#ef4444", "#f59e0b", "#22c55e", "#10b981"];

function Field({ icon: Icon, type, placeholder, value, onChange, focused, fkey, onFocus, onBlur, rightEl, borderOverride, prefix }) {
  const isFocused = focused === fkey;
  return (
    <div style={{ position: "relative" }}>
      {!prefix && (
        <Icon style={{
          position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
          width: 16, height: 16, pointerEvents: "none",
          color: isFocused ? "#fb923c" : "#71717a",
          transition: "color 0.2s",
        }} />
      )}
      {prefix && (
        <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 6, pointerEvents: "none" }}>
          <Icon style={{ width: 15, height: 15, color: isFocused ? "#fb923c" : "#71717a", transition: "color 0.2s" }} />
          <span style={{ color: "#52525b", fontSize: 13, fontWeight: 500 }}>{prefix}</span>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)", marginLeft: 2 }} />
        </div>
      )}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={onFocus} onBlur={onBlur} required
        style={{
          width: "100%",
          paddingLeft: prefix ? 88 : 44,
          paddingRight: rightEl ? 44 : 16,
          paddingTop: 14,
          paddingBottom: 14,
          fontSize: 14,
          color: "white",
          background: "rgba(255,255,255,0.05)",
          border: borderOverride || (isFocused ? "1.5px solid rgba(249,115,22,0.7)" : "1.5px solid rgba(255,255,255,0.08)"),
          boxShadow: isFocused ? "0 0 0 3px rgba(249,115,22,0.10)" : "none",
          borderRadius: 12,
          outline: "none",
          transition: "border 0.2s, box-shadow 0.2s",
          cursor: "text",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      />
      {rightEl}
    </div>
  );
}

function Checkbox({ id, checked, onChange, children }) {
  return (
    <label htmlFor={id} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
      <div style={{ position: "relative", width: 17, height: 17, flexShrink: 0, marginTop: 1 }}>
        <input type="checkbox" id={id} checked={checked} onChange={onChange} required
          style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", cursor: "pointer", margin: 0 }} />
        <div style={{
          width: 17, height: 17, borderRadius: 4, border: checked ? "1.5px solid #f97316" : "1.5px solid rgba(255,255,255,0.15)",
          background: checked ? "linear-gradient(135deg,#f97316,#dc2626)" : "rgba(255,255,255,0.04)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}>
          {checked && <Check size={11} style={{ color: "white" }} />}
        </div>
      </div>
      <span style={{ fontSize: 12, color: "#71717a", lineHeight: 1.55 }}>{children}</span>
    </label>
  );
}

// ─── Social button (full width) ───


export default function Signup({ onSwitchToLogin }) {
  const [step, setStep]           = useState(1);
  const [name, setName]           = useState("");
  const [phone, setPhone]         = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [focused, setFocused]     = useState(null);
  const [done, setDone]           = useState(false);
  const navigate = useNavigate();
  // Checkboxes
  const [agreeTerms, setAgreeTerms]         = useState(false);
  const [agreePrivacy, setAgreePrivacy]     = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeData, setAgreeData]           = useState(false);

  const pws = pwStrength(password);

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
    // const CLIENT_ID   = "YOUR_LINKEDIN_CLIENT_ID";
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

  const handleStep1 = (e) => {
    e.preventDefault(); setError("");
    if (password !== confirm) return setError("Passwords don't match.");
    if (pws < 2) return setError("Please use a stronger password.");
    setStep(2);
  };

const handleSignup = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    // ✅ validation
    if (!agreeTerms || !agreePrivacy) {
      setError("Please accept Terms & Privacy Policy");
      return;
    }

    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    const res = await signupUser(email, password);

    console.log(res.user.uid);

    // ✅ move to next screen or dashboard
    navigate("/dashboard");

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const handleGoogle = async () => {
  try {
    const res = await googleLogin();
    console.log(res.user.uid);
    navigate("/dashboard");
  } catch (err) {
    setError(err.message);
  }
};

  // ── Step pills ──
  const StepPills = (
    <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
      {[1, 2].map(s => (
        <div key={s} style={{ height: 4, borderRadius: 99, transition: "all 0.5s", width: step >= s ? 28 : 14, background: step >= s ? "#f97316" : "rgba(255,255,255,0.12)" }} />
      ))}
    </div>
  );

  const Divider = (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
      <span style={{ color: "#52525b", fontSize: 10, letterSpacing: "0.12em", fontWeight: 500 }}>OR SIGN UP WITH EMAIL</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
    </div>
  );

  const ErrorMsg = error ? (
    <motion.p key="err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      style={{ color: "#f87171", fontSize: 12, textAlign: "center", padding: "10px 12px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", margin: 0 }}>
      {error}
    </motion.p>
  ) : null;

  // ── Success ──
  const SuccessView = (
    <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "32px 0" }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 280 }}
        style={{ width: 68, height: 68, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, background: "linear-gradient(135deg, #f97316, #dc2626)" }}>
        <Check size={28} style={{ color: "white" }} />
      </motion.div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.6rem", color: "white", marginBottom: 8, fontWeight: 600 }}>Welcome to Sentinel</h2>
      <p style={{ color: "#71717a", fontSize: 14, margin: 0 }}>Your account is ready. Redirecting…</p>
    </motion.div>
  );

  // ── Step 1: Credentials ──
  const Step1Form = (
    <motion.div key="s1" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.28 }}>
      {/* Social buttons — compact 3-col icon grid, click triggers real OAuth */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[
          { icon: <GoogleIcon />, label: "Google", fn: handleGoogle },
          { icon: <LinkedInIcon />, label: "LinkedIn", fn: handleLinkedIn },
          { icon: <XIcon />, label: "X", fn: handleTwitter },
        ].map(({ icon, label, fn }) => (
          <motion.button key={label} type="button" onClick={fn}
            whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.09)" }}
            whileTap={{ scale: 0.95 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 8px", borderRadius: 12, fontSize: 12, fontWeight: 500, color: "#a1a1aa", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.09)", cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}>
            {icon}
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      {Divider}

      <form onSubmit={handleStep1} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <Field icon={Mail} type="email" placeholder="Email address" value={email}
          onChange={e => setEmail(e.target.value)} focused={focused} fkey="email"
          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />

        <div>
          <Field icon={Lock} type={showPass ? "text" : "password"} placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} focused={focused} fkey="pass"
            onFocus={() => setFocused("pass")} onBlur={() => setFocused(null)}
            rightEl={
              <button type="button" onClick={() => setShowPass(p => !p)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#71717a", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            } />
          {password && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <div style={{ display: "flex", gap: 4, flex: 1 }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ height: 4, flex: 1, borderRadius: 99, transition: "background 0.3s", background: i <= pws ? strengthColor[pws] : "rgba(255,255,255,0.08)" }} />
                ))}
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, color: strengthColor[pws] || "#52525b" }}>{strengthLabel[pws]}</span>
            </motion.div>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <Lock style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, pointerEvents: "none", color: focused === "conf" ? "#fb923c" : "#71717a" }} />
          <input type="password" placeholder="Confirm password" value={confirm}
            onChange={e => setConfirm(e.target.value)}
            onFocus={() => setFocused("conf")} onBlur={() => setFocused(null)} required
            style={{ width: "100%", paddingLeft: 44, paddingRight: 40, paddingTop: 14, paddingBottom: 14, fontSize: 14, color: "white", background: "rgba(255,255,255,0.05)", border: focused === "conf" ? "1.5px solid rgba(249,115,22,0.7)" : confirm && password !== confirm ? "1.5px solid rgba(239,68,68,0.6)" : confirm && password === confirm ? "1.5px solid rgba(34,197,94,0.5)" : "1.5px solid rgba(255,255,255,0.08)", boxShadow: focused === "conf" ? "0 0 0 3px rgba(249,115,22,0.10)" : "none", borderRadius: 12, outline: "none", cursor: "text", fontFamily: "inherit", boxSizing: "border-box" }} />
          {confirm && password === confirm && <Check size={14} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#4ade80" }} />}
        </div>

        <AnimatePresence>{ErrorMsg}</AnimatePresence>

        <motion.button type="submit"
          whileHover={{ scale: 1.02, boxShadow: "0 0 44px rgba(249,115,22,0.5)" }} whileTap={{ scale: 0.97 }}
          style={{ width: "100%", padding: "14px 0", borderRadius: 12, color: "white", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4, background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
          Continue <ArrowRight size={15} />
        </motion.button>
      </form>
    </motion.div>
  );

  // ── Step 2: Profile + Agreements ──
  const Step2Form = (
    <motion.div key="s2" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.28 }}>
      <button onClick={() => setStep(1)}
        style={{ display: "flex", alignItems: "center", gap: 6, color: "#71717a", background: "none", border: "none", cursor: "pointer", fontSize: 12, marginBottom: 20, fontFamily: "inherit", padding: 0 }}
        onMouseEnter={e => e.currentTarget.style.color = "#d4d4d8"}
        onMouseLeave={e => e.currentTarget.style.color = "#71717a"}>
        <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>Back
      </button>

      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        {/* Full name */}
        <Field icon={User} type="text" placeholder="Full name" value={name}
          onChange={e => setName(e.target.value)} focused={focused} fkey="name"
          onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />

        {/* Phone with country code prefix */}
        <Field icon={Phone} type="tel" placeholder="Phone number" value={phone}
          onChange={e => setPhone(e.target.value)} focused={focused} fkey="phone"
          onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
          prefix="+91" />

        {/* Agreements */}
        <div style={{ display: "flex", flexDirection: "column", gap: 13, padding: "16px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.07)", marginTop: 4 }}>
          <p style={{ fontSize: 11, color: "#52525b", margin: 0, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>Agreements & Consents</p>

          <Checkbox id="terms" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)}>
            <span>
              I have read and agree to Sentinel's{" "}
              <a href="#" style={{ color: "#fb923c", textDecoration: "none" }}>Terms of Service</a>
              {" "}— required to use the platform.
            </span>
          </Checkbox>

          <Checkbox id="privacy" checked={agreePrivacy} onChange={e => setAgreePrivacy(e.target.checked)}>
            <span>
              I accept the{" "}
              <a href="#" style={{ color: "#fb923c", textDecoration: "none" }}>Privacy Policy</a>
              {" "}and consent to processing of my personal data — required.
            </span>
          </Checkbox>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

          <Checkbox id="marketing" checked={agreeMarketing} onChange={e => setAgreeMarketing(e.target.checked)}>
            I agree to receive product updates, insights, and marketing communications from Sentinel — optional.
          </Checkbox>

          <Checkbox id="data" checked={agreeData} onChange={e => setAgreeData(e.target.checked)}>
            I consent to Sentinel sharing anonymised usage data to improve AI model accuracy — optional.
          </Checkbox>
        </div>

        <AnimatePresence>{ErrorMsg}</AnimatePresence>

        <motion.button type="submit" disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 44px rgba(249,115,22,0.5)" }} whileTap={{ scale: 0.97 }}
          style={{ width: "100%", padding: "14px 0", borderRadius: 12, color: "white", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4, background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)", opacity: loading ? 0.7 : 1, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
          {loading
            ? <svg style={{ width: 20, height: 20, animation: "spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            : <><span>Create My Account</span><ArrowRight size={15}/></>}
        </motion.button>
      </form>
    </motion.div>
  );

  /* ─────────────────── MOBILE ─────────────────── */
  const MobileView = (
    <div style={{ display: "none", position: "relative", width: "100%", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }} className="mobile-auth-view">
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={signupBg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.32)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 60% at 0% 0%, rgba(234,88,12,0.5) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 10, alignSelf: "flex-start", marginBottom: 28 }}><Logo /></div>
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 420, background: "rgba(8,8,8,0.9)", border: "1.5px solid rgba(255,255,255,0.08)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)", borderRadius: 24, padding: "28px 22px", maxHeight: "85vh", overflowY: "auto" }}>
        {!done && StepPills}
        <AnimatePresence mode="wait">
          {done ? SuccessView : step === 1 ? Step1Form : Step2Form}
        </AnimatePresence>
        {!done && (
          <p style={{ textAlign: "center", fontSize: 13, color: "#52525b", marginTop: 20, marginBottom: 0 }}>
            Have an account?{" "}
            <button onClick={onSwitchToLogin}
              style={{ color: "#fb923c", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, padding: 0 }}
              onMouseEnter={e => e.target.style.color = "#fdba74"}
              onMouseLeave={e => e.target.style.color = "#fb923c"}>
              Sign In
            </button>
          </p>
        )}
      </motion.div>
    </div>
  );

  /* ─────────────────── DESKTOP ─────────────────── */
  const DesktopView = (
    <div style={{ display: "none", width: "100%", minHeight: "100vh", position: "relative" }} className="desktop-auth-view">
      {/* Full-bleed background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={signupBg} alt="Sentinel" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.55)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 75% at -5% 0%, rgba(234,88,12,0.65) 0%, rgba(194,65,12,0.3) 35%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 45% 40% at -2% -2%, rgba(251,146,60,0.5) 0%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.88) 28%, rgba(0,0,0,0.4) 52%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)" }} />
      </div>

      {/* Logo only — top left */}
      <div style={{ position: "absolute", top: 32, left: "6vw", zIndex: 10 }}>
        <Logo />
      </div>

      {/* Right form panel */}
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "44%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5vw", overflowY: "auto" }}>
        <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 440 }}>
          {!done && StepPills}
          <AnimatePresence mode="wait">
            {done ? SuccessView : step === 1 ? Step1Form : Step2Form}
          </AnimatePresence>
          {!done && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#52525b", marginTop: 24, marginBottom: 0 }}>
              Already have an account?{" "}
              <button onClick={onSwitchToLogin}
                style={{ color: "#fb923c", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, padding: 0 }}
                onMouseEnter={e => e.target.style.color = "#fdba74"}
                onMouseLeave={e => e.target.style.color = "#fb923c"}>
                Sign In
              </button>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .mobile-auth-view  { display: flex !important; }
        .desktop-auth-view { display: none !important; }
        @media (min-width: 1024px) {
          .mobile-auth-view  { display: none !important; }
          .desktop-auth-view { display: block !important; }
        }
        .auth-input::placeholder { color: #52525b; }
      `}</style>
      <div style={{ position: "relative", background: "#000", fontFamily: "'DM Sans', sans-serif" }}>
        {MobileView}
        {DesktopView}
      </div>
    </>
  );
}
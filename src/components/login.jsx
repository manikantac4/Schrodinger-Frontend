import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  Mail, Lock, User, Eye, EyeOff,
  Github, Chrome, Linkedin,
  ArrowRight, CheckCircle2, Loader2,
  ShieldCheck, RefreshCw, KeyRound, ArrowLeft
} from 'lucide-react';
import { loginUser , signupUser , googleLogin } from '../firebase/authService';
import { useNavigate } from "react-router-dom";

/* ── Google Fonts ── */
const injectFonts = () => {
  if (document.getElementById('auth-fonts')) return;
  const l = document.createElement('link');
  l.id = 'auth-fonts'; l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap';
  document.head.appendChild(l);
};

/* ══════════════════════════════════════════════
   3-D PARTICLE CANVAS BACKGROUND
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

    const orbs = [
      { x: W*0.15, y: H*0.25, r: 320, color:'99,102,241', speed:0.18, angle:0 },
      { x: W*0.80, y: H*0.20, r: 260, color:'139,92,246', speed:0.12, angle:1.2 },
      { x: W*0.55, y: H*0.75, r: 300, color:'79,70,229',  speed:0.15, angle:2.4 },
      { x: W*0.05, y: H*0.70, r: 200, color:'167,139,250',speed:0.22, angle:3.6 },
      { x: W*0.92, y: H*0.75, r: 240, color:'109,40,217', speed:0.10, angle:0.7 },
    ];

    const COUNT = 160;
    const stars = Array.from({ length: COUNT }, () => ({
      x: Math.random()*W, y: Math.random()*H, z: Math.random()*W,
      size: Math.random()*1.6+0.3, brightness: Math.random(),
      twinkleSpeed: Math.random()*0.02+0.005, twinkleOffset: Math.random()*Math.PI*2,
    }));

    const GRID = 14;
    const onMM = (e) => { mouse.current.x = (e.clientX/W-0.5)*2; mouse.current.y = (e.clientY/H-0.5)*2; };
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('mousemove', onMM);
    window.addEventListener('resize', onResize);

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0,0,W,H);
      const bg = ctx.createLinearGradient(0,0,W,H);
      bg.addColorStop(0,'#07071a'); bg.addColorStop(0.5,'#0d0b2b'); bg.addColorStop(1,'#120820');
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

      const mx = mouse.current.x*30, my = mouse.current.y*20;

      orbs.forEach((o,i) => {
        o.angle += o.speed*0.01;
        const ox = o.x + Math.cos(o.angle)*60 + mx*(0.04+i*0.012);
        const oy = o.y + Math.sin(o.angle*0.7)*45 + my*(0.03+i*0.01);
        const g = ctx.createRadialGradient(ox,oy,0,ox,oy,o.r);
        g.addColorStop(0,`rgba(${o.color},0.22)`);
        g.addColorStop(0.5,`rgba(${o.color},0.08)`);
        g.addColorStop(1,`rgba(${o.color},0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(ox,oy,o.r,0,Math.PI*2); ctx.fill();
      });

      const horizon = H*0.52+my*4, vanishX = W*0.5+mx*3;
      ctx.save(); ctx.globalAlpha=0.13; ctx.strokeStyle='#818cf8'; ctx.lineWidth=0.7;
      for (let i=0;i<=GRID;i++) { ctx.beginPath(); ctx.moveTo(vanishX,horizon); ctx.lineTo((i/GRID)*W,H); ctx.stroke(); }
      for (let j=1;j<=10;j++) { const p=Math.pow(j/10,1.8); ctx.beginPath(); ctx.moveTo(vanishX-(vanishX)*p,horizon+p*(H-horizon)); ctx.lineTo(vanishX+(W-vanishX)*p,horizon+p*(H-horizon)); ctx.stroke(); }
      ctx.restore();

      stars.forEach(s => {
        const d=s.z/W, sx=s.x+mx*d*18, sy=s.y+my*d*12;
        const tw=0.4+0.6*Math.abs(Math.sin(t*60*s.twinkleSpeed+s.twinkleOffset));
        ctx.save(); ctx.globalAlpha=s.brightness*tw; ctx.fillStyle='#c4b5fd';
        ctx.beginPath(); ctx.arc(sx,sy,s.size,0,Math.PI*2); ctx.fill(); ctx.restore();
      });

      const v=ctx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.9);
      v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(0,0,0,0.55)');
      ctx.fillStyle=v; ctx.fillRect(0,0,W,H);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('mousemove',onMM); window.removeEventListener('resize',onResize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0 }} />;
};

/* ══════════════════════════════════════════════
   FLOATING INPUT
══════════════════════════════════════════════ */
const FloatingInput = ({ label, type='text', value, onChange, id, showPasswordToggle=false, disabled=false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const inputType = showPasswordToggle ? (showPass?'text':'password') : type;
  const active = isFocused || Boolean(value);
  const F = { fontFamily:"'Outfit',sans-serif" };

  return (
    <div style={{ position:'relative', marginBottom:'1rem' }}>
      <span style={{ position:'absolute',left:'1rem',top:'50%',transform:'translateY(-50%)',color:isFocused?'#a78bfa':'#64748b',transition:'color 0.2s',pointerEvents:'none',display:'flex',zIndex:2 }}>
        <Icon size={16}/>
      </span>
      <input
        id={id} type={inputType} value={value} onChange={onChange}
        disabled={disabled}
        onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)}
        placeholder=" "
        style={{
          width:'100%', boxSizing:'border-box',
          background: disabled ? 'rgba(255,255,255,0.02)' : isFocused?'rgba(139,92,246,0.08)':'rgba(255,255,255,0.04)',
          border:`1px solid ${isFocused?'rgba(167,139,250,0.7)':'rgba(255,255,255,0.1)'}`,
          borderRadius:'0.9rem',
          padding:'1.15rem 3rem 0.5rem 2.7rem',
          color: disabled?'#475569':'#f1f5f9',
          ...F, fontSize:'0.94rem', fontWeight:400, outline:'none',
          transition:'all 0.25s',
          boxShadow: isFocused?'0 0 0 3px rgba(139,92,246,0.18)':'none',
          cursor: disabled?'not-allowed':'text',
        }}
      />
      <label htmlFor={id} style={{
        position:'absolute', left:'2.7rem', ...F, pointerEvents:'none',
        transition:'all 0.22s cubic-bezier(.4,0,.2,1)',
        ...(active
          ? {top:'0.4rem',fontSize:'0.6rem',letterSpacing:'0.1em',textTransform:'uppercase',fontWeight:600,color:'#a78bfa'}
          : {top:'50%',transform:'translateY(-50%)',fontSize:'0.875rem',color:'#64748b'}
        ),
      }}>{label}</label>
      {showPasswordToggle && (
        <button type="button" onClick={()=>setShowPass(!showPass)} style={{ position:'absolute',right:'1rem',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#64748b',cursor:'pointer',padding:0,display:'flex',alignItems:'center',transition:'color 0.2s' }}
          onMouseEnter={e=>e.currentTarget.style.color='#a78bfa'} onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
          {showPass?<EyeOff size={16}/>:<Eye size={16}/>}
        </button>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════
   OTP INPUT — 6 separate boxes
══════════════════════════════════════════════ */
const OtpInput = ({ value, onChange }) => {
  const refs = useRef([]);
  const digits = (value+'      ').slice(0,6).split('');

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      const next = [...digits]; next[i]=' ';
      onChange(next.join('').trimEnd());
      if (i > 0) refs.current[i-1]?.focus();
    }
  };
  const handleChange = (i, e) => {
    const ch = e.target.value.replace(/\D/,'').slice(-1);
    const next = [...digits]; next[i] = ch||' ';
    onChange(next.join('').trimEnd());
    if (ch && i < 5) refs.current[i+1]?.focus();
  };
  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g,'').slice(0,6);
    onChange(text);
    refs.current[Math.min(text.length,5)]?.focus();
    e.preventDefault();
  };

  return (
    <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', margin:'0.5rem 0 1.25rem' }}>
      {[0,1,2,3,4,5].map(i => (
        <input
          key={i}
          ref={el=>refs.current[i]=el}
          type="text" inputMode="numeric" maxLength={1}
          value={digits[i].trim()}
          onChange={e=>handleChange(i,e)}
          onKeyDown={e=>handleKey(i,e)}
          onPaste={handlePaste}
          style={{
            width:'2.8rem', height:'3.2rem', textAlign:'center',
            background:'rgba(255,255,255,0.05)',
            border:`1px solid ${digits[i].trim()?'rgba(167,139,250,0.7)':'rgba(255,255,255,0.12)'}`,
            borderRadius:'0.75rem',
            color:'#f1f5f9', fontFamily:"'Outfit',sans-serif",
            fontSize:'1.3rem', fontWeight:700,
            outline:'none', boxSizing:'border-box',
            transition:'all 0.2s',
            boxShadow: digits[i].trim()?'0 0 0 3px rgba(139,92,246,0.2)':'none',
          }}
          onFocus={e=>{e.target.style.borderColor='rgba(167,139,250,0.7)'; e.target.style.background='rgba(139,92,246,0.1)';}}
          onBlur={e=>{e.target.style.borderColor=digits[i].trim()?'rgba(167,139,250,0.5)':'rgba(255,255,255,0.12)'; e.target.style.background='rgba(255,255,255,0.05)';}}
        />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════
   MATH CAPTCHA
══════════════════════════════════════════════ */
const generateCaptcha = () => {
  const ops = ['+','-','×'];
  const op  = ops[Math.floor(Math.random()*ops.length)];
  let a = Math.floor(Math.random()*9)+1;
  let b = Math.floor(Math.random()*9)+1;
  if (op==='-' && b>a) [a,b]=[b,a];
  const answer = op==='+'?a+b : op==='-'?a-b : a*b;
  return { question:`${a} ${op} ${b} = ?`, answer:String(answer) };
};

const CaptchaBox = ({ onVerified }) => {
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | ok
  const F = { fontFamily:"'Outfit',sans-serif" };

  const refresh = () => { setCaptcha(generateCaptcha()); setInput(''); setStatus('idle'); };

  const verify = () => {
    if (input.trim() === captcha.answer) {
      setStatus('ok');
      setTimeout(()=>onVerified(), 600);
    } else {
      setStatus('error');
      refresh();
      setTimeout(()=>setStatus('idle'),300);
    }
  };

  return (
    <div style={{ marginBottom:'1rem' }}>
      <p style={{ ...F, fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#64748b', fontWeight:600, marginBottom:'0.6rem' }}>
        Captcha Verification
      </p>
      <div style={{ display:'flex', gap:'0.6rem', alignItems:'center' }}>
        {/* captcha display */}
        <div style={{
          flex:1, padding:'0.7rem 1rem',
          background:'rgba(99,102,241,0.08)',
          border:'1px solid rgba(167,139,250,0.25)',
          borderRadius:'0.85rem',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <span style={{
            ...F, fontSize:'1.1rem', fontWeight:800,
            color:'#c4b5fd', letterSpacing:'0.12em',
            fontStyle:'italic',
            textShadow:'0 0 12px rgba(167,139,250,0.6)',
            userSelect:'none',
            // Distort a bit visually
            filter:'blur(0.3px)',
          }}>{captcha.question}</span>
          <button type="button" onClick={refresh} title="Refresh" style={{ background:'none',border:'none',color:'#64748b',cursor:'pointer',padding:0,display:'flex',transition:'color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='#a78bfa'} onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
            <RefreshCw size={15}/>
          </button>
        </div>
        {/* answer input */}
        <input
          type="text" value={input} maxLength={4}
          onChange={e=>{ setInput(e.target.value); setStatus('idle'); }}
          onKeyDown={e=>{ if(e.key==='Enter') verify(); }}
          placeholder="Ans"
          style={{
            width:'4.5rem', padding:'0.7rem 0.6rem', textAlign:'center',
            background: status==='error'?'rgba(239,68,68,0.08)' : status==='ok'?'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.05)',
            border:`1px solid ${status==='error'?'rgba(239,68,68,0.6)' : status==='ok'?'rgba(16,185,129,0.6)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius:'0.85rem', color:'#f1f5f9',
            ...F, fontSize:'0.95rem', fontWeight:700,
            outline:'none', transition:'all 0.2s',
          }}
        />
        <button type="button" onClick={verify} style={{
          padding:'0.7rem 0.9rem', borderRadius:'0.85rem',
          background: status==='ok'?'linear-gradient(135deg,#059669,#10b981)':'linear-gradient(135deg,#5b21b6,#4f46e5)',
          border:'none', color:'#fff', ...F, fontSize:'0.78rem', fontWeight:700,
          cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap',
        }}>
          {status==='ok'?<CheckCircle2 size={16}/>:'Go'}
        </button>
      </div>
      {status==='error' && (
        <p style={{ ...F, fontSize:'0.72rem', color:'#f87171', marginTop:'0.4rem', paddingLeft:'0.25rem' }}>
          ✕ Wrong answer — try the new one
        </p>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════
   PASSWORD STRENGTH METER
══════════════════════════════════════════════ */
const PasswordStrength = ({ password }) => {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['','Weak','Fair','Good','Strong'];
  const colors = ['','#ef4444','#f59e0b','#3b82f6','#10b981'];

  if (!password) return null;

  return (
    <div style={{ marginBottom:'0.75rem' }}>
      <div style={{ display:'flex', gap:'0.3rem', marginBottom:'0.25rem' }}>
        {[1,2,3,4].map(i=>(
          <div key={i} style={{
            flex:1, height:'3px', borderRadius:'2px',
            background: i<=score ? colors[score] : 'rgba(255,255,255,0.1)',
            transition:'background 0.35s',
          }}/>
        ))}
      </div>
      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:'0.68rem', color:colors[score], fontWeight:600 }}>
        {labels[score]}
      </p>
    </div>
  );
};

/* ══════════════════════════════════════════════
   SOCIAL BUTTON
══════════════════════════════════════════════ */
const SocialButton = ({  label }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        display:'flex',alignItems:'center',justifyContent:'center',gap:'0.4rem',
        padding:'0.65rem 0.3rem', borderRadius:'0.85rem',
        background: hov?'rgba(139,92,246,0.15)':'rgba(255,255,255,0.04)',
        border:`1px solid ${hov?'rgba(167,139,250,0.4)':'rgba(255,255,255,0.09)'}`,
        color:'#e2e8f0', cursor:'pointer',
        fontFamily:"'Outfit',sans-serif", fontSize:'0.78rem', fontWeight:500,
        transform: hov?'translateY(-2px) scale(1.03)':'none',
        transition:'all 0.2s ease',
        boxShadow: hov?'0 4px 18px rgba(99,102,241,0.2)':'none',
      }}
    >
      <Icon size={16} style={{ color:hov?'#a78bfa':'#64748b',transition:'color 0.2s',flexShrink:0 }}/>
      <span>{label}</span>
    </button>
  );
};

/* ══════════════════════════════════════════════
   PRIMARY BUTTON
══════════════════════════════════════════════ */
const PrimaryBtn = ({ children, onClick, type='button', disabled=false, success=false, loading=false }) => (
  <button
    type={type} onClick={onClick} disabled={disabled||loading}
    style={{
      width:'100%', padding:'0.95rem', borderRadius:'0.9rem', border:'none',
      background: success
        ? 'linear-gradient(135deg,#059669,#10b981)'
        : 'linear-gradient(135deg,#5b21b6,#4f46e5,#7c3aed)',
      color:'#fff', fontFamily:"'Outfit',sans-serif",
      fontSize:'0.95rem', fontWeight:700, letterSpacing:'0.04em',
      cursor: disabled||loading?'default':'pointer',
      display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
      boxShadow: success?'0 4px 20px rgba(16,185,129,0.4)':'0 4px 28px rgba(99,102,241,0.4)',
      transition:'transform 0.15s, box-shadow 0.25s',
      marginTop:'0.1rem',
    }}
    onMouseEnter={e=>{ if(!disabled&&!loading){ e.currentTarget.style.transform='translateY(-2px) scale(1.015)'; e.currentTarget.style.boxShadow='0 8px 36px rgba(99,102,241,0.55)'; }}}
    onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=success?'0 4px 20px rgba(16,185,129,0.4)':'0 4px 28px rgba(99,102,241,0.4)'; }}
    onMouseDown={e=>{ e.currentTarget.style.transform='scale(0.97)'; }}
    onMouseUp={e=>{ e.currentTarget.style.transform='translateY(-2px) scale(1.015)'; }}
  >
    {loading ? <Loader2 size={19} className="spin-icon"/> : children}
  </button>
);

/* ══════════════════════════════════════════════
   BACK LINK
══════════════════════════════════════════════ */
const BackLink = ({ label, onClick }) => (
  <button onClick={onClick} style={{
    background:'none', border:'none', color:'#64748b',
    fontFamily:"'Outfit',sans-serif", fontSize:'0.8rem', fontWeight:500,
    cursor:'pointer', display:'flex', alignItems:'center', gap:'0.35rem',
    marginBottom:'1.4rem', transition:'color 0.2s', padding:0,
  }}
    onMouseEnter={e=>e.currentTarget.style.color='#a78bfa'}
    onMouseLeave={e=>e.currentTarget.style.color='#64748b'}
  >
    <ArrowLeft size={14}/>{label}
  </button>
);

/* ══════════════════════════════════════════════
   STEP INDICATOR
══════════════════════════════════════════════ */
const StepDots = ({ total, current }) => (
  <div style={{ display:'flex', gap:'0.35rem', marginBottom:'1.5rem' }}>
    {Array.from({length:total},(_,i)=>(
      <div key={i} style={{
        height:'3px', borderRadius:'2px',
        flex: i===current?2:1,
        background: i<current?'#7c3aed' : i===current?'#a78bfa' : 'rgba(255,255,255,0.1)',
        transition:'all 0.4s ease',
      }}/>
    ))}
  </div>
);

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
// Screens: 'login' | 'signup' | 'forgot' | 'otp' | 'captcha' | 'newpass' | 'done'
export default function App() {
  const [screen, setScreen] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:'', password:'', fullName:'', confirmPassword:'',
    forgotEmail:'', otp:'', newPassword:'', confirmNewPassword:'',
  });

  const cardRef    = useRef(null);
  const contentRef = useRef(null);
  const loaded     = useRef(false);

  useEffect(()=>{ injectFonts(); },[]);

  /* ── Page-load window-snap ── */
  useEffect(()=>{
    if (loaded.current||!cardRef.current) return;
    loaded.current=true;
    gsap.set(cardRef.current,{opacity:0});
    gsap.fromTo(cardRef.current,
      {scale:0.55,opacity:0,y:-70,rotateX:20,rotateY:-8},
      {scale:1,opacity:1,y:0,rotateX:0,rotateY:0,duration:0.85,ease:'back.out(1.6)',delay:0.2}
    );
  },[]);

  /* ── Screen transition ── */
  const transitionTo = useCallback((nextScreen, dir=1) => {
    gsap.to(contentRef.current,{
      opacity:0, x: dir*32, duration:0.24, ease:'power2.in',
      onComplete:()=>{ setScreen(nextScreen); setIsSubmitting(false); setIsSuccess(false); }
    });
  },[]);

  useEffect(()=>{
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current,{opacity:0,x:-28},{opacity:1,x:0,duration:0.4,ease:'power2.out'});
  },[screen]);

  const simulate = (cb, ms=1800) => {
    setIsSubmitting(true);
    setTimeout(()=>{ setIsSubmitting(false); setIsSuccess(true); setTimeout(()=>{ setIsSuccess(false); cb(); },700); }, ms);
  };

  const F = { fontFamily:"'Outfit',sans-serif" };

const handleSignIn = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    setIsSubmitting(true);

    const res = await loginUser(formData.email, formData.password);

    const user = res.user;

    console.log("Logged in UID:", user.uid);

    // ✅ redirect to dashboard
    navigate("/dashboard");

  } catch (err) {
    console.error(err.message);

    // 🔥 better UX
    if (err.code === "auth/user-not-found") {
      alert("User not found");
    } else if (err.code === "auth/wrong-password") {
      alert("Incorrect password");
    } else {
      alert(err.message);
    }

  } finally {
    setIsSubmitting(false);
  }
};


const handleGoogleLogin = async () => {
  try {
    setIsSubmitting(true);

    const res = await googleLogin();

    const user = res.user;

    console.log("Google UID:", user.uid);
    console.log("Email:", user.email);

    // ✅ redirect
    navigate("/dashboard");

  } catch (err) {
    console.error(err.message);
    alert("Google login failed");
  } finally {
    setIsSubmitting(false);
  }
};
  /* ── SCREEN CONTENT ── */
  const renderScreen = () => {
    switch(screen) {

      /* ────────── LOGIN ────────── */
      case 'login': return (
        <>
          <EyeBrow label="— Secure Login"/>
          <H1>Welcome Back</H1>
          <Sub>Enter your credentials to continue</Sub>

          <form onSubmit={handleSignIn}>
            <FloatingInput id="email" label="Email Address" type="email" icon={Mail}
              value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
            <FloatingInput id="password" label="Password" type="password" icon={Lock}
              value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})}
              showPasswordToggle/>

            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',margin:'0.2rem 0 0.85rem' }}>
              <label style={{ display:'flex',alignItems:'center',gap:'0.45rem',cursor:'pointer' }}>
                <input type="checkbox" style={{ accentColor:'#7c3aed',width:'0.88rem',height:'0.88rem' }}/>
                <span style={{ ...F,fontSize:'0.78rem',color:'#64748b' }}>Remember me</span>
              </label>
              <button type="button" onClick={()=>transitionTo('forgot')} style={{ background:'none',border:'none',...F,fontSize:'0.78rem',fontWeight:600,color:'#a78bfa',cursor:'pointer',transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#c4b5fd'} onMouseLeave={e=>e.currentTarget.style.color='#a78bfa'}>
                Forgot Password?
              </button>
            </div>

            <PrimaryBtn type="submit" loading={isSubmitting} success={isSuccess}>
              <span>Sign In</span><ArrowRight size={17}/>
            </PrimaryBtn>
          </form>

          <Divider/>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.6rem' }}>
            <SocialButton label="Google" onClick={handleGoogleLogin} />
            <SocialButton icon={Github} label="GitHub"/>
            <SocialButton icon={Linkedin} label="LinkedIn"/>
          </div>
          <ToggleLink mode="login" onClick={()=>transitionTo('signup')}/>
        </>
      );

      /* ────────── SIGNUP ────────── */
      case 'signup': return (
        <>
          <EyeBrow label="— New Account"/>
          <H1>Create Account</H1>
          <Sub>Join our community and start today</Sub>

          <form onSubmit={handleSignup}>
            <FloatingInput id="fullName" label="Full Name" type="text" icon={User}
              value={formData.fullName} onChange={e=>setFormData({...formData,fullName:e.target.value})}/>
            <FloatingInput id="email2" label="Email Address" type="email" icon={Mail}
              value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
            <FloatingInput id="pass2" label="Password" type="password" icon={Lock}
              value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})}
              showPasswordToggle/>
            <PasswordStrength password={formData.password}/>
            <FloatingInput id="conf2" label="Confirm Password" type="password" icon={Lock}
              value={formData.confirmPassword} onChange={e=>setFormData({...formData,confirmPassword:e.target.value})}
              showPasswordToggle/>

            <PrimaryBtn type="submit" loading={isSubmitting} success={isSuccess}>
              <span>Create Account</span><ArrowRight size={17}/>
            </PrimaryBtn>
          </form>

          <Divider/>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.6rem' }}>
            <SocialButton icon={Chrome} label="Google"/>
            <SocialButton icon={Github} label="GitHub"/>
            <SocialButton icon={Linkedin} label="LinkedIn"/>
          </div>
          <ToggleLink mode="signup" onClick={()=>transitionTo('login',-1)}/>
        </>
      );

      /* ────────── FORGOT PASSWORD ────────── */
      case 'forgot': return (
        <>
          <BackLink label="Back to Sign In" onClick={()=>transitionTo('login',-1)}/>
          <StepDots total={4} current={0}/>

          <div style={{ display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.5rem' }}>
            <div style={{ width:'2.6rem',height:'2.6rem',borderRadius:'0.75rem',background:'rgba(99,102,241,0.15)',border:'1px solid rgba(167,139,250,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <Mail size={18} style={{ color:'#a78bfa' }}/>
            </div>
            <div>
              <H1 small>Forgot Password?</H1>
              <Sub>We'll send a 6-digit code to your email</Sub>
            </div>
          </div>

          <div style={{ margin:'1.4rem 0 1rem' }}>
            <FloatingInput id="forgotEmail" label="Email Address" type="email" icon={Mail}
              value={formData.forgotEmail} onChange={e=>setFormData({...formData,forgotEmail:e.target.value})}/>
          </div>

          <PrimaryBtn loading={isSubmitting} success={isSuccess}
            onClick={()=>simulate(()=>transitionTo('captcha'))}>
            <span>Send Reset Code</span><ArrowRight size={17}/>
          </PrimaryBtn>
        </>
      );

      /* ────────── CAPTCHA ────────── */
      case 'captcha': return (
        <>
          <BackLink label="Back" onClick={()=>transitionTo('forgot',-1)}/>
          <StepDots total={4} current={1}/>

          <div style={{ display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'1.5rem' }}>
            <div style={{ width:'2.6rem',height:'2.6rem',borderRadius:'0.75rem',background:'rgba(99,102,241,0.15)',border:'1px solid rgba(167,139,250,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <ShieldCheck size={18} style={{ color:'#a78bfa' }}/>
            </div>
            <div>
              <H1 small>Human Check</H1>
              <Sub>Solve the puzzle to continue</Sub>
            </div>
          </div>

          <CaptchaBox onVerified={()=>transitionTo('otp')}/>

          <p style={{ ...F,fontSize:'0.75rem',color:'#475569',textAlign:'center',marginTop:'0.75rem' }}>
            This protects your account from automated attacks
          </p>
        </>
      );

      /* ────────── OTP ────────── */
      case 'otp': return (
        <>
          <BackLink label="Back" onClick={()=>transitionTo('captcha',-1)}/>
          <StepDots total={4} current={2}/>

          <div style={{ textAlign:'center',marginBottom:'1.4rem' }}>
            <div style={{ width:'3rem',height:'3rem',borderRadius:'50%',background:'rgba(99,102,241,0.15)',border:'1px solid rgba(167,139,250,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 0.85rem' }}>
              <KeyRound size={18} style={{ color:'#a78bfa' }}/>
            </div>
            <H1 small>Enter OTP</H1>
            <Sub>We sent a 6-digit code to <strong style={{ color:'#c4b5fd' }}>{formData.forgotEmail||'your email'}</strong></Sub>
          </div>

          <OtpInput value={formData.otp} onChange={v=>setFormData({...formData,otp:v})}/>

          <PrimaryBtn loading={isSubmitting} success={isSuccess}
            disabled={formData.otp.replace(/\s/g,'').length<6}
            onClick={()=>simulate(()=>transitionTo('newpass'))}>
            <span>Verify Code</span><ArrowRight size={17}/>
          </PrimaryBtn>

          <p style={{ ...F,fontSize:'0.78rem',color:'#475569',textAlign:'center',marginTop:'1rem' }}>
            Didn't receive it?{' '}
            <button style={{ background:'none',border:'none',...F,fontSize:'0.78rem',fontWeight:600,color:'#a78bfa',cursor:'pointer' }}
              onClick={()=>{}}>Resend Code</button>
          </p>
        </>
      );

      /* ────────── NEW PASSWORD ────────── */
      case 'newpass': return (
        <>
          <BackLink label="Back" onClick={()=>transitionTo('otp',-1)}/>
          <StepDots total={4} current={3}/>

          <div style={{ display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'1.5rem' }}>
            <div style={{ width:'2.6rem',height:'2.6rem',borderRadius:'0.75rem',background:'rgba(16,185,129,0.12)',border:'1px solid rgba(16,185,129,0.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <Lock size={18} style={{ color:'#34d399' }}/>
            </div>
            <div>
              <H1 small>Set New Password</H1>
              <Sub>Choose a strong new password</Sub>
            </div>
          </div>

          <FloatingInput id="newPass" label="New Password" type="password" icon={Lock}
            value={formData.newPassword} onChange={e=>setFormData({...formData,newPassword:e.target.value})}
            showPasswordToggle/>
          <PasswordStrength password={formData.newPassword}/>
          <FloatingInput id="confNewPass" label="Confirm New Password" type="password" icon={Lock}
            value={formData.confirmNewPassword} onChange={e=>setFormData({...formData,confirmNewPassword:e.target.value})}
            showPasswordToggle/>

          {/* match indicator */}
          {formData.confirmNewPassword && (
            <p style={{ ...F,fontSize:'0.72rem',marginBottom:'0.75rem',paddingLeft:'0.2rem',
              color: formData.newPassword===formData.confirmNewPassword?'#34d399':'#f87171' }}>
              {formData.newPassword===formData.confirmNewPassword?'✓ Passwords match':'✕ Passwords do not match'}
            </p>
          )}

          <PrimaryBtn loading={isSubmitting} success={isSuccess}
            disabled={!formData.newPassword||formData.newPassword!==formData.confirmNewPassword}
            onClick={()=>simulate(()=>transitionTo('done'))}>
            <span>Set Password</span><CheckCircle2 size={17}/>
          </PrimaryBtn>
        </>
      );

      /* ────────── DONE ────────── */
      case 'done': return (
        <div style={{ textAlign:'center', padding:'1rem 0' }}>
          <div style={{ width:'4.5rem',height:'4.5rem',borderRadius:'50%',background:'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(5,150,105,0.1))',border:'1px solid rgba(52,211,153,0.4)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1.25rem',boxShadow:'0 0 32px rgba(16,185,129,0.25)' }}>
            <CheckCircle2 size={32} style={{ color:'#34d399' }}/>
          </div>
          <H1 small>Password Updated!</H1>
          <Sub>Your password has been reset successfully. You can now sign in.</Sub>
          <div style={{ marginTop:'1.75rem' }}>
            <PrimaryBtn onClick={()=>transitionTo('login')}>
              <span>Back to Sign In</span><ArrowRight size={17}/>
            </PrimaryBtn>
          </div>
        </div>
      );

      default: return null;
    }
  };

  /* ── Layout components (defined inline to keep file single) ── */
  function EyeBrow({ label }) {
    return <p style={{ ...F,fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'#7c3aed',marginBottom:'0.4rem' }}>{label}</p>;
  }
  function H1({ children, small }) {
    return <h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:small?'clamp(1.4rem,3vw,1.7rem)':'clamp(1.85rem,5vw,2.35rem)',fontWeight:400,color:'#f1f5f9',lineHeight:1.12,letterSpacing:'-0.01em',marginBottom:'0.35rem' }}>{children}</h1>;
  }
  function Sub({ children }) {
    return <p style={{ ...F,fontSize:'0.84rem',color:'#64748b',marginBottom:'1.4rem' }}>{children}</p>;
  }
  function Divider() {
    return (
      <div style={{ display:'flex',alignItems:'center',margin:'1.3rem 0' }}>
        <div style={{ flex:1,height:'1px',background:'rgba(255,255,255,0.08)' }}/>
        <span style={{ ...F,padding:'0 0.9rem',fontSize:'0.62rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'#475569',fontWeight:600 }}>Or continue with</span>
        <div style={{ flex:1,height:'1px',background:'rgba(255,255,255,0.08)' }}/>
      </div>
    );
  }
  function ToggleLink({ mode, onClick }) {
    return (
      <p style={{ ...F,marginTop:'1.4rem',textAlign:'center',fontSize:'0.82rem',color:'#64748b' }}>
        {mode==='login'?"Don't have an account?":'Already have an account?'}{' '}
        <button onClick={onClick} style={{ background:'none',border:'none',...F,fontSize:'0.82rem',fontWeight:700,color:'#a78bfa',cursor:'pointer',transition:'color 0.2s' }}
          onMouseEnter={e=>e.currentTarget.style.color='#c4b5fd'} onMouseLeave={e=>e.currentTarget.style.color='#a78bfa'}>
          {mode==='login'?'Sign Up':'Sign In'}
        </button>
      </p>
    );
  }

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes spinAnim{to{transform:rotate(360deg);}}
        .spin-icon{animation:spinAnim 1s linear infinite;}
        input:-webkit-autofill,input:-webkit-autofill:focus{
          -webkit-box-shadow:0 0 0 1000px #0f0c2a inset!important;
          -webkit-text-fill-color:#f1f5f9!important;caret-color:#f1f5f9;
        }
      `}</style>

      <ParticleCanvas/>

      <main style={{
        position:'relative',zIndex:1,
        minHeight:'100vh',width:'100%',
        display:'flex',alignItems:'center',justifyContent:'center',
        padding:'1.5rem',perspective:'1000px',
      }}>
        <div ref={cardRef} style={{
          width:'100%',maxWidth:'455px',
          background:'rgba(15,12,42,0.68)',
          backdropFilter:'blur(32px)',WebkitBackdropFilter:'blur(32px)',
          border:'1px solid rgba(167,139,250,0.18)',
          borderRadius:'1.75rem',
          padding:'clamp(1.75rem,5vw,2.5rem)',
          boxShadow:`0 2px 0 rgba(167,139,250,0.12) inset,0 0 0 1px rgba(255,255,255,0.04) inset,0 32px 80px rgba(0,0,0,0.7),0 0 60px rgba(99,102,241,0.1)`,
          opacity:0,
        }}>
          <div ref={contentRef}>
            {renderScreen()}
          </div>
        </div>
      </main>

      <div style={{
        position:'fixed',bottom:'1.2rem',left:'50%',transform:'translateX(-50%)',
        ...F,fontSize:'0.6rem',letterSpacing:'0.22em',textTransform:'uppercase',
        color:'#334155',whiteSpace:'nowrap',zIndex:2,
      }}>
        © 2026 Lumina Systems · Secure Authentication
      </div>
    </>
  );
}
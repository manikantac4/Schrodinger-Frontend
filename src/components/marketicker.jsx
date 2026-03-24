import { useState } from "react";

const SEED_DATA = [
  { label: "CRUDE OIL",   value_str: "$98.65",    change: -11.80, unit: "$/bbl",   desc: "WTI Crude Oil",      open: "$110.40", high: "$99.20",    low: "$97.80"   },
  { label: "GOLD",        value_str: "$4,430.56", change: -2.50,  unit: "$/oz",    desc: "Gold Spot",          open: "$4,542.00", high: "$4,550.00", low: "$4,420.00" },
  { label: "USD/INR",     value_str: "₹93.82",    change: +0.67,  unit: "pair",    desc: "US Dollar / Rupee",  open: "₹93.19",  high: "₹94.10",    low: "₹93.05"   },
  { label: "EUR/USD",     value_str: "1.1587",    change: +0.40,  unit: "pair",    desc: "Euro / US Dollar",   open: "1.1541",  high: "1.1610",    low: "1.1530"   },
  { label: "BTC",         value_str: "$70,976",   change: +3.29,  unit: "USD",     desc: "Bitcoin",            open: "$68,710", high: "$71,400",   low: "$68,200"  },
  { label: "S&P 500",     value_str: "6,599",     change: +1.43,  unit: "pts",     desc: "S&P 500 Index",      open: "6,506",   high: "6,620",     low: "6,500"    },
  { label: "NIFTY 50",    value_str: "22,941",    change: +1.90,  unit: "pts",     desc: "Nifty 50 Index",     open: "22,514",  high: "23,000",    low: "22,480"   },
  { label: "NATURAL GAS", value_str: "$2.90",     change: -1.30,  unit: "$/MMBtu", desc: "Natural Gas",        open: "$2.94",   high: "$2.97",     low: "$2.88"    },
  { label: "SILVER",      value_str: "$65.61",    change: -3.20,  unit: "$/oz",    desc: "Silver Spot",        open: "$67.78",  high: "$68.00",    low: "$65.20"   },
  { label: "BRENT OIL",   value_str: "$94.03",    change: -11.60, unit: "$/bbl",   desc: "Brent Crude Oil",    open: "$106.40", high: "$94.80",    low: "$93.50"   },
];

function TickerItem({ t }) {
  const [hovered, setHovered] = useState(false);
  const up = t.change >= 0;
  const col = up ? "#10b981" : "#ef4444";
  const arrow = up ? "▲" : "▼";
  const absCh = Math.abs(t.change).toFixed(2);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 28px",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: 10, fontWeight: 700, color: "#52525b", letterSpacing: "0.1em" }}>
        {t.label}
      </span>
      <span style={{ fontSize: 13, fontWeight: 700, color: "white", fontVariantNumeric: "tabular-nums" }}>
        {t.value_str}
      </span>
      <span style={{ fontSize: 11, fontWeight: 600, color: col }}>
        {arrow} {absCh}%
      </span>

      {/* Popup */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#18181b",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            padding: "10px 14px",
            minWidth: 170,
            zIndex: 10,
            whiteSpace: "normal",
            pointerEvents: "none",
          }}
        >
          {/* Caret */}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgba(255,255,255,0.12)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% - 1px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #18181b",
              zIndex: 1,
            }}
          />

          <div style={{ fontSize: 11, fontWeight: 700, color: "#a1a1aa", letterSpacing: "0.08em", marginBottom: 6 }}>
            {t.desc}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
            {t.value_str}
          </div>

          {[
            { key: "Change", val: `${arrow} ${absCh}%`, color: col },
            { key: "Open",   val: t.open,  color: "#d4d4d8" },
            { key: "High",   val: t.high,  color: "#10b981" },
            { key: "Low",    val: t.low,   color: "#ef4444" },
            { key: "Unit",   val: t.unit,  color: "#71717a" },
          ].map(({ key, val, color }) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, marginTop: 3 }}>
              <span style={{ color: "#52525b" }}>{key}</span>
              <span style={{ color }}>{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MarketTicker() {
  const items = [...SEED_DATA, ...SEED_DATA];

  return (
    <div style={{ width: "100%", background: "#000", fontFamily: "monospace" }}>
      {/* Status bar */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 6,
          padding: "4px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
        <span style={{ fontSize: 10, color: "#52525b", letterSpacing: "0.05em" }}>
          Seed data · Mar 24, 2026
        </span>
      </div> */}

      {/* Ticker strip */}
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Fades */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right,#000,transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left,#000,transparent)", zIndex: 2, pointerEvents: "none" }} />

        {/* Scrolling track */}
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "ticker-scroll 40s linear infinite",
          }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}
        >
          {items.map((t, i) => (
            <TickerItem key={i} t={t} />
          ))}
        </div>

        <style>{`
          @keyframes ticker-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  );
}
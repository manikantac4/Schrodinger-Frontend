// ═══════════════════════════════════════════════════════════════════════
//  SENTINEL — Insights Engine  (LIVE DATA ONLY)
//  All data fetched from Flask backend → /api/news  /api/market
//  No mock or dummy data.
// ═══════════════════════════════════════════════════════════════════════

const BACKEND = "http://localhost:5000";

// ── Exported so MarketTicker can import it ────────────────────────────
// This is a reactive store: call loadMarketTickers() to populate,
// then read MARKET_TICKERS. In Dashboard.jsx we manage state directly.
export let MARKET_TICKERS = [];

// ── Keyword → business insight mapping ───────────────────────────────
const INSIGHT_MAP = {
  oil: {
    event: "Oil Price Surge Detected",
    severity: "HIGH", color: "#ef4444",
    impact: ["Fuel & logistics costs rising sharply", "Manufacturing input costs increasing", "Energy-intensive sectors under pressure", "Consumer prices likely to follow"],
    business_effect: "Profit margins may compress 10–20% in Q4",
    recommendations: [{ icon: "📦", text: "Pre-stock critical inventory now" }, { icon: "🚚", text: "Lock freight contracts at current rates" }, { icon: "💰", text: "Review and adjust pricing strategy" }, { icon: "⚡", text: "Explore energy hedging instruments" }],
  },
  inflation: {
    event: "Inflationary Pressure Detected",
    severity: "MEDIUM", color: "#f59e0b",
    impact: ["Consumer purchasing power declining", "Input cost escalation across sectors", "Central bank tightening likely", "Currency depreciation risk elevated"],
    business_effect: "Revenue projections may need 8–15% downward revision",
    recommendations: [{ icon: "📊", text: "Revise annual financial forecasts" }, { icon: "🔒", text: "Lock in supplier contracts long-term" }, { icon: "🎯", text: "Focus on high-margin product lines" }, { icon: "💹", text: "Consider inflation-linked pricing" }],
  },
  "supply chain": {
    event: "Supply Chain Disruption Alert",
    severity: "HIGH", color: "#ef4444",
    impact: ["Delivery timelines extended 2–4 weeks", "Raw material availability declining", "Just-in-time inventory at high risk", "Spot market prices spiking"],
    business_effect: "Production targets may miss by 15–25% this quarter",
    recommendations: [{ icon: "🏭", text: "Activate backup supplier network" }, { icon: "📦", text: "Increase safety stock levels" }, { icon: "🗺️", text: "Diversify sourcing geographically" }, { icon: "📱", text: "Deploy real-time shipment tracking" }],
  },
  "market crash": {
    event: "Financial Market Stress Signal",
    severity: "CRITICAL", color: "#dc2626",
    impact: ["Equity valuations under significant pressure", "Credit conditions tightening rapidly", "Consumer confidence declining", "Investment appetite deteriorating"],
    business_effect: "Funding rounds and credit lines may dry up in 60–90 days",
    recommendations: [{ icon: "🏦", text: "Secure credit facilities before market closes" }, { icon: "✂️", text: "Implement cost reduction measures" }, { icon: "📉", text: "Pause non-essential capex" }, { icon: "🤝", text: "Negotiate extended payment terms" }],
  },
  war: {
    event: "Geopolitical Risk Escalation",
    severity: "CRITICAL", color: "#dc2626",
    impact: ["Commodity supply routes disrupted", "Trade corridors experiencing delays", "Insurance premiums rising", "Currency volatility increasing"],
    business_effect: "Cross-border operations face 20–35% cost increase",
    recommendations: [{ icon: "🛡️", text: "Review geopolitical risk exposure" }, { icon: "🌍", text: "Identify alternative trade routes" }, { icon: "📋", text: "Update business continuity plans" }, { icon: "🔄", text: "Diversify supplier base regionally" }],
  },
  economy: {
    event: "Macroeconomic Headwinds Detected",
    severity: "MEDIUM", color: "#f59e0b",
    impact: ["GDP growth projections revised down", "Consumer spending softening", "Business investment declining", "Employment market showing stress"],
    business_effect: "Demand forecasts may need 10–18% downward adjustment",
    recommendations: [{ icon: "📈", text: "Stress test revenue scenarios" }, { icon: "🎯", text: "Double down on retention over acquisition" }, { icon: "💡", text: "Identify new revenue streams" }, { icon: "⚙️", text: "Optimize operational efficiency" }],
  },
};

export function processArticle(article) {
  const text = `${article.title || ""} ${article.description || ""}`.toLowerCase();
  const keys = Object.keys(INSIGHT_MAP);
  const match = keys.find(k => text.includes(k)) || "economy";
  return { ...INSIGHT_MAP[match], article };
}

// ── Live fetch functions ──────────────────────────────────────────────
export async function fetchLiveNews() {
  const res = await fetch(`${BACKEND}/api/news`);
  if (!res.ok) throw new Error(`News API ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.articles || [];
}

export async function fetchLiveMarket() {
  const res = await fetch(`${BACKEND}/api/market`);
  if (!res.ok) throw new Error(`Market API ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  // Normalise to shape MarketTicker expects: { label, value, change, unit, suffix }
  const tickers = (data.tickers || []).map(t => ({
    label:      t.label,
    value:      t.value,        // raw number
    change:     t.change,       // raw number (%)
    unit:       t.unit,
    suffix:     t.suffix,
    value_str:  t.value_str,    // pre-formatted string
    isPositive: t.isPositive,
  }));
  MARKET_TICKERS = tickers;    // update exported ref for MarketTicker
  return tickers;
}

export async function fetchInsights() {
  const [articles, tickers] = await Promise.all([fetchLiveNews(), fetchLiveMarket()]);
  const signals  = articles.map(a => ({
    title:       a.title,
    description: a.description || "",
    source:      a.source?.name || a.source || "",
    publishedAt: a.publishedAt || new Date().toISOString(),
    url:         a.url || "#",
    tags:        [],
  }));
  const insight = signals.length ? processArticle(signals[0]) : null;
  return { signals, insight, tickers };
}
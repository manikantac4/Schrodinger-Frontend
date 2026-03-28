import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronDown, 
  Newspaper, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles
} from 'lucide-react';

// Data
const user = {
  name: "Pandu Ranga",
  business: "Paradise Restaurant",
  industry: "Food"
};

const news = [
  {
    id: 1,
    headline: "Tomato prices surge by 40% due to supply shortage",
    description: "Unseasonal rains have disrupted the supply chain, leading to a sharp increase in tomato prices across wholesale markets.",
    tag: "Supply Chain",
    impact: "negative"
  },
  {
    id: 2,
    headline: "New local food festival announced for next month",
    description: "The city council has announced a week-long food festival to promote local businesses and culinary tourism.",
    tag: "Local Event",
    impact: "positive"
  },
  {
    id: 3,
    headline: "Energy costs expected to stabilize in Q3",
    description: "Recent policy changes and increased renewable output are projected to stabilize commercial energy rates.",
    tag: "Utility",
    impact: "positive"
  },
  {
    id: 4,
    headline: "Labor shortage continues to affect hospitality sector",
    description: "Restaurants and hotels are struggling to find skilled staff as the industry faces a prolonged labor shortage.",
    tag: "Labor",
    impact: "negative"
  }
];

const impacts = [
  {
    id: 1,
    title: "Increased ingredient cost",
    explanation: "Tomato and onion prices are up 40%, affecting your signature curries.",
    severity: "High",
    icon: TrendingUp,
    color: "text-[#f97316]",
    bg: "bg-[rgba(249,115,22,0.1)]",
    border: "border-[rgba(249,115,22,0.3)]"
  },
  {
    id: 2,
    title: "Higher footfall expected",
    explanation: "Upcoming local food festival could increase weekend traffic by 25%.",
    severity: "Low",
    icon: Users,
    color: "text-[#fbbf24]",
    bg: "bg-[rgba(251,191,36,0.1)]",
    border: "border-[rgba(251,191,36,0.3)]"
  },
  {
    id: 3,
    title: "Staff retention risk",
    explanation: "Competitors are offering higher wages for experienced chefs.",
    severity: "Medium",
    icon: AlertTriangle,
    color: "text-[#fb923c]",
    bg: "bg-[rgba(251,146,60,0.1)]",
    border: "border-[rgba(251,146,60,0.3)]"
  }
];

const suggestions = [
  {
    id: 1,
    advice: "Consider switching to local suppliers for tomatoes to reduce costs and ensure steady supply.",
    type: "AI Recommended"
  },
  {
    id: 2,
    advice: "Create a special 'Festival Menu' to attract tourists during the upcoming local food event.",
    type: "AI Recommended"
  },
  {
    id: 3,
    advice: "Review current staff benefits and consider a small retention bonus for key kitchen personnel.",
    type: "AI Recommended"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#070707] text-[#ffffff] p-4 md:p-8 lg:p-12 font-sans selection:bg-[rgba(249,115,22,0.3)]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <h1 className="font-serif font-medium tracking-tight text-[#ffffff]" style={{ fontSize: 'clamp(1.85rem, 4vw, 2.9rem)' }}>
              Welcome back, Pandu <motion.span 
                className="inline-block origin-bottom-right"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              >👋</motion.span>
            </h1>
            <p className="text-[rgba(255,255,255,0.52)] text-[1.05rem] mt-2">
              Here’s what’s happening around your business today
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.055)' }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.055)] p-2 pr-4 rounded-[24px] transition-colors cursor-pointer backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f97316] to-[#fbbf24] flex items-center justify-center text-[#070707] font-bold text-[1.05rem] shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              PR
            </div>
            <div>
              <h3 className="font-medium text-[1.05rem] leading-tight text-[#ffffff]">{user.name}</h3>
              <p className="text-[0.87rem] text-[rgba(255,255,255,0.52)]">{user.business}</p>
            </div>
            <ChevronDown className="w-5 h-5 text-[rgba(255,255,255,0.52)] ml-2" />
          </motion.div>
        </motion.header>

        {/* Top News */}
        <section>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 rounded-xl bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)]">
              <Newspaper className="w-5 h-5 text-[#fbbf24]" />
            </div>
            <h2 className="text-[1.05rem] font-medium text-[rgba(255,255,255,0.78)] tracking-wide">Relevant News</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {news.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.055)' }}
                className="bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.055)] rounded-[24px] p-6 flex flex-col h-full backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[rgba(251,191,36,0.45)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex justify-between items-start mb-5">
                  <span className="text-[0.6rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.055)] text-[rgba(255,255,255,0.78)] border border-[rgba(255,255,255,0.055)]">
                    {item.tag}
                  </span>
                  <div className={`p-1.5 rounded-full ${item.impact === 'positive' ? 'bg-[rgba(251,191,36,0.1)]' : 'bg-[rgba(249,115,22,0.1)]'}`}>
                    {item.impact === 'positive' ? (
                      <ArrowUpRight className="w-4 h-4 text-[#fbbf24]" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-[#f97316]" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-[1.05rem] font-medium mb-3 text-[#ffffff] leading-snug">
                  {item.headline}
                </h3>
                <p className="text-[0.87rem] text-[rgba(255,255,255,0.52)] line-clamp-3 mt-auto leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Impacts */}
          <section>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-2 rounded-xl bg-[rgba(249,115,22,0.1)] border border-[rgba(249,115,22,0.2)]">
                <AlertTriangle className="w-5 h-5 text-[#f97316]" />
              </div>
              <h2 className="text-[1.05rem] font-medium text-[rgba(255,255,255,0.78)] tracking-wide">Potential Impacts on Your Business</h2>
            </motion.div>
            
            <div className="space-y-4">
              {impacts.map((impact, index) => {
                const Icon = impact.icon;
                return (
                  <motion.div 
                    key={impact.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.055)' }}
                    className="bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.055)] rounded-[24px] p-5 flex items-start gap-5 backdrop-blur-sm transition-all"
                  >
                    <div className={`p-3.5 rounded-[18px] ${impact.bg} ${impact.border} border`}>
                      <Icon className={`w-5 h-5 ${impact.color}`} />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-[1.05rem] font-medium text-[#ffffff] leading-tight">{impact.title}</h3>
                        <span className={`text-[0.6rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${impact.border} ${impact.color} ${impact.bg} whitespace-nowrap`}>
                          {impact.severity}
                        </span>
                      </div>
                      <p className="text-[0.9rem] text-[rgba(255,255,255,0.52)] mt-2 leading-relaxed">
                        {impact.explanation}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Suggestions */}
          <section>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-2 rounded-xl bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)]">
                <Lightbulb className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <h2 className="text-[1.05rem] font-medium text-[rgba(255,255,255,0.78)] tracking-wide">AI Suggestions</h2>
            </motion.div>
            
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <motion.div 
                  key={suggestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.01, 
                    backgroundColor: 'rgba(255,255,255,0.055)',
                    boxShadow: '0 10px 30px -10px rgba(251,191,36,0.1)'
                  }}
                  className="bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.055)] rounded-[24px] p-6 relative overflow-hidden group backdrop-blur-sm transition-all"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#fbbf24] to-[#f97316] opacity-0 group-hover:opacity-[0.04] rounded-full blur-3xl transition-opacity duration-700 -mr-10 -mt-10 pointer-events-none" />
                  
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="mt-1 p-2 rounded-full bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)]">
                      <Sparkles className="w-4 h-4 text-[#fbbf24]" />
                    </div>
                    <div>
                      <div className="mb-3">
                        <span className="text-[0.6rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-[rgba(251,191,36,0.15)] to-[rgba(249,115,22,0.15)] text-[#fbbf24] border border-[rgba(251,191,36,0.2)]">
                          {suggestion.type}
                        </span>
                      </div>
                      <p className="text-[1.05rem] text-[rgba(255,255,255,0.78)] leading-relaxed">
                        {suggestion.advice}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

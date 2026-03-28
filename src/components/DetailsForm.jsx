import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2, FileText, CircleDollarSign, Users, Link as LinkIcon,
  Truck, CheckCircle2, ChevronRight, ChevronLeft, Plus, Trash2, Package
} from 'lucide-react';
import API from '../services/service';

const initialData = {
  profile: { industry: '', subIndustry: '', location: { country: '', state: '', city: '' }, scale: '' },
  description: '',
  financials: { cashReserve: '', monthlyRevenue: '', monthlyExpenses: '' },
  operations: { employees: '', avgSalary: '' },
  products: [{ name: '', category: '', price: '', costPrice: '', monthlySalesVolume: '', rawMaterialLinks: [{ materialName: '', usagePercentage: '' }] }],
  supplyChain: { rawMaterials: [{ name: '', dependencyPercentage: '' }], importDependency: '' },
  logistics: { transportMode: [], monthlyTransportCost: '' },
  riskProfile: { inventoryDays: '', alternativeSuppliers: false }
};

const steps = [
  { id: 1, title: 'Profile', icon: Building2 },
  { id: 2, title: 'Description', icon: FileText },
  { id: 3, title: 'Financials', icon: CircleDollarSign },
  { id: 4, title: 'Operations', icon: Users },
  { id: 5, title: 'Products', icon: Package },
  { id: 6, title: 'Supply Chain', icon: LinkIcon },
  { id: 7, title: 'Logistics & Risk', icon: Truck },
  { id: 8, title: 'Review', icon: CheckCircle2 },
];

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-400/50 transition-all duration-200";

export default function SentinelForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateData = (fields) => setFormData(prev => ({ ...prev, ...fields }));
  const nextStep = () => { if (currentStep < steps.length) setCurrentStep(p => p + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(p => p - 1); };

  const isStepValid = () => {
    const d = formData;
    switch (currentStep) {
      case 1: return d.profile.industry && d.profile.location.country && d.profile.scale;
      case 2: return d.description.length > 10;
      case 3: return d.financials.cashReserve !== '' && d.financials.monthlyRevenue !== '';
      case 4: return d.operations.employees !== '';
      case 5: return d.products.every(p => p.name && p.price !== '');
      case 6: return d.supplyChain.rawMaterials.every(m => m.name && m.dependencyPercentage !== '');
      case 7: return d.logistics.transportMode.length > 0 && d.riskProfile.inventoryDays !== '';
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        financials: {
            cashReserve: Number(formData.financials.cashReserve),
            monthlyRevenue: Number(formData.financials.monthlyRevenue),
            monthlyExpenses: Number(formData.financials.monthlyExpenses)
        },
        operations: {
            employees: Number(formData.operations.employees),
            avgSalary: Number(formData.operations.avgSalary)
        },
        products: formData.products.map(p => ({
          ...p,
          price: Number(p.price),
          costPrice: p.costPrice ? Number(p.costPrice) : undefined,
          monthlySalesVolume: p.monthlySalesVolume ? Number(p.monthlySalesVolume) : undefined,
          rawMaterialLinks: p.rawMaterialLinks.filter(l => l.materialName).map(l => ({
            materialName: l.materialName.toLowerCase().trim(),
            usagePercentage: Number(l.usagePercentage)
          }))
        })),
        supplyChain: {
          importDependency: Number(formData.supplyChain.importDependency),
          rawMaterials: formData.supplyChain.rawMaterials.map(m => ({
            name: m.name.toLowerCase().trim(),
            dependencyPercentage: Number(m.dependencyPercentage)
          }))
        },
        logistics: {
          transportMode: formData.logistics.transportMode,
          monthlyTransportCost: Number(formData.logistics.monthlyTransportCost)
        },
        riskProfile: {
          inventoryDays: Number(formData.riskProfile.inventoryDays),
          alternativeSuppliers: formData.riskProfile.alternativeSuppliers
        }
      };

      await API.post('/business', payload);
      navigate('/dashboard');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative bg-[#0a0a0f] text-white">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-sky-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl z-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Sentinel</h1>
          <div className="text-xs font-mono text-slate-500 tracking-widest uppercase">STEP {currentStep} / {steps.length}</div>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 min-h-[580px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
              {currentStep === 1 && <Step1Profile data={formData} updateData={updateData} />}
              {currentStep === 2 && <Step2Description data={formData} updateData={updateData} />}
              {currentStep === 3 && <Step3Financials data={formData} updateData={updateData} />}
              {currentStep === 4 && <Step4Operations data={formData} updateData={updateData} />}
              {currentStep === 5 && <Step5Products data={formData} updateData={updateData} />}
              {currentStep === 6 && <Step6SupplyChain data={formData} updateData={updateData} />}
              {currentStep === 7 && <Step7Logistics data={formData} updateData={updateData} />}
              {currentStep === 8 && <Step8Review data={formData} setStep={setCurrentStep} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
            <button onClick={prevStep} className={`flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors ${currentStep === 1 ? 'invisible' : ''}`}>
              <ChevronLeft className="w-4 h-4" /> BACK
            </button>
            <button 
              onClick={currentStep === steps.length ? handleSubmit : nextStep} 
              disabled={!isStepValid() || isSubmitting}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-violet-600 font-bold text-xs tracking-widest uppercase shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 disabled:opacity-30 transition-all"
            >
              {currentStep === steps.length ? (isSubmitting ? 'Processing...' : 'Submit Analysis') : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SHARED HEADER ---
function StepHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-violet-400"><Icon className="w-6 h-6" /></div>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

// --- STEPS 1 - 4 (Summary version) ---
function Step1Profile({ data, updateData }) {
  return (
    <div className="space-y-6">
      <StepHeader icon={Building2} title="Organization" subtitle="Core industry and regional presence." />
      <div className="grid grid-cols-2 gap-4">
        <select className={inputCls} value={data.profile.industry} onChange={e => updateData({ profile: { ...data.profile, industry: e.target.value } })}>
          <option value="" disabled>Select Industry</option>
          <option value="Food">Food & Beverage</option>
          <option value="Energy">Energy</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>
        <input placeholder="Sub-Industry" className={inputCls} value={data.profile.subIndustry} onChange={e => updateData({ profile: { ...data.profile, subIndustry: e.target.value } })} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <input placeholder="Country" className={inputCls} value={data.profile.location.country} onChange={e => updateData({ profile: { ...data.profile, location: { ...data.profile.location, country: e.target.value } } })} />
        <input placeholder="State" className={inputCls} value={data.profile.location.state} onChange={e => updateData({ profile: { ...data.profile, location: { ...data.profile.location, state: e.target.value } } })} />
        <input placeholder="City" className={inputCls} value={data.profile.location.city} onChange={e => updateData({ profile: { ...data.profile, location: { ...data.profile.location, city: e.target.value } } })} />
      </div>
      <select className={inputCls} value={data.profile.scale} onChange={e => updateData({ profile: { ...data.profile, scale: e.target.value } })}>
          <option value="" disabled>Organization Scale</option>
          <option value="Small">Small (1-50)</option>
          <option value="Medium">Medium (51-500)</option>
          <option value="Large">Large (500+)</option>
      </select>
    </div>
  );
}

function Step2Description({ data, updateData }) {
  return (
    <div className="space-y-4">
      <StepHeader icon={FileText} title="Operations Context" subtitle="Detailed overview of business logic and risks." />
      <textarea className={inputCls + " min-h-[220px]"} value={data.description} onChange={e => updateData({ description: e.target.value })} placeholder="Discuss your core value proposition and key operational hurdles..." />
    </div>
  );
}

function Step3Financials({ data, updateData }) {
  return (
    <div className="space-y-6">
      <StepHeader icon={CircleDollarSign} title="Financial Health" subtitle="Monetary reserves and cash flow." />
      <input type="number" placeholder="Total Cash Reserves (USD)" className={inputCls} value={data.financials.cashReserve} onChange={e => updateData({ financials: { ...data.financials, cashReserve: e.target.value } })} />
      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Monthly Revenue" className={inputCls} value={data.financials.monthlyRevenue} onChange={e => updateData({ financials: { ...data.financials, monthlyRevenue: e.target.value } })} />
        <input type="number" placeholder="Monthly Expenses" className={inputCls} value={data.financials.monthlyExpenses} onChange={e => updateData({ financials: { ...data.financials, monthlyExpenses: e.target.value } })} />
      </div>
    </div>
  );
}

function Step4Operations({ data, updateData }) {
  return (
    <div className="space-y-6">
      <StepHeader icon={Users} title="Human Capital" subtitle="Workforce scale and compensation." />
      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Employee Count" className={inputCls} value={data.operations.employees} onChange={e => updateData({ operations: { ...data.operations, employees: e.target.value } })} />
        <input type="number" placeholder="Avg Salary (Yearly)" className={inputCls} value={data.operations.avgSalary} onChange={e => updateData({ operations: { ...data.operations, avgSalary: e.target.value } })} />
      </div>
    </div>
  );
}

// --- NEW STEP 5: PRODUCTS ---
function Step5Products({ data, updateData }) {
  const addProduct = () => updateData({ products: [...data.products, { name: '', category: '', price: '', costPrice: '', monthlySalesVolume: '', rawMaterialLinks: [{ materialName: '', usagePercentage: '' }] }] });
  
  const updateProd = (idx, fields) => {
    const newList = [...data.products];
    newList[idx] = { ...newList[idx], ...fields };
    updateData({ products: newList });
  };

  const addLink = (idx) => {
    const newList = [...data.products];
    newList[idx].rawMaterialLinks.push({ materialName: '', usagePercentage: '' });
    updateData({ products: newList });
  };

  return (
    <div className="space-y-4">
      <StepHeader icon={Package} title="Product Schema" subtitle="Defining product categories and dependencies." />
      <div className="max-h-[380px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {data.products.map((p, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 relative">
            <button onClick={() => updateData({ products: data.products.filter((_, i) => i !== idx) })} className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Name" className={inputCls} value={p.name} onChange={e => updateProd(idx, { name: e.target.value })} />
              <input placeholder="Price" type="number" className={inputCls} value={p.price} onChange={e => updateProd(idx, { price: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input placeholder="Category" className={inputCls} value={p.category} onChange={e => updateProd(idx, { category: e.target.value })} />
              <input placeholder="Cost" type="number" className={inputCls} value={p.costPrice} onChange={e => updateProd(idx, { costPrice: e.target.value })} />
              <input placeholder="Sales Vol" type="number" className={inputCls} value={p.monthlySalesVolume} onChange={e => updateProd(idx, { monthlySalesVolume: e.target.value })} />
            </div>
            
            <div className="pt-3 border-t border-white/5 space-y-2">
              <div className="flex justify-between items-center"><span className="text-[10px] text-violet-400 uppercase tracking-widest font-bold">Material Linkage</span> <button onClick={() => addLink(idx)} className="text-[10px] text-slate-400 hover:text-white">+ Add Material</button></div>
              {p.rawMaterialLinks.map((l, lIdx) => (
                <div key={lIdx} className="flex gap-2">
                  <input placeholder="Material Name" className="flex-1 bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs" value={l.materialName} onChange={e => {
                    const links = [...p.rawMaterialLinks]; links[lIdx].materialName = e.target.value; updateProd(idx, { rawMaterialLinks: links });
                  }} />
                  <input placeholder="%" type="number" className="w-16 bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs" value={l.usagePercentage} onChange={e => {
                    const links = [...p.rawMaterialLinks]; links[lIdx].usagePercentage = e.target.value; updateProd(idx, { rawMaterialLinks: links });
                  }} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={addProduct} className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-xs text-slate-500 hover:bg-white/5 hover:border-white/20 transition-all">+ Add Product Record</button>
      </div>
    </div>
  );
}

// --- STEPS 6 & 7 (Supply Chain & Logistics) ---
function Step6SupplyChain({ data, updateData }) {
  const addMat = () => updateData({ supplyChain: { ...data.supplyChain, rawMaterials: [...data.supplyChain.rawMaterials, { name: '', dependencyPercentage: '' }] } });
  return (
    <div className="space-y-6">
      <StepHeader icon={LinkIcon} title="Supply Chain" subtitle="Raw material sourcing and dependency." />
      <div className="space-y-3">
        {data.supplyChain.rawMaterials.map((m, idx) => (
          <div key={idx} className="flex gap-3">
            <input placeholder="Material Name" className={inputCls} value={m.name} onChange={e => {
              const list = [...data.supplyChain.rawMaterials]; list[idx].name = e.target.value; updateData({ supplyChain: { ...data.supplyChain, rawMaterials: list } });
            }} />
            <input placeholder="Dependency %" type="number" className={inputCls + " w-32"} value={m.dependencyPercentage} onChange={e => {
              const list = [...data.supplyChain.rawMaterials]; list[idx].dependencyPercentage = e.target.value; updateData({ supplyChain: { ...data.supplyChain, rawMaterials: list } });
            }} />
          </div>
        ))}
        <button onClick={addMat} className="text-xs text-violet-400">+ Add Material</button>
      </div>
      <input type="number" placeholder="Overall Import Dependency %" className={inputCls} value={data.supplyChain.importDependency} onChange={e => updateData({ supplyChain: { ...data.supplyChain, importDependency: e.target.value } })} />
    </div>
  );
}

function Step7Logistics({ data, updateData }) {
  const modes = ['Road', 'Sea', 'Air', 'Rail'];
  const toggle = (m) => {
    const current = data.logistics.transportMode;
    updateData({ logistics: { ...data.logistics, transportMode: current.includes(m) ? current.filter(x => x !== m) : [...current, m] } });
  };
  return (
    <div className="space-y-8">
      <StepHeader icon={Truck} title="Logistics & Risk" subtitle="Transit modes and inventory buffer." />
      <div className="grid grid-cols-4 gap-2">
        {modes.map(m => (
          <button key={m} onClick={() => toggle(m)} className={`py-3 rounded-xl border text-xs ${data.logistics.transportMode.includes(m) ? 'bg-orange-500/20 border-orange-500' : 'border-white/10 text-slate-500'}`}>{m}</button>
        ))}
      </div>
      <input type="number" placeholder="Monthly Transport Cost (USD)" className={inputCls} value={data.logistics.monthlyTransportCost} onChange={e => updateData({ logistics: { ...data.logistics, monthlyTransportCost: e.target.value } })} />
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
        <span className="text-sm">Alternative Suppliers Available</span>
        <button onClick={() => updateData({ riskProfile: { ...data.riskProfile, alternativeSuppliers: !data.riskProfile.alternativeSuppliers } })} className={`w-12 h-6 rounded-full relative transition-colors ${data.riskProfile.alternativeSuppliers ? 'bg-violet-500' : 'bg-slate-700'}`}>
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${data.riskProfile.alternativeSuppliers ? 'left-7' : 'left-1'}`} />
        </button>
      </div>
      <input type="number" placeholder="Inventory Days" className={inputCls} value={data.riskProfile.inventoryDays} onChange={e => updateData({ riskProfile: { ...data.riskProfile, inventoryDays: e.target.value } })} />
    </div>
  );
}

// --- FINAL REVIEW STEP ---
function Step8Review({ data, setStep }) {
  const Row = ({ label, val, step }) => (
    <div className="flex justify-between py-2 border-b border-white/5 group">
      <span className="text-xs text-slate-500 uppercase">{label}</span>
      <div className="flex gap-3 items-center">
        <span className="text-sm font-mono">{val || '-'}</span>
        <button onClick={() => setStep(step)} className="opacity-0 group-hover:opacity-100 text-[10px] text-violet-400 transition-opacity">Edit</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
      <StepHeader icon={CheckCircle2} title="Final Validation" subtitle="Review your data before generating analysis." />
      
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="text-[10px] text-violet-400 font-bold uppercase mb-3">Profile & Financials</h4>
          <Row label="Industry" val={data.profile.industry} step={1} />
          <Row label="Revenue" val={`$${Number(data.financials.monthlyRevenue).toLocaleString()}`} step={3} />
          <Row label="Employees" val={data.operations.employees} step={4} />
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="text-[10px] text-violet-400 font-bold uppercase mb-3">Products ({data.products.length})</h4>
          {data.products.map((p, i) => (
            <div key={i} className="text-sm mb-2 pb-2 border-b border-white/5 last:border-0">
              <div className="flex justify-between"><span>{p.name}</span><span>${p.price}</span></div>
              <div className="text-[10px] text-slate-500 italic">{p.rawMaterialLinks.length} material links</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
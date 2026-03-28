/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  FileText,
  CircleDollarSign,
  Users,
  Link as LinkIcon,
  Truck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2
} from 'lucide-react';

const initialData = {
  profile: { industry: '', subIndustry: '', location: { country: '', state: '', city: '' }, scale: '' },
  description: '',
  financials: { cashReserve: '', monthlyRevenue: '', monthlyExpenses: '' },
  operations: { employees: '', avgSalary: '' },
  supplyChain: { rawMaterials: [{ name: '', dependencyPercentage: '' }], importDependency: '' },
  logistics: { transportMode: [], monthlyTransportCost: '' },
  riskProfile: { inventoryDays: '', alternativeSuppliers: false }
};

const steps = [
  { id: 1, title: 'Profile', icon: Building2 },
  { id: 2, title: 'Description', icon: FileText },
  { id: 3, title: 'Financials', icon: CircleDollarSign },
  { id: 4, title: 'Operations', icon: Users },
  { id: 5, title: 'Supply Chain', icon: LinkIcon },
  { id: 6, title: 'Logistics & Risk', icon: Truck },
  { id: 7, title: 'Review', icon: CheckCircle2 },
];

// Shared input style
const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-400/50 transition-all duration-200";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData);

  const updateData = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => { if (currentStep < steps.length) setCurrentStep(p => p + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(p => p - 1); };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.profile.industry && formData.profile.subIndustry && formData.profile.location.country && formData.profile.scale;
      case 2: return formData.description.length > 10;
      case 3: return formData.financials.cashReserve !== '' && formData.financials.monthlyRevenue !== '' && formData.financials.monthlyExpenses !== '';
      case 4: return formData.operations.employees !== '' && formData.operations.avgSalary !== '';
      case 5: return formData.supplyChain.rawMaterials.every(m => m.name && m.dependencyPercentage !== '') && formData.supplyChain.importDependency !== '';
      case 6: return formData.logistics.transportMode.length > 0 && formData.logistics.monthlyTransportCost !== '' && formData.riskProfile.inventoryDays !== '';
      default: return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-[#0a0a0f] text-white">
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-sky-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl z-10">
        {/* Header & Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Sentinel
            </h1>
            <div className="text-xs font-mono text-slate-500 tracking-widest">
              STEP {currentStep} OF {steps.length}
            </div>
          </div>

          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-10 min-h-[500px] flex flex-col">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && <Step1Profile data={formData} updateData={updateData} />}
                {currentStep === 2 && <Step2Description data={formData} updateData={updateData} />}
                {currentStep === 3 && <Step3Financials data={formData} updateData={updateData} />}
                {currentStep === 4 && <Step4Operations data={formData} updateData={updateData} />}
                {currentStep === 5 && <Step5SupplyChain data={formData} updateData={updateData} />}
                {currentStep === 6 && <Step6Logistics data={formData} updateData={updateData} />}
                {currentStep === 7 && <Step7Review data={formData} setStep={setCurrentStep} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={prevStep}
              className={`px-6 py-3 flex items-center gap-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 ${currentStep === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs tracking-widest uppercase">Back</span>
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-8 py-3 flex items-center gap-2 rounded-xl font-medium text-white bg-gradient-to-r from-orange-500 to-violet-500 hover:from-orange-400 hover:to-violet-400 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
              >
                <span className="text-xs tracking-widest uppercase">Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => alert('Risk Analysis Submitted Successfully!')}
                className="px-8 py-3 flex items-center gap-2 rounded-xl font-medium text-white bg-gradient-to-r from-orange-500 to-violet-500 hover:from-orange-400 hover:to-violet-400 shadow-lg transition-all duration-300"
              >
                <span className="text-xs tracking-widest uppercase">Submit Analysis</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Step Header ---
function StepHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
        <Icon className="w-6 h-6 text-violet-400" />
      </div>
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

// --- Step 1 ---
function Step1Profile({ data, updateData }) {
  return (
    <div className="space-y-6">
      <StepHeader icon={Building2} title="Business Profile" subtitle="Basic information about your organization." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Industry</label>
          <select
            className={inputCls + " appearance-none"}
            value={data.profile.industry}
            onChange={e => updateData({ profile: { ...data.profile, industry: e.target.value } })}
          >
            <option value="" disabled className="bg-[#0a0a0f]">Select Industry</option>
            <option value="Food" className="bg-[#0a0a0f]">Food & Beverage</option>
            <option value="Energy" className="bg-[#0a0a0f]">Energy</option>
            <option value="Manufacturing" className="bg-[#0a0a0f]">Manufacturing</option>
            <option value="Technology" className="bg-[#0a0a0f]">Technology</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Sub Industry</label>
          <input
            type="text"
            className={inputCls}
            placeholder="e.g. Semiconductor"
            value={data.profile.subIndustry}
            onChange={e => updateData({ profile: { ...data.profile, subIndustry: e.target.value } })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs text-slate-400 uppercase tracking-wider">Location</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input type="text" className={inputCls} placeholder="Country"
            value={data.profile.location.country}
            onChange={e => updateData({ profile: { ...data.profile, location: { ...data.profile.location, country: e.target.value } } })} />
          <input type="text" className={inputCls} placeholder="State/Province"
            value={data.profile.location.state}
            onChange={e => updateData({ profile: { ...data.profile, location: { ...data.profile.location, state: e.target.value } } })} />
          <input type="text" className={inputCls} placeholder="City"
            value={data.profile.location.city}
            onChange={e => updateData({ profile: { ...data.profile, location: { ...data.profile.location, city: e.target.value } } })} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-slate-400 uppercase tracking-wider">Scale</label>
        <select
          className={inputCls + " appearance-none"}
          value={data.profile.scale}
          onChange={e => updateData({ profile: { ...data.profile, scale: e.target.value } })}
        >
          <option value="" disabled className="bg-[#0a0a0f]">Select Scale</option>
          <option value="Small" className="bg-[#0a0a0f]">Small (1–50 employees)</option>
          <option value="Medium" className="bg-[#0a0a0f]">Medium (51–500 employees)</option>
          <option value="Large" className="bg-[#0a0a0f]">Large (500+ employees)</option>
        </select>
      </div>
    </div>
  );
}

// --- Step 2 ---
function Step2Description({ data, updateData }) {
  return (
    <div className="space-y-6">
      <StepHeader icon={FileText} title="Business Description" subtitle="Detail your operations and risk factors." />
      <div className="space-y-2">
        <label className="text-xs text-slate-400 uppercase tracking-wider">Operations & Risks</label>
        <textarea
          className={inputCls + " min-h-[200px] resize-none"}
          placeholder="Describe your business operations, supply chain dependencies, and perceived risks..."
          value={data.description}
          onChange={e => updateData({ description: e.target.value })}
        />
        <p className="text-xs text-slate-600 mt-2">Please provide at least a brief paragraph detailing your core dependencies.</p>
      </div>
    </div>
  );
}

// --- Step 3 ---
function Step3Financials({ data, updateData }) {
  const profitLoss = (Number(data.financials.monthlyRevenue) || 0) - (Number(data.financials.monthlyExpenses) || 0);
  const isProfit = profitLoss >= 0;

  return (
    <div className="space-y-6">
      <StepHeader icon={CircleDollarSign} title="Financial Details" subtitle="Current financial health indicators." />

      <div className="space-y-2">
        <label className="text-xs text-slate-400 uppercase tracking-wider">Cash Reserve (USD)</label>
        <input type="number" className={inputCls + " font-mono"} placeholder="0.00"
          value={data.financials.cashReserve}
          onChange={e => updateData({ financials: { ...data.financials, cashReserve: e.target.value ? Number(e.target.value) : '' } })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Monthly Revenue (USD)</label>
          <input type="number" className={inputCls + " font-mono"} placeholder="0.00"
            value={data.financials.monthlyRevenue}
            onChange={e => updateData({ financials: { ...data.financials, monthlyRevenue: e.target.value ? Number(e.target.value) : '' } })} />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Monthly Expenses (USD)</label>
          <input type="number" className={inputCls + " font-mono"} placeholder="0.00"
            value={data.financials.monthlyExpenses}
            onChange={e => updateData({ financials: { ...data.financials, monthlyExpenses: e.target.value ? Number(e.target.value) : '' } })} />
        </div>
      </div>

      {(data.financials.monthlyRevenue !== '' && data.financials.monthlyExpenses !== '') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border flex items-center justify-between ${isProfit ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}
        >
          <span className="text-sm text-slate-400">Estimated Monthly {isProfit ? 'Profit' : 'Loss'}</span>
          <span className={`font-mono text-lg ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
            {isProfit ? '+' : '-'}${Math.abs(profitLoss).toLocaleString()}
          </span>
        </motion.div>
      )}
    </div>
  );
}

// --- Step 4 ---
function Step4Operations({ data, updateData }) {
  return (
    <div className="space-y-6">
      <StepHeader icon={Users} title="Operations" subtitle="Workforce and operational metrics." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Number of Employees</label>
          <input type="number" className={inputCls + " font-mono"} placeholder="0"
            value={data.operations.employees}
            onChange={e => updateData({ operations: { ...data.operations, employees: e.target.value ? Number(e.target.value) : '' } })} />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Average Salary (USD/yr)</label>
          <input type="number" className={inputCls + " font-mono"} placeholder="0.00"
            value={data.operations.avgSalary}
            onChange={e => updateData({ operations: { ...data.operations, avgSalary: e.target.value ? Number(e.target.value) : '' } })} />
        </div>
      </div>
    </div>
  );
}

// --- Step 5 ---
function Step5SupplyChain({ data, updateData }) {
  const addMaterial = () => updateData({
    supplyChain: { ...data.supplyChain, rawMaterials: [...data.supplyChain.rawMaterials, { name: '', dependencyPercentage: '' }] }
  });

  const removeMaterial = (index) => {
    const m = [...data.supplyChain.rawMaterials];
    m.splice(index, 1);
    updateData({ supplyChain: { ...data.supplyChain, rawMaterials: m } });
  };

  const updateMaterial = (index, field, value) => {
    const m = [...data.supplyChain.rawMaterials];
    m[index] = { ...m[index], [field]: value };
    updateData({ supplyChain: { ...data.supplyChain, rawMaterials: m } });
  };

  return (
    <div className="space-y-6">
      <StepHeader icon={LinkIcon} title="Supply Chain" subtitle="Material dependencies and import exposure." />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Raw Materials</label>
          <button onClick={addMaterial} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
            <Plus className="w-3 h-3" /> Add Material
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {data.supplyChain.rawMaterials.map((mat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3"
              >
                <input type="text" className={inputCls} placeholder="Material Name"
                  value={mat.name}
                  onChange={e => updateMaterial(idx, 'name', e.target.value)} />
                <div className="relative w-32">
                  <input type="number" className={inputCls + " font-mono pr-8"} placeholder="0" min="0" max="100"
                    value={mat.dependencyPercentage}
                    onChange={e => updateMaterial(idx, 'dependencyPercentage', e.target.value ? Number(e.target.value) : '')} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">%</span>
                </div>
                {data.supplyChain.rawMaterials.length > 1 && (
                  <button onClick={() => removeMaterial(idx)}
                    className="p-3 text-slate-600 hover:text-red-400 transition-colors rounded-xl hover:bg-red-400/10">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 space-y-2">
        <label className="text-xs text-slate-400 uppercase tracking-wider">Overall Import Dependency (%)</label>
        <div className="relative w-full sm:w-1/2">
          <input type="number" className={inputCls + " font-mono pr-8"} placeholder="0" min="0" max="100"
            value={data.supplyChain.importDependency}
            onChange={e => updateData({ supplyChain: { ...data.supplyChain, importDependency: e.target.value ? Number(e.target.value) : '' } })} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">%</span>
        </div>
      </div>
    </div>
  );
}

// --- Step 6 ---
function Step6Logistics({ data, updateData }) {
  const transportOptions = ['Road', 'Sea', 'Air', 'Rail'];

  const toggleTransport = (mode) => {
    const current = data.logistics.transportMode;
    const updated = current.includes(mode) ? current.filter(m => m !== mode) : [...current, mode];
    updateData({ logistics: { ...data.logistics, transportMode: updated } });
  };

  return (
    <div className="space-y-8">
      <StepHeader icon={Truck} title="Logistics & Risk Profile" subtitle="Transportation and inventory resilience." />

      <div className="space-y-4">
        <label className="text-xs text-slate-400 uppercase tracking-wider">Transport Modes</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {transportOptions.map(mode => {
            const isSelected = data.logistics.transportMode.includes(mode);
            return (
              <button key={mode} onClick={() => toggleTransport(mode)}
                className={`py-3 px-4 rounded-xl border transition-all duration-300 text-sm font-medium ${
                  isSelected
                    ? 'bg-orange-500/20 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                    : 'bg-transparent border-white/10 text-slate-500 hover:border-white/20'
                }`}>
                {mode}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-slate-400 uppercase tracking-wider">Monthly Transport Cost (USD)</label>
        <input type="number" className={inputCls + " sm:w-1/2 font-mono"} placeholder="0.00"
          value={data.logistics.monthlyTransportCost}
          onChange={e => updateData({ logistics: { ...data.logistics, monthlyTransportCost: e.target.value ? Number(e.target.value) : '' } })} />
      </div>

      <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">Inventory Days</label>
          <input type="number" className={inputCls + " font-mono"} placeholder="0"
            value={data.riskProfile.inventoryDays}
            onChange={e => updateData({ riskProfile: { ...data.riskProfile, inventoryDays: e.target.value ? Number(e.target.value) : '' } })} />
        </div>

        <div className="space-y-3">
          <label className="text-xs text-slate-400 uppercase tracking-wider block">Alternative Suppliers Available</label>
          <button
            onClick={() => updateData({ riskProfile: { ...data.riskProfile, alternativeSuppliers: !data.riskProfile.alternativeSuppliers } })}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${data.riskProfile.alternativeSuppliers ? 'bg-violet-500' : 'bg-slate-600'}`}
          >
            <motion.div
              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
              animate={{ x: data.riskProfile.alternativeSuppliers ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Step 7 ---
function Step7Review({ data, setStep }) {
  const Section = ({ title, step, children }) => (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs text-slate-600 uppercase tracking-wider">{title}</h3>
        <button onClick={() => setStep(step)} className="text-xs text-violet-400 hover:text-violet-300">Edit</button>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">{children}</div>
    </div>
  );

  const Row = ({ label, value, mono = false }) => (
    <div className="flex justify-between items-start py-2 border-b border-white/5 last:border-0 last:pb-0 first:pt-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm text-right ${mono ? 'font-mono' : ''}`}>{value || '-'}</span>
    </div>
  );

  return (
    <div className="space-y-2 h-[450px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex items-center gap-3 mb-6 sticky top-0 bg-[#12121a]/90 backdrop-blur-md py-2 z-10">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <CheckCircle2 className="w-6 h-6 text-violet-400" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Review & Submit</h2>
          <p className="text-sm text-slate-500">Verify your risk analysis data.</p>
        </div>
      </div>

      <Section title="Profile" step={1}>
        <Row label="Industry" value={`${data.profile.industry} - ${data.profile.subIndustry}`} />
        <Row label="Location" value={[data.profile.location.city, data.profile.location.state, data.profile.location.country].filter(Boolean).join(', ')} />
        <Row label="Scale" value={data.profile.scale} />
      </Section>

      <Section title="Financials" step={3}>
        <Row label="Cash Reserve" value={`$${Number(data.financials.cashReserve).toLocaleString()}`} mono />
        <Row label="Monthly Revenue" value={`$${Number(data.financials.monthlyRevenue).toLocaleString()}`} mono />
        <Row label="Monthly Expenses" value={`$${Number(data.financials.monthlyExpenses).toLocaleString()}`} mono />
      </Section>

      <Section title="Operations" step={4}>
        <Row label="Employees" value={Number(data.operations.employees).toLocaleString()} mono />
        <Row label="Avg Salary" value={`$${Number(data.operations.avgSalary).toLocaleString()}/yr`} mono />
      </Section>

      <Section title="Supply Chain" step={5}>
        <Row label="Import Dependency" value={`${data.supplyChain.importDependency}%`} mono />
        <div className="mt-2 pt-2 border-t border-white/5">
          <span className="text-sm text-slate-500 block mb-2">Raw Materials</span>
          {data.supplyChain.rawMaterials.map((mat, i) => (
            <div key={i} className="flex justify-between text-sm mb-1 last:mb-0">
              <span>{mat.name}</span>
              <span className="font-mono text-slate-400">{mat.dependencyPercentage}%</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Logistics & Risk" step={6}>
        <Row label="Transport Modes" value={data.logistics.transportMode.join(', ')} />
        <Row label="Transport Cost" value={`$${Number(data.logistics.monthlyTransportCost).toLocaleString()}/mo`} mono />
        <Row label="Inventory Days" value={data.riskProfile.inventoryDays} mono />
        <Row label="Alt Suppliers" value={data.riskProfile.alternativeSuppliers ? 'Yes' : 'No'} />
      </Section>
    </div>
  );
}
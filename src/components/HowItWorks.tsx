import { useState } from 'react';
import { WORKFLOW_STEPS, RELIABILITY_PRINCIPLES } from '../data';
import { ShieldCheck, Layers, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll-based Blur-in */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] text-zinc-400 uppercase glass px-3.5 py-1.5 rounded-full">
            Procesul Nostru de Lucru
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient mt-6 mb-6">
            De la idee la site live în 3 etape clare
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Eliminăm incertitudinea din procesul de dezvoltare. Lucrăm transparent, livrăm prototipuri rapide și ne asigurăm că designul respectă 100% brandul tău.
          </p>
        </motion.div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
          
          {/* Left Column: Interactive Step Selectors with Scroll Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {WORKFLOW_STEPS.map((step, idx) => {
              const isSelected = idx === activeStep;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer group ${
                    isSelected
                      ? 'border-white/20 bg-white/[0.02] shadow-lg shadow-white/[0.01]'
                      : 'border-white/5 bg-transparent hover:border-white/10'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-sans font-bold text-xs shrink-0 border ${
                      isSelected
                        ? 'bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                        : 'bg-transparent border-white/10 text-zinc-400 group-hover:border-white/25 group-hover:text-white'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-sans font-bold mb-2 transition-colors ${
                        isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed transition-colors font-light ${
                        isSelected ? 'text-zinc-300' : 'text-zinc-500'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right Column: High-fidelity Graphic Panels with Scroll Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl h-[420px] flex flex-col justify-between overflow-hidden relative glow"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-white/[0.05]">
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${((activeStep + 1) / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col justify-between pt-4"
              >
                {/* Step Content Visuals */}
                {activeStep === 0 && (
                  <div className="flex flex-col gap-4 h-full justify-center">
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-xs font-mono text-zinc-500">Visual Figma Wireframe & Guide</span>
                      <span className="text-xs font-mono text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                        Interactive Prototype
                      </span>
                    </div>
                    {/* Visual Wireframe Layout blueprint */}
                    <div className="space-y-3 font-sans text-xs text-zinc-400">
                      <div className="p-3.5 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-purple-400" />
                          <span className="font-semibold text-white">Sitemap: Pagina Principală (Landing Page)</span>
                        </div>
                        <span className="text-zinc-500">Grid 12-Coloane</span>
                      </div>
                      <div className="border border-dashed border-white/10 rounded-lg p-4 space-y-3 bg-white/[0.01]">
                        <div className="h-6 bg-white/5 rounded flex items-center justify-between px-3 text-[10px]">
                          <span className="font-mono">Header / Logo / Navigație</span>
                          <span className="text-purple-300">Stil: Minimal</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-14 bg-white/5 rounded flex flex-col justify-center items-center p-2 text-[10px]">
                            <span className="text-white font-semibold">Hero Section</span>
                            <span className="text-zinc-500">Mesaj principal & CTA</span>
                          </div>
                          <div className="h-14 bg-white/5 rounded flex flex-col justify-center items-center p-2 text-[10px]">
                            <span className="text-white font-semibold">Servicii Bento</span>
                            <span className="text-zinc-500">Carduri detalii</span>
                          </div>
                          <div className="h-14 bg-white/5 rounded flex flex-col justify-center items-center p-2 text-[10px]">
                            <span className="text-white font-semibold">Catalog / Portofoliu</span>
                            <span className="text-zinc-500">Filtre dinamice</span>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center text-[10px] text-zinc-500 font-mono">
                          <span>Palette:</span>
                          <span className="w-3.5 h-3.5 rounded bg-[#0a0d11] border border-white/10" />
                          <span>#0A0D11</span>
                          <span className="w-3.5 h-3.5 rounded bg-white" />
                          <span>#FFFFFF</span>
                          <span className="w-3.5 h-3.5 rounded bg-zinc-500" />
                          <span>#71717A</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="flex flex-col gap-4 h-full justify-center">
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-xs font-mono text-zinc-500">Structură Proiect React & Tailwind</span>
                      <span className="text-xs font-mono text-emerald-400">100% Mobile Responsive</span>
                    </div>
                    {/* Code structure preview */}
                    <div className="space-y-2.5 font-mono text-xs text-zinc-400">
                      <div className="p-3 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-blue-400" />
                          <span className="text-white font-semibold">proiect-site-premium/</span>
                        </div>
                      </div>
                      <div className="pl-4 space-y-2">
                        <div className="p-2 rounded bg-white/[0.01] border border-white/5 flex items-center justify-between text-[11px]">
                          <span>📂 src/components/Hero.tsx</span>
                          <span className="text-blue-300">Animat cu motion</span>
                        </div>
                        <div className="p-2 rounded bg-white/[0.01] border border-white/5 flex items-center justify-between text-[11px]">
                          <span>📂 src/components/EStore.tsx</span>
                          <span className="text-amber-300">Stripe Checkout Api</span>
                        </div>
                        <div className="p-2 rounded bg-white/[0.01] border border-white/5 flex items-center justify-between text-[11px]">
                          <span>📂 src/index.css</span>
                          <span className="text-purple-300">Tailwind CSS Classes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="flex flex-col gap-4 h-full justify-center">
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-xs font-mono text-zinc-500">Console de Lansare Securizată</span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">Website Live</span>
                    </div>
                    {/* Live Compiler Log Mock */}
                    <div className="bg-white/[0.02] rounded-xl p-4 font-mono text-xs text-zinc-300 flex flex-col gap-2 shadow-inner border border-white/5 h-48 overflow-y-auto">
                      <div className="flex gap-2 text-zinc-500">
                        <span>[10:14:02]</span>
                        <span>Compilare cod și optimizare imagini WebP...</span>
                      </div>
                      <div className="flex gap-2 text-white font-semibold">
                        <span>[10:14:03]</span>
                        <span>[SEO] Generat sitemap.xml & optimizat fișierul robots.txt</span>
                      </div>
                      <div className="flex gap-2 text-zinc-400">
                        <span>[10:14:03]</span>
                        <span>Configurare certificat de securitate SSL gratuit de la Let's Encrypt...</span>
                      </div>
                      <div className="flex gap-2 text-emerald-400 font-bold">
                        <span>[10:14:04]</span>
                        <span>[SUCCESS] Lansare finalizată! Site-ul tău este LIVE la adresa: site-ul-tau.ro</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Reliability / Principles Sub-section with Scroll staggered blur-in animations */}
        <div className="pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RELIABILITY_PRINCIPLES.map((principle, index) => {
              return (
                <motion.div 
                  key={principle.title} 
                  initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                  className="glow-card p-6 rounded-2xl border flex flex-col justify-between gap-4"
                >
                  <div>
                    <h4 className="font-sans font-bold text-white text-lg mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-white" />
                      {principle.title}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-light">
                      {principle.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 pt-3 flex items-center justify-between">
                    <span>Garanție tehnică:</span>
                    <span className="text-zinc-400">{principle.details}</span>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

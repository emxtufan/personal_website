import React, { useState, useEffect } from 'react';
import { Terminal, RefreshCw, Sparkles, Laptop, ShoppingBag, Wrench, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectOption {
  id: string;
  name: string;
  basePrice: number;
  baseDays: number;
  description: string;
  icon: typeof Laptop;
}

interface AdditionalService {
  id: string;
  name: string;
  price: number;
  days: number;
  description: string;
}

const PROJECT_TYPES: ProjectOption[] = [
  {
    id: 'prezentare',
    name: 'Site Prezentare',
    basePrice: 299,
    baseDays: 10,
    description: 'Landing page-uri, portofolii, clinici sau pagini de prezentare afacere.',
    icon: Laptop,
  },
  {
    id: 'magazin',
    name: 'Magazin Online',
    basePrice: 799,
    baseDays: 20,
    description: 'Magazine pe Shopify, WooCommerce sau Custom, cu produse nelimitate.',
    icon: ShoppingBag,
  },
  {
    id: 'platforma',
    name: 'Platformă Custom / Web App',
    basePrice: 1499,
    baseDays: 35,
    description: 'CRM-uri, portaluri de cursuri, directoare sau sisteme complexe de conturi.',
    icon: Wrench,
  },
];

const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    id: 'figma',
    name: 'Design Figma Personalizat',
    price: 150,
    days: 4,
    description: 'Schițe de design unice, adaptate brandului tău.',
  },
  {
    id: 'copywriting',
    name: 'Copywriting & Conținut',
    price: 100,
    days: 3,
    description: 'Texte optimizate de la zero pentru paginile tale.',
  },
  {
    id: 'plati',
    name: 'Plăți Online & Curieri',
    price: 120,
    days: 3,
    description: 'Integrare Stripe, Netopia, Sameday, Fan Courier.',
  },
  {
    id: 'facturare',
    name: 'Facturare Automatizată',
    price: 100,
    days: 2,
    description: 'Sincronizare automată cu FGO sau SmartBill.',
  },
  {
    id: 'seo',
    name: 'SEO Avansat Google',
    price: 130,
    days: 3,
    description: 'Configurare Search Console, sitemaps și viteză optimă.',
  },
  {
    id: 'gazduire',
    name: 'Găzduire Premium (1 an)',
    price: 80,
    days: 1,
    description: 'VPS rapid cu SSL securizat activ inclus.',
  },
];

export default function InteractivePlayground() {
  const [selectedType, setSelectedType] = useState<string>('prezentare');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [isRunning, setIsRunning] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];

  // Calculate prices and timelines
  const getSubtotal = () => {
    let price = activeType.basePrice;
    selectedServices.forEach((srvId) => {
      const srv = ADDITIONAL_SERVICES.find((s) => s.id === srvId);
      if (srv) price += srv.price;
    });
    return price;
  };

  const getDays = () => {
    let days = activeType.baseDays;
    selectedServices.forEach((srvId) => {
      const srv = ADDITIONAL_SERVICES.find((s) => s.id === srvId);
      if (srv) days += srv.days;
    });

    if (urgency === 'express') {
      return Math.max(5, Math.round(days * 0.6)); // Reducem timpul cu 40%
    }
    return days;
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    if (urgency === 'express') {
      return Math.round(subtotal * 1.25); // +25% cost de urgență
    }
    return subtotal;
  };

  const toggleService = (srvId: string) => {
    setSelectedServices((prev) =>
      prev.includes(srvId) ? prev.filter((id) => id !== srvId) : [...prev, srvId]
    );
  };

  const handleRunEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRunning) return;
    setIsRunning(true);
    setSubmitted(false);

    setSimulatedLogs([
      `[STUDIO] Procesare specificații pentru proiectul: "${activeType.name}"...`,
      `[STUDIO] Mod de livrare selectat: ${urgency === 'express' ? 'EXPRESS (Urgență)' : 'STANDARD'}`,
      `[STUDIO] Servicii adiționale incluse: ${selectedServices.length === 0 ? 'Niciunul' : selectedServices.length + ' servicii'}`,
    ]);

    setTimeout(() => {
      setSimulatedLogs((prev) => [
        ...prev,
        `[TEHNIC] Se compilează arhitectura de sitemap...`,
        `[TEHNIC] S-au generat estimările financiare: $${getTotalPrice()} USD`,
        `[TEHNIC] Timp total estimat: ${getDays()} zile lucrătoare`,
      ]);
    }, 800);

    setTimeout(() => {
      setSimulatedLogs((prev) => [
        ...prev,
        `[SUCCESS] Specificațiile proiectului tău au fost salvate cu succes!`,
        `[STUDIO] Gata pentru analiză. Introdu adresa ta de e-mail mai jos pentru a primi oferta pe PDF.`,
      ]);
      setIsRunning(false);
      setSubmitted(true);
    }, 1600);
  };

  // Reset logs when selections change
  useEffect(() => {
    setSimulatedLogs([]);
    setSubmitted(false);
  }, [selectedType, selectedServices, urgency]);

  return (
    <section id="playground" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll-based Blur-in */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] text-zinc-400 uppercase glass px-3.5 py-1.5 rounded-full">
            Configurator Interactiv
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient mt-6 mb-6">
            Calculează-ți prețul proiectului în timp real
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Selectează tipul site-ului, adaugă serviciile adiționale de care ai nevoie și vezi instant prețul estimativ, timpul de livrare și arhitectura tehnică gata de pornire.
          </p>
        </motion.div>

        {/* Form & Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Configurator Controls (7 cols) with slide-up & blur */}
          <motion.div 
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            
            {/* Step 1: Project Type */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 glass glow space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded">
                  Pasul 1
                </span>
                <h3 className="font-sans font-bold text-white text-base">Alege Tipul de Site</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 text-left rounded-xl border transition-all duration-300 flex flex-col justify-between gap-3 cursor-pointer group h-full ${
                        isSelected
                          ? 'border-white/20 bg-white/[0.03] shadow-md shadow-white/[0.01]'
                          : 'border-white/5 bg-transparent hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                        <span className="text-xs font-mono font-bold text-white">
                          ${type.basePrice}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white mb-1">{type.name}</h4>
                        <p className="text-[10px] text-zinc-500 leading-tight font-light">{type.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Additional Features */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 glass glow space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded">
                  Pasul 2
                </span>
                <h3 className="font-sans font-bold text-white text-base">Selectează Opțiuni Adiționale</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ADDITIONAL_SERVICES.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);
                  return (
                    <button
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-3 text-left rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-white/20 bg-white/[0.02] text-white'
                          : 'border-white/5 bg-transparent text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                          isSelected ? 'bg-white border-white text-black' : 'border-white/25 bg-transparent'
                        }`}>
                          {isSelected && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold leading-tight">{srv.name}</h4>
                          <p className="text-[10px] text-zinc-500 font-light leading-none mt-1">{srv.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-semibold block text-white">+${srv.price}</span>
                        <span className="text-[9px] font-mono text-zinc-500">+{srv.days}z</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Schedule Urgency */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 glass glow space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded">
                  Pasul 3
                </span>
                <h3 className="font-sans font-bold text-white text-base">Prioritate Livrare</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => setUrgency('standard')}
                  className={`p-3.5 text-left rounded-xl border transition-all duration-300 cursor-pointer ${
                    urgency === 'standard'
                      ? 'border-white/20 bg-white/[0.02]'
                      : 'border-white/5 bg-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Livrare Standard</span>
                    <span className="text-[10px] font-mono text-zinc-500">Cost normal (+0%)</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-light mt-1">Echipa lucrează în ritm standard, cu atenție sporită pe fiecare sfert de sprint.</p>
                </button>

                <button
                  onClick={() => setUrgency('express')}
                  className={`p-3.5 text-left rounded-xl border transition-all duration-300 cursor-pointer ${
                    urgency === 'express'
                      ? 'border-white/20 bg-white/[0.02]'
                      : 'border-white/5 bg-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                      Urgență (Express)
                    </span>
                    <span className="text-[10px] font-mono text-white bg-white/10 px-1.5 py-0.5 rounded font-semibold">+25%</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-light mt-1">Timp de livrare redus cu 40%. Dedicăm programatori în regim dedicat exclusiv.</p>
                </button>
              </div>
            </div>

          </motion.div>

          {/* Right Block: Live Spec Simulator Output (5 cols) with slide-up & blur */}
          <motion.div 
            initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-between shadow-2xl gap-6 glass glow relative"
          >
            
            {/* Visualizer Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-white" />
                <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                  Configurație Specificații Proiect
                </span>
              </div>
              <p className="text-zinc-500 text-xs font-light">
                Generat dinamic pe baza opțiunilor selectate în configurator.
              </p>
            </div>

            {/* Dynamic Interactive JSON Mockup Box */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 font-mono text-[11px] text-zinc-400 flex flex-col gap-1.5 shadow-inner leading-relaxed">
              <div className="text-zinc-500 select-none">// custom-sitemap-specs.json</div>
              <div>{`{`}</div>
              <div className="pl-4">
                <span className="text-purple-400">"tip_proiect"</span>: <span className="text-emerald-300">"{activeType.name}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-purple-400">"servicii_active"</span>: [
                {selectedServices.map((id, idx) => {
                  const srv = ADDITIONAL_SERVICES.find((s) => s.id === id);
                  return (
                    <div key={id} className="pl-4">
                      <span className="text-emerald-300">"{srv?.name}"</span>
                      {idx < selectedServices.length - 1 ? ',' : ''}
                    </div>
                  );
                })}
                ],
              </div>
              <div className="pl-4">
                <span className="text-purple-400">"prioritate"</span>: <span className="text-emerald-300">"{urgency.toUpperCase()}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-purple-400">"timp_estimat_zile"</span>: <span className="text-amber-400">{getDays()}</span>,
              </div>
              <div className="pl-4">
                <span className="text-purple-400">"buget_total_estimativ"</span>: <span className="text-white font-bold">"${getTotalPrice()} USD"</span>
              </div>
              <div>{`}`}</div>
            </div>

            {/* Action Run Script Button */}
            <div className="space-y-4">
              <button
                id="estimator-run-btn"
                onClick={handleRunEstimate}
                disabled={isRunning}
                className="w-full py-3 px-4 bg-white text-black text-xs font-bold rounded-xl hover:bg-neutral-200 transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Se calculează specificațiile...</span>
                  </>
                ) : (
                  <>
                    <span>Generează Fișierul de Ofertă</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Simulated Live Console */}
              {simulatedLogs.length > 0 && (
                <div className="bg-white/[0.02] rounded-xl p-4 font-mono text-[10px] text-zinc-400 flex flex-col gap-1 shadow-inner h-36 overflow-y-auto border border-white/5">
                  {simulatedLogs.map((log, index) => {
                    let logColor = 'text-zinc-500';
                    if (log.startsWith('[SUCCESS]')) logColor = 'text-emerald-400 font-semibold';
                    if (log.startsWith('[TEHNIC]')) logColor = 'text-blue-400';
                    if (log.startsWith('[STUDIO]')) logColor = 'text-white';
                    return (
                      <div key={index} className={`flex gap-1 ${logColor}`}>
                        <span>&gt;</span>
                        <span>{log}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Request form if submitted */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3"
                >
                  <p className="text-xs text-zinc-300 leading-tight">
                    Vrei să primești pe e-mail oferta PDF detaliată și să fii contactat pentru detalii?
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Numele sau e-mailul tău"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                    />
                    <button
                      onClick={() => {
                        alert(`Vă mulțumim, ${userEmail || 'stimate client'}! Datele configuratorului dvs. au fost trimise către un consultant Codexa Studio. Vă vom contacta în cel mai scurt timp.`);
                        setUserEmail('');
                        setSubmitted(false);
                        setSimulatedLogs([]);
                      }}
                      className="px-3 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                      Trimite
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

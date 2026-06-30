import { useState } from 'react';
import { PRICING_PLANS } from '../data';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-15 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

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
            Tarife Transparente
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient mt-6 mb-6">
            Investește în performanța afacerii tale
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Prețuri fixe, fără taxe ascunse sau comisioane. Alege modalitatea de plată care se potrivește cel mai bine fluxului tău de numerar.
          </p>

          {/* Billing Cycle Toggle styled as agency payment modes */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.02] border border-white/5 mt-10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-white/5 text-white border border-white/10 shadow-sm'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              Plată în Tranșe (50% / 50%)
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                isAnnual
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              <span>Plată Integrală</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${isAnnual ? 'bg-black/10 text-black' : 'bg-white/10 text-white'}`}>
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards Grid with Scroll-based Selective Blur-in */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, index) => {
            const price = isAnnual ? plan.priceYearly : plan.priceMonthly;
            // Only apply the blur entrance animation to the popular card
            const isBlurAnimEnabled = plan.isPopular;
            return (
              <motion.div
                key={plan.id}
                initial={isBlurAnimEnabled ? { opacity: 0, y: 40, filter: 'blur(12px)' } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: isBlurAnimEnabled ? 0.1 : 0.02, ease: 'easeOut' }}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.isPopular
                    ? 'border border-white/20 bg-white/[0.02] md:scale-[1.03] z-10 shadow-2xl shadow-white/[0.02] glow'
                    : 'glow-card border border-white/5 bg-white/[0.01]'
                }`}
              >
                {/* Popular Glow Indicator Badge */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[10px] font-bold text-black uppercase tracking-wider shadow-sm border border-white/10">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>Cel mai ales</span>
                  </div>
                )}

                {/* Card Top / Details */}
                <div>
                  <h3 className="text-lg font-sans font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-light">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-zinc-500 text-sm font-light mr-1">de la</span>
                    <span className="text-4xl sm:text-5xl font-sans font-bold text-gradient">${price}</span>
                    <span className="text-zinc-500 text-xs font-mono ml-2">EUR / proiect</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mb-8" />

                  {/* Core Features list */}
                  <div className="space-y-4 mb-10">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.1em] font-semibold block mb-5">
                      Specificații Incluse
                    </span>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <div className="p-0.5 rounded-full bg-white/5 border border-white/10 shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-zinc-300 font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <a
                  id={`pricing-${plan.id}-btn`}
                  href="#cta"
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.isPopular
                      ? 'bg-white text-black hover:bg-neutral-200 border border-transparent shadow-sm'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Small Trust Disclaimer under pricing */}
        <div className="text-center mt-12 text-xs text-zinc-500">
          Ai un proiect complex cu cerințe speciale sau ai nevoie de un audit tehnic?{' '}
         
        </div>
      </div>
    </section>
  );
}

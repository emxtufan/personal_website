import { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative overflow-hidden">
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll blur-in */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] text-zinc-400 uppercase glass px-3.5 py-1.5 rounded-full">
            Întrebări Frecvente
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient mt-6 mb-6">
            Ai întrebări? Noi avem răspunsuri.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Află detalii despre cum lucrăm, serviciile de design Figma, securitatea magazinelor online sau asistența tehnică pe care o oferim.
          </p>
        </motion.div>

        {/* FAQ Accordion Layout with Scroll-triggered Selective Blur-in */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = faq.id === openId;
            // Apply the blur entrance selectively (only to the first 3 FAQs) for optimal scrolling feel
            const isBlurAnimEnabled = index < 3;
            return (
              <motion.div
                key={faq.id}
                initial={isBlurAnimEnabled ? { opacity: 0, y: 25, filter: 'blur(10px)' } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: isBlurAnimEnabled ? index * 0.08 : 0.02, ease: 'easeOut' }}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-white/20 bg-white/[0.02] shadow-lg shadow-white/[0.01]'
                    : 'border-white/5 bg-transparent hover:border-white/10'
                }`}
              >
                {/* Trigger Header */}
                <button
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-4.5 h-4.5 shrink-0 transition-colors ${isOpen ? 'text-white' : 'text-zinc-500'}`} />
                    <span className={`font-sans font-bold text-sm sm:text-base transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Animated Body content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-4 text-sm sm:text-base text-zinc-400 leading-relaxed pl-[38px] font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

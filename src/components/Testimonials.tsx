import { TESTIMONIALS } from '../data';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

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
            Recenzii Clienți
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient mt-6 mb-6">
            Ce spun partenerii noștri de încredere
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            Am ajutat zeci de companii și antreprenori români să își digitalizeze serviciile sau să își lanseze magazinul e-commerce. Iată opiniile lor sincere.
          </p>
        </motion.div>

        {/* Testimonials Bento Grid with Scroll-based Selective Blur-in */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((test, index) => {
            // Apply the blur entrance selectively (only to alternating testimonials)
            const isBlurAnimEnabled = index % 2 === 0;
            return (
              <motion.div
                key={test.id}
                initial={isBlurAnimEnabled ? { opacity: 0, y: 35, filter: 'blur(12px)' } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: isBlurAnimEnabled ? 0.1 : 0.02, ease: 'easeOut' }}
                className="glow-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300"
              >
                {/* Content */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed italic font-light">
                  "{test.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-5 mt-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatarUrl}
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-none mb-1">{test.name}</h4>
                      <span className="text-xs text-zinc-500 font-mono">@{test.handle}</span>
                    </div>
                  </div>
                  
                  {/* Company Tag */}
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    <span className="text-[11px] font-semibold text-zinc-300 font-sans">
                      {test.role}, <span className="text-white">{test.companyName}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

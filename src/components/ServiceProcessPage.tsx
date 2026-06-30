import { motion } from 'motion/react';
import type { ServiceProcess } from '../service-processes';

function BackArrow() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M11.5 4.5 6 10l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 10H15" strokeLinecap="round" />
    </svg>
  );
}

export default function ServiceProcessPage({
  service,
  onBack,
}: {
  service: ServiceProcess;
  onBack: () => void;
}) {
  return (
    <section className="relative w-full overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-12">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-4 py-2 text-[13px] uppercase tracking-[0.18em] text-white/60 transition-colors duration-200 hover:border-white/20 hover:text-white"
          >
            <BackArrow />
            inapoi la servicii
          </button>

          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/22">
            /procese/{service.slug}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#70ead5]" />
              <span className="font-mono text-[14px] font-semibold uppercase leading-[1.3] tracking-[0.18em] text-[#70ead5]">
                {service.kicker}
              </span>
            </div>

            <h1 className="max-w-[13ch] text-[42px] font-normal leading-[0.98] tracking-[-0.05em] text-white sm:text-[56px] lg:text-[72px]">
              {service.title}
            </h1>

            <p className="max-w-[62ch] text-[16px] leading-relaxed text-white/54 sm:text-[18px]">
              {service.heroDescription}
            </p>
          </div>

          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_22%,transparent_78%,rgba(255,255,255,0.015))]" />
            <div className="absolute right-[-20%] top-[16%] h-32 w-32 rounded-full bg-[#003eac]/18 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-1">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                    durata
                  </span>
                  <p className="mt-2 text-[18px] text-white/86">{service.duration}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                    stack
                  </span>
                  <p className="mt-2 text-[18px] text-white/86">{service.stack}</p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                    rezultat
                  </span>
                  <p className="mt-2 text-[18px] text-white/86">{service.outcome}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                  livrabile
                </span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-white/30" />
            <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-white/34">
              PAS CU PAS
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {service.steps.map((step, index) => (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.42, delay: index * 0.05, ease: 'easeOut' }}
                className="relative overflow-hidden border border-white/10 bg-white/[0.018] p-6"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.012),transparent_26%,transparent_74%,rgba(255,255,255,0.012))]" />
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[12px] tracking-[0.18em] text-[#70ead5]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="max-w-[18ch] text-[24px] font-normal leading-[1.08] tracking-[-0.03em] text-white/92">
                      {step.title}
                    </h3>
                    <p className="max-w-[54ch] text-[15px] leading-relaxed text-white/48">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

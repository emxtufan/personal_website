import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SERVICE_PROCESSES } from '../service-processes';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

/* ---------- Iconițe SVG custom, una per index (ciclic) ---------- */

const ICONS = [
  // 0 — lupă / discovery
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="10.5" cy="10.5" r="6.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15.2 15.2L20 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 10.5h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  // 1 — penseulă / design
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M4 20c0-3.5 2-6 5-6s4 2 4 4-1.6 3-3.5 3S6 19.5 4 20Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M11 14 18.5 6.3a1.8 1.8 0 0 1 2.6 0v0a1.8 1.8 0 0 1 0 2.5L13.5 17"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  // 2 — engrenaj / build
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6M17.8 17.8l-1.6-1.6M7.8 7.8 6.2 6.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  // 3 — rachetă / launch
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 2.5c3 1.8 4.6 5 4.6 8.6 0 2-1 4.4-1 4.4l-3.6 1.2-3.6-1.2s-1-2.4-1-4.4c0-3.6 1.6-6.8 4.6-8.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 16.5 7 21M15 16.5l2 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  // 4 — cheie / support
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M14.7 9.3a4 4 0 1 0-5.4 5.4L4 20l1.7 1.7 5.3-5.3a4 4 0 0 0 5.4-5.4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  ),
  // 5 — grafic / growth
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 18 9 12l3.5 3L20 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 7H20v5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
];

/* ---------- Card individual ---------- */

function ServiceCard({
  service,
  index,
  onOpenService,
}: {
  service: (typeof SERVICE_PROCESSES)[number];
  index: number;
  onOpenService: (slug: string) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rotateX = useSpring(useTransform(my, [0, 100], [6, -6]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 100], [-6, 6]), { stiffness: 220, damping: 20 });

  const Icon = ExternalLink;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mx.set(50);
        my.set(50);
      }}
      onClick={() => onOpenService(service.slug)}
      whileTap={{ scale: 0.97 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.015] p-6 text-left transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.04]"
    >
      {/* glow care urmărește cursorul */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mx, my],
            ([x, y]) => `radial-gradient(280px circle at ${x}% ${y}%, rgba(112,234,213,0.14), transparent 70%)`
          ),
        }}
      />

      {/* gradient de bază */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_24%,transparent_76%,rgba(255,255,255,0.015))]" />

      {/* grid de fundal foarte subtil, vizibil doar la hover */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]"
        aria-hidden
      >
        <defs>
          <pattern id={`grid-${service.slug}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${service.slug})`} />
      </svg>

      {/* blob-uri ambientale, cu mișcare lentă continuă */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <motion.div
          className="absolute inset-x-[14%] top-[14%] h-24 rounded-full bg-[#003eac]/18 blur-3xl"
          animate={hovered ? { x: [0, 10, 0], y: [0, -6, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[12%] left-[10%] h-20 w-20 rounded-full bg-[#3b5ecd]/10 blur-3xl"
          animate={hovered ? { x: [0, -8, 0], y: [0, 8, 0] } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 flex h-full min-h-[250px] flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[12px] tracking-[0.18em] text-white/30">{service.index}</span>
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#3b5ecd]">
              {service.kicker}
            </span>
          </div>

          {/* badge SVG, cu rotație + schimbare culoare la hover */}
          <motion.div
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/55 backdrop-blur-sm transition-colors duration-500 group-hover:border-[#3b5ecd]/40 group-hover:bg-[#3b5ecd]/[0.08] group-hover:text-[#3b5ecd]"
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            {/* inel care se desenează la hover */}
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
              <motion.circle
                cx="24"
                cy="24"
                r="21.5"
                fill="none"
                stroke="#3b5ecd"
                strokeWidth="1"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={hovered ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="max-w-[18ch] text-[24px] font-normal leading-[1.08] tracking-[-0.03em] text-white/92">
            {service.title}
          </h3>
          <p className="max-w-[40ch] text-[14px] leading-relaxed text-white/42">{service.summary}</p>

          <div className="flex items-center gap-2">
            <motion.span
              className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#3b5ecd]"
              initial={{ opacity: 0, x: -8 }}
              animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
            >
              Deschide pagina
              <motion.svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                animate={hovered ? { x: [0, 3, 0] } : { x: 0 }}
                transition={{ duration: 1.1, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
              >
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.span>
          </div>
        </div>
      </div>

      {/* linie de progres SVG care se "desenează" jos, de la stânga la dreapta */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] w-full" aria-hidden>
        <motion.line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="#3b5ecd"
          strokeWidth="2"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={hovered ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>

      {/* corner accent */}
      <div className="pointer-events-none absolute -bottom-px -right-px h-16 w-16 rounded-tl-[30px] border-l border-t border-white/0 transition-all duration-500 group-hover:border-white/10" />
    </motion.button>
  );
}

/* ---------- Secțiunea principală ---------- */

export default function ProcessSection({
  onOpenService,
  sectionId = 'process',
}: {
  onOpenService: (slug: string) => void;
  sectionId?: string | null;
}) {
  return (
    <section id={sectionId ?? undefined} className="relative w-full overflow-hidden px-6 py-10">
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-10">
        <div className="flex max-w-[760px] flex-col items-start gap-3">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            
             <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Construim soluții digitale care susțin creșterea afacerii tale.
            </h2>
          </motion.div>

          <motion.p
            className="text-base font-light leading-relaxed text-zinc-400 sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
           Vezi mai jos procesul nostru de lucru, de la descoperire și design, până la lansarea și susținerea produsului tău digital.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_PROCESSES.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} onOpenService={onOpenService} />
          ))}
        </div>
      </div>
    </section>
  );
}

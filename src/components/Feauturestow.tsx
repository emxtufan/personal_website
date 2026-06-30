import { motion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import buildingAnimation from '../assets/Data _ Building.json';
import finalAnimation from '../assets/Data _ Final.json';
import Lottie from 'lottie-react';
import scanningAnimation from '../assets/Data _ Scanning.json';
import ColorBends from './ColorBends';

type CardSpec = {
  id: string;
  n: string;
  label: string;
  title: string;
  description: string;
  glyph: ReactNode;
  artwork: ReactNode;
  bendRotation: number;
  bendSpeed: number;
  bendScale: number;
  bendFrequency: number;
  bendWarp: number;
  bendParallax: number;
  bendIntensity: number;
  bendBandWidth: number;
  bendClassName: string;
  overlayClassName: string;
};

function FeatureCard({
  card,
  index,
  active,
  onActivate,
}: {
  card: CardSpec;
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      onMouseEnter={() => onActivate(index)}
      className={[
        'group relative flex h-[480px] flex-col gap-5 overflow-hidden border px-6 py-7 transition-colors duration-500',
        active
          ? 'border-white/25 bg-white/[0.045]'
          : 'border-white/10 bg-white/[0.015] hover:border-white/15',
      ].join(' ')}
      style={{ transitionProperty: 'border-color, background-color' }}
    >
      <div className="absolute inset-0">
        <ColorBends
          className={card.bendClassName}
          rotation={card.bendRotation}
          speed={card.bendSpeed}
          scale={card.bendScale}
          frequency={card.bendFrequency}
          warpStrength={card.bendWarp}
          mouseInfluence={0.48}
          noise={0.2}
          parallax={card.bendParallax}
          iterations={2}
          intensity={card.bendIntensity}
          bandWidth={card.bendBandWidth}
          transparent
          autoRotate={0}
          color="#003eac"
        />
      </div>
      <div className={`absolute inset-0 ${card.overlayClassName}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_18%,transparent_82%,rgba(255,255,255,0.015))]" />
      <div
        className={[
          'pointer-events-none absolute inset-0 transition-opacity duration-700',
          active ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{
          background:
            'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.05) 45%, transparent 60%)',
          backgroundSize: '220% 220%',
          animation: active ? 'dg-sweep 2.6s ease-in-out infinite' : 'none',
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span
            className={[
              'font-mono text-[12px] tracking-[0.18em] transition-colors duration-500',
              active ? 'text-white/55' : 'text-white/25',
            ].join(' ')}
          >
            {card.n}
          </span>
          <p
            className={[
              'mt-3 text-[16px] font-medium leading-[1.2] transition-colors duration-500',
              active ? 'text-white/92' : 'text-white/70',
            ].join(' ')}
          >
            {card.label}
          </p>
        </div>
        <span
          className={[
            'mt-2 h-px w-8 origin-right scale-x-0 bg-white/40 transition-transform duration-700',
            active ? 'scale-x-100' : '',
          ].join(' ')}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <svg
          viewBox="0 0 40 40"
          className={[
            'h-9 w-9 transition-colors duration-500',
            active ? 'text-white/80' : 'text-white/35',
          ].join(' ')}
        >
          <g
            style={{
              strokeDasharray: 140,
              strokeDashoffset: active ? 0 : 140,
              transition: 'stroke-dashoffset 900ms cubic-bezier(.4,0,.2,1)',
            }}
          >
            {card.glyph}
          </g>
        </svg>

        <div className="flex flex-1 items-center justify-center py-6">
          <div className="flex h-full w-full items-center justify-center">
            {card.artwork}
          </div>
        </div>

        <div className="max-w-[320px]">
          <h3
            className={[
              'text-[15px] font-semibold uppercase tracking-[0.06em] transition-colors duration-500',
              active ? 'text-white/92' : 'text-white/65',
            ].join(' ')}
          >
            {card.title}
          </h3>
          <p
            className={[
              'mt-2 text-[12.5px] font-normal leading-relaxed tracking-normal transition-colors duration-500',
              active ? 'text-white/55' : 'text-white/30',
            ].join(' ')}
          >
            {card.description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/[0.06]">
        <div
          className="h-full bg-white/60 transition-transform duration-[1400ms] ease-out"
          style={{
            transform: active ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
          }}
        />
      </div>
    </motion.article>
  );
}

function CenterArtwork({
  children,
  glowClassName,
}: {
  children: ReactNode;
  glowClassName: string;
}) {
  return (
    <div className="relative flex h-[150px] w-full items-center justify-center">
      <div className={`absolute h-24 w-24 rounded-full blur-[34px] ${glowClassName}`} />
      <div className="relative">{children}</div>
    </div>
  );
}

function LottieArtwork() {
  return (
    <CenterArtwork glowClassName="bg-[#4b8dff]/20">
      <div className="relative h-[176px] w-[176px]">
        <Lottie animationData={scanningAnimation} loop autoplay className="h-full w-full" />
      </div>
    </CenterArtwork>
  );
}

function BuildingLottieArtwork() {
  return (
    <CenterArtwork glowClassName="bg-[#3a6fff]/20">
      <div className="relative h-[168px] w-[168px]">
        <Lottie animationData={buildingAnimation} loop autoplay className="h-full w-full" />
      </div>
    </CenterArtwork>
  );
}

function FinalLottieArtwork() {
  return (
    <CenterArtwork glowClassName="bg-[#6ea2ff]/20">
      <div className="relative h-[172px] w-[172px]">
        <Lottie animationData={finalAnimation} loop autoplay className="h-full w-full" />
      </div>
    </CenterArtwork>
  );
}

const CARDS: CardSpec[] = [
  {
    id: 'discussion',
    n: '01',
    label: 'Analiza',
    title: 'Analizam cerintele dumneavoastra',
    description:
      'Discutam obiectivele, structura proiectului si functionalitatile necesare, astfel incat sa pornim cu o directie clara si corecta.',
    glyph: (
      <path
        d="M8 28 L20 16 L32 28 M14 20 V8 H26 V20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    artwork: <LottieArtwork />,
    bendRotation: 125,
    bendSpeed: 0.5,
    bendScale: 0.52,
    bendFrequency: 1.1,
    bendWarp: 1.08,
    bendParallax: 0.32,
    bendIntensity: 2.65,
    bendBandWidth: 1.8,
    bendClassName: 'scale-[1.22] opacity-100',
    overlayClassName:
      'bg-[radial-gradient(circle_at_70%_58%,rgba(0,62,172,0.16)_0%,rgba(8,10,14,0.06)_34%,rgba(8,10,14,0.34)_100%)]',
  },
  {
    id: 'strategy',
    n: '02',
    label: 'Construim',
    title: 'Transformam totul in cod',
    description:
      'Implementam fiecare componenta cu tehnologii moderne, construind un produs rapid, scalabil si pregatit pentru lansare.',
    glyph: (
      <path
        d="M10 30 L10 14 Q10 8 16 8 Q22 8 22 14 Q22 18 18 18 L10 18 M24 10 L30 10 L30 30 L24 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    artwork: <BuildingLottieArtwork />,
    bendRotation: 18,
    bendSpeed: 0.24,
    bendScale: 0.84,
    bendFrequency: 0.94,
    bendWarp: 1.18,
    bendParallax: 0.22,
    bendIntensity: 3.1,
    bendBandWidth: 2.2,
    bendClassName: 'scale-[1.38] opacity-100 translate-x-[10%] -translate-y-[6%]',
    overlayClassName:
      'bg-[radial-gradient(circle_at_82%_28%,rgba(0,62,172,0.18)_0%,rgba(8,10,14,0.05)_32%,rgba(8,10,14,0.38)_100%)]',
  },
  {
    id: 'delivery',
    n: '03',
    label: 'Livrare',
    title: 'Testam, lansam si predam',
    description:
      'Facem verificarile finale, publicam proiectul si predam totul clar, astfel incat sa poti merge mai departe fara blocaje.',
    glyph: (
      <path
        d="M8 22 L16 30 L32 12 M10 8 H30 M10 16 H22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    artwork: <FinalLottieArtwork />,
    bendRotation: 72,
    bendSpeed: 0.3,
    bendScale: 0.76,
    bendFrequency: 1.02,
    bendWarp: 1.1,
    bendParallax: 0.2,
    bendIntensity: 2.95,
    bendBandWidth: 2.1,
    bendClassName: 'scale-[1.3] opacity-100 translate-x-[2%] translate-y-[4%]',
    overlayClassName:
      'bg-[radial-gradient(circle_at_60%_36%,rgba(0,62,172,0.17)_0%,rgba(8,10,14,0.06)_30%,rgba(8,10,14,0.35)_100%)]',
  },
];

export default function Feauturestow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % CARDS.length);
    }, 3200);

    return () => clearInterval(id);
  }, []);

  return (
    <section id="features" className="relative w-full overflow-hidden px-6 py-20">
      <style>{`
        @keyframes dg-sweep {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-10">
        <div className="flex max-w-[580px] flex-col items-start">
          <div className="flex items-center gap-2">
            <h2 className="mb-6 mt-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Solutii digitale premium pentru afacerea ta
            </h2>
          </div>

          <p className="text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
            Dezvoltam de la zero interfete moderne, sisteme e-commerce robuste si oferim administrare tehnica de
            incredere.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
          {CARDS.map((card, index) => (
            <FeatureCard
              key={card.id}
              card={card}
              index={index}
              active={active === index}
              onActivate={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import ColorBends from './ColorBends';
import beautyvillaVideo from "../assets/BeautyVilla.webm";
import TeamStoicaVideo from "../assets/TeamStoica.webm";
import invitatii from "../assets/invitatii.webm";
import xelle from "../assets/xelle.webm";
import amber from "../assets/amber.webm";
/**
 * Tracks whether an element is currently within (a margin around) the
 * viewport. Used to pause expensive work (ColorBends canvas animation,
 * autoplaying video) when a card scrolls off-screen — this is what was
 * causing scroll jank, since those kept animating continuously even
 * while invisible.
 */
function useInViewport<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

type ProjectCard = {
  id: string;
  label: string;
  title: string;
  name: string;
  link: string;
  mediaSrc: string;
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
  /** When true, the card gets the unique "video from top-right corner" treatment */
  featured?: boolean;
};

const PROJECTS: ProjectCard[] = [
  {
    id: 'project-01',
    label: 'PROJECT 01',
    title: '',
    name: 'Team Stoica',
    link: 'https://www.teamstoica.ro',
    mediaSrc: TeamStoicaVideo,
    bendRotation: 125,
    bendSpeed: 0.5,
    bendScale: 0.56,
    bendFrequency: 1.08,
    bendWarp: 1.08,
    bendParallax: 0.3,
    bendIntensity: 2.7,
    bendBandWidth: 1.8,
    bendClassName: 'scale-[1.22] opacity-100',
    overlayClassName:
      'bg-[radial-gradient(circle_at_0%_58%,rgba(112,234,213,0.28)_0%,rgba(10,13,17,0)_42%)]',
    featured: true,
  },
  {
    id: 'project-02',
    label: 'PROJECT 02',
    title: '',
    name: 'Beauty Villa',
    link: 'https://beautyvilla.ro/',
    mediaSrc: beautyvillaVideo,
    bendRotation: 18,
    bendSpeed: 0.26,
    bendScale: 0.84,
    bendFrequency: 0.94,
    bendWarp: 1.18,
    bendParallax: 0.22,
    bendIntensity: 3.05,
    bendBandWidth: 2.2,
    bendClassName: 'scale-[1.38] opacity-100 translate-x-[10%] -translate-y-[6%]',
    overlayClassName:
      'bg-[radial-gradient(circle_at_100%_78%,rgba(112,234,213,0.24)_0%,rgba(10,13,17,0)_38%)]',
  },
  {
    id: 'project-03',
    label: 'PROJECT 03',
    title: '',
    name: 'Event Smart Assistant',
    link: 'https://event-smart-assistant.com',
    mediaSrc:invitatii,
    bendRotation: 212,
    bendSpeed: 0.28,
    bendScale: 0.92,
    bendFrequency: 1.12,
    bendWarp: 0.96,
    bendParallax: 0.18,
    bendIntensity: 2.85,
    bendBandWidth: 2.35,
    bendClassName: 'scale-[1.34] opacity-100 -translate-x-[6%] translate-y-[12%]',
    overlayClassName:
      'bg-[radial-gradient(circle_at_14%_92%,rgba(112,234,213,0.22)_0%,rgba(10,13,17,0)_36%)]',
  },
   {
    id: 'project-03',
    label: 'PROJECT 03',
    title: '',
    name: 'Xelle',
    link: 'https://xelle.ro',
    mediaSrc:xelle,
    bendRotation: 212,
    bendSpeed: 0.28,
    bendScale: 0.92,
    bendFrequency: 1.12,
    bendWarp: 0.96,
    bendParallax: 0.18,
    bendIntensity: 2.85,
    bendBandWidth: 2.35,
    bendClassName: 'scale-[1.34] opacity-100 -translate-x-[6%] translate-y-[12%]',
    overlayClassName:
      'bg-[radial-gradient(circle_at_14%_92%,rgba(112,234,213,0.22)_0%,rgba(10,13,17,0)_36%)]',
  }, {
    id: 'project-04',
    label: 'PROJECT 04',
    title: '',
    name: 'Amber Cloud',
    link: 'https://amber-cloud.vip/',
    mediaSrc:amber,
    bendRotation: 212,
    bendSpeed: 0.28,
    bendScale: 0.92,
    bendFrequency: 1.12,
    bendWarp: 0.96,
    bendParallax: 0.18,
    bendIntensity: 2.85,
    bendBandWidth: 2.35,
    bendClassName: 'scale-[1.34] opacity-100 -translate-x-[6%] translate-y-[12%]',
    overlayClassName:
      'bg-[radial-gradient(circle_at_14%_92%,rgba(112,234,213,0.22)_0%,rgba(10,13,17,0)_36%)]',
  },
];

/* ------------------------------------------------------------------ */
/* Skeleton shown while the media (video or image) is still loading    */
/* ------------------------------------------------------------------ */
function MediaSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white/[0.03]">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(110deg, rgba(255,255,255,0.02) 8%, rgba(255,255,255,0.08) 18%, rgba(255,255,255,0.02) 33%)',
          backgroundSize: '200% 100%',
          animation: 'dg-skeleton-shimmer 1.6s ease-in-out infinite',
        }}
      />
      {/* subtle pulsing icon placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="h-8 w-8 animate-pulse border border-white/15" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Standard media (used by non-featured project cards)                 */
/* ------------------------------------------------------------------ */
function ProjectMedia({
  src,
  title,
  inView,
}: {
  src: string;
  title: string;
  inView: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm|ogg)$/i.test(src);

  useEffect(() => {
    if (inView) {
      setShouldLoad(true);
    }
  }, [inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  if (!src || hasError) {
    return <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.03]" />;
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      {!loaded && <MediaSkeleton />}

      {isVideo ? (
        <video
          ref={videoRef}
          src={shouldLoad ? src : undefined}
          muted
          loop
          playsInline
          preload="none"
          className={[
            'h-full w-full object-cover object-top transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onLoadedData={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <img
          src={src}
          alt={title}
          className={[
            'h-full w-full object-top transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      <div className="noise-layer pointer-events-none absolute inset-0 opacity-[0.14]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Featured media: video anchored to the top-right corner, fully       */
/* visible (no cropping), asymmetric "uniq" frame                      */
/* ------------------------------------------------------------------ */
function FeaturedMedia({
  src,
  title,
  inView,
}: {
  src: string;
  title: string;
  inView: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (inView) {
      setShouldLoad(true);
    }
  }, [inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  if (!src || hasError) {
    return <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.03]" />;
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      {!loaded && <MediaSkeleton />}

      {/* Video sits flush against the bottom and right edges of the box,
          fully visible (object-contain), nothing cropped on the sides. */}
      <div className="absolute inset-0 flex items-end justify-end">
        <video
          ref={videoRef}
          src={shouldLoad ? src : undefined}
          muted
          loop
          playsInline
          preload="none"
          className={[
            'h-full w-full object-contain object-right-bottom transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onLoadedData={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      </div>

      <div className="noise-layer pointer-events-none absolute inset-0 opacity-[0.14]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single project card. ColorBends only mounts (and video only plays)  */
/* while the card is within ~200px of the viewport — this is what      */
/* fixes the scroll jank, since those were previously running           */
/* continuously even off-screen.                                       */
/* ------------------------------------------------------------------ */
function ProjectCardItem({
  project,
  index,
  isActive,
  onMouseEnter,
}: {
  project: ProjectCard;
  index: number;
  isActive: boolean;
  onMouseEnter: () => void;
}) {
  const { ref, inView } = useInViewport<HTMLElement>('200px');

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
      onMouseEnter={onMouseEnter}
      className={[
        'group relative overflow-hidden border p-5 transition-colors duration-500 sm:p-7',
        isActive
          ? 'border-white/25 bg-white/[0.045]'
          : 'border-white/10 bg-white/[0.015] hover:border-white/15',
      ].join(' ')}
    >
      <div className="absolute inset-0">
        {inView && (
          <ColorBends
            className={project.bendClassName}
            rotation={project.bendRotation}
            speed={project.bendSpeed}
            scale={project.bendScale}
            frequency={project.bendFrequency}
            warpStrength={project.bendWarp}
            mouseInfluence={0.48}
            noise={0.2}
            parallax={project.bendParallax}
            iterations={2}
            intensity={project.bendIntensity}
            bandWidth={project.bendBandWidth}
            transparent
            autoRotate={0}
            color="#003eac"
          />
        )}
      </div>
      <div className={`absolute inset-0 ${project.overlayClassName}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_18%,transparent_82%,rgba(255,255,255,0.015))]" />
      <div
        className={[
          'pointer-events-none absolute inset-0 transition-opacity duration-700',
          isActive ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{
          background:
            'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.05) 45%, transparent 60%)',
          backgroundSize: '220% 220%',
          animation: isActive ? 'dg-project-sweep 2.6s ease-in-out infinite' : 'none',
        }}
      />
      <div className="noise-layer absolute inset-0 opacity-[0.14]" />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span
            className={[
              'font-mono text-[12px] uppercase tracking-[0.18em] transition-colors duration-500',
              isActive ? 'text-white/55' : 'text-white/25',
            ].join(' ')}
          >
            {project.label}
          </span>

          {project.title && (
            <p
              className={[
                'max-w-[34ch] text-[14px] font-light leading-snug transition-colors duration-500',
                isActive ? 'text-white/55' : 'text-white/35',
              ].join(' ')}
            >
              {project.title}
            </p>
          )}

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex w-fit items-center gap-2.5 border-b border-transparent pb-0.5 transition-colors duration-300 hover:border-[#3b5ecd]/60"
          >
            <span
              className={[
                'text-[20px] font-normal tracking-[-0.02em] transition-colors duration-500 sm:text-[24px]',
                isActive ? 'text-white/95' : 'text-white/80',
              ].join(' ')}
            >
              {project.name}
            </span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-white/20 text-[#3b5ecd] transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:border-[#3b5ecd]/60">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9L9 3M9 3H4M9 3V8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        <div>
          {project.featured ? (
            <ProjectMedia src={project.mediaSrc} title={project.title} inView={inView} />
          ) : (
            <ProjectMedia src={project.mediaSrc} title={project.title} inView={inView} />
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsShowcase({ sectionId = 'projects' }: { sectionId?: string | null }) {
  const [active, setActive] = useState(0);

  return (
    <section id={sectionId ?? undefined} className="relative w-full overflow-hidden px-6 py-20">
      <style>{`
        @keyframes dg-project-sweep {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes dg-skeleton-shimmer {
          0% { background-position: 200% 0%; }
          100% { background-position: -200% 0%; }
        }
      `}</style>

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-10">
        <div className="flex max-w-[760px] flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[#3b5ecd]" />
            <span className="font-mono text-[14px] font-semibold uppercase leading-[1.3] tracking-[0.18em] text-[#3b5ecd]">
              PROIECTE
            </span>
          </div>

          <p className="text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
            Proiecte finalizate cu profesionalism, grijă pentru detalii și soluții adaptate fiecărui client..
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
              isActive={active === index}
              onMouseEnter={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

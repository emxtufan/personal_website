import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import CountUp from './CountUp';
import SplitText from './SplitText';


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};



const AVATARS = [
  'https://res.cloudinary.com/duymfuehu/image/upload/v1782858655/images_cjswos.jpg',
  'https://res.cloudinary.com/duymfuehu/image/upload/v1782858670/images_vmuqpr.webp',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ivsyZktzivPvb79tCI29vWyyjvcIcf74V3Apogh_38nr0x0Jm9Ikt3CWThfuVIlLV1S3DMqDszh15seQTNe_AehUad_mo2a6dLQM8MA&s=10',
  'https://res.cloudinary.com/duymfuehu/image/upload/v1782858693/nFTyhTg9mtSiD0Oh51DGHixETM_pltt92.jpg',
];

const INSIGHT_MESSAGES = [
  {
    id: 'clarity',
    text: 'Construim experiente digitale clare, memorabile si usor de parcurs pentru utilizatorii care conteaza.',
  },
  {
    id: 'execution',
    text: 'Punem accent pe executie curata, interactiuni fluide si decizii de design care sustin conversia.',
  },
  {
    id: 'scalable',
    text: 'Fiecare proiect este gandit sa arate premium astazi si sa poata evolua usor maine.',
  },
];


function StarIcon() {
  return (
    <svg viewBox="0 0 62 58" width="11" height="10" className="shrink-0 fill-[#ff9100]">
      <path d="M31 0l8.5 19.5L60 22l-15 14.5L48.5 58 31 47 13.5 58 18 36.5 3 22l20.5-2.5L31 0z" />
    </svg>
  );
}

export default function WhyChooseMe({ sectionId = 'why-choose' }: { sectionId?: string | null }) {
  const [activeInsight, setActiveInsight] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveInsight((current) => (current + 1) % INSIGHT_MESSAGES.length);
    }, 3200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id={sectionId ?? undefined}
      className="w-full px-6 py-20 sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 sm:gap-16">
        {/* Section header */}
        <div className="flex flex-col items-start justify-end gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-[420px] flex-col items-start gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e0e2e6] bg-[#f7f7f8] px-4 py-1.5">
              <span className="text-[14px] font-medium leading-5 tracking-[-0.01em] text-[#121218]">
                De ce să alegi echipa noastră?
              </span>
            </span>

            <SplitText
              text="Design construit pe claritate și consistență durabilă."
              className="text-[28px] font-semibold leading-[1.3] tracking-[-0.02em] sm:text-[36px] sm:leading-[48px]"
              delay={10}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              tag="h2"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>

          <p className="max-w-[480px] text-[15px] leading-6 tracking-[-0.02em] text-zinc-400 sm:text-[16px]">
            Nu dezvoltăm doar website-uri și aplicații. Construim produse
            digitale gândite să performeze, să crească odată cu afacerea ta și
            să ofere o experiență impecabilă utilizatorilor.
          </p>
        </div>

        {/* Content */}
        <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-stretch">
          {/* Leading content (two stacked cards + availability pill) */}
          <div className="flex w-full flex-1 flex-col gap-2">
            {/* top: avatars + label card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              className="flex h-[84px] w-full items-center gap-3 border border-[#393939]  p-6"
            >
              <div className="relative h-9 w-[108px] shrink-0">
                {AVATARS.map((src, i) => (
                  <div
                    key={src}
                    className="absolute top-0 h-9 w-9 overflow-hidden rounded-full p-0.5"
                    style={{
                      left: i * 24,
                      boxShadow:
                        "rgb(134 134 134) 0px 4px 8px -4px, rgb(0 0 0) 0px 2px 4px -2px",
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[16px] font-medium leading-6 tracking-[-0.02em] text-[#b5b5b5]">
                Clienți cu care am lucrat
              </span>
            </motion.div>

            {/* two stat cards */}
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="flex h-[296px] w-full flex-col justify-between rounded-2xl border border-[#393939] p-6 sm:w-1/2"
              >
                <p className="max-w-[280px] text-[16px] leading-6 tracking-[-0.02em] ">
                  Totul este construit cu atenție la fiecare detaliu.
                </p>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[56px] font-semibold leading-[64px] tracking-[-0.02em]"
                  >
                    <CountUp
                      from={0}
                      to={92}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                      delay={0}
                    />
                    %
                  </span>
                  <span className="text-[16px] leading-6 tracking-[-0.02em] text-[#61646b]">
                    Satisfacția clientului
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex h-[296px] w-full flex-col justify-between rounded-2xl border border-[#393939] p-6 sm:w-1/2"
              >
                <p className="max-w-[280px] text-[16px] leading-6 tracking-[-0.02em]">
                  Brand identities, websites, and digital systems delivered with
                  care.
                </p>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[56px] font-semibold leading-[64px] tracking-[-0.02em] "
                  >
                    <CountUp
                      from={0}
                      to={56}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                      delay={0}
                    />
                    +
                  </span>
                  <span className="text-[16px] leading-6 tracking-[-0.02em] text-[#61646b]">
                    Projects completed
                  </span>
                </div>
              </motion.div>
            </div>

            {/* available for projects pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex h-16 w-full items-center gap-2 rounded-2xl border border-[#393939]  px-6 py-5"
            >
              <span className="relative h-3 w-3 shrink-0 rounded-full bg-[#d8f89d]">
                <span className="absolute inset-[3px] rounded-full bg-[#83ca16]" />
              </span>
              <span className="text-[16px] font-medium leading-6 tracking-[-0.02em] ">
                Available for projects
              </span>
            </motion.div>
          </div>

          {/* trailing dark card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex w-full flex-col justify-between gap-8 rounded-2xl p-6 lg:w-[40%]"
            style={{
              background: "linear-gradient(180deg, #24242a 0%, #121218 100%)",
              boxShadow: "",
            }}
          >
            <div className="relative min-h-[96px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={INSIGHT_MESSAGES[activeInsight].id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="max-w-[380px] text-[16px] leading-6 tracking-[-0.02em] text-[#c9cdd2]"
                >
                  {INSIGHT_MESSAGES[activeInsight].text}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-end justify-start gap-4">
              <span
                className="text-[44px] font-semibold leading-[1] tracking-[-0.02em] text-white sm:text-[56px] sm:leading-[64px]"
              >
                <CountUp
                  from={0}
                  to={4.9}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  delay={0}
                />
              </span>
              <div className="flex flex-col gap-1.5 pb-1.5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span className="text-[14px] leading-5 tracking-[-0.02em] text-[#94979e] sm:text-[16px] sm:leading-6">
                  Trusted by clients worldwide
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

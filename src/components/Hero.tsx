import { motion } from 'motion/react';
import laurelLeft from '../assets/laurel-left.svg';
import laurelRight from '../assets/laurel-right.svg';

const questHeroBg = '/quest-hero-bg.webp';

const stats = [
  ['Over 10+ years as', 'industry leader'],
  ['Trusted by 3,000+', 'businesses globally'],
  ['Average clients', 'rating at 4.9/5'],
];

function LaurelStat({ lines }: { lines: string[] }) {
  return (
    <div className="flex w-max items-center justify-center gap-3">
      <img src={laurelLeft} alt="" aria-hidden="true" className="h-[42px] w-[17px] opacity-50" />
      <p className="w-[112px] text-center text-[11px] font-normal leading-[12px] tracking-normal text-white/60 sm:text-[12px] sm:leading-[13px]">
        {lines[0]}
        <br />
        {lines[1]}
      </p>
      <img src={laurelRight} alt="" aria-hidden="true" className="h-[42px] w-[17px] opacity-50" />
    </div>
  );
}

export default function Hero() {
  return (
    <header
      id="hero"
      className="relative flex min-h-[815px] w-full items-start justify-center overflow-visible px-0 pb-[250px] pt-[178px] sm:min-h-[860px] sm:pt-[220px] md:h-screen md:min-h-[760px] md:pb-12 md:pt-[272px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={questHeroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1126}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 block h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,17,0.10)_0%,#0a0d11_100%)]" />
      </div>

      <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center justify-start gap-6 px-5 text-center sm:gap-8 sm:px-4">
        <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-[400px] font-sans text-[34px] font-bold leading-[0.96] tracking-[-0.02em] text-white sm:max-w-[520px] sm:text-[46px] md:max-w-[560px] md:text-[52px]"
          >
            <span>Construim produse digitale de pe alta </span>
            <span className="text-[#3b5ecd]">planeta.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="max-w-[330px] text-center text-[14px] font-normal leading-[20px] tracking-normal text-white/76 sm:max-w-[500px] sm:text-[15px] sm:leading-[21px] md:max-w-[520px] md:text-[16px] md:leading-[22px]"
          >
            Design premium, dezvoltare frontend, aplicatii web si automatizari custom create pentru companiile care vor mai mult decat o simpla experienta digitala.
          </motion.p>
        </div>

        <motion.a
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: 'easeOut' }}
          href="#cta"
          className="inline-flex h-[52px] w-max items-center justify-center rounded-[12px] bg-white/90 px-7 text-[15px] font-medium leading-[20px] tracking-normal text-black transition-all duration-200 hover:bg-white sm:h-[58px] sm:px-8 sm:text-[16px]"
        >
          Cere oferta
        </motion.a>
      </div>

      <div className="absolute bottom-[48px] left-1/2 z-10 flex w-max -translate-x-1/2 items-center justify-center gap-3.5 max-[760px]:flex-col max-[760px]:gap-4 md:bottom-[76px]">
        {stats.map((stat) => (
          <div key={stat.join('-')}>
            <LaurelStat lines={stat} />
          </div>
        ))}
      </div>
    </header>
  );
}

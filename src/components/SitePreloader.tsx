import { Terminal } from 'lucide-react';

export default function SitePreloader({ isLeaving }: { isLeaving: boolean }) {
  return (
    <div
      className={[
        'fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#0a0d11] transition-opacity duration-300 ease-out',
        isLeaving ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
      aria-live="polite"
      aria-busy={!isLeaving}
    >
      <div className="noise-layer pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#003eac]/20 blur-[110px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center border border-white/14 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_80px_rgba(0,0,0,0.45)]">
          <Terminal className="h-7 w-7 text-white" />
        </div>

        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.34em] text-white/42">
          Esa Coder Solutions
        </p>
        <div className="mt-8 h-px w-full overflow-hidden bg-white/[0.08]">
          <div className="h-full w-1/2 animate-[preloader-progress_1.15s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,#ffffff,transparent)]" />
        </div>
      </div>
    </div>
  );
}

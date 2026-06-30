import React, { useEffect, useState } from 'react';
import { Check, Copy, Laptop, Palette, ShoppingBag, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { FEATURES } from '../data';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ShinyText from './ShinyText';

interface TypewriterCodeProps {
  code: string;
  active: boolean;
  enabled: boolean;
}

function TypewriterCode({ code, active, enabled }: TypewriterCodeProps) {
  const [displayedText, setDisplayedText] = useState(enabled ? '' : code);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(code);
      return;
    }

    if (!active) {
      setDisplayedText('');
      return;
    }

    setDisplayedText('');
    let i = 0;

    const interval = setInterval(() => {
      const charsToType = Math.ceil(code.length / 80);
      i += charsToType;

      if (i >= code.length) {
        setDisplayedText(code);
        clearInterval(interval);
      } else {
        setDisplayedText(code.substring(0, i));
      }
    }, 15);

    return () => clearInterval(interval);
  }, [code, active, enabled]);

  return (
    <pre className="font-mono text-xs text-zinc-300">
      <code>
        {displayedText}
        {enabled && displayedText.length < code.length && (
          <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-white align-middle" />
        )}
      </code>
    </pre>
  );
}

interface FeatureCardProps {
  feat: any;
  index: number;
  copiedId: string | null;
  handleCopyCode: (id: string, text: string) => void;
  getIcon: (iconName: string) => React.ReactNode;
}

function FeatureCard({ feat, index, copiedId, handleCopyCode, getIcon }: FeatureCardProps) {
  const [isInView, setIsInView] = useState(false);
  const isEffectEnabled = index === 0 || index === 1;

  return (
    <motion.article
      initial={isEffectEnabled ? { opacity: 0, y: 40, filter: 'blur(12px)' } : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: isEffectEnabled ? index * 0.15 : 0.05, ease: 'easeOut' }}
      className="glow-card flex h-full flex-col justify-between gap-8 rounded-[32px] p-6 transition-all duration-300 group hover:translate-y-[-2px] sm:p-8"
    >
      <div>
        <div className="mb-5 flex items-center gap-3.5">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">{getIcon(feat.iconName)}</div>
          {feat.badge && (
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-semibold text-zinc-300">
              {feat.badge}
            </span>
          )}
        </div>

        <h3 className="mb-3 font-sans text-xl font-bold text-white transition-colors group-hover:text-zinc-300">
          {feat.title}
        </h3>

        <p className="text-sm font-light leading-relaxed text-zinc-400 sm:text-base">{feat.description}</p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black/40 font-mono text-xs text-zinc-400">
        <div className="flex items-center justify-between bg-white/[0.01] px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
          </div>

          {feat.codeSnippet && (
            <button
              onClick={() => handleCopyCode(feat.id, feat.codeSnippet || '')}
              className="flex items-center gap-1.5 text-[11px] text-zinc-500 transition-colors hover:text-white"
              title="Copy code"
              type="button"
            >
              {copiedId === feat.id ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="font-medium text-emerald-400">Copiat!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiaza codul</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="max-h-56 overflow-x-auto p-4">
          {feat.codeSnippet ? (
            <TypewriterCode code={feat.codeSnippet} active={isInView} enabled={isEffectEnabled} />
          ) : (
            <div className="text-zinc-600">Nicio previzualizare disponibila</div>
          )}
        </div>

        {feat.metric && (
          <div className="flex items-center justify-between bg-white/[0.01] px-4 py-2.5">
            <span className="select-none text-[11px] text-zinc-500">Metrica standard:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white">{feat.metric}</span>
              <span className="text-zinc-800">|</span>
              <span className="text-[11px] text-zinc-400">{feat.metricLabel}</span>
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Features() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="h-5 w-5 text-blue-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="h-5 w-5 text-amber-400" />;
      case 'Wrench':
        return <Wrench className="h-5 w-5 text-purple-400" />;
      case 'Palette':
        return <Palette className="h-5 w-5 text-cyan-400" />;
      default:
        return <Laptop className="h-5 w-5 text-neutral-400" />;
    }
  };

  return (
    <section id="features" className="relative overflow-visible py-24">
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-white/[0.01] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="glass rounded-full px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Servicii Complete
          </span>
          <h2 className="mt-6 mb-6 font-sans text-3xl font-bold tracking-tight text-gradient sm:text-4xl md:text-5xl">
            <ShinyText
              text="Solutii digitale premium pentru afacerea ta"
              speed={2.4}
              delay={0.25}
              color="rgba(255,255,255,0.34)"
              shineColor="#ffffff"
              spread={95}
            />
          </h2>
          <p className="text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
            Dezvoltam de la zero interfete moderne, sisteme e-commerce robuste si oferim administrare tehnica de
            incredere. Vezi detalii si mostre din tehnologiile pe care le implementam in fiecare zi.
          </p>
        </motion.div>

        <ScrollStack
          useWindowScroll
          className="mx-auto max-w-5xl"
          itemDistance={120}
          itemScale={0.045}
          itemStackDistance={20}
          stackPosition="16%"
          baseScale={0.86}
          blurAmount={0.6}
        >
          {FEATURES.map((feat, index) => (
            <ScrollStackItem key={feat.id} itemClassName="min-h-[420px] sm:min-h-[460px] lg:min-h-[500px]">
              <FeatureCard
                feat={feat}
                index={index}
                copiedId={copiedId}
                handleCopyCode={handleCopyCode}
                getIcon={getIcon}
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}

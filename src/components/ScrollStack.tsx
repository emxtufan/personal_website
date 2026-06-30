import { Children, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export function ScrollStackItem({ children, itemClassName = '' }: ScrollStackItemProps) {
  return (
    <div
      className={`scroll-stack-card relative w-full origin-top will-change-transform ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 40,
  itemScale = 0.08,
  itemStackDistance = 20,
  stackPosition = 20,
  baseScale = 0.78,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}: ScrollStackProps) {
  const shellRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLElement[]>([]);
  const innerRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);
  const completedRef = useRef(false);
  const items = useMemo(() => Children.toArray(children), [children]);

  const parsePosition = useCallback((value: string | number, viewportHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * viewportHeight;
    }

    return parseFloat(String(value));
  }, []);

  const updateStack = useCallback(() => {
    if (!cardRefs.current.length) return;

    const viewportHeight = window.innerHeight;
    const baseOffset = parsePosition(stackPosition, viewportHeight);

    shellRefs.current.forEach((shell, index) => {
      if (!shell) return;
      shell.style.paddingTop = `${baseOffset + index * itemStackDistance}px`;
    });

    const firstCardHeight = cardRefs.current[0]?.offsetHeight ?? 0;
    if (innerRef.current && firstCardHeight > 0) {
      innerRef.current.style.setProperty('--cards-count', String(items.length));
      innerRef.current.style.setProperty('--card-height', `${firstCardHeight}px`);
      innerRef.current.style.setProperty('--cards-gap', `${itemDistance}px`);
    }

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      if (index === cardRefs.current.length - 1) {
        card.style.transform = 'scale(1) rotate(0deg)';
        card.style.filter = '';
        return;
      }

      const nextShell = shellRefs.current[index + 1];
      if (!nextShell) return;

      const nextTop = nextShell.getBoundingClientRect().top;
      const currentHeight = card.offsetHeight;
      const stickyOffset = baseOffset + index * itemStackDistance;
      const progressStart = viewportHeight - currentHeight;
      const progressEnd = stickyOffset;
      const denominator = Math.max(1, progressStart - progressEnd);
      const progress = Math.min(1, Math.max(0, (progressStart - nextTop) / denominator));
      const targetScale = Math.min(1, baseScale + index * itemScale);
      const scale = 1 - progress * (1 - targetScale);
      const rotation = rotationAmount ? index * rotationAmount * progress : 0;
      const blur = blurAmount ? progress * blurAmount : 0;
      const brightness = 1 - progress * 0.28;

      card.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      card.style.filter = `${blur > 0 ? `blur(${blur}px) ` : ''}brightness(${brightness})`;
    });

    const lastShell = shellRefs.current[shellRefs.current.length - 1];
    if (lastShell) {
      const lastTop = lastShell.getBoundingClientRect().top;
      const done = lastTop <= baseOffset + (shellRefs.current.length - 1) * itemStackDistance + 1;
      if (done && !completedRef.current) {
        completedRef.current = true;
        onStackComplete?.();
      } else if (!done && completedRef.current) {
        completedRef.current = false;
      }
    }
  }, [baseScale, blurAmount, itemDistance, itemScale, itemStackDistance, items.length, onStackComplete, parsePosition, rotationAmount, stackPosition]);

  const queueUpdate = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      updateStack();
      tickingRef.current = false;
    });
  }, [updateStack]);

  useLayoutEffect(() => {
    const scrollTarget = useWindowScroll ? window : null;

    shellRefs.current.forEach((shell, index) => {
      if (!shell) return;
      const card = shell.querySelector('.scroll-stack-card') as HTMLElement | null;
      if (card) {
        cardRefs.current[index] = card;
      }
    });

    updateStack();

    scrollTarget?.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);

    return () => {
      scrollTarget?.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      shellRefs.current = [];
      cardRefs.current = [];
      completedRef.current = false;
      tickingRef.current = false;
    };
  }, [queueUpdate, updateStack, useWindowScroll]);

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <div
        ref={innerRef}
        className="scroll-stack-inner mx-auto grid w-full"
        style={{
          gridTemplateRows: 'repeat(var(--cards-count), var(--card-height))',
          gap: 'var(--cards-gap, 40px) 0',
          paddingBottom: '26vh',
        }}
      >
        {items.map((item, index) => (
          <div
            key={(item as { key?: string | number | null }).key ?? index}
            ref={(element) => {
              if (element) {
                shellRefs.current[index] = element;
              }
            }}
            className="scroll-stack-shell sticky top-0"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

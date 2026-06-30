import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

type LazySectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  fallback?: ReactNode;
  minHeight?: number | string;
  rootMargin?: string;
  eager?: boolean;
};

export default function LazySection({
  children,
  id,
  className,
  fallback = null,
  minHeight = 320,
  rootMargin = '350px 0px',
  eager = false,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const isRendered = eager || shouldRender;

  useEffect(() => {
    if (eager || shouldRender) {
      if (eager && !shouldRender) {
        setShouldRender(true);
      }

      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [eager, rootMargin, shouldRender]);

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      style={!isRendered ? { minHeight } : undefined}
    >
      {isRendered ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}

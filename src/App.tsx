/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import Hero from './components/Hero';
import LazySection from './components/LazySection';
import SitePreloader from './components/SitePreloader';
import { getServiceProcessBySlug } from './service-processes';

function cachedImport<T>(loader: () => Promise<T>) {
  let promise: Promise<T> | null = null;

  return () => {
    promise ??= loader();
    return promise;
  };
}

const loadFeauturestow = cachedImport(() => import('./components/Feauturestow'));
const loadLogoStrip = cachedImport(() => import('./components/LogoStrip'));
const loadProjectsShowcase = cachedImport(() => import('./components/ProjectsShowcase'));
const loadWhyChooseMe = cachedImport(() => import('./components/WhyChooseMe'));
const loadProcessSection = cachedImport(() => import('./components/ProcessSection'));
const loadPricing = cachedImport(() => import('./components/Pricing'));
const loadCTA = cachedImport(() => import('./components/CTA'));
const loadFAQ = cachedImport(() => import('./components/FAQ'));
const loadServiceProcessPage = cachedImport(() => import('./components/ServiceProcessPage'));
const loadAdminPanel = cachedImport(() => import('./components/AdminPanel'));
const loadFooter = cachedImport(() => import('./components/Footer'));
const loadLegalModals = cachedImport(() => import('./components/LegalModals'));

const Feauturestow = lazy(loadFeauturestow);
const LogoStrip = lazy(loadLogoStrip);
const ProjectsShowcase = lazy(loadProjectsShowcase);
const WhyChooseMe = lazy(loadWhyChooseMe);
const ProcessSection = lazy(loadProcessSection);
const Pricing = lazy(loadPricing);
const CTA = lazy(loadCTA);
const FAQ = lazy(loadFAQ);
const ServiceProcessPage = lazy(loadServiceProcessPage);
const AdminPanel = lazy(loadAdminPanel);
const Footer = lazy(loadFooter);
const LegalModals = lazy(loadLegalModals);

const homeSectionLoaders = [
  loadFeauturestow,
  loadLogoStrip,
  loadProjectsShowcase,
  loadWhyChooseMe,
  loadProcessSection,
  loadPricing,
  loadCTA,
  loadFAQ,
];

let homeSectionsPreloadPromise: Promise<PromiseSettledResult<unknown>[]> | null = null;

function preloadHomeSectionsNow() {
  homeSectionsPreloadPromise ??= Promise.allSettled(
    homeSectionLoaders.map((loadSection) => loadSection()),
  );

  return homeSectionsPreloadPromise;
}

function scheduleHomeSectionWarmup() {
  const delays = [1600, 2400, 3400, 4400, 5400, 6400, 7400, 8400];
  const timers = homeSectionLoaders.map((loadSection, index) =>
    window.setTimeout(() => {
      void loadSection().catch(() => undefined);
    }, delays[index] ?? 8400),
  );

  return () => timers.forEach((timer) => window.clearTimeout(timer));
}

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="relative mx-auto flex min-h-[inherit] w-full max-w-[1280px] items-center justify-center px-6 py-20">
      <div className="relative w-full overflow-hidden border border-white/10 bg-white/[0.018] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,62,172,0.18),transparent_38%)]" />
        <div className="noise-layer absolute inset-0 opacity-[0.08]" />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <span className="h-1.5 w-1.5 bg-[#3b5ecd]" />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
            {label}
          </p>
          <div className="h-px w-full max-w-xs overflow-hidden bg-white/[0.08]">
            <div className="h-full w-1/2 animate-[preloader-progress_1.25s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function getCurrentPath() {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

type AppHistoryState = {
  app?: 'codexa';
  canGoBackHome?: boolean;
  path?: string;
  scrollY?: number;
};

export default function App() {
  const [pathname, setPathname] = useState(getCurrentPath);
  const [showPreloader, setShowPreloader] = useState(() => getCurrentPath() === '/');
  const [preloaderLeaving, setPreloaderLeaving] = useState(false);
  const [legalModalsReady, setLegalModalsReady] = useState(false);
  const pendingScrollRestoreRef = useRef<number | null>(null);

  const restoreScroll = useCallback((scrollY: number) => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: 'auto' });
    });
  }, []);

  const persistCurrentEntry = useCallback(() => {
    const currentPath = getCurrentPath();
    const currentState = window.history.state as AppHistoryState | null;

    window.history.replaceState(
      {
        ...currentState,
        app: 'codexa',
        canGoBackHome: currentState?.canGoBackHome ?? false,
        path: currentPath,
        scrollY: window.scrollY,
      } satisfies AppHistoryState,
      '',
      currentPath,
    );
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const onPopState = (event: PopStateEvent) => {
      const nextPath = getCurrentPath();
      const nextState = event.state as AppHistoryState | null;

      pendingScrollRestoreRef.current =
        nextPath === '/' ? nextState?.scrollY ?? 0 : 0;

      setPathname(nextPath);
    };

    window.addEventListener('popstate', onPopState);
    return () => {
      window.history.scrollRestoration = 'auto';
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    if (!showPreloader) return;

    document.body.style.overflow = 'hidden';

    let cancelled = false;
    const startedAt = performance.now();
    let leaveTimeout: number | undefined;
    let removeTimeout: number | undefined;

    const finishPreload = () => {
      const elapsed = performance.now() - startedAt;
      const remainingMinimumTime = Math.max(0, 260 - elapsed);

      leaveTimeout = window.setTimeout(() => {
        setPreloaderLeaving(true);
        removeTimeout = window.setTimeout(() => {
          setShowPreloader(false);
          document.body.style.overflow = '';
        }, 320);
      }, remainingMinimumTime);
    };

    const maxIntroTimeout = window.setTimeout(() => {
      if (cancelled) return;
      finishPreload();
    }, 460);

    return () => {
      cancelled = true;
      window.clearTimeout(maxIntroTimeout);
      if (leaveTimeout) window.clearTimeout(leaveTimeout);
      if (removeTimeout) window.clearTimeout(removeTimeout);
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  useEffect(() => {
    if (pathname !== '/' || showPreloader) return;

    return scheduleHomeSectionWarmup();
  }, [pathname, showPreloader]);

  useEffect(() => {
    if (pathname !== '/') return;

    const preloadOnIntent = () => {
      void preloadHomeSectionsNow();
    };

    window.addEventListener('wheel', preloadOnIntent, { once: true, passive: true });
    window.addEventListener('touchstart', preloadOnIntent, { once: true, passive: true });
    window.addEventListener('keydown', preloadOnIntent, { once: true });

    return () => {
      window.removeEventListener('wheel', preloadOnIntent);
      window.removeEventListener('touchstart', preloadOnIntent);
      window.removeEventListener('keydown', preloadOnIntent);
    };
  }, [pathname]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLegalModalsReady(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentState = window.history.state as AppHistoryState | null;

    if (currentState?.app === 'codexa' && currentState.path === pathname) {
      return;
    }

    window.history.replaceState(
      {
        ...currentState,
        app: 'codexa',
        canGoBackHome: currentState?.canGoBackHome ?? false,
        path: pathname,
        scrollY: currentState?.path === pathname ? currentState.scrollY : window.scrollY,
      } satisfies AppHistoryState,
      '',
      pathname,
    );
  }, [pathname]);

  useEffect(() => {
    if (pendingScrollRestoreRef.current === null) {
      return;
    }

    const scrollY = pendingScrollRestoreRef.current;
    pendingScrollRestoreRef.current = null;
    restoreScroll(scrollY);
  }, [pathname, restoreScroll]);

  const openService = useCallback((slug: string) => {
    const nextPath = `/procese/${slug}`;
    const currentPath = getCurrentPath();

    if (nextPath === currentPath) return;

    persistCurrentEntry();

    window.history.pushState(
      {
        app: 'codexa',
        canGoBackHome: currentPath === '/',
        path: nextPath,
      } satisfies AppHistoryState,
      '',
      nextPath,
    );

    pendingScrollRestoreRef.current = 0;
    setPathname(nextPath);
  }, [persistCurrentEntry]);

  const goBackFromService = useCallback(() => {
    const currentState = window.history.state as AppHistoryState | null;

    if (currentState?.app === 'codexa' && currentState.canGoBackHome) {
      window.history.back();
      return;
    }

    const homePath = '/';

    window.history.pushState(
      {
        app: 'codexa',
        canGoBackHome: false,
        path: homePath,
        scrollY: 0,
      } satisfies AppHistoryState,
      '',
      homePath,
    );

    pendingScrollRestoreRef.current = 0;
    setPathname(homePath);
  }, []);

  const goHome = useCallback(() => {
    const homePath = '/';

    window.history.pushState(
      {
        app: 'codexa',
        canGoBackHome: false,
        path: homePath,
        scrollY: 0,
      } satisfies AppHistoryState,
      '',
      homePath,
    );

    pendingScrollRestoreRef.current = 0;
    setPathname(homePath);
  }, []);

  const activeService = useMemo(() => {
    const match = pathname.match(/^\/procese\/([^/]+)\/?$/);
    if (!match) return null;
    return getServiceProcessBySlug(match[1]) ?? null;
  }, [pathname]);

  const isAdminPage = pathname === '/admin';

  return (
    <div
      id="app-root"
      className="min-h-screen overflow-x-hidden bg-[#0a0d11] text-neutral-200 antialiased selection:bg-[#9fffe7]/20 selection:text-white"
    >
      <SEO pathname={pathname} activeService={activeService} isAdminPage={isAdminPage} />
      {showPreloader && <SitePreloader isLeaving={preloaderLeaving} />}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(10,13,17,0.10)_0%,#0a0d11_100%)]" />
      <div className="noise-layer pointer-events-none fixed inset-0 z-40" />

      <div className="relative mx-auto w-full max-w-none">
        <div className="site-frame min-h-screen bg-[linear-gradient(180deg,rgba(10,13,17,0.10)_0%,#0a0d11_100%)]">
          {!activeService && !isAdminPage && <Navbar />}

          <main className="relative z-10">
            <Suspense fallback={null}>
              {isAdminPage ? (
                <AdminPanel onBack={goHome} />
              ) : activeService ? (
                <ServiceProcessPage service={activeService} onBack={goBackFromService} />
              ) : (
                <>
                  <Hero />
                  <LazySection
                    id="features"
                    minHeight={820}
                    rootMargin="260px 0px"
                    fallback={<SectionFallback label="Pregatim serviciile" />}
                  >
                    <Feauturestow sectionId={null} />
                  </LazySection>
                  <LazySection
                    id="logos"
                    minHeight={170}
                    rootMargin="360px 0px"
                    fallback={<SectionFallback label="Pregatim tehnologiile" />}
                  >
                    <LogoStrip sectionId={null} />
                  </LazySection>
                  <LazySection
                    id="projects"
                    minHeight={920}
                    rootMargin="520px 0px"
                    fallback={<SectionFallback label="Pregatim proiectele" />}
                  >
                    <ProjectsShowcase sectionId={null} />
                  </LazySection>
                  <LazySection
                    id="why-choose"
                    minHeight={780}
                    rootMargin="580px 0px"
                    fallback={<SectionFallback label="Pregatim argumentele" />}
                  >
                    <WhyChooseMe sectionId={null} />
                  </LazySection>
                  <LazySection
                    id="process"
                    minHeight={1050}
                    rootMargin="640px 0px"
                    fallback={<SectionFallback label="Pregatim procesul" />}
                  >
                    <ProcessSection sectionId={null} onOpenService={openService} />
                  </LazySection>
                  <LazySection
                    id="pricing"
                    minHeight={820}
                    rootMargin="640px 0px"
                    fallback={<SectionFallback label="Pregatim ofertele" />}
                  >
                    <Pricing sectionId={null} />
                  </LazySection>
                  <LazySection
                    id="cta"
                    minHeight={680}
                    rootMargin="700px 0px"
                    fallback={<SectionFallback label="Pregatim formularul" />}
                  >
                    <CTA sectionId={null} />
                  </LazySection>
                  <LazySection
                    id="faq"
                    minHeight={760}
                    rootMargin="700px 0px"
                    fallback={<SectionFallback label="Pregatim intrebarile" />}
                  >
                    <FAQ sectionId={null} />
                  </LazySection>
                </>
              )}
            </Suspense>
          </main>

          <LazySection minHeight={520} rootMargin="900px 0px">
            <Footer />
          </LazySection>
          {legalModalsReady && (
            <Suspense fallback={null}>
              <LegalModals />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

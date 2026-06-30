/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LegalModals from './components/LegalModals';
import LazySection from './components/LazySection';
import SitePreloader from './components/SitePreloader';
import { getServiceProcessBySlug } from './service-processes';

const loadFeauturestow = () => import('./components/Feauturestow');
const loadLogoStrip = () => import('./components/LogoStrip');
const loadProjectsShowcase = () => import('./components/ProjectsShowcase');
const loadWhyChooseMe = () => import('./components/WhyChooseMe');
const loadProcessSection = () => import('./components/ProcessSection');
const loadPricing = () => import('./components/Pricing');
const loadCTA = () => import('./components/CTA');
const loadFAQ = () => import('./components/FAQ');
const loadServiceProcessPage = () => import('./components/ServiceProcessPage');
const loadAdminPanel = () => import('./components/AdminPanel');

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

function preloadHomeSections() {
  homeSectionsPreloadPromise ??= Promise.allSettled(
    homeSectionLoaders.map((loadSection) => loadSection()),
  );

  return homeSectionsPreloadPromise;
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
  const [homeSectionsReady, setHomeSectionsReady] = useState(() => getCurrentPath() !== '/');
  const [preloaderLeaving, setPreloaderLeaving] = useState(false);
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
    let loadHandler: (() => void) | undefined;
    let leaveTimeout: number | undefined;
    let removeTimeout: number | undefined;

    const finishPreload = () => {
      leaveTimeout = window.setTimeout(() => {
        setPreloaderLeaving(true);
        removeTimeout = window.setTimeout(() => {
          setShowPreloader(false);
          document.body.style.overflow = '';
        }, 720);
      }, 650);
    };

    const waitForWindowLoad =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            loadHandler = () => resolve();
            window.addEventListener('load', loadHandler, { once: true });
          });

    void Promise.allSettled([waitForWindowLoad, preloadHomeSections()]).then(() => {
      if (cancelled) return;

      setHomeSectionsReady(true);
      finishPreload();
    });

    return () => {
      cancelled = true;
      if (loadHandler) window.removeEventListener('load', loadHandler);
      if (leaveTimeout) window.clearTimeout(leaveTimeout);
      if (removeTimeout) window.clearTimeout(removeTimeout);
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

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
                  <LazySection id="features" minHeight={820} rootMargin="1400px 0px" eager={homeSectionsReady}>
                    <Feauturestow sectionId={null} />
                  </LazySection>
                  <LazySection id="logos" minHeight={170} rootMargin="1400px 0px" eager={homeSectionsReady}>
                    <LogoStrip sectionId={null} />
                  </LazySection>
                  <LazySection id="projects" minHeight={920} rootMargin="1400px 0px" eager={homeSectionsReady}>
                    <ProjectsShowcase sectionId={null} />
                  </LazySection>
                  <LazySection id="why-choose" minHeight={780} rootMargin="1400px 0px" eager={homeSectionsReady}>
                    <WhyChooseMe sectionId={null} />
                  </LazySection>
                  <LazySection id="process" minHeight={1050} rootMargin="1400px 0px" eager={homeSectionsReady}>
                    <ProcessSection sectionId={null} onOpenService={openService} />
                  </LazySection>
                  <LazySection id="pricing" minHeight={820} rootMargin="1400px 0px" eager={homeSectionsReady}>
                    <Pricing sectionId={null} />
                  </LazySection>
                  <LazySection id="cta" minHeight={680} rootMargin="1400px 0px" eager={homeSectionsReady}>
                    <CTA sectionId={null} />
                  </LazySection>
                  <LazySection id="faq" minHeight={760} rootMargin="1400px 0px" eager={homeSectionsReady}>
                    <FAQ sectionId={null} />
                  </LazySection>
                </>
              )}
            </Suspense>
          </main>

          <Footer />
          <LegalModals />
        </div>
      </div>
    </div>
  );
}

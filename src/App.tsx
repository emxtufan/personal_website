/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import Hero from './components/Hero';
import LogoStrip from './components/LogoStrip';
import Feauturestow from './components/Feauturestow';
import ProjectsShowcase from './components/ProjectsShowcase';
import HowItWorks from './components/HowItWorks';
import InteractivePlayground from './components/InteractivePlayground';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import LegalModals from './components/LegalModals';
import WhyChooseMe from './components/WhyChooseMe';
import ProcessSection from './components/ProcessSection';
import ServiceProcessPage from './components/ServiceProcessPage';
import AdminPanel from './components/AdminPanel';
import { getServiceProcessBySlug } from './service-processes';

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
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(10,13,17,0.10)_0%,#0a0d11_100%)]" />
      <div className="noise-layer pointer-events-none fixed inset-0 z-40" />

      <div className="relative mx-auto w-full max-w-none">
        <div className="site-frame min-h-screen bg-[linear-gradient(180deg,rgba(10,13,17,0.10)_0%,#0a0d11_100%)]">
          {!activeService && !isAdminPage && <Navbar />}

          <main className="relative z-10">
            {isAdminPage ? (
              <AdminPanel onBack={goHome} />
            ) : activeService ? (
              <ServiceProcessPage service={activeService} onBack={goBackFromService} />
            ) : (
              <>
                <Hero />
                <Feauturestow />
                <LogoStrip />
                <ProjectsShowcase />
                <WhyChooseMe />
                <ProcessSection onOpenService={openService} />
                <Pricing />
                 {/* <InteractivePlayground /> */}
                <CTA />
                <FAQ />
                {/* <Testimonials /> */}
                {/* <HowItWorks /> */}
                {/*
               
                
                */}
              </>
            )}
          </main>

          <Footer />
          <LegalModals />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Cookie, FileText, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';

type LegalModalType = 'privacy' | 'cookies' | 'terms';
type CookieChoice = 'necessary' | 'all';

const LEGAL_MODAL_EVENT = 'codexa-open-legal-modal';
const COOKIE_CONSENT_KEY = 'codexa_cookie_consent_v1';

const modalCopy = {
  privacy: {
    icon: ShieldCheck,
    eyebrow: 'Protectia datelor',
    title: 'Politica de confidentialitate',
    description:
      'Explicam clar ce date colectam, de ce le folosim si cum le protejam atunci cand ne trimiti o cerere sau te abonezi.',
    sections: [
      {
        title: 'Date pe care le colectam',
        body: 'Putem primi numele, adresa de e-mail, numarul de telefon si detaliile proiectului completate in formularele de contact sau abonare.',
      },
      {
        title: 'Cum folosim datele',
        body: 'Folosim informatiile doar pentru a raspunde cererilor, a pregati oferte, a gestiona comunicarea si a imbunatati experienta pe site.',
      },
      {
        title: 'Stocare si acces',
        body: 'Datele sunt pastrate local sau in fisierele serverului proiectului, accesibile doar echipei responsabile de comunicarea cu clientii.',
      },
      {
        title: 'Drepturile tale',
        body: 'Poti solicita acces, corectare, stergere, restrictionarea prelucrarii sau retragerea acordului pentru comunicarile trimise de noi.',
      },
    ],
  },
  cookies: {
    icon: Cookie,
    eyebrow: 'Setari cookies',
    title: 'Politica de cookies',
    description:
      'Folosim cookies si stocare locala pentru functionalitatea site-ului, preferinte si o experienta mai lina. Nu vindem date catre terti.',
    sections: [
      {
        title: 'Cookies necesare',
        body: 'Acestea pastreaza preferinta ta de consimtamant si ajuta formularele sau navigarea sa functioneze corect.',
      },
      {
        title: 'Cookies functionale',
        body: 'Cu acordul tau, putem salva preferinte de interactiune pentru a face experienta mai consistenta la vizitele urmatoare.',
      },
      {
        title: 'Controlul tau',
        body: 'Poti accepta toate cookies sau poti ramane doar la cele necesare. Preferinta se salveaza in browser si poate fi resetata oricand.',
      },
      {
        title: 'Transparenta',
        body: 'Daca vom adauga instrumente externe de analiza sau marketing, vom actualiza aceasta politica si iti vom cere acordul corespunzator.',
      },
    ],
  },
  terms: {
    icon: FileText,
    eyebrow: 'Conditii de colaborare',
    title: 'Termeni si conditii',
    description:
      'Acesti termeni stabilesc cadrul general pentru cereri, discutii comerciale si colaborari digitale initiate prin site.',
    sections: [
      {
        title: 'Trimiterea cererii',
        body: 'Prin trimiterea formularului confirmi ca informatiile oferite sunt corecte si ca putem folosi datele pentru a te contacta in legatura cu proiectul.',
      },
      {
        title: 'Oferte si estimari',
        body: 'Orice estimare initiala este orientativa pana cand stabilim clar scopul, functionalitatile, continutul, termenele si responsabilitatile fiecarei parti.',
      },
      {
        title: 'Inceperea proiectului',
        body: 'Colaborarea incepe dupa confirmarea ofertei, stabilirea etapelor de lucru si, unde este cazul, plata avansului agreat.',
      },
      {
        title: 'Drepturi si materiale',
        body: 'Clientul este responsabil pentru materialele trimise, iar drepturile finale asupra livrabilelor se transfera conform intelegerii comerciale stabilite.',
      },
    ],
  },
} satisfies Record<
  LegalModalType,
  {
    icon: typeof ShieldCheck;
    eyebrow: string;
    title: string;
    description: string;
    sections: Array<{ title: string; body: string }>;
  }
>;

function saveCookieChoice(choice: CookieChoice) {
  localStorage.setItem(
    COOKIE_CONSENT_KEY,
    JSON.stringify({
      choice,
      acceptedAt: new Date().toISOString(),
    }),
  );
}

export default function LegalModals() {
  const [activeModal, setActiveModal] = useState<LegalModalType | null>(null);
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    setShowCookieConsent(!localStorage.getItem(COOKIE_CONSENT_KEY));

    const handleOpenLegalModal = (event: Event) => {
      const detail = (event as CustomEvent<LegalModalType>).detail;
      if (detail === 'privacy' || detail === 'cookies' || detail === 'terms') {
        setActiveModal(detail);
      }
    };

    window.addEventListener(LEGAL_MODAL_EVENT, handleOpenLegalModal);
    return () => window.removeEventListener(LEGAL_MODAL_EVENT, handleOpenLegalModal);
  }, []);

  const activeCopy = useMemo(() => (activeModal ? modalCopy[activeModal] : null), [activeModal]);

  const acceptCookies = (choice: CookieChoice) => {
    saveCookieChoice(choice);
    setShowCookieConsent(false);
    setActiveModal(null);
  };

  const resetCookieChoice = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setActiveModal(null);
    setShowCookieConsent(true);
  };

  return (
    <>
      {showCookieConsent && !activeModal && (
        <div className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-white/12 bg-[#0b0f14]/95 shadow-[0_24px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Cookie className="h-5 w-5 text-[#f59f45]" />
                </div>
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                    Confidentialitate
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
                    Folosim cookies pentru o experienta mai buna
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
                    Poti accepta toate cookies sau doar cele necesare. Preferinta se salveaza local in browser si poate
                    fi modificata din politica de cookies.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModal('cookies')}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/75 transition hover:border-white/25 hover:text-white"
                >
                  Vezi politica
                </button>
                <button
                  type="button"
                  onClick={() => acceptCookies('necessary')}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/75 transition hover:border-white/25 hover:text-white"
                >
                  Doar necesare
                </button>
                <button
                  type="button"
                  onClick={() => acceptCookies('all')}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                >
                  Accept toate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeCopy && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label="Inchide politica"
            className="absolute inset-0 bg-black/72 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          />

          <section className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/12 bg-[#0a0d11]/96 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#003eac]/30 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-[#f59f45]/10 blur-[80px]" />

            <div className="relative flex max-h-[90vh] flex-col">
              <div className="flex items-start justify-between gap-5 border-b border-white/10 p-5 sm:p-7">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <activeCopy.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                      {activeCopy.eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                      {activeCopy.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">{activeCopy.description}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-white/25 hover:text-white"
                  aria-label="Inchide"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-y-auto p-5 sm:p-7">
                <div className="grid gap-3">
                  {activeCopy.sections.map((section) => (
                    <article
                      key={section.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-3">
                {activeModal === 'privacy' || activeModal === 'terms' ? (
                          <FileText className="h-4 w-4 text-white/55" />
                        ) : (
                          <SlidersHorizontal className="h-4 w-4 text-white/55" />
                        )}
                        <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/55">{section.body}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[#f59f45]/20 bg-[#f59f45]/[0.06] p-4 text-sm leading-6 text-white/62">
                  Pentru solicitari legate de date personale sau preferinte, foloseste formularul de contact de pe
                  site. Iti raspundem cat mai rapid si tratam fiecare cerere cu seriozitate.
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                {activeModal === 'cookies' ? (
                  <button
                    type="button"
                    onClick={resetCookieChoice}
                    className="text-left text-sm font-medium text-white/55 transition hover:text-white"
                  >
                    Reseteaza preferinta cookies
                  </button>
                ) : (
                  <span className="text-sm text-white/45">Ultima actualizare: Iunie 2026</span>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                  {activeModal === 'cookies' && (
                    <>
                      <button
                        type="button"
                        onClick={() => acceptCookies('necessary')}
                        className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/75 transition hover:border-white/25 hover:text-white"
                      >
                        Doar necesare
                      </button>
                      <button
                        type="button"
                        onClick={() => acceptCookies('all')}
                        className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                      >
                        Accept toate
                      </button>
                    </>
                  )}
                  {(activeModal === 'privacy' || activeModal === 'terms') && (
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Am inteles
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

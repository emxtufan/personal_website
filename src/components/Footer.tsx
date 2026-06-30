import { useState, type FormEvent } from 'react';
import { Check, Mail, Send, Terminal } from 'lucide-react';
import { addContactSubmission } from '../contact-submissions';
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../seo-config';

type LegalModalType = 'privacy' | 'cookies' | 'terms';

const LEGAL_MODAL_EVENT = 'codexa-open-legal-modal';

const footerLinks: Array<{
  title: string;
  links: Array<{ name: string; href?: string; modal?: LegalModalType }>;
}> = [
  {
    title: 'Servicii',
    links: [
      { name: 'Landing Page-uri', href: '/procese/landing-page-uri' },
      { name: 'Magazine Online Custom', href: '/procese/magazine-online-custom' },
      { name: 'Shopify Custom', href: '/procese/shopify-custom' },
      { name: 'Automatizari si Tool-uri', href: '/procese/programe-si-automatizari' },
      { name: 'Mentenanta 24/7', href: '/procese/administrare-si-mentenanta' },
    ],
  },
  {
    title: 'Resurse',
    links: [
      { name: 'Proiecte', href: '#projects' },
      { name: 'Cum decurge procesul', href: '#process' },
      { name: 'Preturi', href: '#pricing' },
      { name: 'Intrebari frecvente', href: '#faq' },
    ],
  },
  {
    title: 'Agentie',
    links: [
      { name: 'De ce noi', href: '#why-choose' },
      { name: 'Tehnologii folosite', href: '#logos' },
      { name: 'Contact proiect', href: '#cta' },
      { name: 'Newsletter', href: '#footer' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Politica de confidentialitate', modal: 'privacy' },
      { name: 'Termeni si conditii', modal: 'terms' },
      { name: 'Politica de cookies', modal: 'cookies' },
      { name: 'Contact GDPR', href: '#cta' },
    ],
  },
];

function openLegalModal(modal: LegalModalType) {
  window.dispatchEvent(new CustomEvent(LEGAL_MODAL_EVENT, { detail: modal }));
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event: FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setIsSubmitting(true);

    try {
      await addContactSubmission({
        name: 'Abonare newsletter',
        email: cleanEmail,
        phone: '-',
        need: 'Utilizatorul s-a abonat la newsletter din footer.',
      });

      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="relative overflow-hidden pb-12 pt-20">
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-white/[0.01] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <a
              id="footer-logo"
              href="#hero"
              className="group flex items-center gap-2.5 font-sans text-xl font-bold tracking-tight text-white"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded border border-white/20 bg-white/5 shadow-sm transition-colors duration-300 group-hover:border-white/50">
                <Terminal className="h-4 w-4 text-white" />
              </div>
              <span className="tracking-tighter">
                Esa Coder<span className="text-zinc-500"> Solutions</span>
              </span>
            </a>

            <p className="max-w-sm text-sm font-light leading-relaxed text-zinc-400">
              Dezvoltam site-uri de prezentare, magazine online rapide, platforme custom si automatizari pentru
              businessuri care vor design premium si cod curat.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-7">
            <div>
              <h4 className="mb-1 flex items-center gap-2 font-sans text-sm font-semibold text-white">
                <Mail className="h-4 w-4 text-white" />
                Ramai la curent cu noutatile
              </h4>
              <p className="text-xs font-light text-zinc-500">
                Aboneaza-te pentru idei despre conversii, design, magazine online si optimizare tehnica.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex max-w-md flex-col items-stretch gap-3 sm:flex-row">
              <input
                id="footer-email-input"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Adresa ta de e-mail"
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white transition-all duration-300 placeholder-zinc-500 focus:border-white/30 focus:outline-none"
              />
              <button
                id="footer-subscribe-btn"
                type="submit"
                disabled={isSubmitting}
                className={`flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all disabled:cursor-not-allowed disabled:opacity-70 ${
                  subscribed
                    ? 'border border-emerald-900/50 bg-emerald-950/40 text-emerald-400'
                    : 'bg-white text-black hover:bg-neutral-200 hover:shadow-lg'
                }`}
              >
                {subscribed ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Te-ai abonat!</span>
                  </>
                ) : isSubmitting ? (
                  <span>Se trimite...</span>
                ) : (
                  <>
                    <span>Aboneaza-te</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-4">
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">{group.title}</h5>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.name}`}>
                    {link.modal ? (
                      <button
                        type="button"
                        onClick={() => openLegalModal(link.modal as LegalModalType)}
                        className="text-left text-sm font-light text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm font-light text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-xs text-zinc-500 md:flex-row">
          <div>(c) {new Date().getFullYear()} Esa Coder Solutions. Toate drepturile rezervate.</div>
          <div className="flex items-center gap-6">
            <a href={`tel:${CONTACT_PHONE}`} className="transition-colors hover:text-white">
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a href="#footer" className="transition-colors hover:text-white">
              Facebook
            </a>
            <a href="#footer" className="transition-colors hover:text-white">
              Instagram
            </a>
            <span>Server Status: 100%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

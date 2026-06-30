import { ArrowUpRight, Menu, Terminal, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'Servicii', href: '#features' },
  { name: 'Proiecte', href: '#projects' },
  { name: 'Proces', href: '#process' },
  { name: 'Preturi', href: '#pricing' },
  { name: 'Contact', href: '#cta' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      id="navbar-header"
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#0a0d11]/82 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]" />

      <div className="mx-auto flex h-[72px] w-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a
          href="#hero"
          onClick={closeMenu}
          className="group flex min-w-0 items-center gap-3"
          aria-label="Esa Coder Solutions"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/12 bg-white/[0.035] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 group-hover:border-white/28">
            <Terminal className="h-4.5 w-4.5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[14px] font-semibold uppercase tracking-[0.22em] text-white">ESA</span>
            <span className="mt-1 hidden text-[11px] font-medium uppercase tracking-[0.18em] text-white/38 sm:block">
              Coder Solutions
            </span>
          </span>
        </a>

        <nav
          aria-label="Navigatie principala"
          className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.025] px-2 py-2 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-white/58 transition duration-200 hover:bg-white/[0.06] hover:text-white lg:text-[14px]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            className="hidden h-10 items-center justify-center gap-2 border border-white/12 bg-white px-4 text-[13px] font-semibold text-black transition duration-200 hover:bg-neutral-200 sm:inline-flex"
          >
            Incepe proiectul
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.035] text-white/80 transition hover:border-white/24 hover:text-white md:hidden"
            aria-label={isOpen ? 'Inchide meniul' : 'Deschide meniul'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/[0.08] bg-[#0a0d11]/96 px-4 pb-5 pt-3 backdrop-blur-2xl md:hidden">
          <nav aria-label="Navigatie mobila" className="mx-auto flex max-w-[1500px] flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-[14px] font-medium text-white/72 transition hover:border-white/20 hover:text-white"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#cta"
              onClick={closeMenu}
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 bg-white px-4 text-[13px] font-semibold text-black transition hover:bg-neutral-200"
            >
              Incepe proiectul
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

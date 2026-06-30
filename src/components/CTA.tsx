import { CheckCircle2, Mail, MessageSquareText, Phone, Send, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { addContactSubmission } from '../contact-submissions';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  need: '',
};

type LegalModalType = 'privacy' | 'terms';

const LEGAL_MODAL_EVENT = 'codexa-open-legal-modal';

function openLegalModal(modal: LegalModalType) {
  window.dispatchEvent(new CustomEvent(LEGAL_MODAL_EVENT, { detail: modal }));
}

export default function CTA() {
  const [form, setForm] = useState(initialForm);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      need: form.need.trim(),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.need) {
      setError('Completeaza toate campurile ca sa putem reveni cu o oferta corecta.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addContactSubmission(payload);
      setForm(initialForm);
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.01] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass glow group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl sm:p-10 md:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-white/[0.01] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
                <MessageSquareText className="h-3 w-3 text-white" />
                <span>Cerere proiect</span>
              </div>

              <h2 className="mb-5 max-w-[11ch] font-sans text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Spune-ne ce vrei sa construim.
              </h2>

              <p className="max-w-md text-sm font-light leading-relaxed text-zinc-400 sm:text-base">
                Lasa datele si cateva detalii despre proiect. Iar noi te .
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white/42">
                    <User className="h-3.5 w-3.5" />
                    Nume
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    placeholder="Numele tau"
                    className="h-12 border border-white/10 bg-black/20 px-4 text-[14px] text-white outline-none transition-colors placeholder:text-white/22 focus:border-[#70ead5]/50"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white/42">
                    <Phone className="h-3.5 w-3.5" />
                    Telefon
                  </span>
                  <input
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    placeholder="+40..."
                    inputMode="tel"
                    className="h-12 border border-white/10 bg-black/20 px-4 text-[14px] text-white outline-none transition-colors placeholder:text-white/22 focus:border-[#70ead5]/50"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white/42">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </span>
                <input
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="email@exemplu.ro"
                  type="email"
                  className="h-12 border border-white/10 bg-black/20 px-4 text-[14px] text-white outline-none transition-colors placeholder:text-white/22 focus:border-[#70ead5]/50"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white/42">
                  <MessageSquareText className="h-3.5 w-3.5" />
                  Ce ai nevoie?
                </span>
                <textarea
                  value={form.need}
                  onChange={(event) => updateField('need', event.target.value)}
                  placeholder="Site, magazin online, Shopify, automatizare, aplicatie custom..."
                  rows={5}
                  className="resize-none border border-white/10 bg-black/20 px-4 py-3 text-[14px] leading-6 text-white outline-none transition-colors placeholder:text-white/22 focus:border-[#70ead5]/50"
                />
              </label>

              {error && <p className="text-[13px] text-[#ff8f70]">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 bg-white px-5 text-[14px] font-semibold text-black transition-colors duration-200 hover:bg-neutral-200 sm:w-fit"
              >
                {isSubmitting ? 'Se trimite...' : 'Trimite cererea'}
                <Send className="h-4 w-4" />
              </button>

              <p className="max-w-xl text-[11px] leading-5 text-white/38">
                Prin trimiterea cererii confirmi ca ai citit si accepti{' '}
                <button
                  type="button"
                  onClick={() => openLegalModal('terms')}
                  className="font-medium text-white/62 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/60"
                >
                  Termenii si conditiile
                </button>{' '}
                si{' '}
                <button
                  type="button"
                  onClick={() => openLegalModal('privacy')}
                  className="font-medium text-white/62 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/60"
                >
                  Politica de confidentialitate
                </button>
                .
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-md border border-white/10 bg-[#0d1015] p-6 text-center shadow-2xl"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#70ead5]/30 bg-[#70ead5]/10 text-[#70ead5]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-[22px] font-semibold tracking-tight text-white">Cererea a fost trimisa.</h3>
            <p className="mt-3 text-[14px] leading-6 text-white/56">
              Multumim. Te contactam in cel mai scurt timp pe email sau telefon.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="h-11 w-full border border-white/10 bg-white/[0.03] text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-white/20 hover:text-white"
              >
                Inchide
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

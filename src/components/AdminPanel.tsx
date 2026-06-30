import { ArrowLeft, CheckCircle2, Copy, Download, Inbox, Mail, Phone, Trash2, User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  CONTACT_SUBMISSIONS_EVENT,
  CONTACT_SUBMISSIONS_STORAGE_KEY,
  clearContactSubmissions,
  deleteContactSubmission,
  getContactSubmissions,
  markContactSubmissionRead,
  type ContactSubmission,
} from '../contact-submissions';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ro-RO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function downloadJson(submissions: ContactSubmission[]) {
  const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `codexa-contact-submissions-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [copied, setCopied] = useState(false);

  const refresh = async () => setSubmissions(await getContactSubmissions());

  useEffect(() => {
    void refresh();

    const onStorage = (event: StorageEvent) => {
      if (event.key === CONTACT_SUBMISSIONS_STORAGE_KEY) void refresh();
    };

    const onUpdated = () => {
      void refresh();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(CONTACT_SUBMISSIONS_EVENT, onUpdated);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(CONTACT_SUBMISSIONS_EVENT, onUpdated);
    };
  }, []);

  const unreadCount = useMemo(() => {
    return submissions.filter((submission) => submission.status === 'new').length;
  }, [submissions]);

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(submissions, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleMarkRead = async (id: string) => {
    await markContactSubmissionRead(id);
    await refresh();
  };

  const handleDelete = async (id: string) => {
    await deleteContactSubmission(id);
    await refresh();
  };

  const handleClear = async () => {
    await clearContactSubmissions();
    await refresh();
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-6 pb-20 pt-28">
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-6 inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-4 py-2 text-[13px] uppercase tracking-[0.18em] text-white/60 transition-colors duration-200 hover:border-white/20 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              inapoi la site
            </button>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#70ead5]" />
              <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-[#70ead5]">
                ADMIN LOCAL
              </span>
            </div>

            <h1 className="mt-4 max-w-[12ch] text-[42px] font-normal leading-[0.98] tracking-[-0.04em] text-white sm:text-[56px]">
              Cereri primite
            </h1>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-7 text-white/48">
              Datele sunt salvate local in browser, in format JSON, prin `localStorage`. Panoul citeste aceeasi lista
              folosita de formularul din CTA.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
            <div className="border border-white/10 bg-white/[0.025] px-4 py-3">
              <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/28">total</span>
              <span className="mt-1 block text-[24px] text-white">{submissions.length}</span>
            </div>
            <div className="border border-white/10 bg-white/[0.025] px-4 py-3">
              <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-white/28">noi</span>
              <span className="mt-1 block text-[24px] text-[#70ead5]">{unreadCount}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => downloadJson(submissions)}
            className="inline-flex h-11 items-center justify-center gap-2 border border-white/10 bg-white/[0.03] px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/62 transition-colors hover:border-white/20 hover:text-white"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <button
            type="button"
            onClick={copyJson}
            className="inline-flex h-11 items-center justify-center gap-2 border border-white/10 bg-white/[0.03] px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/62 transition-colors hover:border-white/20 hover:text-white"
          >
            <Copy className="h-4 w-4" />
            {copied ? 'Copiat' : 'Copiaza JSON'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!submissions.length}
            className="inline-flex h-11 items-center justify-center gap-2 border border-white/10 bg-white/[0.03] px-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/42 transition-colors hover:border-[#ff8f70]/30 hover:text-[#ff8f70] disabled:pointer-events-none disabled:opacity-35"
          >
            <Trash2 className="h-4 w-4" />
            Sterge tot
          </button>
        </div>

        {submissions.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center border border-white/10 bg-white/[0.018] p-8 text-center">
            <Inbox className="h-10 w-10 text-white/22" />
            <h2 className="mt-5 text-[24px] font-normal tracking-tight text-white/78">Nu exista cereri inca.</h2>
            <p className="mt-2 max-w-md text-[14px] leading-6 text-white/42">
              Cand cineva trimite formularul din CTA, notificarea apare aici automat.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {submissions.map((submission) => (
              <article
                key={submission.id}
                className="relative overflow-hidden border border-white/10 bg-white/[0.018] p-5 sm:p-6"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.012),transparent_26%,transparent_74%,rgba(255,255,255,0.012))]" />
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={[
                            'w-fit border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]',
                            submission.status === 'new'
                              ? 'border-[#70ead5]/30 bg-[#70ead5]/10 text-[#70ead5]'
                              : 'border-white/10 bg-white/[0.03] text-white/38',
                          ].join(' ')}
                        >
                          {submission.status === 'new' ? 'nou' : 'citit'}
                        </span>
                        <span className="font-mono text-[12px] text-white/28">{formatDate(submission.createdAt)}</span>
                      </div>

                      <h2 className="mt-4 text-[26px] font-normal tracking-[-0.03em] text-white">
                        {submission.name}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {submission.status === 'new' && (
                        <button
                          type="button"
                          onClick={() => handleMarkRead(submission.id)}
                          className="inline-flex h-10 items-center gap-2 border border-white/10 bg-white/[0.03] px-3 text-[12px] uppercase tracking-[0.14em] text-white/58 transition-colors hover:border-[#70ead5]/30 hover:text-[#70ead5]"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          citit
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(submission.id)}
                        className="inline-flex h-10 items-center gap-2 border border-white/10 bg-white/[0.03] px-3 text-[12px] uppercase tracking-[0.14em] text-white/42 transition-colors hover:border-[#ff8f70]/30 hover:text-[#ff8f70]"
                      >
                        <Trash2 className="h-4 w-4" />
                        sterge
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="flex items-center gap-3 border border-white/8 bg-black/15 px-4 py-3">
                      <Mail className="h-4 w-4 text-white/34" />
                      <span className="min-w-0 truncate text-[14px] text-white/62">{submission.email}</span>
                    </div>
                    <div className="flex items-center gap-3 border border-white/8 bg-black/15 px-4 py-3">
                      <Phone className="h-4 w-4 text-white/34" />
                      <span className="min-w-0 truncate text-[14px] text-white/62">{submission.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 border border-white/8 bg-black/15 px-4 py-3">
                      <User className="h-4 w-4 text-white/34" />
                      <span className="min-w-0 truncate text-[14px] text-white/62">{submission.id}</span>
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap border border-white/8 bg-black/15 p-4 text-[15px] leading-7 text-white/58">
                    {submission.need}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

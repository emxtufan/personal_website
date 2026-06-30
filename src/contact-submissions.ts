export type ContactSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  need: string;
  status: 'new' | 'read';
};

export type ContactSubmissionInput = {
  name: string;
  email: string;
  phone: string;
  need: string;
};

export const CONTACT_SUBMISSIONS_STORAGE_KEY = 'codexa_contact_submissions_v1';
export const CONTACT_SUBMISSIONS_EVENT = 'codexa-contact-submissions-updated';
const CONTACT_SUBMISSIONS_API = '/api/contact-submissions';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function notifyUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(CONTACT_SUBMISSIONS_EVENT));
}

function normalizeSubmissions(value: unknown): ContactSubmission[] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is ContactSubmission => {
    return (
      item &&
      typeof item.id === 'string' &&
      typeof item.createdAt === 'string' &&
      typeof item.name === 'string' &&
      typeof item.email === 'string' &&
      typeof item.phone === 'string' &&
      typeof item.need === 'string'
    );
  });
}

function getLocalContactSubmissions(): ContactSubmission[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(CONTACT_SUBMISSIONS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return normalizeSubmissions(parsed);
  } catch {
    return [];
  }
}

function setLocalContactSubmissions(submissions: ContactSubmission[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CONTACT_SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions, null, 2));
  notifyUpdated();
}

async function readApiSubmissions() {
  const response = await fetch(CONTACT_SUBMISSIONS_API, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('Contact submissions API unavailable.');
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) throw new Error('Contact submissions API unavailable.');

  return normalizeSubmissions(await response.json());
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const submissions = await readApiSubmissions();
    setLocalContactSubmissions(submissions);
    return submissions;
  } catch {
    return getLocalContactSubmissions();
  }
}

export async function addContactSubmission(input: ContactSubmissionInput) {
  const submission: ContactSubmission = {
    id: createId(),
    createdAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    phone: input.phone,
    need: input.need,
    status: 'new',
  };

  try {
    const response = await fetch(CONTACT_SUBMISSIONS_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) throw new Error('Contact submissions API unavailable.');

    const saved = (await response.json()) as ContactSubmission;
    setLocalContactSubmissions(await readApiSubmissions());
    notifyUpdated();
    return saved;
  } catch {
    setLocalContactSubmissions([submission, ...getLocalContactSubmissions()]);
    return submission;
  }
}

export async function markContactSubmissionRead(id: string) {
  try {
    const response = await fetch(`${CONTACT_SUBMISSIONS_API}/${id}/read`, {
      method: 'PATCH',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Contact submissions API unavailable.');
    const submissions = normalizeSubmissions(await response.json());
    setLocalContactSubmissions(submissions);
  } catch {
    setLocalContactSubmissions(
      getLocalContactSubmissions().map((submission) =>
        submission.id === id ? { ...submission, status: 'read' } : submission,
      ),
    );
  }
}

export async function deleteContactSubmission(id: string) {
  try {
    const response = await fetch(`${CONTACT_SUBMISSIONS_API}/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Contact submissions API unavailable.');
    const submissions = normalizeSubmissions(await response.json());
    setLocalContactSubmissions(submissions);
  } catch {
    setLocalContactSubmissions(getLocalContactSubmissions().filter((submission) => submission.id !== id));
  }
}

export async function clearContactSubmissions() {
  try {
    const response = await fetch(CONTACT_SUBMISSIONS_API, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Contact submissions API unavailable.');
  } catch {
    // Fall through to local clear so dev mode without the Express server still works.
  }

  setLocalContactSubmissions([]);
}

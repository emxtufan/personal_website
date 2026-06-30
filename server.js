import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 4173);

const distDir = path.join(__dirname, 'dist');
const dataDir = path.join(__dirname, 'data');
const submissionsPath = path.join(dataDir, 'contact-submissions.json');

app.use(express.json({ limit: '1mb' }));

app.use((request, response, next) => {
  if (request.path.startsWith('/admin') || request.path.startsWith('/api/')) {
    response.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }

  next();
});

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(submissionsPath);
  } catch {
    await fs.writeFile(submissionsPath, '[]\n', 'utf8');
  }
}

async function readSubmissions() {
  await ensureDataFile();

  try {
    const raw = await fs.readFile(submissionsPath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeSubmissions(submissions) {
  await ensureDataFile();
  await fs.writeFile(submissionsPath, `${JSON.stringify(submissions, null, 2)}\n`, 'utf8');
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

app.get('/api/contact-submissions', async (_request, response) => {
  response.json(await readSubmissions());
});

app.post('/api/contact-submissions', async (request, response) => {
  const payload = {
    name: cleanText(request.body?.name),
    email: cleanText(request.body?.email),
    phone: cleanText(request.body?.phone),
    need: cleanText(request.body?.need),
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.need) {
    response.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const submission = {
    id: createId(),
    createdAt: new Date().toISOString(),
    ...payload,
    status: 'new',
  };

  const submissions = await readSubmissions();
  await writeSubmissions([submission, ...submissions]);
  response.status(201).json(submission);
});

app.patch('/api/contact-submissions/:id/read', async (request, response) => {
  const submissions = await readSubmissions();
  const updated = submissions.map((submission) =>
    submission.id === request.params.id ? { ...submission, status: 'read' } : submission,
  );

  await writeSubmissions(updated);
  response.json(updated);
});

app.delete('/api/contact-submissions/:id', async (request, response) => {
  const submissions = await readSubmissions();
  const updated = submissions.filter((submission) => submission.id !== request.params.id);

  await writeSubmissions(updated);
  response.json(updated);
});

app.delete('/api/contact-submissions', async (_request, response) => {
  await writeSubmissions([]);
  response.json([]);
});

app.use(
  express.static(distDir, {
    setHeaders(response, filePath) {
      if (filePath.endsWith('index.html')) {
        response.setHeader('Cache-Control', 'no-cache');
        return;
      }

      if (/\.(?:js|css|png|jpe?g|webp|avif|svg|webm|mp4|woff2?)$/i.test(filePath)) {
        response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }),
);

app.get('*', (_request, response) => {
  response.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Codexa local server running at http://localhost:${port}`);
  console.log(`Admin panel: http://localhost:${port}/admin`);
});

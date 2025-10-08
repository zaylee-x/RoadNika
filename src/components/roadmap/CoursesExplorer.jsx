'use client';

import { useMemo, useState } from 'react';

const ALL = [
  { role: 'uiux', provider: 'Figma', level: 'Beginner', title: 'Figma Learn – Starter', url: 'https://www.figma.com/resource-library/', tags: ['free','self-paced','12–20h'] },
  { role: 'uiux', provider: 'NN/g', level: 'All', title: 'UX Research & Heuristics Collection', url: 'https://www.nngroup.com/topics/', tags: ['free','self-paced','flexible'] },
  { role: 'uiux', provider: 'IDF', level: 'Beginner–Senior', title: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/', tags: ['paid','self-paced','subscription'] },

  { role: 'fe', provider: 'MDN', level: 'Beginner', title: 'Web Docs – HTML/CSS/JS', url: 'https://developer.mozilla.org/en-US/docs/Learn', tags: ['free','self-paced'] },
  { role: 'fe', provider: 'React', level: 'Beginner', title: 'React – Learn', url: 'https://react.dev/learn', tags: ['free','self-paced'] },

  { role: 'da', provider: 'Kaggle', level: 'Beginner', title: 'Kaggle Courses', url: 'https://www.kaggle.com/learn', tags: ['free','self-paced'] },
  { role: 'da', provider: 'Mode', level: 'Beginner', title: 'SQL Tutorial', url: 'https://mode.com/sql-tutorial/', tags: ['free','self-paced'] },

  { role: 'be', provider: 'PostgreSQL', level: 'Beginner', title: 'Postgres Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html', tags: ['free','self-paced'] },
  { role: 'be', provider: 'Node.js', level: 'Beginner', title: 'Node.js Docs – Guide', url: 'https://nodejs.org/en/learn', tags: ['free','self-paced'] },
];

function normalizeRole(r) {
  const s = (r || '').toLowerCase();
  if (s.includes('ui') || s.includes('ux')) return 'uiux';
  if (s.includes('front')) return 'fe';
  if (s.includes('data')) return 'da';
  if (s.includes('back')) return 'be';
  return 'uiux';
}

export default function CoursesExplorer({ role }) {
  const active = normalizeRole(role);
  const [price, setPrice] = useState('all');
  const [format, setFormat] = useState('all');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(true);

  const items = useMemo(() => {
    let base = ALL.filter(i => i.role === active);
    if (price !== 'all') base = base.filter(i => i.tags.includes(price));
    if (format !== 'all') base = base.filter(i => i.tags.includes(format));
    if (q.trim()) {
      const s = q.toLowerCase();
      base = base.filter(i =>
        i.title.toLowerCase().includes(s) ||
        i.provider.toLowerCase().includes(s)
      );
    }
    if (open) base = base.filter(i => i.tags.includes('free'));
    return base;
  }, [active, price, format, q, open]);

  return (
    <section className="space-y-6">
      <div className="card">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/15">
              {active === 'uiux' ? 'UI/UX' : active === 'fe' ? 'Frontend' : active === 'da' ? 'Data Analyst' : 'Backend'}
            </span>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <select value={price} onChange={e=>setPrice(e.target.value)} className="input">
              <option value="all">Harga (semua)</option>
              <option value="free">Gratis</option>
              <option value="paid">Berbayar</option>
              <option value="subscription">Langganan</option>
            </select>
            <select value={format} onChange={e=>setFormat(e.target.value)} className="input">
              <option value="all">Format (semua)</option>
              <option value="self-paced">Self-paced</option>
              <option value="bootcamp">Bootcamp</option>
            </select>
            <div className="flex gap-2 items-center">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari topik / provider…" className="input" />
              <label className="flex items-center gap-2 text-sm text-white/80">
                <input type="checkbox" checked={open} onChange={e=>setOpen(e.target.checked)} />
                Open-source/gratis
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((c, i) => (
          <div key={i} className="card">
            <div className="text-[12px] text-white/60">{c.provider} • {c.level}</div>
            <div className="mt-1 font-semibold">{c.title}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.tags.map((t, j) => (
                <span key={j} className="rounded-full bg-white/10 px-2 py-1 text-[11px] ring-1 ring-white/15">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-primary">Buka</a>
              <button className="btn-ghost">Simpan</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

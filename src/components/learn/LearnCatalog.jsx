'use client';
import { useMemo, useState } from 'react';
import Reveal from '@/components/Reveal';

const RESOURCES = [
  {
    id: 'html-begin',
    title: 'HTML Semantik untuk Pemula',
    provider: 'MDN',
    url: 'https://developer.mozilla.org/',
    category: 'Frontend',
    level: 'Pemula',
    format: 'Artikel',
    durationHours: 1.5,
    desc: 'Struktur dokumen yang benar + aksesibilitas.',
  },
  {
    id: 'css-layout',
    title: 'CSS Layout: Flexbox & Grid',
    provider: 'Web.dev',
    url: 'https://web.dev/learn/css/',
    category: 'Frontend',
    level: 'Pemula',
    format: 'Artikel',
    durationHours: 3,
    desc: 'Cara menyusun layout modern dengan contoh.',
  },
  {
    id: 'git-basic',
    title: 'Git Dasar: init, commit, push',
    provider: 'Codecademy',
    url: 'https://www.codecademy.com/',
    category: 'Tools',
    level: 'Pemula',
    format: 'Course',
    durationHours: 2,
    desc: 'Alur kerja Git yang rapi untuk kolaborasi.',
  },
  {
    id: 'react-intro',
    title: 'Intro React + Hooks',
    provider: 'React.dev',
    url: 'https://react.dev/learn',
    category: 'Frontend',
    level: 'Menengah',
    format: 'Artikel',
    durationHours: 4,
    desc: 'Pemahaman state, props, dan composability.',
  },
  {
    id: 'figma-fund',
    title: 'Figma Fundamentals',
    provider: 'Figma',
    url: 'https://help.figma.com/',
    category: 'UI/UX',
    level: 'Pemula',
    format: 'Artikel',
    durationHours: 2,
    desc: 'Dasar desain UI di Figma + auto layout.',
  },
  {
    id: 'sql-intro',
    title: 'SQL Introduction',
    provider: 'Khan Academy',
    url: 'https://www.khanacademy.org/',
    category: 'Data',
    level: 'Pemula',
    format: 'Video',
    durationHours: 3,
    desc: 'Query dasar untuk mengolah data.',
  },
  {
    id: 'testing-web',
    title: 'Web Testing 101',
    provider: 'Testing Library',
    url: 'https://testing-library.com/docs/',
    category: 'QA',
    level: 'Menengah',
    format: 'Artikel',
    durationHours: 2,
    desc: 'Konsep test yang berorientasi pada user.',
  },
];

const CATEGORIES = ['Semua', 'Frontend', 'UI/UX', 'QA', 'Data', 'Tools'];
const LEVELS = ['Semua', 'Pemula', 'Menengah'];
const FORMATS = ['Semua', 'Video', 'Artikel', 'Course'];
const DURATIONS = ['Semua', '<2 jam', '2–6 jam', '>6 jam'];

export default function LearnCatalog() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Semua');
  const [lvl, setLvl] = useState('Semua');
  const [fmt, setFmt] = useState('Semua');
  const [dur, setDur] = useState('Semua');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      if (cat !== 'Semua' && r.category !== cat) return false;
      if (lvl !== 'Semua' && r.level !== lvl) return false;
      if (fmt !== 'Semua' && r.format !== fmt) return false;
      if (dur !== 'Semua') {
        if (dur === '<2 jam' && !(r.durationHours < 2)) return false;
        if (dur === '2–6 jam' && !(r.durationHours >= 2 && r.durationHours <= 6)) return false;
        if (dur === '>6 jam' && !(r.durationHours > 6)) return false;
      }
      if (!term) return true;
      return (
        r.title.toLowerCase().includes(term) ||
        r.desc.toLowerCase().includes(term) ||
        r.provider.toLowerCase().includes(term) ||
        r.category.toLowerCase().includes(term)
      );
    }).sort((a, b) => a.durationHours - b.durationHours);
  }, [q, cat, lvl, fmt, dur]);

  return (
    <section id="katalog" className="px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="card rounded-2xl p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <input
                className="input md:flex-1"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari topik/teknologi (React, Git, SQL...)"
              />
              <div className="flex flex-wrap gap-2">
                <Select value={cat} setValue={setCat} options={CATEGORIES} />
                <Select value={lvl} setValue={setLvl} options={LEVELS} />
                <Select value={fmt} setValue={setFmt} options={FORMATS} />
                <Select value={dur} setValue={setDur} options={DURATIONS} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="card group rounded-2xl p-5 hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-ink dark:text-white leading-tight">
                    {r.title}
                  </h3>
                  <span className="text-[11px] rounded-full px-2 py-0.5 border border-black/10 dark:border-white/15 text-muted dark:text-white/70">
                    {r.level}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted dark:text-white/70">{r.desc}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
                  <Badge>{r.category}</Badge>
                  <Badge>{r.format}</Badge>
                  <Badge>{`${r.durationHours} jam`}</Badge>
                  <span className="ml-auto text-muted dark:text-white/60">{r.provider}</span>
                </div>

                <div className="mt-4">
                  <span className="btn-ghost text-sm group-hover:bg-white/15">Mulai</span>
                </div>
              </a>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center text-muted dark:text-white/70 py-10">
                Tidak ada yang cocok. Coba kata kunci/ filter lain.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Select({ value, setValue, options }) {
  return (
    <select
      className="input px-3 py-2 text-sm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-black/10 dark:border-white/15 px-2 py-0.5 text-muted dark:text-white/70">
      {children}
    </span>
  );
}

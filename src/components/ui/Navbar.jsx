'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

const LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/learn',   label: 'Belajar' },
];

function applyTheme(theme) {
  const r = document.documentElement;
  if (theme === 'light') {
    r.style.setProperty('--bg',     '#fbf7ef');
    r.style.setProperty('--ink',    '#111827');
    r.style.setProperty('--muted',  '#4b5563');
    r.style.setProperty('--navbar', 'rgba(255,255,255,.9)');
    r.style.setProperty('--footer', 'rgba(0,0,0,.06)');
  } else {
    r.style.setProperty('--bg',     '#0b0c1b');
    r.style.setProperty('--ink',    '#e6eaf2');
    r.style.setProperty('--muted',  '#a5b1c2');
    r.style.setProperty('--navbar', 'rgba(18,16,32,.75)');
    r.style.setProperty('--footer', 'rgba(10,12,28,.6)');
  }
  r.style.colorScheme = theme;
}

export default function Navbar(){
  const pathname = usePathname();
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem('theme', next);
  }, [isDark]);

  const shell =
    'w-full rounded-full px-3 py-2 border backdrop-blur-md ' +
    (isDark
      ? 'bg-navbar border-white/10 shadow-[0_0_24px_rgba(162,89,255,.35),0_0_48px_rgba(0,255,255,.22)]'
      : 'bg-white/80 border-black/10 shadow-[0_4px_20px_rgba(0,0,0,.06)]');

  const linkBase =
    'group relative px-4 py-2 rounded-full text-sm font-semibold transition';
  const linkIdle = isDark
    ? 'text-white/80 hover:bg-white/10'
    : 'text-black/70 hover:bg-black/5';
  const linkActive = isDark
    ? 'text-white bg-white/10'
    : 'text-black bg-black/5';

  const toggleBtn =
    'ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 transition ' +
    (isDark
      ? 'ring-white/15 bg-white/10 text-white/90 hover:bg-white/15 hover:-translate-y-[1px]'
      : 'ring-black/10 bg-black/5 text-black/80 hover:bg-black/10 hover:-translate-y-[1px]');

  const brandText = isDark ? 'text-white' : 'text-black';

  const ctaBtn =
    'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition hover:-translate-y-[1px] ' +
    (isDark ? 'text-white' : 'text-black');

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className={shell}>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="pl-2 font-extrabold tracking-tight transition hover:opacity-90" aria-label="RoadNika">
                <span className={`grad-text text-lg md:text-xl ${brandText}`}>RoadNika</span>
              </Link>
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark/light"
                aria-pressed={isDark ? 'true' : 'false'}
                className={toggleBtn}
                title="Dark / Light"
              >
                {isDark ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM3 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm18 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5.6 6.6a1 1 0 1 0-1.2-1.6 1 1 0 0 0 1.2 1.6Zm14 12a1 1 0 1 0-1.2-1.6 1 1 0 0 0 1.2 1.6ZM4.4 19.4a1 1 0 1 0 1.2-1.6 1 1 0 0 0-1.2 1.6Zm14-12a1 1 0 1 0 1.2-1.6 1 1 0 0 0-1.2 1.6Z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
                  </svg>
                )}
              </button>
            </div>

            <nav className="justify-self-center flex items-center gap-1">
              {LINKS.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`${linkBase} ${active ? linkActive : linkIdle}`}
                  >
                    <span>{l.label}</span>
                    <span
                      className="pointer-events-none absolute inset-x-3 -bottom-1 h-px opacity-0 group-hover:opacity-100 transition"
                      style={{
                        background: isDark
                          ? 'linear-gradient(90deg,#00ffff66,#a259ff66)'
                          : 'linear-gradient(90deg,#0ea5e966,#8b5cf666)',
                      }}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="justify-self-end pr-2">
              <Link
                href="/profile"
                className={ctaBtn}
                style={{ background: 'linear-gradient(90deg,#00ffff,#a259ff)' }}
              >
                Mulai
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

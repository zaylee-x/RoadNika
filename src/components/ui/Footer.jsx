'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 font-semibold">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              RoadNika
            </Link>
            <div className="mt-4 flex items-center gap-3">
              <IconButton
                href="mailto:arunika.pi25@gmail.com"
                label="Email"
              >
                <GmailIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com/official.arunika_"
                label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://www.tiktok.com/official.arunika_"
                label="TikTok"
              >
                <TiktokIcon />
              </IconButton>
            </div>
          </div>

          <div className="md:col-span-2 grid gap-8 sm:grid-cols-2">
            <div>
              <div className="text-sm font-semibold mb-3">Menu</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/roadmap" className="hover:underline">Roadmap</Link></li>
                <li><Link href="/learn" className="hover:underline">Belajar</Link></li>
                <li>
                  <Link
                    href="https://arunika-six.vercel.app/about-us.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Tentang
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Legal</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-3 border-t border-black/10 dark:border-white/10 pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} RoadNika — Built with ❤️</p>
          <div className="flex items-center gap-4">
            <span className="opacity-50">Ikuti kami</span>
            <div className="flex items-center gap-2">
              <IconButton href="mailto:arunika.pi25@gmail.com" label="Email"><GmailIcon /></IconButton>
              <IconButton href="https://instagram.com/official.arunika_" label="Instagram"><InstagramIcon /></IconButton>
              <IconButton href="https://www.tiktok.com/official.arunika_" label="TikTok"><TiktokIcon /></IconButton>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function IconButton({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      title={label}
      className="inline-grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-black
                 transition hover:-translate-y-0.5 hover:shadow-md
                 dark:border-white/10 dark:bg-white/10 dark:text-white"
    >
      {children}
    </a>
  );
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.236-8 5.333-8-5.333V6l8 5.333L20 6v2.236Z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 15.8 2.8 2.8 0 0 0 12 9.2ZM17.5 6.5a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2Z"/>
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M14 3h2.1a5.9 5.9 0 0 0 4 3.7V9a8.1 8.1 0 0 1-4.1-1.2V14a6 6 0 1 1-6-6c.33 0 .66.03.98.09V10.2A3.8 3.8 0 1 0 12 17.8V3Z"/>
    </svg>
  );
}

'use client';
import Reveal from '@/components/Reveal';

export default function RoadmapPreview() {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center text-ink dark:text-white text-2xl md:text-3xl font-bold">
         Roadmap
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-center text-muted dark:text-white/70 mt-2">
            Alur singkat tahapan minggu pertama realistis untuk pemula.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:auto-rows-fr items-stretch">
          <Reveal delay={120}>
            <div className="card h-full rounded-2xl p-6 md:p-7">
              <h3 className="font-semibold text-ink dark:text-white">Tahapan Utama</h3>
              <ol className="mt-5 space-y-6">
                <RoadStep no={1} title="Fundamental" desc="HTML, CSS, dasar JavaScript." />
                <RoadStep no={2} title="Git & Deploy" desc="Workflow Git, deploy sederhana." />
                <RoadStep no={3} title="Projects" desc="1–2 proyek portfolio terarah." />
                <RoadStep no={4} title="Interview Prep" desc="CV, GitHub, mock interview." last />
              </ol>
              <div className="mt-6 rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm text-muted dark:text-white/70">
                <b className="text-ink dark:text-white">Output akhir:</b> repo publik, 1 landing page, 1 mini-app,
                dan resume yang rapi. Siap kirim lamaran.
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="card h-full rounded-2xl p-6 md:p-7">
              <h3 className="font-semibold text-ink dark:text-white">Contoh Rencana Minggu 1</h3>
              <ul className="mt-4 space-y-3">
                <CheckItem>HTML Semantik & struktur halaman</CheckItem>
                <CheckItem>Layout modern (Flexbox, Grid)</CheckItem>
                <CheckItem>Komponen UI kecil (button, card)</CheckItem>
                <CheckItem>Git init → commit → push → repo publik</CheckItem>
                <CheckItem>Deploy cepat (Vercel/Netlify) satu halaman</CheckItem>
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
                <MiniStat label="Target jam" value="6–8" />
                <MiniStat label="Checkpoint" value="1 deploy" />
                <MiniStat label="Review" value="Code review singkat" />
              </div>

              <div className="mt-6 rounded-xl bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4">
                <p className="text-[13px] text-muted dark:text-white/70">
                  <b className="text-ink dark:text-white">Hasil minggu ini:</b> kamu sudah punya halaman
                  yang online + repo GitHub rapi. Modal kuat untuk lanjut ke komponen & state.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RoadStep({ no, title, desc, last = false }) {
  return (
    <li className="grid grid-cols-[28px,1fr] gap-4">
      <div className="relative flex items-start justify-center">
        <span className="z-10 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-[11px] font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,.25)] transition-transform duration-200 hover:scale-[1.05]">
          {no}
        </span>
        {!last && <span className="absolute top-7 left-1/2 -translate-x-1/2 h-12 w-[2px] bg-black/10 dark:bg-white/15" />}
      </div>
      <div>
        <div className="font-medium text-ink dark:text-white">{title}</div>
        <div className="text-sm text-muted dark:text-white/60">{desc}</div>
      </div>
    </li>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 grid h-4 w-4 place-items-center rounded-[6px] border border-black/10 dark:border-white/20">
        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
          <path d="M7.7 13.3 4.9 10.6l-1.3 1.3 4.1 4.1 8.7-8.7-1.3-1.3-7.4 7.3Z" />
        </svg>
      </span>
      <span className="text-sm text-ink dark:text-white">{children}</span>
    </li>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted dark:text-white/60">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-ink dark:text-white">{value}</div>
    </div>
  );
}

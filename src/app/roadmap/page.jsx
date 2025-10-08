'use client';

import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/Reveal';
import ResetRoadmapButton from '@/components/ResetRoadmapButton';
import { useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/15 bg-white/5 text-white/90">
      {children}
    </span>
  );
}

function TimelineItem({ index, title, desc }) {
  return (
    <div className="relative pl-10">
      <span className="absolute left-0 top-0 grid size-7 place-items-center rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-[11px] font-bold shadow-[0_8px_20px_rgba(0,0,0,.25)]">
        {index}
      </span>
      <div className="font-semibold">{title}</div>
      <div className="mt-0.5 text-sm text-white/70">{desc}</div>
      <span className="absolute left-[13px] top-7 h-[54px] w-[2px] bg-white/15" />
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <span className="mt-[2px] grid size-4 place-items-center rounded-[6px] bg-white/10 ring-1 ring-white/15 text-[10px]">✓</span>
      <span className="text-white/85">{children}</span>
    </li>
  );
}

export default function RoadmapLanding() {
  const roadmap = useAppStore((s) => s.roadmap);
  const hasRoadmap = useMemo(() => Boolean(roadmap), [roadmap]);

  return (
    <>
      <Navbar />
      <main className="px-4 pt-[108px] pb-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <section className="relative overflow-hidden">
            <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-cyan-400/20 via-fuchsia-500/15 to-transparent blur-2xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-[0_24px_60px_rgba(0,0,0,.35)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Roadmap</h1>
                  <p className="mt-2 max-w-2xl text-white/75">Ringkasan tahapan dan contoh rencana minggu pertama. Mulai dari Profil untuk membuat roadmap sesuai role dan level.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>Personalized</Badge>
                    <Badge>Checklist Mingguan</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {!hasRoadmap && <Link href="/profile" className="btn-primary">Mulai dari Profil</Link>}
                  {hasRoadmap && (
                    <>
                      <Link href="/roadmap/my" className="btn-primary">Lihat Roadmapku</Link>
                      <ResetRoadmapButton />
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="card">
                <div className="mb-4 text-sm text-white/70">Tahapan</div>
                <div className="space-y-6">
                  <TimelineItem index={1} title="Fundamental" desc="HTML, CSS, dasar JavaScript." />
                  <TimelineItem index={2} title="Git & Deploy" desc="Workflow Git, deploy sederhana." />
                  <TimelineItem index={3} title="Projects" desc="1–2 proyek portofolio terarah." />
                  <div className="relative pl-10">
                    <span className="absolute left-0 top-0 grid size-7 place-items-center rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-[11px] font-bold">4</span>
                    <div className="font-semibold">Interview Prep</div>
                    <div className="mt-0.5 text-sm text-white/70">CV, GitHub, mock interview.</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="card">
                <div className="mb-4 text-sm text-white/70">Contoh Rencana Minggu 1</div>
                <ul className="space-y-2">
                  <CheckItem>HTML Semantik dan struktur halaman.</CheckItem>
                  <CheckItem>Layouting modern (Flexbox, Grid).</CheckItem>
                  <CheckItem>Komponen UI kecil.</CheckItem>
                  <CheckItem>Git init, commit, push, repo publik.</CheckItem>
                  <CheckItem>Deploy cepat satu halaman.</CheckItem>
                </ul>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/5 px-3 py-3 ring-1 ring-white/15">
                    <div className="text-[11px] text-white/60">TARGET JAM</div>
                    <div className="text-center font-semibold">6–8</div>
                  </div>
                  <div className="rounded-xl bg-white/5 px-3 py-3 ring-1 ring-white/15">
                    <div className="text-[11px] text-white/60">CHECKPOINT</div>
                    <div className="text-center font-semibold">1 deploy</div>
                  </div>
                  <div className="rounded-xl bg-white/5 px-3 py-3 ring-1 ring-white/15">
                    <div className="text-[11px] text-white/60">REVIEW</div>
                    <div className="text-center font-semibold">Code review singkat</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="relative overflow-hidden">
            <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-cyan-400/15 via-fuchsia-500/10 to-transparent blur-2xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-10 md:px-12 shadow-[0_24px_60px_rgba(0,0,0,.35)] text-center">
              <Reveal>
                <h3 className="text-2xl md:text-3xl font-bold">Siap menyusun roadmap pertamamu?</h3>
                <p className="mx-auto mt-2 max-w-2xl text-white/75">Profiling skill dan tujuan, lalu dapatkan langkah mingguan otomatis.</p>
                <div className="mt-6 flex justify-center gap-3">
                  {!hasRoadmap ? (
                    <Link href="/profile" className="btn-primary">Buat dari Profil</Link>
                  ) : (
                    <>
                      <Link href="/roadmap/my" className="btn-primary">Buka Roadmapku</Link>
                      <ResetRoadmapButton />
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function RoadmapHero() {
  const wrapRef = useRef(null);
  const bgRef = useRef(null);

  // scroll parallax — aura lembut bergerak pelan saat di-scroll
  useEffect(() => {
    const el = bgRef.current;
    const onScroll = () => {
      if (!el) return;
      const y = window.scrollY || 0;
      el.style.transform = `translate3d(0, ${Math.round(y * 0.04)}px, 0)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // mouse parallax — orb mengikuti kursor halus
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const targets = wrap.querySelectorAll('[data-move]');
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      targets.forEach((el) => {
        const mv = parseFloat(el.getAttribute('data-move') || '6');
        el.style.transform = `translate(${(-cx * mv).toFixed(1)}px, ${(-cy * mv).toFixed(1)}px)`;
      });
    };
    wrap.addEventListener('mousemove', onMove);
    return () => wrap.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={wrapRef} className="relative px-4">
      {/* aura parallax */}
      <div className="absolute inset-0 -z-10">
        <div
          ref={bgRef}
          className="mx-auto max-w-6xl h-[230px] md:h-[260px] mt-6 rounded-[36px]"
          style={{
            background:
              'radial-gradient(600px 220px at 10% 10%, rgba(0,255,255,.18), transparent 60%), radial-gradient(600px 220px at 90% 10%, rgba(162,89,255,.16), transparent 60%)',
            filter: 'saturate(120%) blur(0.2px)',
          }}
          aria-hidden
        />
      </div>

      <div className="mx-auto max-w-6xl relative">
        <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-cyan-400/20 via-fuchsia-500/15 to-transparent blur-2xl" />
        <div className="card rounded-[28px] relative p-8 md:p-14 overflow-hidden">
          {/* orbs */}
          <div
            data-move="8"
            className="pointer-events-none absolute left-6 -top-8 h-24 w-24 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(closest-side, rgba(0,255,255,.22), transparent 70%)' }}
            aria-hidden
          />
          <div
            data-move="6"
            className="pointer-events-none absolute right-8 top-6 h-20 w-20 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(closest-side, rgba(162,89,255,.2), transparent 70%)' }}
            aria-hidden
          />

          <div className="text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-3 py-1 text-xs text-muted dark:text-white/70">
              Ukur • Susun • Tumbuh
            </p>

            <h1 className="mt-3 text-ink dark:text-white font-extrabold tracking-tight leading-[1.06] text-[clamp(1.9rem,4.8vw,3rem)]">
              Roadmap yang Bikin Kamu Maju Setiap Minggu
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-muted dark:text-white/75 text-sm md:text-base">
              Tentukan peran, lihat gap, lalu ikuti langkah mingguan yang jelas—hingga jadi
              portofolio dan siap apply kerja.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/profile" className="btn-primary">Buat Roadmap Gratis</Link>
              <Link href="/learn" className="btn-ghost">Lihat Materi</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

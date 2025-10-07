'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function RevealLoop({ children, delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const t = setTimeout(() => setOn(true), delay);
        return () => clearTimeout(t);
      }
      setOn(false);
    }, { threshold:.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal" data-inview={on ? 'true' : 'false'}>{children}</div>;
}

export default function Hero() {
  const wrapRef = useRef(null);
  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return;
    const targets = wrap.querySelectorAll('[data-move]');
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      targets.forEach(el => {
        const m = parseFloat(el.getAttribute('data-move') || '6');
        el.style.transform = `translate(${(-cx*m).toFixed(1)}px, ${(-cy*m).toFixed(1)}px)`;
      });
    };
    wrap.addEventListener('mousemove', onMove);
    return () => wrap.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={wrapRef} className="relative px-4 pt-[120px] md:pt-[140px] pb-16 md:pb-24 mb-12 md:mb-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-cyan-400/20 via-fuchsia-500/15 to-transparent blur-2xl" />
          {/* pakai .card adaptif */}
          <div className="card rounded-[28px] p-8 md:p-14">
            <div data-move="8" className="pointer-events-none absolute left-8 -top-6 h-28 w-28 rounded-full blur-2xl" style={{background:'radial-gradient(closest-side, rgba(0,255,255,.22), transparent 70%)'}} />
            <div data-move="6" className="pointer-events-none absolute right-10 top-10 h-20 w-20 rounded-full blur-2xl" style={{background:'radial-gradient(closest-side, rgba(162,89,255,.2), transparent 70%)'}} />

            {/* teks adaptif */}
            <div className="text-center text-ink dark:text-white">
              <RevealLoop>
                <h1 className="font-extrabold tracking-tight leading-[1.06] text-[clamp(1.9rem,4.5vw,3rem)]">
                  <span className="block">Ukur Skillmu</span>
                  <span className="block mt-1">dan</span>
                </h1>
              </RevealLoop>

              <RevealLoop delay={90}>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <Pill>Petakan</Pill>
                  <Pill large>jalur karier</Pill>
                </div>
              </RevealLoop>

              <RevealLoop delay={160}>
                <p className="mx-auto mt-5 max-w-2xl text-[15px] md:text-base text-muted dark:text-white/75">
                  RoadNika bantu kamu menilai level kemampuan, melihat gap, dan menyusun roadmap belajar yang jelas. Hingga siap melamar pekerjaan pertama.
                </p>
              </RevealLoop>

              <RevealLoop delay={220}>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/profile" className="btn-primary">Mulai Ukur Skill</Link>
                  {/* <Link href="/roadmap" className="btn-ghost">Lihat Roadmap Contoh</Link> */}
                </div>
              </RevealLoop>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ children, large=false }) {
  return (
    <span
      className={[
        'inline-block rounded-full font-extrabold text-black/90 dark:text-black/90',
        large ? 'px-5 py-1.5 text-[clamp(1.25rem,3.4vw,2rem)]'
              : 'px-4 py-1   text-[clamp(1rem,2.8vw,1.4rem)]',
        'ring-1 ring-white/40 shadow-[0_10px_24px_rgba(0,255,255,.14),0_10px_24px_rgba(162,89,255,.14)]'
      ].join(' ')}
      style={{ background:'linear-gradient(90deg,#00F5FF 0%, #A259FF 100%)' }}
    >
      {children}
    </span>
  );
}

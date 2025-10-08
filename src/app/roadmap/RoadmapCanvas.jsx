'use client';
import { useRef, useState, useEffect, useMemo } from 'react';

export default function RoadmapCanvas({ data }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const ds = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((s) => clamp(s + ds, 0.5, 2));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e) => {
    const isRight = e.button === 2;
    if (isRight || e.buttons === 1) {
      setDrag({ x: e.clientX, y: e.clientY, sx: pos.x, sy: pos.y });
    }
  };
  const onPointerMove = (e) => {
    if (!drag) return;
    setPos({ x: drag.sx + (e.clientX - drag.x), y: drag.sy + (e.clientY - drag.y) });
  };
  const onPointerUp = () => setDrag(null);

  const fit = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const weeks = data?.weeks || [];
  const gaps  = data?.gaps  || [];
  const resources = data?.resources || [];

  // id progress
  const key = useMemo(() => {
    const p = data?.profile || {};
    return `rd-progress::${(p.role||'').toLowerCase()}::${weeks.length}`;
  }, [data, weeks.length]);

  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; }
  });

  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(done)); } catch{} }, [key, done]);
  const toggle = (wIdx, tIdx) => setDone((d) => ({ ...d, [`${wIdx}-${tIdx}`]: !d[`${wIdx}-${tIdx}`] }));

  return (
    <div className="relative">
      <div className="absolute right-3 -top-14 z-10 flex gap-2">
        <button onClick={() => setScale(s=>clamp(s+0.1,0.5,2))} className="rounded-full px-3 py-2 bg-white/10 ring-1 ring-white/15">+</button>
        <button onClick={() => setScale(s=>clamp(s-0.1,0.5,2))} className="rounded-full px-3 py-2 bg-white/10 ring-1 ring-white/15">−</button>
        <button onClick={fit} className="rounded-full px-3 py-2 bg-white/10 ring-1 ring-white/15">Fit</button>
      </div>

      {/* Panel info kiri */}
      <div className="mb-6 grid gap-6 md:grid-cols-[1fr,2fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="font-semibold">Gap Skill</div>
          {gaps.length ? (
            <ul className="mt-2 list-disc pl-5 text-white/80">
              {gaps.map((g, i) => <li key={i}>{g}</li>)}
            </ul>
          ) : <div className="mt-2 text-white/70">Tidak ada gap kritikal—lanjut konsolidasi portofolio.</div>}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="font-semibold">Referensi Belajar</div>
          {resources.length ? (
            <ul className="mt-2 grid gap-2 md:grid-cols-2">
              {resources.map((r, i) => (
                <li key={i} className="rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2">
                  <a href={r.url} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                    {r.title}
                  </a>
                  <div className="text-xs text-white/60">{r.provider} • {r.level} • ~{r.minutes}m</div>
                </li>
              ))}
            </ul>
          ) : <div className="mt-2 text-white/70">Belajar dari proyek langsung & dokumentasi resmi.</div>}
        </div>
      </div>

      {/* Kanvas */}
      <div
        ref={wrapRef}
        className="relative h-[520px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onContextMenu={(e)=>e.preventDefault()}
      >
        <div
          className="absolute top-1/2 left-1/2 origin-top-left"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale}) translate(-50%, -50%)`,
          }}
        >
          <div className="flex gap-6">
            {weeks.map((w, wi) => (
              <div key={wi} className="w-[320px] rounded-2xl bg-white/8 ring-1 ring-white/15 p-4">
                <div className="text-xs text-white/60">Minggu {w.week}</div>
                <div className="font-semibold">{w.theme}</div>
                <div className="mt-2 grid gap-2">
                  {(w.tasks || []).map((t, ti) => (
                    <label key={ti} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-1 accent-cyan-400"
                        checked={Boolean(done[`${wi}-${ti}`])}
                        onChange={() => toggle(wi, ti)}
                      />
                      <span className="text-white/85">{t}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3 text-xs text-white/60">Target jam: {w.hours || 6}/minggu</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-white/60 text-sm">Tip: scroll untuk zoom, drag (klik kiri/kanan) untuk pan, pakai tombol Fit untuk kembali.</p>
    </div>
  );
}

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

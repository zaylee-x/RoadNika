'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

function usePersist(key, initial) {
  const [state, setState] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} }, [key, state]);
  return [state, setState];
}

// 0: to-learn, 1: learning, 2: done
const COLORS = {
  0: 'bg-white/10 ring-white/15',
  1: 'bg-yellow-400/20 ring-yellow-300/30 text-yellow-100',
  2: 'bg-emerald-500/25 ring-emerald-400/30 text-emerald-100'
};

function ItemPill({ id, status = 0, onCycle, onPick }) {
  return (
    <div className={`flex items-center justify-between rounded-xl px-3 py-2 ring-1 cursor-default ${COLORS[status]}`}>
      <button onClick={onPick} className="text-left text-sm flex-1 pr-2 hover:underline">{id}</button>
      <button aria-label="change status"
        onClick={onCycle}
        className="rounded-full text-xs px-2 py-1 bg-black/20 ring-1 ring-white/10 hover:bg-black/30">
        {status===2?'Done':status===1?'Learning':'To-learn'}
      </button>
    </div>
  );
}

function Card({ title, items, progress, setProgress, onPick }) {
  const cycle = (id) => {
    setProgress(p => ({ ...p, [id]: ((p[id] ?? 0) + 1) % 3 }));
  };
  return (
    <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,.25)] w-[320px]">
      <div className="px-5 py-3 font-semibold">{title}</div>
      <div className="px-4 pb-4 space-y-2">
        {items.map(id => (
          <ItemPill key={id} id={id} status={progress[id] ?? 0}
            onCycle={() => cycle(id)} onPick={() => onPick?.(id)} />
        ))}
      </div>
    </div>
  );
}

export default function RoadmapMindmap({ profile, onPickTopic }) {
  const role = (profile?.role || '').toLowerCase();
  const key = `rm_mind_${role}`;

  const template = useMemo(() => ({
    root: 'UX/UI Fundamentals',
    nodes: [
      { x: -420, y: -220, title: 'Design Fundamentals', items: ['Understanding Users','Journaling','Design Process'] },
      { x: 430,  y: -220, title: 'User Centered Design', items: ['UX Learning Loop','UX Research','Insight Translation','Ongoing Evaluation'] },
      { x: -120, y: 140,  title: 'Design Thinking', items: ['Empathize','Define','Ideate','Prototype','Test'] },
      { x: 420,  y: 180,  title: 'UI Fundamentals', items: ['Visual Design Principles','Accessible Design','Designing Experiences','Mood Boards'] },
    ],
    solo: [
      { x: -540, y: -40, title: 'Double Diamond Process' },
      { x: -540, y: 40,  title: 'IDEO Process' },
    ],
  }), []);

  const [progress, setProgress] = usePersist(key, {});
  const wrapRef = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0, s: 1 });
  const drag = useRef({ on: false, x: 0, y: 0, sx: 0, sy: 0 });

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const onWheel = e => { e.preventDefault(); setT(v => ({ ...v, s: Math.min(2.2, Math.max(0.4, v.s * (e.deltaY>0?0.9:1.1))) })); };
    const onDown = e => { drag.current = { on:true, x:e.clientX, y:e.clientY, sx:t.x, sy:t.y }; };
    const onMove = e => { if (!drag.current.on) return; setT(v => ({ ...v, x: drag.current.sx + (e.clientX-drag.current.x), y: drag.current.sy + (e.clientY-drag.current.y) })); };
    const onUp = () => { drag.current.on = false; };
    el.addEventListener('wheel', onWheel, { passive:false });
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { el.removeEventListener('wheel', onWheel); el.removeEventListener('mousedown', onDown); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [t.x, t.y, t.s]);

  const counts = useMemo(() => {
    const all = template.nodes.flatMap(n => n.items);
    let d=0,l=0,todo=0;
    all.forEach(id => {
      const s = progress[id] ?? 0;
      if (s===2) d++; else if (s===1) l++; else todo++;
    });
    return { done:d, learning:l, todo, total: all.length };
  }, [progress, template]);

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,.35)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="font-semibold">{template.root}</div>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full px-2 py-0.5 ring-1 ring-white/15 bg-white/10">Done {counts.done}</span>
          <span className="rounded-full px-2 py-0.5 ring-1 ring-yellow-300/30 bg-yellow-400/10">Learning {counts.learning}</span>
          <span className="rounded-full px-2 py-0.5 ring-1 ring-white/15 bg-white/5">To-learn {counts.todo}</span>
          <span className="text-white/60">({counts.done}/{counts.total})</span>
        </div>
      </div>

      <div ref={wrapRef} className="relative h-[72vh] cursor-grab active:cursor-grabbing">
        <div className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%,-50%) translate(${t.x}px,${t.y}px) scale(${t.s})` }}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/70 text-sm ring-1 ring-white/10 bg-black/20 rounded-full px-4 py-1">{template.root}</div>

          {template.nodes.map((n, idx) => (
            <div key={idx} className="absolute" style={{ transform: `translate(${n.x}px, ${n.y}px)` }}>
              <Card title={n.title} items={n.items} progress={progress} setProgress={setProgress} onPick={onPickTopic}/>
            </div>
          ))}

          {template.solo.map((s, i) => (
            <div key={i} className="absolute" style={{ transform: `translate(${s.x}px, ${s.y}px)` }}>
              <div className="rounded-xl ring-1 ring-white/10 bg-white/5 px-4 py-2 text-sm">{s.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 bottom-4 flex gap-2">
        <button onClick={() => setT(v => ({ ...v, s: Math.min(2.2, v.s + 0.1) }))} className="rounded-full px-3 py-2 ring-1 ring-white/15 bg-white/10">＋</button>
        <button onClick={() => setT(v => ({ ...v, s: Math.max(0.4, v.s - 0.1) }))} className="rounded-full px-3 py-2 ring-1 ring-white/15 bg-white/10">－</button>
        <button onClick={() => setT({ x:0,y:0,s:1 })} className="rounded-full px-3 py-2 ring-1 ring-white/15 bg-white/10">Reset</button>
      </div>
    </section>
  );
}

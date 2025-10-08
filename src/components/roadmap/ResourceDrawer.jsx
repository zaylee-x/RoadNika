'use client';

import { useEffect, useState } from 'react';

export default function ResourceDrawer({ open, onClose, topic, role }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if (!open || !topic) return;
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const q = new URLSearchParams({ topic, role: role || '' }).toString();
        const res = await fetch(`/api/resources?${q}`);
        const j = await res.json();
        if (alive) setItems(Array.isArray(j?.items) ? j.items : []);
      } catch { if (alive) setItems([]); }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, [open, topic, role]);

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-[420px] max-w-[90vw] transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full bg-[#0b0c1b] text-white border-l border-white/10 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 h-12 border-b border-white/10">
          <div className="font-semibold">Saran Belajar</div>
          <button onClick={onClose} className="rounded-full px-3 py-1 bg-white/10">Tutup</button>
        </div>
        <div className="p-4 space-y-3 overflow-auto">
          <div className="text-sm text-white/70">Topik: <span className="font-semibold">{topic || '-'}</span></div>
          {loading && <div className="text-white/70">Memuat…</div>}
          {!loading && items.length===0 && <div className="text-white/70">Belum ada rekomendasi.</div>}
          {items.map((x, i)=>(
            <a key={i} href={x.url} target="_blank" rel="noreferrer"
               className="block rounded-xl p-4 ring-1 ring-white/10 bg-white/5 hover:bg-white/10">
              <div className="text-sm text-white/70">{x.provider} • {x.level || 'All'}</div>
              <div className="font-semibold">{x.title}</div>
              {x.minutes ? <div className="text-xs text-white/60 mt-1">{x.minutes} menit</div> : null}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

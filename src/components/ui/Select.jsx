'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Select({
  options = [],
  value = '',
  onChange = () => {},
  placeholder = 'Pilih',
  searchable = true,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return options;
    const s = q.toLowerCase();
    return options.filter((o) => String(o).toLowerCase().includes(s));
  }, [q, options]);

  const pick = (v) => {
    onChange(v);
    setQ('');
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-left hover:bg-white/[.07] outline-none focus:ring-2 focus:ring-cyan-400/40"
      >
        {value || <span className="text-white/50">{placeholder}</span>}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/15 bg-[#0f1020] shadow-[0_18px_40px_rgba(0,0,0,.35)]">
          {searchable && (
            <div className="p-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari…"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
              />
            </div>
          )}
          <ul className="max-h-64 overflow-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-white/60">Tidak ada opsi</li>
            )}
            {filtered.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => pick(opt)}
                  className="w-full text-left px-3 py-2 hover:bg-white/5"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

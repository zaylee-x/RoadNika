'use client';
import { useRef, useState } from 'react';

export default function TagsInput({
  value = [],
  onChange = () => {},
  placeholder = 'Ketik skill lalu Enter',
  suggestions = [],
}) {
  const [input, setInput] = useState('');
  const ref = useRef(null);

  const add = (raw) => {
    const v = String(raw || '').trim();
    if (!v) return;
    const next = Array.from(new Set([...value, v]));
    onChange(next);
    setInput('');
  };

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(input);
    } else if (e.key === 'Backspace' && !input && value.length) {
      const next = value.slice(0, -1);
      onChange(next);
    }
  };

  const remove = (tag) => onChange(value.filter((t) => t !== tag));

  const restSugs = suggestions.filter(
    (s) => !value.some((v) => v.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="rounded-xl bg-white/5 border border-white/15 px-3 py-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="grid place-items-center h-4 w-4 rounded-full bg-white/20 hover:bg-white/30"
              aria-label="hapus"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={ref}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          onBlur={() => add(input)}
          placeholder={placeholder}
          className="min-w-[120px] flex-1 bg-transparent outline-none px-1 py-1"
        />
      </div>

      {restSugs.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {restSugs.slice(0, 12).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="text-xs rounded-full border border-white/15 hover:border-white/25 px-2 py-1 text-white/80 hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

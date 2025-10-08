'use client';

import { useEffect, useMemo, useState } from 'react';

function fmtDateTime(d) {
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function googleCalUrl(week, profile) {
  const baseMonday = new Date();
  const dow = baseMonday.getDay();
  const daysUntilMon = (8 - dow) % 7;
  baseMonday.setHours(9, 0, 0, 0);
  baseMonday.setDate(baseMonday.getDate() + daysUntilMon + 7 * ((week.week || 1) - 1));

  const start = new Date(baseMonday);
  const end = new Date(start);
  end.setHours(end.getHours() + Math.max(week.hours || 6, 1));

  const text = encodeURIComponent(`Roadmap ${profile?.role || ''} – Minggu ${week.week}: ${week.theme || ''}`);
  const details = encodeURIComponent((week.tasks || []).join('\n'));
  const dates = `${fmtDateTime(start)}/${fmtDateTime(end)}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&dates=${dates}`;
}

export default function RoadmapWeeks({ weeks = [], profile }) {
  const storageKey = useMemo(() => `rm-progress-${profile?.name || 'anon'}`, [profile?.name]);
  const [checks, setChecks] = useState({});
  const [notes, setNotes] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setChecks(parsed.checks || {});
        setNotes(parsed.notes || {});
      }
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ checks, notes }));
    } catch {}
  }, [checks, notes, storageKey]);

  const totalTasks = useMemo(
    () => weeks.reduce((acc, w) => acc + ((w.tasks || []).length), 0),
    [weeks]
  );
  const doneTasks = useMemo(
    () =>
      weeks.reduce(
        (acc, w) =>
          acc + (w.tasks || []).reduce((a, _, i) => a + (checks?.[`${w.week}-${i}`] ? 1 : 0), 0),
        0
      ),
    [weeks, checks]
  );

  return (
    <section className="space-y-6">
      <div className="card flex flex-wrap items-center justify-between gap-3">
        <div className="font-semibold text-white/80">
          Checklist Mingguan
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">{doneTasks}/{totalTasks} selesai</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {weeks.map((w, wi) => (
          <div key={wi} className="card">
            <div className="mb-1 text-sm text-white/70">Minggu {w.week}</div>
            <div className="text-lg font-semibold">{w.theme}</div>
            <div className="mt-1 text-[12px] text-white/60">Target jam: {w.hours || 6}</div>

            <ul className="mt-3 space-y-2">
              {(w.tasks || []).map((t, ti) => {
                const key = `${w.week}-${ti}`;
                return (
                  <li key={ti} className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(checks[key])}
                      onChange={(e) => setChecks((c) => ({ ...c, [key]: e.target.checked }))}
                      className="mt-[3px]"
                    />
                    <span className="text-white/85">{t}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4">
              <div className="text-sm text-white/70 mb-1">Catatan / Refleksi</div>
              <textarea
                value={notes[w.week] || ''}
                onChange={(e) => setNotes((n) => ({ ...n, [w.week]: e.target.value }))}
                rows={3}
                className="textarea"
                placeholder="Apa yang sudah dipelajari? Hambatan? Rencana minggu depan?"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={googleCalUrl(w, profile)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Tambah ke Google Calendar
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

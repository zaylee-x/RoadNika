'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

const ProfileSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  role: z.string().min(2, 'Role tidak valid'),
  level: z.enum(['Beginner', 'Junior', 'Mid', 'Senior']),
  skills: z
    .string()
    .optional()
    .transform((s) => (s || '').split(',').map((x) => x.trim()).filter(Boolean)),
});

export default function ProfilePage() {
  const router = useRouter();
  const setProfile = useAppStore((s) => s.setProfile);
  const setRoadmap = useAppStore((s) => s.setRoadmap);

  const [form, setForm] = useState({
    name: '',
    role: 'Frontend',
    level: 'Beginner',
    skills: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    let parsed;
    try {
      parsed = ProfileSchema.parse(form);
    } catch (zerr) {
      const msg = zerr?.issues?.[0]?.message || 'Form belum lengkap.';
      setErr(msg);
      return;
    }

    setLoading(true);
    try {
      setProfile({
        name: parsed.name,
        role: parsed.role,
        level: parsed.level,
        skills: parsed.skills,
      });

      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: parsed.name,
          role: parsed.role,
          level: parsed.level,
          skills: parsed.skills,
        }),
      });

      let payload = {};
      try {
        payload = await res.json();
      } catch {
      }

      if (!res.ok) {
        throw new Error(payload?.error || `Gagal terhubung ke server (status ${res.status}).`);
      }

      const roadmapData = payload?.data || payload;
      setRoadmap(roadmapData);

      router.push('/roadmap');
    } catch (e) {
      setErr(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-[100px] px-4">
      <div className="mx-auto max-w-3xl card">
        <h1 className="text-2xl font-bold">Atur Profil & Skill</h1>
        <p className="text-muted mt-1">Isi data singkatmu.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Nama</label>
            <input
              value={form.name}
              onChange={onChange('name')}
              placeholder="Nama kamu"
              className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">Role</label>
              <input
                value={form.role}
                onChange={onChange('role')}
                placeholder="Frontend / UI UX / Data Analyst ..."
                className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Level</label>
              <select
                value={form.level}
                onChange={onChange('level')}
                className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2"
              >
                {['Beginner', 'Junior', 'Mid', 'Senior'].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Skill (pisah dengan koma)</label>
              <input
                value={form.skills}
                onChange={onChange('skills')}
                placeholder="HTML, CSS, JS / Figma, Wireframe"
                className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
              />
            </div>
          </div>

          {err ? <p className="text-rose-400 text-sm">{err}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Membuat roadmap…' : 'Buat Roadmap'}
          </button>
        </form>
      </div>
    </main>
  );
}

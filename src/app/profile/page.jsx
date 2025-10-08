'use client';

import { useState, useMemo } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useAppStore } from '@/store/useAppStore';

const ROLE_OPTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'UI/UX Designer',
  'Data Analyst',
];

const ROLE_SKILL_SUGGESTIONS = {
  'Frontend Developer': ['html', 'css', 'javascript', 'react', 'git', 'deploy'],
  'Backend Developer' : ['api', 'database', 'node', 'auth', 'git', 'deploy'],
  'UI/UX Designer'    : ['figma', 'wireframe', 'prototype', 'ui design', 'ux', 'heuristic'],
  'Data Analyst'      : ['sql', 'excel', 'python', 'statistics', 'viz', 'dashboard'],
};

const BaseSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  role: z.enum(ROLE_OPTIONS),
  level: z.enum(['Beginner', 'Junior', 'Mid', 'Senior']),
});

export default function ProfilePage() {
  const router = useRouter();
  const setProfile = useAppStore((s) => s.setProfile);
  const setRoadmap = useAppStore((s) => s.setRoadmap);

  const [basic, setBasic] = useState({
    name: '',
    role: 'Frontend Developer',
    level: 'Beginner',
  });

  const [skills, setSkills] = useState([{ name: '', level: 60 }]);
  const [certs, setCerts] = useState([{ name: '', issuer: '', link: '' }]);
  const [projects, setProjects] = useState([
    { title: '', role: '', link: '', summary: '', stack: '' },
  ]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const skillsFlat = useMemo(
    () => skills.map((s) => (s.name || '').toLowerCase().trim()).filter(Boolean),
    [skills]
  );

  const setB = (k) => (e) => setBasic((v) => ({ ...v, [k]: e.target.value }));

  const addSkill   = () => setSkills((v) => [...v, { name: '', level: 60 }]);
  const delSkill   = (i) => setSkills((v) => v.filter((_, idx) => idx !== i));
  const setSkill   = (i, k, val) => setSkills((v) => v.map((s, idx) => (idx === i ? { ...s, [k]: val } : s)));
  const addChip    = (chip) => {
    const c = String(chip).toLowerCase();
    if (skillsFlat.includes(c)) return;
    // isi slot kosong dulu, kalau tak ada tambahkan baris baru
    const emptyIdx = skills.findIndex((s) => !s.name.trim());
    if (emptyIdx >= 0) setSkill(emptyIdx, 'name', chip);
    else setSkills((v) => [...v, { name: chip, level: 60 }]);
  };

  const addCert    = () => setCerts((v) => [...v, { name: '', issuer: '', link: '' }]);
  const delCert    = (i) => setCerts((v) => v.filter((_, idx) => idx !== i));
  const setCert    = (i, k, val) => setCerts((v) => v.map((c, idx) => (idx === i ? { ...c, [k]: val } : c)));

  const addProject = () => setProjects((v) => [...v, { title: '', role: '', link: '', summary: '', stack: '' }]);
  const delProject = (i) => setProjects((v) => v.filter((_, idx) => idx !== i));
  const setProject = (i, k, val) => setProjects((v) => v.map((p, idx) => (idx === i ? { ...p, [k]: val } : p)));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      BaseSchema.parse(basic);
    } catch (zerr) {
      setErr(zerr?.issues?.[0]?.message || 'Form belum lengkap.');
      return;
    }

    const payload = {
      ...basic,
      skills: skillsFlat,
      skillsDetailed: skills,
      certifications: certs.filter((c) => c.name || c.issuer || c.link),
      projects: projects.filter((p) => p.title || p.summary || p.link || p.stack),
    };

    setLoading(true);
    try {
      setProfile(payload);

      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: basic.name,
          role: basic.role,
          level: basic.level,
          skills: skillsFlat,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || `Gagal membuat roadmap (status ${res.status})`);

      setRoadmap(data.data);
      router.push('/roadmap/my');
    } catch (e2) {
      setErr(e2?.message || String(e2));
    } finally {
      setLoading(false);
    }
  };

  const chips = ROLE_SKILL_SUGGESTIONS[basic.role] || [];

  return (
    <>
      <Navbar />
      <main className="px-4 pt-[108px] pb-20">
        <div className="mx-auto max-w-5xl space-y-10">
          <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold">Atur Profil & Skill</h1>
            <p className="text-white/70 mt-1">Isi data singkatmu—semua tersimpan di browser.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-8">
              {/* BASIC */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-3">
                  <label className="block text-sm mb-1">Nama</label>
                  <input
                    value={basic.name}
                    onChange={setB('name')}
                    placeholder="Nama kamu"
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Role</label>
                  <select
                    value={basic.role}
                    onChange={setB('role')}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">Level</label>
                  <select
                    value={basic.level}
                    onChange={setB('level')}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2"
                  >
                    {['Beginner','Junior','Mid','Senior'].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SKILLS */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Kemampuan</div>
                  <button type="button" onClick={addSkill} className="inline-flex items-center rounded-full px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/10">
                    Tambah Skill
                  </button>
                </div>

                {/* Chips per-role */}
                {chips.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {chips.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => addChip(c)}
                        className="rounded-full px-3 py-1 text-sm ring-1 ring-white/15 bg-white/5 hover:bg-white/10"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-3 grid gap-3">
                  {skills.map((s, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col md:flex-row md:items-center md:gap-4">
                      <input
                        value={s.name}
                        onChange={(e) => setSkill(i, 'name', e.target.value)}
                        placeholder="Nama skill (mis. HTML, SQL, Figma)"
                        className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40 md:flex-1"
                      />
                      <div className="flex items-center gap-3 mt-3 md:mt-0">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={s.level}
                          onChange={(e) => setSkill(i, 'level', Number(e.target.value))}
                        />
                        <span className="w-10 text-sm text-white/80 text-right">{s.level}</span>
                        <button
                          type="button"
                          onClick={() => delSkill(i)}
                          className="rounded-full px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATES */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Sertifikat</div>
                  <button type="button" onClick={addCert} className="inline-flex items-center rounded-full px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/10">
                    Tambah Sertifikat
                  </button>
                </div>
                <div className="mt-3 grid gap-3">
                  {certs.map((c, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 grid gap-3 md:grid-cols-[1.2fr,1fr,1fr,auto]">
                      <input
                        value={c.name}
                        onChange={(e) => setCert(i, 'name', e.target.value)}
                        placeholder="Nama sertifikat"
                        className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                      />
                      <input
                        value={c.issuer}
                        onChange={(e) => setCert(i, 'issuer', e.target.value)}
                        placeholder="Penyelenggara"
                        className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                      />
                      <input
                        value={c.link}
                        onChange={(e) => setCert(i, 'link', e.target.value)}
                        placeholder="URL"
                        className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                      />
                      <button
                        type="button"
                        onClick={() => delCert(i)}
                        className="rounded-full px-3 py-2 text-sm bg-white/10 hover:bg-white/15 h-10"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROJECTS */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Proyek</div>
                  <button type="button" onClick={addProject} className="inline-flex items-center rounded-full px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/10">
                    Tambah Proyek
                  </button>
                </div>
                <div className="mt-3 grid gap-4">
                  {projects.map((p, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          value={p.title}
                          onChange={(e) => setProject(i, 'title', e.target.value)}
                          placeholder="Judul proyek"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                        />
                        <input
                          value={p.role}
                          onChange={(e) => setProject(i, 'role', e.target.value)}
                          placeholder="Peran (mis. UI/UX, FE Dev)"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                        />
                        <input
                          value={p.link}
                          onChange={(e) => setProject(i, 'link', e.target.value)}
                          placeholder="URL demo/repo"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                        />
                        <input
                          value={p.stack}
                          onChange={(e) => setProject(i, 'stack', e.target.value)}
                          placeholder="Stack (mis. Next.js, Tailwind, Figma)"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                        />
                      </div>
                      <div className="mt-3">
                        <textarea
                          value={p.summary}
                          onChange={(e) => setProject(i, 'summary', e.target.value)}
                          placeholder="Ringkas problem, solusi, dan impact proyek"
                          rows={3}
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
                        />
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => delProject(i)}
                          className="rounded-full px-3 py-2 text-sm bg-white/10 hover:bg-white/15"
                        >
                          Hapus Proyek
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {err ? <p className="text-rose-400 text-sm">{err}</p> : null}

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(90deg,#00ffff,#a259ff)' }}
                >
                  {loading ? 'Membuat roadmap…' : 'Buat Roadmap'}
                </button>
                <span className="text-white/60 text-sm">Data akan dipakai untuk memetakan gap & membuat jadwal mingguan.</span>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

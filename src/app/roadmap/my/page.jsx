'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useAppStore } from '@/store/useAppStore';
import RoadmapMindmap from '@/components/roadmap/RoadmapMindmap';
import RoadmapWeeks from '@/components/roadmap/RoadmapWeeks';
import CoursesExplorer from '@/components/roadmap/CoursesExplorer';
import ResourceDrawer from '@/components/roadmap/ResourceDrawer';

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/15 bg-white/5 text-white/90">
      {children}
    </span>
  );
}

export default function MyRoadmapPage() {
  const roadmap = useAppStore((s) => s.roadmap);

  const roleStr = (roadmap?.profile?.role || '').toLowerCase();
  const defaultView = useMemo(() => ((/(ui|ux)/i.test(roleStr) ? 'mind' : 'weeks')), [roleStr]);
  const [view, setView] = useState(defaultView);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pickedTopic, setPickedTopic] = useState(null);
  const onPickTopic = (t) => {
    setPickedTopic(t);
    setDrawerOpen(true);
  };

  if (!roadmap) {
    return (
      <>
        <Navbar />
        <main className="px-4 pt-[108px] pb-20">
          <div className="mx-auto max-w-3xl card text-center">
            <h2 className="text-xl font-bold">Belum ada roadmap.</h2>
            <p className="mt-2 text-white/70">
              Mulai dari halaman <Link href="/profile" className="underline">Profil</Link> untuk membuat roadmap pertamamu.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/profile" className="btn-primary">Buat dari Profil</Link>
              <Link href="/roadmap" className="btn-ghost">Kembali ke Landing Roadmap</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const name = roadmap?.profile?.name || 'Kamu';
  const level = roadmap?.profile?.level || '-';
  const role = roadmap?.profile?.role || '-';

  return (
    <>
      <Navbar />
      <main className="px-4 pt-[108px] pb-24">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="card flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Roadmapku</h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <Chip>{name}</Chip>
                <Chip>{role}</Chip>
                <Chip>{level}</Chip>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('mind')}
                className={`rounded-full px-4 py-2 ring-1 ring-white/15 ${view === 'mind' ? 'bg-white/20 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
              >
                Mindmap
              </button>
              <button
                onClick={() => setView('weeks')}
                className={`rounded-full px-4 py-2 ring-1 ring-white/15 ${view === 'weeks' ? 'bg-white/20 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
              >
                Mingguan
              </button>
              <button
                onClick={() => setView('courses')}
                className={`rounded-full px-4 py-2 ring-1 ring-white/15 ${view === 'courses' ? 'bg-white/20 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
              >
                Kelas
              </button>
            </div>
          </section>

          {view === 'mind' && /(ui|ux)/i.test(roleStr) && (
            <RoadmapMindmap profile={roadmap.profile} onPickTopic={onPickTopic} />
          )}

          {view === 'mind' && !/(ui|ux)/i.test(roleStr) && (
            <div className="card text-center">
              <p className="text-white/75">Mindmap saat ini tersedia untuk role UI/UX. Gunakan tampilan Mingguan untuk role lainnya.</p>
            </div>
          )}

          {view === 'weeks' && (
            <RoadmapWeeks
              weeks={Array.isArray(roadmap.weeks) ? roadmap.weeks : []}
              profile={roadmap.profile}
            />
          )}

          {view === 'courses' && <CoursesExplorer profile={roadmap.profile} />}
        </div>
      </main>

      <ResourceDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        topic={pickedTopic}
        role={role}
      />

      <Footer />
    </>
  );
}

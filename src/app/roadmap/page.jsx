'use client'
import Link from 'next/link'
import { useAppStore } from '@/store/useAppStore'
import ResetRoadmapButton from '@/components/ResetRoadmapButton'

function EmptyState() {
  return (
    <main className="px-4 pt-[110px] pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center">
          <h1 className="text-2xl font-bold">Belum ada roadmap.</h1>
          <p className="text-muted mt-2">
            Mulai dari halaman <Link href="/profile" className="underline">Profil</Link> untuk membuat roadmap pertamamu.
          </p>
          <div className="mt-6">
            <Link href="/profile" className="btn-primary">Buat dari Profil</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function HasRoadmap({ roadmap }) {
  // contoh render sederhana; sesuaikan dengan komponenmu
  return (
    <main className="px-4 pt-[110px] pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Roadmap Kamu</h1>
          <ResetRoadmapButton />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold">Tahapan</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/90">
              {(roadmap?.stages || []).map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <div>
                    <div className="font-medium">{s.title || `Tahap ${i+1}`}</div>
                    {s.desc && <div className="text-muted text-xs">{s.desc}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold">Rencana Minggu 1</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {(roadmap?.weeks?.[0]?.tasks || []).map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {roadmap?.weeks?.[0]?.resources?.length ? (
              <>
                <div className="mt-4 text-sm text-muted">Sumber belajar:</div>
                <ul className="mt-1 space-y-1 text-sm">
                  {roadmap.weeks[0].resources.map((r, i) => (
                    <li key={i}>
                      <a href={r.url} target="_blank" rel="noreferrer" className="underline">{r.title || r.url}</a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function RoadmapPage() {
  // penting: ambil properti langsung agar tidak bikin selector object baru (menghindari loop)
  const roadmap = useAppStore(s => s.roadmap)
  if (!roadmap) return <EmptyState />
  return <HasRoadmap roadmap={roadmap} />
}

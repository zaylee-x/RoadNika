'use client';

import TiltCard from '@/components/TiltCard';
import Reveal from '@/components/Reveal';

const DEFAULTS = [
  '/image/t1.png','/image/t2.png','/image/t3.png',
  '/image/t4.png','/image/t5.png','/image/t6.png'
];

export default function RolesStrip({ images = DEFAULTS }){
  const roles = [
    { title:'Frontend Dev', desc:'HTML • CSS • React' },
    { title:'UI/UX Designer', desc:'Figma • Prototyping' },
    { title:'QA Engineer', desc:'Test • Automation' },
    { title:'Data Analyst', desc:'SQL • Viz' },
    { title:'Mobile Dev', desc:'Flutter • React Native' },
    { title:'Backend Dev', desc:'API • DB' },
  ];

  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal loop>
          <h2 className="text-2xl md:text-3xl font-bold">Pilih Peran, Temukan Jalurmu</h2>
        </Reveal>
        <Reveal delay={100} loop>
          <p className="mt-3 text-muted">
            Kamu bisa mulai dari nol, Kami akan memetakan skill gap dan memberi langkah yang jelas tiap minggu.
          </p>
        </Reveal>

        {/* Desktop: grid + tilt */}
        <div className="mt-10 hidden md:grid grid-cols-3 gap-6">
          {images.slice(0,6).map((src, i) => (
            <Reveal key={i} delay={i*70} loop>
              <TiltCard className="p-0 overflow-hidden">
                <img
                  src={src}
                  alt={roles[i]?.title || `role-${i+1}`}
                  className="h-72 w-full object-cover"
                  loading="lazy" decoding="async"
                  onError={(e)=>{ e.currentTarget.src = FALLBACK; }}
                />
                <div className="p-5 text-left">
                  <div className="font-semibold">{roles[i]?.title}</div>
                  <div className="text-sm text-muted">{roles[i]?.desc}</div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Mobile: slider */}
        <div className="mt-8 md:hidden overflow-x-auto no-scrollbar">
          <div className="flex gap-4">
            {images.map((src, i) => (
              <Reveal key={i} loop>
                <div className="card p-0 overflow-hidden shrink-0 w-64">
                  <img
                    src={src}
                    alt={`role-${i+1}`}
                    className="h-48 w-full object-cover"
                    loading="lazy" decoding="async"
                    onError={(e)=>{ e.currentTarget.src = FALLBACK; }}
                  />
                  <div className="p-4 text-left">
                    <div className="font-semibold">{roles[i%roles.length].title}</div>
                    <div className="text-sm text-muted">{roles[i%roles.length].desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

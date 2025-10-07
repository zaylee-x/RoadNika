import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import LearnHero from '@/components/learn/LearnHero';
import LearnCatalog from '@/components/learn/LearnCatalog';

export const metadata = {
  title: 'Belajar | RoadNika',
  description: 'Katalog materi belajar terkurasi: cari, filter, dan mulai praktek.',
};

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[100px] space-y-12 md:space-y-16">
        <LearnHero />
        <LearnCatalog />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

function CTASection() {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-cyan-400/20 via-fuchsia-500/15 to-transparent blur-2xl" />
          <div className="card rounded-[26px] relative p-8 md:p-10 text-center">
            <h3 className="text-ink dark:text-white text-xl md:text-2xl font-bold">
              Bingung mulai dari mana?
            </h3>
            <p className="text-muted dark:text-white/70 mt-2">
              Ukur skill & tujuanmu, lalu dapatkan rekomendasi materi dan roadmap mingguan yang pas.
            </p>
            <div className="mt-5">
              <a href="/profile" className="btn-primary">Ukur Skill & Dapatkan Rekomendasi</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';
import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ContactSection(){
  const submit = (e) => { e.preventDefault(); alert('Terima kasih! Kami akan menghubungi kamu.'); };
  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-[1.1fr,1fr]">
        <Reveal loop>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink">Hubungi Kami</h2>
            <p className="mt-2 text-muted max-w-prose">
              Ingin kolaborasi, tanya fitur, atau butuh saran jalur belajar? Kirimkan pesan. Kami senang membantu.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoItem label="Email"  value="arunika.pi25@gmail.com" />
              <InfoItem label="Instagram"  value="official.arunika_" />
              <InfoItem label="Tiktok" value="official.arunika_" />
              <InfoItem label="Jam"    value="Senin–Jumat, 09.00–17.00" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} loop>
          <form onSubmit={submit} className="card p-6 md:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="first" placeholder="Nama depan" />
              <Input name="last"  placeholder="Nama belakang" />
            </div>
            <div className="mt-4">
              <Input name="email" type="email" placeholder="Email" />
            </div>
            <div className="mt-4">
              <Textarea name="message" placeholder="Pesan kamu..." rows={5} />
            </div>
            <div className="mt-5">
              <MagneticButton className="btn-primary">Kirim Pesan</MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function InfoItem({label, value}){
  return (
    <div className="card">
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-1 font-semibold text-ink">{value}</div>
    </div>
  );
}
function Input(props){ return <input {...props} className="input" />; }
function Textarea(props){ return <textarea {...props} className="textarea" />; }

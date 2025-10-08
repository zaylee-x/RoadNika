# RoadNika — Ukur Skill & Petakan Karier 🎯

> Platform kecil tapi niat: bantu perempuan masuk/naik level di dunia teknologi lewat **profil singkat → roadmap personal** (mingguan & mindmap) + **kelas terkurasi**.  
> Dibangun dengan **Next.js (App Router)**, **Tailwind CSS**, dan **Zustand**.

<p align="center">
  <img src="public/image/cover.png" alt="RoadNika cover" width="860" />
</p>

<p align="center">
  <a><img src="https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs" /></a>
  <a><img src="https://img.shields.io/badge/TailwindCSS-latest-teal?logo=tailwindcss" /></a>
  <a><img src="https://img.shields.io/badge/Zustand-store-orange" /></a>
  <a><img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel" /></a>
</p>

---

## ✨ Fitur Utama

- **Profil sekali isi** → nama, role, level, skill, sertifikat, proyek (**disimpan lokal**).
- **Roadmap Mingguan** → checklist realistis (6–8 jam/minggu) + catatan/refleksi.
- **Mindmap UI/UX** → zoom/pan, status node (Belum/Proses/Selesai), klik node → **Resource Drawer**.
- **Kelas/Katalog** → filter by **role** (FE/BE/UIUX/Data), **free/paid**, format, dan topik.
- **Google Calendar** → _deep link_ cepat (tanpa file `.ics`) buat block waktu belajar.
- **Fallback pintar** → kalau AI error, roadmap tetap dibuat dari katalog & rules lokal.
- **Dark-mode first** + animasi halus.

---

## 🧭 Halaman

| Path | Deskripsi |
| --- | --- |
| `/` | Landing + CTA |
| `/profile` | Form profil **satu halaman** (basic + skill + sertifikat + proyek) |
| `/roadmap` | Landing Roadmap (preview + CTA) + Reset Roadmap |
| `/roadmap/my` | **Roadmapku** — toggle **Mindmap / Mingguan / Kelas** |

> Ganti gambar di `/public/image/` (`cover.png`, `profile.png`, `roadmap.png`, …) biar README makin hidup.

---

## 🗂 Struktur Folder


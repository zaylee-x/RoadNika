import { NextResponse } from 'next/server';
import { getGemini } from '@/lib/gemini';

// katalog sederhana utk fallback rekomendasi
const CATALOG = [
  { title:'HTML Semantik Cepat', url:'https://web.dev/learn/html/', provider:'web.dev', level:'Beginner', tags:['html'], minutes:90 },
  { title:'CSS Flexbox & Grid', url:'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', provider:'CSS-Tricks', level:'Beginner', tags:['css','flexbox','grid'], minutes:120 },
  { title:'Git Dasar', url:'https://learngitbranching.js.org/', provider:'LGB', level:'Beginner', tags:['git'], minutes:120 },
  { title:'Deploy Vercel', url:'https://vercel.com/docs', provider:'Vercel', level:'Beginner', tags:['deploy'], minutes:60 },
  { title:'Figma untuk UI', url:'https://help.figma.com/', provider:'Figma', level:'Beginner', tags:['figma','ui design'], minutes:120 },
  { title:'Usability & Heuristics', url:'https://www.nngroup.com/articles/ten-usability-heuristics/', provider:'NN/g', level:'Beginner', tags:['ux','heuristic'], minutes:40 },
  { title:'React Dasar', url:'https://react.dev/learn', provider:'React', level:'Beginner', tags:['javascript','react'], minutes:180 },
];

const ROLE_SKILLS = {
  'frontend': ['html','css','javascript','git','deploy','react'],
  'ui ux': ['figma','wireframe','prototype','ui design','ux','heuristic','portfolio'],
  'data analyst': ['sql','excel','viz','python','statistics','dashboard'],
  'qa engineer': ['testing','automation','test case','selenium','cypress','api testing'],
};

export async function POST(req) {
  try {
    const body = await req.json();
    const name  = (body.name  || '').trim();
    const role  = (body.role  || '').toLowerCase().trim();
    const level = (body.level || 'Beginner').trim();
    const skillsInput = Array.isArray(body.skills) ? body.skills : (body.skills || []);
    const userSkills = skillsInput.map((s)=>String(s).toLowerCase().trim()).filter(Boolean);

    // hitung gaps dari role requirement sederhana
    const needed = ROLE_SKILLS[role] || [];
    const gaps = needed.filter(reqSkill => !userSkills.includes(reqSkill));

    // siapkan prompt ke Gemini (minta juga weeks)
    const prompt = `
Buat roadmap 4-6 minggu untuk ${name || 'user'}.
Role: ${role || 'frontend'}. Level: ${level}. Skill user: ${userSkills.join(', ') || '-'}.
Output JSON valid TANPA markdown, bentuk:
{
  "weeks":[
    {"week":1,"theme":"...","tasks":["...","..."],"hours":6}
  ]
}
Fokuskan task untuk menutup skill gap: ${gaps.join(', ') || '-'}.
`;

    let weeks;
    try {
      const model = getGemini('gemini-1.5-flash');
      const res = await model.generateContent(prompt);
      const text = res.response.text();
      weeks = parseJson(text)?.weeks;
      if (!Array.isArray(weeks) || !weeks.length) throw new Error('invalid weeks');
    } catch {
      // fallback lokal: generate 4 minggu dari gaps/needed
      const topics = (gaps.length ? gaps : needed).slice(0, 4);
      weeks = topics.map((t, i) => ({
        week: i + 1,
        theme: capitalize(t),
        tasks: buildTasksFor(t, role),
        hours: 6,
      }));
    }

    // rekomendasi dari katalog
    const resources = CATALOG
      .filter(r => r.tags.some(t => gaps.includes(t)))
      .slice(0, 6);

    const data = {
      profile: { name, role, level, skills: userSkills },
      gaps,
      resources,
      weeks,
    };
    return NextResponse.json({ ok: true, data });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// helpers
function parseJson(s) {
  const m = String(s).match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = m ? m[1] : s;
  return JSON.parse(raw);
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function buildTasksFor(topic, role){
  const t = String(topic).toLowerCase();
  if (role.includes('ui')) {
    if (t.includes('figma')) return ['Figma dasar', 'Auto-layout', 'Komponen', 'Wireframe 1 layar'];
    if (t.includes('ux') || t.includes('heuristic')) return ['Baca 10 heuristik', 'Audit 1 app', 'Perbaiki 1 layar'];
    if (t.includes('ui')) return ['Typography/Color', '3 card komponen', 'Style guide ringkas'];
  } else {
    if (t.includes('html')) return ['HTML semantik', 'Forms & a11y', '1 halaman portofolio'];
    if (t.includes('css')) return ['Flexbox', 'Grid', 'Responsive layout'];
    if (t.includes('javascript')) return ['DOM dasar', 'Event', 'Fetch API mini'];
    if (t.includes('react')) return ['Komponen & props', 'State', 'Fetch data', '2 komponen kecil'];
    if (t.includes('git')) return ['init → commit', 'branch kecil', 'pull request'];
    if (t.includes('deploy')) return ['Setup Vercel', 'Env var', '1 deploy publik'];
  }
  return ['Pelajari konsep dasar', 'Latihan kecil terarah', 'Catat insight'];
}

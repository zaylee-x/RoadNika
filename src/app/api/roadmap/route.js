import { NextResponse } from 'next/server';
import { buildRoadmapWithGemini } from '@/lib/gemini';

// baseline resources untuk rekomendasi cepat
const CATALOG = [
  { title:'HTML Semantik Cepat', url:'https://web.dev/learn/html/', provider:'web.dev', level:'Beginner', tags:['html'], minutes:90 },
  { title:'CSS Flexbox & Grid', url:'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', provider:'CSS-Tricks', level:'Beginner', tags:['css','flexbox','grid'], minutes:120 },
  { title:'Git Dasar', url:'https://learngitbranching.js.org/', provider:'LGB', level:'Beginner', tags:['git'], minutes:120 },
  { title:'Deploy Vercel', url:'https://vercel.com/docs', provider:'Vercel', level:'Beginner', tags:['deploy'], minutes:60 },
  { title:'Figma untuk UI', url:'https://help.figma.com/', provider:'Figma', level:'Beginner', tags:['figma','ui design'], minutes:120 },
  { title:'Usability & Heuristics', url:'https://www.nngroup.com/articles/ten-usability-heuristics/', provider:'NN/g', level:'Beginner', tags:['ux','heuristic'], minutes:40 },
  { title:'React Dasar', url:'https://react.dev/learn', provider:'React', level:'Beginner', tags:['javascript','react'], minutes:180 },
  { title:'SQL Dasar', url:'https://selectstarsql.com/', provider:'Select Star SQL', level:'Beginner', tags:['sql'], minutes:150 },
];

const ROLE_SKILLS = {
  frontend: ['html','css','javascript','react','git','deploy'],
  backend : ['api','database','node','auth','git','deploy'],
  uiux    : ['figma','wireframe','prototype','ui design','ux','heuristic'],
  data    : ['sql','excel','python','statistics','viz','dashboard'],
};

export async function POST(req) {
  try {
    const body = await req.json();

    const name  = (body.name  || '').trim();
    const role  = (body.role  || '').trim();
    const level = (body.level || 'Beginner').trim();
    const skillsInput = Array.isArray(body.skills) ? body.skills : (body.skills || []);
    const userSkills = skillsInput.map(s => String(s).toLowerCase().trim()).filter(Boolean);

    const roleKey = normalizeRole(role);
    const needed  = ROLE_SKILLS[roleKey] || [];
    const gaps    = needed.filter(x => !userSkills.includes(x));

    // 1) coba AI
    let weeks = [];
    try {
      const ai = await buildRoadmapWithGemini({ name, role, level, skills: userSkills });
      weeks = (ai.weeks || []).map(w => ({
        week : Number(w.week) || weeks.length + 1,
        theme: String(w.theme || '').trim() || 'Minggu',
        tasks: Array.isArray(w.tasks) ? w.tasks.slice(0, 8).map(String) : [],
        hours: Number(w.hours) || 6,
      }));
    } catch {
      // 2) fallback lokal terarah dari gaps/needed
      const topics = (gaps.length ? gaps : needed).slice(0, 4);
      weeks = topics.map((t, i) => ({
        week : i + 1,
        theme: caps(t),
        tasks: buildTasksFor(t, roleKey),
        hours: 6,
      }));
    }

    // rekomendasi resource dari catalog seputar gaps
    const resources = CATALOG.filter(r => r.tags.some(t => gaps.includes(t))).slice(0, 8);

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

function normalizeRole(role) {
  const r = role.toLowerCase();
  if (r.includes('front')) return 'frontend';
  if (r.includes('back'))  return 'backend';
  if (r.includes('ui') || r.includes('ux')) return 'uiux';
  if (r.includes('data'))  return 'data';
  return 'frontend';
}
function caps(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

function buildTasksFor(topic, roleKey){
  const t = String(topic).toLowerCase();
  if (roleKey === 'uiux') {
    if (t.includes('figma'))     return ['Figma dasar', 'Auto-layout & Variants', 'Komponen', 'Wireframe 1 layar'];
    if (t.includes('heuristic') || t.includes('ux')) return ['Baca 10 heuristik', 'Audit 1 app', 'Perbaiki 1 layar'];
    if (t.includes('ui'))        return ['Color/Typography', '3 kartu komponen', 'Mini style-guide'];
  } else if (roleKey === 'backend') {
    if (t.includes('api'))       return ['REST dasar', 'CRUD kecil', 'Dokumentasi OpenAPI'];
    if (t.includes('database'))  return ['Relasi & index', 'Query dasar', 'Backup & seed'];
    if (t.includes('node'))      return ['Express routing', 'Middleware', 'Error handling'];
    if (t.includes('auth'))      return ['JWT/Session', 'Protect route', 'Refresh token'];
  } else if (roleKey === 'data') {
    if (t.includes('sql'))       return ['SELECT/WHERE', 'JOIN/AGGREGATE', '3 query analitik'];
    if (t.includes('excel'))     return ['VLOOKUP/XLOOKUP', 'Pivot table', 'Cleaning tips'];
    if (t.includes('python'))    return ['pandas Series/DataFrame', 'read_csv', 'GroupBy mini'];
    if (t.includes('viz'))       return ['Chart dasar', 'Storytelling', '1 dashboard mini'];
  } else { // frontend
    if (t.includes('html'))      return ['HTML semantik', 'Forms & a11y', '1 halaman portofolio'];
    if (t.includes('css'))       return ['Flexbox', 'Grid', 'Responsive layout'];
    if (t.includes('javascript'))return ['DOM & event', 'Fetch API mini', 'Modularisasi'];
    if (t.includes('react'))     return ['Komponen & props', 'State', 'Fetch data (2 komponen)'];
    if (t.includes('git'))       return ['init → commit', 'branch kecil', 'pull request'];
    if (t.includes('deploy'))    return ['Setup Vercel', 'Env var', '1 deploy publik'];
  }
  return ['Belajar konsep inti', 'Latihan kecil terarah', 'Catat insight'];
}

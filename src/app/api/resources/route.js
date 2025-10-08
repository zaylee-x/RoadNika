import { NextResponse } from 'next/server';

const CATALOG = [
  { title:'HTML Semantik Cepat', url:'https://web.dev/learn/html/', provider:'web.dev', level:'Beginner', tags:['html'], minutes:90 },
  { title:'CSS Flexbox & Grid', url:'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', provider:'CSS-Tricks', level:'Beginner', tags:['css','flexbox','grid'], minutes:120 },
  { title:'Figma Essentials', url:'https://help.figma.com/', provider:'Figma', level:'Beginner', tags:['figma','ui'], minutes:120 },
  { title:'Nielsen 10 Heuristics', url:'https://www.nngroup.com/articles/ten-usability-heuristics/', provider:'NN/g', level:'All', tags:['ux','heuristics'], minutes:40 },
  { title:'Accessible Design Basics', url:'https://www.a11yproject.com/', provider:'A11Y Project', level:'All', tags:['accessibility','ui'], minutes:60 },
  { title:'UX Research Guide', url:'https://www.nngroup.com/topic/ux-research/', provider:'NN/g', level:'All', tags:['ux','research'], minutes:120 },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const topic = (searchParams.get('topic') || '').toLowerCase();
  const role  = (searchParams.get('role')  || '').toLowerCase();

  const picks = CATALOG
    .map(r => ({ ...r, score: (r.tags || []).filter(t => topic.includes(t)).length + (role.includes('ui')||role.includes('ux') ? (r.tags.includes('ux')||r.tags.includes('ui')?1:0):0) }))
    .filter(r => r.score > 0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,8)
    .map(({score, ...rest})=>rest);

  return NextResponse.json({ items: picks });
}

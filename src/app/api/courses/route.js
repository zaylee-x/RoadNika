import { NextResponse } from 'next/server';


const CATALOG = [
  // ---------- Frontend ----------
  { id:'fe-fcc', role:['frontend'], title:'freeCodeCamp – Responsive Web Design', provider:'freeCodeCamp', url:'https://www.freecodecamp.org/learn/2022/responsive-web-design/', price:'free', os:true,  format:'self-paced', level:'Beginner', duration:'~40–60h', tags:['html','css','frontend'] },
  { id:'fe-odin',role:['frontend','backend'], title:'The Odin Project – Full Stack JavaScript', provider:'The Odin Project', url:'https://www.theodinproject.com/paths/full-stack-javascript', price:'free', os:true, format:'self-paced', level:'Beginner–Mid', duration:'~12–24w', tags:['js','node','react','git','project'] },
  { id:'fe-mdn', role:['frontend'], title:'MDN – Front-End Web Developer Learning Path', provider:'MDN', url:'https://developer.mozilla.org/en-US/docs/Learn', price:'free', os:false, format:'self-paced', level:'Beginner', duration:'flexible', tags:['html','css','js'] },
  { id:'fe-fso', role:['frontend','backend'], title:'Full Stack Open', provider:'University of Helsinki', url:'https://fullstackopen.com/en/', price:'free', os:true, format:'self-paced', level:'Mid', duration:'~12–14w', tags:['react','node','ts','graphql','docker'] },
  { id:'fe-scrimba', role:['frontend'], title:'Frontend Developer Career Path', provider:'Scrimba', url:'https://scrimba.com/learn/frontend', price:'paid', os:false, format:'self-paced', level:'Beginner–Mid', duration:'~15w', tags:['react','api','projects'] },

  // ---------- UI/UX ----------
  { id:'ux-figma', role:['uiux'], title:'Figma Learn – Starter', provider:'Figma', url:'https://help.figma.com/hc/en-us/categories/360002036613-Learn-design', price:'free', os:false, format:'self-paced', level:'Beginner', duration:'12–20h', tags:['figma','ui','components'] },
  { id:'ux-nng',   role:['uiux'], title:'NN/g – UX Research & Heuristics Collection', provider:'Nielsen Norman Group', url:'https://www.nngroup.com/topic/ux-research/', price:'free', os:false, format:'self-paced', level:'All', duration:'flexible', tags:['ux','research','heuristics'] },
  { id:'ux-idf',   role:['uiux'], title:'Interaction Design Foundation Membership', provider:'IDF', url:'https://www.interaction-design.org/', price:'paid', os:false, format:'self-paced', level:'Beginner–Senior', duration:'subscription', tags:['ux','ui','portfolio'] },
  { id:'ux-google',role:['uiux'], title:'Google UX Design Professional Certificate', provider:'Coursera', url:'https://www.coursera.org/professional-certificates/google-ux-design', price:'paid', os:false, format:'self-paced', level:'Beginner', duration:'~6m', tags:['ux','case-study'] },

  // ---------- Data Analyst ----------
  { id:'da-kaggle', role:['data'], title:'Kaggle – Micro-Courses', provider:'Kaggle', url:'https://www.kaggle.com/learn', price:'free', os:false, format:'self-paced', level:'Beginner–Mid', duration:'bite-sized', tags:['python','pandas','sql','viz'] },
  { id:'da-fcc',    role:['data'], title:'freeCodeCamp – Data Analysis with Python', provider:'freeCodeCamp', url:'https://www.freecodecamp.org/learn/data-analysis-with-python/', price:'free', os:true, format:'self-paced', level:'Beginner', duration:'~35h', tags:['python','pandas'] },
  { id:'da-datacamp', role:['data'], title:'Data Analyst in Python', provider:'DataCamp', url:'https://www.datacamp.com/tracks/data-analyst-with-python', price:'paid', os:false, format:'self-paced', level:'Beginner–Mid', duration:'~4–6m', tags:['python','sql','viz'] },
  { id:'da-mode', role:['data'], title:'SQL Tutorial', provider:'Mode', url:'https://mode.com/sql-tutorial/', price:'free', os:false, format:'self-paced', level:'Beginner', duration:'~10–15h', tags:['sql'] },

  // ---------- Backend ----------
  { id:'be-node', role:['backend'], title:'Node.js Docs – Learn', provider:'Node.js', url:'https://nodejs.dev/en/learn/', price:'free', os:true, format:'self-paced', level:'Beginner', duration:'flexible', tags:['node','api'] },
  { id:'be-postgres', role:['backend'], title:'PostgreSQL Tutorial', provider:'PostgreSQL', url:'https://www.postgresql.org/docs/current/tutorial.html', price:'free', os:true, format:'self-paced', level:'Beginner–Mid', duration:'flexible', tags:['sql','db'] },
  { id:'be-spring', role:['backend'], title:'Spring Boot and Spring Cloud', provider:'Udemy', url:'https://www.udemy.com/topic/spring-boot/', price:'paid', os:false, format:'self-paced', level:'Mid', duration:'~20–40h', tags:['java','spring'] },
  { id:'be-42', role:['backend','frontend'], title:'42 School (Piscine / Core Curriculum)', provider:'42 Network', url:'https://www.42network.org/', price:'free', os:false, format:'bootcamp', level:'Mid–Senior', duration:'long-term', tags:['c','algorithms','peer-learning'] },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const role = (searchParams.get('role') || '').toLowerCase();
  const price = (searchParams.get('price') || '').toLowerCase(); // free|paid
  const format = (searchParams.get('format') || '').toLowerCase(); // cohort|self-paced|bootcamp
  const os = (searchParams.get('os') || '').toLowerCase(); // 'true' -> open-source
  const q = (searchParams.get('q') || '').toLowerCase();

  let list = CATALOG.slice();

  if (role) list = list.filter(c => c.role.includes(role));
  if (price) list = list.filter(c => c.price === price);
  if (format) list = list.filter(c => c.format === format);
  if (os === 'true') list = list.filter(c => !!c.os);
  if (q) list = list.filter(c =>
    c.title.toLowerCase().includes(q) ||
    (c.tags || []).some(t => t.toLowerCase().includes(q)) ||
    c.provider.toLowerCase().includes(q)
  );

  return NextResponse.json({ items: list });
}

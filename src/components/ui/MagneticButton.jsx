'use client';
import Link from 'next/link';
import { useRef } from 'react';

export default function MagneticButton({ href, className='', children }){
  const ref = useRef(null);
  const onMove=(e)=>{
    const el = ref.current; if(!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width/2);
    const dy = e.clientY - (r.top  + r.height/2);
    const max=18;
    el.style.transform = `translate(${Math.max(-max,Math.min(max,dx*.15))}px, ${Math.max(-max,Math.min(max,dy*.15))}px)`;
  };
  const reset=()=>{ const el = ref.current; if(!el) return; el.style.transform='translate(0,0)'; };
  const Btn = <span ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={className}>{children}</span>;
  return href ? <Link href={href}>{Btn}</Link> : Btn;
}

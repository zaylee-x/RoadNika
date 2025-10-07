'use client';
import { useRef } from 'react';

export default function TiltCard({ children, className='' }){
  const ref = useRef(null);
  const move = (e)=>{
    const el = ref.current; if(!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    el.style.transform = `perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg)`;
  };
  const reset = ()=>{ const el = ref.current; if(!el) return; el.style.transform='perspective(900px)'; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={reset}
         className={`card transition-transform duration-150 will-change-transform ${className}`}
         style={{transform:'perspective(900px)'}}>
      {children}
    </div>
  );
}

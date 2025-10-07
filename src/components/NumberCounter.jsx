'use client';
import { useEffect, useRef, useState } from 'react';

export default function NumberCounter({ to=1000, duration=1200, prefix='', suffix='' }){
  const ref = useRef(null);
  const [v,setV] = useState(0);

  useEffect(()=>{
    const el = ref.current; if(!el) return;
    let started = false;
    const io = new IntersectionObserver(([e])=>{
      if (e.isIntersecting && !started){
        started = true;
        const start = performance.now();
        const from = 0;
        const animate = (t)=>{
          const p = Math.min(1, (t - start)/duration);
          const ease = 1 - Math.pow(1 - p, 3);
          setV(Math.round(from + (to-from)*ease));
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        io.disconnect();
      }
    },{ threshold: .2 });
    io.observe(el);
    return ()=>io.disconnect();
  },[to,duration]);

  return <span ref={ref}>{prefix}{v.toLocaleString()}{suffix}</span>;
}

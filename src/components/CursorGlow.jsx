'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow(){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return; let raf=0;
    const onMove=(e)=>{ const x=e.clientX, y=e.clientY; cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{ el.style.transform = `translate3d(${x-150}px,${y-150}px,0)`; el.style.opacity='1'; });
    };
    const onLeave=()=>{ el.style.opacity='0'; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    return ()=>{ window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseout', onLeave); cancelAnimationFrame(raf); };
  },[]);
  return (
    <div ref={ref}
         className="pointer-events-none fixed z-[60] size-[300px] rounded-full blur-3xl mix-blend-screen opacity-0 transition-opacity duration-200"
         style={{background:'radial-gradient(closest-side, rgba(0,255,255,.22), rgba(162,89,255,.18), transparent 70%)'}}/>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  delay = 0,
  loop = false,
  threshold = 0.18,
  rootMargin = '0px 0px -10% 0px',
}) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const t = setTimeout(() => setOn(true), delay);
        if (!loop) io.unobserve(el);
        return () => clearTimeout(t);
      } else if (loop) {
        setOn(false);
      }
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [delay, loop, threshold, rootMargin]);

  return <div ref={ref} className="reveal" data-inview={on ? 'true' : 'false'}>{children}</div>;
}

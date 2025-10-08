'use client';

import { useAppStore } from '@/store/useAppStore';

export default function ResetRoadmapButton({ className = '' }) {
  const resetRoadmap = useAppStore((s) => s.resetRoadmap);
  return (
    <button
      onClick={() => resetRoadmap()}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold text-white/90 ring-1 ring-white/15 hover:bg-white/10 ${className}`}
    >
      Reset Roadmap
    </button>
  );
}

'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      profile: null,
      roadmap: null,
      setProfile: (p) => set({ profile: p }),
      setRoadmap: (r) => set({ roadmap: r }),
      resetRoadmap: () => set({ roadmap: null }),
      resetAll: () => set({ profile: null, roadmap: null })
    }),
    { name: 'selaras-store', storage: createJSONStorage(() => localStorage) }
  )
);

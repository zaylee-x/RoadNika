import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      profile: null,
      roadmap: null,

      setProfile: (p) => set({ profile: p }),
      setRoadmap: (r) => set({ roadmap: r }),

      clearRoadmap: () => set({ roadmap: null }),
      resetAll:     () => set({ profile: null, roadmap: null }),
    }),
    { name: 'selaras-app' }
  )
)

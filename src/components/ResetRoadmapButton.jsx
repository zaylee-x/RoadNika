'use client'
import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export default function ResetRoadmapButton({ className = '' }) {
  const roadmap      = useAppStore(s => s.roadmap)
  const setRoadmap   = useAppStore(s => s.setRoadmap)
  const clearRoadmap = useAppStore(s => s.clearRoadmap)

  const [open, setOpen]       = useState(false)
  const [showUndo, setUndo]   = useState(false)
  const undoTimerRef          = useRef(null)
  const backupRef             = useRef(null)

  if (!roadmap) return null

  const doReset = () => {
    backupRef.current = roadmap
    clearRoadmap()
    setOpen(false)

    setUndo(true)
    clearTimeout(undoTimerRef.current)
    undoTimerRef.current = setTimeout(() => setUndo(false), 5000)
  }

  const undo = () => {
    const data = backupRef.current
    if (data) setRoadmap(data)
    setUndo(false)
  }

  useEffect(() => () => clearTimeout(undoTimerRef.current), [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={['btn-ghost px-4 py-2 rounded-full text-sm font-semibold', className].join(' ')}
        title="Reset Roadmap"
      >
        Reset Roadmap
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="card max-w-sm w-full">
            <h3 className="text-lg font-semibold">Mulai ulang roadmap?</h3>
            <p className="text-sm text-muted mt-2">
              Ini akan mengosongkan roadmap kamu. Kamu bisa <b>Undo</b> setelah reset.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="btn-ghost">Batal</button>
              <button onClick={doReset} className="btn-primary">Reset</button>
            </div>
          </div>
        </div>
      )}

      {showUndo && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60]">
          <div className="card flex items-center gap-3 px-4 py-3">
            <span>Roadmap direset.</span>
            <button onClick={undo} className="btn-ghost px-3 py-1 rounded-full">Undo</button>
          </div>
        </div>
      )}
    </>
  )
}

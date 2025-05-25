"use client"

import type { Window } from "@/components/desktop"
import { WindowFrame } from "@/components/window-frame"

interface WindowManagerProps {
  windows: Window[]
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onBringToFront: (id: string) => void
}

export function WindowManager({ windows, onClose, onMinimize, onBringToFront }: WindowManagerProps) {
  return (
    <>
      {windows.map((window) => (
        <WindowFrame
          key={window.id}
          id={window.id}
          title={window.title}
          isMinimized={window.isMinimized}
          zIndex={window.zIndex}
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onBringToFront={() => onBringToFront(window.id)}
        >
          {window.component}
        </WindowFrame>
      ))}
    </>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Square, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface WindowFrameProps {
  id: string
  title: string
  children: React.ReactNode
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onBringToFront: () => void
}

export function WindowFrame({
  id,
  title,
  children,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onBringToFront,
}: WindowFrameProps) {
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string>("")
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 650, height: 550 })
  const [isMaximized, setIsMaximized] = useState(false)
  const [previousState, setPreviousState] = useState({ position: { x: 0, y: 0 }, size: { width: 650, height: 550 } })
  const [isMobile, setIsMobile] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const isDark = theme === "dark"

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      if (mobile) {
        // On mobile, make windows full screen
        setWindowSize({ width: window.innerWidth - 16, height: window.innerHeight - 80 })
        setPosition({ x: 8, y: 8 })
        setIsMaximized(true)
      } else if (isMaximized && !mobile) {
        // If switching from mobile to desktop while maximized, keep maximized
        maximizeWindow()
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [isMaximized])

  const maximizeWindow = () => {
    setIsTransitioning(true)

    if (isMaximized) {
      // Restore window to previous state
      setPosition(previousState.position)
      setWindowSize(previousState.size)
      setIsMaximized(false)
    } else {
      // Save current state before maximizing
      setPreviousState({ position, size: windowSize })
      // Maximize window to full screen (accounting for taskbar)
      setPosition({ x: 0, y: 0 })
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - 56, // Account for taskbar height
      })
      setIsMaximized(true)
    }

    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), 200)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isMaximized) return // Disable dragging on mobile or when maximized

    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".window-title")) {
      setIsDragging(true)
      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
      onBringToFront()
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    if (isMobile || isMaximized) return // Disable resizing on mobile or when maximized

    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    onBringToFront()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMobile && !isMaximized) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y

        // Keep window within viewport bounds
        const maxX = window.innerWidth - windowSize.width
        const maxY = window.innerHeight - windowSize.height - 56 // Account for taskbar

        setPosition({
          x: Math.max(0, Math.min(maxX, newX)),
          y: Math.max(0, Math.min(maxY, newY)),
        })
      }

      if (isResizing && !isMobile && !isMaximized) {
        const rect = windowRef.current?.getBoundingClientRect()
        if (!rect) return

        let newWidth = windowSize.width
        let newHeight = windowSize.height
        let newX = position.x
        let newY = position.y

        const minWidth = 300
        const minHeight = 200
        const maxWidth = window.innerWidth
        const maxHeight = window.innerHeight - 56

        if (resizeDirection.includes("right")) {
          newWidth = Math.max(minWidth, Math.min(maxWidth - position.x, e.clientX - rect.left))
        }
        if (resizeDirection.includes("left")) {
          const deltaX = e.clientX - rect.left
          newWidth = Math.max(minWidth, windowSize.width - deltaX)
          newX = Math.max(0, position.x + deltaX)
        }
        if (resizeDirection.includes("bottom")) {
          newHeight = Math.max(minHeight, Math.min(maxHeight - position.y, e.clientY - rect.top))
        }
        if (resizeDirection.includes("top")) {
          const deltaY = e.clientY - rect.top
          newHeight = Math.max(minHeight, windowSize.height - deltaY)
          newY = Math.max(0, position.y + deltaY)
        }

        setWindowSize({ width: newWidth, height: newHeight })
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection("")
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, dragOffset, windowSize, position, resizeDirection, isMobile, isMaximized])

  if (isMinimized) return null

  const getResizeCursor = (direction: string) => {
    switch (direction) {
      case "top":
      case "bottom":
        return "cursor-ns-resize"
      case "left":
      case "right":
        return "cursor-ew-resize"
      case "top-left":
      case "bottom-right":
        return "cursor-nwse-resize"
      case "top-right":
      case "bottom-left":
        return "cursor-nesw-resize"
      default:
        return ""
    }
  }

  return (
    <div
      ref={windowRef}
      className={`fixed overflow-hidden select-none transition-all duration-200 ease-out transform-gpu ${
        isDark
          ? "bg-gray-900/95 border border-gray-700/50 shadow-2xl shadow-black/50"
          : "bg-white/95 border border-gray-300/50 shadow-2xl shadow-black/20"
      } backdrop-blur-md ${isMobile ? "touch-pan-y" : ""} ${isMaximized ? "rounded-none" : "rounded-xl"}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex: Math.max(1000, zIndex),
        width: windowSize.width,
        height: windowSize.height,
        cursor: isDragging ? "grabbing" : "default",
        maxWidth: "100vw",
        maxHeight: "100vh",
        transform: "translateZ(0)", // Force hardware acceleration
        willChange: isDragging || isResizing ? "transform" : "auto",
        contain: "layout style paint",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        if (isMobile) {
          e.preventDefault()
        }
      }}
    >
      {/* Resize Handles - Only show on desktop and when not maximized */}
      {!isMobile && !isMaximized && (
        <>
          {/* Corner Handles */}
          <div
            className={`absolute top-0 left-0 w-3 h-3 ${getResizeCursor("top-left")} z-10`}
            onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
          />
          <div
            className={`absolute top-0 right-0 w-3 h-3 ${getResizeCursor("top-right")} z-10`}
            onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
          />
          <div
            className={`absolute bottom-0 left-0 w-3 h-3 ${getResizeCursor("bottom-left")} z-10`}
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
          />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 ${getResizeCursor("bottom-right")} z-10`}
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
          />

          {/* Edge Handles */}
          <div
            className={`absolute top-0 left-3 right-3 h-1 ${getResizeCursor("top")} z-10`}
            onMouseDown={(e) => handleResizeMouseDown(e, "top")}
          />
          <div
            className={`absolute bottom-0 left-3 right-3 h-1 ${getResizeCursor("bottom")} z-10`}
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
          />
          <div
            className={`absolute left-0 top-3 bottom-3 w-1 ${getResizeCursor("left")} z-10`}
            onMouseDown={(e) => handleResizeMouseDown(e, "left")}
          />
          <div
            className={`absolute right-0 top-3 bottom-3 w-1 ${getResizeCursor("right")} z-10`}
            onMouseDown={(e) => handleResizeMouseDown(e, "right")}
          />

          {/* Visible Resize Indicators */}
          <div className="absolute top-0 left-0 w-3 h-3 bg-transparent hover:bg-blue-500/30 transition-colors duration-200" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-transparent hover:bg-blue-500/30 transition-colors duration-200" />
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-transparent hover:bg-blue-500/30 transition-colors duration-200" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-transparent hover:bg-blue-500/30 transition-colors duration-200" />
        </>
      )}

      {/* Title Bar */}
      <div
        className={`window-title px-4 py-3 flex items-center justify-between transition-all duration-300 ${
          isMobile || isMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        } ${
          isDark
            ? "bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/50"
            : "bg-gradient-to-r from-blue-500 to-blue-600 border-b border-blue-400/50"
        }`}
        onDoubleClick={() => !isMobile && maximizeWindow()}
      >
        <span
          className={`font-medium ${isMobile ? "text-base" : "text-sm"} ${isDark ? "text-gray-100" : "text-white"}`}
        >
          {title}
        </span>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <Button
              size="sm"
              variant="ghost"
              className={`h-7 w-7 p-0 rounded-lg transition-all duration-200 ${
                isDark
                  ? "hover:bg-gray-700 text-gray-300 hover:text-gray-100"
                  : "hover:bg-white/20 text-white/80 hover:text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                onMinimize()
              }}
            >
              <Minus className="w-3 h-3" />
            </Button>
          )}
          {!isMobile && (
            <Button
              size="sm"
              variant="ghost"
              className={`h-7 w-7 p-0 rounded-lg transition-all duration-200 ${
                isDark
                  ? "hover:bg-gray-700 text-gray-300 hover:text-gray-100"
                  : "hover:bg-white/20 text-white/80 hover:text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                maximizeWindow()
              }}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? (
                <div className="w-3 h-3 border border-current">
                  <div className="w-2 h-2 border border-current absolute -top-0.5 -right-0.5 bg-current/10" />
                </div>
              ) : (
                <Square className="w-3 h-3" />
              )}
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            className={`${isMobile ? "h-8 w-8" : "h-7 w-7"} p-0 rounded-lg transition-all duration-200 hover:bg-red-500 text-white/80 hover:text-white`}
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className={isMobile ? "w-4 h-4" : "w-3 h-3"} />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className={`h-full ${isMobile ? "pb-0" : "pb-12"} overflow-auto ${isDark ? "bg-gray-900/50" : "bg-white/50"}`}
        style={{
          height: `calc(100% - ${isMobile ? "56px" : "48px"})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

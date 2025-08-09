"use client"

import type React from "react"

import type { Window } from "@/components/desktop"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StartMenu } from "@/components/start-menu"
import { useTheme } from "@/components/theme-provider"
import {
  User,
  FolderOpen,
  FileText,
  Mail,
  Terminal,
  Settings,
  Activity,
  Trophy,
  Gamepad2,
  Bot,
  Brain,
  Palette,
  X,
} from "lucide-react"

interface TaskbarProps {
  windows: Window[]
  onWindowClick: (id: string) => void
  onOpenApp: (id: string, title: string, component: React.ReactNode) => void
  onCloseWindow?: (id: string) => void
}

// Map app IDs to their icons
const appIcons: Record<string, any> = {
  about: User,
  projects: FolderOpen,
  resume: FileText,
  contact: Mail,
  terminal: Terminal,
  "ai-assistant": Bot,
  "ai-tools": Brain,
  "ui-customizer": Palette,
  "system-monitor": Activity,
  achievements: Trophy,
  "mini-games": Gamepad2,
  settings: Settings,
}

export function Taskbar({ windows, onWindowClick, onOpenApp, onCloseWindow }: TaskbarProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [hoveredWindow, setHoveredWindow] = useState<string | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const getAppIcon = (windowId: string) => {
    return appIcons[windowId] || FolderOpen
  }

  const handleWindowRightClick = (e: React.MouseEvent, windowId: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (onCloseWindow) {
      onCloseWindow(windowId)
    }
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 h-14 border-t backdrop-blur-md transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-gray-900/90 to-slate-900/90 border-gray-700/50"
            : "bg-gradient-to-r from-blue-600/90 to-blue-700/90 border-blue-500/50"
        } flex items-center px-4 shadow-lg`}
        style={{ zIndex: 2000 }}
      >
        {/* Start Button */}
        <Button
          variant="ghost"
          className={`h-10 px-6 font-bold transition-all duration-300 shadow-lg mr-4 ${
            isDark
              ? "text-gray-100 hover:bg-white/15 hover:text-white border border-transparent hover:border-white/20"
              : "text-white hover:bg-white/20 hover:text-white border border-transparent hover:border-white/30"
          } ${
            isStartMenuOpen
              ? isDark
                ? "bg-white/15 border-white/20 shadow-xl"
                : "bg-white/25 border-white/30 shadow-xl"
              : ""
          }`}
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        >
          <div
            className={`w-2 h-2 rounded-full mr-2 ${isDark ? "bg-purple-400" : "bg-cyan-400"} animate-pulse shadow-sm`}
          />
          Start
        </Button>

        {/* Separator */}
        <div className={`w-px h-8 ${isDark ? "bg-gray-600/50" : "bg-white/30"} mr-4`} />
 
        {/* App Icons for Open Windows */}
        <div className="flex items-center gap-2 flex-1">
          {windows.map((window) => {
            const IconComponent = getAppIcon(window.id)
            const isHovered = hoveredWindow === window.id

            return (
              <div
                key={window.id}
                className="relative"
                onMouseEnter={() => setHoveredWindow(window.id)}
                onMouseLeave={() => setHoveredWindow(null)}
              >
                <Button
                  variant="ghost"
                  className={`h-12 w-12 p-0 relative transition-all duration-300 group ${
                    isDark
                      ? `${
                          window.isMinimized
                            ? "bg-gray-800/60 hover:bg-gray-700/80"
                            : "bg-gray-700/80 hover:bg-gray-600/90 shadow-lg"
                        } text-gray-100 border border-transparent hover:border-gray-500/50`
                      : `${
                          window.isMinimized
                            ? "bg-blue-800/50 hover:bg-blue-700/70"
                            : "bg-blue-500/70 hover:bg-blue-400/80 shadow-lg"
                        } text-white border border-transparent hover:border-white/30`
                  } ${!window.isMinimized ? "ring-2 ring-blue-400/30" : ""}`}
                  onClick={() => onWindowClick(window.id)}
                  onContextMenu={(e) => handleWindowRightClick(e, window.id)}
                >
                  <IconComponent className="w-5 h-5" />

                  {/* Active indicator */}
                  {!window.isMinimized && (
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-t-full ${
                        isDark ? "bg-purple-400" : "bg-cyan-400"
                      }`}
                    />
                  )}

                  {/* Close button on hover */}
                  {isHovered && onCloseWindow && (
                    <div
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isDark ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                      } opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onCloseWindow(window.id)
                      }}
                    >
                      <X className="w-3 h-3" />
                    </div>
                  )}
                </Button>

                {/* Tooltip */}
                {isHovered && (
                  <div
                    className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg shadow-lg border text-sm whitespace-nowrap z-50 transition-all duration-200 ${
                      isDark
                        ? "bg-gray-800/95 border-gray-600/50 text-gray-100"
                        : "bg-white/95 border-gray-300/50 text-gray-900"
                    } backdrop-blur-sm`}
                  >
                    {window.title}
                    {window.isMinimized && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Minimized
                      </Badge>
                    )}
                    {/* Tooltip arrow */}
                    <div
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                        isDark ? "border-t-gray-800/95" : "border-t-white/95"
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}

          {/* Empty state message when no windows are open */}
          {windows.length === 0 && (
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-white/70"} italic`}>
              No apps running - Click Start to open an app
            </div>
          )}
        </div>

        {/* System Tray Area */}
        <div className="flex items-center gap-4">
          {/* Window count indicator */}
          {windows.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`text-xs ${
                  isDark ? "border-gray-500/50 text-gray-300 bg-gray-800/50" : "border-white/30 text-white bg-white/20"
                }`}
              >
                {windows.length} {windows.length === 1 ? "app" : "apps"}
              </Badge>
            </div>
          )}

          {/* Prince Kumar Name */}
          <a
            href="https://techcertificates.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-semibold ${
              isDark ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
            } mr-4 transition-colors duration-300`}
          >
            Prince Kumar
          </a>

          {/* Separator */}
          <div className={`w-px h-8 ${isDark ? "bg-gray-600/50" : "bg-white/30"}`} />
 
          {/* Clock */}
          <div
            className={`font-mono text-sm transition-colors duration-300 ${
              isDark ? "text-gray-300" : "text-white"
            } min-w-[60px] text-center`}
          >
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>

      {/* Start Menu */}
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} onOpenApp={onOpenApp} />
    </>
  )
}

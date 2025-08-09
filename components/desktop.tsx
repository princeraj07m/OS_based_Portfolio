"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Taskbar } from "@/components/taskbar"
import { DesktopIcon } from "@/components/desktop-icon"
import { WindowManager } from "@/components/window-manager"
import { AboutApp } from "@/components/apps/about-app"
import { ProjectsApp } from "@/components/apps/projects-app"
import { ResumeApp } from "@/components/apps/resume-app"
import { ContactApp } from "@/components/apps/contact-app"
import { TerminalApp } from "@/components/apps/terminal-app"
import { SettingsApp } from "@/components/apps/settings-app"
import { SystemMonitorApp } from "@/components/apps/system-monitor-app"
import { AchievementsApp } from "@/components/apps/achievements-app"
import { MiniGamesApp } from "@/components/apps/mini-games-app"
import { AIAssistantApp } from "@/components/apps/ai-assistant-app"
import { AIToolsApp } from "@/components/apps/ai-tools-app"
import { UICustomizerApp } from "@/components/apps/ui-customizer-app"
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
} from "lucide-react"

export interface Window {
  id: string
  title: string
  component: React.ReactNode
  isMinimized: boolean
  zIndex: number
}

export function Desktop() {
  const [windows, setWindows] = useState<Window[]>([])
  const [nextZIndex, setNextZIndex] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const { theme } = useTheme()

  // Add these performance optimizations at the top of the component
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Optimize animations on mount
    const root = document.documentElement
    root.style.setProperty("--animation-duration", "200ms")

    // Reduce motion if user prefers
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.setProperty("--animation-duration", "0ms")
    }
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const openWindow = (id: string, title: string, component: React.ReactNode) => {
    const existingWindow = windows.find((w) => w.id === id)
    if (existingWindow) {
      // Bring to front and unminimize with highest z-index
      const newZIndex = nextZIndex
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w)))
      setNextZIndex((prev) => prev + 1)
      return
    }

    // Create component based on id
    let windowComponent = component
    switch (id) {
      case "about":
        windowComponent = <AboutApp />
        break
      case "projects":
        windowComponent = <ProjectsApp />
        break
      case "resume":
        windowComponent = <ResumeApp />
        break
      case "contact":
        windowComponent = <ContactApp />
        break
      case "terminal":
        windowComponent = <TerminalApp />
        break
      case "settings":
        windowComponent = <SettingsApp />
        break
      case "system-monitor":
        windowComponent = <SystemMonitorApp />
        break
      case "achievements":
        windowComponent = <AchievementsApp />
        break
      case "mini-games":
        windowComponent = <MiniGamesApp />
        break
      case "ai-assistant":
        windowComponent = <AIAssistantApp />
        break
      case "ai-tools":
        windowComponent = <AIToolsApp />
        break
      case "ui-customizer":
        windowComponent = <UICustomizerApp />
        break
      default:
        windowComponent = component
    }

    const newWindow: Window = {
      id,
      title,
      component: windowComponent,
      isMinimized: false,
      zIndex: nextZIndex,
    }

    setWindows((prev) => [...prev, newWindow])
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }

  const bringToFront = (id: string) => {
    const newZIndex = nextZIndex
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: newZIndex } : w)))
    setNextZIndex((prev) => prev + 1)
  }

  const desktopIcons = [
    {
      id: "about",
      title: "About Me",
      icon: User,
      component: <AboutApp />,
    },
    {
      id: "projects",
      title: "Projects",
      icon: FolderOpen,
      component: <ProjectsApp />,
    },
    {
      id: "resume",
      title: "Resume",
      icon: FileText,
      component: <ResumeApp />,
    },
    {
      id: "contact",
      title: "Contact",
      icon: Mail,
      component: <ContactApp />,
    },
    {
      id: "terminal",
      title: "Terminal",
      icon: Terminal,
      component: <TerminalApp />,
    },
    {
      id: "ai-assistant",
      title: "AI Assistant",
      icon: Bot,
      component: <AIAssistantApp />,
    },
    {
      id: "ai-tools",
      title: "AI Tools",
      icon: Brain,
      component: <AIToolsApp />,
    },
    {
      id: "ui-customizer",
      title: "UI Customizer",
      icon: Palette,
      component: <UICustomizerApp />,
    },
    {
      id: "system-monitor",
      title: "System Monitor",
      icon: Activity,
      component: <SystemMonitorApp />,
    },
    {
      id: "achievements",
      title: "Achievements",
      icon: Trophy,
      component: <AchievementsApp />,
    },
    {
      id: "mini-games",
      title: "Mini Games",
      icon: Gamepad2,
      component: <MiniGamesApp />,
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      component: <SettingsApp />,
    },
  ]

  const isDark = theme === "dark"

  // Calculate grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return 4 // 4 columns on mobile
    if (isTablet) return 6 // 6 columns on tablet
    return 8 // 8 columns on desktop
  }

  const getGridRows = () => {
    const columns = getGridColumns()
    return Math.ceil(desktopIcons.length / columns)
  }

  return (
    <div
      className={`h-screen relative overflow-hidden transition-all duration-700 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900"
          : "bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600"
      }`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full opacity-5"
          style={{
            backgroundImage: isDark
              ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse ${
              isDark ? "bg-purple-500" : "bg-white"
            }`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${6 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Desktop Icons - Horizontal Grid Layout */}
      <div className="absolute top-6 left-6 right-6 z-20">
        <div
          className={`grid auto-rows-min ${
            isMobile
              ? "grid-cols-4 gap-3 px-2" // 4 columns on mobile with tighter spacing
              : isTablet
                ? "grid-cols-6 gap-4 px-4" // 6 columns on tablet
                : "grid-cols-8 gap-6 px-6" // 8 columns on desktop
          }`}
          style={{
            gridTemplateRows: "repeat(auto-fit, minmax(auto, max-content))",
            willChange: "transform", // Optimize for animations
          }}
        >
          {desktopIcons.map((icon, index) => (
            <div
              key={icon.id}
              className="flex justify-center items-start will-change-transform"
              style={{
                animationDelay: `${index * 50}ms`, // Reduced delay for smoother stagger
                transform: "translateZ(0)", // Force hardware acceleration
              }}
            >
              <DesktopIcon
                title={icon.title}
                icon={icon.icon}
                onOpen={() => openWindow(icon.id, icon.title, icon.component)}
                className="w-full max-w-none transform-gpu" // Enable GPU acceleration
              />
            </div>
          ))}
        </div>
      </div>

      {/* Windows */}
      <WindowManager
        windows={windows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onBringToFront={bringToFront}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowClick={(id) => {
          const window = windows.find((w) => w.id === id)
          if (window?.isMinimized) {
            setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w)))
            setNextZIndex((prev) => prev + 1)
          } else {
            bringToFront(id)
          }
        }}
        onOpenApp={openWindow}
        onCloseWindow={closeWindow}
      />
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveLayout({ children, className = "" }: ResponsiveLayoutProps) {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize("mobile")
      } else if (width < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const getLayoutClasses = () => {
    const baseClasses = "transition-all duration-300"

    switch (screenSize) {
      case "mobile":
        return `${baseClasses} px-2 py-4 space-y-4`
      case "tablet":
        return `${baseClasses} px-4 py-6 space-y-6`
      case "desktop":
        return `${baseClasses} px-6 py-8 space-y-8`
      default:
        return baseClasses
    }
  }

  return (
    <div className={`${getLayoutClasses()} ${className}`} data-screen-size={screenSize}>
      {children}
    </div>
  )
}

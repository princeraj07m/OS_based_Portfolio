"use client"

import type { LucideIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

interface DesktopIconProps {
  title: string
  icon: LucideIcon
  onOpen: () => void
  className?: string
}

export function DesktopIcon({ title, icon: Icon, onOpen, className = "" }: DesktopIconProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const { theme } = useTheme()

  const isDark = theme === "dark"

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

  // Optimized responsive sizing with CSS custom properties
  const getContainerStyle = () => ({
    minWidth: isMobile ? "70px" : isTablet ? "80px" : "72px",
    maxWidth: isMobile ? "90px" : isTablet ? "110px" : "96px",
    transform: "translateZ(0)", // Force hardware acceleration
    willChange: "transform, opacity", // Optimize for animations
  })

  return (
    <div
      className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ease-out transform-gpu relative z-10 ${
        isDark
            ? "hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/20 hover:scale-105"
            : "hover:bg-white/25 backdrop-blur-sm border border-transparent hover:border-white/30 hover:scale-105"
      } ${className}`}
      onClick={onOpen}
      style={getContainerStyle()}
    >
      <div
        className={`p-3 rounded-2xl mb-2 backdrop-blur-md transition-all duration-200 ease-out shadow-lg transform-gpu ${
          isDark
            ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-600/60"
            : "bg-gradient-to-br from-white/30 to-white/20 border border-white/40"
        } hover:shadow-xl hover:scale-105`}
      >
        <Icon
          className={`${isMobile ? "w-10 h-10" : isTablet ? "w-12 h-12" : "w-8 h-8"} ${
            isDark ? "text-gray-100 drop-shadow-sm" : "text-white drop-shadow-md"
          } transition-transform duration-200 ease-out`}
        />
      </div>
      <span
        className={`${isMobile ? "text-xs" : isTablet ? "text-sm" : "text-sm"} font-medium text-center leading-tight transition-all duration-200 ease-out drop-shadow-sm ${
          isDark ? "text-gray-100" : "text-white"
        }`}
        style={{
          wordBreak: "break-word",
          hyphens: "auto",
          textShadow: isDark ? "0 1px 2px rgba(0,0,0,0.8)" : "0 1px 2px rgba(0,0,0,0.5)",
          maxWidth: "100%",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {title}
      </span>
    </div>
  )
}

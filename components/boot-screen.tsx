"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

interface Particle {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export function BootScreen() {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState("Initializing...")
  const [dots, setDots] = useState("")
  const [particles, setParticles] = useState<Particle[]>([])
  const { theme } = useTheme()

  const bootMessages = [
    "Initializing system",
    "Loading developer.exe",
    "Mounting portfolio filesystem",
    "Starting creative processes",
    "Enabling dark mode magic",
    "Ready to showcase awesome projects",
  ]

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5
        const messageIndex = Math.floor((newProgress / 100) * bootMessages.length)
        if (messageIndex < bootMessages.length) {
          setCurrentText(bootMessages[messageIndex])
        }
        return newProgress > 100 ? 100 : newProgress
      })
    }, 45)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(dotInterval)
  }, [])

  const isDark = theme === "dark"

  return (
    <div
      className={`h-screen relative overflow-hidden flex flex-col items-center justify-center text-white ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${isDark ? "bg-purple-400" : "bg-blue-300"} rounded-full opacity-20 animate-pulse`}
            style={particle}
          />
        ))}
      </div>

      {/* Glowing orb */}
      <div
        className={`absolute w-96 h-96 rounded-full opacity-10 blur-3xl ${
          isDark ? "bg-purple-500" : "bg-blue-500"
        } animate-pulse`}
      />

      <div className="text-center mb-8 z-10">
        <div className="relative">
          <h1
            className={`text-5xl font-bold mb-2 bg-gradient-to-r ${
              isDark ? "from-purple-400 to-pink-400" : "from-blue-400 to-cyan-400"
            } bg-clip-text text-transparent animate-pulse`}
          >
            Prince Kumar
          </h1>
          <div
            className={`absolute -inset-4 ${
              isDark ? "bg-purple-500/20" : "bg-blue-500/20"
            } blur-xl rounded-lg animate-pulse`}
          />
        </div>
        <p className="text-xl opacity-80 font-light">Operating System</p>
        <p className="text-sm opacity-60 mt-2">Explore my works in OS mode</p>
      </div>

      <div className="w-96 mb-6 z-10">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-gray-600/30">
          <div
            className={`h-full transition-all duration-300 ease-out rounded-full ${
              isDark ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-blue-500 to-cyan-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2 opacity-60">
          <span>0%</span>
          <span>{Math.round(progress)}%</span>
          <span>100%</span>
        </div>
      </div>

      <p className="text-sm opacity-70 z-10 h-6">
        {currentText}
        <span className="inline-block w-4">{dots}</span>
      </p>

      <div className="absolute bottom-8 text-xs opacity-50 z-10 text-center">
        <p>© 2025 Prince Kumar - Developer Portfolio v-os</p>
        <p className="mt-1">Powered by Next.js & Tailwind CSS</p>
      </div>
    </div>
  )
}

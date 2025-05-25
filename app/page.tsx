"use client"

import { useState, useEffect } from "react"
import { BootScreen } from "@/components/boot-screen"
import { Desktop } from "@/components/desktop"
import { ThemeProvider } from "@/components/theme-provider"

export default function Portfolio() {
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false)
    }, 3000) // 3 second boot animation

    return () => clearTimeout(timer)
  }, [])

  return <ThemeProvider>{isBooting ? <BootScreen /> : <Desktop />}</ThemeProvider>
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Cpu, HardDrive, Wifi, Battery, Activity, Zap } from "lucide-react"

export function SystemMonitorApp() {
  const [cpuUsage, setCpuUsage] = useState(45)
  const [memoryUsage, setMemoryUsage] = useState(62)
  const [diskUsage, setDiskUsage] = useState(78)
  const [networkSpeed, setNetworkSpeed] = useState(125)
  const [batteryLevel, setBatteryLevel] = useState(87)
  const [uptime, setUptime] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate realistic system metrics
      setCpuUsage((prev) => Math.max(10, Math.min(95, prev + (Math.random() - 0.5) * 10)))
      setMemoryUsage((prev) => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 5)))
      setDiskUsage((prev) => Math.max(50, Math.min(95, prev + (Math.random() - 0.5) * 2)))
      setNetworkSpeed((prev) => Math.max(50, Math.min(500, prev + (Math.random() - 0.5) * 50)))
      setBatteryLevel((prev) => Math.max(15, Math.min(100, prev - 0.1))) // Slowly drain
      setUptime((prev) => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getUsageColor = (usage: number) => {
    if (usage < 50) return isDark ? "text-green-400" : "text-green-600"
    if (usage < 80) return isDark ? "text-yellow-400" : "text-yellow-600"
    return isDark ? "text-red-400" : "text-red-600"
  }

  const getProgressColor = (usage: number) => {
    if (usage < 50) return "bg-green-500"
    if (usage < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className={`p-6 space-y-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="text-center">
        <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>System Monitor</h1>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>Real-time portfolio performance metrics</p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              <Activity className="w-4 h-4" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Uptime</span>
                <span className="font-mono">{formatUptime(uptime)}</span>
              </div>
              <div className="flex justify-between">
                <span>OS Version</span>
                <span>DevOS v3.0</span>
              </div>
              <div className="flex justify-between">
                <span>Theme</span>
                <Badge variant="outline" className="text-xs">
                  {isDark ? "Dark" : "Light"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              <Zap className="w-4 h-4" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Apps Running</span>
                <span>6</span>
              </div>
              <div className="flex justify-between">
                <span>Windows Open</span>
                <span>3</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <Badge className="bg-green-500/20 text-green-400 text-xs">Optimal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage */}
      <div className="space-y-4">
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              <Cpu className="w-4 h-4" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Processing Power</span>
              <span className={`text-sm font-mono ${getUsageColor(cpuUsage)}`}>{cpuUsage.toFixed(1)}%</span>
            </div>
            <Progress value={cpuUsage} className="h-2" />
          </CardContent>
        </Card>

        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              <Activity className="w-4 h-4" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">RAM (8.2 GB / 16 GB)</span>
              <span className={`text-sm font-mono ${getUsageColor(memoryUsage)}`}>{memoryUsage.toFixed(1)}%</span>
            </div>
            <Progress value={memoryUsage} className="h-2" />
          </CardContent>
        </Card>

        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              <HardDrive className="w-4 h-4" />
              Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">SSD (390 GB / 500 GB)</span>
              <span className={`text-sm font-mono ${getUsageColor(diskUsage)}`}>{diskUsage.toFixed(1)}%</span>
            </div>
            <Progress value={diskUsage} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Network & Battery */}
      <div className="grid grid-cols-2 gap-4">
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              <Wifi className="w-4 h-4" />
              Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Speed</span>
                <span className="font-mono text-green-400">{networkSpeed.toFixed(0)} Mbps</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <Badge className="bg-green-500/20 text-green-400 text-xs">Connected</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              <Battery className="w-4 h-4" />
              Battery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Level</span>
                <span className={`font-mono ${getUsageColor(100 - batteryLevel)}`}>{batteryLevel.toFixed(0)}%</span>
              </div>
              <Progress value={batteryLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

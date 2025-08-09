"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Search,
  Power,
  Moon,
  Sun,
  Clock,
  Github,
  Linkedin,
  Coffee,
  Zap,
} from "lucide-react"

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenApp: (id: string, title: string, component: React.ReactNode) => void
}

export function StartMenu({ isOpen, onClose, onOpenApp }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  const apps = [
    { id: "about", title: "About Me", icon: User, category: "Personal", description: "Learn about my background" },
    { id: "projects", title: "Projects", icon: FolderOpen, category: "Work", description: "View my portfolio" },
    { id: "resume", title: "Resume", icon: FileText, category: "Personal", description: "Download my CV" },
    { id: "contact", title: "Contact", icon: Mail, category: "Personal", description: "Get in touch" },
    { id: "terminal", title: "Terminal", icon: Terminal, category: "Tools", description: "Command line interface" },
    {
      id: "ai-assistant",
      title: "AI Assistant",
      icon: Bot,
      category: "AI",
      description: "Chat with AI helper",
      isNew: true,
    },
    {
      id: "ai-tools",
      title: "AI Tools",
      icon: Brain,
      category: "AI",
      description: "AI-powered utilities",
      isNew: true,
    },
    {
      id: "system-monitor",
      title: "System Monitor",
      icon: Activity,
      category: "System",
      description: "Performance metrics",
    },
    { id: "achievements", title: "Achievements", icon: Trophy, category: "Fun", description: "Track your progress" },
    { id: "mini-games", title: "Mini Games", icon: Gamepad2, category: "Fun", description: "Play games" },
    { id: "settings", title: "Settings", icon: Settings, category: "System", description: "Customize your experience" },
  ]

  const recentFiles = [
    { name: "React Portfolio Project", icon: FolderOpen, time: "2 hours ago" },
    { name: "AI Assistant Implementation", icon: Bot, time: "1 day ago" },
    { name: "System Architecture Docs", icon: FileText, time: "3 days ago" },
    { name: "Performance Optimization", icon: Zap, time: "1 week ago" },
  ]

  const quickActions = [
    { id: "theme", title: "Toggle Theme", icon: isDark ? Sun : Moon, action: toggleTheme },
    { id: "github", title: "GitHub", icon: Github, action: () => window.open("https://github.com", "_blank") },
    { id: "linkedin", title: "LinkedIn", icon: Linkedin, action: () => window.open("https://linkedin.com", "_blank") },
    { id: "coffee", title: "Buy Me Coffee", icon: Coffee, action: () => alert("Thanks for the support! ☕") },
  ]

  const filteredApps = apps.filter(
    (app) =>
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = ["All", "Personal", "Work", "AI", "Tools", "System", "Fun"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categoryFilteredApps = filteredApps.filter(
    (app) => selectedCategory === "All" || app.category === selectedCategory,
  )

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0" style={{ zIndex: 2999 }} onClick={onClose} />

      {/* Start Menu */}
      <div
        className={`fixed bottom-16 left-4 w-96 h-[600px] rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 flex flex-col ${
          isDark
            ? "bg-gray-900/98 border-gray-600/60 shadow-black/60"
            : "bg-white/98 border-gray-200/60 shadow-black/30"
        }`}
        style={{ zIndex: 3000 }} // Highest z-index for start menu
      >
        {/* Header */}
        <div className={`p-4 border-b ${isDark ? "border-gray-600/60" : "border-gray-200/60"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                isDark ? "bg-purple-500/30 border border-purple-400/50" : "bg-blue-500/30 border border-blue-400/50"
              }`}
            >
              <User className={`w-5 h-5 ${isDark ? "text-purple-300" : "text-blue-700"}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>Your Name</h3>
              <p className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>Full Stack Developer</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-500"}`}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps, files, settings..."
              className={`pl-10 ${isDark ? "bg-gray-800/80 border-gray-600/60 text-gray-100 placeholder:text-gray-400" : "bg-white/80 border-gray-300/60 text-gray-900 placeholder:text-gray-500"}`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Category Tabs */}
          <div className={`p-3 border-b ${isDark ? "border-gray-600/60" : "border-gray-200/60"}`}>
            <div className="flex gap-1 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? isDark
                        ? "bg-purple-500/80 text-white hover:bg-purple-500/90"
                        : "bg-blue-500/80 text-white hover:bg-blue-500/90"
                      : isDark
                        ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700/60"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3">
              {/* Apps Grid */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  Applications
                  {searchQuery && ` (${categoryFilteredApps.length} results)`}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {categoryFilteredApps.map((app) => (
                    <Button
                      key={app.id}
                      variant="ghost"
                      className={`h-auto p-3 flex flex-col items-center gap-2 relative transition-all duration-200 ${
                        isDark
                          ? "hover:bg-gray-700/60 text-gray-200 hover:text-gray-100"
                          : "hover:bg-gray-100/60 text-gray-700 hover:text-gray-900"
                      }`}
                      onClick={() => {
                        onOpenApp(app.id, app.title, <div>App Component</div>)
                        onClose()
                      }}
                    >
                      {app.isNew && (
                        <Badge className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1 py-0.5">
                          New
                        </Badge>
                      )}
                      <app.icon className={`w-6 h-6 ${isDark ? "text-gray-200" : "text-gray-600"}`} />
                      <span className="text-xs text-center leading-tight">{app.title}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className={`my-3 ${isDark ? "bg-gray-600/60" : "bg-gray-200/60"}`} />

              {/* Recent Files */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  Recent Files
                </h4>
                <div className="space-y-2">
                  {recentFiles.map((file, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`w-full justify-start h-auto p-2 transition-all duration-200 ${
                        isDark
                          ? "hover:bg-gray-700/60 text-gray-200 hover:text-gray-100"
                          : "hover:bg-gray-100/60 text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <file.icon className={`w-4 h-4 mr-3 ${isDark ? "text-gray-300" : "text-gray-500"}`} />
                      <div className="flex-1 text-left">
                        <p className={`text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{file.name}</p>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>{file.time}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className={`my-3 ${isDark ? "bg-gray-600/60" : "bg-gray-200/60"}`} />

              {/* Quick Actions */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      onClick={action.action}
                      className={`justify-start transition-all duration-200 ${
                        isDark
                          ? "border-gray-600/60 hover:bg-gray-700/60 text-gray-200 hover:text-gray-100 hover:border-gray-500/60"
                          : "border-gray-300/60 hover:bg-gray-100/60 text-gray-700 hover:text-gray-900 hover:border-gray-400/60"
                      }`}
                    >
                      <action.icon className="w-4 h-4 mr-2" />
                      {action.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className={`p-3 border-t ${isDark ? "border-gray-600/60" : "border-gray-200/60"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-500"}`} />
              <span className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm("Are you sure you want to shut down the portfolio?")) {
                  window.close()
                }
              }}
              className={`text-xs transition-all duration-200 ${
                isDark
                  ? "text-gray-300 hover:text-red-400 hover:bg-red-500/20"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-500/10"
              }`}
            >
              <Power className="w-4 h-4 mr-1" />
              Shutdown
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

interface TerminalLine {
  type: "input" | "output" | "error"
  content: string
}

export function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "DevOS Terminal v3.0 - Enhanced Edition" },
    { type: "output", content: 'Type "help" for available commands.' },
    { type: "output", content: "" },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const commands = {
    help: () => [
      "Available commands:",
      "  help          - Show this help message",
      "  clear         - Clear the terminal",
      "  whoami        - Display user information",
      "  ls            - List portfolio sections",
      "  cat <file>    - Display file contents",
      "  skills        - Show technical skills",
      "  projects      - List recent projects",
      "  contact       - Show contact information",
      "  theme         - Display current theme info",
      "  easter-egg    - Find the hidden surprise!",
      "  matrix        - Enter the matrix...",
      "  hack          - Initiate hacking sequence",
      "",
    ],
    clear: () => {
      setLines([])
      return []
    },
    whoami: () => [
      "User: Your Name",
      "Role: Full Stack Developer",
      "Location: San Francisco, CA",
      "Status: Available for new opportunities",
      "Passion: Building amazing web experiences",
      `Current Theme: ${isDark ? "Dark Mode 🌙" : "Light Mode ☀️"}`,
      "",
    ],
    theme: () => [
      `Current Theme: ${isDark ? "Dark Mode" : "Light Mode"}`,
      `Color Scheme: ${isDark ? "Purple/Pink Gradient" : "Blue/Cyan Gradient"}`,
      "Theme can be changed in Settings app",
      `Tip: Try 'matrix' command in ${isDark ? "light" : "dark"} mode!`,
      "",
    ],
    hack: () => [
      "Initializing hacking sequence...",
      "Connecting to mainframe...",
      "Bypassing firewall...",
      "Accessing database...",
      "Downloading files...",
      "▓▓▓▓▓▓▓▓▓▓ 100%",
      "",
      "Just kidding! I'm a developer, not a hacker 😄",
      "But I can hack together some awesome code!",
      "",
    ],
    ls: () => [
      "drwxr-xr-x  about.txt",
      "drwxr-xr-x  projects/",
      "drwxr-xr-x  resume.pdf",
      "drwxr-xr-x  contact.txt",
      "drwxr-xr-x  skills.json",
      "drwxr-xr-x  settings.cfg",
      "",
    ],
    cat: (args: string[]) => {
      const file = args[0]
      switch (file) {
        case "about.txt":
          return [
            "Passionate developer with 3+ years of experience.",
            "I love creating intuitive user experiences and",
            "solving complex problems with clean, efficient code.",
            "",
          ]
        case "contact.txt":
          return [
            "Email: your.email@example.com",
            "Phone: (555) 123-4567",
            "LinkedIn: linkedin.com/in/yourusername",
            "GitHub: github.com/yourusername",
            "",
          ]
        case "settings.cfg":
          return [
            "# DevOS Configuration",
            `theme=${isDark ? "dark" : "light"}`,
            "animations=enabled",
            "sound=enabled",
            "",
          ]
        case "resume.pdf":
          return [
            "Opening resume.pdf...",
            "Error: Cannot display binary file in terminal.",
            "Hint: Try opening the Resume app instead!",
            "",
          ]
        default:
          return [`cat: ${file}: No such file or directory`, ""]
      }
    },
    skills: () => [
      "Technical Skills:",
      "├── Frontend: React, Next.js, TypeScript, Tailwind CSS",
      "├── Backend: Node.js, Python, Express, FastAPI",
      "├── Database: PostgreSQL, MongoDB, Redis",
      "├── Cloud: AWS, Vercel, Docker",
      "└── Tools: Git, VS Code, Figma",
      "",
    ],
    projects: () => [
      "Recent Projects:",
      "1. E-Commerce Platform - React, Node.js, PostgreSQL",
      "2. Task Management App - Next.js, TypeScript, Prisma",
      "3. Weather Dashboard - Vue.js, Chart.js, OpenWeather API",
      "",
      'Use "ls projects/" for more details.',
      "",
    ],
    contact: () => [
      "Let's connect!",
      "📧 your.email@example.com",
      "📱 (555) 123-4567",
      "🌐 yourportfolio.com",
      "💼 linkedin.com/in/yourusername",
      "",
    ],
    "easter-egg": () => [
      "🎉 Congratulations! You found the easter egg!",
      "🥚 Here's a secret: I once debugged a problem for 6 hours",
      "   only to realize I had a typo in a variable name.",
      '🤦‍♂️ The variable was "lenght" instead of "length".',
      "💡 Always double-check your spelling!",
      `💫 Pro tip: The ${isDark ? "light" : "dark"} theme looks amazing too!`,
      "",
    ],
    matrix: () => {
      const matrixChars = isDark ? "01" : "アイウエオカキクケコ"
      const lines = []
      for (let i = 0; i < 8; i++) {
        let line = ""
        for (let j = 0; j < 40; j++) {
          line += matrixChars[Math.floor(Math.random() * matrixChars.length)]
        }
        lines.push(line)
      }
      lines.push("")
      lines.push("Welcome to the Matrix, Neo.")
      lines.push("Unfortunately, no one can be told what the Matrix is.")
      lines.push("You have to see it for yourself.")
      lines.push("")
      lines.push(`The Matrix is ${isDark ? "darker" : "brighter"} than you think...`)
      lines.push("")
      return lines
    },
  }

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    // Add input to history
    setCommandHistory((prev) => [...prev, trimmedInput])
    setHistoryIndex(-1)

    // Add input line
    setLines((prev) => [...prev, { type: "input", content: `$ ${trimmedInput}` }])

    // Parse command
    const [command, ...args] = trimmedInput.split(" ")

    let output: string[] = []

    if (command in commands) {
      const commandFunc = commands[command as keyof typeof commands]
      if (typeof commandFunc === "function") {
        output = commandFunc(args)
      }
    } else {
      output = [`Command not found: ${command}`, 'Type "help" for available commands.', ""]
    }

    // Add output lines
    output.forEach((line) => {
      setLines((prev) => [...prev, { type: "output", content: line }])
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput)
      setCurrentInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput("")
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      className={`h-full font-mono text-sm p-4 overflow-hidden flex flex-col transition-all duration-300 ${
        isDark ? "bg-black text-green-400" : "bg-gray-900 text-cyan-400"
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={terminalRef} className="flex-1 overflow-y-auto space-y-1">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`transition-colors duration-300 ${
              line.type === "input"
                ? isDark
                  ? "text-yellow-400"
                  : "text-orange-400"
                : line.type === "error"
                  ? "text-red-400"
                  : (isDark ? "text-green-400" : "text-cyan-400")
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Current input line */}
        <div className={`flex transition-colors duration-300 ${isDark ? "text-yellow-400" : "text-orange-400"}`}>
          <span>$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent outline-none transition-colors duration-300 ${
              isDark ? "text-green-400" : "text-cyan-400"
            }`}
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

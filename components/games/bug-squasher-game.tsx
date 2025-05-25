"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Play, Pause, RotateCcw, Bug, Zap, Target, Clock } from "lucide-react"

interface BugType {
  id: number
  x: number
  y: number
  type: "syntax" | "logic" | "runtime" | "memory"
  speed: number
  points: number
  emoji: string
  name: string
}

export function BugSquasherGame() {
  const [bugs, setBugs] = useState<BugType[]>([])
  const [score, setScore] = useState(0)
  const [gameRunning, setGameRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [level, setLevel] = useState(1)
  const [bugsSquashed, setBugsSquashed] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const bugTypes = [
    { type: "syntax", emoji: "🐛", name: "Syntax Error", points: 10, speed: 2 },
    { type: "logic", emoji: "🪲", name: "Logic Bug", points: 15, speed: 3 },
    { type: "runtime", emoji: "🦗", name: "Runtime Error", points: 20, speed: 4 },
    { type: "memory", emoji: "🕷️", name: "Memory Leak", points: 25, speed: 1.5 },
  ]

  const spawnBug = useCallback(() => {
    const bugType = bugTypes[Math.floor(Math.random() * bugTypes.length)]
    const newBug: BugType = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: 100, // Start from bottom
      type: bugType.type as any,
      speed: bugType.speed + (level - 1) * 0.5,
      points: bugType.points,
      emoji: bugType.emoji,
      name: bugType.name,
    }
    setBugs((prev) => [...prev, newBug])
  }, [level])

  const startGame = () => {
    setBugs([])
    setScore(0)
    setBugsSquashed(0)
    setLevel(1)
    setTimeLeft(60)
    setGameRunning(true)
    setGameOver(false)
  }

  const resetGame = () => {
    setBugs([])
    setScore(0)
    setBugsSquashed(0)
    setLevel(1)
    setTimeLeft(60)
    setGameRunning(false)
    setGameOver(false)
  }

  const squashBug = (bugId: number) => {
    setBugs((prev) => {
      const bug = prev.find((b) => b.id === bugId)
      if (bug) {
        setScore((s) => s + bug.points)
        setBugsSquashed((c) => c + 1)
      }
      return prev.filter((b) => b.id !== bugId)
    })
  }

  // Game loop
  useEffect(() => {
    if (!gameRunning || gameOver) return

    const gameInterval = setInterval(() => {
      // Move bugs up
      setBugs((prev) =>
        prev
          .map((bug) => ({
            ...bug,
            y: bug.y - bug.speed,
          }))
          .filter((bug) => bug.y > -10),
      ) // Remove bugs that reached the top

      // Spawn new bugs
      if (Math.random() < 0.3 + (level - 1) * 0.1) {
        spawnBug()
      }

      // Update timer
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameRunning(false)
          setGameOver(true)
          return 0
        }
        return prev - 1
      })

      // Level up
      if (bugsSquashed > 0 && bugsSquashed % 10 === 0) {
        setLevel((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(gameInterval)
  }, [gameRunning, gameOver, level, bugsSquashed, spawnBug])

  const getBugColor = (type: string) => {
    switch (type) {
      case "syntax":
        return isDark ? "text-red-400" : "text-red-500"
      case "logic":
        return isDark ? "text-yellow-400" : "text-yellow-500"
      case "runtime":
        return isDark ? "text-orange-400" : "text-orange-500"
      case "memory":
        return isDark ? "text-purple-400" : "text-purple-500"
      default:
        return isDark ? "text-gray-400" : "text-gray-500"
    }
  }

  const getPerformanceRating = () => {
    if (score >= 500) return { rating: "Expert Debugger", color: "text-purple-500" }
    if (score >= 300) return { rating: "Senior Developer", color: "text-blue-500" }
    if (score >= 150) return { rating: "Mid-level Dev", color: "text-green-500" }
    if (score >= 50) return { rating: "Junior Dev", color: "text-yellow-500" }
    return { rating: "Intern", color: "text-gray-500" }
  }

  return (
    <div className={`p-6 h-full ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>Bug Squasher</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Click to squash bugs before they escape!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-xs text-gray-500">Score</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Bug className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{bugsSquashed}</div>
              <div className="text-xs text-gray-500">Squashed</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{level}</div>
              <div className="text-xs text-gray-500">Level</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{timeLeft}</div>
              <div className="text-xs text-gray-500">Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Area */}
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardContent className="p-0">
            <div
              className={`relative w-full h-96 overflow-hidden ${isDark ? "bg-gray-900" : "bg-gray-100"} rounded-lg`}
              style={{ cursor: gameRunning ? "crosshair" : "default" }}
            >
              {!gameRunning && !gameOver && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🐛</div>
                    <h3 className="text-xl font-bold mb-2">Ready to debug?</h3>
                    <p className="text-gray-500 mb-6">Click bugs to squash them before they escape!</p>
                    <Button onClick={startGame} className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Start Debugging
                    </Button>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className={`text-center p-6 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
                    <div className="text-4xl mb-4">🏆</div>
                    <h2 className="text-xl font-bold mb-2">Debugging Session Complete!</h2>
                    <div className="space-y-2 mb-4">
                      <p>
                        Final Score: <span className="font-bold text-green-500">{score}</span>
                      </p>
                      <p>
                        Bugs Squashed: <span className="font-bold text-red-500">{bugsSquashed}</span>
                      </p>
                      <p>
                        Level Reached: <span className="font-bold text-blue-500">{level}</span>
                      </p>
                    </div>
                    <Badge className={`${getPerformanceRating().color} mb-4`}>{getPerformanceRating().rating}</Badge>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={startGame}>Play Again</Button>
                      <Button onClick={resetGame} variant="outline">
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bugs */}
              {bugs.map((bug) => (
                <div
                  key={bug.id}
                  className="absolute cursor-pointer transform hover:scale-110 transition-transform duration-100"
                  style={{
                    left: `${bug.x}%`,
                    bottom: `${bug.y}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                  onClick={() => squashBug(bug.id)}
                  title={`${bug.name} - ${bug.points} points`}
                >
                  <div className="relative">
                    <div className="text-3xl animate-bounce">{bug.emoji}</div>
                    <div
                      className={`absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold ${getBugColor(bug.type)}`}
                    >
                      {bug.points}
                    </div>
                  </div>
                </div>
              ))}

              {/* Code background pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="font-mono text-xs leading-relaxed p-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i}>
                      {i % 4 === 0 && "function debugCode() {"}
                      {i % 4 === 1 && "  const bugs = findBugs();"}
                      {i % 4 === 2 && "  bugs.forEach(bug => squash(bug));"}
                      {i % 4 === 3 && "}"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bug Types Legend */}
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader>
            <CardTitle className="text-lg">Bug Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bugTypes.map((bugType) => (
                <div key={bugType.type} className="flex items-center gap-2">
                  <span className="text-2xl">{bugType.emoji}</span>
                  <div>
                    <div className="font-medium text-sm">{bugType.name}</div>
                    <div className="text-xs text-gray-500">{bugType.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {gameRunning ? (
            <Button onClick={() => setGameRunning(false)} variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          ) : !gameOver ? (
            <Button onClick={() => setGameRunning(true)} disabled={timeLeft === 0}>
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          ) : null}
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

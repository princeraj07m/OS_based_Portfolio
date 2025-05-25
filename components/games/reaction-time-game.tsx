"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Play, Zap, Target, Clock, AlertTriangle } from "lucide-react"

export function ReactionTimeGame() {
  const [gameState, setGameState] = useState<"waiting" | "ready" | "go" | "result" | "false-start">("waiting")
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [attempts, setAttempts] = useState<number[]>([])
  const [startTime, setStartTime] = useState<number>(0)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const scenarios = [
    { text: "🚨 PRODUCTION IS DOWN!", color: "bg-red-500", description: "Critical system failure detected!" },
    { text: "🐛 BUG SPOTTED!", color: "bg-orange-500", description: "Null pointer exception in main thread!" },
    { text: "⚡ DEPLOY NOW!", color: "bg-blue-500", description: "Hotfix ready for production deployment!" },
    { text: "🔥 SERVER OVERLOAD!", color: "bg-red-600", description: "CPU usage at 99%, immediate action required!" },
    { text: "💾 DATABASE CRASH!", color: "bg-purple-500", description: "Primary database connection lost!" },
    { text: "🚀 LAUNCH SEQUENCE!", color: "bg-green-500", description: "New feature deployment initiated!" },
    { text: "⚠️ SECURITY BREACH!", color: "bg-yellow-500", description: "Unauthorized access attempt detected!" },
    { text: "🔧 MERGE CONFLICT!", color: "bg-indigo-500", description: "Git merge conflict in main branch!" },
  ]

  const [currentScenario, setCurrentScenario] = useState(scenarios[0])

  const startGame = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    setGameState("ready")
    setReactionTime(null)

    // Random scenario
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]
    setCurrentScenario(randomScenario)

    // Random delay between 2-6 seconds
    const delay = Math.random() * 4000 + 2000

    const id = setTimeout(() => {
      setGameState("go")
      setStartTime(Date.now())
    }, delay)

    setTimeoutId(id)
  }

  const handleClick = () => {
    if (gameState === "ready") {
      // False start
      setGameState("false-start")
      if (timeoutId) {
        clearTimeout(timeoutId)
        setTimeoutId(null)
      }
    } else if (gameState === "go") {
      // Valid reaction
      const endTime = Date.now()
      const reaction = endTime - startTime
      setReactionTime(reaction)
      setGameState("result")

      // Update attempts and best time
      const newAttempts = [...attempts, reaction]
      setAttempts(newAttempts)

      if (!bestTime || reaction < bestTime) {
        setBestTime(reaction)
      }
    }
  }

  const resetGame = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setGameState("waiting")
    setReactionTime(null)
    setAttempts([])
    setBestTime(null)
  }

  const getReactionRating = (time: number) => {
    if (time < 200) return { rating: "Lightning Fast", color: "text-purple-500", emoji: "⚡" }
    if (time < 250) return { rating: "Excellent", color: "text-blue-500", emoji: "🚀" }
    if (time < 300) return { rating: "Good", color: "text-green-500", emoji: "✅" }
    if (time < 400) return { rating: "Average", color: "text-yellow-500", emoji: "👍" }
    return { rating: "Needs Practice", color: "text-red-500", emoji: "🐌" }
  }

  const getAverageTime = () => {
    if (attempts.length === 0) return 0
    return Math.round(attempts.reduce((sum, time) => sum + time, 0) / attempts.length)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && (gameState === "ready" || gameState === "go")) {
        e.preventDefault()
        handleClick()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState, startTime])

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return (
    <div className={`p-6 h-full ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            Developer Reflexes
          </h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            How fast can you react to production emergencies?
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{reactionTime ? `${reactionTime}ms` : "--"}</div>
              <div className="text-xs text-gray-500">Last Time</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{bestTime ? `${bestTime}ms` : "--"}</div>
              <div className="text-xs text-gray-500">Best Time</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{attempts.length > 0 ? `${getAverageTime()}ms` : "--"}</div>
              <div className="text-xs text-gray-500">Average</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Area */}
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardContent className="p-0">
            <div
              ref={gameAreaRef}
              className={`relative w-full h-80 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-lg ${
                gameState === "waiting"
                  ? isDark
                    ? "bg-gray-700"
                    : "bg-gray-200"
                  : gameState === "ready"
                    ? isDark
                      ? "bg-red-900"
                      : "bg-red-100"
                    : gameState === "go"
                      ? `${currentScenario.color} animate-pulse`
                      : gameState === "false-start"
                        ? isDark
                          ? "bg-orange-900"
                          : "bg-orange-100"
                        : isDark
                          ? "bg-green-900"
                          : "bg-green-100"
              }`}
              onClick={handleClick}
            >
              {gameState === "waiting" && (
                <div className="text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-2">Test Your Developer Reflexes</h3>
                  <p className="text-gray-500 mb-6">Click when you see the emergency alert!</p>
                  <Button onClick={startGame} className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Start Test
                  </Button>
                </div>
              )}

              {gameState === "ready" && (
                <div className="text-center">
                  <div className="text-6xl mb-4">⏳</div>
                  <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">Get Ready...</h3>
                  <p className="text-gray-600 dark:text-gray-400">Wait for the emergency alert!</p>
                  <p className="text-sm text-gray-500 mt-4">Don't click too early or you'll get a false start</p>
                </div>
              )}

              {gameState === "go" && (
                <div className="text-center text-white animate-bounce">
                  <div className="text-6xl mb-4">🚨</div>
                  <h3 className="text-2xl font-bold mb-2">{currentScenario.text}</h3>
                  <p className="text-lg">{currentScenario.description}</p>
                  <p className="text-sm mt-4 opacity-90">CLICK NOW! ⚡</p>
                </div>
              )}

              {gameState === "false-start" && (
                <div className="text-center">
                  <div className="text-6xl mb-4">❌</div>
                  <h3 className="text-xl font-bold mb-2 text-orange-600 dark:text-orange-400">False Start!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">You clicked too early. Wait for the alert!</p>
                  <Button onClick={startGame} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}

              {gameState === "result" && reactionTime && (
                <div className="text-center">
                  <div className="text-6xl mb-4">{getReactionRating(reactionTime).emoji}</div>
                  <h3 className="text-xl font-bold mb-2">{reactionTime}ms</h3>
                  <Badge className={`${getReactionRating(reactionTime).color} mb-4 text-lg px-4 py-2`}>
                    {getReactionRating(reactionTime).rating}
                  </Badge>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>Scenario: {currentScenario.text}</p>
                    <p>Attempts: {attempts.length}</p>
                    {bestTime && <p>Personal Best: {bestTime}ms</p>}
                  </div>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button onClick={startGame}>Test Again</Button>
                    <Button onClick={resetGame} variant="outline">
                      Reset Stats
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Attempts */}
        {attempts.length > 0 && (
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardHeader>
              <CardTitle className="text-lg">Recent Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {attempts.slice(-10).map((time, index) => (
                  <div
                    key={index}
                    className={`text-center p-2 rounded ${
                      time === bestTime
                        ? isDark
                          ? "bg-green-500/20 text-green-300"
                          : "bg-green-100 text-green-800"
                        : isDark
                          ? "bg-gray-700"
                          : "bg-gray-100"
                    }`}
                  >
                    <div className="text-sm font-bold">{time}ms</div>
                    <div className="text-xs text-gray-500">
                      #{attempts.length - attempts.slice(-10).length + index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium mb-1">How to Play:</div>
                <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Click "Start Test" and wait for the emergency alert</li>
                  <li>• React as quickly as possible when you see the alert</li>
                  <li>• Don't click too early or you'll get a false start</li>
                  <li>• Use spacebar or click to react</li>
                  <li>• Average human reaction time is 200-300ms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

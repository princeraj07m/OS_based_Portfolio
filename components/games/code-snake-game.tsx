"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Play, Pause, RotateCcw, Trophy } from "lucide-react"

interface Position {
  x: number
  y: number
}

interface Food {
  x: number
  y: number
  type: "function" | "variable" | "class" | "method"
  name: string
  points: number
}

export function CodeSnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Food>({ x: 15, y: 15, type: "function", name: "console.log()", points: 10 })
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 })
  const [gameRunning, setGameRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState(1)
  const [speed, setSpeed] = useState(200)
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const BOARD_SIZE = 20

  const codeItems = [
    { type: "function", name: "console.log()", points: 10 },
    { type: "variable", name: "const data", points: 15 },
    { type: "class", name: "class User", points: 25 },
    { type: "method", name: ".map()", points: 20 },
    { type: "function", name: "useState()", points: 30 },
    { type: "variable", name: "let result", points: 12 },
    { type: "method", name: ".filter()", points: 18 },
    { type: "class", name: "interface Props", points: 22 },
  ]

  const generateFood = useCallback(() => {
    const newFood = codeItems[Math.floor(Math.random() * codeItems.length)]
    return {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
      ...newFood,
    }
  }, [])

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setDirection({ x: 0, y: -1 })
    setFood(generateFood())
    setScore(0)
    setGameOver(false)
    setLevel(1)
    setSpeed(200)
    setGameRunning(false)
  }

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true)
        setGameRunning(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setGameRunning(false)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + food.points)
        setFood(generateFood())

        // Level up every 100 points
        const newScore = score + food.points
        const newLevel = Math.floor(newScore / 100) + 1
        if (newLevel > level) {
          setLevel(newLevel)
          setSpeed((prev) => Math.max(50, prev - 20))
        }
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameRunning, gameOver, score, level, generateFood])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, speed)
    return () => clearInterval(gameInterval)
  }, [moveSnake, speed])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return

      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 })
          break
        case " ":
          e.preventDefault()
          setGameRunning(!gameRunning)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, gameRunning])

  const getFoodColor = (type: string) => {
    switch (type) {
      case "function":
        return isDark ? "bg-blue-400" : "bg-blue-500"
      case "variable":
        return isDark ? "bg-green-400" : "bg-green-500"
      case "class":
        return isDark ? "bg-purple-400" : "bg-purple-500"
      case "method":
        return isDark ? "bg-orange-400" : "bg-orange-500"
      default:
        return isDark ? "bg-gray-400" : "bg-gray-500"
    }
  }

  return (
    <div className={`p-6 h-full ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`text-xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>Code Snake</h1>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Eat code snippets to grow your snake!
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setGameRunning(!gameRunning)}
              disabled={gameOver}
              className="flex items-center gap-2"
            >
              {gameRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {gameRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-500">{score}</div>
              <div className="text-xs text-gray-500">Score</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-500">{level}</div>
              <div className="text-xs text-gray-500">Level</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-purple-500">{snake.length}</div>
              <div className="text-xs text-gray-500">Length</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Board */}
        <Card className={`flex-1 ${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}`}>
          <CardContent className="p-4 h-full">
            <div className="relative w-full h-full max-w-md mx-auto">
              <div
                className={`grid gap-1 ${isDark ? "bg-gray-900" : "bg-gray-100"} p-2 rounded-lg`}
                style={{
                  gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                  aspectRatio: "1",
                }}
              >
                {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                  const x = index % BOARD_SIZE
                  const y = Math.floor(index / BOARD_SIZE)
                  const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
                  const isHead = snake[0]?.x === x && snake[0]?.y === y
                  const isFood = food.x === x && food.y === y

                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded-sm transition-all duration-100 ${
                        isSnake
                          ? isHead
                            ? isDark
                              ? "bg-green-400 shadow-lg"
                              : "bg-green-500 shadow-lg"
                            : isDark
                              ? "bg-green-600"
                              : "bg-green-700"
                          : isFood
                            ? `${getFoodColor(food.type)} shadow-lg animate-pulse`
                            : isDark
                              ? "bg-gray-800"
                              : "bg-gray-200"
                      }`}
                    />
                  )
                })}
              </div>

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <div className={`text-center p-6 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                    <h2 className="text-xl font-bold mb-2">Game Over!</h2>
                    <p className="text-gray-500 mb-4">Final Score: {score}</p>
                    <Button onClick={resetGame}>Play Again</Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Current Food Info */}
        <div className="mt-4">
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${getFoodColor(food.type)}`} />
                  <span className="font-mono text-sm">{food.name}</span>
                  <Badge variant="outline">{food.type}</Badge>
                </div>
                <span className="text-sm font-bold text-green-500">+{food.points} pts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="mt-4 text-center">
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Use arrow keys to move • Space to pause • Eat code to grow!
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Play, RotateCcw, Zap, Target, Clock } from "lucide-react"

export function TypingChallengeGame() {
  const [currentText, setCurrentText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [errors, setErrors] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const codeSnippets = [
    "const handleSubmit = async (e) => { e.preventDefault(); const data = await fetch('/api/users'); }",
    "function fibonacci(n) { return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2); }",
    "const users = data.filter(user => user.active).map(user => ({ ...user, status: 'online' }));",
    "import React, { useState, useEffect } from 'react'; export default function Component() {}",
    "const debounce = (func, delay) => { let timeoutId; return (...args) => { clearTimeout(timeoutId); timeoutId = setTimeout(() => func.apply(null, args), delay); }; };",
    "interface User { id: number; name: string; email: string; createdAt: Date; }",
    "const [state, setState] = useState({ loading: false, data: null, error: null });",
    "try { const response = await api.post('/users', userData); return response.data; } catch (error) { console.error(error); }",
  ]

  const startGame = () => {
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    setCurrentText(randomSnippet)
    setUserInput("")
    setGameStarted(true)
    setGameFinished(false)
    setStartTime(Date.now())
    setCurrentIndex(0)
    setErrors(0)
    setTimeElapsed(0)
    inputRef.current?.focus()
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameFinished(false)
    setUserInput("")
    setCurrentIndex(0)
    setErrors(0)
    setTimeElapsed(0)
    setWpm(0)
    setAccuracy(100)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !gameFinished) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        setTimeElapsed(elapsed)

        if (userInput.length > 0) {
          const wordsTyped = userInput.length / 5
          const minutes = elapsed / 60
          setWpm(Math.round(wordsTyped / minutes))
        }
      }, 100)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameFinished, startTime, userInput.length])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!gameStarted || gameFinished) return

    const value = e.target.value
    setUserInput(value)

    // Check for errors
    let errorCount = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++
      }
    }
    setErrors(errorCount)

    // Calculate accuracy
    const totalChars = value.length
    const correctChars = totalChars - errorCount
    const accuracyPercent = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100
    setAccuracy(accuracyPercent)

    // Check if finished
    if (value === currentText) {
      setGameFinished(true)
      const finalTime = (Date.now() - startTime) / 1000
      const finalWpm = Math.round(currentText.length / 5 / (finalTime / 60))
      setWpm(finalWpm)
    }

    setCurrentIndex(value.length)
  }

  const getCharacterClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === currentText[index]
        ? isDark
          ? "bg-green-500/30 text-green-300"
          : "bg-green-200 text-green-800"
        : isDark
          ? "bg-red-500/30 text-red-300"
          : "bg-red-200 text-red-800"
    }
    if (index === currentIndex) {
      return isDark ? "bg-blue-500/50 text-blue-300" : "bg-blue-200 text-blue-800"
    }
    return isDark ? "text-gray-400" : "text-gray-600"
  }

  const getDifficultyLevel = () => {
    if (wpm >= 80) return { level: "Expert", color: "text-purple-500" }
    if (wpm >= 60) return { level: "Advanced", color: "text-blue-500" }
    if (wpm >= 40) return { level: "Intermediate", color: "text-green-500" }
    if (wpm >= 20) return { level: "Beginner", color: "text-yellow-500" }
    return { level: "Learning", color: "text-gray-500" }
  }

  return (
    <div className={`p-6 h-full ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            Dev Typing Challenge
          </h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Test your typing speed with real code snippets</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{wpm}</div>
              <div className="text-xs text-gray-500">WPM</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{accuracy}%</div>
              <div className="text-xs text-gray-500">Accuracy</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{timeElapsed.toFixed(1)}s</div>
              <div className="text-xs text-gray-500">Time</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <div className={`text-lg font-bold ${getDifficultyLevel().color}`}>{getDifficultyLevel().level}</div>
              <div className="text-xs text-gray-500">Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        {gameStarted && (
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-500">
                  {currentIndex} / {currentText.length} characters
                </span>
              </div>
              <Progress value={(currentIndex / currentText.length) * 100} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Text Display */}
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader>
            <CardTitle className="text-lg">Code to Type</CardTitle>
          </CardHeader>
          <CardContent>
            {currentText ? (
              <div className="font-mono text-lg leading-relaxed p-4 rounded-lg bg-gray-100 dark:bg-gray-900 min-h-[120px]">
                {currentText.split("").map((char, index) => (
                  <span key={index} className={`${getCharacterClass(index)} transition-colors duration-100`}>
                    {char}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">Click "Start Game" to begin typing challenge</div>
            )}
          </CardContent>
        </Card>

        {/* Input */}
        {gameStarted && !gameFinished && (
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                className={`w-full p-4 font-mono text-lg rounded-lg border-2 transition-colors ${
                  isDark
                    ? "bg-gray-900 border-gray-600 text-gray-100 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                } focus:outline-none`}
                disabled={gameFinished}
              />
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {gameFinished && (
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardHeader>
              <CardTitle className="text-center text-xl">🎉 Challenge Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-blue-500">{wpm}</div>
                  <div className="text-sm text-gray-500">Words per minute</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
                  <div className="text-sm text-gray-500">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">{timeElapsed.toFixed(1)}s</div>
                  <div className="text-sm text-gray-500">Time taken</div>
                </div>
              </div>
              <Badge className={`${getDifficultyLevel().color} text-lg px-4 py-2`}>
                {getDifficultyLevel().level} Typist
              </Badge>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!gameStarted || gameFinished ? (
            <Button onClick={startGame} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              {gameFinished ? "Try Again" : "Start Game"}
            </Button>
          ) : null}
          {gameStarted && (
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

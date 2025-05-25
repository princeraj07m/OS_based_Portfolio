"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Zap, Target, Brain, Trophy, Play, ArrowLeft } from 'lucide-react'

// Import individual game components
import { CodeSnakeGame } from "@/components/games/code-snake-game"
import { TypingChallengeGame } from "@/components/games/typing-challenge-game"
import { MemoryMatchGame } from "@/components/games/memory-match-game"
import { BugSquasherGame } from "@/components/games/bug-squasher-game"
import { AlgorithmQuizGame } from "@/components/games/algorithm-quiz-game"
import { ReactionTimeGame } from "@/components/games/reaction-time-game"

interface Game {
  id: string
  title: string
  description: string
  icon: any
  difficulty: "Easy" | "Medium" | "Hard"
  category: "Arcade" | "Puzzle" | "Skill" | "Strategy"
  highScore?: number
  isNew?: boolean
  component: React.ComponentType<any>
}

export function MiniGamesApp() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const games: Game[] = [
    {
      id: "snake",
      title: "Code Snake",
      description: "Classic snake game with programming twist - eat functions to grow!",
      icon: Target,
      difficulty: "Easy",
      category: "Arcade",
      highScore: 1250,
      component: CodeSnakeGame,
    },
    {
      id: "typing-test",
      title: "Dev Typing Challenge",
      description: "Test your typing speed with real code snippets and programming terms",
      icon: Zap,
      difficulty: "Medium",
      category: "Skill",
      highScore: 87,
      component: TypingChallengeGame,
    },
    {
      id: "memory-match",
      title: "Tech Stack Memory",
      description: "Match programming languages, frameworks, and tools in this memory game",
      icon: Brain,
      difficulty: "Medium",
      category: "Puzzle",
      highScore: 45,
      component: MemoryMatchGame,
    },
    {
      id: "bug-squasher",
      title: "Bug Squasher",
      description: "Click to squash bugs before they crash your system!",
      icon: Target,
      difficulty: "Hard",
      category: "Arcade",
      isNew: true,
      component: BugSquasherGame,
    },
    {
      id: "algorithm-quiz",
      title: "Algorithm Quiz",
      description: "Test your knowledge of algorithms and data structures",
      icon: Brain,
      difficulty: "Hard",
      category: "Strategy",
      highScore: 78,
      component: AlgorithmQuizGame,
    },
    {
      id: "reaction-time",
      title: "Developer Reflexes",
      description: "How fast can you react to production bugs?",
      icon: Zap,
      difficulty: "Easy",
      category: "Skill",
      highScore: 245,
      isNew: true,
      component: ReactionTimeGame,
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return isDark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-800"
      case "Medium":
        return isDark ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-800"
      case "Hard":
        return isDark ? "bg-red-500/20 text-red-300" : "bg-red-100 text-red-800"
      default:
        return isDark ? "bg-gray-500/20 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Arcade":
        return isDark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-800"
      case "Puzzle":
        return isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-800"
      case "Skill":
        return isDark ? "bg-orange-500/20 text-orange-300" : "bg-orange-100 text-orange-800"
      case "Strategy":
        return isDark ? "bg-teal-500/20 text-teal-300" : "bg-teal-100 text-teal-800"
      default:
        return isDark ? "bg-gray-500/20 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  if (selectedGame) {
    const GameComponent = selectedGame.component
    return (
      <div className={`h-full flex flex-col ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        {/* Game Header */}
        <div className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedGame(null)}
              className={`${isDark ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <h1 className={`text-lg font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              {selectedGame.title}
            </h1>
          </div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(selectedGame.difficulty)}>{selectedGame.difficulty}</Badge>
            <Badge className={getCategoryColor(selectedGame.category)}>{selectedGame.category}</Badge>
            {selectedGame.isNew && (
              <Badge className={isDark ? "bg-pink-500/20 text-pink-300" : "bg-pink-100 text-pink-800"}>New!</Badge>
            )}
          </div>
        </div>

        {/* Game Content */}
        <div className="flex-1 overflow-hidden">
          <GameComponent />
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 space-y-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="text-center">
        <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>Mini Games Arcade</h1>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>Fun games to test your developer skills</p>
      </div>

      {/* Stats Overview */}
      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            <Trophy className="w-5 h-5" />
            Your Gaming Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-500">6</div>
              <div className="text-sm text-gray-500">Games Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">3</div>
              <div className="text-sm text-gray-500">High Scores Set</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">1,705</div>
              <div className="text-sm text-gray-500">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Games Grid */}
      <div className="grid grid-cols-2 gap-4">
        {games.map((game) => (
          <Card
            key={game.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              isDark
                ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                : "bg-white/80 border-gray-200 hover:bg-white"
            }`}
            onClick={() => setSelectedGame(game)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <game.icon className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
                  <CardTitle className="text-sm">{game.title}</CardTitle>
                </div>
                {game.isNew && (
                  <Badge className={isDark ? "bg-pink-500/20 text-pink-300" : "bg-pink-100 text-pink-800"}>New!</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-xs mb-3 line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {game.description}
              </p>

              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
                  <Badge variant="outline" className={getCategoryColor(game.category)}>
                    {game.category}
                  </Badge>
                </div>
              </div>

              {game.highScore && <div className="text-xs text-yellow-500">High Score: {game.highScore}</div>}

              <Button size="sm" className="w-full mt-3">
                <Play className="w-3 h-3 mr-2" />
                Play Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Play, RotateCcw, Trophy, Clock, Target } from "lucide-react"

interface MemoryCard {
  id: number
  tech: string
  icon: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryMatchGame() {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const techStack = [
    { tech: "React", icon: "⚛️" },
    { tech: "TypeScript", icon: "🔷" },
    { tech: "Next.js", icon: "▲" },
    { tech: "Node.js", icon: "🟢" },
    { tech: "Python", icon: "🐍" },
    { tech: "JavaScript", icon: "💛" },
    { tech: "Vue.js", icon: "💚" },
    { tech: "Angular", icon: "🔺" },
  ]

  const initializeGame = () => {
    const shuffledTech = [...techStack, ...techStack]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        tech: item.tech,
        icon: item.icon,
        isFlipped: false,
        isMatched: false,
      }))

    setCards(shuffledTech)
    setFlippedCards([])
    setMatches(0)
    setMoves(0)
    setGameStarted(true)
    setGameWon(false)
    setTimeElapsed(0)
    setStartTime(Date.now())
  }

  const resetGame = () => {
    setCards([])
    setFlippedCards([])
    setMatches(0)
    setMoves(0)
    setGameStarted(false)
    setGameWon(false)
    setTimeElapsed(0)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTimeElapsed((Date.now() - startTime) / 1000)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameWon, startTime])

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return
    if (flippedCards.includes(cardId)) return
    if (cards[cardId].isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1)

      const [firstCard, secondCard] = newFlippedCards.map((id) => cards[id])

      if (firstCard.tech === secondCard.tech) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (newFlippedCards.includes(card.id) ? { ...card, isMatched: true } : card)),
          )
          setMatches((prev) => prev + 1)
          setFlippedCards([])

          // Check if game is won
          if (matches + 1 === techStack.length) {
            setGameWon(true)
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (newFlippedCards.includes(card.id) ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const getScore = () => {
    if (!gameWon) return 0
    const timeBonus = Math.max(0, 100 - Math.floor(timeElapsed))
    const moveBonus = Math.max(0, 50 - moves)
    return matches * 100 + timeBonus + moveBonus
  }

  return (
    <div className={`p-6 h-full ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>Tech Stack Memory</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Match programming languages and frameworks</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{matches}</div>
              <div className="text-xs text-gray-500">Matches</div>
            </CardContent>
          </Card>
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{moves}</div>
              <div className="text-xs text-gray-500">Moves</div>
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
              <Trophy className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{getScore()}</div>
              <div className="text-xs text-gray-500">Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Board */}
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardContent className="p-6">
            {gameStarted ? (
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      card.isFlipped || card.isMatched
                        ? isDark
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                          : "bg-gradient-to-br from-blue-400 to-purple-500 text-white"
                        : isDark
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                    } ${card.isMatched ? "ring-2 ring-green-500" : ""}`}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      {card.isFlipped || card.isMatched ? (
                        <>
                          <div className="text-2xl mb-1">{card.icon}</div>
                          <div className="text-xs font-medium text-center px-1">{card.tech}</div>
                        </>
                      ) : (
                        <div className="text-2xl">❓</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-2">Ready to test your memory?</h3>
                <p className="text-gray-500 mb-6">Match pairs of programming technologies</p>
                <Button onClick={initializeGame} className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Start Game
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Win Screen */}
        {gameWon && (
          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardHeader>
              <CardTitle className="text-center text-xl">🎉 Congratulations!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-green-500">{matches}</div>
                  <div className="text-sm text-gray-500">Matches</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-500">{moves}</div>
                  <div className="text-sm text-gray-500">Moves</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">{timeElapsed.toFixed(1)}s</div>
                  <div className="text-sm text-gray-500">Time</div>
                </div>
              </div>
              <Badge className="text-lg px-4 py-2 bg-purple-500 text-white">Final Score: {getScore()}</Badge>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!gameStarted || gameWon ? (
            <Button onClick={initializeGame} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              {gameWon ? "Play Again" : "Start Game"}
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

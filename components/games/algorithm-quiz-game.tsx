"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "@/components/theme-provider"
import { Play, RotateCcw, Brain, CheckCircle, XCircle, Clock } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  category: "sorting" | "searching" | "graph" | "dynamic" | "data-structures"
}

export function AlgorithmQuizGame() {
  const [questions] = useState<Question[]>([
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correct: 1,
      explanation:
        "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
      difficulty: "easy",
      category: "searching",
    },
    {
      id: 2,
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
      correct: 2,
      explanation: "Merge Sort consistently has O(n log n) time complexity in all cases, making it very reliable.",
      difficulty: "medium",
      category: "sorting",
    },
    {
      id: 3,
      question: "What data structure is used in Dijkstra's algorithm?",
      options: ["Stack", "Queue", "Priority Queue", "Hash Table"],
      correct: 2,
      explanation:
        "Dijkstra's algorithm uses a priority queue to always process the vertex with the smallest distance first.",
      difficulty: "medium",
      category: "graph",
    },
    {
      id: 4,
      question: "What is the space complexity of the recursive Fibonacci algorithm?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correct: 1,
      explanation: "The recursive call stack can go up to n levels deep, requiring O(n) space.",
      difficulty: "hard",
      category: "dynamic",
    },
    {
      id: 5,
      question: "Which operation is NOT typically O(1) in a hash table?",
      options: ["Insert", "Delete", "Search", "Resize"],
      correct: 3,
      explanation: "Resizing a hash table requires rehashing all elements, which takes O(n) time.",
      difficulty: "medium",
      category: "data-structures",
    },
    {
      id: 6,
      question: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correct: 2,
      explanation:
        "Quick Sort's worst case occurs when the pivot is always the smallest or largest element, leading to O(n²).",
      difficulty: "easy",
      category: "sorting",
    },
    {
      id: 7,
      question: "Which graph traversal uses a queue?",
      options: ["Depth-First Search", "Breadth-First Search", "Both", "Neither"],
      correct: 1,
      explanation: "BFS uses a queue to process vertices level by level, while DFS uses a stack (or recursion).",
      difficulty: "easy",
      category: "graph",
    },
    {
      id: 8,
      question: "What is memoization used for in dynamic programming?",
      options: ["Sorting data", "Avoiding redundant calculations", "Graph traversal", "Memory allocation"],
      correct: 1,
      explanation: "Memoization stores results of expensive function calls to avoid recalculating the same values.",
      difficulty: "medium",
      category: "dynamic",
    },
  ])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const startGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setGameStarted(true)
    setGameFinished(false)
    setTimeLeft(30)
    setAnsweredQuestions(new Array(questions.length).fill(false))
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setGameStarted(false)
    setGameFinished(false)
    setTimeLeft(30)
    setAnsweredQuestions([])
  }

  useEffect(() => {
    if (!gameStarted || gameFinished || showResult) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameFinished, showResult, currentQuestion])

  const handleTimeUp = () => {
    setShowResult(true)
    setAnsweredQuestions((prev) => {
      const newAnswered = [...prev]
      newAnswered[currentQuestion] = true
      return newAnswered
    })
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === questions[currentQuestion].correct
    if (isCorrect) {
      const points = getDifficultyPoints(questions[currentQuestion].difficulty)
      setScore((prev) => prev + points)
    }

    setAnsweredQuestions((prev) => {
      const newAnswered = [...prev]
      newAnswered[currentQuestion] = true
      return newAnswered
    })

    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      setGameFinished(true)
    }
  }

  const getDifficultyPoints = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return 10
      case "medium":
        return 20
      case "hard":
        return 30
      default:
        return 10
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return isDark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-800"
      case "medium":
        return isDark ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-800"
      case "hard":
        return isDark ? "bg-red-500/20 text-red-300" : "bg-red-100 text-red-800"
      default:
        return isDark ? "bg-gray-500/20 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sorting":
        return isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-800"
      case "searching":
        return isDark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-800"
      case "graph":
        return isDark ? "bg-orange-500/20 text-orange-300" : "bg-orange-100 text-orange-800"
      case "dynamic":
        return isDark ? "bg-pink-500/20 text-pink-300" : "bg-pink-100 text-pink-800"
      case "data-structures":
        return isDark ? "bg-teal-500/20 text-teal-300" : "bg-teal-100 text-teal-800"
      default:
        return isDark ? "bg-gray-500/20 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  const getPerformanceRating = () => {
    const percentage = (score / (questions.length * 20)) * 100
    if (percentage >= 90) return { rating: "Algorithm Master", color: "text-purple-500" }
    if (percentage >= 80) return { rating: "Senior Engineer", color: "text-blue-500" }
    if (percentage >= 70) return { rating: "Solid Developer", color: "text-green-500" }
    if (percentage >= 60) return { rating: "Getting There", color: "text-yellow-500" }
    return { rating: "Keep Learning", color: "text-gray-500" }
  }

  if (!gameStarted) {
    return (
      <div className={`p-6 h-full ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div>
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>Algorithm Quiz</h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Test your knowledge of algorithms and data structures
            </p>
          </div>

          <div className="text-6xl mb-4">🧠</div>

          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Quiz Overview</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Questions</div>
                  <div className="text-gray-500">{questions.length} total</div>
                </div>
                <div>
                  <div className="font-medium">Time per question</div>
                  <div className="text-gray-500">30 seconds</div>
                </div>
                <div>
                  <div className="font-medium">Scoring</div>
                  <div className="text-gray-500">Easy: 10pts, Medium: 20pts, Hard: 30pts</div>
                </div>
                <div>
                  <div className="font-medium">Categories</div>
                  <div className="text-gray-500">Sorting, Searching, Graphs, DP</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={startGame} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start Quiz
          </Button>
        </div>
      </div>
    )
  }

  if (gameFinished) {
    return (
      <div className={`p-6 h-full ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="text-6xl mb-4">🏆</div>

          <h1 className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>Quiz Complete!</h1>

          <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-blue-500">{score}</div>
                  <div className="text-sm text-gray-500">Final Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500">{answeredQuestions.filter(Boolean).length}</div>
                  <div className="text-sm text-gray-500">Answered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-500">
                    {Math.round((score / (questions.length * 20)) * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">Accuracy</div>
                </div>
              </div>

              <Badge className={`${getPerformanceRating().color} text-lg px-4 py-2`}>
                {getPerformanceRating().rating}
              </Badge>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button onClick={startGame}>Take Quiz Again</Button>
            <Button onClick={resetGame} variant="outline">
              Back to Menu
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className={`p-6 h-full ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>Algorithm Quiz</h1>
            <p className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-orange-500"}`}>{timeLeft}s</span>
          </div>
        </div>

        {/* Progress */}
        <div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{question.question}</CardTitle>
              <div className="flex gap-2">
                <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                <Badge className={getCategoryColor(question.category)}>{question.category}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left justify-start h-auto p-4 transition-all duration-200 ${
                  selectedAnswer === index
                    ? isDark
                      ? "bg-blue-500/20 border-blue-500 text-blue-300"
                      : "bg-blue-100 border-blue-500 text-blue-800"
                    : showResult
                      ? index === question.correct
                        ? isDark
                          ? "bg-green-500/20 border-green-500 text-green-300"
                          : "bg-green-100 border-green-500 text-green-800"
                        : selectedAnswer === index
                          ? isDark
                            ? "bg-red-500/20 border-red-500 text-red-300"
                            : "bg-red-100 border-red-500 text-red-800"
                          : ""
                      : ""
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index ? "border-current" : "border-gray-400"
                    }`}
                  >
                    {showResult && index === question.correct && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {showResult && selectedAnswer === index && index !== question.correct && (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    {!showResult && selectedAnswer === index && <div className="w-3 h-3 rounded-full bg-current" />}
                  </div>
                  <span>{option}</span>
                </div>
              </Button>
            ))}

            {showResult && (
              <div className={`p-4 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-gray-100"}`}>
                <div className="flex items-start gap-2">
                  <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm mb-1">Explanation:</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{question.explanation}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex justify-between">
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Quiz
          </Button>

          <div className="flex gap-2">
            {!showResult ? (
              <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

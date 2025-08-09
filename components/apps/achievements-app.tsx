"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "@/components/theme-provider"
import { Trophy, Star, Target, Zap, Code, Coffee, Award, Medal } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: Date
}

export function AchievementsApp() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const initialAchievements: Achievement[] = [
      {
        id: "smart-india-hackathon",
        title: "Smart India Hackathon Participant",
        description: "Participated in multiple problem statements: AI Chatbot, Smart Irrigation, Connected Healthcare.",
        icon: Star,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: "epic",
        unlockedAt: new Date(),
      },
      {
        id: "high-impact-projects",
        title: "High-Impact Project Creator",
        description: "Created multiple high-impact projects in AI/ML, IoT, Blockchain, Web Development.",
        icon: Target,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: "epic",
        unlockedAt: new Date(),
      },
      {
        id: "blockchain-certification",
        title: "Certified Blockchain Developer",
        description: "Completed certification in Blockchain Development.",
        icon: Code,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: "rare",
      },
      {
        id: "ai-ml-certification",
        title: "Certified AI/ML Developer",
        description: "Completed certification in AI/ML Basics.",
        icon: Zap,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: "rare",
      },
      {
        id: "mern-stack-certification",
        title: "Certified MERN Stack Developer",
        description: "Completed certification in MERN Stack Development.",
        icon: Coffee,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: "rare",
      },
      {
        id: "codeship-internship",
        title: "Intern at Codeship",
        description: "Gained hands-on experience with industry-standard development practices.",
        icon: Award,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: "epic",
        unlockedAt: new Date(),
      },
    ]

    setAchievements(initialAchievements)
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return isDark ? "border-gray-500 bg-gray-500/10" : "border-gray-400 bg-gray-100"
      case "rare":
        return isDark ? "border-blue-500 bg-blue-500/10" : "border-blue-400 bg-blue-100"
      case "epic":
        return isDark ? "border-purple-500 bg-purple-500/10" : "border-purple-400 bg-purple-100"
      case "legendary":
        return isDark ? "border-yellow-500 bg-yellow-500/10" : "border-yellow-400 bg-yellow-100"
      default:
        return isDark ? "border-gray-500 bg-gray-500/10" : "border-gray-400 bg-gray-100"
    }
  }

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return isDark ? "text-gray-300" : "text-gray-700"
      case "rare":
        return isDark ? "text-blue-300" : "text-blue-700"
      case "epic":
        return isDark ? "text-purple-300" : "text-purple-700"
      case "legendary":
        return isDark ? "text-yellow-300" : "text-yellow-700"
      default:
        return isDark ? "text-gray-300" : "text-gray-700"
    }
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className={`p-6 space-y-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="text-center">
        <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>Achievements</h1>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>Track your portfolio exploration progress</p>
      </div>

      {/* Progress Overview */}
      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            <Trophy className="w-5 h-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <span>Achievements Unlocked</span>
            <span className="font-bold">
              {unlockedCount} / {totalCount}
            </span>
          </div>
          <Progress value={(unlockedCount / totalCount) * 100} className="h-3 mb-4" />

          <div className="grid grid-cols-4 gap-4 text-center">
            {["common", "rare", "epic", "legendary"].map((rarity) => {
              const count = achievements.filter((a) => a.rarity === rarity && a.unlocked).length
              const total = achievements.filter((a) => a.rarity === rarity).length
              return (
                <div key={rarity}>
                  <div className={`text-sm font-medium ${getRarityTextColor(rarity)}`}>
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </div>
                  <div className="text-lg font-bold">
                    {count}/{total}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 gap-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`transition-all duration-300 ${
              achievement.unlocked
                ? `${getRarityColor(achievement.rarity)} shadow-lg`
                : isDark
                  ? "bg-gray-800/30 border-gray-700/50 opacity-60"
                  : "bg-gray-100/50 border-gray-300/50 opacity-60"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    achievement.unlocked ? getRarityColor(achievement.rarity) : isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <achievement.icon
                    className={`w-6 h-6 ${
                      achievement.unlocked
                        ? getRarityTextColor(achievement.rarity)
                        : isDark
                          ? "text-gray-500"
                          : "text-gray-400"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`font-semibold ${
                        achievement.unlocked
                          ? isDark
                            ? "text-gray-100"
                            : "text-gray-800"
                          : isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getRarityColor(achievement.rarity)} ${getRarityTextColor(achievement.rarity)}`}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>

                  <p
                    className={`text-sm mb-2 ${
                      achievement.unlocked
                        ? isDark
                          ? "text-gray-300"
                          : "text-gray-600"
                        : isDark
                          ? "text-gray-500"
                          : "text-gray-400"
                    }`}
                  >
                    {achievement.description}
                  </p>

                  {!achievement.unlocked && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>
                          {achievement.progress} / {achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                    </div>
                  )}

                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-green-500">Unlocked {achievement.unlockedAt.toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Coffee, Gamepad2, Music } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function AboutApp() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Git",
    "Tailwind CSS",
    "GraphQL",
  ]

  const interests = [
    { icon: Code, label: "Coding", description: "Building cool stuff" },
    { icon: Coffee, label: "Coffee", description: "Fuel for creativity" },
    { icon: Gamepad2, label: "Gaming", description: "Strategy & RPGs" },
    { icon: Music, label: "Music", description: "Electronic & Jazz" },
  ]

  return (
    <div className={`p-6 space-y-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="text-center">
        <div
          className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
              : "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25"
          }`}
        >
          <span className="text-white text-2xl font-bold">YN</span>
        </div>
        <h1 className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>Your Name</h1>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>Full Stack Developer & Problem Solver</p>
      </div>

      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg ${isDark ? "text-gray-100" : "text-gray-800"}`}>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Passionate developer with 3+ years of experience building web applications. I love creating intuitive user
            experiences and solving complex problems with clean, efficient code. Always eager to learn new technologies
            and take on challenging projects.
          </p>
        </CardContent>
      </Card>

      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            Skills & Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className={`transition-colors duration-300 ${
                  isDark
                    ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg ${isDark ? "text-gray-100" : "text-gray-800"}`}>Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {interests.map((interest) => (
              <div key={interest.label} className="flex items-center gap-3">
                <interest.icon className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
                <div>
                  <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>{interest.label}</p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{interest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

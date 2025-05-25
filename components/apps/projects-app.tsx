"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, Github, Play, Star, GitFork } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  image: string
  stars: number
  forks: number
  status: "completed" | "in-progress" | "planning"
}

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const projects: Project[] = [
    {
      id: "1",
      name: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard with real-time analytics.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS", "Redis"],
      demoUrl: "https://demo.example.com",
      githubUrl: "https://github.com/username/ecommerce",
      image: "/placeholder.svg?height=200&width=300",
      stars: 127,
      forks: 23,
      status: "completed",
    },
    {
      id: "2",
      name: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, time tracking, and advanced reporting capabilities.",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "shadcn/ui", "Vercel"],
      demoUrl: "https://tasks.example.com",
      githubUrl: "https://github.com/username/taskapp",
      image: "/placeholder.svg?height=200&width=300",
      stars: 89,
      forks: 15,
      status: "completed",
    },
    {
      id: "3",
      name: "AI Code Assistant",
      description:
        "An intelligent code assistant powered by OpenAI that helps developers write better code, provides suggestions, and explains complex algorithms with interactive examples.",
      technologies: ["Vue.js", "Python", "FastAPI", "OpenAI API", "Docker", "AWS"],
      demoUrl: "https://ai-assistant.example.com",
      githubUrl: "https://github.com/username/ai-assistant",
      image: "/placeholder.svg?height=200&width=300",
      stars: 234,
      forks: 45,
      status: "in-progress",
    },
    {
      id: "4",
      name: "Blockchain Voting System",
      description:
        "A secure, transparent voting system built on Ethereum blockchain with smart contracts, ensuring tamper-proof elections and real-time result tracking.",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS", "MetaMask"],
      githubUrl: "https://github.com/username/blockchain-voting",
      image: "/placeholder.svg?height=200&width=300",
      stars: 156,
      forks: 32,
      status: "planning",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return isDark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-800"
      case "in-progress":
        return isDark ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-800"
      case "planning":
        return isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-800"
      default:
        return isDark ? "bg-gray-500/20 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  if (selectedProject) {
    return (
      <div className={`p-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        <Button
          variant="ghost"
          onClick={() => setSelectedProject(null)}
          className={`mb-4 ${isDark ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"}`}
        >
          ← Back to Projects
        </Button>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                {selectedProject.name}
              </h1>
              <Badge className={getStatusColor(selectedProject.status)}>
                {selectedProject.status.replace("-", " ").toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">{selectedProject.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{selectedProject.forks}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className={isDark ? "bg-purple-500/20 text-purple-300" : "bg-blue-100 text-blue-800"}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <img
            src={selectedProject.image || "/placeholder.svg"}
            alt={selectedProject.name}
            className="w-full h-64 object-cover rounded-lg border"
          />

          <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {selectedProject.description}
          </p>

          <div className="flex gap-3">
            {selectedProject.demoUrl && (
              <Button asChild>
                <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {selectedProject.githubUrl && (
              <Button variant="outline" asChild>
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>Project Portfolio</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Double-click on a project to explore details</p>
        </div>

        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            Grid
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            List
          </Button>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-3"}>
        {projects.map((project) => (
          <Card
            key={project.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              isDark
                ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                : "bg-white/80 border-gray-200 hover:bg-white"
            }`}
            onDoubleClick={() => setSelectedProject(project)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
                  <CardTitle className="text-sm">{project.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(project.status)} variant="outline">
                  {project.status === "in-progress" ? "WIP" : project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-xs mb-3 line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {project.description}
              </p>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-gray-500" />
                    <span>{project.forks}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className={`text-xs ${isDark ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"}`}
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge
                    variant="outline"
                    className={`text-xs ${isDark ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"}`}
                  >
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

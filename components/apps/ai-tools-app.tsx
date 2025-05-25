"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Brain, FileText, Code, Lightbulb, Music, MessageSquare, Sparkles, Zap, Target, Palette } from "lucide-react"

interface AITool {
  id: string
  title: string
  description: string
  icon: any
  category: "creative" | "productivity" | "analysis" | "fun"
  isNew?: boolean
}

export function AIToolsApp() {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null)
  const [inputText, setInputText] = useState("")
  const [output, setOutput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const aiTools: AITool[] = [
    {
      id: "code-to-song",
      title: "Code → Song Converter",
      description: "Transform your code into musical compositions",
      icon: Music,
      category: "fun",
      isNew: true,
    },
    {
      id: "readme-writer",
      title: "README Generator",
      description: "AI-powered documentation writer",
      icon: FileText,
      category: "productivity",
    },
    {
      id: "code-meme-generator",
      title: "Code Meme Generator",
      description: "Create hilarious programming memes",
      icon: Sparkles,
      category: "fun",
      isNew: true,
    },
    {
      id: "ui-critic",
      title: "UI/UX Critic",
      description: "Get AI feedback on your designs",
      icon: Palette,
      category: "analysis",
    },
    {
      id: "recruiter-bot",
      title: "Fake Recruiter Bot",
      description: "Practice with an AI recruiter simulation",
      icon: MessageSquare,
      category: "productivity",
    },
    {
      id: "project-analyzer",
      title: "Project Analyzer",
      description: "AI analysis of GitHub repositories",
      icon: Target,
      category: "analysis",
    },
    {
      id: "startup-validator",
      title: "Startup Idea Validator",
      description: "Validate your business ideas with AI",
      icon: Lightbulb,
      category: "creative",
    },
    {
      id: "code-reviewer",
      title: "AI Code Reviewer",
      description: "Get intelligent code review feedback",
      icon: Code,
      category: "productivity",
    },
  ]

  const processWithAI = (toolId: string, input: string): string => {
    switch (toolId) {
      case "code-to-song":
        return `🎵 **Your Code Symphony**\n\n*Based on your code structure:*\n\n🎼 **Tempo:** Allegro (fast-paced, like your functions)\n🎹 **Key:** C Major (clean and structured)\n🥁 **Rhythm:** 4/4 (consistent like your coding style)\n\n**Musical Interpretation:**\n• Variables = Melody notes\n• Functions = Chord progressions  \n• Loops = Repeating motifs\n• Conditionals = Dynamic changes\n\n*"Your code sings in harmonious TypeScript, with React components dancing in perfect rhythm!"*\n\n🎧 Suggested listening: Lo-fi coding beats while you work!`

      case "readme-writer":
        return `# 📚 AI-Generated README\n\n## 🚀 Project Overview\nThis appears to be an innovative project that showcases modern development practices.\n\n## ✨ Features\n- Clean, maintainable code architecture\n- Modern technology stack\n- User-friendly interface\n- Scalable design patterns\n\n## 🛠️ Tech Stack\n- **Frontend:** React, TypeScript, Tailwind CSS\n- **Backend:** Node.js, Express\n- **Database:** PostgreSQL\n- **Deployment:** Vercel/Netlify\n\n## 🏃‍♂️ Quick Start\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## 🤝 Contributing\nContributions are welcome! Please read our contributing guidelines.\n\n## 📄 License\nMIT License - see LICENSE file for details.`

      case "code-meme-generator":
        const memes = [
          "🐛 **Bug Report:**\n*'It works on my machine'*\n\n👨‍💻 **Developer:** But it works locally!\n🤖 **Production:** Hold my beer...",
          "☕ **Coffee.exe has stopped working**\n\n*Error: Developer cannot function without caffeine*\n\n[Restart] [Debug] [Get Coffee]",
          "🔄 **Git Commit Messages:**\n\n• 'Fixed bug'\n• 'Fixed the fix'\n• 'Fixed the fix that fixed the bug'\n• 'Why did I become a developer?'",
          "🎯 **CSS in a nutshell:**\n\n*Moves element 2px to the left*\n\n*Entire layout breaks*\n\n'This is fine' 🔥",
        ]
        return memes[Math.floor(Math.random() * memes.length)]

      case "ui-critic":
        return `🎨 **AI UI/UX Analysis**\n\n**Overall Score:** 8.5/10 ⭐\n\n**Strengths:**\n✅ Clean, modern design language\n✅ Consistent color scheme\n✅ Good use of whitespace\n✅ Intuitive navigation patterns\n\n**Areas for Improvement:**\n🔄 Consider adding micro-interactions\n📱 Optimize for mobile responsiveness\n♿ Enhance accessibility features\n🎯 Improve call-to-action visibility\n\n**Recommendations:**\n• Add subtle animations for better UX\n• Implement dark mode toggle\n• Use more descriptive button labels\n• Consider A/B testing key elements\n\n*"Your design shows great attention to detail and user experience!"*`

      case "recruiter-bot":
        const questions = [
          "Tell me about your most challenging project and how you overcame obstacles.",
          "How do you stay updated with the latest technology trends?",
          "Describe a time when you had to work with a difficult team member.",
          "What's your approach to debugging complex issues?",
          "Where do you see yourself in 5 years?",
        ]
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
        return `🤖 **AI Recruiter Simulation**\n\n*"Hello! I'm excited to learn more about your background."*\n\n**Question:** ${randomQuestion}\n\n**Tips for your answer:**\n• Use the STAR method (Situation, Task, Action, Result)\n• Be specific with examples\n• Show your problem-solving process\n• Highlight relevant technologies\n\n**Follow-up questions I might ask:**\n• Can you elaborate on the technical challenges?\n• How did you measure success?\n• What would you do differently?\n\n*Ready to practice your response?*`

      case "project-analyzer":
        return `📊 **AI Project Analysis**\n\n**Repository Health Score:** 9.2/10 🏆\n\n**Code Quality Metrics:**\n• **Maintainability:** Excellent\n• **Documentation:** Very Good\n• **Test Coverage:** 85%\n• **Performance:** Optimized\n\n**Technology Assessment:**\n✅ Modern stack choices\n✅ Best practices followed\n✅ Security considerations\n✅ Scalable architecture\n\n**Recommendations:**\n🔧 Add more unit tests for edge cases\n📚 Expand API documentation\n🚀 Consider implementing CI/CD pipeline\n📈 Add performance monitoring\n\n**Standout Features:**\n• Clean code architecture\n• Thoughtful component design\n• Good error handling\n• User-friendly interface\n\n*"This project demonstrates strong technical skills and attention to detail!"*`

      case "startup-validator":
        return `🚀 **AI Startup Validation**\n\n**Idea Viability Score:** 7.8/10 📈\n\n**Market Analysis:**\n• **Market Size:** Large and growing\n• **Competition:** Moderate\n• **Timing:** Excellent\n• **Technical Feasibility:** High\n\n**Strengths:**\n✅ Solves a real problem\n✅ Clear value proposition\n✅ Scalable business model\n✅ Strong technical foundation\n\n**Risks to Consider:**\n⚠️ Market saturation potential\n⚠️ User acquisition costs\n⚠️ Technical complexity\n⚠️ Regulatory considerations\n\n**Next Steps:**\n1. Validate with potential users\n2. Build MVP for testing\n3. Analyze competitor strategies\n4. Develop go-to-market plan\n\n*"Your idea has strong potential! Focus on user validation next."*`

      case "code-reviewer":
        return `👨‍💻 **AI Code Review**\n\n**Overall Quality:** A- (Excellent) 🌟\n\n**Positive Aspects:**\n✅ Clean, readable code structure\n✅ Consistent naming conventions\n✅ Good separation of concerns\n✅ Proper error handling\n\n**Suggestions for Improvement:**\n🔧 **Performance:**\n• Consider memoization for expensive calculations\n• Optimize re-renders with React.memo\n\n🛡️ **Security:**\n• Validate user inputs\n• Sanitize data before database operations\n\n📚 **Documentation:**\n• Add JSDoc comments for complex functions\n• Include usage examples\n\n🧪 **Testing:**\n• Add unit tests for utility functions\n• Consider integration tests\n\n**Code Smell Detection:** None found! 🎉\n\n*"Great work! Your code follows best practices and is well-structured."*`

      default:
        return "AI processing complete! ✨"
    }
  }

  const handleProcessTool = async () => {
    if (!selectedTool || !inputText.trim()) return

    setIsProcessing(true)
    setOutput("")

    // Simulate AI processing time
    setTimeout(() => {
      const result = processWithAI(selectedTool.id, inputText)
      setOutput(result)
      setIsProcessing(false)
    }, 2000)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "creative":
        return isDark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-800"
      case "productivity":
        return isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-800"
      case "analysis":
        return isDark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-800"
      case "fun":
        return isDark ? "bg-pink-500/20 text-pink-300" : "bg-pink-100 text-pink-800"
      default:
        return isDark ? "bg-gray-500/20 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  if (selectedTool) {
    return (
      <div className={`p-6 space-y-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedTool(null)
            setInputText("")
            setOutput("")
          }}
          className={`mb-4 ${isDark ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"}`}
        >
          ← Back to AI Tools
        </Button>

        <div className="text-center space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? "bg-gray-800/50" : "bg-gray-100"}`}>
            <selectedTool.icon className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              {selectedTool.title}
            </h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>{selectedTool.description}</p>
            <div className="flex justify-center gap-2 mt-3">
              <Badge className={getCategoryColor(selectedTool.category)}>{selectedTool.category}</Badge>
              {selectedTool.isNew && (
                <Badge className={isDark ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-800"}>
                  New!
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
              <CardHeader>
                <CardTitle className="text-lg">Input</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Enter your ${
                    selectedTool.id.includes("code") ? "code" : "text"
                  } here for AI processing...`}
                  rows={8}
                  className={isDark ? "bg-gray-900 border-gray-600" : "bg-white border-gray-300"}
                />
                <Button
                  onClick={handleProcessTool}
                  disabled={!inputText.trim() || isProcessing}
                  className="w-full mt-4"
                >
                  {isProcessing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-spin" />
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Process with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
              <CardHeader>
                <CardTitle className="text-lg">AI Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`min-h-[200px] p-4 rounded-lg border ${
                    isDark ? "bg-gray-900 border-gray-600" : "bg-gray-50 border-gray-300"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Brain
                          className={`w-8 h-8 mx-auto mb-2 animate-pulse ${isDark ? "text-purple-400" : "text-blue-600"}`}
                        />
                        <p className={isDark ? "text-gray-400" : "text-gray-600"}>AI is thinking...</p>
                      </div>
                    </div>
                  ) : output ? (
                    <div className="whitespace-pre-wrap text-sm">{output}</div>
                  ) : (
                    <p className={`text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      AI output will appear here...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 space-y-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="text-center">
        <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>AI Tools Suite</h1>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>Powerful AI-enhanced productivity tools</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {aiTools.map((tool) => (
          <Card
            key={tool.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              isDark
                ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                : "bg-white/80 border-gray-200 hover:bg-white"
            }`}
            onClick={() => setSelectedTool(tool)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <tool.icon className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
                  <CardTitle className="text-sm">{tool.title}</CardTitle>
                </div>
                {tool.isNew && (
                  <Badge className={isDark ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-800"}>
                    New!
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-xs mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{tool.description}</p>
              <Badge variant="outline" className={getCategoryColor(tool.category)}>
                {tool.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

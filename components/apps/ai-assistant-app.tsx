"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Bot, Send, Mic, MicOff, Sparkles, User, Zap } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  category?: "general" | "code" | "career" | "creative"
}

export function AIAssistantApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "👋 Hello! I'm your AI-powered portfolio assistant. I can help you with:\n\n• Career advice and interview prep\n• Code reviews and tech discussions\n• Creative projects and ideas\n• Portfolio feedback\n• Tech stack recommendations\n\nWhat would you like to explore today?",
      timestamp: new Date(),
      category: "general",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): { content: string; category: string } => {
    const message = userMessage.toLowerCase()

    // Tech stack poem
    if (message.includes("poem") || message.includes("poetry")) {
      return {
        content: `🎭 Here's a poem about your tech stack:\n\n*React components dance in harmony,*\n*TypeScript guards with type safety,*\n*Next.js renders with such grace,*\n*While Tailwind styles every space.*\n\n*Node.js powers the backend strong,*\n*PostgreSQL stores data long,*\n*Docker containers hold it all,*n*In the cloud where systems call.*\n\n✨ Your stack is poetry in motion!`,
        category: "creative",
      }
    }

    // Interview questions
    if (message.includes("interview") || message.includes("job")) {
      const questions = [
        "Tell me about a challenging project you've worked on recently.",
        "How do you handle debugging complex issues?",
        "What's your approach to learning new technologies?",
        "Describe a time when you had to optimize application performance.",
        "How do you ensure code quality in your projects?",
      ]
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
      return {
        content: `🎯 **Mock Interview Question:**\n\n"${randomQuestion}"\n\n💡 **Tips for answering:**\n• Use the STAR method (Situation, Task, Action, Result)\n• Be specific with examples\n• Show your problem-solving process\n• Mention technologies you used\n\nWould you like to practice your answer or get another question?`,
        category: "career",
      }
    }

    // Project ideas
    if (message.includes("project") && (message.includes("idea") || message.includes("build"))) {
      const projects = [
        "🚀 **AI-Powered Code Reviewer**: Build a tool that analyzes code quality and suggests improvements using GPT",
        "🌱 **Carbon Footprint Tracker**: Create an app that tracks and gamifies reducing your environmental impact",
        "🎵 **Mood-Based Playlist Generator**: Use Spotify API + sentiment analysis to create playlists based on your mood",
        "📊 **Real-time Collaboration Dashboard**: Build a tool for remote teams with live updates and AI insights",
        "🎮 **AR Code Learning Game**: Create an augmented reality app that teaches programming concepts",
        "🏠 **Smart Home Automation Hub**: Build a central control system for IoT devices with AI optimization",
      ]
      const randomProject = projects[Math.floor(Math.random() * projects.length)]
      return {
        content: `💡 **Project Idea for You:**\n\n${randomProject}\n\n**Why this fits your skills:**\n• Leverages your React/TypeScript expertise\n• Incorporates modern AI/ML concepts\n• Great for portfolio showcase\n• Solves a real-world problem\n\nWant more details about implementation or another idea?`,
        category: "creative",
      }
    }

    // Code review
    if (message.includes("code") && (message.includes("review") || message.includes("feedback"))) {
      return {
        content: `👨‍💻 **Code Review Assistant Ready!**\n\nI can help you with:\n\n🔍 **Code Quality Analysis**\n• Performance optimizations\n• Security best practices\n• Clean code principles\n• Architecture improvements\n\n📝 **Documentation Review**\n• README improvements\n• Code comments\n• API documentation\n\n🧪 **Testing Strategies**\n• Unit test coverage\n• Integration testing\n• E2E test scenarios\n\nPaste your code or describe what you'd like me to review!`,
        category: "code",
      }
    }

    // Personality analysis
    if (message.includes("personality") || message.includes("who am i")) {
      return {
        content: `🧠 **AI Personality Analysis Based on Your Portfolio:**\n\n**Developer Archetype:** *The Innovative Builder*\n\n✨ **Key Traits:**\n• **Curious Explorer** - You love experimenting with new technologies\n• **Problem Solver** - Your projects show systematic thinking\n• **Detail-Oriented** - Clean code and good UX design\n• **Forward-Thinking** - Embracing AI and modern tools\n\n🎯 **Strengths:**\n• Full-stack versatility\n• Strong technical foundation\n• Creative problem-solving\n• Continuous learning mindset\n\n💡 **Recommendation:** You'd thrive in roles involving innovation, R&D, or technical leadership!`,
        category: "career",
      }
    }

    // Startup pitch game
    if (message.includes("startup") || message.includes("pitch")) {
      const startupIdeas = [
        "🍕 **FoodieAI**: An app that creates personalized recipes based on your dietary restrictions, available ingredients, and mood",
        "🎓 **SkillSwap**: A platform where professionals teach each other skills in exchange for learning new ones",
        "🌍 **EcoTracker**: Gamified sustainability app that rewards users for eco-friendly choices with real discounts",
        "💼 **RemoteSync**: AI-powered tool that optimizes remote team collaboration across time zones",
        "🏋️ **FitnessAI**: Personal trainer app that adapts workouts based on your progress and biometric data",
      ]
      const randomStartup = startupIdeas[Math.floor(Math.random() * startupIdeas.length)]
      return {
        content: `🚀 **Startup Pitch Challenge!**\n\n${randomStartup}\n\n**Your mission:** Pitch this idea in 2 minutes!\n\n📋 **Include:**\n• Problem it solves\n• Target market\n• Revenue model\n• Why you're the right team\n• Competitive advantage\n\n💰 **Bonus points for:**\n• Market size estimates\n• Go-to-market strategy\n• Technology stack choice\n\nReady to pitch? I'll give you feedback!`,
        category: "creative",
      }
    }

    // Default responses
    const defaultResponses = [
      {
        content: `🤖 I'm here to help! I can assist with:\n\n💼 **Career Development**\n• Mock interviews\n• Resume optimization\n• Skill recommendations\n\n💻 **Technical Guidance**\n• Code reviews\n• Architecture advice\n• Technology choices\n\n🎨 **Creative Projects**\n• Project ideas\n• Tech stack poems\n• Startup concepts\n\nWhat interests you most?`,
        category: "general",
      },
      {
        content: `✨ **Fun AI Features to Try:**\n\n🎭 Ask me to write a "poem about my tech stack"\n🎯 Say "give me an interview question"\n💡 Request "project ideas for my portfolio"\n🚀 Challenge me with "pitch me a startup"\n🧠 Ask "what's my developer personality?"\n\nI'm constantly learning and improving! What would you like to explore?`,
        category: "general",
      },
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        category: aiResponse.category as any,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser")
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInputValue(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "code":
        return isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-800"
      case "career":
        return isDark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-800"
      case "creative":
        return isDark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-800"
      default:
        return isDark ? "bg-gray-500/20 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={`h-full flex flex-col ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isDark ? "bg-purple-500/20" : "bg-blue-100"}`}>
            <Bot className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-blue-600"}`} />
          </div>
          <div>
            <h1 className={`text-lg font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>AI Assistant</h1>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Your intelligent portfolio companion
            </p>
          </div>
          <div className="ml-auto">
            <Badge className={isDark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-800"}>
              <Zap className="w-3 h-3 mr-1" />
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
              <div
                className={`p-3 rounded-lg ${
                  message.type === "user"
                    ? isDark
                      ? "bg-purple-600 text-white"
                      : "bg-blue-600 text-white"
                    : isDark
                      ? "bg-gray-800 text-gray-100"
                      : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.type === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  <span className="text-xs opacity-70">{message.type === "assistant" ? "AI Assistant" : "You"}</span>
                  {message.category && (
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(message.category)}`}>
                      {message.category}
                    </Badge>
                  )}
                </div>
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              </div>
              <div className="text-xs opacity-50 mt-1 px-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className={`p-3 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about your portfolio, career, or code..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className={isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}
          />
          <Button
            onClick={handleVoiceInput}
            variant="outline"
            size="icon"
            className={isListening ? "animate-pulse" : ""}
            disabled={isListening}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInputValue("Write a poem about my tech stack")}
            className="text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Tech Poem
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInputValue("Give me an interview question")}
            className="text-xs"
          >
            Interview Prep
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInputValue("What project should I build next?")}
            className="text-xs"
          >
            Project Ideas
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Palette, Monitor, Zap, Volume2, VolumeX, Eye, Sparkles, Keyboard, Download } from "lucide-react"

export function SettingsApp() {
  const { theme, toggleTheme, setTheme } = useTheme()
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [transparencyLevel, setTransparencyLevel] = useState([85])
  const [animationSpeed, setAnimationSpeed] = useState([100])
  const [fontSize, setFontSize] = useState([14])
  const [cursorTrails, setCursorTrails] = useState(false)
  const [particleEffects, setParticleEffects] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true)
  const [wallpaperStyle, setWallpaperStyle] = useState("gradient")
  const [accentColor, setAccentColor] = useState("purple")

  const isDark = theme === "dark"

  const themeOptions = [
    { id: "dark", name: "Dark Mode", icon: Moon, description: "Easy on the eyes" },
    { id: "light", name: "Light Mode", icon: Sun, description: "Classic bright theme" },
  ]

  const wallpaperOptions = [
    { id: "gradient", name: "Gradient", description: "Smooth color transitions" },
    { id: "particles", name: "Particles", description: "Animated particle field" },
    { id: "geometric", name: "Geometric", description: "Abstract shapes" },
    { id: "minimal", name: "Minimal", description: "Clean solid color" },
  ]

  const accentColors = [
    { id: "purple", name: "Purple", color: "bg-purple-500" },
    { id: "blue", name: "Blue", color: "bg-blue-500" },
    { id: "green", name: "Green", color: "bg-green-500" },
    { id: "orange", name: "Orange", color: "bg-orange-500" },
    { id: "pink", name: "Pink", color: "bg-pink-500" },
    { id: "teal", name: "Teal", color: "bg-teal-500" },
  ]

  return (
    <div className={`p-6 space-y-6 ${isDark ? "text-gray-100" : "text-gray-900"} max-h-full overflow-y-auto`}>
      <div className="text-center">
        <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>Settings</h1>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Customize your portfolio experience</p>
      </div>

      {/* Appearance Settings */}
      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            <Palette className="w-5 h-5" />
            Appearance & Themes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className={`font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>Theme</h3>
            <div className="grid grid-cols-2 gap-3">
              {themeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    theme === option.id
                      ? isDark
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-blue-500 bg-blue-500/10"
                      : isDark
                        ? "border-gray-600 hover:border-gray-500 bg-gray-700/30"
                        : "border-gray-300 hover:border-gray-400 bg-gray-50"
                  }`}
                  onClick={() => setTheme(option.id as "dark" | "light")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        theme === option.id
                          ? isDark
                            ? "bg-purple-500/20"
                            : "bg-blue-500/20"
                          : isDark
                            ? "bg-gray-600/50"
                            : "bg-gray-200"
                      }`}
                    >
                      <option.icon
                        className={`w-4 h-4 ${
                          theme === option.id
                            ? isDark
                              ? "text-purple-400"
                              : "text-blue-600"
                            : isDark
                              ? "text-gray-400"
                              : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>{option.name}</p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{option.description}</p>
                    </div>
                  </div>
                  {theme === option.id && (
                    <Badge
                      className={`mt-2 ${isDark ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-700"}`}
                    >
                      Active
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <h3 className={`font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>Accent Color</h3>
            <div className="grid grid-cols-6 gap-2">
              {accentColors.map((color) => (
                <Button
                  key={color.id}
                  variant="outline"
                  className={`h-12 p-0 ${accentColor === color.id ? "ring-2 ring-offset-2 ring-current" : ""}`}
                  onClick={() => setAccentColor(color.id)}
                >
                  <div className={`w-full h-full rounded ${color.color}`} />
                </Button>
              ))}
            </div>
          </div>

          {/* Wallpaper Style */}
          <div>
            <h3 className={`font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>Background Style</h3>
            <Select value={wallpaperStyle} onValueChange={setWallpaperStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {wallpaperOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transparency Level */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Window Transparency</h3>
              <span className="text-sm text-gray-500">{transparencyLevel[0]}%</span>
            </div>
            <Slider
              value={transparencyLevel}
              onValueChange={setTransparencyLevel}
              max={100}
              min={50}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Visual Effects */}
      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            <Sparkles className="w-5 h-5" />
            Visual Effects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Animations</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Enable smooth transitions and effects
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <Switch checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Particle Effects</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Animated background particles</p>
            </div>
            <Switch checked={particleEffects} onCheckedChange={setParticleEffects} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Cursor Trails</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Visual cursor movement effects</p>
            </div>
            <Switch checked={cursorTrails} onCheckedChange={setCursorTrails} />
          </div>

          {/* Animation Speed */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Animation Speed</p>
              <span className="text-sm text-gray-500">{animationSpeed[0]}%</span>
            </div>
            <Slider
              value={animationSpeed}
              onValueChange={setAnimationSpeed}
              max={200}
              min={50}
              step={25}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            <Eye className="w-5 h-5" />
            Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Font Size */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Font Size</p>
              <span className="text-sm text-gray-500">{fontSize[0]}px</span>
            </div>
            <Slider value={fontSize} onValueChange={setFontSize} max={20} min={12} step={1} className="w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Keyboard Shortcuts</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Enable keyboard navigation</p>
            </div>
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              <Switch checked={keyboardShortcuts} onCheckedChange={setKeyboardShortcuts} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg flex items-center gap-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
            <Monitor className="w-5 h-5" />
            System Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Sound Effects</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Enable system sounds and notifications
              </p>
            </div>
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Notifications</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Show achievement and system notifications
              </p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>Auto-save Settings</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Automatically save your preferences
              </p>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
        <CardHeader>
          <CardTitle className={`text-lg ${isDark ? "text-gray-100" : "text-gray-800"}`}>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Version</p>
              <p className={isDark ? "text-gray-100" : "text-gray-800"}>DevOS v3.1</p>
            </div>
            <div>
              <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Theme</p>
              <p className={isDark ? "text-gray-100" : "text-gray-800"}>
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </p>
            </div>
            <div>
              <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Framework</p>
              <p className={isDark ? "text-gray-100" : "text-gray-800"}>Next.js 14</p>
            </div>
            <div>
              <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Styling</p>
              <p className={isDark ? "text-gray-100" : "text-gray-800"}>Tailwind CSS</p>
            </div>
            <div>
              <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>AI Features</p>
              <p className={isDark ? "text-gray-100" : "text-gray-800"}>Enabled</p>
            </div>
            <div>
              <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Last Updated</p>
              <p className={isDark ? "text-gray-100" : "text-gray-800"}>Today</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button className="w-full" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

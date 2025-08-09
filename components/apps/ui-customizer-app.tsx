"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/components/theme-provider"
import {
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Layout,
  Sparkles,
  Eye,
  Zap,
  Grid,
  RotateCcw,
  Download,
  Paintbrush,
  Layers,
} from "lucide-react"

interface UISettings {
  // Layout & Spacing
  iconSize: number
  iconSpacing: number
  windowPadding: number
  borderRadius: number

  // Visual Effects
  glassEffect: boolean
  shadowIntensity: number
  blurAmount: number
  gradientOverlay: boolean

  // Animations
  animationDuration: number
  easeType: string
  hoverEffects: boolean
  transitionDelay: number

  // Colors & Themes
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundStyle: string

  // Typography
  fontFamily: string
  fontSize: number
  fontWeight: string
  lineHeight: number

  // Responsive
  mobileLayout: string
  tabletLayout: string
  desktopLayout: string

  // Accessibility
  highContrast: boolean
  reducedMotion: boolean
  focusIndicators: boolean
  screenReaderMode: boolean
}

export function UICustomizerApp() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [settings, setSettings] = useState<UISettings>({
    iconSize: 64,
    iconSpacing: 16,
    windowPadding: 24,
    borderRadius: 12,
    glassEffect: true,
    shadowIntensity: 50,
    blurAmount: 20,
    gradientOverlay: true,
    animationDuration: 300,
    easeType: "ease-out",
    hoverEffects: true,
    transitionDelay: 0,
    primaryColor: "#8B5CF6",
    secondaryColor: "#06B6D4",
    accentColor: "#F59E0B",
    backgroundStyle: "gradient",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 1.5,
    mobileLayout: "stack",
    tabletLayout: "grid",
    desktopLayout: "sidebar",
    highContrast: false,
    reducedMotion: false,
    focusIndicators: true,
    screenReaderMode: false,
  })

  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isLivePreview, setIsLivePreview] = useState(true)

  const updateSetting = (key: keyof UISettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    if (isLivePreview) {
      applySettings({ ...settings, [key]: value } as UISettings)
    }
  }

  const applySettings = (newSettings: UISettings) => {
    const root = document.documentElement

    // Apply CSS custom properties
    root.style.setProperty("--icon-size", `${newSettings.iconSize}px`)
    root.style.setProperty("--icon-spacing", `${newSettings.iconSpacing}px`)
    root.style.setProperty("--window-padding", `${newSettings.windowPadding}px`)
    root.style.setProperty("--border-radius", `${newSettings.borderRadius}px`)
    root.style.setProperty("--shadow-intensity", `${newSettings.shadowIntensity}%`)
    root.style.setProperty("--blur-amount", `${newSettings.blurAmount}px`)
    root.style.setProperty("--animation-duration", `${newSettings.animationDuration}ms`)
    root.style.setProperty("--primary-color", newSettings.primaryColor)
    root.style.setProperty("--secondary-color", newSettings.secondaryColor)
    root.style.setProperty("--accent-color", newSettings.accentColor)
    root.style.setProperty("--font-size", `${newSettings.fontSize}px`)
    root.style.setProperty("--font-weight", newSettings.fontWeight)
    root.style.setProperty("--line-height", newSettings.lineHeight.toString())
  }

  const applyPreset = (preset: UISettings) => {
    setSettings(preset)
    applySettings(preset)
  }

  const applyPalette = (palette: { primary: string; secondary: string; accent: string }) => {
    const newSettings = {
      ...settings,
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      accentColor: palette.accent,
    }
    setSettings(newSettings)
    applySettings(newSettings)
  }

  const presets = {
    minimal: {
      ...settings,
      borderRadius: 4,
      shadowIntensity: 20,
      blurAmount: 5,
      animationDuration: 200,
      glassEffect: false,
      gradientOverlay: false,
    },
    modern: {
      ...settings,
      borderRadius: 16,
      shadowIntensity: 60,
      blurAmount: 30,
      animationDuration: 400,
      glassEffect: true,
      gradientOverlay: true,
    },
    retro: {
      ...settings,
      borderRadius: 0,
      shadowIntensity: 80,
      blurAmount: 0,
      animationDuration: 150,
      glassEffect: false,
      primaryColor: "#FF6B6B",
      secondaryColor: "#4ECDC4",
    },
    gaming: {
      ...settings,
      borderRadius: 8,
      shadowIntensity: 90,
      blurAmount: 15,
      animationDuration: 250,
      glassEffect: true,
      primaryColor: "#00FF88",
      secondaryColor: "#FF0080",
    },
  }

  const colorPalettes = [
    { name: "Purple", primary: "#8B5CF6", secondary: "#06B6D4", accent: "#F59E0B" },
    { name: "Blue", primary: "#3B82F6", secondary: "#10B981", accent: "#F59E0B" },
    { name: "Green", primary: "#10B981", secondary: "#8B5CF6", accent: "#EF4444" },
    { name: "Pink", primary: "#EC4899", secondary: "#06B6D4", accent: "#F59E0B" },
    { name: "Orange", primary: "#F97316", secondary: "#8B5CF6", accent: "#10B981" },
    { name: "Teal", primary: "#14B8A6", secondary: "#F97316", accent: "#8B5CF6" },
  ]

  const fontOptions = ["Inter", "Roboto", "Poppins", "Montserrat", "Open Sans", "Lato", "Source Sans Pro", "Nunito"]

  const easeOptions = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"]

  return (
    <div className={`h-full flex flex-col ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      {/* Header */}
      <div
        className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"} flex items-center justify-between`}
      >
        <div>
          <h1 className={`text-xl font-bold ${isDark ? "text-gray-100" : "text-gray-800"}`}>UI Customizer</h1>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Design your perfect interface</p>
        </div>

        {/* Preview Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={previewMode === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode("desktop")}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={previewMode === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode("tablet")}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={previewMode === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode("mobile")}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="layout" className="h-full flex flex-col">
          <TabsList className={`grid w-full grid-cols-5 ${isDark ? "bg-gray-800" : "bg-gray-100"} m-4 mb-0`}>
            <TabsTrigger value="layout">
              <Layout className="w-4 h-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="visual">
              <Sparkles className="w-4 h-4 mr-2" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="colors">
              <Palette className="w-4 h-4 mr-2" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography">
              <Paintbrush className="w-4 h-4 mr-2" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="responsive">
              <Monitor className="w-4 h-4 mr-2" />
              Responsive
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-4 mt-0">
              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Grid className="w-5 h-5" />
                    Spacing & Layout
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Icon Size</label>
                      <span className="text-sm text-gray-500">{settings.iconSize}px</span>
                    </div>
                    <Slider
                      value={[settings.iconSize]}
                      onValueChange={([value]) => updateSetting("iconSize", value)}
                      max={128}
                      min={32}
                      step={8}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Icon Spacing</label>
                      <span className="text-sm text-gray-500">{settings.iconSpacing}px</span>
                    </div>
                    <Slider
                      value={[settings.iconSpacing]}
                      onValueChange={([value]) => updateSetting("iconSpacing", value)}
                      max={32}
                      min={8}
                      step={2}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Window Padding</label>
                      <span className="text-sm text-gray-500">{settings.windowPadding}px</span>
                    </div>
                    <Slider
                      value={[settings.windowPadding]}
                      onValueChange={([value]) => updateSetting("windowPadding", value)}
                      max={48}
                      min={8}
                      step={4}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Border Radius</label>
                      <span className="text-sm text-gray-500">{settings.borderRadius}px</span>
                    </div>
                    <Slider
                      value={[settings.borderRadius]}
                      onValueChange={([value]) => updateSetting("borderRadius", value)}
                      max={24}
                      min={0}
                      step={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Presets */}
              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle>Quick Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(presets).map(([name, preset]) => (
                      <Button key={name} variant="outline" onClick={() => applyPreset(preset)} className="capitalize">
                        {name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visual Effects Tab */}
            <TabsContent value="visual" className="space-y-4 mt-0">
              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Glass & Effects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Glass Effect</label>
                      <p className="text-xs text-gray-500">Frosted glass appearance</p>
                    </div>
                    <Switch
                      checked={settings.glassEffect}
                      onCheckedChange={(checked) => updateSetting("glassEffect", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Gradient Overlay</label>
                      <p className="text-xs text-gray-500">Background gradient effects</p>
                    </div>
                    <Switch
                      checked={settings.gradientOverlay}
                      onCheckedChange={(checked) => updateSetting("gradientOverlay", checked)}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Shadow Intensity</label>
                      <span className="text-sm text-gray-500">{settings.shadowIntensity}%</span>
                    </div>
                    <Slider
                      value={[settings.shadowIntensity]}
                      onValueChange={([value]) => updateSetting("shadowIntensity", value)}
                      max={100}
                      min={0}
                      step={10}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Blur Amount</label>
                      <span className="text-sm text-gray-500">{settings.blurAmount}px</span>
                    </div>
                    <Slider
                      value={[settings.blurAmount]}
                      onValueChange={([value]) => updateSetting("blurAmount", value)}
                      max={50}
                      min={0}
                      step={5}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Animations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Hover Effects</label>
                      <p className="text-xs text-gray-500">Interactive hover animations</p>
                    </div>
                    <Switch
                      checked={settings.hoverEffects}
                      onCheckedChange={(checked) => updateSetting("hoverEffects", checked)}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Animation Duration</label>
                      <span className="text-sm text-gray-500">{settings.animationDuration}ms</span>
                    </div>
                    <Slider
                      value={[settings.animationDuration]}
                      onValueChange={([value]) => updateSetting("animationDuration", value)}
                      max={1000}
                      min={100}
                      step={50}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Easing Function</label>
                    <Select value={settings.easeType} onValueChange={(value) => updateSetting("easeType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {easeOptions.map((ease) => (
                          <SelectItem key={ease} value={ease}>
                            {ease}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-4 mt-0">
              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle>Color Palettes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {colorPalettes.map((palette) => (
                      <Button
                        key={palette.name}
                        variant="outline"
                        className="h-auto p-3 flex flex-col items-start"
                        onClick={() => applyPalette(palette)}
                      >
                        <div className="flex gap-2 mb-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.primary }} />
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.secondary }} />
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: palette.accent }} />
                        </div>
                        <span className="text-sm">{palette.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle>Custom Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onInput={(e) => updateSetting("primaryColor", (e.target as HTMLInputElement).value)}
                        className="w-12 h-10 rounded border"
                      />
                      <input
                        type="text"
                        value={settings.primaryColor}
                        onChange={(e) => updateSetting("primaryColor", (e.target as HTMLInputElement).value)}
                        className={`flex-1 px-3 py-2 rounded border ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Secondary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.secondaryColor}
                        onInput={(e) => updateSetting("secondaryColor", (e.target as HTMLInputElement).value)}
                        className="w-12 h-10 rounded border"
                      />
                      <input
                        type="text"
                        value={settings.secondaryColor}
                        onInput={(e) => updateSetting("secondaryColor", (e.target as HTMLInputElement).value)}
                        className={`flex-1 px-3 py-2 rounded border ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Accent Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.accentColor}
                        onInput={(e) => updateSetting("accentColor", (e.target as HTMLInputElement).value)}
                        className="w-12 h-10 rounded border"
                      />
                      <input
                        type="text"
                        value={settings.accentColor}
                        onInput={(e) => updateSetting("accentColor", (e.target as HTMLInputElement).value)}
                        className={`flex-1 px-3 py-2 rounded border ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-4 mt-0">
              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle>Font Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Family</label>
                    <Select value={settings.fontFamily} onValueChange={(value) => updateSetting("fontFamily", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font} value={font}>
                            <span style={{ fontFamily: font }}>{font}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Font Size</label>
                      <span className="text-sm text-gray-500">{settings.fontSize}px</span>
                    </div>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={([value]) => updateSetting("fontSize", value)}
                      max={24}
                      min={10}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Weight</label>
                    <Select value={settings.fontWeight} onValueChange={(value) => updateSetting("fontWeight", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Light (300)</SelectItem>
                        <SelectItem value="400">Regular (400)</SelectItem>
                        <SelectItem value="500">Medium (500)</SelectItem>
                        <SelectItem value="600">Semi Bold (600)</SelectItem>
                        <SelectItem value="700">Bold (700)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Line Height</label>
                      <span className="text-sm text-gray-500">{settings.lineHeight}</span>
                    </div>
                    <Slider
                      value={[settings.lineHeight]}
                      onValueChange={([value]) => updateSetting("lineHeight", value)}
                      max={2}
                      min={1}
                      step={0.1}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Responsive Tab */}
            <TabsContent value="responsive" className="space-y-4 mt-0">
              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle>Responsive Layouts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Mobile Layout</label>
                    <Select
                      value={settings.mobileLayout}
                      onValueChange={(value) => updateSetting("mobileLayout", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stack">Stack (Vertical)</SelectItem>
                        <SelectItem value="grid">Grid (2 columns)</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                        <SelectItem value="tabs">Tabs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tablet Layout</label>
                    <Select
                      value={settings.tabletLayout}
                      onValueChange={(value) => updateSetting("tabletLayout", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid (3 columns)</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                        <SelectItem value="masonry">Masonry</SelectItem>
                        <SelectItem value="flex">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Desktop Layout</label>
                    <Select
                      value={settings.desktopLayout}
                      onValueChange={(value) => updateSetting("desktopLayout", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                        <SelectItem value="grid">Grid (4+ columns)</SelectItem>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="split">Split View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className={isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Accessibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">High Contrast</label>
                      <p className="text-xs text-gray-500">Enhanced contrast for visibility</p>
                    </div>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Reduced Motion</label>
                      <p className="text-xs text-gray-500">Minimize animations</p>
                    </div>
                    <Switch
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Focus Indicators</label>
                      <p className="text-xs text-gray-500">Keyboard navigation highlights</p>
                    </div>
                    <Switch
                      checked={settings.focusIndicators}
                      onCheckedChange={(checked) => updateSetting("focusIndicators", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Footer Actions */}
          <div className={`p-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"} flex gap-2`}>
            <Button variant="outline" onClick={() => applyPreset(presets.modern)} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const dataStr = JSON.stringify(settings, null, 2)
                const dataBlob = new Blob([dataStr], { type: "application/json" })
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement("a")
                link.href = url
                link.download = "ui-settings.json"
                link.click()
              }}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => applySettings(settings)} className="flex-1">
              <Zap className="w-4 h-4 mr-2" />
              Apply
            </Button>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

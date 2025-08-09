"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

export function ContactApp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Message sent! (This is a demo)")
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "princerajce4@gmail.com", href: "mailto:princerajce4@gmail.com" },
    { icon: Phone, label: "Phone", value: "9142223604", href: "tel:+919142223604" },
    { icon: MapPin, label: "Location", value: "India", href: "#" },
  ]

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/princeraj07m" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/princeraj07m" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Get In Touch</h1>
        <p className="text-gray-600">Let's discuss your next project or just say hello!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-3">
                  <info.icon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">{info.label}</p>
                    <a href={info.href} className="text-blue-600 hover:underline">
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Follow Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Button key={social.label} variant="outline" size="sm" asChild>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

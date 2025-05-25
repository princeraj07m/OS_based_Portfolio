"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Mail, Phone, Globe } from "lucide-react"

export function ResumeApp() {
  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Led development of React-based web applications, mentored junior developers, and implemented modern development practices.",
      achievements: [
        "Improved application performance by 40%",
        "Led team of 4 developers",
        "Implemented CI/CD pipeline",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions LLC",
      period: "2020 - 2022",
      description: "Developed and maintained full-stack applications using React, Node.js, and PostgreSQL.",
      achievements: [
        "Built 5+ production applications",
        "Reduced server costs by 30%",
        "Implemented automated testing",
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2016 - 2020",
      gpa: "3.8/4.0",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Name</h1>
        <p className="text-lg text-gray-600 mb-4">Full Stack Developer</p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            your.email@example.com
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            (555) 123-4567
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            San Francisco, CA
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            yourportfolio.com
          </div>
        </div>

        <Button className="mt-4">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {experience.map((job, index) => (
            <div key={index} className="border-l-2 border-blue-200 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-blue-600">{job.company}</p>
                </div>
                <Badge variant="outline">{job.period}</Badge>
              </div>
              <p className="text-gray-700 mb-3">{job.description}</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {job.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          {education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-blue-600">{edu.school}</p>
                <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
              </div>
              <Badge variant="outline">{edu.period}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Frontend</h4>
              <div className="flex flex-wrap gap-1">
                {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Backend</h4>
              <div className="flex flex-wrap gap-1">
                {["Node.js", "Python", "PostgreSQL", "MongoDB"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

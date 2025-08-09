"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Mail, Phone, Globe } from "lucide-react"

export function ResumeApp() {
  const experience = [
    {
      title: "Intern",
      company: "Codeship",
      period: "July 2025 - Sept 2025",
      description: "Gained hands-on experience with industry-standard development practices.",
      achievements: [
        "Contributed to live projects.",
        "Worked with a team of experienced developers.",
      ],
    },
    {
      title: "Full Stack Intern",
      company: "Webloom Tech",
      period: "June 2024 – Aug 2024",
      description: "Developed AI-integrated e-commerce dashboard.",
      achievements: [
        "Optimized web performance, reducing load time by 30%.",
        "Implemented responsive UI with Tailwind CSS and React.js.",
      ],
    },
  ]

  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      school: "[Your College Name]",
      period: "2022 – 2026",
      gpa: "9.0",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Prince Raj</h1>
        <p className="text-lg text-gray-600 mb-4">Full Stack Developer | AI & IoT Innovator | MERN & Blockchain Enthusiast</p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            princerajce4@gmail.com
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            9142223604
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            India
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            princeraj07m.github.io
          </div>
        </div>

        <Button className="mt-4" asChild>
          <a href="/prince_resume.pdf" download>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </a>
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
              <h4 className="font-medium text-gray-800 mb-2">Programming Languages</h4>
              <div className="flex flex-wrap gap-1">
                {["C++", "Python", "JavaScript"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Frameworks & Libraries</h4>
              <div className="flex flex-wrap gap-1">
                {["React.js", "Node.js", "Express.js", "Tailwind CSS", "FastAPI", "LangChain"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Databases</h4>
              <div className="flex flex-wrap gap-1">
                {["MongoDB", "MySQL", "PostgreSQL"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Tools & Platforms</h4>
              <div className="flex flex-wrap gap-1">
                {["Git", "GitHub", "Netlify", "Vercel", "Firebase", "Docker"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-1">
                {["AI/ML", "Blockchain", "IoT", "Web3", "Cloud"].map((skill) => (
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

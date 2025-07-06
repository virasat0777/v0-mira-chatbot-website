"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Award, MapPin, Target, Eye, Heart } from "lucide-react"
import { ApiService } from "@/lib/api"

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  bio: string
}

interface Achievement {
  id: number
  title: string
  description: string
  year: string
  icon: string
}

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "50+ Projects Completed",
      description: "Successfully delivered premium residential projects",
      year: "2024",
      icon: "building",
    },
    {
      id: 2,
      title: "10,000+ Happy Families",
      description: "Families living their dream in our properties",
      year: "2024",
      icon: "users",
    },
    {
      id: 3,
      title: "Best Developer Award",
      description: "Recognized for excellence in real estate development",
      year: "2023",
      icon: "award",
    },
    {
      id: 4,
      title: "Green Building Certified",
      description: "Committed to sustainable construction practices",
      year: "2023",
      icon: "leaf",
    },
  ])

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await ApiService.getTeam()
        setTeamMembers(data)
      } catch (error) {
        console.error("Error fetching team data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
    setIsVisible(true)
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "building":
        return <Building2 className="h-8 w-8" />
      case "users":
        return <Users className="h-8 w-8" />
      case "award":
        return <Award className="h-8 w-8" />
      default:
        return <MapPin className="h-8 w-8" />
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">About Virasat Group</h1>
            <p className="text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              Building dreams, creating legacies. We are committed to delivering exceptional real estate experiences
              that transform lives and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div
              className={`text-center transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-7">
                To create exceptional living spaces that enhance the quality of life for our customers while
                contributing to sustainable urban development.
              </p>
            </div>

            <div
              className={`text-center transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-7">
                To be the most trusted and innovative real estate developer, setting new standards in luxury, quality,
                and customer satisfaction.
              </p>
            </div>

            <div
              className={`text-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-7">
                Integrity, excellence, innovation, and customer-centricity guide every decision we make and every
                project we undertake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Achievements</h2>
            <p className="mt-4 text-lg text-gray-600">Milestones that define our journey of excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.id}
                className={`text-center transition-all duration-1000 delay-${(index + 1) * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <CardContent className="p-6">
                  <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4 text-white">
                    {getIcon(achievement.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 mb-3">{achievement.description}</p>
                  <Badge variant="outline">{achievement.year}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">The visionaries behind Virasat Group</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading team members...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className={`overflow-hidden transition-all duration-1000 delay-${(index + 1) * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-amber-600 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

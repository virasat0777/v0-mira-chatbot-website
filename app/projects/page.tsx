"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Star } from "lucide-react"
import { ApiService } from "@/lib/api"

interface Project {
  id: number
  title: string
  description: string
  location: string
  status: string
  price: string
  type: string
  bedrooms: string
  area: string
  image: string
  features: string[]
  rating: number
  completionDate: string
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterType, setFilterType] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

  // Replace the static projects state with API call
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ApiService.getProjects()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
    setIsVisible(true)
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || project.status === filterStatus
    const matchesType = filterType === "All" || project.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready to Move":
        return "bg-green-100 text-green-800"
      case "Under Construction":
        return "bg-yellow-100 text-yellow-800"
      case "Launching Soon":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">Our Projects</h1>
            <p className="text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              Discover our portfolio of exceptional residential developments across prime locations
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-md px-3 py-2 bg-white"
              >
                <option value="All">All Status</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Launching Soon">Launching Soon</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded-md px-3 py-2 bg-white"
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading projects...</p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`overflow-hidden hover:shadow-xl transition-all duration-500 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getStatusColor(project.status)} border-0`}>{project.status}</Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{project.rating}</span>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Type:</span>
                        <p className="text-gray-600">{project.type}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Bedrooms:</span>
                        <p className="text-gray-600">{project.bedrooms}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Area:</span>
                        <p className="text-gray-600">{project.area}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Completion:</span>
                        <p className="text-gray-600">{project.completionDate}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 4).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {project.features.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.features.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-amber-600">{project.price}</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {filteredProjects.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

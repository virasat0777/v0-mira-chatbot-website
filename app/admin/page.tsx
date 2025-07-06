"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Trash2,
  Edit,
  Plus,
  LogOut,
  Home,
  Building,
  Newspaper,
  BookOpen,
  Users,
  Briefcase,
  Settings,
  BarChart3,
  Bell,
  Calendar,
  User,
  Clock,
  Eye,
  MapPin,
} from "lucide-react"
import { ApiService } from "@/lib/api"

// Add this to make the page statically exportable
export const dynamic = "force-static"

export default function AdminPanel() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Dialog states
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false)
  const [isAddNewsDialogOpen, setIsAddNewsDialogOpen] = useState(false)
  const [isEditNewsDialogOpen, setIsEditNewsDialogOpen] = useState(false)
  const [isAddBlogDialogOpen, setIsAddBlogDialogOpen] = useState(false)
  const [isEditBlogDialogOpen, setIsEditBlogDialogOpen] = useState(false)
  const [isAddCareerDialogOpen, setIsAddCareerDialogOpen] = useState(false)
  const [isEditCareerDialogOpen, setIsEditCareerDialogOpen] = useState(false)
  const [isAddTeamDialogOpen, setIsAddTeamDialogOpen] = useState(false)
  const [isEditTeamDialogOpen, setIsEditTeamDialogOpen] = useState(false)

  // Editing states
  const [editingProject, setEditingProject] = useState<any>(null)
  const [editingNews, setEditingNews] = useState<any>(null)
  const [editingBlog, setEditingBlog] = useState<any>(null)
  const [editingCareer, setEditingCareer] = useState<any>(null)
  const [editingTeamMember, setEditingTeamMember] = useState<any>(null)

  // Stats data
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalNews: 0,
    totalBlogs: 0,
    totalCareers: 0,
    totalContacts: 0,
  })

  // Data states
  const [projects, setProjects] = useState([])
  const [news, setNews] = useState([])
  const [blogs, setBlogs] = useState([])
  const [careers, setCareers] = useState([])
  const [team, setTeam] = useState([])

  // Form states
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Market Insights",
    author: "",
    publish_date: new Date().toISOString().split("T")[0],
    read_time: "",
    views: 0,
    image: "",
    tags: [] as string[],
  })

  const [newCareer, setNewCareer] = useState({
    title: "",
    department: "Construction",
    location: "",
    type: "Full-time",
    experience: "",
    description: "",
    requirements: [] as string[],
    benefits: [] as string[],
    posted_date: new Date().toISOString().split("T")[0],
    status: "Active",
  })

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    location: "",
    status: "Under Construction",
    price: "",
    type: "Apartment",
    bedrooms: "",
    area: "",
    image: "",
    features: [] as string[],
    rating: 0,
    completion_date: "",
  })

  const [newNews, setNewNews] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Launch",
    author: "",
    publish_date: new Date().toISOString().split("T")[0],
    image: "",
    featured: false,
  })

  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
  })

  const [contentSettings, setContentSettings] = useState({})
  const [bannerSettings, setBannerSettings] = useState({})

  // Helper states for dynamic inputs
  const [tagInput, setTagInput] = useState("")
  const [requirementInput, setRequirementInput] = useState("")
  const [benefitInput, setBenefitInput] = useState("")

  // Categories and options
  const newsCategories = ["Launch", "Progress", "Awards", "Sustainability", "Market Analysis"]
  const blogCategories = ["Market Insights", "Buying Guide", "Sustainability", "Investment", "Design", "Finance"]
  const departments = ["Construction", "Marketing", "Sales", "Design", "Finance", "Human Resources"]
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

  useEffect(() => {
    // Check authentication only on client side
    if (typeof window !== "undefined") {
      const authenticated = localStorage.getItem("adminAuthenticated")
      if (!authenticated) {
        router.push("/admin/login")
        return
      }
      setIsAuthenticated(true)
      fetchAllData()
    }
    setLoading(false)
  }, [router])

  const fetchAllData = async () => {
    try {
      const [projectsData, newsData, blogsData, careersData, teamData] = await Promise.all([
        ApiService.getProjects(),
        ApiService.getNews(),
        ApiService.getBlogs(),
        ApiService.getCareers(),
        ApiService.getTeam(),
      ])

      setProjects(projectsData)
      setNews(newsData)
      setBlogs(blogsData)
      setCareers(careersData)
      setTeam(teamData)

      setStats({
        totalProjects: projectsData.length,
        totalNews: newsData.length,
        totalBlogs: blogsData.length,
        totalCareers: careersData.length,
        totalContacts: 0, // Will be fetched separately
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminAuthenticated")
      localStorage.removeItem("adminEmail")
    }
    router.push("/admin/login")
  }

  // Project handlers
  const handleAddProject = async () => {
    try {
      await ApiService.addProject(newProject)
      setNewProject({
        title: "",
        description: "",
        location: "",
        status: "Under Construction",
        price: "",
        type: "Apartment",
        bedrooms: "",
        area: "",
        image: "",
        features: [] as string[],
        rating: 0,
        completion_date: "",
      })
      setIsAddProjectDialogOpen(false)
      fetchAllData()
      alert("Project added successfully!")
    } catch (error) {
      console.error("Error adding project:", error)
      alert("Error adding project")
    }
  }

  const handleEditProject = async () => {
    if (!editingProject) return
    try {
      await ApiService.updateProject(editingProject)
      setIsEditProjectDialogOpen(false)
      setEditingProject(null)
      fetchAllData()
      alert("Project updated successfully!")
    } catch (error) {
      console.error("Error updating project:", error)
      alert("Error updating project")
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await ApiService.deleteProject(id)
        fetchAllData()
        alert("Project deleted successfully!")
      } catch (error) {
        console.error("Error deleting project:", error)
        alert("Error deleting project")
      }
    }
  }

  // News handlers
  const handleAddNews = async () => {
    try {
      await ApiService.addNews(newNews)
      setNewNews({
        title: "",
        excerpt: "",
        content: "",
        category: "Launch",
        author: "",
        publish_date: new Date().toISOString().split("T")[0],
        image: "",
        featured: false,
      })
      setIsAddNewsDialogOpen(false)
      fetchAllData()
      alert("News article added successfully!")
    } catch (error) {
      console.error("Error adding news:", error)
      alert("Error adding news article")
    }
  }

  const handleEditNews = async () => {
    if (!editingNews) return
    try {
      await ApiService.updateNews(editingNews)
      setIsEditNewsDialogOpen(false)
      setEditingNews(null)
      fetchAllData()
      alert("News article updated successfully!")
    } catch (error) {
      console.error("Error updating news:", error)
      alert("Error updating news article")
    }
  }

  const handleDeleteNews = async (id: number) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      try {
        await ApiService.deleteNews(id)
        fetchAllData()
        alert("News article deleted successfully!")
      } catch (error) {
        console.error("Error deleting news:", error)
        alert("Error deleting news article")
      }
    }
  }

  // Blog handlers
  const handleAddBlog = async () => {
    try {
      await ApiService.addBlog(newBlog)
      setNewBlog({
        title: "",
        excerpt: "",
        content: "",
        category: "Market Insights",
        author: "",
        publish_date: new Date().toISOString().split("T")[0],
        read_time: "",
        views: 0,
        image: "",
        tags: [] as string[],
      })
      setIsAddBlogDialogOpen(false)
      fetchAllData()
      alert("Blog post added successfully!")
    } catch (error) {
      console.error("Error adding blog:", error)
      alert("Error adding blog post")
    }
  }

  const handleEditBlog = async () => {
    if (!editingBlog) return
    try {
      await ApiService.updateBlog(editingBlog)
      setIsEditBlogDialogOpen(false)
      setEditingBlog(null)
      fetchAllData()
      alert("Blog post updated successfully!")
    } catch (error) {
      console.error("Error updating blog:", error)
      alert("Error updating blog post")
    }
  }

  const handleDeleteBlog = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await ApiService.deleteBlog(id)
        fetchAllData()
        alert("Blog post deleted successfully!")
      } catch (error) {
        console.error("Error deleting blog:", error)
        alert("Error deleting blog post")
      }
    }
  }

  // Career handlers
  const handleAddCareer = async () => {
    try {
      await ApiService.addCareer(newCareer)
      setNewCareer({
        title: "",
        department: "Construction",
        location: "",
        type: "Full-time",
        experience: "",
        description: "",
        requirements: [] as string[],
        benefits: [] as string[],
        posted_date: new Date().toISOString().split("T")[0],
        status: "Active",
      })
      setIsAddCareerDialogOpen(false)
      fetchAllData()
      alert("Job opening added successfully!")
    } catch (error) {
      console.error("Error adding career:", error)
      alert("Error adding job opening")
    }
  }

  const handleEditCareer = async () => {
    if (!editingCareer) return
    try {
      await ApiService.updateCareer(editingCareer)
      setIsEditCareerDialogOpen(false)
      setEditingCareer(null)
      fetchAllData()
      alert("Job opening updated successfully!")
    } catch (error) {
      console.error("Error updating career:", error)
      alert("Error updating job opening")
    }
  }

  const handleDeleteCareer = async (id: number) => {
    if (confirm("Are you sure you want to delete this job opening?")) {
      try {
        await ApiService.deleteCareer(id)
        fetchAllData()
        alert("Job opening deleted successfully!")
      } catch (error) {
        console.error("Error deleting career:", error)
        alert("Error deleting job opening")
      }
    }
  }

  // Team handlers
  const handleAddTeamMember = async () => {
    try {
      await ApiService.addTeamMember(newTeamMember)
      setNewTeamMember({
        name: "",
        position: "",
        bio: "",
        image: "",
      })
      setIsAddTeamDialogOpen(false)
      fetchAllData()
      alert("Team member added successfully!")
    } catch (error) {
      console.error("Error adding team member:", error)
      alert("Error adding team member")
    }
  }

  const handleEditTeamMember = async () => {
    if (!editingTeamMember) return
    try {
      await ApiService.updateTeamMember(editingTeamMember)
      setIsEditTeamDialogOpen(false)
      setEditingTeamMember(null)
      fetchAllData()
      alert("Team member updated successfully!")
    } catch (error) {
      console.error("Error updating team member:", error)
      alert("Error updating team member")
    }
  }

  const handleDeleteTeamMember = async (id: number) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await ApiService.deleteTeamMember(id)
        fetchAllData()
        alert("Team member deleted successfully!")
      } catch (error) {
        console.error("Error deleting team member:", error)
        alert("Error deleting team member")
      }
    }
  }

  // Helper functions for dynamic inputs
  const handleAddTag = (isEdit = false) => {
    if (tagInput.trim()) {
      if (isEdit && editingBlog) {
        setEditingBlog({
          ...editingBlog,
          tags: [...(editingBlog.tags || []), tagInput.trim()],
        })
      } else {
        setNewBlog({
          ...newBlog,
          tags: [...newBlog.tags, tagInput.trim()],
        })
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (index: number, isEdit = false) => {
    if (isEdit && editingBlog) {
      setEditingBlog({
        ...editingBlog,
        tags: (editingBlog.tags || []).filter((_: any, i: number) => i !== index),
      })
    } else {
      setNewBlog({
        ...newBlog,
        tags: newBlog.tags.filter((_, i) => i !== index),
      })
    }
  }

  const handleAddRequirement = (isEdit = false) => {
    if (requirementInput.trim()) {
      if (isEdit && editingCareer) {
        setEditingCareer({
          ...editingCareer,
          requirements: [...(editingCareer.requirements || []), requirementInput.trim()],
        })
      } else {
        setNewCareer({
          ...newCareer,
          requirements: [...newCareer.requirements, requirementInput.trim()],
        })
      }
      setRequirementInput("")
    }
  }

  const handleRemoveRequirement = (index: number, isEdit = false) => {
    if (isEdit && editingCareer) {
      setEditingCareer({
        ...editingCareer,
        requirements: (editingCareer.requirements || []).filter((_: any, i: number) => i !== index),
      })
    } else {
      setNewCareer({
        ...newCareer,
        requirements: newCareer.requirements.filter((_, i) => i !== index),
      })
    }
  }

  const handleAddBenefit = (isEdit = false) => {
    if (benefitInput.trim()) {
      if (isEdit && editingCareer) {
        setEditingCareer({
          ...editingCareer,
          benefits: [...(editingCareer.benefits || []), benefitInput.trim()],
        })
      } else {
        setNewCareer({
          ...newCareer,
          benefits: [...newCareer.benefits, benefitInput.trim()],
        })
      }
      setBenefitInput("")
    }
  }

  const handleRemoveBenefit = (index: number, isEdit = false) => {
    if (isEdit && editingCareer) {
      setEditingCareer({
        ...editingCareer,
        benefits: (editingCareer.benefits || []).filter((_: any, i: number) => i !== index),
      })
    } else {
      setNewCareer({
        ...newCareer,
        benefits: newCareer.benefits.filter((_, i) => i !== index),
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
      </div>
    )
  }

  if (typeof window !== "undefined" && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please log in to access the admin panel.</p>
          <Button onClick={() => router.push("/admin/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "projects", label: "Projects", icon: Building },
    { id: "news", label: "News", icon: Newspaper },
    { id: "blogs", label: "Blogs", icon: BookOpen },
    { id: "careers", label: "Careers", icon: Briefcase },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Virasat Admin</h1>
              <p className="text-sm text-gray-500">Management Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-amber-100 text-amber-700">VG</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-amber-50 text-amber-700 border-r-2 border-amber-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome back! Here's what's happening with your website.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Projects</p>
                        <p className="text-3xl font-bold">{stats.totalProjects}</p>
                      </div>
                      <Building className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">News Articles</p>
                        <p className="text-3xl font-bold">{stats.totalNews}</p>
                      </div>
                      <Newspaper className="h-8 w-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Blog Posts</p>
                        <p className="text-3xl font-bold">{stats.totalBlogs}</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Job Openings</p>
                        <p className="text-3xl font-bold">{stats.totalCareers}</p>
                      </div>
                      <Briefcase className="h-8 w-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-100">Team Members</p>
                        <p className="text-3xl font-bold">{team.length}</p>
                      </div>
                      <Users className="h-8 w-8 text-amber-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isAddNewsDialogOpen} onOpenChange={setIsAddNewsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Newspaper className="h-4 w-4 mr-2" />
                          Add News
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isAddBlogDialogOpen} onOpenChange={setIsAddBlogDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Add Blog
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isAddCareerDialogOpen} onOpenChange={setIsAddCareerDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Add Job
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Dialog open={isAddTeamDialogOpen} onOpenChange={setIsAddTeamDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          Add Member
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
                  <p className="text-gray-600">Manage your real estate projects</p>
                </div>
                <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Project
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {projects.map((project: any) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-3">{project.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {project.location}
                            </div>
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              {project.type}
                            </div>
                            <span className="font-medium text-amber-600">{project.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={project.status === "Ready to Move" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                            <Badge variant="outline">{project.bedrooms} BHK</Badge>
                            <Badge variant="outline">{project.area}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingProject(project)
                              setIsEditProjectDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "news" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">News Management</h2>
                  <p className="text-gray-600">Manage news articles and media content</p>
                </div>
                <Dialog open={isAddNewsDialogOpen} onOpenChange={setIsAddNewsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add News Article
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {news.map((article: any) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-green-100 text-green-800 border-0">{article.category}</Badge>
                            {article.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-0">Featured</Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                          <p className="text-gray-600 mb-3">{article.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {article.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(article.publish_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingNews(article)
                              setIsEditNewsDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteNews(article.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                  <p className="text-gray-600">Create and manage blog posts</p>
                </div>
                <Dialog open={isAddBlogDialogOpen} onOpenChange={setIsAddBlogDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Blog Post
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {blogs.map((post: any) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-blue-100 text-blue-800 border-0">{post.category}</Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                          <p className="text-gray-600 mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {post.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(post.publish_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.read_time}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views} views
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {post.tags?.slice(0, 3).map((tag: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags?.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingBlog(post)
                              setIsEditBlogDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBlog(post.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "careers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Careers Management</h2>
                  <p className="text-gray-600">Post and manage job openings</p>
                </div>
                <Dialog open={isAddCareerDialogOpen} onOpenChange={setIsAddCareerDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Job Opening
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {careers.map((job: any) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-green-100 text-green-800 border-0">{job.type}</Badge>
                            <Badge variant="outline">{job.department}</Badge>
                            {job.status === "Active" && (
                              <Badge className="bg-green-100 text-green-800 border-0">Active</Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <p className="text-gray-600 mb-3">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {job.experience}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(job.posted_date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Requirements:</h4>
                              <ul className="space-y-1">
                                {job.requirements?.slice(0, 2).map((req: string, idx: number) => (
                                  <li key={idx} className="text-gray-600 flex items-start">
                                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                    {req}
                                  </li>
                                ))}
                                {job.requirements?.length > 2 && (
                                  <li className="text-gray-500 text-xs">+{job.requirements.length - 2} more</li>
                                )}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Benefits:</h4>
                              <ul className="space-y-1">
                                {job.benefits?.slice(0, 2).map((benefit: string, idx: number) => (
                                  <li key={idx} className="text-gray-600 flex items-start">
                                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                    {benefit}
                                  </li>
                                ))}
                                {job.benefits?.length > 2 && (
                                  <li className="text-gray-500 text-xs">+{job.benefits.length - 2} more</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingCareer(job)
                              setIsEditCareerDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCareer(job.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
                  <p className="text-gray-600">Add and manage team members</p>
                </div>
                <Dialog open={isAddTeamDialogOpen} onOpenChange={setIsAddTeamDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member: any) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                          {member.image ? (
                            <img
                              src={member.image || "/placeholder.svg"}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-amber-600 font-medium mb-3">{member.position}</p>
                        <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                        <div className="flex justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingTeamMember(member)
                              setIsEditTeamDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTeamMember(member.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <p className="text-gray-600">Configure system settings and preferences</p>
              </div>
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Settings section is under development</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Add Project Dialog */}
      <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>Create a new project listing for your website</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <Input
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="Location"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  placeholder="Price"
                  value={newProject.price}
                  onChange={(e) => setNewProject({ ...newProject, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <Input
                  placeholder="Bedrooms"
                  value={newProject.bedrooms}
                  onChange={(e) => setNewProject({ ...newProject, bedrooms: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Area</label>
                <Input
                  placeholder="Area"
                  value={newProject.area}
                  onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Under Construction">Under Construction</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Launching Soon">Launching Soon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={newProject.type}
                  onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddProjectDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProject} className="bg-amber-600 hover:bg-amber-700">
                Add Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditProjectDialogOpen} onOpenChange={setIsEditProjectDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project information</DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title</label>
                  <Input
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    value={editingProject.price}
                    onChange={(e) => setEditingProject({ ...editingProject, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bedrooms</label>
                  <Input
                    value={editingProject.bedrooms}
                    onChange={(e) => setEditingProject({ ...editingProject, bedrooms: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Area</label>
                  <Input
                    value={editingProject.area}
                    onChange={(e) => setEditingProject({ ...editingProject, area: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Under Construction">Under Construction</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Launching Soon">Launching Soon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={editingProject.type}
                    onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditProjectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditProject} className="bg-amber-600 hover:bg-amber-700">
                  Update Project
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add News Dialog */}
      <Dialog open={isAddNewsDialogOpen} onOpenChange={setIsAddNewsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add News Article</DialogTitle>
            <DialogDescription>Create a new news article for your website</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  placeholder="News article title"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  {newsCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <Textarea
                placeholder="Brief description of the news article"
                value={newNews.excerpt}
                onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Full Content</label>
              <Textarea
                placeholder="Full article content"
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                rows={6}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <Input
                  placeholder="Author name"
                  value={newNews.author}
                  onChange={(e) => setNewNews({ ...newNews, author: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Publish Date</label>
                <Input
                  type="date"
                  value={newNews.publish_date}
                  onChange={(e) => setNewNews({ ...newNews, publish_date: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={newNews.image}
                onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured-news"
                checked={newNews.featured}
                onChange={(e) => setNewNews({ ...newNews, featured: e.target.checked })}
              />
              <label htmlFor="featured-news" className="text-sm font-medium">
                Featured Article
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddNewsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNews} className="bg-amber-600 hover:bg-amber-700">
                Add Article
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit News Dialog */}
      <Dialog open={isEditNewsDialogOpen} onOpenChange={setIsEditNewsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit News Article</DialogTitle>
            <DialogDescription>Update the news article information</DialogDescription>
          </DialogHeader>
          {editingNews && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={editingNews.title}
                    onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={editingNews.category}
                    onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    {newsCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <Textarea
                  value={editingNews.excerpt}
                  onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Full Content</label>
                <Textarea
                  value={editingNews.content}
                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <Input
                    value={editingNews.author}
                    onChange={(e) => setEditingNews({ ...editingNews, author: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Publish Date</label>
                  <Input
                    type="date"
                    value={editingNews.publish_date}
                    onChange={(e) => setEditingNews({ ...editingNews, publish_date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  value={editingNews.image}
                  onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-featured-news"
                  checked={editingNews.featured}
                  onChange={(e) => setEditingNews({ ...editingNews, featured: e.target.checked })}
                />
                <label htmlFor="edit-featured-news" className="text-sm font-medium">
                  Featured Article
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditNewsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditNews} className="bg-amber-600 hover:bg-amber-700">
                  Update Article
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Blog Dialog */}
      <Dialog open={isAddBlogDialogOpen} onOpenChange={setIsAddBlogDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Blog Post</DialogTitle>
            <DialogDescription>Create a new blog post for your website</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  placeholder="Blog post title"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  {blogCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <Textarea
                placeholder="Brief description of the blog post"
                value={newBlog.excerpt}
                onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Full Content</label>
              <Textarea
                placeholder="Full blog post content"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                rows={8}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <Input
                  placeholder="Author name"
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Read Time</label>
                <Input
                  placeholder="5 min read"
                  value={newBlog.read_time}
                  onChange={(e) => setNewBlog({ ...newBlog, read_time: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Publish Date</label>
                <Input
                  type="date"
                  value={newBlog.publish_date}
                  onChange={(e) => setNewBlog({ ...newBlog, publish_date: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={newBlog.image}
                onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button type="button" onClick={() => handleAddTag()} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newBlog.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(index)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddBlogDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBlog} className="bg-amber-600 hover:bg-amber-700">
                Publish Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditBlogDialogOpen} onOpenChange={setIsEditBlogDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>Update the blog post information</DialogDescription>
          </DialogHeader>
          {editingBlog && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    {blogCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <Textarea
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Full Content</label>
                <Textarea
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  rows={8}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <Input
                    value={editingBlog.author}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Read Time</label>
                  <Input
                    value={editingBlog.read_time}
                    onChange={(e) => setEditingBlog({ ...editingBlog, read_time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Publish Date</label>
                  <Input
                    type="date"
                    value={editingBlog.publish_date}
                    onChange={(e) => setEditingBlog({ ...editingBlog, publish_date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  value={editingBlog.image}
                  onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag(true)}
                  />
                  <Button type="button" onClick={() => handleAddTag(true)} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingBlog.tags?.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(index, true)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditBlogDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditBlog} className="bg-amber-600 hover:bg-amber-700">
                  Update Post
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Career Dialog */}
      <Dialog open={isAddCareerDialogOpen} onOpenChange={setIsAddCareerDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Job Opening</DialogTitle>
            <DialogDescription>Create a new job posting for your company</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title</label>
                <Input
                  placeholder="Senior Software Engineer"
                  value={newCareer.title}
                  onChange={(e) => setNewCareer({ ...newCareer, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <select
                  value={newCareer.department}
                  onChange={(e) => setNewCareer({ ...newCareer, department: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="Lucknow, UP"
                  value={newCareer.location}
                  onChange={(e) => setNewCareer({ ...newCareer, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Job Type</label>
                <select
                  value={newCareer.type}
                  onChange={(e) => setNewCareer({ ...newCareer, type: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Experience Required</label>
                <Input
                  placeholder="2-5 years"
                  value={newCareer.experience}
                  onChange={(e) => setNewCareer({ ...newCareer, experience: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <Textarea
                placeholder="Detailed job description..."
                value={newCareer.description}
                onChange={(e) => setNewCareer({ ...newCareer, description: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Requirements</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a requirement"
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddRequirement()}
                />
                <Button type="button" onClick={() => handleAddRequirement()} variant="outline">
                  Add
                </Button>
              </div>
              <div className="space-y-1">
                {newCareer.requirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{req}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveRequirement(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Benefits</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a benefit"
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddBenefit()}
                />
                <Button type="button" onClick={() => handleAddBenefit()} variant="outline">
                  Add
                </Button>
              </div>
              <div className="space-y-1">
                {newCareer.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{benefit}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBenefit(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddCareerDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCareer} className="bg-amber-600 hover:bg-amber-700">
                Post Job
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Career Dialog */}
      <Dialog open={isEditCareerDialogOpen} onOpenChange={setIsEditCareerDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job Opening</DialogTitle>
            <DialogDescription>Update the job opening information</DialogDescription>
          </DialogHeader>
          {editingCareer && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <Input
                    value={editingCareer.title}
                    onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select
                    value={editingCareer.department}
                    onChange={(e) => setEditingCareer({ ...editingCareer, department: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={editingCareer.location}
                    onChange={(e) => setEditingCareer({ ...editingCareer, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Type</label>
                  <select
                    value={editingCareer.type}
                    onChange={(e) => setEditingCareer({ ...editingCareer, type: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Required</label>
                  <Input
                    value={editingCareer.experience}
                    onChange={(e) => setEditingCareer({ ...editingCareer, experience: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Job Description</label>
                <Textarea
                  value={editingCareer.description}
                  onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Requirements</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a requirement"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddRequirement(true)}
                  />
                  <Button type="button" onClick={() => handleAddRequirement(true)} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="space-y-1">
                  {editingCareer.requirements?.map((req: string, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{req}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRequirement(index, true)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Benefits</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a benefit"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddBenefit(true)}
                  />
                  <Button type="button" onClick={() => handleAddBenefit(true)} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="space-y-1">
                  {editingCareer.benefits?.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{benefit}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBenefit(index, true)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditCareerDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditCareer} className="bg-amber-600 hover:bg-amber-700">
                  Update Job
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Team Member Dialog */}
      <Dialog open={isAddTeamDialogOpen} onOpenChange={setIsAddTeamDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>Add a new member to your team</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  placeholder="Team member name"
                  value={newTeamMember.name}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Position</label>
                <Input
                  placeholder="Job title/position"
                  value={newTeamMember.position}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, position: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <Textarea
                placeholder="Brief description about the team member"
                value={newTeamMember.bio}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, bio: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Profile Image URL</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={newTeamMember.image}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, image: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddTeamDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTeamMember} className="bg-amber-600 hover:bg-amber-700">
                Add Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Team Member Dialog */}
      <Dialog open={isEditTeamDialogOpen} onOpenChange={setIsEditTeamDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>Update team member information</DialogDescription>
          </DialogHeader>
          {editingTeamMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={editingTeamMember.name}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <Input
                    value={editingTeamMember.position}
                    onChange={(e) => setEditingTeamMember({ ...editingTeamMember, position: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <Textarea
                  value={editingTeamMember.bio}
                  onChange={(e) => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                <Input
                  value={editingTeamMember.image}
                  onChange={(e) => setEditingTeamMember({ ...editingTeamMember, image: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditTeamDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditTeamMember} className="bg-amber-600 hover:bg-amber-700">
                  Update Member
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

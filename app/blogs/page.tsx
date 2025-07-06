"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight, Clock, Eye } from "lucide-react"
import { ApiService } from "@/lib/api"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishDate: string
  readTime: string
  views: number
  image: string
  tags: string[]
}

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

  // Replace the static blogPosts state with API call
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await ApiService.getBlogs()
        setBlogPosts(data)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
    setIsVisible(true)
  }, [])

  const filteredBlogs = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "All" || post.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Market Insights":
        return "bg-blue-100 text-blue-800"
      case "Buying Guide":
        return "bg-green-100 text-green-800"
      case "Sustainability":
        return "bg-emerald-100 text-emerald-800"
      case "Investment":
        return "bg-purple-100 text-purple-800"
      case "Design":
        return "bg-pink-100 text-pink-800"
      case "Finance":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">Our Blog</h1>
            <p className="text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              Insights, tips, and expert advice on real estate, home buying, and property investment
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded-md px-3 py-2 bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Market Insights">Market Insights</option>
              <option value="Buying Guide">Buying Guide</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Investment">Investment</option>
              <option value="Design">Design</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      {filteredBlogs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <Card
              className={`overflow-hidden hover:shadow-xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-gray-200">
                  <img
                    src={filteredBlogs[0].image || "/placeholder.svg"}
                    alt={filteredBlogs[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className={`${getCategoryColor(filteredBlogs[0].category)} border-0`}>
                      {filteredBlogs[0].category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(filteredBlogs[0].publishDate)}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-amber-600 transition-colors">
                    {filteredBlogs[0].title}
                  </h3>

                  <p className="text-gray-700 mb-6">{filteredBlogs[0].excerpt}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {filteredBlogs[0].author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {filteredBlogs[0].readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {filteredBlogs[0].views.toLocaleString()} views
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredBlogs[0].tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="bg-amber-600 hover:bg-amber-700 group">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.slice(1).map((post, index) => (
              <Card
                key={post.id}
                className={`overflow-hidden hover:shadow-lg transition-all duration-500 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="aspect-video bg-gray-200">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getCategoryColor(post.category)} border-0 text-xs`}>{post.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.publishDate)}
                    </div>
                  </div>
                  <CardTitle className="text-lg hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-gray-600 text-sm">
                    <User className="h-3 w-3" />
                    {post.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" className="group w-full bg-transparent">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

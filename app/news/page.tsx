"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import { ApiService } from "@/lib/api"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishDate: string
  image: string
  featured: boolean
}

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

  // Replace the static newsItems state with API call
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await ApiService.getNews()
        setNewsItems(data)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
    setIsVisible(true)
  }, [])

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = filteredNews.filter((item) => item.featured)
  const regularNews = filteredNews.filter((item) => !item.featured)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Launch":
        return "bg-green-100 text-green-800"
      case "Progress":
        return "bg-blue-100 text-blue-800"
      case "Awards":
        return "bg-purple-100 text-purple-800"
      case "Sustainability":
        return "bg-emerald-100 text-emerald-800"
      case "Market Analysis":
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">News & Media</h1>
            <p className="text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest news, developments, and insights from Virasat Group
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
                placeholder="Search news..."
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
              <option value="Launch">Launch</option>
              <option value="Progress">Progress</option>
              <option value="Awards">Awards</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Market Analysis">Market Analysis</option>
            </select>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((item, index) => (
                <Card
                  key={item.id}
                  className={`overflow-hidden hover:shadow-xl transition-all duration-500 delay-${index * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${getCategoryColor(item.category)} border-0`}>{item.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(item.publishDate)}
                      </div>
                    </div>
                    <CardTitle className="text-xl hover:text-amber-600 transition-colors">{item.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-gray-600">
                      <User className="h-4 w-4" />
                      {item.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{item.excerpt}</p>
                    <Button variant="outline" className="group bg-transparent">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((item, index) => (
              <Card
                key={item.id}
                className={`overflow-hidden hover:shadow-lg transition-all duration-500 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="aspect-video bg-gray-200">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getCategoryColor(item.category)} border-0 text-xs`}>{item.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(item.publishDate)}
                    </div>
                  </div>
                  <CardTitle className="text-lg hover:text-amber-600 transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-gray-600 text-sm">
                    <User className="h-3 w-3" />
                    {item.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                  <Button variant="outline" size="sm" className="group bg-transparent">
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

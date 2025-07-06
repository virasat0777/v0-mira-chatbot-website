"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Edit, Plus, Calendar, User } from "lucide-react"
import { ApiService } from "@/lib/api"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publish_date: string
  image: string
  featured: boolean
}

interface NewsManagementProps {
  news: NewsItem[]
  onRefresh: () => void
}

export default function NewsManagement({ news, onRefresh }: NewsManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
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

  const categories = ["Launch", "Progress", "Awards", "Sustainability", "Market Analysis"]

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
      setIsAddDialogOpen(false)
      onRefresh()
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
      setIsEditDialogOpen(false)
      setEditingNews(null)
      onRefresh()
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
        onRefresh()
        alert("News article deleted successfully!")
      } catch (error) {
        console.error("Error deleting news:", error)
        alert("Error deleting news article")
      }
    }
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">News Management</h2>
          <p className="text-gray-600">Manage news articles and media content</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Add News Article
            </Button>
          </DialogTrigger>
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
                    {categories.map((cat) => (
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
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddNews} className="bg-amber-600 hover:bg-amber-700">
                  Add Article
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {news.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`${getCategoryColor(article.category)} border-0`}>{article.category}</Badge>
                    {article.featured && <Badge className="bg-yellow-100 text-yellow-800 border-0">Featured</Badge>}
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
                      setIsEditDialogOpen(true)
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                    {categories.map((cat) => (
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
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
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
    </div>
  )
}

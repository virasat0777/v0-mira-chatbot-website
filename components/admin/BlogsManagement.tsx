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
import { Trash2, Edit, Plus, Calendar, User, Clock, Eye } from "lucide-react"
import { ApiService } from "@/lib/api"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publish_date: string
  read_time: string
  views: number
  image: string
  tags: string[]
}

interface BlogsManagementProps {
  blogs: BlogPost[]
  onRefresh: () => void
}

export default function BlogsManagement({ blogs, onRefresh }: BlogsManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
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
    tags: [],
  })
  const [tagInput, setTagInput] = useState("")

  const categories = ["Market Insights", "Buying Guide", "Sustainability", "Investment", "Design", "Finance"]

  const handleAddTag = (isEdit = false) => {
    if (tagInput.trim()) {
      if (isEdit && editingBlog) {
        setEditingBlog({
          ...editingBlog,
          tags: [...editingBlog.tags, tagInput.trim()],
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
        tags: editingBlog.tags.filter((_, i) => i !== index),
      })
    } else {
      setNewBlog({
        ...newBlog,
        tags: newBlog.tags.filter((_, i) => i !== index),
      })
    }
  }

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
        tags: [],
      })
      setIsAddDialogOpen(false)
      onRefresh()
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
      setIsEditDialogOpen(false)
      setEditingBlog(null)
      onRefresh()
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
        onRefresh()
        alert("Blog post deleted successfully!")
      } catch (error) {
        console.error("Error deleting blog:", error)
        alert("Error deleting blog post")
      }
    }
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Blog Post
            </Button>
          </DialogTrigger>
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
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBlog} className="bg-amber-600 hover:bg-amber-700">
                  Publish Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {blogs.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`${getCategoryColor(post.category)} border-0`}>{post.category}</Badge>
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
                      {post.views.toLocaleString()} views
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 5).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 5} more
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
                      setIsEditDialogOpen(true)
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                  {editingBlog.tags.map((tag, index) => (
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
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
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
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Edit, Plus, User, ImageIcon } from "lucide-react"
import { ApiService } from "@/lib/api"

interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
  image: string
}

interface TeamManagementProps {
  team: TeamMember[]
  onRefresh: () => void
}

export default function TeamManagement({ team, onRefresh }: TeamManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
  })

  const handleAddMember = async () => {
    try {
      await ApiService.addTeamMember(newMember)
      setNewMember({
        name: "",
        position: "",
        bio: "",
        image: "",
      })
      setIsAddDialogOpen(false)
      onRefresh()
      alert("Team member added successfully!")
    } catch (error) {
      console.error("Error adding team member:", error)
      alert("Error adding team member")
    }
  }

  const handleEditMember = async () => {
    if (!editingMember) return
    try {
      await ApiService.updateTeamMember(editingMember)
      setIsEditDialogOpen(false)
      setEditingMember(null)
      onRefresh()
      alert("Team member updated successfully!")
    } catch (error) {
      console.error("Error updating team member:", error)
      alert("Error updating team member")
    }
  }

  const handleDeleteMember = async (id: number) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await ApiService.deleteTeamMember(id)
        onRefresh()
        alert("Team member deleted successfully!")
      } catch (error) {
        console.error("Error deleting team member:", error)
        alert("Error deleting team member")
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("Image file selected:", file.name)
      // Handle file upload logic here
      alert("File upload functionality would be implemented here")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600">Add and manage team members</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
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
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <Input
                    placeholder="Job title/position"
                    value={newMember.position}
                    onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <Textarea
                  placeholder="Brief description about the team member"
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Profile Image</label>
                <div className="space-y-2">
                  <Input
                    placeholder="Image URL (https://example.com/image.jpg)"
                    value={newMember.image}
                    onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                  />
                  <div className="text-center text-gray-500 text-sm">OR</div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="member-photo"
                      onChange={(e) => handleImageUpload(e)}
                    />
                    <label htmlFor="member-photo" className="cursor-pointer flex flex-col items-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-500 mb-1">Click to upload photo</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember} className="bg-amber-600 hover:bg-amber-700">
                  Add Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
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
                      setEditingMember(member)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteMember(member.id)}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>Update team member information</DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <Input
                    value={editingMember.position}
                    onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <Textarea
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Profile Image</label>
                <div className="space-y-2">
                  <Input
                    value={editingMember.image}
                    onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                  />
                  <div className="text-center text-gray-500 text-sm">OR</div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="edit-member-photo"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                    <label htmlFor="edit-member-photo" className="cursor-pointer flex flex-col items-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-500 mb-1">Click to upload new photo</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditMember} className="bg-amber-600 hover:bg-amber-700">
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

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
import { Trash2, Edit, Plus, MapPin, Briefcase, Calendar } from "lucide-react"
import { ApiService } from "@/lib/api"

interface JobOpening {
  id: number
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  requirements: string[]
  benefits: string[]
  posted_date: string
  status: string
}

interface CareersManagementProps {
  careers: JobOpening[]
  onRefresh: () => void
}

export default function CareersManagement({ careers, onRefresh }: CareersManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCareer, setEditingCareer] = useState<JobOpening | null>(null)
  const [newCareer, setNewCareer] = useState({
    title: "",
    department: "Construction",
    location: "",
    type: "Full-time",
    experience: "",
    description: "",
    requirements: [],
    benefits: [],
    posted_date: new Date().toISOString().split("T")[0],
    status: "Active",
  })
  const [requirementInput, setRequirementInput] = useState("")
  const [benefitInput, setBenefitInput] = useState("")

  const departments = ["Construction", "Marketing", "Sales", "Design", "Finance", "Human Resources"]
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

  const handleAddRequirement = (isEdit = false) => {
    if (requirementInput.trim()) {
      if (isEdit && editingCareer) {
        setEditingCareer({
          ...editingCareer,
          requirements: [...editingCareer.requirements, requirementInput.trim()],
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

  const handleAddBenefit = (isEdit = false) => {
    if (benefitInput.trim()) {
      if (isEdit && editingCareer) {
        setEditingCareer({
          ...editingCareer,
          benefits: [...editingCareer.benefits, benefitInput.trim()],
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

  const handleRemoveRequirement = (index: number, isEdit = false) => {
    if (isEdit && editingCareer) {
      setEditingCareer({
        ...editingCareer,
        requirements: editingCareer.requirements.filter((_, i) => i !== index),
      })
    } else {
      setNewCareer({
        ...newCareer,
        requirements: newCareer.requirements.filter((_, i) => i !== index),
      })
    }
  }

  const handleRemoveBenefit = (index: number, isEdit = false) => {
    if (isEdit && editingCareer) {
      setEditingCareer({
        ...editingCareer,
        benefits: editingCareer.benefits.filter((_, i) => i !== index),
      })
    } else {
      setNewCareer({
        ...newCareer,
        benefits: newCareer.benefits.filter((_, i) => i !== index),
      })
    }
  }

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
        requirements: [],
        benefits: [],
        posted_date: new Date().toISOString().split("T")[0],
        status: "Active",
      })
      setIsAddDialogOpen(false)
      onRefresh()
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
      setIsEditDialogOpen(false)
      setEditingCareer(null)
      onRefresh()
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
        onRefresh()
        alert("Job opening deleted successfully!")
      } catch (error) {
        console.error("Error deleting career:", error)
        alert("Error deleting job opening")
      }
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-green-100 text-green-800"
      case "Part-time":
        return "bg-blue-100 text-blue-800"
      case "Contract":
        return "bg-orange-100 text-orange-800"
      case "Internship":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Careers Management</h2>
          <p className="text-gray-600">Post and manage job openings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Job Opening
            </Button>
          </DialogTrigger>
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
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCareer} className="bg-amber-600 hover:bg-amber-700">
                  Post Job
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {careers.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`${getTypeColor(job.type)} border-0`}>{job.type}</Badge>
                    <Badge variant="outline">{job.department}</Badge>
                    {job.status === "Active" && <Badge className="bg-green-100 text-green-800 border-0">Active</Badge>}
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
                        {job.requirements.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-gray-500 text-xs">+{job.requirements.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Benefits:</h4>
                      <ul className="space-y-1">
                        {job.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                        {job.benefits.length > 3 && (
                          <li className="text-gray-500 text-xs">+{job.benefits.length - 3} more</li>
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
                      setIsEditDialogOpen(true)
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                  {editingCareer.requirements.map((req, index) => (
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
                  {editingCareer.benefits.map((benefit, index) => (
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
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
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
    </div>
  )
}

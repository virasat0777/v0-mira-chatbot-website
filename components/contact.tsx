"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ApiService } from "@/lib/api"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    acceptPolicies: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await ApiService.addContactSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.mobile,
        subject: "General Inquiry",
        message: `Name: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}`,
      })

      alert("Thank you for your inquiry! We will get back to you soon.")
      setFormData({
        name: "",
        email: "",
        mobile: "",
        acceptPolicies: false,
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      alert("There was an error submitting your inquiry. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Connect With Us</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Have questions or ready to get started? Connect with us and let's make great things happen. Our team is
              just a message away.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="policies"
                  checked={formData.acceptPolicies}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptPolicies: checked as boolean })}
                />
                <label htmlFor="policies" className="text-sm text-gray-700">
                  I Acknowledge And Accept All Policies
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full"
                disabled={!formData.acceptPolicies}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

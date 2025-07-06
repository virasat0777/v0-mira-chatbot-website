"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Phone, Mail, Clock, MessageSquare, Building } from "lucide-react"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    acceptPolicies: false,
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // Handle form submission here
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: [
        "5/288 Vipul Khand, Gomti Nagar",
        "Lucknow, Uttar Pradesh",
        "Reg. Office: 3/243 Vishwas Khand, Gomti Nagar",
      ],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["+91 7518109109", "+91 9876543210", "Toll Free: 1800-123-4567"],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["contact@virasatgroup.co.in", "sales@virasatgroup.co.in", "support@virasatgroup.co.in"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Office Hours",
      details: ["Monday - Saturday: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM", "Public Holidays: Closed"],
    },
  ]

  const officeLocations = [
    {
      name: "Head Office",
      address: "5/288 Vipul Khand, Gomti Nagar, Lucknow",
      phone: "+91 7518109109",
      type: "Main Office",
    },
    {
      name: "Sales Office",
      address: "3/243 Vishwas Khand, Gomti Nagar, Lucknow",
      phone: "+91 9876543210",
      type: "Sales Center",
    },
    {
      name: "Project Office",
      address: "Sector 10, Indira Nagar, Lucknow",
      phone: "+91 8765432109",
      type: "Site Office",
    },
  ]

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
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">Contact Us</h1>
            <p className="text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              Get in touch with our team. We're here to help you find your dream home
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className={`text-center transition-all duration-1000 delay-${(index + 1) * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <CardContent className="p-6">
                  <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-4 text-white">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Project Information">Project Information</option>
                        <option value="Site Visit">Site Visit Request</option>
                        <option value="Investment Opportunity">Investment Opportunity</option>
                        <option value="Customer Support">Customer Support</option>
                        <option value="Career Inquiry">Career Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us about your requirements..."
                        rows={5}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="policies"
                        checked={formData.acceptPolicies}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptPolicies: checked as boolean })}
                      />
                      <label htmlFor="policies" className="text-sm text-gray-700">
                        I acknowledge and accept all policies and terms of service
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3"
                      disabled={!formData.acceptPolicies}
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map and Office Locations */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive Map</p>
                      <p className="text-sm text-gray-400">Google Maps integration would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Our Offices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="border-l-4 border-amber-600 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{office.name}</h4>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">{office.type}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{office.address}</p>
                      <p className="text-sm text-amber-600 font-medium">{office.phone}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-amber-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-xl mb-8 opacity-90">Our team is ready to help you with any questions</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-amber-600 hover:bg-gray-100">
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +91 7518109109
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-amber-600 hover:bg-gray-100">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with MIRA
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

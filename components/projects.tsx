"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Bed,
  Square,
  Star,
  Play,
  ImageIcon,
  Car,
  Dumbbell,
  Waves,
  Trees,
  Shield,
  Wifi,
  ArrowRight,
} from "lucide-react"

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const project = {
    id: 1,
    title: "Virasat Udai Grand",
    tagline: "Where Luxury Meets Legacy",
    location: "Sector 6, Gomti Nagar Extension, Lucknow",
    status: "Under Construction",
    price: "₹85 Lakhs - ₹1.2 Crores",
    type: "Residential Apartments",
    configurations: "2BHK, 3BHK, 4BHK",
    area: "1200 - 2500 sq.ft",
    rating: 4.8,
    completionDate: "December 2024",
    description:
      "Virasat Udai Grand stands as a testament to architectural excellence and modern living. This premium residential project offers spacious apartments with world-class amenities, designed to provide an unparalleled lifestyle experience in the heart of Lucknow.",

    gallery: [
      "https://i.postimg.cc/KjSN2qzY/udai-grand-19.jpg",
      "https://i.postimg.cc/nVB2kJR9/udai-grand-18.jpg",
      "https://i.postimg.cc/XYJ9TS88/udai-grand-hd-3.jpg",
      "https://i.postimg.cc/HsTw978F/udai-grand-hd-6.jpg",
      "https://i.postimg.cc/zBnhnJzJ/udai-grand-hd-1.jpg",
      "https://i.postimg.cc/Dz4LwrR4/udai-grand-hd-2.jpg",
      "https://i.postimg.cc/FFybSxzj/udai-grand-hd-5.jpg",
      "/https://i.postimg.cc/HsTw978F/udai-grand-hd-6.jpg",
    ],

    amenities: [
      {
        category: "Recreation",
        items: [
          { name: "Swimming Pool", icon: Waves, image: "/placeholder.svg?height=300&width=400&text=Swimming+Pool" },
          {
            name: "Fitness Center",
            icon: Dumbbell,
            image: "/placeholder.svg?height=300&width=400&text=Fitness+Center",
          },
          { name: "Landscaped Gardens", icon: Trees, image: "/placeholder.svg?height=300&width=400&text=Gardens" },
          { name: "Children's Play Area", icon: Star, image: "/placeholder.svg?height=300&width=400&text=Play+Area" },
        ],
      },
      {
        category: "Convenience",
        items: [
          { name: "Covered Parking", icon: Car, image: " /placeholder.svg?height=300&width=400&text=Parking" },
          { name: "24/7 Security", icon: Shield, image: "/placeholder.svg?height=300&width=400&text=Security" },
          { name: "High-Speed WiFi", icon: Wifi, image: "/placeholder.svg?height=300&width=400&text=WiFi" },
          { name: "Power Backup", icon: Star, image: "/placeholder.svg?height=300&width=400&text=Power+Backup" },
        ],
      },
    ],

    landmarks: [
      { name: "Phoenix United Mall", distance: "2.5 km", type: "Shopping" },
      { name: "Gomti Riverfront Park", distance: "3.2 km", type: "Recreation" },
      { name: "SGPGI Hospital", distance: "4.1 km", type: "Healthcare" },
      { name: "City Montessori School", distance: "1.8 km", type: "Education" },
      { name: "Lucknow Airport", distance: "12 km", type: "Transport" },
      { name: "Hazratganj Market", distance: "8.5 km", type: "Shopping" },
    ],

    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

    features: [
      "Premium Italian Marble Flooring",
      "Modular Kitchen with Chimney",
      "Split AC in All Rooms",
      "Designer Bathroom Fittings",
      "Wooden Laminated Doors",
      "Earthquake Resistant Structure",
      "Vastu Compliant Design",
      "Rain Water Harvesting",
    ],
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Flagship Project</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Virasat Udai Grand - A masterpiece of modern architecture and luxury living
          </p>
        </div>

        {/* Main Project Card */}
        <div
          className={`bg-white rounded-2xl shadow-2xl overflow-hidden mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Hero Image */}
          <div className="relative h-96 md:h-[500px]">
            <img
              src={project.gallery[selectedImage] || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Project Info Overlay */}
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-600 hover:bg-green-700">{project.status}</Badge>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{project.rating}</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h3>
              <p className="text-lg text-amber-400 mb-2">{project.tagline}</p>
              <div className="flex items-center gap-2 text-gray-200">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Gallery Navigation */}
            <div className="absolute bottom-6 right-6">
              <div className="flex gap-2">
                {project.gallery.slice(0, 4).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-amber-400" : "border-white/50"
                    }`}
                  >
                    <img
                      src={project.gallery[index] || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                <button className="w-16 h-12 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <ImageIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Left Column - Description */}
              <div className="lg:col-span-2">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{project.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                    <div className="font-semibold text-gray-900">{project.configurations}</div>
                    <div className="text-sm text-gray-600">Configurations</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                    <div className="font-semibold text-gray-900">{project.area}</div>
                    <div className="text-sm text-gray-600">Area Range</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                    <div className="font-semibold text-gray-900">{project.type}</div>
                    <div className="text-sm text-gray-600">Property Type</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Star className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                    <div className="font-semibold text-gray-900">{project.completionDate}</div>
                    <div className="text-sm text-gray-600">Ready By</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Price & CTA */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-amber-700 mb-2">{project.price}</div>
                    <div className="text-sm text-gray-600">Starting Price</div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
                      Schedule Site Visit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent"
                    >
                      Download Brochure
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Virtual Tour
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Tabs */}
            <Tabs defaultValue="amenities" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="amenities" className="space-y-8">
                {project.amenities.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900">{category.category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.items.map((amenity, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-video bg-gray-200">
                            <img
                              src={amenity.image || "/placeholder.svg"}
                              alt={amenity.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4 text-center">
                            <amenity.icon className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                            <h5 className="font-medium text-gray-900">{amenity.name}</h5>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="gallery">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="location">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900">Nearby Landmarks</h4>
                    <div className="space-y-3">
                      {project.landmarks.map((landmark, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{landmark.name}</div>
                            <div className="text-sm text-gray-600">{landmark.type}</div>
                          </div>
                          <Badge variant="outline">{landmark.distance}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-900">Location Map</h4>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p>Interactive Map Coming Soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Video Section */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Experience Virasat Udai Grand</h3>
          <div className="max-w-4xl mx-auto">
  <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/6lzN84qiKCI?si=lrG68CkoBdsh9AG-"
      title="Virasat Udai Grand"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
</div>

        </div>
      </div>
    </section>
  )
}

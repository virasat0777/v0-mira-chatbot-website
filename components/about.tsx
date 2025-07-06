"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("about-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Stats */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">8M</div>
                <div className="text-gray-600">
                  <div>Total sq. ft</div>
                  <div>of Development</div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">10+</div>
                <div className="text-gray-600">
                  <div>Total number</div>
                  <div>of Projects</div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">2K+</div>
                <div className="text-gray-600">
                  <div>Happy</div>
                  <div>Families</div>
                </div>
              </div>

              <div>
                <div className="text-5xl font-bold text-gray-900 mb-2">5</div>
                <div className="text-gray-600">
                  <div>Upcoming</div>
                  <div>Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Interior Image */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://i.postimg.cc/FFybSxzj/udai-grand-hd-5.jpg"
                alt="Luxury Interior Design"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* About Content */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Virasat Group</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            With over 15 years of excellence in real estate development, Virasat Group has been at the forefront of
            creating exceptional living spaces that blend luxury with functionality. Our commitment to quality,
            innovation, and customer satisfaction has made us a trusted name in the industry.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            Learn More About Us
          </Button>
        </div>
      </div>
    </section>
  )
}

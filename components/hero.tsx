"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header" // Import the Header component

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://virasatgroup.co.in/uploads/udai_grand_hd_12.jpeg"
          alt="Virasat Udai Grand"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0">
        <Header />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen pt-24">
        {/* Left Content */}
        <div className="text-white">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2 text-sm font-medium">
              NEWLY LAUNCHED
            </Badge>

            <h1 className="text-4xl md:text-4xl font mb-4 ">VIRASAT UDAI GRAND</h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">The Exotic Life</p>

            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg font-medium">
              KNOW MORE
            </Button>
          </div>
        </div>

        {/* Right Content - Stats */}
        
      </div>

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </Button>
      </div>

      {/* Let's Chat Float */}
      
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import PopupBanner from "@/components/popup-banner"
import MiraChatbot from "@/components/mira-chatbot"

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Show popup after 3 seconds on first visit
    const hasVisited = localStorage.getItem("hasVisited")
    if (!hasVisited) {
      setTimeout(() => {
        setShowPopup(true)
        localStorage.setItem("hasVisited", "true")
      }, 3000)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <PopupBanner isOpen={showPopup} onClose={() => setShowPopup(false)} />
      {/* <MiraChatbot /> */}
    </div>
  )
}

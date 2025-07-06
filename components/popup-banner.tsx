"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface PopupBannerProps {
  isOpen: boolean
  onClose: () => void
}

interface BannerContent {
  image: string
  title: string
  subtitle: string
  description: string
  enabled: boolean
  delay: number
}

export default function PopupBanner({ isOpen, onClose }: PopupBannerProps) {
  const [bannerContent, setBannerContent] = useState<BannerContent>({
    image: "/images/popup-banner.png",
    title: "Grand Living, Unmatched Excellence",
    subtitle: "2 Years Ahead - Shaping the Future Today",
    description: "2, 3, & 4 BHK Flats and Penthouses with modern amenities",
    enabled: true,
    delay: 2,
  })

  // In a real app, this would fetch from your database/API
  useEffect(() => {
    // Simulate fetching banner settings from admin panel
    const savedSettings = localStorage.getItem("bannerSettings")
    if (savedSettings) {
      setBannerContent(JSON.parse(savedSettings))
    }
  }, [])

  if (!bannerContent.enabled) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Image
              src={bannerContent.image || "/placeholder.svg"}
              alt={bannerContent.title}
              width={800}
              height={600}
              className="w-full h-auto"
            />
            {/* Overlay content if needed */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-bold">{bannerContent.title}</h3>
              <p className="text-sm opacity-90">{bannerContent.subtitle}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

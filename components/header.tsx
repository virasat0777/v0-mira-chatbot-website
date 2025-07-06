"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    dropdown: [
      { name: "Our Story", href: "/about/story" },
      { name: "Leadership", href: "/about/leadership" },
      { name: "Awards", href: "/about/awards" },
    ],
  },
  {
    name: "Projects",
    href: "/projects",
    dropdown: [
      { name: "Virasat Udai Grand", href: "/projects/udai-grand" },
      { name: "Upcoming Projects", href: "/projects/upcoming" },
      { name: "Completed Projects", href: "/projects/completed" },
    ],
  },
  {
    name: "Media",
    href: "/media",
    dropdown: [
      { name: "News", href: "/news" },
      { name: "Blogs", href: "/blogs" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="relative z-50">
      {/* Main Header */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/images/logo.png" alt="Virasat Group" width={180} height={80} className="h-16 w-auto" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center text-sm font-medium leading-6 text-white hover:text-amber-300 transition-colors"
              >
                {item.name}
                {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && activeDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Icons & RERA Info */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <div className="text-right text-xs text-white/80 mr-4">
            <div>RERA No. - UPRERAPRJ123456/01/2024</div>
            <div>www.virasatgroup.co.in</div>
          </div>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full p-2">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full p-2">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <Image src="/images/logo.png" alt="Virasat Group" width={120} height={60} className="h-8 w-auto" />
              </Link>
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <div className="ml-4 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="-mx-3 block rounded-lg px-3 py-1 text-sm leading-7 text-gray-600 hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Youtube, Instagram, Phone, Mail } from "lucide-react"

const aboutLinks = [
  { name: "The Brand", href: "/about/brand" },
  { name: "Blogs", href: "/blogs" },
  { name: "Rera Projects", href: "/rera-projects" },
  { name: "Rera Promoter", href: "/rera-promoter" },
  { name: "Site Map", href: "/sitemap" },
]

const projectsLinks = [
  { name: "Ongoing Residential", href: "/projects/ongoing-residential" },
  { name: "Ongoing Commercial", href: "/projects/ongoing-commercial" },
  { name: "Virasat Townships", href: "/projects/townships" },
  { name: "Completed Projects", href: "/projects/completed" },
  { name: "Upcoming Projects", href: "/projects/upcoming" },
]

const projectTypesLinks = [
  { name: "2 BHK Flats In Lucknow", href: "/projects/2bhk" },
  { name: "3 BHK Flats In Lucknow", href: "/projects/3bhk" },
  { name: "4 BHK Flats In Lucknow", href: "/projects/4bhk" },
  { name: "Penthouses In Lucknow", href: "/projects/penthouses" },
  { name: "Villas In Lucknow", href: "/projects/villas" },
]

const quickLinks = [
  { name: "Careers", href: "/careers" },
  { name: "NRI FAQ's", href: "/nri-faqs" },
  { name: "Home Loans", href: "/home-loans" },
  { name: "Facts", href: "/facts" },
  { name: "Buyers Guide", href: "/buyers-guide" },
]

const reportsLinks = [
  { name: "MGT-7-SCL-23-24", href: "/reports/mgt-7" },
  { name: "SCL-CSR-ANNEXURE-I-23-24", href: "/reports/csr-annexure" },
]

const certificatesLinks = [{ name: "Great Place To Work", href: "/certificates/great-place" }]

const policyLinks = [
  { name: "CSR Policy", href: "/policies/csr" },
  { name: "NRC Policy", href: "/policies/nrc" },
  { name: "Vigil Mechanism", href: "/policies/vigil" },
  { name: "Term & Condition", href: "/policies/terms" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-amber-400">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Top Section - Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-700">
          {/* Logo and Corporate Office */}
          <div>
            <Image
              src="https://i.postimg.cc/528X08J6/images.png"
              alt="Virasat Group"
              width={180}
              height={80}
              className="h-16 w-auto mb-6 brightness-0 invert opacity-80"
            />
            <h3 className="text-lg font-semibold mb-4">Corporate Office:</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              5/288 Vipul Khand, Gomti Nagar, Lucknow
              <br />
              Reg. Office: 3/243 Vishwas Khand, Gomti Nagar, Lucknow 226010
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-amber-400" />
                <span>Tel : +91 - 7518 - 109109</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-amber-400" />
                <span>Fax : +91 - 7518 - 109108</span>
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Email</h3>
            <p className="text-sm text-gray-300">contact@virasatgroup.co.in</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <ul className="space-y-2">
              {projectsLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <ul className="space-y-2">
              {projectTypesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reports */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Reports</h3>
            <ul className="space-y-2">
              {reportsLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mt-6 mb-4">Certificates</h4>
            <ul className="space-y-2">
              {certificatesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policy</h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 Virasat Group. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link
          href="https://wa.me/917518109109"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg inline-flex items-center justify-center transition-all hover:scale-110"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </Link>
      </div>

      {/* Let's Chat Float */}
      
    </footer>
  )
}

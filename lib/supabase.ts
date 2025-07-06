import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: number
  title: string
  description: string
  location: string
  status: string
  price: string
  type: string
  bedrooms: string
  area: string
  image: string
  gallery_images: string[]
  amenities: Amenity[]
  landmarks: Landmark[]
  video_url: string
  features: string[]
  rating: number
  completion_date: string
  created_at: string
}

export interface Amenity {
  id: number
  name: string
  description: string
  image: string
  category: string
}

export interface Landmark {
  id: number
  name: string
  distance: string
  type: string
  description: string
}

export interface NewsItem {
  id: number
  title: string
  content: string
  excerpt: string
  image: string
  published_date: string
  author: string
  tags: string[]
}

export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  image: string
  published_date: string
  author: string
  tags: string[]
  read_time: number
}

export interface Career {
  id: number
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  benefits: string[]
  salary_range: string
  posted_date: string
}

export interface TeamMember {
  id: number
  name: string
  position: string
  department: string
  bio: string
  image: string
  email: string
  phone: string
  linkedin: string
  experience: string
}

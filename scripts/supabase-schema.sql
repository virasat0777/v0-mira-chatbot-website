-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  status VARCHAR(100),
  price VARCHAR(100),
  type VARCHAR(100),
  bedrooms VARCHAR(50),
  area VARCHAR(100),
  image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  amenities JSONB DEFAULT '[]',
  landmarks JSONB DEFAULT '[]',
  video_url TEXT,
  features TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  completion_date VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News table
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  excerpt TEXT,
  image TEXT,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  excerpt TEXT,
  image TEXT,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Careers table
CREATE TABLE careers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  location VARCHAR(100),
  type VARCHAR(50),
  description TEXT,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  salary_range VARCHAR(100),
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team table
CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(100),
  department VARCHAR(100),
  bio TEXT,
  image TEXT,
  email VARCHAR(255),
  phone VARCHAR(20),
  linkedin TEXT,
  experience VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for Virasat Udai Grand
INSERT INTO projects (
  title, 
  description, 
  location, 
  status, 
  price, 
  type, 
  bedrooms, 
  area, 
  image,
  gallery_images,
  amenities,
  landmarks,
  video_url,
  features,
  rating,
  completion_date
) VALUES (
  'Virasat Udai Grand',
  'Virasat Udai Grand stands as a testament to architectural excellence and modern living. This premium residential project offers spacious apartments with world-class amenities, designed to provide an unparalleled lifestyle experience in the heart of Lucknow.',
  'Sector 12, Gomti Nagar Extension, Lucknow',
  'Ready to Move',
  '₹85 Lakhs - ₹1.2 Crores',
  'Residential Apartments',
  '2BHK, 3BHK, 4BHK',
  '1200 - 2500 sq.ft',
  '/placeholder.svg?height=600&width=800&text=Virasat+Udai+Grand+Exterior',
  ARRAY[
    '/placeholder.svg?height=600&width=800&text=Virasat+Udai+Grand+Exterior',
    '/placeholder.svg?height=600&width=800&text=Luxury+Lobby+Interior',
    '/placeholder.svg?height=600&width=800&text=Premium+Apartment+Living+Room',
    '/placeholder.svg?height=600&width=800&text=Modern+Kitchen+Design',
    '/placeholder.svg?height=600&width=800&text=Master+Bedroom+Suite',
    '/placeholder.svg?height=600&width=800&text=Rooftop+Garden+View',
    '/placeholder.svg?height=600&width=800&text=Swimming+Pool+Area',
    '/placeholder.svg?height=600&width=800&text=Fitness+Center'
  ],
  '[
    {
      "category": "Recreation",
      "items": [
        {"name": "Swimming Pool", "image": "/placeholder.svg?height=300&width=400&text=Swimming+Pool"},
        {"name": "Fitness Center", "image": "/placeholder.svg?height=300&width=400&text=Fitness+Center"},
        {"name": "Landscaped Gardens", "image": "/placeholder.svg?height=300&width=400&text=Gardens"},
        {"name": "Children''s Play Area", "image": "/placeholder.svg?height=300&width=400&text=Play+Area"}
      ]
    },
    {
      "category": "Convenience",
      "items": [
        {"name": "Covered Parking", "image": "/placeholder.svg?height=300&width=400&text=Parking"},
        {"name": "24/7 Security", "image": "/placeholder.svg?height=300&width=400&text=Security"},
        {"name": "High-Speed WiFi", "image": "/placeholder.svg?height=300&width=400&text=WiFi"},
        {"name": "Power Backup", "image": "/placeholder.svg?height=300&width=400&text=Power+Backup"}
      ]
    }
  ]'::jsonb,
  '[
    {"name": "Phoenix United Mall", "distance": "2.5 km", "type": "Shopping"},
    {"name": "Gomti Riverfront Park", "distance": "3.2 km", "type": "Recreation"},
    {"name": "SGPGI Hospital", "distance": "4.1 km", "type": "Healthcare"},
    {"name": "City Montessori School", "distance": "1.8 km", "type": "Education"},
    {"name": "Lucknow Airport", "distance": "12 km", "type": "Transport"},
    {"name": "Hazratganj Market", "distance": "8.5 km", "type": "Shopping"}
  ]'::jsonb,
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  ARRAY[
    'Premium Italian Marble Flooring',
    'Modular Kitchen with Chimney',
    'Split AC in All Rooms',
    'Designer Bathroom Fittings',
    'Wooden Laminated Doors',
    'Earthquake Resistant Structure',
    'Vastu Compliant Design',
    'Rain Water Harvesting'
  ],
  4.8,
  'December 2024'
);

-- Insert sample news
INSERT INTO news (title, content, excerpt, image, author, tags) VALUES
('Virasat Udai Grand Wins Best Residential Project Award', 'Virasat Udai Grand has been recognized as the Best Residential Project of the Year at the Real Estate Excellence Awards 2024...', 'Our flagship project receives prestigious recognition for architectural excellence and innovative design.', '/placeholder.svg?height=400&width=600&text=Award+Ceremony', 'Virasat Group', ARRAY['awards', 'recognition', 'real-estate']),
('New Phase Launch: Premium Penthouses Now Available', 'We are excited to announce the launch of our exclusive penthouse collection at Virasat Udai Grand...', 'Luxury penthouses with panoramic city views and private terraces now available for booking.', '/placeholder.svg?height=400&width=600&text=Penthouse+Interior', 'Marketing Team', ARRAY['launch', 'penthouses', 'luxury']);

-- Insert sample blogs
INSERT INTO blogs (title, content, excerpt, image, author, tags, read_time) VALUES
('10 Things to Consider When Buying Your First Home', 'Buying your first home is an exciting milestone, but it can also be overwhelming. Here are the key factors to consider...', 'A comprehensive guide for first-time home buyers with expert tips and insights.', '/placeholder.svg?height=400&width=600&text=Home+Buying+Guide', 'Real Estate Expert', ARRAY['home-buying', 'tips', 'first-time-buyers'], 8),
('The Future of Smart Homes in India', 'Smart home technology is revolutionizing the way we live. Discover the latest trends and innovations...', 'Explore how smart home technology is transforming modern living in Indian real estate.', '/placeholder.svg?height=400&width=600&text=Smart+Home+Technology', 'Tech Team', ARRAY['smart-homes', 'technology', 'innovation'], 6);

-- Insert sample careers
INSERT INTO careers (title, department, location, type, description, requirements, benefits, salary_range) VALUES
('Senior Architect', 'Design', 'Lucknow', 'Full-time', 'We are looking for a creative and experienced Senior Architect to join our design team...', ARRAY['Bachelor''s in Architecture', '5+ years experience', 'AutoCAD proficiency', 'Creative thinking'], ARRAY['Health insurance', 'Flexible working hours', 'Professional development', 'Performance bonuses'], '₹8-12 LPA'),
('Sales Manager', 'Sales', 'Lucknow', 'Full-time', 'Join our dynamic sales team as a Sales Manager and help families find their dream homes...', ARRAY['MBA preferred', '3+ years sales experience', 'Excellent communication', 'Real estate knowledge'], ARRAY['Attractive incentives', 'Car allowance', 'Health benefits', 'Career growth'], '₹6-10 LPA');

-- Insert sample team members
INSERT INTO team (name, position, department, bio, image, email, phone, linkedin, experience) VALUES
('Rajesh Kumar', 'Managing Director', 'Leadership', 'Rajesh Kumar brings over 20 years of experience in real estate development and has been instrumental in shaping Virasat Group''s vision.', '/placeholder.svg?height=300&width=300&text=Rajesh+Kumar', 'rajesh@virasatgroup.co.in', '+91 9876543210', 'https://linkedin.com/in/rajeshkumar', '20+ years'),
('Priya Sharma', 'Head of Design', 'Architecture', 'Priya is an award-winning architect with a passion for creating spaces that blend functionality with aesthetic appeal.', '/placeholder.svg?height=300&width=300&text=Priya+Sharma', 'priya@virasatgroup.co.in', '+91 9876543211', 'https://linkedin.com/in/priyasharma', '15+ years');

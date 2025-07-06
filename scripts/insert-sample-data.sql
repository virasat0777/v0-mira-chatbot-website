-- Insert sample data into projects table
INSERT INTO projects (title, description, location, status, price, type, bedrooms, area, image, features, rating, completion_date) VALUES
('Luxury Apartments', 'Modern apartments with stunning views', 'New York', 'Ready to Move', '$1,200,000', 'Apartment', '3', '1800 sqft', 'https://example.com/images/luxury-apartment.jpg', '["Swimming Pool", "Gym", "Parking"]', 4.5, '2023-01-01'),
('Beachfront Villa', 'Exclusive villa with private beach access', 'Miami', 'Under Construction', '$3,500,000', 'Villa', '5', '4500 sqft', 'https://example.com/images/beachfront-villa.jpg', '["Private Beach", "Infinity Pool", "Gated Community"]', 4.8, '2024-12-31');

-- Insert sample data into news table
INSERT INTO news (title, excerpt, content, category, author, publish_date, image, featured) VALUES
('New Project Launch', 'We are excited to announce our latest project', 'Full article content here', 'Launch', 'John Doe', '2023-07-05', 'https://example.com/images/new-project.jpg', TRUE),
('Construction Update', 'Progress on our flagship project is on schedule', 'Full article content here', 'Progress', 'Jane Smith', '2023-07-01', 'https://example.com/images/construction-update.jpg', FALSE);

-- Insert sample data into blogs table
INSERT INTO blogs (title, excerpt, content, category, author, publish_date, read_time, views, image, tags) VALUES
('Top 5 Reasons to Invest in Real Estate', 'Discover why real estate is a great investment', 'Full blog content here', 'Investment', 'Richard Roe', '2023-07-04', '7 min', 1500, 'https://example.com/images/investment-blog.jpg', '["real estate", "investment", "finance"]'),
('Sustainable Living Guide', 'Tips for eco-friendly homes', 'Full blog content here', 'Sustainability', 'Alice Johnson', '2023-06-28', '5 min', 1200, 'https://example.com/images/sustainable-living.jpg', '["sustainability", "eco-friendly", "home"]');

-- Insert sample data into careers table
INSERT INTO careers (title, department, location, type, experience, description, requirements, benefits, posted_date, status) VALUES
('Senior Software Engineer', 'Technology', 'New York', 'Full-time', '5+ years', 'Job description here', '["Java", "Spring Boot", "SQL"]', '["Health Insurance", "Paid Time Off", "Stock Options"]', '2023-07-03', 'Active'),
('Marketing Manager', 'Marketing', 'Los Angeles', 'Full-time', '3+ years', 'Job description here', '["Digital Marketing", "SEO", "Social Media"]', '["Health Insurance", "Paid Time Off", "Bonus"]', '2023-06-29', 'Active');

-- Insert sample data into team table
INSERT INTO team (name, position, bio, image) VALUES
('John Doe', 'CEO', 'John is the CEO of Virasat Group', 'https://example.com/images/john-doe.jpg'),
('Jane Smith', 'Marketing Director', 'Jane is the Marketing Director at Virasat Group', 'https://example.com/images/jane-smith.jpg');

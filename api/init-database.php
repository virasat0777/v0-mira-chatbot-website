<?php
require_once 'config/database.php';

$database = new Database();
$conn = $database->getConnection();

if (!$conn) {
    die("Failed to connect to database: " . mysqli_connect_error());
}

// Call the function to create tables
createTables($conn);

echo "Database tables created successfully!";

// Insert sample data
$sampleProjects = [
    [
        'title' => 'Virasat Heights',
        'description' => 'Luxury apartments with modern amenities in the heart of the city',
        'location' => 'Downtown, Mumbai',
        'status' => 'Under Construction',
        'price' => '₹85 Lakhs onwards',
        'type' => 'Apartment',
        'bedrooms' => '2-3 BHK',
        'area' => '1200-1800 sq ft',
        'image' => '/placeholder.svg?height=300&width=400&text=Virasat+Heights',
        'features' => json_encode(['Swimming Pool', 'Gym', 'Garden', 'Parking']),
        'rating' => 4.5,
        'completion_date' => 'Dec 2025'
    ],
    [
        'title' => 'Virasat Gardens',
        'description' => 'Premium villas surrounded by lush greenery and modern facilities',
        'location' => 'Suburbs, Pune',
        'status' => 'Ready to Move',
        'price' => '₹1.2 Crores onwards',
        'type' => 'Villa',
        'bedrooms' => '3-4 BHK',
        'area' => '2500-3500 sq ft',
        'image' => '/placeholder.svg?height=300&width=400&text=Virasat+Gardens',
        'features' => json_encode(['Private Garden', 'Club House', 'Security', '24/7 Water']),
        'rating' => 4.8,
        'completion_date' => 'Ready'
    ]
];

foreach ($sampleProjects as $project) {
    $stmt = $conn->prepare("
        INSERT INTO projects (title, description, location, status, price, type, bedrooms, area, image, features, rating, completion_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $project['title'],
        $project['description'],
        $project['location'],
        $project['status'],
        $project['price'],
        $project['type'],
        $project['bedrooms'],
        $project['area'],
        $project['image'],
        $project['features'],
        $project['rating'],
        $project['completion_date']
    ]);
}

echo json_encode([
    'success' => true,
    'message' => 'Database initialized successfully with sample data'
]);
?>

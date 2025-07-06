<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../../error.log');

// Log function for debugging
function logError($message, $data = null) {
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message";
    if ($data !== null) {
        $logMessage .= " | Data: " . json_encode($data);
    }
    error_log($logMessage);
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    logError("OPTIONS request received");
    exit(0);
}

class Database {
    private $host = "localhost";
    private $db_name = "u400955712_virasat_group";
    private $username = "u400955712_virasat_group";
    private $password = "Virasat@sugandh@1234";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            logError("Attempting database connection", [
                'host' => $this->host,
                'database' => $this->db_name,
                'username' => $this->username
            ]);
            
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            logError("Database connection successful");
        } catch(PDOException $exception) {
            logError("Database connection failed", ['error' => $exception->getMessage()]);
            throw new Exception("Connection error: " . $exception->getMessage());
        }
        return $this->conn;
    }
}

// Database Schema Creation
function createTables($conn) {
    logError("Starting table creation");
    
    $queries = [
        // Projects table
        "CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            location VARCHAR(255),
            status ENUM('Under Construction', 'Ready to Move', 'Launching Soon') DEFAULT 'Under Construction',
            price VARCHAR(100),
            type ENUM('Apartment', 'Villa', 'Penthouse') DEFAULT 'Apartment',
            bedrooms VARCHAR(50),
            area VARCHAR(50),
            image VARCHAR(255),
            features JSON,
            rating DECIMAL(2,1) DEFAULT 0.0,
            completion_date VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )",

        // News table
        "CREATE TABLE IF NOT EXISTS news (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            excerpt TEXT,
            content LONGTEXT,
            category ENUM('Launch', 'Progress', 'Awards', 'Sustainability', 'Market Analysis') DEFAULT 'Launch',
            author VARCHAR(100),
            publish_date DATE,
            image VARCHAR(255),
            featured BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )",

        // Blogs table
        "CREATE TABLE IF NOT EXISTS blogs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            excerpt TEXT,
            content LONGTEXT,
            category ENUM('Market Insights', 'Buying Guide', 'Sustainability', 'Investment', 'Design', 'Finance') DEFAULT 'Market Insights',
            author VARCHAR(100),
            publish_date DATE,
            read_time VARCHAR(20),
            views INT DEFAULT 0,
            image VARCHAR(255),
            tags JSON,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )",

        // Careers table
        "CREATE TABLE IF NOT EXISTS careers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            department ENUM('Construction', 'Marketing', 'Sales', 'Design', 'Finance', 'Human Resources') DEFAULT 'Construction',
            location VARCHAR(255),
            type ENUM('Full-time', 'Part-time', 'Contract', 'Internship') DEFAULT 'Full-time',
            experience VARCHAR(50),
            description TEXT,
            requirements JSON,
            benefits JSON,
            posted_date DATE,
            status ENUM('Active', 'Closed') DEFAULT 'Active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )",

        // Team table
        "CREATE TABLE IF NOT EXISTS team (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            position VARCHAR(255),
            bio TEXT,
            image VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )",

        // Contact submissions table
        "CREATE TABLE IF NOT EXISTS contact_submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            subject VARCHAR(255),
            message TEXT,
            status ENUM('New', 'In Progress', 'Resolved') DEFAULT 'New',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )",

        // Website settings table
        "CREATE TABLE IF NOT EXISTS website_settings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            setting_key VARCHAR(100) UNIQUE,
            setting_value TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )"
    ];

    foreach ($queries as $index => $query) {
        try {
            $conn->exec($query);
            logError("Table created successfully", ['table_index' => $index]);
        } catch(PDOException $e) {
            logError("Error creating table", ['table_index' => $index, 'error' => $e->getMessage()]);
        }
    }
    
    logError("Table creation completed");
}

// Don't initialize tables automatically - only when explicitly called
?>

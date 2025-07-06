<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getBlogs($db);
        break;
    case 'POST':
        addBlog($db);
        break;
    case 'PUT':
        updateBlog($db);
        break;
    case 'DELETE':
        deleteBlog($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getBlogs($db) {
    try {
        $stmt = $db->query("SELECT * FROM blogs ORDER BY created_at DESC");
        $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Parse JSON fields
        foreach ($blogs as &$blog) {
            if ($blog['tags']) {
                $blog['tags'] = json_decode($blog['tags'], true);
            }
        }
        
        echo json_encode($blogs);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function addBlog($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['title'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required field: title']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            INSERT INTO blogs (title, excerpt, content, category, author, publish_date, read_time, views, image, tags) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $tags = isset($input['tags']) && is_array($input['tags']) 
            ? json_encode($input['tags']) 
            : json_encode([]);
        
        $stmt->execute([
            $input['title'],
            $input['excerpt'] ?? '',
            $input['content'] ?? '',
            $input['category'] ?? 'Market Insights',
            $input['author'] ?? '',
            $input['publish_date'] ?? date('Y-m-d'),
            $input['read_time'] ?? '',
            $input['views'] ?? 0,
            $input['image'] ?? '',
            $tags
        ]);
        
        echo json_encode([
            'success' => true, 
            'id' => $db->lastInsertId(),
            'message' => 'Blog post added successfully'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function updateBlog($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing blog ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            UPDATE blogs SET 
                title = ?, excerpt = ?, content = ?, category = ?, author = ?, 
                publish_date = ?, read_time = ?, image = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ");
        
        $tags = isset($input['tags']) && is_array($input['tags']) 
            ? json_encode($input['tags']) 
            : json_encode([]);
        
        $stmt->execute([
            $input['title'],
            $input['excerpt'] ?? '',
            $input['content'] ?? '',
            $input['category'] ?? 'Market Insights',
            $input['author'] ?? '',
            $input['publish_date'] ?? date('Y-m-d'),
            $input['read_time'] ?? '',
            $input['image'] ?? '',
            $tags,
            $input['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Blog post updated successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteBlog($db) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing blog ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("DELETE FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Blog post deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Blog post not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>

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
        getNews($db);
        break;
    case 'POST':
        addNews($db);
        break;
    case 'PUT':
        updateNews($db);
        break;
    case 'DELETE':
        deleteNews($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getNews($db) {
    try {
        $stmt = $db->query("SELECT * FROM news ORDER BY created_at DESC");
        $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($news);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function addNews($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['title'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required field: title']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            INSERT INTO news (title, excerpt, content, category, author, publish_date, image, featured) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['title'],
            $input['excerpt'] ?? '',
            $input['content'] ?? '',
            $input['category'] ?? 'Launch',
            $input['author'] ?? '',
            $input['publish_date'] ?? date('Y-m-d'),
            $input['image'] ?? '',
            $input['featured'] ?? false
        ]);
        
        echo json_encode([
            'success' => true, 
            'id' => $db->lastInsertId(),
            'message' => 'News article added successfully'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function updateNews($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing news ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            UPDATE news SET 
                title = ?, excerpt = ?, content = ?, category = ?, author = ?, 
                publish_date = ?, image = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['title'],
            $input['excerpt'] ?? '',
            $input['content'] ?? '',
            $input['category'] ?? 'Launch',
            $input['author'] ?? '',
            $input['publish_date'] ?? date('Y-m-d'),
            $input['image'] ?? '',
            $input['featured'] ?? false,
            $input['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'News article updated successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteNews($db) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing news ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("DELETE FROM news WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'News article deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'News article not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>

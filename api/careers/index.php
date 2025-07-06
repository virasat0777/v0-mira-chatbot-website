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
        getCareers($db);
        break;
    case 'POST':
        addCareer($db);
        break;
    case 'PUT':
        updateCareer($db);
        break;
    case 'DELETE':
        deleteCareer($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getCareers($db) {
    try {
        $stmt = $db->query("SELECT * FROM careers ORDER BY created_at DESC");
        $careers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Parse JSON fields
        foreach ($careers as &$career) {
            if ($career['requirements']) {
                $career['requirements'] = json_decode($career['requirements'], true);
            }
            if ($career['benefits']) {
                $career['benefits'] = json_decode($career['benefits'], true);
            }
        }
        
        echo json_encode($careers);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function addCareer($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['title'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required field: title']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            INSERT INTO careers (title, department, location, type, experience, description, requirements, benefits, posted_date, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $requirements = isset($input['requirements']) && is_array($input['requirements']) 
            ? json_encode($input['requirements']) 
            : json_encode([]);
            
        $benefits = isset($input['benefits']) && is_array($input['benefits']) 
            ? json_encode($input['benefits']) 
            : json_encode([]);
        
        $stmt->execute([
            $input['title'],
            $input['department'] ?? 'Construction',
            $input['location'] ?? '',
            $input['type'] ?? 'Full-time',
            $input['experience'] ?? '',
            $input['description'] ?? '',
            $requirements,
            $benefits,
            $input['posted_date'] ?? date('Y-m-d'),
            $input['status'] ?? 'Active'
        ]);
        
        echo json_encode([
            'success' => true, 
            'id' => $db->lastInsertId(),
            'message' => 'Job opening added successfully'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function updateCareer($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing career ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            UPDATE careers SET 
                title = ?, department = ?, location = ?, type = ?, experience = ?, 
                description = ?, requirements = ?, benefits = ?, status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ");
        
        $requirements = isset($input['requirements']) && is_array($input['requirements']) 
            ? json_encode($input['requirements']) 
            : json_encode([]);
            
        $benefits = isset($input['benefits']) && is_array($input['benefits']) 
            ? json_encode($input['benefits']) 
            : json_encode([]);
        
        $stmt->execute([
            $input['title'],
            $input['department'] ?? 'Construction',
            $input['location'] ?? '',
            $input['type'] ?? 'Full-time',
            $input['experience'] ?? '',
            $input['description'] ?? '',
            $requirements,
            $benefits,
            $input['status'] ?? 'Active',
            $input['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Job opening updated successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteCareer($db) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing career ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("DELETE FROM careers WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Job opening deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Job opening not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>

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
        getTeam($db);
        break;
    case 'POST':
        addTeamMember($db);
        break;
    case 'PUT':
        updateTeamMember($db);
        break;
    case 'DELETE':
        deleteTeamMember($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getTeam($db) {
    try {
        $stmt = $db->query("SELECT * FROM team ORDER BY created_at DESC");
        $team = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($team);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function addTeamMember($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['name'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required field: name']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            INSERT INTO team (name, position, bio, image) 
            VALUES (?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['name'],
            $input['position'] ?? '',
            $input['bio'] ?? '',
            $input['image'] ?? ''
        ]);
        
        echo json_encode([
            'success' => true, 
            'id' => $db->lastInsertId(),
            'message' => 'Team member added successfully'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function updateTeamMember($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing team member ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            UPDATE team SET 
                name = ?, position = ?, bio = ?, image = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['name'],
            $input['position'] ?? '',
            $input['bio'] ?? '',
            $input['image'] ?? '',
            $input['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Team member updated successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteTeamMember($db) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing team member ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("DELETE FROM team WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Team member deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Team member not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>

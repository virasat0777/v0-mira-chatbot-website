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
        getContactSubmissions($db);
        break;
    case 'POST':
        addContactSubmission($db);
        break;
    case 'PUT':
        updateContactSubmission($db);
        break;
    case 'DELETE':
        deleteContactSubmission($db);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getContactSubmissions($db) {
    try {
        $stmt = $db->query("SELECT * FROM contact_submissions ORDER BY created_at DESC");
        $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($submissions);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function addContactSubmission($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['name']) || !isset($input['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: name and email']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            INSERT INTO contact_submissions (name, email, phone, subject, message, status) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['name'],
            $input['email'],
            $input['phone'] ?? '',
            $input['subject'] ?? '',
            $input['message'] ?? '',
            $input['status'] ?? 'New'
        ]);
        
        echo json_encode([
            'success' => true, 
            'id' => $db->lastInsertId(),
            'message' => 'Contact submission received successfully'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function updateContactSubmission($db) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing submission ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("
            UPDATE contact_submissions SET 
                status = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $input['status'] ?? 'New',
            $input['id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Contact submission updated successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteContactSubmission($db) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing submission ID']);
        return;
    }
    
    try {
        $stmt = $db->prepare("DELETE FROM contact_submissions WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Contact submission deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Contact submission not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>

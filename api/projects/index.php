<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../../error.log');

function logError($message, $data = null) {
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] PROJECTS: $message";
    if ($data !== null) {
        $logMessage .= " | Data: " . json_encode($data);
    }
    error_log($logMessage);
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    logError("OPTIONS request received");
    exit(0);
}

logError("Projects API called", [
    'method' => $_SERVER['REQUEST_METHOD'],
    'uri' => $_SERVER['REQUEST_URI'],
    'query_string' => $_SERVER['QUERY_STRING'] ?? ''
]);

try {
    require_once '../config/database.php';
    
    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        logError("Database connection is null");
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }

    logError("Database connection successful");

    $method = $_SERVER['REQUEST_METHOD'];
    logError("Processing request", ['method' => $method]);

    switch ($method) {
        case 'GET':
            getProjects($db);
            break;
        case 'POST':
            addProject($db);
            break;
        case 'PUT':
            updateProject($db);
            break;
        case 'DELETE':
            deleteProject($db);
            break;
        default:
            logError("Method not allowed", ['method' => $method]);
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    logError("Fatal error in projects API", ['error' => $e->getMessage()]);
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

function getProjects($db) {
    logError("Getting projects");
    try {
        if (!$db) {
            throw new Exception("Database connection is null in getProjects");
        }
        
        $stmt = $db->query("SELECT * FROM projects ORDER BY created_at DESC");
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        logError("Projects retrieved", ['count' => count($projects)]);
        
        // Parse JSON fields
        foreach ($projects as &$project) {
            if ($project['features']) {
                $decoded = json_decode($project['features'], true);
                $project['features'] = $decoded ? $decoded : [];
            } else {
                $project['features'] = [];
            }
        }
        
        echo json_encode($projects);
    } catch (Exception $e) {
        logError("Error in getProjects", ['error' => $e->getMessage()]);
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function addProject($db) {
    logError("Adding project");
    $input = json_decode(file_get_contents('php://input'), true);
    
    logError("Project input received", $input);
    
    if (!$input || !isset($input['title']) || !isset($input['description'])) {
        logError("Missing required fields", $input);
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: title and description']);
        return;
    }
    
    try {
        if (!$db) {
            throw new Exception("Database connection is null in addProject");
        }
        
        $stmt = $db->prepare("
            INSERT INTO projects (title, description, location, status, price, type, bedrooms, area, image, features, rating, completion_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $features = isset($input['features']) && is_array($input['features']) 
            ? json_encode($input['features']) 
            : json_encode([]);
        
        $params = [
            $input['title'],
            $input['description'],
            $input['location'] ?? '',
            $input['status'] ?? 'Under Construction',
            $input['price'] ?? '',
            $input['type'] ?? 'Apartment',
            $input['bedrooms'] ?? '',
            $input['area'] ?? '',
            $input['image'] ?? '',
            $features,
            $input['rating'] ?? 0,
            $input['completion_date'] ?? null
        ];
        
        logError("Executing insert with params", $params);
        $stmt->execute($params);
        
        $newId = $db->lastInsertId();
        logError("Project added successfully", ['id' => $newId]);
        
        echo json_encode([
            'success' => true, 
            'id' => $newId,
            'message' => 'Project added successfully'
        ]);
    } catch (Exception $e) {
        logError("Error in addProject", ['error' => $e->getMessage()]);
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function updateProject($db) {
    logError("Updating project");
    $input = json_decode(file_get_contents('php://input'), true);
    
    logError("Update input received", $input);
    
    if (!$input || !isset($input['id'])) {
        logError("Missing project ID", $input);
        http_response_code(400);
        echo json_encode(['error' => 'Missing project ID']);
        return;
    }
    
    try {
        if (!$db) {
            throw new Exception("Database connection is null in updateProject");
        }
        
        $stmt = $db->prepare("
            UPDATE projects SET 
                title = ?, description = ?, location = ?, status = ?, price = ?, 
                type = ?, bedrooms = ?, area = ?, image = ?, features = ?, 
                rating = ?, completion_date = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ");
        
        $features = isset($input['features']) && is_array($input['features']) 
            ? json_encode($input['features']) 
            : json_encode([]);
        
        $params = [
            $input['title'],
            $input['description'],
            $input['location'] ?? '',
            $input['status'] ?? 'Under Construction',
            $input['price'] ?? '',
            $input['type'] ?? 'Apartment',
            $input['bedrooms'] ?? '',
            $input['area'] ?? '',
            $input['image'] ?? '',
            $features,
            $input['rating'] ?? 0,
            $input['completion_date'] ?? null,
            $input['id']
        ];
        
        logError("Executing update with params", $params);
        $stmt->execute($params);
        
        logError("Project updated successfully", ['id' => $input['id']]);
        echo json_encode(['success' => true, 'message' => 'Project updated successfully']);
    } catch (Exception $e) {
        logError("Error in updateProject", ['error' => $e->getMessage()]);
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

function deleteProject($db) {
    $id = $_GET['id'] ?? null;
    logError("Deleting project", ['id' => $id]);
    
    if (!$id) {
        logError("Missing project ID for delete");
        http_response_code(400);
        echo json_encode(['error' => 'Missing project ID']);
        return;
    }
    
    try {
        if (!$db) {
            throw new Exception("Database connection is null in deleteProject");
        }
        
        $stmt = $db->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            logError("Project deleted successfully", ['id' => $id]);
            echo json_encode(['success' => true, 'message' => 'Project deleted successfully']);
        } else {
            logError("Project not found for delete", ['id' => $id]);
            http_response_code(404);
            echo json_encode(['error' => 'Project not found']);
        }
    } catch (Exception $e) {
        logError("Error in deleteProject", ['error' => $e->getMessage()]);
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>

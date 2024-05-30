<?php

// MySQLi connection parameters
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'test';

// Create MySQLi connection
$connection = new mysqli($host, $user, $password, $database);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Query example
$sql = "SELECT * FROM test_t";
$result = $connection->query($sql);

if ($result === false) {
    die("Error executing query: " . $connection->error);
}

// Fetch rows and encode as JSON
$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($data);

// Close connection
$connection->close();

?>

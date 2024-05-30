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

// Check if any rows returned
if ($result->num_rows > 0) {
    // Construct HTML table
    $htmlTable = '<table border="1"><tr>';
    
    // Get column names
    $fields = $result->fetch_fields();
    foreach ($fields as $field) {
        $htmlTable .= "<th>{$field->name}</th>";
    }
    $htmlTable .= '</tr>';

    // Fetch rows and populate table
    while ($row = $result->fetch_assoc()) {
        $htmlTable .= '<tr>';
        foreach ($row as $value) {
            $htmlTable .= "<td>{$value}</td>";
        }
        $htmlTable .= '</tr>';
    }

    $htmlTable .= '</table>';

    // Display HTML table
    echo $htmlTable;
} else {
    // If no rows returned
    echo 'No data found';
}

// Close connection
$connection->close();

?>

<?php
/* Connects to MySQL Database */

function constructError($e)
{
	return json_encode(array('status' => 'Failed', 'error' => '"' . $e . '"'));
}

function respond($response_code, $payload)
{
	http_response_code($response_code);
	header('Content-Type: appliction/json; charset=UTF-8');
	if (400 <= $response_code && $response_code < 600) {
		if (isset($conn)) {
			$conn->close();
		}
		die($payload);
	} else {
		echo $payload;
	}
}

// Login Credentials
$servername = "localhost";
//$username = "root";
$username = "project";
$password = "";
//$dbname = "P2S";
$dbname = "project";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die(constructError("Connection failed: " . $conn->connect_error));
}

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

?>

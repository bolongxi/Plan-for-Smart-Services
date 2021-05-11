<?php

require_once('connect.php');

$credentials = json_decode(file_get_contents('php://input'));

$response = array('status' => 'Success', 'results' => null);
$query = 
	'SELECT id, username FROM UserInfo ' .
	'WHERE username = ? ' .
	'AND passwrd = SHA1(CONCAT(FROM_BASE64(salt), ?))';

try {
	$stmt = $conn->prepare($query);
	$stmt->bind_param('ss', $credentials->username, $credentials->password);
	$stmt->execute();
	$result = $stmt->get_result();
	$response['results'] = $result->fetch_assoc();
	respond(200, json_encode($response));
	$result->close();
	$stmt->close();
} catch (mysqli_sql_exception $e) {
	respond(500, constructError($e));
}
	
$conn->close();

?>

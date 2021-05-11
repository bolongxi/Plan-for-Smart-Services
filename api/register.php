<?php

require_once('connect.php');

$user = json_decode(file_get_contents('php://input'));

$query =
	'INSERT INTO UserInfo ' .
	'(username, firstName, lastName, phoneNumber, email, address, salt, passwrd) ' .
	'VALUES (?, ?, ?, ?, ?, ?, TO_BASE64(?), SHA1(CONCAT(?, ?)))';

try {
	$salt = random_bytes(12);
	$stmt = $conn->prepare($query);
	$stmt->bind_param('sssssssss', $user->username, $user->firstname,
		$user->lastname, $user->phone, $user->email, $user->address, $salt,
		$salt, $user->password);
	$stmt->execute();
	$stmt->close();
} catch (mysqli_sql_exception $e) {
	respond(500, constructError($e));
}

$conn->close();

?>

<?php

require_once('connect.php');

$query =
	'INSERT INTO Review (rating, feedback, orderId, userId) ' .
	'VALUES (?, ?, ?, ?)';

try {
	$review = json_decode(file_get_contents('php://input'));
	$stmt = $conn->prepare($query);
	$stmt->bind_param('isii', $review->rating, $review->feedback,
		$review->orderId, $review->userId);
	$stmt->execute();
	$stmt->close();
	$conn->close();
	respond(200, json_encode(array('status' => 'Success')));
} catch (mysqli_sql_exception $e) {
	respond(500, constructError($e));
}

?>

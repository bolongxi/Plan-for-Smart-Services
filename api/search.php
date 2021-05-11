<?php

require_once('connect.php');

if (!isset($_GET['query'])) {
	respond(500, construct_error('Missing required GET parameter "query"'));
}

$response = array();
$query =
	'SELECT oi.*, i.itemCount ' .
	'FROM OrderInfo AS oi ' .
	'LEFT JOIN (' .
		'SELECT orderId, COUNT(*) AS itemCount ' .
		'FROM OrderedItem ' .
		'GROUP BY orderId ' .
	') AS i ' .
	'ON oi.id = i.orderId ' .
	'WHERE ? in (oi.id, oi.userId)';

try {
	$stmt = $conn->prepare($query);
	$stmt->bind_param('i', $_GET['query']);
	$stmt->execute();
	$res = $stmt->get_result();
	while (($row = $res->fetch_assoc())) {
		array_push($response, $row);
	}
	$res->close();
	$stmt->close();
} catch (mysqli_sql_exception $e) {
	respond(500, construct_error($e));
} catch (Exception $e) {
	respond(500, construct_error($e));
}

respond(200, json_encode($response));

$conn->close();

?>

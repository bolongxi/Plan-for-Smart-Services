<?php

/* retrieve available cars on date provided by get argument "date" */
/* used by service/a */

require_once('connect.php');

$cars = array('status' => 'Success', 'results' => array());
$query = 'SELECT * FROM Car';
if (isset($_GET['date'])) {
	$query = $query .
		' AS c
		WHERE c.id NOT IN (
		SELECT carId
		FROM Trip AS t
		WHERE t.fulfillmentDate = ?)';
}

try {
	$stmt = $conn->prepare($query);
	if (isset($_GET['date'])) {
		$stmt->bind_param('s', $_GET['date']);
	}
	$stmt->execute();
	$result = $stmt->get_result();
	while ($row = $result->fetch_assoc()) {
		array_push($cars['results'], $row);
	}
	respond(200, json_encode($cars));
	$stmt->close();
	$conn->close();
} catch (mysqli_sql_exception $e) {
	respond(500, constructError($e));
}

?>

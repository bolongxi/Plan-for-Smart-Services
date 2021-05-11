<?php

require_once('connect.php');

$stores = array('status' => 'Success', 'results' => array());
$storeQuery = 'SELECT * FROM Store';
$productQuery = 'SELECT * FROM Product WHERE StoreId = ?';

try {
	$result = $conn->query($storeQuery);
	while (($row = $result->fetch_assoc())) {
		array_push($stores['results'], $row);
	}
	$result->close();
	
	$stmt = $conn->prepare($productQuery);
	foreach ($stores['results'] as &$store) {
		$store['products'] = array();
		$stmt->bind_param('i', $store['id']);
		$stmt->execute();
		$result = $stmt->get_result();
		while ($row = $result->fetch_assoc()) {
			array_push($store['products'], $row);
		}
		$result->close();
	}
	$stmt->close();
	respond(200, json_encode($stores));
} catch (mysqli_sql_exception $e) {
	respond(500, constructError($e));
}

$conn->close();

?>

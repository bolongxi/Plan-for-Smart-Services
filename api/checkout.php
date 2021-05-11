<?php

require_once('connect.php');

$order = json_decode(file_get_contents('php://input'));

$orderQuery = 
	'INSERT INTO OrderInfo ' .
	'(orderDate, price, userId) ' .
	'VALUES ' .
	'(NOW(), ?, ?)';

$productOrderQuery = 
	'INSERT INTO OrderedItem ' .
	'(orderId, productId) ' .
	'VALUES ' .
	'(?, ?)';

$tripQuery =
	'INSERT INTO Trip ' .
	'(fromLat, fromLng, toLat, toLng, distance, carId, price, fulfillmentDate) ' .
	'VALUES ' .
	'(?, ?, ?, ?, ?, ?, ?, ?)';

$tripOrderQuery =
	'INSERT INTO OrderedItem ' .
	'(orderId, tripId) ' .
	'VALUES ' .
	'(?, ?)';

$joyrideQuery =
	'INSERT INTO JoyRide ' .
	'(vehicleId, driverId, distance, price) ' .
	'VALUES ' .
	'(?, ?, ?, ?)';

$joyrideOrderQuery =
	'INSERT INTO OrderedItem ' .
	'(orderId, joyrideId) ' .
	'VALUES ' .
	'(?, ?)';

$conn->begin_transaction();
try {
	$stmt = $conn->prepare($orderQuery);
	$stmt->bind_param('di', $order->total, $order->user->id);
	$stmt->execute();
	$orderId = $conn->insert_id;
	$stmt->close();
	
	$stmt = $conn->prepare($productOrderQuery);
	foreach ($order->cart->products as &$product) {
		$stmt->bind_param('ii', $orderId, $product->id);
		$stmt->execute();
	}
	$stmt->close();
	
	$stmt = $conn->prepare($tripQuery);
	$stmt2 = $conn->prepare($tripOrderQuery);
	foreach ($order->cart->trips as &$trip) {
		$date = substr($trip->date, 0, strpos($trip->date, 'T'));    // ugly hack
		$stmt->bind_param('dddddids', $trip->fromPos->lat, $trip->fromPos->lng,
			$trip->toPos->lat, $trip->toPos->lng, $trip->distance,
			$trip->car->id, $trip->cost,
			$date);
		$stmt->execute();
		$tripId = $conn->insert_id;
		$stmt2->bind_param('ii', $orderId, $tripId);
		$stmt2->execute();
	}
	$stmt2->close();
	$stmt->close();
	
	$stmt = $conn->prepare($joyrideQuery);
	$stmt2 = $conn->prepare($joyrideOrderQuery);
	foreach ($order->cart->joyrides as &$joyride) {
		$stmt->bind_param('iidd', $joyride->order->vehicle->id,
			$joyride->order->driver->id, $joyride->order->distance,
			$joyride->cost);
		$stmt->execute();
		$joyrideId = $conn->insert_id;
		$stmt2->bind_param('ii', $orderId, $joyrideId);
		$stmt2->execute();
	}
	$stmt2->close();
	$stmt->close();
	
	$conn->commit();
	respond(200, json_encode(array('orderId' => $orderId)));
} catch (mysqli_sql_exception $e) {
	$conn->rollback();
	respond(500, constructError($e));
}

$conn->close();

?>

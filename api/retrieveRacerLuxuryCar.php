<?php

require_once('connect.php');

$response = array('status' => 'Success', 'racers' => array(), 'vehicles' => array());
$racerQuery = 'SELECT * FROM Racer';
$luxuryCarQuery = 'SELECT * FROM LuxuryCar';

try {
	$result = $conn->query($racerQuery);
	while (($row = $result->fetch_assoc())) {
		array_push($response['racers'], $row);
	}
	$result->close();
	
	//$stmt = $conn->prepare($LuxuryCarQuery);
	//foreach ($racer['results'] as &$racer) {
		//$racer['racers'] = array();
		//$stmt->bind_param('i', $racer['id']);
		//$stmt->execute();
		//$result = $stmt->get_result();
		//while ($row = $result->fetch_assoc()) {
			//array_push($racer['racers'], $row);
		//}
		//$result->close();
	//}
	//$stmt->close();
	$result = $conn->query($luxuryCarQuery);
	while (($row = $result->fetch_assoc())) {
		array_push($response['vehicles'], $row);
	}
	$result->close();
	
	respond(200, json_encode($response));
} catch (mysqli_sql_exception $e) {
	respond(500, constructError($e));
}

$conn->close();

?>

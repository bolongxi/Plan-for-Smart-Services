function serviceDController($scope, $http, $window)
{
	$scope.order = new JoyRide();
	
	if (!$window.sessionStorage['user']) {
		$window.location.href = '#!/login?from=services/d';
	}
	
	function addToCart(order)
	{
		console.log('addToCart called');
		var cart = JSON.parse($window.sessionStorage['cart']);
		cart.joyrides.push({
			order: order,
			cost: order.vehicle.rate * order.distance
		});
		$window.sessionStorage['cart'] = JSON.stringify(cart);
		//console.log($window.sessionStorage);
		/*if (confirm('Success. Go to cart?')) {
			$window.location.href = '#!/cart'
		}*/
	}
	
	$scope.drag = function (event) {
		event.dataTransfer.setData('text/plain', event.target.dataset.json);
	};
	
	$scope.allowDrop = function (event) {
		event.preventDefault();
	};
	
	$scope.drop = function (event) {
		event.preventDefault();
		//var productJSON = event.dataTransfer.getData('text');
		//addToCart(JSON.parse(productJSON));
		addToCart($scope.order);
	};
	
	$scope.orderReady = function () {
		var validated = true;
		for (var key of Object.keys($scope.order)) {
			if (!$scope.order[key]) {
				return false;
			}
		}
		return true;
	};
	
	$http.get('api/retrieveRacerLuxuryCar.php').then(function (response) {
		//$scope.stores = response.data.results;
		//console.log(response);
		$scope.drivers = response.data.racers;
		$scope.vehicles = response.data.vehicles;
	}, function (response) {
		console.log(response);
	});
}

function serviceAController($scope, $http, $window, $filter, leafletData)
{
	if (!$window.sessionStorage['user']) {
		$window.location.href = '#!/login?from=services/a';
	}
	
	const OSM = 'https://nominatim.openstreetmap.org';
	var route = null;
	
	$scope.date = new Date();
	$scope.routeConfirmed = false;
	$scope.cars = [];
	
	$scope.trip = new Trip();
	$scope.startPosition = new LeafletCenter(0, 0, 12);
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (pos) {
			$scope.$apply(function () {
				//console.log(pos);
				$scope.startPosition.setPosition(pos.coords.latitude,
					pos.coords.longitude);
				
				$http.get(OSM + '/reverse?format=json&lat=' +
					$scope.startPosition.lat + '&lon=' +
					$scope.startPosition.lng).then(function (response) {
					const result = response.data;
					const address = result.address;
					
					$scope.trip.fromAddr.street = address.house_number + ' ' +
						address.road;
					$scope.trip.fromAddr.city = address.city;
					$scope.trip.fromAddr.province = address.state;
					$scope.trip.fromAddr.country = address.country;
					
					$scope.trip.toAddr.province = address.state;
					$scope.trip.toAddr.country = address.country;
				}, function (response) {
					console.warn('Failed to lookup current address');
					console.warn(response);
				});
			});
		});
	} else {
		console.warn('geolocation is not supported');
	}
	
	/*$scope.$watch('trip.date', function (newDate) {
		$scope.trip.date = $filter('date')(newDate, 'yyyy-MM-dd');
	});*/
	
	$scope.populateVehicles = function () {
		if (!$scope.trip.date) {
			return;
		}
		$http.get('api/retrievecars.php?date=' + $scope.trip.date)
			.then(function (response) {
			$scope.cars = response.data.results;
		}, function (response) {
			alert('Failed to retrieve list of available vehicles. ' +
				'Try refreshing the page');
			console.error(response);
		});
	};
	
	$scope.updateRoute = async function () {
		const fromAddress = $scope.trip.fromAddr.construct();
		const toAddress = $scope.trip.toAddr.construct();
		
		if (!fromAddress) {
			alert('Starting address is not correctly populated');
			return;
		}
		if (!toAddress) {
			alert('Destination address is not correctly populated');
			return;
		}
		
		// lookup lat/long for each address
		var fromResponsePromise = $http.get(OSM + '/search?format=json&q=' +
			fromAddress);
		var toResponsePromise = $http.get(OSM + '/search?format=json&q=' +
			toAddress);
			
			
		const fromResponse = await fromResponsePromise;
		if (fromResponse.status !== 200 || !fromResponse.data.length) {
			alert('Failed to lookup starting position');
			console.warn(fromResponse);
			return;
		}
		$scope.trip.fromPos = new LatLng(parseFloat(fromResponse.data[0].lat),
			parseFloat(fromResponse.data[0].lon));
		
		const toResponse = await toResponsePromise;
		if (toResponse.status !== 200 || !toResponse.data.length) {
			alert('Failed to lookup destination position');
			console.warn(toResponse);
			return;
		}
		$scope.trip.toPos = new LatLng(parseFloat(toResponse.data[0].lat),
			parseFloat(toResponse.data[0].lon));
		
		// update map center
		/*$scope.$apply(function () {
			$scope.position.lat = fromPosition.lat;
			$scope.position.lng = fromPosition.lng;
		});*/
		
		// construct route or update existing route
		leafletData.getMap().then(function (map) {
			map.fitBounds([$scope.trip.fromPos, $scope.trip.toPos]);
			if (!route) {
				route = L.Routing.control({
					/*router: new L.Routing.OSRMv1({
						serviceUrl: 'http://localhost:5000/route/v1'
					}),*/
					waypoints: [ $scope.trip.fromPos, $scope.trip.toPos ],
					show: false
				}).on('routesfound', function (e) {
					const routes = e.routes;
					$scope.trip.distance = routes[0].summary.totalDistance / 1000;
					if ($scope.trip.distance > 50) {
						alert('Requested route exceeds transport limit of 50Km.');
						$scope.routeConfirmed = false;
					} else {
						$scope.routeConfirmed = true;
					}
				}).on('routeselected', function (e) {
					$scope.updateCost();
				});
				route.addTo(map);
			} else {
				route.setWaypoints([ fromPosition, toPosition ]);
			}
		});
	};
	
	$scope.updateCost = function () {
		if (!$scope.routeConfirmed || !$scope.trip.car) {
			return;
		}
		
		$scope.trip.cost = $scope.trip.distance * $scope.trip.car.rate;
	};
	
	$scope.addToCart = function () {
		var cart = JSON.parse($window.sessionStorage['cart']);
		cart.trips.push($scope.trip);
		$window.sessionStorage['cart'] = JSON.stringify(cart);
	};
}

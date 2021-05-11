function checkedOutController($scope, $http, $window, $location)
{
	$scope.orderId = $location.search().orderId;
	$scope.review = '';
	$scope.submitted = false;
	initStarRating($scope, 10);
	
	$scope.submitReview = function () {
		if (!$scope.review) {
			return;
		}
		
		const payload = {
			rating: $scope.getStarRating(0),
			feedback: $scope.review,
			orderId: $scope.orderId,
			userId: JSON.parse($window.sessionStorage['user']).id
		};
		console.log(payload);
		$http.post('api/savereview.php', payload).then(function (response) {
			$scope.submitted = true;
		}, function (response) {
			alert('Failed to save review. Try again later');
			console.error(response);
		});
	};
    
}

function searchController($scope, $http, searchParameters)
{
	$scope.query = searchParameters.query;
	$scope.data = [];
	
	function fetchResults()
	{
		$http.get('api/search.php?query=' + $scope.query).then(
			function (response) {
			$scope.data = response.data;
		}, function (response) {
			alert('Failed to perform search');
			console.error(response);
		});
	}
	fetchResults();
	
	searchParameters.subscribe($scope, function (event, args) {
		$scope.query = searchParameters.query;
		fetchResults();
	});
	
	
}

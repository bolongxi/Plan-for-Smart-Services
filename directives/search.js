function searchDirective(searchParameters)
{
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			query: '@'
		},
		templateUrl: 'directives/templates/search.html',
		link: function (scope, element, attributes) {
			/*function updateSearch() {
				console.log($scope.query);
			}*/
			
			/*console.log(scope);
			console.log(element);
			console.log(attributes);*/
			scope.$watch('query', function (newVal, oldVal) {
				searchParameters.query = newVal;
				searchParameters.notify();
			});
			
		},
		controller: [ '$scope', '$window', function ($scope, $window) {
			$scope.goToSearch = function () {
				if ($scope.query) {
					$window.location.href = '#!/search';
				}
			};
			
			/*$scope.getQuery = function () {
				return $scope.query;
			};*/
		}]
	};
}

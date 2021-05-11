function starRatingDirective()
{
	return {
		restrict: 'A',
		templateUrl: 'directives/templates/starRating.html',
		scope: {
			ratingValue: '=',
			max: '=',
			onRatingSelected: '&'
		},
		link: function (scope, elem, attrs) {

			var updateStars = function () {
				scope.stars = [];
				for (var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled: i < scope.ratingValue
					});
				}
			};

			scope.toggle = function (index) {
				scope.ratingValue = index + 1;
				scope.onRatingSelected({
					rating: index + 1
				});
			};

			scope.$watch('ratingValue', function (newVal, oldVal) {
				if (newVal) {
					updateStars();
				}
			});
		}
	};
}

function initStarRating($scope, max)
{
	$scope.rating = 0;
    $scope.ratings = [{
        presentV: 2,
        max: max
    }];
    
    $scope.getStarRating = function (i) {
		return $scope.ratings[i].presentV;
	}
	
	$scope.getMaxStarRating = function (i) {
		return $scope.ratings[i].max;
	}
}

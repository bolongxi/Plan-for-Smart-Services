function homeController($scope, $interval)
{
	$scope.index = 0;
	var images = [
		{
			src: 'resources/G.png',
			alt: 'G Slide'
		},
		{
			src: 'resources/Q.png',
			alt: 'Q Slide'
		},
		{
			src: 'resources/Z.png',
			alt: 'Z Slide'
		}
	];
	
	function setImage()
	{
		$scope.src = images[$scope.index].src;
		$scope.alt = images[$scope.index].alt;
		$scope.index = ($scope.index + 1) % images.length;
	}
	
	// set initial image and start running on interval
	setImage();
	$interval(setImage, 3000);
}

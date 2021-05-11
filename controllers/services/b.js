function serviceBController($scope, $http, $window)
{
	if (!$window.sessionStorage['user']) {
		$window.location.href = '#!/login?from=services/b';
	}
	
	function addToCart(product)
	{
		var cart = JSON.parse($window.sessionStorage['cart']);
		cart.products.push(product);
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
		var productJSON = event.dataTransfer.getData('text');
		addToCart(JSON.parse(productJSON));
	};
	
	$http.get('api/retrievestoreproducts.php').then(function (response) {
		$scope.stores = response.data.results;
	}, function (response) {
		alert('Failed to retrieve stores and products');
		console.log(response);
	});
}

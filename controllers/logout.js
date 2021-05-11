function logoutController($scope, $rootScope, $window)
{
	$rootScope.currentUser = null;
	$window.sessionStorage.removeItem('user');
	$window.sessionStorage.removeItem('cart');
	$window.location.href = '#!/';
}

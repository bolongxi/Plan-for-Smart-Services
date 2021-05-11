function signupController($scope, $http, $window)
{
	function validate(user) {
		const fields = [ 'username', 'firstname', 'lastname', 'email',
			'address', 'phone', 'password', 'password_repeat' ];

		if (!user) {
			return false;
		}
		for (const field of fields) {
			if (!user[field]) {
				return false;
			}
		}
		
		if (user.password !== user.password_repeat) {
			return false;
		}
		
		return true;
	}
	
	$scope.register = function (user) {
		if (!validate(user)) {
			return;
		}
		
		$http.put('api/register.php', JSON.stringify(user))
			.then(function (response) {
			$window.location.href = '#!/';
			console.log('This should redirect');
		}, function (response) {
			alert('Failed to register user. Check log for further details.');
			console.log(response);
		});
	};
	
	$scope.goBack = function () {
		$window.history.back();
	};
}

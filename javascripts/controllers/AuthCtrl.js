"use strict";

app.controller("AuthCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DashboardFactory) {

	$scope.loginContainer = true;
	$scope.registerContainer = false;

	if ($location.path() === "/logout") {
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url("/");
	}

	$scope.setLoginContainer = function() {
		$scope.loginContainer = true;
		$scope.registerContainer = false;
	};

	$scope.setRegisterContainer = function() {
		$scope.loginContainer = false;
		$scope.registerContainer = true;
	};

	let logMeIn = (userLoginInfo) => {
		AuthFactory.authenticate(userLoginInfo).then((loginResponse) => {
			return UserFactory.getUser(loginResponse.uid);
		}).then((userCreds) => {
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url('/dashboard');
		});
	};

	$scope.loginGoogleUser = () => {
		AuthFactory.authenticateGoogle().then((googleResponse) => {
			$rootScope.user = {
				uid: googleResponse.uid,
				username: googleResponse.displayName
			};
			$scope.login = {};
			$scope.register = {};
			DashboardFactory.getUserNames().then(function(users) {
				let googleUserExistsInFirebase = false;
				for (var i = 0; i < users.length; i++) {
					if (users[i].uid === $rootScope.user.uid) {
						googleUserExistsInFirebase = true;
						break;
					}
				}
				if (!googleUserExistsInFirebase) {
					UserFactory.addUser($rootScope.user).then(function(addResponse) {
						$location.url('/dashboard');
					});
				} else {
					$location.url('/dashboard');
				}
			});
		});
	};

	$scope.registerUser = function(registerNewUser) {
		AuthFactory.registerWithEmail(registerNewUser).then((registerResponse) => {
			registerNewUser.uid = registerResponse.uid;
			return UserFactory.addUser(registerNewUser);
		}).then((registerComplete) => {
			logMeIn(registerNewUser);
		});
	};

	$scope.loginUser = function(userLoginInfo) {
		logMeIn(userLoginInfo);
	};
});

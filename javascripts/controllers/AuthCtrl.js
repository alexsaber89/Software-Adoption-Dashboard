"use strict";

app.controller("AuthCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DashboardFactory) {

	$scope.loginContainer = true;
	$scope.registerContainer = false;
	
	$scope.logMeIn = logMeIn;
	$scope.loginGoogleUser = loginGoogleUser;
	$scope.registerUser = registerUser;
	$scope.setLoginContainer = setLoginContainer;
	$scope.setRegisterContainer = setRegisterContainer;

	function logMeIn(userLoginInfo) {
		AuthFactory.authenticate(userLoginInfo).then((loginResponse) => {
			return UserFactory.getUser(loginResponse.uid);
		}).then((userCreds) => {
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url('/dashboard');
		});
	};

	function loginGoogleUser() {
		AuthFactory.authenticateGoogle().then((googleResponse) => {
			$rootScope.user = {
				uid: googleResponse.uid,
				username: googleResponse.displayName
			};
			$scope.login = {};
			$scope.register = {};
			DashboardFactory.getUserObjectsArray().then(function(users) {
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

	function registerUser(registerNewUser) {
		AuthFactory.registerWithEmail(registerNewUser).then((registerResponse) => {
			registerNewUser.uid = registerResponse.uid;
			return UserFactory.addUser(registerNewUser);
		}).then((registerComplete) => {
			logMeIn(registerNewUser);
		});
	};

	function setLoginContainer() {
		$scope.loginContainer = true;
		$scope.registerContainer = false;
	};

	function setRegisterContainer() {
		$scope.loginContainer = false;
		$scope.registerContainer = true;
	};
	
});

"use strict";

app.controller("AuthCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory) {

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
			console.log("loginResponse", loginResponse);
			return UserFactory.getUser(loginResponse.uid);
		}).then((userCreds) => {
			console.log("userCreds", userCreds);
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url('/dashboard');
		});
	};

	$scope.loginGoogleUser = () => {
		AuthFactory.authenticateGoogle().then((googleResponse) => {
			console.log("googleResponse", googleResponse);
			$rootScope.user = {
				uid: googleResponse.uid,
				username: googleResponse.displayName
			};
			$scope.login = {};
			$scope.register = {};
			$location.url('/dashboard');
		}).then((logGoogleComplete) => {
			console.log("logGoogleComplete", logGoogleComplete);
		});
	};

	$scope.registerUser = function(registerNewUser) {
		console.log("registerNewUser", registerNewUser);
		AuthFactory.registerWithEmail(registerNewUser).then((registerResponse) => {
			console.log("registerResponse", registerResponse);
			registerNewUser.uid = registerResponse.uid;
			return UserFactory.addUser(registerNewUser);
		}).then((registerComplete) => {
			console.log("registerComplete", registerComplete);
			logMeIn(registerNewUser);
		});
	};

	$scope.loginUser = function(userLoginInfo) {
		logMeIn(userLoginInfo);
	};
});

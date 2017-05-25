"use strict";

app.controller("NavCtrl", function($scope, $rootScope, $location, AuthFactory) {

  $scope.showDashboard = () => {
    $location.url('/dashboard');
  };

  $scope.showDomains = () => {
    $location.url('/domains');
  };

  $scope.logout = () => {
    AuthFactory.logout();
 		$rootScope.user = {};
    $location.url('/logout');
  };

});

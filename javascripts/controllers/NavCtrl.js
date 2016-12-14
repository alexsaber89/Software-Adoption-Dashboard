"use strict";

app.controller("NavCtrl", function($scope, $location, AuthFactory) {

  $scope.showDashboard = () => {
    $location.url('/dashboard');
  };

  $scope.showDomains = () => {
    $location.url('/domains');
  };

  $scope.logout = () => {
    $location.url('/logout');
  };

});

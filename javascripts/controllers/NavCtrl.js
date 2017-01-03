"use strict";

app.controller("NavCtrl", function($scope, $location) {

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

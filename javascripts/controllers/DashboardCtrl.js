"use strict";

app.controller("DashboardCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory) {
  console.log("DashboardCtrl");
  $scope.labels = ["Download Sales", "In-Store Sales"];
  $scope.data = [300, 500];

  $scope.barLabels = [
    'Billy-Jo Potatochaser',
    'Hogchaser Moonshinechaser',
    'Chuck-Ray Haypusher',
    'Tractorfarmer Goateater',
    'Billy-Boy Pickupsower',
    'Sheephauler Burlapgreaser',
    'Corntoter Tractorgreaser',
    'Billy-Jo Hickgreaser',
    'Burlapeater Cornsower',
    'Cornfarmer Oatplanter',
    'Bubba Pigchaser'];

  $scope.barSeries = ['Active Users'];

  $scope.barData = [
    [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19]
  ];
});

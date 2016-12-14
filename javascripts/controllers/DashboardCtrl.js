"use strict";

app.controller("DashboardCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DashboardFactory) {

  $scope.labels = ["Download Sales", "In-Store Sales"];
  $scope.data = [300, 500];

  $scope.barLabels = [];

  $scope.barSeries = ['Active Users'];

  $scope.barData = [
    [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19]
  ];

  $scope.displaySalesRepPacingData = () => {
    DashboardFactory.getUserNames().then(function(userNamesArray) {
      console.log("userNamesArray", userNamesArray);
      userNamesArray.forEach(function(userObject) {
        $scope.barLabels.push(userObject.username);
      });
    });
  };

  $scope.displaySalesRepPacingData();

});

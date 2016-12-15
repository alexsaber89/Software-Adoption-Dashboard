"use strict";

app.controller("DashboardCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DashboardFactory) {

  $scope.getAllActiveUserEmails = () => {
    $scope.allActiveUserEmails = [];
    DashboardFactory.getAllActiveUsers().then(function(activeUserObjectArray) {
      activeUserObjectArray.forEach(function(activeUserObject) {
        $scope.allActiveUserEmails.push(activeUserObject.email);
      });
      console.log("allActiveUserEmails", $scope.allActiveUserEmails);
    });
  };

  //Doughnut Chart - Logged in Sales Rep's Submitted Domains
  $scope.loggedInUserSubmittedDomainLabels = ["Submitted Domains", "Domains till Quota"];
  $scope.loggedInUserNumberOfSubmittedDomains = [];

  $scope.displayLoggedUserDomains = () => {
    $scope.submittedDomainsQuota = 20;
    $scope.loggedInUserNumberOfSubmittedDomains.push($scope.loggedInUserSubmittedDomains.length);
    $scope.loggedInUserNumberOfSubmittedDomains.push($scope.submittedDomainsQuota - $scope.loggedInUserSubmittedDomains.length);
  };

  //Doughnut Chart - Logged in Sales Rep's Active Users
  $scope.getLoggedInActiveUsers = () => {
    let afterAtSign;
    let numberOfActiveUsers = 0;
    let loggedInActiveUserQuota = 60;
    DashboardFactory.getLoggedUserDomains($rootScope.user.uid).then(function(loggedInUserDomains) {
      $scope.loggedInUserSubmittedDomains = loggedInUserDomains;
      console.log("$scope.loggedInUserSubmittedDomains", $scope.loggedInUserSubmittedDomains);
      $scope.loggedInUserSubmittedDomains.forEach(function(submittedDomain) {
        $scope.allActiveUserEmails.forEach(function(activeUserEmail) {
          afterAtSign = activeUserEmail.substr(activeUserEmail.indexOf("@"));
          if (afterAtSign === submittedDomain.domainName) {
            console.log("afterAtSign", afterAtSign);
            numberOfActiveUsers++;
          }
        });
      });
      $scope.data = [numberOfActiveUsers, loggedInActiveUserQuota - numberOfActiveUsers];
      $scope.labels = ["My Active Users", "Active Users till Quota"];
      console.log("numberOfActiveUsers", numberOfActiveUsers);
      $scope.displayLoggedUserDomains();
    });
  };

  //Bar Graph - Sales Rep Pacing
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

  $scope.getAllActiveUserEmails();
  $scope.displaySalesRepPacingData();
  $scope.getLoggedInActiveUsers();

});

"use strict";

app.controller("DashboardCtrl", function($q, $scope, $rootScope, DashboardFactory) {

  let getAllActiveUserEmailAddressesCallback = function(value) {
    $scope.allActiveUserEmailAddresses = value;
    return value;
  };

  let getUserObjectsArrayCallback = function(value) {
    $scope.userObjectsArray = value;
    return value;
  };

  let getLoggedUserDomainsCallback = function(value) {
    $scope.loggedInUserDomains = value;
    return value;
  };

  //First, retrieve all software Active Users, Sales Rep email addresses, and currently logged in user's Domains
  $scope.fromThen = $q.all([
    DashboardFactory.getAllActiveUserEmailAddresses().then(getAllActiveUserEmailAddressesCallback),
    DashboardFactory.getUserObjectsArray().then(getUserObjectsArrayCallback),
    DashboardFactory.getLoggedUserDomains($rootScope.user.uid).then(getLoggedUserDomainsCallback)
  ])
  //Then, use this data to perform final database call and route data to the dashboard graphs/charts
  .then(function(values) {
    $scope.barDataWrapperArray = [];
    $scope.loggedInUserActiveUsersWrapperArray = [];
    $scope.barData = [];
    $scope.barLabels = [];
    $scope.barSeries = ['Active Users'];
    $scope.salesCenterActiveUserQuota = 100;
    $scope.loggedInUserActiveUserQuota = 40;
    $scope.submittedDomainsQuota = 20;
    let totalNumberOfActiveUsers = [];

    $scope.userObjectsArray.forEach(function(userObject) {

      DashboardFactory.getLoggedUserDomains(userObject.uid).then(function(submittedDomains) {

        let afterAtSign;
        let numberOfActiveUsers = 0;

        //For each Sales Rep's submitted domain name, compare to full list of active users to find matches
        submittedDomains.forEach(function(submittedDomain) {
          $scope.allActiveUserEmailAddresses.forEach(function(activeUserEmail) {
            afterAtSign = activeUserEmail.substr(activeUserEmail.indexOf("@"));
            if (afterAtSign === submittedDomain.domainName) {
              numberOfActiveUsers++;
            }
          });
        });

        $scope.barData.push(numberOfActiveUsers);
        totalNumberOfActiveUsers.push(numberOfActiveUsers);
        if (userObject.uid === $rootScope.user.uid) {
          $scope.loggedInUserActiveUsersWrapperArray.push(numberOfActiveUsers);
          $scope.loggedInUserActiveUsersWrapperArray.push($scope.loggedInUserActiveUserQuota - numberOfActiveUsers);
          $scope.loggedInUserActiveUserLabels = ["My Active Users", "Needed"];
        }
        if (totalNumberOfActiveUsers.length === $scope.userObjectsArray.length) {
          $scope.salesCenterActiveUsersWrapper = [];
          $scope.salesCenterActiveUsers = totalNumberOfActiveUsers.reduce(function(a, b) {
            return a + b;
          });
          $scope.salesCenterActiveUsersWrapper.push($scope.salesCenterActiveUsers);
          $scope.salesCenterActiveUsersWrapper.push($scope.salesCenterActiveUserQuota - $scope.salesCenterActiveUsers);
        }
        $scope.barLabels.push(userObject.username);
        $scope.salesCenterActiveUserLabels = ["Total Active Users", "Needed"];
      });
    });

    $scope.barDataWrapperArray.push($scope.barData);

  //Doughnut Chart - Logged in Sales Rep's Submitted Domains
    $scope.loggedInUserSubmittedDomainLabels = ["My Domains", "Needed"];
    $scope.loggedInUserNumberOfSubmittedDomains = [];
    if ($scope.loggedInUserDomains.length <= $scope.submittedDomainsQuota) {
      $scope.loggedInUserNumberOfSubmittedDomains.push($scope.loggedInUserDomains.length);
      $scope.loggedInUserNumberOfSubmittedDomains.push($scope.submittedDomainsQuota - $scope.loggedInUserDomains.length);
    } else {
      $scope.loggedInUserNumberOfSubmittedDomains.push($scope.submittedDomainsQuota);
    }
  });//end of $q.all.then()
});

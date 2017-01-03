"use strict";

app.controller("DashboardCtrl", function($q, $location, $scope, $rootScope, AuthFactory, UserFactory, DashboardFactory) {

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

  $scope.fromThen = $q.all([
    DashboardFactory.getAllActiveUserEmailAddresses().then(getAllActiveUserEmailAddressesCallback),
    DashboardFactory.getUserObjectsArray().then(getUserObjectsArrayCallback),
    DashboardFactory.getLoggedUserDomains($rootScope.user.uid).then(getLoggedUserDomainsCallback)
  ])
  .then(function(values) {
    $scope.barDataWrapperArray = [];
    $scope.loggedInUserActiveUsersWrapperArray = [];
    $scope.barData = [];
    $scope.barLabels = [];
    $scope.barSeries = ['Active Users'];
    $scope.salesCenterActiveUserQuota = 100;
    $scope.loggedInUserActiveUserQuota = 40;
    let totalNumberOfActiveUsers = [];
    $scope.userObjectsArray.forEach(function(userObject) {
      //Get Submitted Domains for each Registered User
      DashboardFactory.getLoggedUserDomains(userObject.uid).then(function(submittedDomains) {
        let loggedInActiveUserQuota = 60;
        let afterAtSign;
        let numberOfActiveUsers = 0;

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
          $scope.loggedInUserActiveUserLabels = ["My Active Users", "To Quota"];
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
        $scope.salesCenterActiveUserLabels = ["Total Active Users", "To Quota"];
      });
    });
    $scope.barDataWrapperArray.push($scope.barData);

  //Doughnut Chart - Logged in Sales Rep's Submitted Domains
    $scope.loggedInUserSubmittedDomainLabels = ["My Submitted Domains", "To Quota"];
    $scope.loggedInUserNumberOfSubmittedDomains = [];
    $scope.submittedDomainsQuota = 20;
    if ($scope.loggedInUserDomains.length <= $scope.submittedDomainsQuota) {
      $scope.loggedInUserNumberOfSubmittedDomains.push($scope.loggedInUserDomains.length);
      $scope.loggedInUserNumberOfSubmittedDomains.push($scope.submittedDomainsQuota - $scope.loggedInUserDomains.length);
    } else {
      $scope.loggedInUserNumberOfSubmittedDomains.push($scope.submittedDomainsQuota);
    }
  });//end of $q.all.then()
});

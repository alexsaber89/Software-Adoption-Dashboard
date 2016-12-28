"use strict";

app.controller("DashboardCtrl", function($q, $location, $scope, $rootScope, AuthFactory, UserFactory, DashboardFactory) {
  //**Below is attempt #3!**

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
        console.log("submittedDomains for " + userObject.username, submittedDomains);
        let loggedInActiveUserQuota = 60;
        let afterAtSign;
        let numberOfActiveUsers = 0;

        submittedDomains.forEach(function(submittedDomain) {
          $scope.allActiveUserEmailAddresses.forEach(function(activeUserEmail) {
            afterAtSign = activeUserEmail.substr(activeUserEmail.indexOf("@"));
            if (afterAtSign === submittedDomain.domainName) {
              console.log("afterAtSign", afterAtSign);
              numberOfActiveUsers++;
            }
          });
        });
        console.log("numberOfActiveUsers", numberOfActiveUsers);
        $scope.barData.push(numberOfActiveUsers);
        totalNumberOfActiveUsers.push(numberOfActiveUsers);
        if (userObject.uid === $rootScope.user.uid) {
          $scope.loggedInUserActiveUsersWrapperArray.push(numberOfActiveUsers);
          $scope.loggedInUserActiveUsersWrapperArray.push($scope.loggedInUserActiveUserQuota - numberOfActiveUsers);
          $scope.loggedInUserActiveUserLabels = ["My Active Users", "To Quota"];
        }
        if (totalNumberOfActiveUsers.length === $scope.userObjectsArray.length) {
          console.log("run totalNumberOfActiveUsers.reduce");
          $scope.salesCenterActiveUsersWrapper = [];
          $scope.salesCenterActiveUsers = totalNumberOfActiveUsers.reduce(function(a, b) {
            return a + b;
          });
          console.log("$scope.salesCenterActiveUsers", $scope.salesCenterActiveUsers);
          $scope.salesCenterActiveUsersWrapper.push($scope.salesCenterActiveUsers);
          $scope.salesCenterActiveUsersWrapper.push($scope.salesCenterActiveUserQuota - $scope.salesCenterActiveUsers);
        }
        $scope.barLabels.push(userObject.username);
        $scope.salesCenterActiveUserLabels = ["Total Active Users", "To Quota"];
      });
    });
    $scope.barDataWrapperArray.push($scope.barData);

  //Doughnut Chart - Logged in Sales Rep's Submitted Domains
    console.log("$scope.loggedInUserDomains.length", $scope.loggedInUserDomains.length);
    console.log("$scope.loggedInUserDomains", $scope.loggedInUserDomains);
    $scope.loggedInUserSubmittedDomainLabels = ["Submitted Domains", "To Quota"];
    $scope.loggedInUserNumberOfSubmittedDomains = [];
    $scope.submittedDomainsQuota = 20;
    $scope.loggedInUserNumberOfSubmittedDomains.push($scope.loggedInUserDomains.length);
    $scope.loggedInUserNumberOfSubmittedDomains.push($scope.submittedDomainsQuota - $scope.loggedInUserDomains.length);

  //Are these needed?
    console.log(values);
    return values;
  });//end of $q.all.then()

  // let getAllActiveUserEmailAddresses = () => {
  //   DashboardFactory.getAllActiveUserEmailAddresses().then(function(activeUserEmailAddresses) {
  //     // console.log("activeUserEmailAddresses", activeUserEmailAddresses);
  //     $scope.activeUserEmailAddresses = activeUserEmailAddresses;
  //   });
  // };
  //
  // let getUserObjectsArray = () => {
  //   DashboardFactory.getUserObjectsArray().then((userObjectsArray) => {
  //     // console.log("userObjectsArray", userObjectsArray);
  //     $scope.userObjectsArray = userObjectsArray;
  //   });
  // };

  // getAllActiveUserEmailAddresses();
  // getUserObjectsArray();


  // //**Below is the second attempt at controller code**
  // let numberOfActiveUsers = 0;
  //
  // let getAllActiveUserEmails = () => {
  //   $scope.allActiveUserEmails = [];
  //   DashboardFactory.getAllActiveUsers().then(function(activeUserObjectArray) {
  //     activeUserObjectArray.forEach(function(activeUserObject) {
  //       $scope.allActiveUserEmails.push(activeUserObject.email);
  //     });
  //     console.log("allActiveUserEmails", $scope.allActiveUserEmails);
  //   });
  // };
  //
  // let injectEachUserObjectWithNumberOfActiveUsers = (userObjects) => {
  //   userObjects.forEach((object) => {
  //     DashboardFactory.getLoggedUserDomains(object.uid).then(function(loggedInUserDomains) {
  //       console.log("loggedInUserDomains for each user", loggedInUserDomains);
  //       determineNumberofActiveUsers(loggedInUserDomains);
  //       console.log("User" + object.uid + " has " + numberOfActiveUsers + " active users.");
  //     });
  //   });
  // };
  //
  // let determineNumberofActiveUsers = (userDomains) => {
  //   let afterAtSign;
  //   getAllActiveUserEmails();
  //   userDomains.forEach(function(domain) {
  //     $scope.allActiveUserEmails.forEach(function(activeUserEmail) {
  //       afterAtSign = activeUserEmail.substr(activeUserEmail.indexOf("@"));
  //       if (afterAtSign === domain.domainName) {
  //         console.log("afterAtSign", afterAtSign);
  //         numberOfActiveUsers++;
  //       }
  //     });
  //   });
  // };
  //
  // let getUserObjectsArray = () => {
  //   DashboardFactory.getUserObjectsArray().then((userObjectsArray) => {
  //     $scope.userObjectsArray = userObjectsArray;
  //     injectEachUserObjectWithNumberOfActiveUsers(userObjectsArray);
  //   });
  // };
  //
  // getUserObjectsArray();

  //**Below is the original controller code**

  // $scope.getAllActiveUserEmails = () => {
  //   $scope.allActiveUserEmails = [];
  //   DashboardFactory.getAllActiveUsers().then(function(activeUserObjectArray) {
  //     activeUserObjectArray.forEach(function(activeUserObject) {
  //       $scope.allActiveUserEmails.push(activeUserObject.email);
  //     });
  //     console.log("allActiveUserEmails", $scope.allActiveUserEmails);
  //   });
  // };
  //
  // //Doughnut Chart - Logged in Sales Rep's Submitted Domains
  // $scope.loggedInUserSubmittedDomainLabels = ["Submitted Domains", "Domains till Quota"];
  // $scope.loggedInUserNumberOfSubmittedDomains = [];
  //
  // $scope.displayLoggedUserDomains = () => {
  //   $scope.submittedDomainsQuota = 20;
  //   $scope.loggedInUserNumberOfSubmittedDomains.push($scope.loggedInUserSubmittedDomains.length);
  //   $scope.loggedInUserNumberOfSubmittedDomains.push($scope.submittedDomainsQuota - $scope.loggedInUserSubmittedDomains.length);
  // };
  //
  // //Doughnut Chart - Logged in Sales Rep's Active Users
  // $scope.getLoggedInActiveUsers = () => {
  //   let afterAtSign;
  //   let numberOfActiveUsers = 0;
  //   let loggedInActiveUserQuota = 60;
  //   DashboardFactory.getLoggedUserDomains($rootScope.user.uid).then(function(loggedInUserDomains) {
  //     $scope.loggedInUserSubmittedDomains = loggedInUserDomains;
  //     console.log("$scope.loggedInUserSubmittedDomains", $scope.loggedInUserSubmittedDomains);
  //     $scope.loggedInUserSubmittedDomains.forEach(function(submittedDomain) {
  //       $scope.allActiveUserEmails.forEach(function(activeUserEmail) {
  //         afterAtSign = activeUserEmail.substr(activeUserEmail.indexOf("@"));
  //         if (afterAtSign === submittedDomain.domainName) {
  //           console.log("afterAtSign", afterAtSign);
  //           numberOfActiveUsers++;
  //         }
  //       });
  //     });
  //     $scope.data = [numberOfActiveUsers, loggedInActiveUserQuota - numberOfActiveUsers];
  //     $scope.labels = ["My Active Users", "Active Users till Quota"];
  //     console.log("numberOfActiveUsers", numberOfActiveUsers);
  //     $scope.displayLoggedUserDomains();
  //   });
  // };
  //
  // //Bar Graph - Sales Rep Pacing
  // $scope.barLabels = [];
  // $scope.barSeries = ['Active Users'];
  // $scope.barData = [
  //   [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19]
  // ];
  //
  // $scope.displaySalesRepPacingData = () => {
  //   DashboardFactory.getUserObjectsArray().then(function(userObjectsArray) {
  //     console.log("userObjectsArray", userObjectsArray);
  //     // userObjectsArray.forEach(function(userObject) {
  //     //   $scope.barLabels.push(userObject.username);
  //     // });
  //     userObjectsArray.forEach(function(userObject) {
  //       $scope.barLabels.push(userObject.username);
  //       DashboardFactory.getLoggedUserDomains(userObject.uid).then(function(loggedInUserDomains) {
  //         console.log("loggedInUserDomains for each user", loggedInUserDomains);
  //       });
  //     });
  //   });
  // };
  //
  // $scope.getAllActiveUserEmails();
  // $scope.getLoggedInActiveUsers();
  // $scope.displaySalesRepPacingData();

});

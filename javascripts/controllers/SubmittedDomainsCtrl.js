"use strict";

app.controller("SubmittedDomainsCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory, DomainsFactory) {

  $scope.displayDomainSubmitButton = false;
  $scope.submittedDomains = [];

  $scope.getMyCtrlScope = function() {
    return $scope;
  };

  $scope.loadUserDomains = () => {
    DomainsFactory.getLoggedUserDomains($rootScope.user.uid).then(function(domains) {
      $scope.submittedDomains = domains;
    });
  };

  $scope.searchDomains = (domainName) => {
    $scope.displayDomainSubmitButton = false;
    if ($scope.submittedDomains.length < 1) {
      $scope.displayDomainSubmitButton = true;
    }
    for (var i = 0; i < $scope.submittedDomains.length; i++) {
      if(domainName === $scope.submittedDomains[i].domainName) {
        $scope.displayDomainSubmitButton = false;
        break;
      } else {
        $scope.displayDomainSubmitButton = true;
      }
    }
  };

  $scope.addNewDomain = (newDomain) => {
    DomainsFactory.addLoggedUserDomain($rootScope.user.uid, newDomain).then(function(addResponse) {
      $scope.loadUserDomains();
      $scope.displayDomainSubmitButton = false;
    });
  };

  $scope.deleteDomainThenReloadDomains = (domainId) => {
    DomainsFactory.deleteLoggedUserDomain(domainId).then(function(deleteResponse) {
      $scope.loadUserDomains();
    });
  };

  $scope.editDomainThenReloadDomains = () => {
    console.log("editDomainThenReloadDomains");
  };

  $scope.loadUserDomains();

});
